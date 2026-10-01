import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyDetailClient from "./PropertyDetailClient";
import { fetchRawListingsServer, findListing } from "@/lib/idxServer";
import { toPropertyItem, type RawIdxListing } from "@/lib/idx";

/**
 * Listing detail, served from the site root: /541-martos-drive-south-pasadena-91030
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

function isListingSlug(slug: string): boolean {
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
export const revalidate = 900;

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Each URL canonicalises to itself rather than inheriting one from an ancestor.
  const base: Metadata = { title: "Listing — Andrew Liberty Team", alternates: { canonical: `/${slug}` } };
  if (!isListingSlug(slug)) return base;
  const all = await fetchRawListingsServer();
  const match = all ? findListing(all, slug) : undefined;
  if (!match) return base;
  const { title, description, image } = describe(match);
  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: { title, description, url: `/${slug}`, ...(image ? { images: [image] } : {}) },
    twitter: { title, description, ...(image ? { images: [image] } : {}) },
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isListingSlug(slug)) notFound();

  const all = await fetchRawListingsServer();
  if (!all) return <PropertyDetailClient slug={slug} />;

  const match = findListing(all, slug);
  if (!match) notFound();

  /* Hand over only what the page draws — the listing and the four "Similar
     Properties" cards, picked exactly as PropertyDetailClient picks them —
     rather than serialising the entire feed into every listing page. */
  const similar = all
    .filter((raw) => raw.detailsUrlSlug.toLowerCase() !== slug.toLowerCase())
    .slice(0, 4);
  return <PropertyDetailClient slug={slug} initialListings={[match, ...similar]} />;
}
