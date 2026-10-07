"use client";

import { useIdxListings } from "@/hooks/useIdxListings";
import { toPropertyItem, type RawIdxListing } from "@/lib/idx";
import PropertyCard from "../PropertyCard";
import PageLoader from "../../components/PageLoader";

/* Every closing, uncapped — /property shows the first nine and links here.
   useIdxListings caches its fetch at module level, so arriving from that page
   costs no second request against IDX's hourly limit. */
export default function SoldListingsSection({
  initialListings,
}: {
  initialListings?: RawIdxListing[] | null;
}) {
  const { data, loading, error } = useIdxListings(initialListings);
  const sold = (data ?? []).map(toPropertyItem).filter((p) => p.badge === "Sold");

  return (
    <section className="prop-section">
      <div className="container">
        {loading ? (
          <PageLoader label="Loading sold listings…" />
        ) : error ? (
          <p style={{ textAlign: "center", color: "var(--muted)" }}>
            Sold listings are unavailable right now — please try again shortly.
          </p>
        ) : sold.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--muted)" }}>No sold listings to show yet.</p>
        ) : (
          <>
            <p className="prop-count">
              {sold.length} closed {sold.length === 1 ? "transaction" : "transactions"}
            </p>
            <div className="prop-grid">
              {sold.map((p) => (
                <PropertyCard
                  key={p.slug}
                  p={p}
                  href={p.href}
                 
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
