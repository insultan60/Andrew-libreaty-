import type { Metadata } from "next";
import { ArrowRight } from "../../components/icons";
import SoldListingsSection from "./SoldListingsSection";
import { fetchRawListingsServer } from "@/lib/idxServer";

const TITLE = "Sold Listings — Andrew Liberty Team | Los Angeles Real Estate";
const DESCRIPTION =
  "Every past transaction closed by the Andrew Liberty Team across Studio City, Sherman Oaks, the Hollywood Hills and greater Los Angeles.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/property/sold" },
  /* Kept out of search for now, along with each sold listing's own page (see
     listingMetadata in app/[slug]/listingRoute.tsx), and left out of the
     sitemap. Remove this and re-add "/property/sold" to ROUTES in
     app/sitemap.ts to index it again. */
  robots: { index: false, follow: true },
};

/* Listings are fetched on the server and handed to the section, so the cards
   (addresses, prices, links to each listing page) are in the HTML a crawler
   receives instead of arriving seconds later from the browser — the same fix
   /home-search had for its soft-404 report. If IDX does not answer, the
   section falls back to its old client-side fetch.
   The feed itself is cached for six hours in lib/idxServer.ts. */
export const revalidate = 21600;

export default async function SoldListingsPage() {
  const initialListings = await fetchRawListingsServer();
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="prop-hero">
        <div className="container">
          <h1 className="prop-hero-title">Sold Listings</h1>
          <p className="prop-hero-sub">
            Every deal navigated with strategy, discipline, and steady composure.
          </p>
        </div>
      </section>

      <SoldListingsSection initialListings={initialListings} />

      {/* ============ START YOUR SEARCH ============ */}
      <section className="prop-searchband-wrap">
        <div className="container">
          <div className="prop-searchband reveal">
            <h2>Looking for Your Next Home?</h2>
            <a href="/home-search" className="btn btn-gold btn-magnetic">
              <span>Browse Homes</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
