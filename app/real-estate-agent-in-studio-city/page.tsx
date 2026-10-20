import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/icons";
import JsonLd from "../components/JsonLd";
import {
  LifestyleShowcase,
  FaqAccordion,
} from "./StudioCityInteractive";
import { FAQ_ITEMS } from "./data";
import { SITE_URL, SITE_NAME, AGENT, abs } from "@/lib/site";
// Scoped to this page: every rule is under .sc-page, so it is loaded here
// rather than from the root layout.
import "./studio-city.css";
import StudioCityListings from "./StudioCityListings";
import { fetchRawListingsServer } from "@/lib/idxServer";
import { inArea } from "@/lib/areas";

/* The listings section is rendered from the server-side IDX feed, cached for
   six hours in lib/idxServer.ts; the page follows the same cadence. */
export const revalidate = 21600;

const PATH = "/real-estate-agent-in-studio-city";
/* Title and description from the October 2026 content brief (49 and 145
   characters). The WebPage node in the JSON-LD below carries the same pair. */
const TITLE = "Real Estate Agent in Studio City | Andrew Liberty";
const DESCRIPTION =
  "Real estate agent in Studio City: Andrew Liberty helps buyers, sellers, and investors with local knowledge, housing types, and market conditions.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    locale: "en_US",
    images: [{ url: "/images/studio-city.jpg", width: 1200, height: 630, alt: "Studio City, Los Angeles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/studio-city.jpg"],
  },
};

const IcPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
const IcChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>
);
const IcShake = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" /><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2.8 2.8 0 0 0-4 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a4.8 4.8 0 0 1 5.7-.8l.5.3a3 3 0 0 0 2 .4H21" /><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1.4 1.4 0 0 0 2-2M3 4h8" /></svg>
);

const WHY_POINTS = [
  {
    Icon: IcPin,
    title: "Local roots",
    text: "My office is on Ventura Place. My recent Studio City sales run from a $775,000 condo to a $3.8 million home.",
  },
  {
    Icon: IcChart,
    title: "Clear numbers",
    text: "I started in commercial real estate, so I check the numbers behind every deal and show you the sales behind every price.",
  },
  {
    Icon: IcShake,
    title: "Strong negotiation",
    text: "I am a Certified Real Estate Negotiation Expert, RealTrends Verified, and a Los Angeles Magazine Real Estate All-Star.",
  },
];

