"use client";

import Link from "next/link";
import { useIdxListings } from "@/hooks/useIdxListings";
import { toPropertyItem, type RawIdxListing } from "@/lib/idx";
import { inArea, type AreaKey } from "@/lib/areas";
import PropertyCard from "../property/PropertyCard";
import PageLoader from "./PageLoader";
import { ArrowRight } from "./icons";

/**
 * One neighbourhood's listings from Andrew's IDX feed — for sale first, then
 * sold — as a card grid with a "search all" link under it. Only the grid and
 * the link: the page supplies the section and heading in its own design.
 *
 * The page should fetch the feed on the server (fetchRawListingsServer) and
 * pass the area's subset as initialListings, so the cards are in the HTML
 * search engines receive. If IDX did not answer there, this falls back to
 * fetching in the browser.
 *
 * Every card is labelled with the neighbourhood rather than the feed's city
 * field, which files some homes under "Los Angeles" — they have already been
 * matched to this area by lib/areas.ts.
 */
export default function AreaListings({
  initialListings,
  area,
  place,
  max = 9,
}: {
  initialListings?: RawIdxListing[] | null;
  area: AreaKey;
  /** Display name, e.g. "Laurel Canyon". */
  place: string;
  max?: number;
}) {
  const { data, loading, error } = useIdxListings(initialListings);
  const items = (data ?? [])
    .filter((raw) => inArea(raw, area))
    .map(toPropertyItem)
    .map((p) => ({ ...p, location: `${place}, CA` }));
  const shown = [
    ...items.filter((p) => p.badge !== "Sold"),
    ...items.filter((p) => p.badge === "Sold"),
  ].slice(0, max);

  return (
    <>
      {loading ? (
        <PageLoader label={`Loading ${place} listings…`} />
      ) : error ? (
        <p style={{ textAlign: "center", color: "var(--muted)" }}>
          Listings are unavailable right now — please try again shortly.
        </p>
      ) : shown.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--muted)" }}>
          No {place} listings right now — search the full MLS below.
        </p>
      ) : (
        <div className="prop-grid">
          {shown.map((p) => (
            <PropertyCard key={p.slug} p={p} href={`/${p.slug}`} />
          ))}
        </div>
      )}

      {/* No "reveal" class: in the browser-fetch fallback this mounts after
          GlobalEffects has snapshotted .reveal, and would stay invisible. */}
      <div className="area-listings-more">
        <Link href="/home-search" className="btn btn-gold btn-magnetic">
          <span>Search All {place} Homes</span>
          <ArrowRight />
        </Link>
      </div>
    </>
  );
}
