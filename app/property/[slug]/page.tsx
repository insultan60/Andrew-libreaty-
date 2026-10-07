import type { Metadata } from "next";
import { ListingPage, listingMetadata } from "../../[slug]/listingRoute";

/** Featured listings, at /property/<slug> — the address Compass's marketing
 *  emails link to. Sold and pending listings redirect to /<slug>. The static
 *  /property/active and /property/sold pages sit beside this route and take
 *  precedence over it. Shared logic: app/[slug]/listingRoute.tsx. */
export const revalidate = 900;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return listingMetadata(slug, "property");
}

export default async function FeaturedPropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ListingPage slug={slug} route="property" />;
}
