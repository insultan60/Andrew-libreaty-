import type { Metadata } from "next";
import { ArrowRight } from "../components/icons";
import PropertyListingsSection from "./PropertyListingsSection";
import { fetchRawListingsServer } from "@/lib/idxServer";
import Faq, { type FaqItem } from "../components/home/Faq";

export const metadata: Metadata = {
  title: "Los Angeles Home Listings and Sales | Andrew Liberty",
  description:
    "Featured listings and past transactions from the Andrew Liberty Team — strategic real estate across Studio City, Sherman Oaks, the Hollywood Hills and greater Los Angeles.",
  alternates: { canonical: "/property" },
};

const HERO_GALLERY = [
  { src: "/images/sold-studio-city.jpg", alt: "Modern hillside residence, Studio City" },
  { src: "/images/sold-hollywood-hills.jpg", alt: "Luxury estate with pool, Hollywood Hills" },
  { src: "/images/sold-toluca-lake.jpg", alt: "Architectural glass home, Toluca Lake" },
];

/* Rendered at the foot of the page; the Faq component emits the matching
   FAQPage structured data from this same array. */
const FAQS: FaqItem[] = [
  {
    q: "Can I see a home before it is publicly listed?",
    a: "Sometimes. Some homes are marketed to a limited audience before they reach public sites, or sell privately. Ask Andrew what is coming soon, and tell him your budget and preferred areas so he can reach out when something fits.",
  },
  {
    q: "Are the photos in a listing accurate?",
    a: "Listing photos are usually professional, and many are edited, staged, or taken with wide-angle lenses. Rooms can look larger than they are. Watch the video or 3D tour if there is one, and tour in person before you make an offer.",
  },
  {
    q: "Can I tour a home on the same day?",
    a: "Often, but it depends on the seller's schedule and the listing's showing rules. Some homes need advance notice, and occupied homes may have set showing hours. Call Andrew at (310) 709-0581 to ask about timing.",
  },
  {
    q: "What should I bring to a home tour?",
    a: "Bring your pre-approval letter if you have one, plus a short list of must-haves and deal-breakers. Take your own photos and notes, because several homes blend together after a day of touring.",
  },
  {
    q: "How do I know if a listing is overpriced?",
    a: "Compare its price with recent sales of similar homes nearby, looking at size, condition, lot, and location. A home priced well above those sales is likely overpriced. Andrew can prepare this comparison for any listing you are considering.",
  },
  {
    q: "What if I like a home but have to sell mine first?",
    a: "You can make an offer that depends on selling your current home, but many sellers prefer offers without that condition. Talk with your lender and Andrew before you tour, so you know your options, such as a bridge loan or a timed sale.",
  },
  {
    q: "Will the listing agent represent me too?",
    a: "The listing agent works for the seller. California allows one agent to represent both sides with written consent, but most buyers choose their own agent so someone is working only for them.",
  },
  {
    q: "What if the home I want goes pending?",
    a: "Ask Andrew whether the seller will take backup offers. Pending sales sometimes fall through because of inspection, appraisal, or financing problems, so a backup offer can still lead to a purchase.",
  },
  {
    q: "Does a listing show fire, flood, or earthquake risk?",
    a: "Not usually. Check state and local hazard maps, and get an insurance quote before you make an offer. This matters most in hillside and canyon areas.",
  },
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
          {/* The hero's display label, not a heading: the page's H1 is the
              intro section directly below. */}
          <p className="prop-hero-title">Properties</p>
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

      {/* ============ INTRO (the page's H1) ============ */}
      <section className="prop-section prop-intro">
        <div className="container">
          <div className="section-head reveal">
            <h1 className="section-title">Los Angeles Home Listings, Hand-Picked by Andrew</h1>
            <p className="section-sub">
              From Studio City to Tarzana, see the Los Angeles home listings Andrew Liberty has on the
              market and the homes he has recently sold. Select any home to view photos, price, beds,
              baths, and square footage.
            </p>
          </div>
        </div>
      </section>

      <PropertyListingsSection initialListings={initialListings} />

      {/* ============ NEXT MOVE ============
          Replaces both "Start Your Property Search" and "Beyond the
          Transaction": one closing call to action with the three routes off
          this page, in the client's order of priority. */}
      <section className="prop-beyond-wrap">
        <div className="container">
          <div className="prop-beyond reveal">
            <h2>Ready to make your next move?</h2>
            <p>
              Search all available homes in Los Angeles, find out what your own home could sell for, or
              talk with Andrew about your goals.
            </p>
            <div className="prop-beyond-ctas">
              <a href="/home-search" className="btn btn-gold btn-magnetic">
                <span>Browse Homes for Sale</span>
                <ArrowRight />
              </a>
              <a href="/home-valuation" className="btn btn-secondary">
                Get Your Free Home Value
              </a>
            </div>
            <a href="/contact" className="prop-beyond-link">
              Talk to Andrew
            </a>
          </div>
        </div>
      </section>

      <Faq faqs={FAQS} />
    </>
  );
}