export default async function StudioCityPage() {
  // Only the Studio City subset goes to the client, not the whole feed.
  const feed = await fetchRawListingsServer();
  const studioCityListings = feed ? feed.filter((raw) => inArea(raw, "studio-city")) : null;

  return (
    <div className="sc-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Neighborhoods", item: abs("/neighborhoods") },
                { "@type": "ListItem", position: 3, name: "Studio City", item: abs(PATH) },
              ],
            },
            {
              "@type": "WebPage",
              "@id": `${abs(PATH)}#webpage`,
              url: abs(PATH),
              name: TITLE,
              description: DESCRIPTION,
              primaryImageOfPage: abs("/images/studio-city.jpg"),
              isPartOf: {
                "@type": "CollectionPage",
                "@id": `${abs("/neighborhoods")}#webpage`,
                url: abs("/neighborhoods"),
              },
              mainEntity: {
                "@type": "Service",
                "@id": `${abs(PATH)}#service`,
                name: "Real Estate Agent Services in Studio City",
                serviceType: "Real estate agent",
                description:
                  "Buying, selling, and investment guidance for homes in Studio City, with local knowledge of its housing types, micro-neighborhoods, and market conditions.",
                provider: { "@id": `${SITE_URL}/#agent` },
                areaServed: {
                  "@type": "Place",
                  "@id": `${abs(PATH)}#place`,
                  name: "Studio City",
                  description:
                    "A neighborhood in the southeast San Fernando Valley, City of Los Angeles, known for a walkable stretch of Ventura Boulevard, quiet tree-lined residential flats, and hillside streets climbing toward Mulholland.",
                  image: abs("/images/studio-city.jpg"),
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Studio City",
                    addressRegion: "CA",
                    postalCode: "91604",
                    addressCountry: "US",
                  },
                  // Not in the supplied schema; kept from the earlier Place node.
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 34.1483,
                    longitude: -118.3965,
                  },
                  containedInPlace: { "@type": "City", name: "Los Angeles" },
                  sameAs: "https://en.wikipedia.org/wiki/Studio_City,_Los_Angeles",
                },
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQ_ITEMS.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            },
          ],
        }}
      />

      {/* ==================================================================
          1. HERO SECTION
          ================================================================== */}
      <section className="sc-hero">
        {/* Looking north over Universal City and Studio City to the Valley.
            Photo: Leslie Cross on Unsplash (Unsplash License). */}
        <img
          className="sc-hero-bg"
          src="/images/studio-city-hero.jpg"
          alt="View from Mulholland over Studio City and the San Fernando Valley"
          fetchPriority="high"
        />
        <div className="container">
          <nav className="sc-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sc-crumb-sep">/</span>
            <Link href="/neighborhoods">Neighborhoods</Link>
            <span className="sc-crumb-sep">/</span>
            <span style={{ color: "#f6f5f1" }}>Studio City</span>
          </nav>

          <div className="sc-hero-content">
            {/* Was "INVESTING · INVESTING IN STUDIO CITY" — the word was
                duplicated, and it labelled the whole page as one of the three
                tracks it covers. The page is the neighbourhood guide; buying,
                selling and investing are the cards directly below. */}
            <span className="sc-eyebrow sc-eyebrow-light">
              NEIGHBORHOOD GUIDE · STUDIO CITY
            </span>
            <h1 className="sc-hero-title">
              Most Experienced Real Estate Agent
              <br />
              <em>in Studio City</em>
            </h1>
            <p className="sc-hero-desc">
              Hiring a real estate agent in Studio City? Pick one who knows the block, not just
              the ZIP code. Studio City has many small markets, and the right price depends on
              your street. As one of the real estate agents in Studio City, CA, I price by pocket,
              negotiate with proof, and explain every step in plain words.
            </p>
            <div className="sc-hero-ctas">
              <Link href="/home-search?area=studio-city" className="btn-gold">
                <span>Browse Studio City Homes</span>
                <ArrowRight />
              </Link>
              <Link href="/home-valuation" className="btn-outline-light">
                <span>Get Your Home Value</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================================
          WHERE TO START — buying, selling, investing
          Its own band below the hero (these cards used to sit inside it).
          The buyer and seller guides they pointed at were removed, so they
          now go to the pages that cover the same ground.
          ================================================================== */}
      <section className="sc-section sc-bg-stone sc-paths">
        <div className="container">
          <div className="sc-hero-action-grid">
            <Link href="/home-search?area=studio-city" className="sc-hero-action-card">
              <div>
                <span className="sc-hero-card-tag">BUYING</span>
                <h2>Buying in Studio City</h2>
                <p>
                  I show you what your budget really buys: which pocket, which home type, and which
                  school zone. Then I negotiate so you pay a fair price. Condos often start in the
                  $600,000s to $700,000s, and houses often start near $1 million.
                </p>
              </div>
              <span className="sc-hero-card-link">
                BROWSE STUDIO CITY HOMES <ArrowRight />
              </span>
            </Link>

            <Link href="/home-valuation" className="sc-hero-action-card">
              <div>
                <span className="sc-hero-card-tag">SELLING</span>
                <h2>Selling in Studio City</h2>
                <p>
                  Want to sell a house in Studio City? I start with a free home valuation based on
                  sales from your own streets.
                </p>
              </div>
              <span className="sc-hero-card-link">
                GET YOUR HOME VALUE <ArrowRight />
              </span>
            </Link>

            <Link href="/contact" className="sc-hero-action-card">
              <div>
                <span className="sc-hero-card-tag">INVESTING</span>
                <h2>Investing in Studio City</h2>
                <p>
                  I started in commercial real estate, so I run the numbers first: rents, costs,
                  rules, and resale value. I look at duplexes, small apartment buildings, and
                  development sites near the boulevard.
                </p>
              </div>
              <span className="sc-hero-card-link">
                EXPLORE OPPORTUNITIES <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2. ORIENTATION (Studio City at a Glance)
          ================================================================== */}
      <section className="sc-section sc-bg-ivory" id="orientation">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">ORIENTATION</span>
            <h2 className="sc-title">Studio City Real Estate, Street by Street</h2>
            <p className="sc-sub">
              Studio City sits where the Valley flats meet the Santa Monica Mountains. That splits
              the market into pockets, and I price each pocket on its own sales.
            </p>
          </div>

          <div className="sc-glance-grid">
            <div className="sc-glance-card">
              <span className="sc-glance-tag">LOCATION</span>
              <p>
                Southeast San Fernando Valley, City of Los Angeles, just west of the Cahuenga
                Pass. Yes, Studio City is part of LA.
              </p>
            </div>

            <div className="sc-glance-card">
              <span className="sc-glance-tag">PRIMARY ZIP</span>
              <p>
                91604. Some blocks sit in 91602 or 91607. I check the exact address before I pull
                sales, because the pocket matters more than the ZIP code.
              </p>
            </div>

            <div className="sc-glance-card">
              <span className="sc-glance-tag">KEY CORRIDORS</span>
              <p>
                Ventura Boulevard, Laurel Canyon Boulevard, Coldwater Canyon Avenue, Colfax
                Avenue, Moorpark Street, and Tujunga Avenue. The distance to these roads moves the
                price.
              </p>
            </div>

            <div className="sc-glance-card">
              <span className="sc-glance-tag">LOCAL CHARACTER</span>
              <p>
                A walkable stretch of Ventura, quiet tree-lined streets behind it, and private
                canyon and ridgeline streets above.
              </p>
            </div>

            <div className="sc-glance-card">
              <span className="sc-glance-tag">HOUSING STOCK</span>
              <p>
                Mostly single-family homes. I match sales by home type, not just size: 1920s to
                1940s character homes and ranches in the flats, mid-century and modern homes in
                the hills, and condos near the boulevard.
              </p>
            </div>

            {/* The brief also listed Woodland Hills here. It does not border
                Studio City (it is about 12 miles west, past Sherman Oaks and
                Encino), so it is left off rather than published as a neighbor. */}
            <div className="sc-glance-card">
              <span className="sc-glance-tag">BORDERING AREAS</span>
              <p>
                Sherman Oaks, Valley Village, North Hollywood, Toluca Lake, and the Hollywood
                Hills. If you shop in those areas too, I compare them with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          3. LIFESTYLE INTERACTIVE SHOWCASE
          ================================================================== */}
      <section className="sc-section sc-bg-stone" id="lifestyle">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">LIFESTYLE</span>
            <h2 className="sc-title">Living in Studio City: What to Know Before You Buy</h2>
            <p className="sc-sub">
              Where a home sits next to the boulevard, the hills, and the canyon roads shapes daily
              life and price. Here is what I check with each client.
            </p>
          </div>

          <LifestyleShowcase />

          <div className="sc-mls-cta">
            <div>
              <h3>Ready to see Studio City homes for sale?</h3>
              <p>
                Search every active Studio City listing on my MLS, from condos to hillside homes.
                When one looks right, I tell you what it should really sell for.
              </p>
            </div>
            <Link href="/home-search?area=studio-city" className="btn-gold">
              <span>Search My MLS</span>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. INVENTORY & HOUSING TYPES
          ================================================================== */}
      <section className="sc-section sc-bg-ivory" id="inventory">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">INVENTORY</span>
            <h2 className="sc-title">What Can You Buy in Studio City?</h2>
            <p className="sc-sub">Seven kinds of homes. Here is how I help with each one.</p>
          </div>

          <div className="sc-inventory-grid">
            <div className="sc-inventory-card">
              <div>
                <span className="sc-inventory-tag">MOST COMMON</span>
                <h3>Single-Family Homes</h3>
                <p className="sc-inventory-desc">
                  Houses for sale in Studio City, CA often start near $1 million. I match each house to the right set of sales, so you don&rsquo;t overpay or underprice.
                </p>
              </div>
            </div>

            <div className="sc-inventory-card">
              <div>
                <span className="sc-inventory-tag">ENTRY POINT</span>
                <h3>Condos &amp; Townhomes</h3>
                <p className="sc-inventory-desc">
                  Studio City condos for sale cluster along and just off Ventura, often in the $600,000s to $700,000s. I review HOA fees, reserves, and rules before you write an offer.
                </p>
              </div>
            </div>

            <div className="sc-inventory-card">
              <div>
                <span className="sc-inventory-tag">CHARACTER</span>
                <h3>Mid-Century Homes</h3>
                <p className="sc-inventory-desc">
                  Post-and-beam frames, walls of glass, and indoor-outdoor living. I check original wiring, windows, and records, so you know what is charming and what is cost.
                </p>
              </div>
            </div>

            <div className="sc-inventory-card">
              <div>
                <span className="sc-inventory-tag">DESIGN-LED</span>
                <h3>Modern &amp; Architectural</h3>
                <p className="sc-inventory-desc">
                  New builds and big remodels, mostly in the hills. I check the permits and the build quality behind the finish.
                </p>
              </div>
            </div>

            <div className="sc-inventory-card">
              <div>
                <span className="sc-inventory-tag">VIEWS</span>
                <h3>Hillside Properties</h3>
                <p className="sc-inventory-desc">
                  View lots on winding streets, often built in steps. I check walls, drainage, and road access before price talks.
                </p>
              </div>
            </div>

            <div className="sc-inventory-card">
              <div>
                <span className="sc-inventory-tag">UPPER TIER</span>
                <h3>Luxury Homes</h3>
                <p className="sc-inventory-desc">
                  Large new builds and estates in the hills and the Longridge area. I price them on views, lot size, and the few true comparables.
                </p>
              </div>
            </div>

            <div className="sc-inventory-card">
              <div>
                <span className="sc-inventory-tag">INCOME</span>
                <h3>Multifamily &amp; Income</h3>
                <p className="sc-inventory-desc">
                  Duplexes through small apartment buildings, mostly near the boulevard. I check rents, rent rules, and repair costs, and I test the numbers with my commercial background.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          LISTINGS — Studio City homes for sale and recently sold (IDX)
          ================================================================== */}
      <StudioCityListings initialListings={studioCityListings} tone="stone" />

      {/* ==================================================================
          13. WHY WORK WITH ANDREW
          From the October 2026 content brief, which drops the "Local Places
          & Daily Rhythm" section that sat above this and replaces the Meet
          Andrew bio with three proof points. The full bio is one click away
          on his team page.
          ================================================================== */}
      <section className="sc-section sc-bg-dark" id="why-andrew">
        <div className="container">
          <div className="sc-section-head text-center">
            <span className="sc-eyebrow sc-eyebrow-light">WHY ANDREW</span>
            <h2 className="sc-title sc-title-light">
              Why Work With Andrew, Your <em>Studio City</em> Realtor
            </h2>
            <p className="sc-sub sc-sub-light">
              People often search for the most experienced real estate agent in Studio City or the
              most recommended real estate agent in Studio City. A title can&apos;t prove either
              one. Proof can, and here is mine.
            </p>
          </div>

          <div className="sc-why-grid">
            {WHY_POINTS.map(({ Icon, title, text }) => (
              <div className="sc-why-card" key={title}>
                <span className="sc-why-icon">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div className="sc-hero-ctas" style={{ justifyContent: "center" }}>
            <a
              href="https://wa.me/13107090581"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight />
            </a>
            <Link href="/team/andrew-liberty" className="btn-outline-light">
              <span>Meet Andrew</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================
          14. PROCESS (How I Work With Clients)
          ================================================================== */}
      <section className="sc-section sc-bg-ivory" id="process">
        <div className="container">
          <div className="sc-section-head text-center">
            <span className="sc-eyebrow">PROCESS</span>
            <h2 className="sc-title">How I Work With Clients</h2>
            <p className="sc-sub">Six steps from first call to closing, built around your street.</p>
          </div>

          <div className="sc-process-grid">
            <div className="sc-process-card">
              <span className="sc-process-num">01</span>
              <h3>Consultation</h3>
              <p>We talk about your goals, your timing, and which Studio City pocket fits.</p>
            </div>

            <div className="sc-process-card">
              <span className="sc-process-num">02</span>
              <h3>Strategy</h3>
              <p>I compare sales on your streets before any move.</p>
            </div>

            <div className="sc-process-card">
              <span className="sc-process-num">03</span>
              <h3>Search or Pricing</h3>
              <p>A curated search, or a price built on your pocket&rsquo;s recent sales.</p>
            </div>

            <div className="sc-process-card">
              <span className="sc-process-num">04</span>
              <h3>Negotiation</h3>
              <p>Certified skill on price, repairs, and terms.</p>
            </div>

            <div className="sc-process-card">
              <span className="sc-process-num">05</span>
              <h3>Closing</h3>
              <p>Escrow, inspections, and paperwork handled.</p>
            </div>

            <div className="sc-process-card">
              <span className="sc-process-num">06</span>
              <h3>Ongoing</h3>
              <p>Advice on value long after closing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          15. CLIENT PROOF / TESTIMONIALS
          ================================================================== */}
      <section className="sc-section sc-bg-stone" id="testimonials">
        <div className="container">
          <div className="sc-section-head text-center">
            <span className="sc-eyebrow">CLIENT PROOF</span>
            <h2 className="sc-title">Real Work in Studio City</h2>
            <p className="sc-sub">What clients say about working with Andrew on these streets.</p>
          </div>

          <div className="sc-proof-grid">
            <div className="sc-proof-card">
              <p className="sc-proof-quote">
                &ldquo;His professionalism, patience and expertise made purchasing a home in an
                incredibly difficult market seamless. On our first consultation he spent almost two
                hours explaining the process end to end.&rdquo;
              </p>
              <div className="sc-proof-author">VERIFIED CLIENT • BUYER</div>
            </div>

            <div className="sc-proof-card">
              <p className="sc-proof-quote">
                &ldquo;My wife and I have a very high bar for anyone we work with, and without
                exception Andrew over-delivered. He understood our needs and thought creatively to
                find the right home in a competitive market.&rdquo;
              </p>
              <div className="sc-proof-author">VERIFIED CLIENT • BUYER</div>
            </div>

            <div className="sc-proof-card">
              <p className="sc-proof-quote">
                &ldquo;Andrew and his team made the whole process easy. We were green to everything,
                and he always had time to answer our questions clearly and on time.&rdquo;
              </p>
              <div className="sc-proof-author">VERIFIED CLIENT • BUYER</div>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/testimonials" className="btn-outline-dark">
              <span>View All Testimonials</span>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================
          17. FAQ ACCORDION
          ================================================================== */}
      <section className="sc-section sc-bg-ivory" id="faq">
        <div className="container">
          <div className="sc-section-head text-center">
            <span className="sc-eyebrow">COMMON QUESTIONS</span>
            <h2 className="sc-title">Studio City Real Estate FAQ</h2>
            <p className="sc-sub">
              Direct answers to the questions buyers and sellers ask most often.
            </p>
          </div>

          <div className="sc-faq-wrap">
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* ==================================================================
          18. FINAL CTA
          ================================================================== */}
      <section className="sc-final-cta-section" id="next-step">
        <div className="container">
          <div className="sc-final-cta-inner">
            <span className="sc-eyebrow sc-eyebrow-light">NEXT STEP</span>
            <h2 className="sc-title sc-title-light">Buying or Selling in Studio City?</h2>
            <p className="sc-sub sc-sub-light" style={{ margin: "0 auto 36px" }}>
              Tell me your street, your timing, and your goal. I&rsquo;ll tell you what the market
              means for your next move. Free consultation. No pressure.
            </p>
            <div className="sc-hero-ctas" style={{ justifyContent: "center" }}>
              <Link href="/home-search?area=studio-city" className="btn-gold">
                <span>Browse Studio City Homes</span>
                <ArrowRight />
              </Link>
              <Link href="/home-valuation" className="btn-outline-light">
                <span>Get Your Home Value</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
