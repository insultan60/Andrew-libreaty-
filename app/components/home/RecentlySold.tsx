"use client";

import { useIdxListings } from "@/hooks/useIdxListings";
import { toPropertyItem } from "@/lib/idx";
import { inArea, type AreaKey } from "@/lib/areas";
import PropertyCard from "../../property/PropertyCard";
import PageLoader from "../PageLoader";

export default function RecentlySold({
  title = "Recently Sold",
  subtitle,
  area,
}: {
  title?: string;
  subtitle?: string;
  /** Scope the section to one neighborhood. Omit for the whole feed. */
  area?: AreaKey;
} = {}) {
  const { data, loading } = useIdxListings();
  const sold = (data ?? [])
    .filter((raw) => (area ? inArea(raw, area) : true))
    .map(toPropertyItem)
    .filter((p) => p.badge === "Sold")
    .slice(0, 6);

  /* Scoped to a neighborhood, the section is only worth showing if that
     neighborhood has closings in the feed. A heading over "no sold listings
     yet" reads worse on a page selling local expertise than no section at
     all, and this way each page picks the block up by itself once a sale
     lands there. Unscoped (the homepage) keeps the empty state, because
     there the section is expected and its absence would be the surprise. */
  if (area && (loading || sold.length === 0)) return null;

  return (
    <section className="section section-sold" id="sold">
      <div className="container">
        {/* No "reveal" in area mode: GlobalEffects snapshots .reveal once per
            route, and in that mode this whole section mounts after the IDX
            fetch resolves — too late to be observed, so it would sit at
            opacity 0 for good. */}
        <div className={`section-head${area ? "" : " reveal"}`}>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-sub">{subtitle}</p>}
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
