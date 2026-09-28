import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyDetailClient from "./PropertyDetailClient";

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
 * request time. It is a shape test, not an existence test: a well formed slug
 * for a listing that has since left the feed still reaches the client, which
 * renders its own not-found state.
 */
const LISTING_SLUG = /^\d[a-z0-9]*(?:-[a-z0-9]+)*-\d{5}$/;

function isListingSlug(slug: string): boolean {
  return LISTING_SLUG.test(slug.toLowerCase());
}

/* Listing content is fetched from IDX in the client, so there's nothing to
   build a rich title from here — but each URL still needs to canonicalise to
   itself rather than inherit one from an ancestor. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: "Listing — Andrew Liberty Team",
    alternates: { canonical: `/${slug}` },
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isListingSlug(slug)) notFound();
  return <PropertyDetailClient slug={slug} />;
}
