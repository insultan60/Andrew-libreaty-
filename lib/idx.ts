/** Client-side IDX Broker API layer.
 *
 * Talks only to same-origin /api/idx/... (see app/api/idx/[...path]/route.ts)
 * — the IDX Broker access key never reaches the browser.
 *
 * fetchRawListings() returns the account's featured (active) + soldpending
 * (sold/pending) listings, combined, as raw IDX records. toListing()/
 * toDetailListing() derive the two view-shapes the app already has UI for
 * (app/home-search/listings.ts's Listing, and app/[slug]/data.ts's
 * richer Listing) from that same fetch — one network round trip, two views.
 */

import type { Listing } from "@/app/home-search/listings";
import type { Listing as DetailListing, Feature, HistoryItem } from "@/app/[slug]/data";
import type { PropertyItem } from "@/app/property/PropertyCard";
import { areasOf } from "@/lib/areas";

const STATE_ABBR: Record<string, string> = {
  California: "CA",
  Nevada: "NV",
  Arizona: "AZ",
  Oregon: "OR",
};

type IdxImage = { url: string; caption?: string };
export type RawIdxListing = {
  idxID: string;
  listingID: string;
  address: string;
  cityName: string;
  state: string;
  zipcode: string;
  bedrooms: number;
  totalBaths: number;
  fullBaths?: number;
  halfBaths?: number;
  threeQuarterBaths?: number;
  sqFt: string;
  acres?: string;
  price: number;
  listingPrice: string;
  soldPrice?: number | string;
  soldDate?: string;
  dateAdded?: string;
  latitude: string | number;
  longitude: string | number;
  image?: Record<string, IdxImage>;
  remarksConcat?: string;
  yearBuilt?: number;
  detailsUrlSlug: string;
  idxStatus?: string;
  propStatus?: string;
  propType?: string;
  propSubType?: string;
  countyName?: string;
  advanced?: Record<string, unknown>;
};

type RawIdxListResponse = { total: number; data: Record<string, RawIdxListing> };

/** IDX returns 204 (no content) rather than an empty JSON envelope when a
 *  call has zero results (confirmed live: this account currently has 0
 *  featured/active listings). Naive res.json() on an empty body throws. */
async function idxFetch<T>(path: string, init?: { method?: string; headers?: Record<string, string>; body?: string }): Promise<T | null> {
  const res = await fetch(`/api/idx/${path}`, init);
  if (res.status === 204) return null;
  if (!res.ok) throw new Error(`IDX request failed: ${path} (${res.status})`);
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : null;
}

