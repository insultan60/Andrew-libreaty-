import type { Metadata } from "next";
import { ArrowRight } from "../../components/icons";
import ActiveListingsSection from "./ActiveListingsSection";
import { fetchRawListingsServer } from "@/lib/idxServer";

const TITLE = "Active Listings — Andrew Liberty Team | Los Angeles Real Estate";
const DESCRIPTION =
  "Every home currently on the market with the Andrew Liberty Team across Studio City, Sherman Oaks, the Hollywood Hills and greater Los Angeles.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/property/active" },
};

/* Listings are fetched on the server and handed to the section, so the cards
   (addresses, prices, links to each listing page) are in the HTML a crawler
   receives instead of arriving seconds later from the browser — the same fix
   /home-search had for its soft-404 report. If IDX does not answer, the
   section falls back to its old client-side fetch.
   The feed itself is cached for fifteen minutes in lib/idxServer.ts. */
export const revalidate = 900;

export default async function ActiveListingsPage() {
  const initialListings = await fetchRawListingsServer();
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="prop-hero">
        <div className="container">
          <h1 className="prop-hero-title">Active Listings</h1>
          <p className="prop-hero-sub">
            Every home currently on the market, in one place.
          </p>
        </div>
      </section>

      <ActiveListingsSection initialListings={initialListings} />

      {/* ============ START YOUR SEARCH ============ */}
      <section className="prop-searchband-wrap">
        <div className="container">
          <div className="prop-searchband reveal">
            <h2>Not Seeing the Right Fit?</h2>
            <a href="/home-search" className="btn btn-gold btn-magnetic">
              <span>Search Every Listing</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
