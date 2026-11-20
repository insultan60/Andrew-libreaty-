import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/icons";
import JsonLd from "../components/JsonLd";
import { FAQ_GROUPS, FAQ_ITEMS } from "./data";
import { SITE_URL, SITE_NAME, AGENT, abs } from "@/lib/site";
// Scoped to this page: every rule is under .sc-page, so it is loaded here
// rather than from the root layout.
import GuideValuationForm from "../components/GuideValuationForm";
// The valuation block reuses the neighbourhood-guide styles (all lcn-).
import "../neighborhood-guide.css";
import "./studio-city.css";
import StudioCityListings from "./StudioCityListings";
import { fetchRawListingsServer } from "@/lib/idxServer";
import { inArea } from "@/lib/areas";
import { mlsAreaUrl } from "@/lib/mlsSearch";

/* The listings section is rendered from the server-side IDX feed, cached for
   six hours in lib/idxServer.ts; the page follows the same cadence. */
export const revalidate = 21600;

const PATH = "/real-estate-agent-in-studio-city";
/* Title, description and H1 from the November 2026 (v2) brief. The WebPage
   node in the JSON-LD below carries the same pair. */
const TITLE = "Studio City Real Estate Agent | Homes for Sale | Andrew Liberty";
const OG_TITLE = "Real Estate Agent in Studio City | Andrew Liberty";
const DESCRIPTION =
  "Andrew Liberty is a Studio City real estate agent. See homes for sale, condo and house prices, schools, and neighborhood guides, then book a free consult.";
const UPDATED = "November 21, 2026";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    title: OG_TITLE,
    description: DESCRIPTION,
    url: PATH,
    locale: "en_US",
    images: [{ url: "/images/studio-city.jpg", width: 1200, height: 630, alt: "Studio City, Los Angeles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
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
    title: "A Studio City office",
    text: "My office is at 12001 Ventura Place, Suite 100, and the streets I price are the ones I drive every day. My recent Studio City sales run from a $775,000 condo to a $3.8 million house.",
  },
  {
    Icon: IcChart,
    title: "An investor’s eye",
    text: "My start in commercial real estate trained me to separate what a building earns or costs from how it looks. That matters most for condos, duplexes and anything with a complicated history.",
  },
  {
    Icon: IcShake,
    title: "Trained negotiation",
    text: "I’m a Certified Real Estate Negotiation Expert, and I use that training on price, repairs and terms.",
  },
];

const GLANCE: [string, string][] = [
  ["Location", "Southeast San Fernando Valley, within the City of Los Angeles, where the Valley flats meet the Santa Monica Mountains."],
  ["ZIP code", "91604 for most of the neighborhood. Some blocks use 91602 or 91607."],
  ["Main corridors", "Ventura Boulevard, Laurel Canyon Boulevard, Coldwater Canyon Avenue, Colfax Avenue, Moorpark Street, Tujunga Avenue."],
  ["Character", "A walkable village strip on Ventura, quiet residential flats behind it, and private canyon and ridge streets above. Redfin gives the area a Walk Score of 65."],
  ["Housing", "Mostly single-family houses, with condos and townhomes near the boulevard. The median home was built in 1957 (Homes.com), so age and updates matter."],
  ["Neighbors", "Sherman Oaks, Valley Village, North Hollywood, Toluca Lake, Laurel Canyon and the Hollywood Hills."],
];

const MARKET: [string, string, string][] = [
  ["Typical home value, all home types", "$1,568,123, up 3.2% from a year earlier", "Zillow Home Value Index, data through Aug. 31, 2026"],
  ["Median sale price, last 3 months", "$1.45 million, down 12.5% year over year", "Redfin, September 2026"],
  ["Median sale price, last 6 months", "$1.81 million (middle half of sales: $928,000 to $2.4 million)", "Resideline, 239 closings, updated Sept. 6, 2026"],
  ["Median sale price, last 12 months", "$1.67 million, down 2%", "Homes.com, trailing 12 months, retrieved Nov. 2026"],
  ["Median single-family sale", "$2,337,500", "Homes.com, trailing 12 months"],
  ["Median townhome sale", "$1,079,999", "Homes.com, trailing 12 months"],
  ["Median sale, 2-bedroom / 1-bedroom", "$770,000 / $540,000", "Homes.com, trailing 12 months"],
  ["Average condo sale", "$873,411, about $615 per sq ft, 99 sold", "HelloCondo, last 12 months"],
  ["Time to sell", "About 70 days median; about 40 days to pending", "Redfin, Sept. 2026; Zillow, Aug. 2026"],
  ["Sold vs. list price", "About 2.5% below list on average; about 53% of sales closed under list and 30% over", "Redfin, Sept. 2026; Zillow"],
  ["Supply", "About 4.1 months of inventory", "Homes.com, trailing 12 months"],
];