function money(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

function cityState(raw: RawIdxListing): string {
  const abbr = STATE_ABBR[raw.state] || raw.state;
  return `${raw.cityName}, ${abbr}`;
}

function photos(raw: RawIdxListing): string[] {
  const images = raw.image ? Object.values(raw.image) : [];
  return images
    .map((img) => img.url)
    .filter(Boolean)
    .map((url) => `/api/photo?url=${encodeURIComponent(url)}`);
}

/** "active" | "sold" | "pending" from IDX's own status fields. */
function statusOf(raw: RawIdxListing): "Active" | "Sold" | "Pending" {
  const s = (raw.idxStatus || raw.propStatus || "").toLowerCase();
  if (s.includes("pend")) return "Pending";
  if (s.includes("sold") || s.includes("closed")) return "Sold";
  return "Active";
}

/** Simplifies IDX's propType/propSubType into the app's existing coarse
 *  type categories (House/Condo/Townhouse/Multi-Family/Land). */
function simpleType(raw: RawIdxListing): string {
  const sub = (raw.propSubType || "").toLowerCase();
  if (sub.includes("land") || sub.includes("lot")) return "Land";
  if (sub.includes("condo")) return "Condo";
  if (sub.includes("townhouse") || sub.includes("town house")) return "Townhouse";
  if (sub.includes("multi") || sub.includes("duplex") || sub.includes("triplex")) return "Multi-Family";
  return "House";
}

/** IDX's soldpending feed mixes closed LEASES in with closed sales - the rent
 *  lands in the same price field, so a $4,250/month rental reads as a $4,250
 *  sale sitting beside $3.8M closings. Nothing in the site presents rentals as
 *  a category, so they are dropped here at the fetch rather than at each of the
 *  five places sold listings are rendered. */
export function isLease(raw: RawIdxListing): boolean {
  return (raw.propType || "").toLowerCase().includes("lease");
}

export async function fetchRawListings(): Promise<RawIdxListing[]> {
  const [featured, soldpending] = await Promise.all([
    idxFetch<RawIdxListResponse>("clients/featured"),
    idxFetch<RawIdxListResponse>("clients/soldpending"),
  ]);
  return [...Object.values(featured?.data || {}), ...Object.values(soldpending?.data || {})].filter(
    (raw) => !isLease(raw)
  );
}

/** List-page shape (app/home-search/listings.ts's Listing). */
export function toListing(raw: RawIdxListing, index: number): Listing {
  const adv = raw.advanced || {};
  return {
    id: index,
    slug: raw.detailsUrlSlug.toLowerCase(),
    price: raw.price,
    beds: raw.bedrooms ?? null,
    baths: raw.totalBaths ?? null,
    sqft: raw.sqFt ? Number(raw.sqFt.replace(/[^0-9.]/g, "")) || null : null,
    lot: typeof adv.lotSizeDimensions === "string" ? adv.lotSizeDimensions : raw.acres ? `${raw.acres} Acres` : null,
    addr: raw.address,
    city: cityState(raw),
    zip: raw.zipcode,
    mls: raw.listingID,
    type: simpleType(raw),
    img: photos(raw)[0] || "",
    status: statusOf(raw),
    order: index,
    lat: Number(raw.latitude),
    lng: Number(raw.longitude),
    areas: areasOf(raw),
  };
}

/** PropertyCard's shape — used for the property listing page and the
 *  homepage/team "recently sold" grids. */
export function toPropertyItem(raw: RawIdxListing): PropertyItem & { slug: string } {
  const sold = statusOf(raw) === "Sold";
  const priceStr = sold && raw.soldPrice != null ? money(Number(raw.soldPrice)) : raw.listingPrice;
  return {
    slug: raw.detailsUrlSlug.toLowerCase(),
    mlsId: raw.listingID,
    img: photos(raw)[0] || "",
    alt: raw.address,
    location: cityState(raw),
    price: priceStr,
    address: raw.address,
    beds: String(raw.bedrooms ?? "—"),
    baths: String(raw.totalBaths ?? "—"),
    sqft: raw.sqFt || "—",
    badge: statusOf(raw),
    badgeGold: !sold,
  };
}

function yn(v: unknown): string {
  return v === "yes" || v === "y" ? "Yes" : v === "no" || v === "n" ? "No" : "—";
}
function joinArr(v: unknown): string {
  return Array.isArray(v) && v.length ? v.filter((x) => x && x !== "None").join(", ") : "—";
}

function monthDayYear(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/** Detail-page shape (app/[slug]/data.ts's Listing) — uses the
 *  `advanced` field bag for Interior/Exterior/Details, remarksConcat for
 *  the overview copy, and synthesizes a short history from dateAdded/
 *  soldDate rather than fabricating a full transaction history (IDX has no
 *  price-history endpoint). */
export function toDetailListing(raw: RawIdxListing): DetailListing {
  const adv = raw.advanced || {};
  const sold = statusOf(raw) === "Sold";
  const price = sold && raw.soldPrice != null ? Number(raw.soldPrice) : raw.price;
  const sqftNum = raw.sqFt ? Number(raw.sqFt.replace(/[^0-9.]/g, "")) : 0;
  const perSqft = sqftNum ? `${money(Math.round(price / sqftNum))} / sqft` : "";

  const interior: Feature[] = [
    { label: "Total Stories", value: String(adv.storiesTotal ?? "—") },
    { label: "Bedrooms", value: String(raw.bedrooms ?? "—") },
    { label: "Total Bathrooms", value: String(raw.totalBaths ?? "—") },
    { label: "Full Bathrooms", value: String(raw.fullBaths ?? "—") },
    { label: "Half Bathrooms", value: String(raw.halfBaths ?? "—") },
    { label: "Appliances", value: joinArr(adv.appliances) },
    { label: "Laundry Description", value: joinArr(adv.laundryFeatures) },
    { label: "Floor Description", value: joinArr(adv.flooring) },
    { label: "Fireplace", value: yn(adv.fireplaceYN) },
    { label: "Fireplace Description", value: joinArr(adv.fireplaceFeatures) },
    { label: "Cooling", value: yn(adv.coolingYN) },
    { label: "Cooling Description", value: joinArr(adv.cooling) },
    { label: "Heating", value: yn(adv.heatingYN) },
    { label: "Heating Description", value: joinArr(adv.heating) },
  ];

  const exterior: Feature[] = [
    { label: "Lot Size", value: typeof adv.lotSizeSquareFeet === "number" ? `${adv.lotSizeSquareFeet.toLocaleString()} sqft` : raw.acres ? `${raw.acres} Acres` : "—" },
    { label: "Pool", value: yn(adv.poolPrivateYN) },
    { label: "Pool Description", value: joinArr(adv.poolFeatures) },
    { label: "Spa", value: yn(adv.spaYN) },
    { label: "Parking Spaces", value: String(adv.parkingTotal ?? "—") },
    { label: "Parking Description", value: joinArr(adv.parkingFeatures) },
    { label: "Architecture", value: joinArr(adv.architecturalStyle) },
    { label: "View", value: yn(adv.viewYN) === "Yes" ? joinArr(adv.view) : "No" },
  ];

  const details: Feature[] = [
    { label: "Property Type", value: `${raw.propType || "Residential"}${raw.propSubType ? ` — ${raw.propSubType}` : ""}` },
    { label: "Year Built", value: String(raw.yearBuilt ?? "—") },
    { label: "MLS #", value: raw.listingID },
    { label: "County", value: raw.countyName || "—" },
    { label: "Status", value: raw.propStatus || "—" },
    { label: "Price / SqFt", value: perSqft || "—" },
  ];

  const history: HistoryItem[] = [];
  if (sold && raw.soldDate) {
    history.push({ event: "Sold", sub: `${monthDayYear(raw.soldDate)} · Andrew Liberty Team`, price: raw.soldPrice != null ? money(Number(raw.soldPrice)) : undefined });
  }
  if (raw.dateAdded) {
    history.push({ event: "Listed for sale", sub: `${monthDayYear(raw.dateAdded)} · MLS ${raw.idxID}`, price: raw.listingPrice });
  }
  if (raw.yearBuilt) {
    history.push({ event: "Built", sub: `${raw.yearBuilt}` });
  }

  // CRMLS policy: only the primary photo is displayable off-MLS for
  // Closed/Expired/Cancelled listings — every other gallery photo 404s at
  // the source, confirmed live. Pending listings aren't covered by that
  // rule, so only truncate for Sold.
  const fullGallery = photos(raw);
  const gallery = sold ? fullGallery.slice(0, 1) : fullGallery;

  return {
    slug: raw.detailsUrlSlug.toLowerCase(),
    mlsId: raw.listingID,
    address: raw.address,
    city: cityState(raw),
    price: sold ? money(price) : raw.listingPrice,
    perSqft,
    status: raw.propStatus || (sold ? "Sold" : "Active"),
    listed: raw.dateAdded ? `Listed ${monthDayYear(raw.dateAdded)}` : "",
    beds: String(raw.bedrooms ?? "—"),
    baths: String(raw.totalBaths ?? "—"),
    sqft: raw.sqFt || "—",
    built: String(raw.yearBuilt ?? "—"),
    type: simpleType(raw),
    gallery: gallery.length ? gallery : [""],
    moreCount: Math.max(0, gallery.length - 5),
    overview: raw.remarksConcat ? [raw.remarksConcat] : [],
    features: { interior, exterior, details },
    lat: Number(raw.latitude),
    lng: Number(raw.longitude),
    pin: money(price),
    history,
  };
}

export type SystemLink = { name: string; url: string; category: string };

let systemLinksCache: Promise<SystemLink[]> | null = null;

export async function fetchSystemLinks(): Promise<SystemLink[]> {
  if (!systemLinksCache) {
    systemLinksCache = idxFetch<SystemLink[]>("clients/systemlinks").then((r) => r ?? []).catch((err: unknown) => {
      systemLinksCache = null;
      throw err;
    });
  }
  return systemLinksCache;
}

/** IDX returns 409 "Lead already exists" for an email already on file —
 *  a routine case (a repeat visitor), not a failure. Falls back to
 *  looking the existing lead up instead of throwing. */
export async function createLead(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  comments?: string;
}): Promise<string | null> {
  try {
    const res = await idxFetch<{ newID?: number | string }>("leads/lead", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return res?.newID != null ? String(res.newID) : null;
  } catch {
    return findLeadByEmail(input.email).catch(() => null);
  }
}

type RawLead = { id: string; email: string };

export async function findLeadByEmail(email: string): Promise<string | null> {
  const res = await idxFetch<{ data?: RawLead[] }>(`leads/lead?email=${encodeURIComponent(email)}`);
  const match = (res?.data || []).find((l) => l.email.toLowerCase() === email.toLowerCase());
  return match ? match.id : null;
}

export async function saveLeadSearch(
  leadId: string,
  input: { searchName: string; search: Record<string, string> }
): Promise<boolean> {
  const res = await fetch(`/api/idx/leads/search/${leadId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return res.ok;
}

export type SavedSearch = {
  id: string;
  searchName: string;
  criteria: Record<string, unknown>;
  created: string;
  resultsUrl: string;
};

export async function getLeadSearches(leadId: string): Promise<SavedSearch[]> {
  type RawSearch = { id: string; searchName: string; search: Record<string, unknown>; created: string; resultsURL: string };
  const res = await idxFetch<{ searchInformation?: RawSearch[] }>(`leads/search/${leadId}`);
  return (res?.searchInformation || []).map((s) => ({
    id: s.id,
    searchName: s.searchName,
    criteria: s.search,
    created: s.created,
    resultsUrl: s.resultsURL,
  }));
}

export async function deleteLeadSearch(leadId: string, searchId: string): Promise<boolean> {
  const res = await fetch(`/api/idx/leads/search/${leadId}/${searchId}`, { method: "DELETE" });
  return res.ok;
}

/** This account has a single MLS board — every listing's idxID is this. */
export const ACCOUNT_IDX_ID = "e025";

type RawLeadFavorite = { id: string; listingID: string };

export async function getLeadFavorites(leadId: string): Promise<Map<string, string>> {
  const res = await idxFetch<RawLeadFavorite[]>(`leads/property/${leadId}`);
  const map = new Map<string, string>();
  for (const row of res || []) map.set(row.listingID, row.id);
  return map;
}

/** IDX returns a raw 500 (not a clean error) for a listing already favorited
 *  by this lead — a routine case (double-click, stale local state), not a
 *  real failure. Falls back to checking whether it's already saved. */
export async function saveLeadFavorite(leadId: string, listingId: string): Promise<string | null> {
  try {
    const res = await idxFetch<{ newID?: number | string }>(`leads/property/${leadId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        propertyName: listingId,
        property: { idxID: ACCOUNT_IDX_ID, listingID: listingId },
      }),
    });
    return res?.newID != null ? String(res.newID) : null;
  } catch {
    const existing = await getLeadFavorites(leadId).catch(() => new Map<string, string>());
    return existing.get(listingId) ?? null;
  }
}

export async function deleteLeadFavorite(leadId: string, favoriteId: string): Promise<boolean> {
  const res = await fetch(`/api/idx/leads/property/${leadId}/${favoriteId}`, { method: "DELETE" });
  return res.ok;
}
