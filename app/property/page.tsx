import type { Metadata } from "next";
import { ArrowRight } from "../components/icons";
import PropertyListingsSection from "./PropertyListingsSection";
import { fetchRawListingsServer } from "@/lib/idxServer";

export const metadata: Metadata = {
  title: "Properties — Andrew Liberty Team | Los Angeles Real Estate",
  description:
    "Featured listings and past transactions from the Andrew Liberty Team — strategic real estate across Studio City, Sherman Oaks, the Hollywood Hills and greater Los Angeles.",
  alternates: { canonical: "/property" },
};

const HERO_GALLERY = [
  { src: "/images/sold-studio-city.jpg", alt: "Modern hillside residence, Studio City" },
  { src: "/images/sold-hollywood-hills.jpg", alt: "Luxury estate with pool, Hollywood Hills" },
  { src: "/images/sold-toluca-lake.jpg", alt: "Architectural glass home, Toluca Lake" },
];

/* Listings are fetched on the server and handed to the section, so the cards
   (addresses, prices, links to each listing page) are in the HTML a crawler
   receives instead of arriving seconds later from the browser — the same fix
   /home-search had for its soft-404 report. If IDX does not answer, the
   section falls back to its old client-side fetch.
   The feed itself is cached for fifteen minutes in lib/idxServer.ts. */
export const revalidate = 900;

export default async function PropertiesPage() {
  const initialListings = await fetchRawListingsServer();
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="prop-hero">
        <div className="container">
          <h1 className="prop-hero-title">Properties</h1>
          <div className="prop-hero-gallery">
            {HERO_GALLERY.map((g) => (
              <div className="prop-tile" key={g.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={g.alt} loading="eager" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <PropertyListingsSection initialListings={initialListings} />

      {/* ============ START YOUR SEARCH ============ */}
      <section className="prop-searchband-wrap">
        <div className="container">
          <div className="prop-searchband reveal">
            <h2>Start Your Property Search</h2>
            <a href="/home-search" className="btn btn-gold btn-magnetic">
              <span>Browse Homes</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ============ BEYOND THE TRANSACTION ============ */}
      <section className="prop-beyond-wrap">
        <div className="container">
          <div className="prop-beyond reveal">
            <p className="eyebrow">The Long View</p>
            <h2>Beyond the Transaction</h2>
            <p>
              Our team brings together real-world experience, thoughtful strategy, and a calm,
              hands-on approach to help clients move with clarity. From homes to investments, we
              focus on smart decisions, not unnecessary complexity.
            </p>
            <div className="prop-beyond-ctas">
              <a href="/contact" className="btn btn-gold btn-magnetic">
                <span>Contact Us</span>
                <ArrowRight />
              </a>
              <a href="/home-search" className="btn btn-secondary">
                Browse Homes
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
