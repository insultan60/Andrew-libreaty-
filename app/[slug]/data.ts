/** Shared types for the property detail page. Real listing data is fetched
 *  at runtime via lib/idx.ts's toDetailListing() — see app/[slug]/page.tsx. */

export type Feature = { label: string; value: string };
export type HistoryItem = { event: string; sub: string; price?: string };

export type Listing = {
  slug: string;
  mlsId: string;
  address: string;
  city: string;
  price: string;
  perSqft: string;
  status: string;
  listed: string;
  beds: string;
  baths: string;
  sqft: string;
  built: string;
  type: string;
  gallery: string[];
  moreCount: number;
  overview: string[];
  features: { interior: Feature[]; exterior: Feature[]; details: Feature[] };
  lat: number;
  lng: number;
  pin: string;
  history: HistoryItem[];
};
