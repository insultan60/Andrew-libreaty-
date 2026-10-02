import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/icons";
import JsonLd from "../components/JsonLd";
import {
  LifestyleShowcase,
  FaqAccordion,
  StudioCityValuationForm,
} from "./StudioCityInteractive";
import { FAQ_ITEMS } from "./data";
import { SITE_URL, SITE_NAME, AGENT, abs } from "@/lib/site";
// Scoped to this page: every rule is under .sc-page, so it is loaded here
// rather than from the root layout.
import "./studio-city.css";

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

export default function StudioCityPage() {
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
              <Link href="/home-search" className="btn-gold">
                <span>Browse Studio City Homes</span>
                <ArrowRight />
              </Link>
              <a href="#valuation-form" className="btn-outline-light">
                <span>Get Your Home Value</span>
              </a>
            </div>
          </div>

          {/* 3 Quick Action Cards */}
          <div className="sc-hero-action-grid">
            <a href="#buyer-guide" className="sc-hero-action-card">
              <div>
                <span className="sc-hero-card-tag">BUYING</span>
                <h3>Buying in Studio City</h3>
                <p>
                  Understand the pockets, home types, school boundaries and what current inventory
                  actually looks like.
                </p>
              </div>
              <span className="sc-hero-card-link">
                START WITH THE BUYER GUIDE <ArrowRight />
              </span>
            </a>

            <a href="#seller-guide" className="sc-hero-action-card">
              <div>
                <span className="sc-hero-card-tag">SELLING</span>
                <h3>Selling in Studio City</h3>
                <p>
                  Valuation, preparation, positioning and pricing against real neighborhood
                  comparables — not citywide averages.
                </p>
              </div>
              <span className="sc-hero-card-link">
                START WITH THE SELLER GUIDE <ArrowRight />
              </span>
            </a>

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
        </div>
      </section>

      {/* ==================================================================
          4. MICRO-NEIGHBORHOODS (Studio City Isn't One Market)
          ================================================================== */}
      <section className="sc-section sc-bg-ivory" id="micro-neighborhoods">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">THE DIFFERENCE THAT MATTERS</span>
            <h2 className="sc-title">Studio City Isn&apos;t One Market</h2>
            <p className="sc-sub">
              A house four blocks from another can sit in a different price bracket, a different
              school boundary and a different kind of street. These are the pockets buyers and
              sellers should know by name.
            </p>
          </div>

          <div className="sc-pockets-grid">
            {/* Card 1: Colfax Meadows */}
            <div className="sc-pocket-card">
              <div className="sc-pocket-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/sold-studio-city.jpg"
                  alt="Colfax Meadows home in Studio City"
                  loading="lazy"
                />
                <span className="sc-pocket-badge">THE FLATS • FAMILY</span>
              </div>
              <div className="sc-pocket-body">
                <h3>Colfax Meadows</h3>
                <p className="sc-pocket-desc">
                  One of Studio City&apos;s original neighborhoods, north of Ventura in the flats.
                  Large lots, mature trees, 1920s–30s character homes alongside postwar ranches
                  and newer builds.
                </p>
                <div className="sc-pocket-consider">
                  <strong>Consider if:</strong> you want walkability, a flat street and proximity
                  to Carpenter&apos;s boundary.
                </div>
                <Link href="/home-search" className="sc-pocket-btn">
                  <span>Explore Colfax Meadows</span>
                  <ArrowRight />
                </Link>
              </div>
            </div>

            {/* Card 2: Wrightwood Estates */}
            <div className="sc-pocket-card">
              <div className="sc-pocket-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/sold-canyon-midcentury.jpg"
                  alt="Wrightwood Estates architectural home"
                  loading="lazy"
                />
                <span className="sc-pocket-badge">HILLSIDE • ARCHITECTURAL</span>
              </div>
              <div className="sc-pocket-body">
                <h3>Wrightwood Estates</h3>
                <p className="sc-pocket-desc">
                  In the hills south of Ventura, along Wrightwood Drive and its side streets.
                  The densest concentration of mid-century and design-forward homes in the area,
                  with canyon and valley views.
                </p>
                <div className="sc-pocket-consider">
                  <strong>Consider if:</strong> you value privacy, views and architecture over
                  walkability.
                </div>
                <Link href="/home-search" className="sc-pocket-btn">
                  <span>Explore Wrightwood Estates</span>
                  <ArrowRight />
                </Link>
              </div>
            </div>

            {/* Card 3: Silver Triangle */}
            <div className="sc-pocket-card">
              <div className="sc-pocket-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-poster.jpg"
                  alt="Silver Triangle shaded street"
                  loading="lazy"
                />
                <span className="sc-pocket-badge">BELOW FRYMAN • CANOPY STREETS</span>
              </div>
              <div className="sc-pocket-body">
                <h3>Silver Triangle</h3>
                <p className="sc-pocket-desc">
                  A compact pocket below Fryman Canyon, with heavily shaded streets and a short
                  walk to the boulevard. Character homes and remodels on a tight, well-defined
                  grid.
                </p>
                <div className="sc-pocket-consider">
                  <strong>Consider if:</strong> you want quiet streets without giving up boulevard
                  access.
                </div>
                <Link href="/home-search" className="sc-pocket-btn">
                  <span>Explore Silver Triangle</span>
                  <ArrowRight />
                </Link>
              </div>
            </div>

            {/* Card 4: Tujunga Village */}
            <div className="sc-pocket-card">
              <div className="sc-pocket-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/sold-valley-village.jpg"
                  alt="Tujunga Village residential street"
                  loading="lazy"
                />
                <span className="sc-pocket-badge">WALKABLE • VILLAGE SCALE</span>
              </div>
              <div className="sc-pocket-body">
                <h3>Tujunga Village</h3>
                <p className="sc-pocket-desc">
                  Built around a short walkable strip of independent cafés, boutiques and
                  neighborhood restaurants. Smaller-scale homes that trade heavily on charm and
                  location.
                </p>
                <div className="sc-pocket-consider">
                  <strong>Consider if:</strong> walkable daily life matters more to you than lot
                  size.
                </div>
                <Link href="/home-search" className="sc-pocket-btn">
                  <span>Explore Tujunga Village</span>
                  <ArrowRight />
                </Link>
              </div>
            </div>

            {/* Card 5: Beeman Park */}
            <div className="sc-pocket-card">
              <div className="sc-pocket-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/sold-sherman-oaks.jpg"
                  alt="Beeman Park neighborhood home"
                  loading="lazy"
                />
                <span className="sc-pocket-badge">THE FLATS • FAMILY</span>
              </div>
              <div className="sc-pocket-body">
                <h3>Beeman Park</h3>
                <p className="sc-pocket-desc">
                  Named for the park at its centre, with tree-lined streets and a strong family
                  buyer profile. Traditional and ranch homes, many expanded or rebuilt over the
                  last two decades.
                </p>
                <div className="sc-pocket-consider">
                  <strong>Consider if:</strong> you want park access and a settled residential
                  street.
                </div>
                <Link href="/home-search" className="sc-pocket-btn">
                  <span>Explore Beeman Park</span>
                  <ArrowRight />
                </Link>
              </div>
            </div>

            {/* Card 6: Longridge Estates */}
            <div className="sc-pocket-card">
              <div className="sc-pocket-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/sold-hollywood-hills.jpg"
                  alt="Longridge Estates luxury secluded home"
                  loading="lazy"
                />
                <span className="sc-pocket-badge">HILLSIDE • HIGH END</span>
              </div>
              <div className="sc-pocket-body">
                <h3>Longridge Estates</h3>
                <p className="sc-pocket-desc">
                  Above Coldwater Canyon, set back behind mature trees. Larger properties,
                  significant privacy, and price points that behave differently from the flats.
                </p>
                <div className="sc-pocket-consider">
                  <strong>Consider if:</strong> you&apos;re looking for scale and seclusion within
                  Studio City.
                </div>
                <Link href="/home-search" className="sc-pocket-btn">
                  <span>Explore Longridge Estates</span>
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </div>

          {/* School Boundary Banner */}
          <div className="sc-school-banner">
            <svg
              style={{ width: "24px", height: "24px", flexShrink: 0, color: "var(--sc-gold-deep)" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <strong>Note on school boundaries:</strong> The Carpenter Community Charter
              attendance line runs block by block rather than following neighborhood edges. Any
              specific address should be verified against the current LAUSD boundary before an offer
              is written or a list price is set.
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. INVENTORY & HOUSING TYPES
          ================================================================== */}
      <section className="sc-section sc-bg-stone" id="inventory">
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
              <div className="sc-inventory-check">
                <strong>Check:</strong> Permitted square footage against county records.
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
              <div className="sc-inventory-check">
                <strong>Check:</strong> HOA reserves, litigation history, rental caps.
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
              <div className="sc-inventory-check">
                <strong>Check:</strong> Original systems, single-pane glazing, roof age.
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
              <div className="sc-inventory-check">
                <strong>Check:</strong> Build quality behind the finish level.
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
              <div className="sc-inventory-check">
                <strong>Check:</strong> Slope, retaining walls, geology report, access and parking.
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
              <div className="sc-inventory-check">
                <strong>Check:</strong> Comparable depth — thin comp sets make pricing harder.
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
              <div className="sc-inventory-check">
                <strong>Check:</strong> RSO status, current rents vs market, deferred maintenance.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          6. CONDITIONS & MARKET METRICS
          ================================================================== */}
      <section className="sc-section sc-bg-ivory" id="conditions">
        <div className="container">
          <div className="sc-section-head">
            <div className="sc-market-badge-row">
              <span className="sc-eyebrow" style={{ marginBottom: 0 }}>
                CONDITIONS
              </span>
              <span className="sc-market-badge">MLS 91604 · UPDATED MONTHLY</span>
            </div>
            <h2 className="sc-title">The Studio City Market Right Now</h2>
            <p className="sc-sub">
              Updated monthly from MLS data for ZIP 91604. Numbers describe the neighborhood as a
              whole; individual pockets vary considerably.
            </p>
          </div>

          <div className="sc-metrics-grid">
            <div className="sc-metric-tile">
              <div className="sc-metric-label">Median Sale Price</div>
              <div className="sc-metric-value">$1,895,000</div>
              <div className="sc-metric-trend sc-trend-up">▲ 2.1% vs last month</div>
            </div>

            <div className="sc-metric-tile">
              <div className="sc-metric-label">Median Days on Market</div>
              <div className="sc-metric-value">38</div>
              <div className="sc-metric-trend sc-trend-up">▲ 6 days year over year</div>
            </div>

            <div className="sc-metric-tile">
              <div className="sc-metric-label">Average Sale Price</div>
              <div className="sc-metric-value">$2,240,000</div>
              <div className="sc-metric-trend sc-trend-down">▼ 0.8% vs last month</div>
            </div>

            <div className="sc-metric-tile">
              <div className="sc-metric-label">Sales — Last 30 Days</div>
              <div className="sc-metric-value">29</div>
              <div className="sc-metric-trend sc-trend-flat">— flat vs previous month</div>
            </div>

            <div className="sc-metric-tile">
              <div className="sc-metric-label">Price Per Sq Ft</div>
              <div className="sc-metric-value">$912</div>
              <div className="sc-metric-trend sc-trend-up">▲ 1.4% vs last month</div>
            </div>

            <div className="sc-metric-tile">
              <div className="sc-metric-label">Sale-to-List Ratio</div>
              <div className="sc-metric-value">97.4%</div>
              <div className="sc-metric-trend sc-trend-down">▼ 1.2 pts YoY</div>
            </div>

            <div className="sc-metric-tile">
              <div className="sc-metric-label">Active Listings</div>
              <div className="sc-metric-value">74</div>
              <div className="sc-metric-trend sc-trend-up">▲ 9 vs last month</div>
            </div>

            <div className="sc-metric-tile">
              <div className="sc-metric-label">Months of Inventory</div>
              <div className="sc-metric-value">2.6</div>
              <div className="sc-metric-trend sc-trend-up">▲ 0.4 vs last month</div>
            </div>
          </div>

          <div className="sc-market-cta-banner">
            <p>See what is currently available across all Studio City pockets:</p>
            <Link href="/home-search" className="btn-gold">
              <span>Browse All Listings</span>
              <ArrowRight />
            </Link>
          </div>

          <div className="sc-market-insights-grid">
            <div className="sc-insight-card">
              <h3>What the numbers mean if you&apos;re buying</h3>
              <p>
                Inventory and days on market have both edged up, which means less pressure to waive
                everything on day one than buyers faced at the peak. Well-priced homes in the
                strongest pockets still move quickly — but the gap between a sharply priced listing
                and an optimistic one has widened, and that gap is where negotiating room lives.
              </p>
            </div>

            <div className="sc-insight-card">
              <h3>What the numbers mean if you&apos;re selling</h3>
              <p>
                A sale-to-list ratio just under 100% says the market is rewarding accurate pricing
                rather than aspirational pricing. Homes that launch above their comparable set are
                sitting, then reducing — and a reduction costs more than pricing correctly at launch.
                Preparation and positioning are doing more work than they did two years ago.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          7. VALUATION FACTORS (What Actually Determines Value Here)
          ================================================================== */}
      <section className="sc-section sc-bg-stone" id="valuation-factors">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">VALUATION</span>
            <h2 className="sc-title">What Actually Determines a Home&apos;s Value Here</h2>
            <p className="sc-sub">
              Automated estimates work off ZIP-level averages. In Studio City, value is set by
              things an algorithm can&apos;t see from a satellite.
            </p>
          </div>

          <div className="sc-factors-layout">
            <div className="sc-factors-grid">
              <div className="sc-factor-card">
                <div className="sc-factor-name">Exact street</div>
                <div className="sc-factor-desc">
                  Block-level differences are real and measurable.
                </div>
              </div>

              <div className="sc-factor-card">
                <div className="sc-factor-name">School boundary</div>
                <div className="sc-factor-desc">
                  Verified per address, not per neighborhood.
                </div>
              </div>

              <div className="sc-factor-card">
                <div className="sc-factor-name">Condition</div>
                <div className="sc-factor-desc">Systems, roof, foundation, drainage.</div>
              </div>

              <div className="sc-factor-card">
                <div className="sc-factor-name">Architecture</div>
                <div className="sc-factor-desc">Provenance and integrity carry a premium.</div>
              </div>

              <div className="sc-factor-card">
                <div className="sc-factor-name">Micro-neighborhood</div>
                <div className="sc-factor-desc">
                  Flats vs hillside pricing behaves differently.
                </div>
              </div>

              <div className="sc-factor-card">
                <div className="sc-factor-name">Lot size &amp; shape</div>
                <div className="sc-factor-desc">
                  Usable flat land, not just recorded square footage.
                </div>
              </div>

              <div className="sc-factor-card">
                <div className="sc-factor-name">Renovation quality</div>
                <div className="sc-factor-desc">
                  Permitted and well-executed vs cosmetic flips.
                </div>
              </div>

              <div className="sc-factor-card">
                <div className="sc-factor-name">Views</div>
                <div className="sc-factor-desc">What you see, and whether it&apos;s protected.</div>
              </div>

              <div className="sc-factor-card">
                <div className="sc-factor-name">Privacy</div>
                <div className="sc-factor-desc">
                  Setback, screening, neighbouring sightlines.
                </div>
              </div>

              <div className="sc-factor-card">
                <div className="sc-factor-name">Parking &amp; access</div>
                <div className="sc-factor-desc">Critical on hillside and winding canyon streets.</div>
              </div>

              <div className="sc-factor-card">
                <div className="sc-factor-name">Timing</div>
                <div className="sc-factor-desc">Launch window and current absorption rate.</div>
              </div>

              <div className="sc-factor-card">
                <div className="sc-factor-name">Comparable sales</div>
                <div className="sc-factor-desc">The right comps, not the nearest ones.</div>
              </div>
            </div>

            <div className="sc-factors-visual-wrap">
              <div className="sc-factors-photo-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/valuation-interior.jpg"
                  alt="Architectural interior in Studio City"
                  loading="lazy"
                />
              </div>

              <div className="sc-factors-callout-card">
                <h4>What could your Studio City home actually sell for?</h4>
                <p>
                  A valuation built on your street, your pocket and your comparable set — not a
                  citywide estimate.
                </p>
                <a href="#valuation-form" className="btn-gold">
                  <span>Get a Studio City Home Valuation</span>
                  <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          8. BUYER GUIDE
          ================================================================== */}
      <section className="sc-section sc-bg-ivory" id="buyer-guide">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">BUYER GUIDE</span>
            <h2 className="sc-title">Buying a Home in Studio City</h2>
            <p className="sc-sub">
              Key considerations before scheduling tours or writing offers on these streets.
            </p>
          </div>

          <div className="sc-guide-wrap">
            <div className="sc-guide-accordion">
              <div className="sc-guide-box">
                <h3 className="sc-guide-q">Who does Studio City tend to suit?</h3>
                <p className="sc-guide-a">
                  Buyers who want a residential, walkable neighborhood with real trail access and a
                  short hop to the studios and the Westside — without moving into a hillside-only
                  lifestyle. The pool skews toward families in the flats and design-led buyers in
                  the hills, but the neighborhood carries both comfortably.
                </p>
              </div>

              <div className="sc-guide-box">
                <h3 className="sc-guide-q">What should buyers look for?</h3>
                <p className="sc-guide-a">
                  Flat, usable outdoor space; permitted square footage that matches what you&apos;re
                  being shown; a school boundary confirmed for the specific address; and on
                  hillside properties, the condition of retaining walls, drainage and access.
                </p>
              </div>

              <div className="sc-guide-box">
                <h3 className="sc-guide-q">How much does micro-location matter?</h3>
                <p className="sc-guide-a">
                  More than almost anywhere comparable in the Valley. Proximity to Ventura cuts both
                  ways — walkability on one side, traffic and noise on the other. Two similar houses
                  a few blocks apart can price differently because of the boundary line, the canyon
                  route, or the street&apos;s canopy.
                </p>
              </div>

              <div className="sc-guide-box">
                <h3 className="sc-guide-q">What should you check before making an offer?</h3>
                <p className="sc-guide-a">
                  Permit history with the city, sewer and foundation condition on older flats homes,
                  geology and slope on hillside lots, HOA documents on condos, and the actual
                  comparable set — including what sold and then resold, not just what listed.
                </p>
              </div>

              <div className="sc-guide-box">
                <h3 className="sc-guide-q">What do buyers commonly overlook?</h3>
                <p className="sc-guide-a">
                  Noise exposure from Ventura and the 101, driveway grade and guest parking on
                  hillside streets, unpermitted additions presented as finished square footage, and
                  how much the specific canyon route they&apos;ll use daily actually adds to a
                  commute.
                </p>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <Link href="/home-search" className="btn-gold">
                <span>Browse Studio City Homes</span>
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          9. SELLER GUIDE
          ================================================================== */}
      <section className="sc-section sc-bg-stone" id="seller-guide">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">SELLER GUIDE</span>
            <h2 className="sc-title">Selling a Home in Studio City</h2>
            <p className="sc-sub">Six stages, each of which affects the final number.</p>
          </div>

          <div className="sc-seller-stages-grid">
            <div className="sc-seller-stage-card">
              <span className="sc-stage-number">01</span>
              <h3>How Studio City homes are valued</h3>
              <p>
                Pocket-level comparables, adjusted for street, lot, condition and architecture —
                then sense-checked against current absorption.
              </p>
            </div>

            <div className="sc-seller-stage-card">
              <span className="sc-stage-number">02</span>
              <h3>Preparing for market</h3>
              <p>
                Targeted work only: what returns more than it costs. Paint, landscaping, systems
                and staging in that order.
              </p>
            </div>

            <div className="sc-seller-stage-card">
              <span className="sc-stage-number">03</span>
              <h3>Pricing against real comps</h3>
              <p>
                Priced into the band buyers are actually searching, not above it. The first two
                weeks carry most of the leverage.
              </p>
            </div>

            <div className="sc-seller-stage-card">
              <span className="sc-stage-number">04</span>
              <h3>Positioning &amp; marketing</h3>
              <p>
                Photography, video, copy and placement that speak to the specific buyer for that
                pocket and that architecture.
              </p>
            </div>

            <div className="sc-seller-stage-card">
              <span className="sc-stage-number">05</span>
              <h3>Evaluating offers</h3>
              <p>
                Price is one term. Financing strength, contingency periods, appraisal risk and
                close timeline decide which offer is genuinely best.
              </p>
            </div>

            <div className="sc-seller-stage-card">
              <span className="sc-stage-number">06</span>
              <h3>Negotiation &amp; closing</h3>
              <p>
                Certified negotiation handling through inspection response, repair requests,
                appraisal and escrow.
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <a href="#valuation-form" className="btn-gold">
              <span>Get a Studio City Home Valuation</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ==================================================================
          10. EVIDENCE & RECENT SALES
          ================================================================== */}
      <section className="sc-section sc-bg-ivory" id="recent-sales">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">EVIDENCE</span>
            <h2 className="sc-title">Recent Studio City Home Sales</h2>
            <p className="sc-sub">
              What&apos;s actually trading, and what it says about where the market sits.
            </p>
          </div>

          <div className="sc-sales-grid">
            <div className="sc-sale-card">
              <div className="sc-sale-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/sold-studio-city.jpg"
                  alt="Sold home in Colfax Meadows"
                  loading="lazy"
                />
                <span className="sc-sale-badge">SOLD • COLFAX MEADOWS</span>
              </div>
              <div className="sc-sale-body">
                <h3>Colfax Meadows Residence</h3>
                <p className="sc-sale-specs">Single-family · 4 bd / 3 ba · ~2,410 sq ft</p>
                <span className="sc-sale-meta">21 days on market</span>
              </div>
            </div>

            <div className="sc-sale-card">
              <div className="sc-sale-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/sold-canyon-midcentury.jpg"
                  alt="Sold home in Wrightwood Estates"
                  loading="lazy"
                />
                <span className="sc-sale-badge">SOLD • WRIGHTWOOD ESTATES</span>
              </div>
              <div className="sc-sale-body">
                <h3>Wrightwood Mid-Century</h3>
                <p className="sc-sale-specs">
                  Mid-century architectural · 3 bd / 3 ba · ~2,690 sq ft
                </p>
                <span className="sc-sale-meta">44 days on market</span>
              </div>
            </div>

            <div className="sc-sale-card">
              <div className="sc-sale-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/sold-valley-village.jpg"
                  alt="Sold home in Silver Triangle"
                  loading="lazy"
                />
                <span className="sc-sale-badge">SOLD • SILVER TRIANGLE</span>
              </div>
              <div className="sc-sale-body">
                <h3>Silver Triangle Traditional</h3>
                <p className="sc-sale-specs">Traditional · 3 bd / 2 ba · ~1,780 sq ft</p>
                <span className="sc-sale-meta">16 days on market</span>
              </div>
            </div>
          </div>

          <div className="sc-sales-analysis-box">
            <h4>WHAT THESE SALES TELL US</h4>
            <p>
              Flats homes in good condition are still clearing quickly and close to list. Hillside
              and architectural properties are taking longer — not because demand has gone, but
              because their buyer pool is narrower and the comparable set is thinner, which makes
              launch pricing harder to get right the first time.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================
          11. COMPARISON MATRIX (Studio City vs Nearby Neighborhoods)
          ================================================================== */}
      <section className="sc-section sc-bg-stone" id="comparison">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">STILL DECIDING</span>
            <h2 className="sc-title">Studio City vs Nearby Neighborhoods</h2>
            <p className="sc-sub">
              Not better or worse — different trade-offs. If you&apos;re weighing areas, this is
              the honest version.
            </p>
          </div>

          <div className="sc-table-wrap">
            <table className="sc-table">
              <thead>
                <tr>
                  <th>AREA</th>
                  <th>CHARACTER</th>
                  <th>HOUSING</th>
                  <th>CONSIDER IT IF...</th>
                </tr>
              </thead>
              <tbody>
                <tr className="sc-row-highlight">
                  <td className="sc-table-area">Studio City</td>
                  <td>Walkable boulevard, quiet flats, canyon hills above</td>
                  <td>Character homes, ranches, mid-century and architectural</td>
                  <td>You want walkability and trail access in the same ZIP</td>
                </tr>
                <tr>
                  <td className="sc-table-area">Sherman Oaks</td>
                  <td>More spread out, larger commercial footprint</td>
                  <td>Broad range, from condos to large hillside homes</td>
                  <td>You prioritise lot size and a wider price spectrum</td>
                </tr>
                <tr>
                  <td className="sc-table-area">Valley Village</td>
                  <td>Quieter, more uniformly residential</td>
                  <td>Traditional and ranch homes, some multifamily</td>
                  <td>You want calmer streets with the same nearby access</td>
                </tr>
                <tr>
                  <td className="sc-table-area">Toluca Lake</td>
                  <td>Small, insulated, village-scale</td>
                  <td>Period homes on generous lots, limited inventory</td>
                  <td>You want a tight, established pocket and can wait for supply</td>
                </tr>
                <tr>
                  <td className="sc-table-area">Hollywood Hills</td>
                  <td>Hillside-first, views over convenience</td>
                  <td>Architectural and view properties, little flat land</td>
                  <td>Views and design matter more than walkable daily life</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

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
          16. VALUATION LEAD CAPTURE FORM
          ================================================================== */}
      <section className="sc-section sc-bg-ivory" id="valuation">
        <div className="container">
          <StudioCityValuationForm />
        </div>
      </section>

      {/* ==================================================================
          17. FAQ ACCORDION
          ================================================================== */}
      <section className="sc-section sc-bg-stone" id="faq">
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
              <Link href="/home-search" className="btn-gold">
                <span>Browse Studio City Homes</span>
                <ArrowRight />
              </Link>
              <a href="#valuation-form" className="btn-outline-light">
                <span>Get Your Home Value</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
