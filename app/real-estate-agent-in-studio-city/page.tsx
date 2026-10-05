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
   fifteen minutes in lib/idxServer.ts; the page follows the same cadence. */
export const revalidate = 900;

const PATH = "/real-estate-agent-in-studio-city";
const TITLE = "Studio City Neighborhood Guide & Real Estate | Andrew Liberty";
const DESCRIPTION =
  "Comprehensive Studio City neighborhood guide. Explore micro-neighborhoods from Colfax Meadows to Wrightwood Estates, current market data, housing inventory, buyer and seller advice from Andrew Liberty.";

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
              "@type": "Place",
              "@id": abs(PATH),
              name: "Studio City, Los Angeles, CA",
              description: DESCRIPTION,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Studio City",
                addressRegion: "CA",
                postalCode: "91604",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 34.1483,
                longitude: -118.3965,
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
              Real Estate Agent in Studio City
              <br />
              <em>Who Knows the Streets</em>
            </h1>
            <p className="sc-hero-desc">
              Studio City isn&apos;t one market. Explore its neighborhoods, housing stock,
              current conditions and what buyers and sellers should understand before making
              a move — then work with someone who knows the block, not just the ZIP code.
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
                <h3>Buying in Studio City</h3>
                <p>
                  Understand the pockets, home types, school boundaries and what current inventory
                  actually looks like.
                </p>
              </div>
              <span className="sc-hero-card-link">
                BROWSE STUDIO CITY HOMES <ArrowRight />
              </span>
            </Link>

            <Link href="/home-valuation" className="sc-hero-action-card">
              <div>
                <span className="sc-hero-card-tag">SELLING</span>
                <h3>Selling in Studio City</h3>
                <p>
                  Valuation, preparation, positioning and pricing against real neighborhood
                  comparables — not citywide averages.
                </p>
              </div>
              <span className="sc-hero-card-link">
                GET YOUR HOME VALUE <ArrowRight />
              </span>
            </Link>

            <Link href="/contact" className="sc-hero-action-card">
              <div>
                <span className="sc-hero-card-tag">INVESTING</span>
                <h3>Investing in Studio City</h3>
                <p>
                  Income property, small multifamily and development sites evaluated on
                  fundamentals and real numbers.
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
            <h2 className="sc-title">Studio City at a Glance</h2>
            <p className="sc-sub">
              The short version, before the detail. Studio City sits on the southern edge of the
              San Fernando Valley, where the flats meet the Santa Monica Mountains — and that
              geography drives almost everything about its housing.
            </p>
          </div>

          <div className="sc-glance-grid">
            <div className="sc-glance-card">
              <span className="sc-glance-tag">LOCATION</span>
              <p>
                Southeast San Fernando Valley, City of Los Angeles. Bounded roughly by the
                Hollywood Hills to the south and the LA River to the north.
              </p>
            </div>

            <div className="sc-glance-card">
              <span className="sc-glance-tag">PRIMARY ZIP</span>
              <p>
                91604, with portions of 91602 and 91607 depending on the specific block and
                boundary line.
              </p>
            </div>

            <div className="sc-glance-card">
              <span className="sc-glance-tag">KEY CORRIDORS</span>
              <p>
                Ventura Boulevard, Laurel Canyon Boulevard, Coldwater Canyon Avenue, Colfax
                Avenue, Moorpark Street, Tujunga Avenue.
              </p>
            </div>

            <div className="sc-glance-card">
              <span className="sc-glance-tag">LOCAL CHARACTER</span>
              <p>
                A walkable commercial spine along Ventura, quiet tree-lined residential flats
                behind it, and private canyon and ridgeline streets above.
              </p>
            </div>

            <div className="sc-glance-card">
              <span className="sc-glance-tag">HOUSING STOCK</span>
              <p>
                Single-family homes dominate: 1920s–40s character homes and postwar ranches in
                the flats, mid-century and contemporary architectural homes in the hills. Condos
                and townhomes cluster near the boulevard.
              </p>
            </div>

            <div className="sc-glance-card">
              <span className="sc-glance-tag">BORDERING AREAS</span>
              <p>
                Sherman Oaks, Valley Village, North Hollywood, Toluca Lake, Hollywood Hills,
                Woodland Hills via Ventura.
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
              Where a home sits relative to the boulevard, the hills and the canyon routes shapes
              daily life more than square footage does.
            </p>
          </div>

          <LifestyleShowcase />

          <div className="sc-mls-cta">
            <div>
              <h3>See what&apos;s on the market in Studio City right now</h3>
              <p>
                Search every active Studio City listing on my MLS — flats, hillside and
                condos — with live prices and photos.
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
            <p className="sc-sub">
              Seven broad categories, each with its own buyer pool, its own pricing logic and its
              own due diligence.
            </p>
          </div>

          <div className="sc-inventory-grid">
            <div className="sc-inventory-card">
              <div>
                <span className="sc-inventory-tag">MOST COMMON</span>
                <h3>Single-Family Homes</h3>
                <p className="sc-inventory-desc">
                  The bulk of the market. Traditional, Spanish and ranch in the flats;
                  contemporary and mid-century in the hills.
                </p>
              </div>
            </div>

            <div className="sc-inventory-card">
              <div>
                <span className="sc-inventory-tag">ENTRY POINT</span>
                <h3>Condos &amp; Townhomes</h3>
                <p className="sc-inventory-desc">
                  Concentrated along and just off Ventura. Often the accessible way into the
                  neighborhood.
                </p>
              </div>
            </div>

            <div className="sc-inventory-card">
              <div>
                <span className="sc-inventory-tag">CHARACTER</span>
                <h3>Mid-Century Homes</h3>
                <p className="sc-inventory-desc">
                  Post-and-beam, walls of glass, indoor—outdoor planning. A collector category with
                  its own dedicated buyers.
                </p>
              </div>
            </div>

            <div className="sc-inventory-card">
              <div>
                <span className="sc-inventory-tag">DESIGN-LED</span>
                <h3>Modern &amp; Architectural</h3>
                <p className="sc-inventory-desc">
                  Ground-up contemporary builds and significant architectural remodels, mostly in
                  the hills.
                </p>
              </div>
            </div>

            <div className="sc-inventory-card">
              <div>
                <span className="sc-inventory-tag">VIEWS</span>
                <h3>Hillside Properties</h3>
                <p className="sc-inventory-desc">
                  View lots on winding streets, often with tiered or stepped construction and
                  scenic vistas.
                </p>
              </div>
            </div>

            <div className="sc-inventory-card">
              <div>
                <span className="sc-inventory-tag">UPPER TIER</span>
                <h3>Luxury Homes</h3>
                <p className="sc-inventory-desc">
                  Large new construction and estate properties, concentrated in the hillside and
                  Longridge pockets.
                </p>
              </div>
            </div>

            <div className="sc-inventory-card">
              <div>
                <span className="sc-inventory-tag">INCOME</span>
                <h3>Multifamily &amp; Income</h3>
                <p className="sc-inventory-desc">
                  Duplexes through small apartment buildings, primarily near the boulevard and
                  eastern edge.
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
          12. EVERYDAY LIFE & LOCAL ANCHORS
          ================================================================== */}
      <section className="sc-section sc-bg-ivory" id="everyday-life">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">EVERYDAY LIFE</span>
            <h2 className="sc-title">Local Places &amp; Daily Rhythm</h2>
            <p className="sc-sub">The anchors people actually use week to week.</p>
          </div>

          <div className="sc-life-grid">
            <div className="sc-life-card">
              <span className="sc-life-tag">FOOD &amp; DRINK</span>
              <h3>Dining</h3>
              <p>
                A dense independent restaurant scene along Ventura, with a second cluster on the
                Tujunga Village strip. Sunday farmers market on Ventura Place.
              </p>
            </div>

            <div className="sc-life-card">
              <span className="sc-life-tag">ERRANDS</span>
              <h3>Shopping &amp; Services</h3>
              <p>
                Everyday needs are covered along the boulevard — groceries, pharmacy, fitness,
                services — with larger retail a short drive toward Sherman Oaks or Universal City.
              </p>
            </div>

            <div className="sc-life-card">
              <span className="sc-life-tag">OUTDOORS</span>
              <h3>Parks &amp; Recreation</h3>
              <p>
                Fryman Canyon and Wilacre Park for trails, Beeman Park for the flats, and the
                expanding LA River greenway along the northern edge.
              </p>
            </div>

            <div className="sc-life-card">
              <span className="sc-life-tag">ANCHORS</span>
              <h3>Schools &amp; Institutions</h3>
              <p>
                LAUSD serves the area alongside charter and private options; CBS Studio Center
                sits within the neighborhood. Attendance areas should be confirmed per address.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          13. MEET ANDREW LIBERTY & EXPERTISE
          ================================================================== */}
      <section className="sc-section sc-bg-dark" id="meet-andrew">
        <div className="container">
          <div className="sc-meet-layout">
            <div className="sc-meet-copy">
              <span className="sc-eyebrow sc-eyebrow-light">LOCAL EXPERTISE</span>
              <h2 className="sc-title sc-title-light">Meet Andrew Liberty</h2>
              <div className="sc-credentials">
                Andrew Ruric Liberty II • CA DRE# 01965696 | Compass California, Inc. • CA DRE#
                01991628
              </div>

              <div className="sc-meet-bio">
                <p>
                  Everything above is the reason I work the way I do. I&apos;m based in Studio City,
                  and it&apos;s the market I know street by street — which pocket a house sits in,
                  which comparable set actually applies to it, and what a buyer in that specific
                  band is comparing it against.
                </p>
                <p>
                  I&apos;m a REALTOR® and Certified Real Estate Negotiation Expert with a
                  background in commercial real estate, which gives me a sharp eye for value on any
                  deal — a home, an income property or a development site. I&apos;ve worked with
                  buyers, sellers and investors here for years. I&apos;m hands-on and
                  straightforward, and I make sure clients understand the reasoning behind every
                  recommendation.
                </p>
              </div>

              <div className="sc-badges-row">
                <span className="sc-badge">Negotiation Expert (RENE)</span>
                <span className="sc-badge">REALTOR®</span>
                <span className="sc-badge">Residential • Investment • Development</span>
                <span className="sc-badge">Compass • California</span>
              </div>

              <div className="sc-hero-ctas">
                <Link href="/contact" className="btn-gold">
                  <span>Schedule a Consultation</span>
                  <ArrowRight />
                </Link>
                <Link href="/team" className="btn-outline-light">
                  <span>Meet the Team</span>
                </Link>
              </div>
            </div>

            <div className="sc-meet-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/andrew-liberty.jpg"
                alt="Andrew Liberty, Studio City Real Estate Agent"
                loading="lazy"
              />
            </div>
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
            <p className="sc-sub">
              The same clear process from first call to closing, with no surprises.
            </p>
          </div>

          <div className="sc-process-grid">
            <div className="sc-process-card">
              <span className="sc-process-num">01</span>
              <h3>Consultation</h3>
              <p>Goals, timing and options. No pressure.</p>
            </div>

            <div className="sc-process-card">
              <span className="sc-process-num">02</span>
              <h3>Strategy</h3>
              <p>Value, comps and conditions before any move.</p>
            </div>

            <div className="sc-process-card">
              <span className="sc-process-num">03</span>
              <h3>Search or Pricing</h3>
              <p>Curated search, or a precise pricing plan.</p>
            </div>

            <div className="sc-process-card">
              <span className="sc-process-num">04</span>
              <h3>Negotiation</h3>
              <p>Certified expertise at every point of leverage.</p>
            </div>

            <div className="sc-process-card">
              <span className="sc-process-num">05</span>
              <h3>Closing</h3>
              <p>Escrow, inspections and paperwork handled.</p>
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
              Start with a conversation about your street, your timing and what the current market
              means for your specific situation.
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
