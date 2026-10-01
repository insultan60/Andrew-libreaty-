"use client";

import { useMemo } from "react";
import PropertyCard from "../property/PropertyCard";
import PropertyDetail from "./PropertyDetail";
import ComingSoon from "../components/ComingSoon";
import PageLoader from "../components/PageLoader";
import { useIdxListings } from "@/hooks/useIdxListings";
import { toDetailListing, toPropertyItem, type RawIdxListing } from "@/lib/idx";

export default function PropertyDetailClient({
  slug,
  initialListings,
}: {
  slug: string;
  /** Server-fetched: the listing plus its similar cards. See ./page.tsx. */
  initialListings?: RawIdxListing[] | null;
}) {
  const { data, loading } = useIdxListings(initialListings);

  const match = useMemo(() => {
    if (!data) return undefined;
    return data.find((raw) => raw.detailsUrlSlug.toLowerCase() === slug.toLowerCase());
  }, [data, slug]);

  const similar = useMemo(() => {
    if (!data) return [];
    return data
      .filter((raw) => raw.detailsUrlSlug.toLowerCase() !== slug.toLowerCase())
      .slice(0, 4)
      .map(toPropertyItem);
  }, [data, slug]);

  if (loading) {
    return (
      <div className="pd-page">
        <PageLoader label="Loading listing…" size="lg" />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="pd-page">
        <div className="container">
          <ComingSoon
            title="This Listing Is On The Way"
            body="We couldn't find that listing — it may have sold or come off the market. Browse active listings or reach out and we'll help you find something similar."
            ctaLabel="Browse Active Listings"
            ctaHref="/home-search"
          />
        </div>
      </div>
    );
  }

  const listing = toDetailListing(match);

  return (
    <div className="pd-page">
      <PropertyDetail listing={listing} />

      {similar.length > 0 && (
        <section className="pd-similar" id="similar">
          <div className="container">
            <div className="pd-similar-head">
              <h2>Similar Properties</h2>
            </div>
            <div className="pd-similar-grid">
              {similar.map((p) => (
                <PropertyCard key={p.slug} p={p} href={`/${p.slug}`} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pd-legal">
        <div className="container">
          <p>
            Based on information from the Multiple Listing Service. All measurements and square footages
            are approximate and have not been verified by the listing agent or broker. Buyer is advised
            to independently verify the accuracy of all information through personal inspection and with
            appropriate professionals. This is not intended to solicit property already listed. Andrew
            Liberty is a real estate licensee affiliated with Compass. Compass California, Inc. · CA DRE#
            01991628. Equal Housing Opportunity.
          </p>
        </div>
      </section>
    </div>
  );
}
