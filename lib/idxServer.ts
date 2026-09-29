import "server-only";

import { proxyIdxRequest } from "@/lib/idxProxy";
import { isLease, type RawIdxListing } from "@/lib/idx";

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

export async function fetchRawListingsServer(): Promise<RawIdxListing[] | null> {
  try {
    const [featured, soldpending] = await Promise.all([
      serverIdxFetch<RawIdxListResponse>("clients/featured"),
      serverIdxFetch<RawIdxListResponse>("clients/soldpending"),
    ]);
    const all = [
      ...Object.values(featured?.data || {}),
      ...Object.values(soldpending?.data || {}),
    ].filter((raw) => !isLease(raw));
    return all.length > 0 ? all : null;
  } catch {
    return null;
  }
}
