import type { Metadata } from "next";
import { ListingPage, listingMetadata } from "./listingRoute";

/** Sold and pending listings, at /<slug>. Featured listings redirect to
 *  /property/<slug>. The shared logic, and why it is shaped as it is, is in
 *  ./listingRoute.tsx. */
export const revalidate = 900;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return listingMetadata(slug, "root");
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ListingPage slug={slug} route="root" />;
}
