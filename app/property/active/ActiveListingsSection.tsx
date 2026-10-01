"use client";

import { useIdxListings } from "@/hooks/useIdxListings";
import { toPropertyItem, type RawIdxListing } from "@/lib/idx";
import PropertyCard from "../PropertyCard";
import PageLoader from "../../components/PageLoader";

/* Every listing still on the market, uncapped — /property shows the featured
   grid and links here. useIdxListings caches its fetch at module level, so
   arriving from that page costs no second request against IDX's hourly limit.

   The filter is "not Sold" rather than "Active" on purpose. statusOf() in
   lib/idx.ts returns three values — Active, Sold and Pending — and the
   /property page filters for Active and Sold only, so a Pending listing was
   fetched and then rendered nowhere on the entire site. The feed happens to
   carry zero pending today, which is why nobody noticed; the moment one goes
   under contract it would vanish instead of showing as Pending. Here it is
   included and keeps its own badge. */
export default function ActiveListingsSection({
  initialListings,
}: {
  initialListings?: RawIdxListing[] | null;
}) {
  const { data, loading, error } = useIdxListings(initialListings);
  const active = (data ?? []).map(toPropertyItem).filter((p) => p.badge !== "Sold");

  return (
    <section className="prop-section">
      <div className="container">
        {loading ? (
          <PageLoader label="Loading active listings…" />
        ) : error ? (
          <p style={{ textAlign: "center", color: "var(--muted)" }}>
            Active listings are unavailable right now — please try again shortly.
          </p>
        ) : active.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--muted)" }}>
            No active listings right now — check back soon.
          </p>
        ) : (
          <>
            <p className="prop-count">
              {active.length} {active.length === 1 ? "listing" : "listings"} on the market
            </p>
            <div className="prop-grid">
              {active.map((p) => (
                <PropertyCard key={p.slug} p={p} href={`/${p.slug}`} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