const POCKETS: [string, string][] = [
  ["The Village and Ventura Place", "The walkable center, with restaurants, shops and the Sunday farmers market. Condos and townhomes cluster here, and homes within walking distance carry a premium along with some boulevard noise."],
  ["Colfax Meadows and Tujunga Village", "Flat, tree-lined residential blocks near the Carpenter Community Charter school, with Tujunga Village’s shops and cafés close by. Popular with buyers who want a walkable, family-friendly street."],
  ["The Silver Triangle and the flats south of Ventura", "Quiet residential streets just off the boulevard, with a mix of older character homes and updated or rebuilt houses."],
  ["The Donas", "Streets named Dona-something, known for mid-century homes on larger lots. Condition and updates vary widely from house to house, so comparable sales matter more here than elsewhere."],
  ["Longridge Estates and Wrightwood Estates", "Hillside pockets where private lots, long driveways and views drive value. These are the neighborhoods where I spend the most time on slope, access and insurance."],
  ["Fryman Canyon and the Studio City hills", "Canyon and ridge streets with trail access and architectural homes. Roads are narrow and parking can be tight, so I always test the drive at rush hour."],
];

const STEPS: [string, string][] = [
  ["Consultation", "We talk about goals, timing and which Studio City pocket fits."],
  ["Strategy", "I pull recent sales for your streets before any move."],
  ["Search or Pricing", "A curated search, or a price built on your pocket’s sales."],
  ["Negotiation", "I protect your price, repairs and terms."],
  ["Closing", "Escrow, inspections and paperwork handled."],
  ["Ongoing", "Advice on value long after closing."],
];

