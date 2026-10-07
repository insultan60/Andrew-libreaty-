"use client";

import { useIdxListings } from "@/hooks/useIdxListings";
import { toPropertyItem } from "@/lib/idx";
import PropertyCard from "../property/PropertyCard";
import PageLoader from "../components/PageLoader";

export default function PastTransactions() {
  const { data, loading } = useIdxListings();
  const sold = (data ?? [])
    .map(toPropertyItem)
    .filter((p) => p.badge === "Sold")
    .slice(0, 8);

  return (
    <section className="pt-section">
      <div className="container">
        <div className="pt-head reveal">
          <div>
            <h2 className="section-title">Past Transactions</h2>
            <p className="section-sub">
              A look at deals successfully navigated with strategy, discipline, and strong outcomes.
            </p>
          </div>
        </div>

        {loading ? (
          <PageLoader />
        ) : sold.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--muted)" }}>No sold listings to show yet.</p>
        ) : (
          <div className="prop-grid">
            {sold.map((p) => (
              <PropertyCard key={p.slug} p={p} href={p.href} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
