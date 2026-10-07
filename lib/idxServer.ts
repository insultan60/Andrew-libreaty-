import "server-only";

import { unstable_cache } from "next/cache";
import { proxyIdxRequest } from "@/lib/idxProxy";
import { isLease, markFeatured, type RawIdxListing } from "@/lib/idx";

/**
 * Server-side twin of fetchRawListings().
 *
 * lib/idx.ts fetches through a RELATIVE url (`/api/idx/...`), which only
 * resolves in a browser — Node throws on a relative fetch — so it cannot be
 * reused here. This calls proxyIdxRequest directly instead, skipping the HTTP
 * hop back into our own API route entirely.
 *
 * Why this exists at all: /home-search rendered nothing on the server, so the
 * only content in the HTML Google indexes was the page furniture. The listings
 * arrived about five seconds later from the client, and Google's renderer does
 * not reliably wait that long — it kept the empty version and filed the page
 * as a soft 404.
 *
 * Failure is deliberately soft. If IDX is down or the key is missing this
 * returns null rather than throwing, and the page falls back to the client
 * fetch it has always done. A listings feed having a bad minute should not
 * take the search page down with it.
 */
async function serverIdxFetch<T>(path: string): Promise<T | null> {
  const res = await proxyIdxRequest({
    method: "GET",
    path,
    query: new URLSearchParams(),
  });
  // IDX answers 204 rather than an empty envelope when a call has no results.
  if (res.status === 204) return null;
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`IDX request failed: ${path} (${res.status})`);
  }
  return res.body ? (JSON.parse(res.body) as T) : null;
}

type RawIdxListResponse = { total: number; data: Record<string, RawIdxListing> };

/**
 * One cached copy of the feed, shared by every page that renders listings on
 * the server: /home-search, /property, /property/active, /property/sold and
 * every listing page at /<address-slug>.
 *
 * The listing pages are why this is cached here rather than left to each
 * route's `revalidate`. Those are one URL per address, so a crawler walking
 * them would otherwise cost two IDX calls per page and run through IDX
 * Broker's hourly limit in a single pass. With this, the whole site makes at
 * most two calls per fifteen minutes however many pages are rendered.
 *
 * A failed or empty fetch throws inside the cached function, and
 * unstable_cache does not store a throw, so an IDX outage is retried on the
 * next render instead of being remembered as "no listings" for fifteen
 * minutes.
 */
const cachedListings = unstable_cache(
  async (): Promise<RawIdxListing[]> => {
    const [featured, soldpending] = await Promise.all([
      serverIdxFetch<RawIdxListResponse>("clients/featured"),
      serverIdxFetch<RawIdxListResponse>("clients/soldpending"),
    ]);
    const all = [
      ...markFeatured(Object.values(featured?.data || {})),
      ...Object.values(soldpending?.data || {}),
    ].filter((raw) => !isLease(raw));
    if (all.length === 0) throw new Error("IDX returned no listings");
    return all;
  },
  // v2: records now carry `featured` (see listingPath); v1 entries lack it.
  ["idx-listings-v2"],
  { revalidate: 900, tags: ["idx-listings"] }
);

export async function fetchRawListingsServer(): Promise<RawIdxListing[] | null> {
  try {
    return await cachedListings();
  } catch {
    return null;
  }
}

/** The listing at /<slug>, matched the same way the client page matches it. */
export function findListing(all: RawIdxListing[], slug: string): RawIdxListing | undefined {
  const want = slug.toLowerCase();
  return all.find((raw) => raw.detailsUrlSlug.toLowerCase() === want);
}