const NEARBY: [string, string, string][] = [
  ["Sherman Oaks", "Flats and hills on either side of Ventura Boulevard", "/real-estate-agent-in-sherman-oaks"],
  ["Valley Village", "Condos and ranch homes just to the north", "/real-estate-agent-in-valley-village"],
  ["Laurel Canyon", "Wooded hillside living over the ridge", "/real-estate-agent-in-laurel-canyon"],
  ["Hollywood Hills", "View homes and canyon streets", "/real-estate-agent-in-hollywood-hills"],
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
              "@type": ["RealEstateAgent", "LocalBusiness"],
              "@id": `${abs(PATH)}#office`,
              name: "Andrew Liberty, Compass",
              url: abs(PATH),
              telephone: "+1-310-709-0581",
              image: abs("/images/studio-city.jpg"),
              address: {
                "@type": "PostalAddress",
                streetAddress: "12001 Ventura Pl, Ste 100",
                addressLocality: "Studio City",
                addressRegion: "CA",
                postalCode: "91604",
                addressCountry: "US",
              },
              areaServed: { "@id": `${abs(PATH)}#place` },
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

      {/* 1. HERO */}
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
            <span className="sc-eyebrow sc-eyebrow-light">STUDIO CITY, LOS ANGELES</span>
            <h1 className="sc-hero-title">
              Real Estate Agent
              <br />
              <em>in Studio City</em>
            </h1>
            <p className="sc-hero-tagline">Local prices, clear numbers, calm negotiation</p>
            <p className="sc-hero-desc">
              Studio City prices change from one pocket to the next, so a neighborhood average
              rarely tells you much. I&rsquo;m Andrew Liberty, a Studio City real estate agent with an
              office on Ventura Place. I start every search or sale with recent sales from your
              street and your type of home.
            </p>
            <div className="sc-hero-ctas">
              <Link href={mlsAreaUrl("studio-city")} className="btn-gold">
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

      {/* 2. LOCAL INTRO, PROOF ROW AND BUY / SELL / INVEST CARDS */}
      <section className="sc-section sc-bg-ivory" id="intro">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">YOUR LOCAL AGENT</span>
            <h2 className="sc-title">A Studio City Real Estate Agent Who Starts With the Numbers</h2>
          </div>
          <div className="sc-prose">
            <p>
              I work out of Studio City, and I came to residential real estate from a commercial
              background, where every property is judged on what it costs, what it earns, and what
              it could become. I bring that habit to homes. A flat-lot house, a hillside lot, a condo
              off Ventura Boulevard and a duplex each get their own comparison, and you see the
              sales behind any price I recommend.
            </p>
            <p>
              Studio City sits where the San Fernando Valley meets the Santa Monica Mountains, and
              that shapes everything from lot size to commute. Tell me your budget, your timing and
              the streets you like, and I&rsquo;ll show you what Studio City real estate looks like
              at those coordinates.
            </p>
          </div>
          <ul className="sc-proof-row">
            <li>Office at 12001 Ventura Place</li>
            <li>Certified Real Estate Negotiation Expert (RENE)</li>
            <li>Recent sales from $775K to $3.8M</li>
          </ul>

          <div className="sc-hero-action-grid">
            <Link href={mlsAreaUrl("studio-city")} className="sc-hero-action-card">
              <div>
                <span className="sc-hero-card-tag">BUYING</span>
                <h3>Buying in Studio City</h3>
                <p>
                  Condos here usually sell well under $1 million, while the typical house sells
                  above $2 million. I help you choose a type first, then a pocket, then a price you
                  can defend.
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
                  Roughly half of Studio City sales close below the list price, so a price built on
                  the right comparable sales matters. I start with a free valuation.
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
                  Duplexes and small apartment buildings trade rarely here. When one does, I run
                  rents, expenses and repair costs before we talk about price.
                </p>
              </div>
              <span className="sc-hero-card-link">
                EXPLORE OPPORTUNITIES <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. STUDIO CITY AT A GLANCE */}
      <section className="sc-section sc-bg-stone" id="orientation">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">ORIENTATION</span>
            <h2 className="sc-title">Studio City at a Glance</h2>
          </div>
          <div className="sc-glance-grid">
            {GLANCE.map(([tag, text]) => (
              <div className="sc-glance-card" key={tag}>
                <span className="sc-glance-tag">{tag.toUpperCase()}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="sc-two-col">
            <div>
              <h3 className="sc-h3">Studio City ZIP Code</h3>
              <p>
                Most of Studio City uses ZIP code 91604. Blocks near the edges can carry 91602 or
                91607, which are also used by North Hollywood and Valley Village addresses. Confirm
                the exact address before you search by ZIP or pull comparable sales, because a ZIP
                code alone can mix two very different markets.
              </p>
            </div>
            <div>
              <h3 className="sc-h3">Is Studio City Part of Los Angeles?</h3>
              <p>
                Yes. Studio City is a neighborhood inside the City of Los Angeles, in the San
                Fernando Valley. Some listing sites label addresses &ldquo;Studio City,&rdquo; others
                &ldquo;Los Angeles,&rdquo; and both are correct.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOMES FOR SALE  /  5. RECENTLY SOLD (Studio City only, IDX) */}
      <StudioCityListings initialListings={studioCityListings} tone="ivory" mode="sale" />
      <StudioCityListings initialListings={studioCityListings} tone="stone" mode="sold" />

      {/* 6. BUYING BY HOME TYPE */}
      <section className="sc-section sc-bg-ivory" id="buying">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">BUYING</span>
            <h2 className="sc-title">Buying a Home in Studio City</h2>
            <p className="sc-sub">
              &ldquo;Studio City&rdquo; covers very different products. Before we tour anything,
              we&rsquo;ll decide which type fits your budget and your routine, because that choice
              moves the price more than the neighborhood name does.
            </p>
          </div>
          <div className="sc-type-grid">
            <article className="sc-type-card">
              <h3>Houses for Sale in Studio City, Los Angeles</h3>
              <p>
                The median single-family sale in Studio City was about $2.34 million over the past
                year (Homes.com). Houses on the flats are on regular lots with easy access to
                Ventura Boulevard and the 101. Houses in the hills trade that convenience for
                privacy, views and winding roads.
              </p>
              <p>
                Because the typical Studio City home is decades old, I check the things a listing
                photo can&rsquo;t show: the age of the electrical and plumbing, the sewer line,
                permit history for additions, and, on hillside lots, slope, drainage, retaining
                walls and fire-zone insurance. Then I compare the house with sales on similar
                streets, not with the neighborhood as a whole.
              </p>
            </article>
            <article className="sc-type-card">
              <h3>Studio City Condos for Sale</h3>
              <p>
                Condos are the main way in for many buyers. Over the past year, the average Studio
                City condo sold for roughly $873,000 (HelloCondo), and by bedroom count the medians
                were about $540,000 for a one-bedroom and $770,000 for a two-bedroom (Homes.com).
                Most Studio City condos for sale sit along or just off Ventura Boulevard.
              </p>
              <p>With a condo, the building is part of what you&rsquo;re buying. Before any offer I ask:</p>
              <ul className="sc-list">
                <li>What do the monthly dues cover, and what do they leave out?</li>
                <li>How healthy is the reserve, and are big projects (roof, pipes, elevator) coming?</li>
                <li>Are there special assessments or litigation?</li>
                <li>What share of the units are owner-occupied, and will lenders finance in the building?</li>
                <li>What are the parking, pet and rental rules?</li>
                <li>What does earthquake coverage for the unit cost?</li>
              </ul>
            </article>
            <article className="sc-type-card">
              <h3>Studio City Townhomes</h3>
              <p>
                Townhomes sit between condos and houses. The median townhome sale was about $1.08
                million over the past year (Homes.com). You usually get more room and a private
                entrance, plus shared walls and an HOA. I check how ownership is structured, who
                maintains the roof and exterior, and how the price compares with both nearby condos
                and small houses.
              </p>
            </article>
            <article className="sc-type-card">
              <h3>Investing in Studio City</h3>
              <p>
                Duplexes and small apartment buildings sit mainly near the boulevards and on the
                eastern edge, and only a few multi-family properties are listed in a typical month
                (Redfin). When one comes up, I evaluate rents, expenses, repairs and resale value
                before discussing price.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 7. SELLING BY PROPERTY TYPE + VALUATION FORM */}
      <section className="sc-section sc-bg-stone" id="selling">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">SELLING</span>
            <h2 className="sc-title">Selling a House in Studio City</h2>
            <p className="sc-sub">
              A good sale starts with the right comparison. A hillside house, a flat-lot house and a
              condo each need a different set of recent sales, and a price built on the wrong set
              costs either time or money. I set the price, plan the preparation and marketing, and
              manage offers through closing.
            </p>
          </div>
          <div className="sc-two-col">
            <div>
              <h3 className="sc-h3">Selling a Studio City House</h3>
              <p>
                I compare your house only with true matches: similar lot, size, age and condition, on
                similar streets. I&rsquo;ll tell you which updates are worth doing before listing and
                which aren&rsquo;t, and where the permit paperwork needs attention first.
              </p>
            </div>
            <div>
              <h3 className="sc-h3">Selling a Studio City Condo or Townhome</h3>
              <p>
                Buyers study your building as closely as your unit. I price against recent sales in
                your own complex, help you collect HOA documents early so buyers aren&rsquo;t left
                waiting, and prepare answers on dues and assessments.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Same valuation block and form as the Sherman Oaks guide; its styles are
          the guide's lcn- set (neighborhood-guide.css), scoped by .lcn-page. */}
      <div className="lcn-page">
        <section className="lcn-section lcn-ivory" id="valuation">
          <div className="container lcn-split lcn-split-center">
            <div>
              <p className="lcn-eyebrow">Free &amp; Confidential</p>
              <h2 className="lcn-title">Get Your Free Studio City Home Value</h2>
              <p className="lcn-sub">
                Tell me the address and I&rsquo;ll review it personally against recent sales on your
                block or in your building. Free, confidential and no obligation.
              </p>
              <ul className="lcn-bullets">
                <li>Free and confidential</li>
                <li>Based on your street or building</li>
                <li>Reviewed by Andrew himself</li>
              </ul>
            </div>
            <GuideValuationForm place="Studio City" title="Get Your Free Studio City Home Value" />
          </div>
        </section>
      </div>

      {/* 8. MARKET SNAPSHOT (refresh monthly) */}
      <section className="sc-section sc-bg-stone" id="market">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">MARKET</span>
            <h2 className="sc-title">Studio City Real Estate Market</h2>
            <p className="sc-sub">
              Figures last updated <time dateTime="2026-11-21">{UPDATED}</time>. Each row shows its
              source and date.
            </p>
          </div>
          <div className="sc-table-wrap">
            <table className="sc-table">
              <thead>
                <tr>
                  <th scope="col">Measure</th>
                  <th scope="col">Figure</th>
                  <th scope="col">Source and date</th>
                </tr>
              </thead>
              <tbody>
                {MARKET.map(([m, f, src]) => (
                  <tr key={m}>
                    <th scope="row">{m}</th>
                    <td>{f}</td>
                    <td className="sc-table-src">{src}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sc-prose">
            <h3 className="sc-h3">How to Read These Numbers</h3>
            <p>
              The sources disagree on purpose, and the reasons are useful. Zillow&rsquo;s index
              follows the same kinds of homes over time and shows values up about 3% year over year.
              Redfin&rsquo;s three-month median fell about 12.5%, but a median only reflects which
              homes happened to close. In a market this size, a few large hillside sales more or less
              can move it a lot. That is why I look at price per square foot, property type and your
              specific pocket before I give you a number.
            </p>
            <p>
              Two things are consistent across sources. Houses and condos live in different price
              worlds, with houses above $2 million at the median and condos mostly below $1 million.
              And many sales close below the asking price, which means a well-supported offer can
              have room to negotiate.
            </p>
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/contact" className="btn-outline-dark">
              <span>Ask Me for a Studio City Price Review</span>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. NEIGHBORHOODS AND POCKETS */}
      <section className="sc-section sc-bg-ivory" id="pockets">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">POCKETS</span>
            <h2 className="sc-title">Studio City Neighborhoods and Pockets</h2>
            <p className="sc-sub">
              Studio City is small, but it doesn&rsquo;t behave like one market. These are the
              pockets I get asked about most.
            </p>
          </div>
          <div className="sc-glance-grid">
            {POCKETS.map(([name, text]) => (
              <div className="sc-glance-card" key={name}>
                <h3 className="sc-card-h3">{name}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. SCHOOLS, PARKS AND DAILY LIFE (all text visible) */}
      <section className="sc-section sc-bg-stone" id="daily-life">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">DAILY LIFE</span>
            <h2 className="sc-title">Schools, Parks and Daily Life in Studio City</h2>
          </div>
          <div className="sc-two-col">
            <div>
              <h3 className="sc-h3">Studio City Schools</h3>
              <p>
                Public school assignment depends entirely on the address, so confirm it with LAUSD
                before you write an offer. Schools that families ask about include:
              </p>
              <ul className="sc-list">
                <li>Carpenter Community Charter (K–5), 3909 Carpenter Avenue, a public charter within LAUSD</li>
                <li>Rio Vista Elementary, 4243 Satsuma Avenue</li>
                <li>Walter Reed Middle School, 4525 Irvine Avenue</li>
                <li>Nearby, depending on the address: Dixie Canyon Community Charter and Colfax Charter Elementary</li>
                <li>Private options include Harvard-Westlake (upper school, 3700 Coldwater Canyon Avenue), Bridges Academy and Campbell Hall</li>
              </ul>
            </div>
            <div>
              <h3 className="sc-h3">Parks and Trails</h3>
              <p>
                Fryman Canyon offers a roughly 3-mile loop on the Betty B. Dearing Trail through
                Wilacre Park and Coldwater Canyon Park. The parking lot is at Laurel Canyon Boulevard
                and Fryman Road. Beeman Park, home of the Studio City Recreation Center at 12621 Rye
                Street, has sports fields, tennis courts and play areas for families.
              </p>
              <h3 className="sc-h3">Dining, Errands and Everyday Life</h3>
              <p>
                Ventura Boulevard carries the neighborhood&rsquo;s restaurants, cafés and services,
                and Tujunga Village adds a smaller cluster of shops on the east side. The Studio City
                Farmers Market runs every Sunday morning on Ventura Place between Laurel Canyon
                Boulevard and Radford Avenue. Radford Studio Center, long known as CBS Studio Center,
                is a major local employer, which is part of why Studio City has such a strong
                entertainment-industry presence.
              </p>
              <h3 className="sc-h3">Getting Around</h3>
              <p>
                The 101 is the main freeway, and Laurel Canyon and Coldwater Canyon boulevards cross
                the hills toward Hollywood and the Westside. Most daily errands are easiest by car,
                though the Village is walkable. Test any address at both rush hour and a quiet hour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. WHY ANDREW AND HOW IT WORKS */}
      <section className="sc-section sc-bg-dark" id="why-andrew">
        <div className="container">
          <div className="sc-section-head text-center">
            <span className="sc-eyebrow sc-eyebrow-light">WHY ANDREW</span>
            <h2 className="sc-title sc-title-light">
              Why Work With Andrew as Your <em>Studio City</em> Real Estate Agent
            </h2>
            <p className="sc-sub sc-sub-light">
              If you&rsquo;re comparing real estate agents in Studio City, CA, ask each one for recent
              sales on your street and in your type of home. Here&rsquo;s what you get from me.
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
          <p className="sc-license">
            Andrew Ruric Liberty II · CA DRE# 01965696 | Compass California, Inc. · CA DRE# 01991628
          </p>
          <div className="sc-hero-ctas" style={{ justifyContent: "center" }}>
            <a href="https://wa.me/13107090581" target="_blank" rel="noopener noreferrer" className="btn-gold">
              <span>Schedule a Consultation</span>
              <ArrowRight />
            </a>
            <Link href="/team/andrew-liberty" className="btn-outline-light">
              <span>Meet Andrew</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="sc-section sc-bg-ivory" id="process">
        <div className="container">
          <div className="sc-section-head text-center">
            <span className="sc-eyebrow">PROCESS</span>
            <h2 className="sc-title">How It Works</h2>
          </div>
          <div className="sc-process-grid">
            {STEPS.map(([t, d], i) => (
              <div className="sc-process-card" key={t}>
                <span className="sc-process-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CLIENT PROOF */}
      <section className="sc-section sc-bg-stone" id="testimonials">
        <div className="container">
          <div className="sc-section-head text-center">
            <span className="sc-eyebrow">CLIENT PROOF</span>
            <h2 className="sc-title">What Studio City Clients Say</h2>
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
                exception Andrew over-delivered.&rdquo;
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

      {/* 13. FAQ: every answer rendered open in the HTML */}
      <section className="sc-section sc-bg-ivory" id="faq">
        <div className="container">
          <div className="sc-section-head text-center">
            <span className="sc-eyebrow">COMMON QUESTIONS</span>
            <h2 className="sc-title">Studio City Real Estate FAQ</h2>
          </div>
          <div className="sc-faq-groups">
            {FAQ_GROUPS.map((g) => (
              <div className="sc-faq-group" key={g.title}>
                <h3 className="sc-h3">{g.title}</h3>
                <dl>
                  {g.items.map((item) => (
                    <div className="sc-faq-item" key={item.q}>
                      <dt>{item.q}</dt>
                      <dd>
                        {item.a}
                        {item.q.includes("Sherman Oaks") && (
                          <>
                            {" "}
                            <Link href="/real-estate-agent-in-sherman-oaks">See my Sherman Oaks guide →</Link>
                          </>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. NEARBY NEIGHBORHOODS AND FINAL CTA */}
      <section className="sc-section sc-bg-stone" id="nearby">
        <div className="container">
          <div className="sc-section-head">
            <span className="sc-eyebrow">NEARBY</span>
            <h2 className="sc-title">Explore Nearby Neighborhoods</h2>
          </div>
          <div className="sc-hero-action-grid sc-nearby-grid">
            {NEARBY.map(([name, text, href]) => (
              <Link href={href} className="sc-hero-action-card" key={href}>
                <div>
                  <h3>{name}</h3>
                  <p>{text}</p>
                </div>
                <span className="sc-hero-card-link">
                  VIEW GUIDE <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
          <p className="sc-related">
            Related reading:{" "}
            <Link href="/blog/studio-city-vs-sherman-oaks">Studio City vs. Sherman Oaks</Link> ·{" "}
            <Link href="/blog/selling-a-house-in-los-angeles">Selling a house in Los Angeles</Link> ·{" "}
            <Link href="/blog/how-to-buy-a-house-in-los-angeles">How to buy a house in Los Angeles</Link>
          </p>
        </div>
      </section>

      <section className="sc-final-cta-section" id="next-step">
        <div className="container">
          <div className="sc-final-cta-inner">
            <span className="sc-eyebrow sc-eyebrow-light">NEXT STEP</span>
            <h2 className="sc-title sc-title-light">Ready to Buy or Sell in Studio City?</h2>
            <p className="sc-sub sc-sub-light" style={{ margin: "0 auto 36px" }}>
              Tell me your street, your timing and what you want from your next move. I&rsquo;ll show
              you what the market means for your situation. Free consultation, no pressure.
            </p>
            <div className="sc-hero-ctas" style={{ justifyContent: "center" }}>
              <Link href={mlsAreaUrl("studio-city")} className="btn-gold">
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
