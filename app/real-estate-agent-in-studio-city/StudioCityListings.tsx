"use client";

import Link from "next/link";
import { useIdxListings } from "@/hooks/useIdxListings";
import { toPropertyItem, type RawIdxListing } from "@/lib/idx";
import { inArea } from "@/lib/areas";
import PropertyCard from "../property/PropertyCard";
import PageLoader from "../components/PageLoader";
import { ArrowRight } from "../components/icons";

/* Most a neighbourhood page shows before handing over to the full search. */
const MAX = 9;

/**
 * Every Studio City listing in Andrew's IDX feed, for sale first, then sold —
 * the same homes /home-search shows when filtered to Studio City.
 *
 * page.tsx fetches the feed on the server and passes the Studio City subset
 * in, so the cards are in the HTML search engines receive. If IDX did not
 * answer there, this falls back to fetching in the browser.
 *
 * Matching is lib/areas.ts's "studio-city" (city name OR ZIP 91604), which
 * also catches the feed's listings filed under "Los Angeles" with a Studio
 * City ZIP.
 */
export default function StudioCityListings({
  initialListings,
  tone = "ivory",
}: {
  initialListings?: RawIdxListing[] | null;
  /** Section background, so the page can keep its ivory/stone alternation. */
  tone?: "ivory" | "stone";
}) {
  const { data, loading, error } = useIdxListings(initialListings);
  const items = (data ?? []).filter((raw) => inArea(raw, "studio-city")).map(toPropertyItem);
  const forSale = items.filter((p) => p.badge !== "Sold");
  const sold = items.filter((p) => p.badge === "Sold");
  const shown = [...forSale, ...sold].slice(0, MAX);

  return (
    <section className={`sc-section sc-bg-${tone}`} id="listings">
      <div className="container">
        <div className="sc-section-head">
          <span className="sc-eyebrow">LISTINGS</span>
          <h2 className="sc-title">Studio City Homes for Sale and Recently Sold</h2>
          <p className="sc-sub">
            Andrew&apos;s Studio City listings straight from the MLS: homes on the market now, followed by
            recent sales. Select any home to view photos, price, beds, baths, and square footage.
          </p>
        </div>

        {loading ? (
          <PageLoader label="Loading Studio City listings…" />
        ) : error ? (
          <p style={{ textAlign: "center", color: "var(--muted)" }}>
            Listings are unavailable right now — please try again shortly.
          </p>
        ) : shown.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--muted)" }}>
            No Studio City listings right now — search the full MLS below.
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
        <div className="prop-more">
          <Link href="/home-search" className="btn btn-gold btn-magnetic">
            <span>Search All Studio City Homes</span>
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
