import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import PropertyDetailClient from "./PropertyDetailClient";
import { fetchRawListingsServer, findListing } from "@/lib/idxServer";
import { listingPath, toPropertyItem, type RawIdxListing } from "@/lib/idx";

/**
 * Listing detail pages, shared by two routes:
 *
 *   /property/<slug>  featured listings (app/property/[slug]/page.tsx)
 *   /<slug>           sold and pending listings (app/[slug]/page.tsx)
 *
 * listingPath() in lib/idx.ts decides which; a listing requested at the other
 * route is permanently redirected, so it can move (e.g. when it sells)
 * without breaking a link. The notes below were written for the root route.
 *
 * Being a root segment, this route is the catch-all for every single-segment
 * path that no other route claims. Static routes still win — /contact and
 * /blog are matched before this — but /anything-else lands here, and the
 * listing itself is fetched on the client, so without a guard every typo and
 * bot probe on the site would return 200 with an empty listing shell. Search
 * engines read that as a soft 404.
 *
 * Hence the shape check below. IDX slugs are a house number, the street and
 * city, then a five digit ZIP:
 *
 *   4236-longridge-avenue-203-los-angeles-91604
 *   541-martos-drive-south-pasadena-91030
 *   735-n-stanley-avenue-los-angeles-90046
 *
 * Leading digit and trailing ZIP are enough to separate them from every real
 * page on this site — none begins with a number — while costing nothing at
 * request time. It is a shape test, not an existence test; the existence test
 * is below, once the feed is in hand.
 */
const LISTING_SLUG = /^\d[a-z0-9]*(?:-[a-z0-9]+)*-\d{5}$/;

export function isListingSlug(slug: string): boolean {
  return LISTING_SLUG.test(slug.toLowerCase());
}

/* The listing is now looked up on the server, from the same fifteen-minute
   cached feed the property pages use (lib/idxServer.ts). Two things follow
   from that for search engines:

   - The HTML carries the listing itself — address, price, photos, the
     description, the features table — instead of a "Loading listing…"
     spinner that the client filled in later. Each listing also gets its own
     title, description and share image rather than one generic "Listing"
     title shared by every address on the site.
   - A well-formed slug that is not in the feed now returns a real 404. It
     used to return 200 with a "This Listing Is On The Way" panel, which is a
     soft 404 by definition.

   Both only apply when the feed actually loaded. If IDX is unreachable the
   page renders exactly as before and the client fetches on its own — an IDX
   outage must not turn every listing on the site into a 404. */
/* Each route file sets `revalidate = 900` itself; Next only reads it there. */

function describe(raw: RawIdxListing): { title: string; description: string; image?: string } {
  const p = toPropertyItem(raw);
  const place = [p.address, p.location].filter(Boolean).join(", ");
  const facts = [
    p.beds !== "—" ? `${p.beds} bed` : "",
    p.baths !== "—" ? `${p.baths} bath` : "",
    p.sqft !== "—" ? `${p.sqft} sqft` : "",
  ].filter(Boolean).join(" · ");
  const verb = p.badge === "Sold" ? "Sold" : p.badge === "Pending" ? "Pending" : "For sale";
  const remarks = (raw.remarksConcat || "").replace(/\s+/g, " ").trim();
  const lead = `${verb}${p.price ? ` at ${p.price}` : ""}${facts ? ` — ${facts}` : ""}.`;
  const full = remarks ? `${lead} ${remarks}` : `${lead} Listed with the Andrew Liberty Team, Compass.`;
  return {
    title: `${place} | ${p.badge === "Sold" ? "Sold" : p.price} | Andrew Liberty`,
    description: full.length > 158 ? `${full.slice(0, 155).replace(/\s+\S*$/, "")}…` : full,
    image: p.img || undefined,
  };
}

/** Which route is rendering: the site root or /property. */
export type ListingRoute = "root" | "property";

function routeOf(raw: RawIdxListing): ListingRoute {
  return raw.featured ? "property" : "root";
}

export async function listingMetadata(slug: string, route: ListingRoute): Promise<Metadata> {
  const here = route === "property" ? `/property/${slug}` : `/${slug}`;
  // Each URL canonicalises to itself rather than inheriting one from an ancestor.
  const base: Metadata = { title: "Listing — Andrew Liberty Team", alternates: { canonical: here } };
  if (!isListingSlug(slug)) return base;
  const all = await fetchRawListingsServer();
  const match = all ? findListing(all, slug) : undefined;
  if (!match) return base;
  const { title, description, image } = describe(match);
  const url = listingPath(match);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, ...(image ? { images: [image] } : {}) },
    twitter: { title, description, ...(image ? { images: [image] } : {}) },
  };
}

export async function ListingPage({ slug, route }: { slug: string; route: ListingRoute }) {
  if (!isListingSlug(slug)) notFound();

  const all = await fetchRawListingsServer();
  if (!all) return <PropertyDetailClient slug={slug} />;

  const match = findListing(all, slug);
  if (!match) notFound();

  // Featured listings live under /property, the rest at the root.
  if (routeOf(match) !== route) permanentRedirect(listingPath(match));

  /* Hand over only what the page draws — the listing and the four "Similar
     Properties" cards, picked exactly as PropertyDetailClient picks them —
     rather than serialising the entire feed into every listing page. */
  const similar = all
    .filter((raw) => raw.detailsUrlSlug.toLowerCase() !== slug.toLowerCase())
    .slice(0, 4);
  return <PropertyDetailClient slug={slug} initialListings={[match, ...similar]} />;
}
