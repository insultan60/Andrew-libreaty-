"use client";

import Link from "next/link";
import { useIdxListings } from "@/hooks/useIdxListings";
import { toPropertyItem, type RawIdxListing } from "@/lib/idx";
import { inArea, type AreaKey } from "@/lib/areas";
import PropertyCard from "../property/PropertyCard";
import PageLoader from "./PageLoader";
import MlsSearchCard from "./MlsSearchCard";
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

  /* Nothing in this area right now: rather than an empty section, show three
     of Andrew's other homes, for sale first. They keep their own city label
     and the note above them says they're from elsewhere, so none of them is
     passed off as being in this area. Only works when the page passes the
     whole feed, not just the area's subset. */
  const others =
    shown.length === 0
      ? (() => {
          const rest = (data ?? []).filter((raw) => !inArea(raw, area)).map(toPropertyItem);
          return [...rest.filter((p) => p.badge !== "Sold"), ...rest.filter((p) => p.badge === "Sold")].slice(0, 3);
        })()
      : [];

  /* A row of fewer than three cards gets the full-MLS card in the gap, so a
     thin area still leads somewhere. It also replaces the "Search All" button
     below, which would say the same thing twice. */
  const search = `/home-search?area=${area}`;
  const row = shown.length || others.length;
  const fill = !loading && !error && row < 3;

  return (
    <>
      {loading ? (
        <PageLoader label={`Loading ${place} listings…`} />
      ) : error ? (
        <p style={{ textAlign: "center", color: "var(--muted)" }}>
          Listings are unavailable right now — please try again shortly.
        </p>
      ) : shown.length === 0 && others.length > 0 ? (
        <>
          <p className="area-listings-note">
            No {place} listings right now. Here are other homes Andrew has listed and sold.
          </p>
          <div className="prop-grid">
            {others.map((p) => (
              <PropertyCard key={p.slug} p={p} href={p.href} />
            ))}
            {fill && <MlsSearchCard href={search} place={place} beside={others.length} />}
          </div>
        </>
      ) : shown.length === 0 ? (
        <div className="prop-grid">
          <MlsSearchCard href={search} place={place} beside={0} />
        </div>
      ) : (
        <div className="prop-grid">
          {shown.map((p) => (
            <PropertyCard key={p.slug} p={p} href={p.href} />
          ))}
          {fill && <MlsSearchCard href={search} place={place} beside={shown.length} />}
        </div>
      )}

      {/* No "reveal" class: in the browser-fetch fallback this mounts after
          GlobalEffects has snapshotted .reveal, and would stay invisible. */}
      {!fill && (
        <div className="area-listings-more">
          <Link href={search} className="btn btn-gold btn-magnetic">
            <span>Search All {place} Homes</span>
            <ArrowRight />
          </Link>
        </div>
      )}
    </>
  );
}
