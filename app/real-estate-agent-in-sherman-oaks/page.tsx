import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/icons";
import JsonLd from "../components/JsonLd";
import AreaListings from "../components/AreaListings";
import GuideValuationForm from "../components/GuideValuationForm";
import { fetchRawListingsServer } from "@/lib/idxServer";
import { inArea } from "@/lib/areas";
import { toPropertyItem } from "@/lib/idx";
import { SITE_URL, SITE_NAME, abs } from "@/lib/site";
import { mlsAreaUrl } from "@/lib/mlsSearch";
// Shared neighbourhood-guide styles; every rule is under .lcn-page.
import "../neighborhood-guide.css";

/**
 * Sherman Oaks neighbourhood guide, rebuilt on the November 2026 content
 * brief: Sherman Oaks as a price ladder (condos, flats, hills) with ZIP-level
 * numbers, a condo/townhome/house comparison, local history and an open
 * grouped FAQ. Every figure is dated; refresh the market table monthly.
 */

const PATH = "/real-estate-agent-in-sherman-oaks";
const HERO_IMG = "/images/sold-sherman-oaks.jpg";
const UPDATED = "November 21, 2026";

const TITLE = "Sherman Oaks Real Estate Agent | Condos, Townhomes, Houses";
const OG_TITLE = "Real Estate Agent in Sherman Oaks | Andrew Liberty";
const DESCRIPTION =
  "Andrew Liberty is a real estate agent in Sherman Oaks, CA. See condo, townhome and house prices, schools and parks, then book a free consultation.";

const IcPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
const IcDoc = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h6" /></svg>
);
const IcShake = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" /><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2.8 2.8 0 0 0-4 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a4.8 4.8 0 0 1 5.7-.8l.5.3a3 3 0 0 0 2 .4H21" /><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1.4 1.4 0 0 0 2-2M3 4h8" /></svg>
);

const WHY_POINTS = [
  {
    Icon: IcPin,
    title: "A neighbor from Studio City",
    text: "My office at 12001 Ventura Place is a few minutes from Sherman Oaks, and I know how the neighborhoods along the 101 corridor compare.",
  },
  {
    Icon: IcDoc,
    title: "Documents before decisions",
    text: "My commercial real estate background means I read budgets, reserve studies, permits and disclosures closely, which matters most for condos and older homes.",
  },
  {
    Icon: IcShake,
    title: "A credentialed negotiator",
    text: "I hold the Certified Real Estate Negotiation Expert designation and apply it to price, repairs and terms.",
  },
];

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
    images: [{ url: HERO_IMG, alt: "A residential street in Sherman Oaks" }],
  },
  twitter: { card: "summary_large_image", title: OG_TITLE, description: DESCRIPTION, images: [HERO_IMG] },
};

/* The listings are rendered from the server-side IDX feed, cached for six hours
   in lib/idxServer.ts; the page follows the same cadence. */
export const revalidate = 21600;

const START = [
  {
    tag: "Buying",
    title: "Buying in Sherman Oaks",
    body: "Whether you want a one-bedroom condo, a townhome or a house with a pool, I start by showing what your budget buys in each part of Sherman Oaks.",
    cta: "Browse Sherman Oaks homes",
    href: mlsAreaUrl("sherman-oaks"),
  },
  {
    tag: "Selling",
    title: "Selling in Sherman Oaks",
    body: "A condo, a flat-lot house and a hillside home each need a different set of comparable sales. I start with a free valuation that uses the right set.",
    cta: "Get your home value",
    href: "/home-valuation",
  },
  {
    tag: "Investing",
    title: "Investing in Sherman Oaks",
    body: "Small multifamily properties are listed only occasionally here. I run rents, repairs and resale value before we talk about price.",
    cta: "Explore opportunities",
    href: "/contact",
  },
];

const GLANCE = [
  ["Boundaries", "Roughly Mulholland Drive on the south, Burbank Boulevard on the north, the 405 and Sepulveda Boulevard on the west, and the Studio City line near Coldwater Canyon on the east."],
  ["ZIP codes", "91403, 91423, 91401 and 91411 (see below)."],
  ["Main corridors", "Ventura Boulevard, Van Nuys Boulevard, Sepulveda Boulevard, Magnolia Boulevard, Burbank Boulevard, Woodman Avenue, Coldwater Canyon Avenue."],
  ["Freeways", "The 101 and 405 meet here, which helps commuters and puts noise on some streets."],
  ["Housing", "A median year built of about 1955 and a median lot of about 7,400 square feet (Homes.com), so most houses are older and many have been remodeled."],
  ["Neighbors", "Studio City, Valley Village, Encino, Van Nuys, and Bel Air and Beverly Hills over the hills."],
];

const ZIPS = [
  ["91423", "Central Sherman Oaks and the neighborhoods south of Ventura Boulevard near Coldwater Canyon", "$1.52 million (Resideline, 6 months to Oct. 5, 2026)"],
  ["91403", "The area toward Mulholland Drive, including hillside pockets such as Longridge Estates", "Roughly $1.5–$1.9 million, depending on source and window"],
  ["91401", "The flatter grid toward the Van Nuys border, including Chandler Estates", "Roughly $1.2 million"],
  ["91411", "A small northern pocket shared with Van Nuys", "Ask me for current sales"],
];

const COMPARE: [string, string, string, string][] = [
  ["Typical price signal", "About $475K (1-bd) to $700K (2-bd)", "Roughly $0.8–$1.3 million", "Roughly $1.9–$2.0 million median"],
  ["Monthly dues", "Yes, often with shared amenities", "Usually yes", "None"],
  ["Who maintains the exterior", "The HOA", "Varies, check the structure", "You"],
  ["Lot or yard", "None", "Small or none", "Private"],
  ["Best for", "Lower price, low upkeep, Ventura access", "More room without a house price", "Space, privacy, long-term hold"],
];

const MARKET: [string, string, string][] = [
  ["Median sale price, last 6 months", "$1,392,500 across 308 closings (about 51 a month)", "Resideline, August 2026"],
  ["Median sale price, ZIP 91423, last 6 months", "$1.52 million; middle half of sales $935,000 to $2.5 million (199 closings)", "Resideline, data as of Oct. 5, 2026"],
  ["Active listings and asking price, ZIP 91423", "35 active, 5 pending; median asking price about $2.5 million", "Resideline, Oct. 5, 2026"],
  ["Median sale price, all home types", "$1,350,000, down 2.0% year over year", "Redfin, March 2026"],
  ["Typical home value", "About $1.36 million (Zillow Home Value Index)", "Zillow, as of March 31, 2026"],
  ["Median sale price by ZIP (mid-2026)", "91401: about $1.23 million; 91403: roughly $1.5–$1.86 million", "Redfin and RealtyTrac"],
  ["Price per square foot", "Roughly $680–$735", "Redfin (Nov. 2025) and Homes.com"],
  ["Time to sell", "About 44–56 days", "Zillow days to pending; Redfin average for 3 months ending May 2026"],
  ["Active listings by type", "About 297 houses, 123 condos, 15 townhomes", "Weichert, Feb. 26, 2026"],
];

const POCKETS = [
  ["Chandler Estates", "Flat, family-oriented streets lined with mid-century ranch homes, mostly in the 91401 area. Residents here pushed in 1991 to be redrawn into Sherman Oaks instead of Van Nuys, which is why the neighborhood’s northern edge reaches Burbank Boulevard."],
  ["Magnolia Woods", "A roughly 45-block pocket between Van Nuys Boulevard and the 405, running from Burbank to Magnolia boulevards, which joined Sherman Oaks in the same boundary change. School zoning here differs from much of the neighborhood, so I confirm it per address."],
  ["Sherman Village, Library Square and the Ventura corridor", "The commercial center, with Ventura Boulevard’s shops and restaurants, the Martin Pollard branch library on Moorpark Street, and most of the neighborhood’s condo buildings within a short walk."],
  ["Fashion Square area", "Condos and townhomes near Westfield Fashion Square, with easy access to Ventura and Sepulveda boulevards and the 101 and 405. Convenient, with more traffic."],
  ["Hidden Woods, Royal Woods, Stone Canyon and Stoneridge Estates", "Hillside pockets south of Ventura Boulevard with larger lots, curving streets and valley views. Road access, slope and insurance deserve attention here."],
  ["Longridge Estates", "A private, upscale hillside area reached by winding roads, known for estate-style properties."],
  ["The Platform House district on Oakfield Drive", "Seventeen mid-century “Platform Houses” built on large platforms cantilevered over a steep slope, a rare architectural enclave. Homes here trade as architecture, not just as square footage, so I look for specialist comparables."],
  ["Dixie Canyon and the southern hills", "Wooded streets near Dixie Canyon Park, with trail access and a more secluded feel. Coldwater Canyon Avenue and Beverly Glen Boulevard cross the hills toward Bel Air and the Westside."],
];

const PROCESS = [
  ["First conversation", "We cover your goals, timing and which kind of home fits."],
  ["Sorting the market", "We separate condos, flats and hills so you only compare what applies."],
  ["Search or pricing", "A short list of homes that fit, or a price built on the right sales."],
  ["Offers and negotiation", "I protect your price, repairs and terms."],
  ["Closing", "Escrow, inspections and paperwork stay on schedule."],
  ["After the sale", "Advice on value, improvements and timing for your next move."],
];

/* Not the quotes used on the Studio City page. */
const QUOTES = [
  "Andrew and his team made the whole process so easy. We were still green to everything, and he always had time to answer our questions clearly and on time.",
];

const FAQ_GROUPS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Choosing an Agent",
    items: [
      { q: "How do I choose a real estate agent in Sherman Oaks, CA?", a: "Match the agent to your type of home. Ask how they price a condo versus a hillside house, ask for recent Sherman Oaks sales similar to yours, and ask whether they read HOA documents before making an offer. Check licenses and reviews, and meet at least two agents." },
      { q: "What does it cost to work with a real estate agent in Sherman Oaks?", a: "Commissions are negotiable and are set in a written agreement before you commit. I explain how I’m paid, and what you receive for it, at our first meeting, so there are no surprises." },
    ],
  },
  {
    title: "The Area",
    items: [
      { q: "Where are the boundaries of Sherman Oaks?", a: "Sherman Oaks runs roughly from Mulholland Drive on the south to Burbank Boulevard on the north, with the 405 and Sepulveda Boulevard to the west and the Studio City line near Coldwater Canyon to the east. Chandler Estates and Magnolia Woods were redrawn into Sherman Oaks in the early 1990s, which is why the northern edge reaches Burbank Boulevard." },
      { q: "What ZIP codes are in Sherman Oaks?", a: "Sherman Oaks spans ZIP codes 91403, 91423, 91401 and 91411. Some addresses near the edges may also list Studio City, Van Nuys or Encino, so confirm the exact address." },
      { q: "Which schools serve Sherman Oaks homes?", a: "It depends on the address. Dixie Canyon Community Charter, Riverside Drive Charter and Chandler Elementary are among the elementary schools families ask about, with Millikan and Louis Armstrong for middle school. High school zoning varies, with some areas going to Van Nuys High and others to Grant High. Verify the assignment with LAUSD before an offer." },
      { q: "What parks are in Sherman Oaks?", a: "Van Nuys/Sherman Oaks Park (with its War Memorial Park and recreation center), Sherman Oaks Castle Park, Dixie Canyon Park and the LA River’s Ernie’s Walk are the main ones." },
    ],
  },
  {
    title: "Buying",
    items: [
      { q: "How much does a home cost in Sherman Oaks?", a: "It depends on the type and the ZIP code. Recent six-month medians were about $1.39 million across the neighborhood and $1.52 million in ZIP 91423, though the middle half of sales in 91423 ran from about $935,000 to $2.5 million. See the Market Snapshot above for each figure and its source." },
      { q: "How much do condos cost in Sherman Oaks?", a: "Recent medians are roughly $475,000 for a one-bedroom and $650,000–$700,000 for a two-bedroom. I always compare dues, reserves and building rules alongside the price." },
      { q: "Are there townhomes in Sherman Oaks?", a: "Yes, but fewer than condos. In February 2026 there were about 15 townhomes listed against about 123 condos, so a good townhome can attract competition." },
      { q: "Is Sherman Oaks at risk of wildfire or flooding?", a: "Some areas are. Redfin’s climate-risk ratings put wildfire risk at moderate (about 40% of properties with some exposure over 30 years) and flood risk as minor overall, though it still touches a meaningful share of properties. Risk varies by street, so I recommend an insurance quote and a hazard-zone check before you buy, especially in the hills or near drainage channels." },
    ],
  },
  {
    title: "Selling",
    items: [
      { q: "How do I price a hillside home with no close comparables?", a: "Start with the nearest sales on similar slopes and view orientations, then adjust for lot, access, condition and views. I show you the range and where the evidence is thin, so you can choose between pricing for speed or for a higher number." },
      { q: "How long does it take to sell a home in Sherman Oaks?", a: "Recent data points to roughly 44 to 56 days, depending on the source and the month, with well-priced condos and flat-lot houses often moving faster than view homes. Price, condition and timing decide where yours lands." },
    ],
  },
];
const FAQS = FAQ_GROUPS.flatMap((g) => g.items);

const NEARBY = [
  ["Studio City", "Village streets and hillside pockets just east", "/real-estate-agent-in-studio-city"],
  ["Valley Village", "Condos and ranch homes to the northeast", "/real-estate-agent-in-valley-village"],
  ["Laurel Canyon", "Wooded hillside living over the ridge", "/real-estate-agent-in-laurel-canyon"],
  ["Hollywood Hills", "View homes and canyon streets", "/real-estate-agent-in-hollywood-hills"],
];

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function ShermanOaksPage() {
  const listings = await fetchRawListingsServer();
  // Section 5 shows Andrew's Sherman Oaks closings when he has them, otherwise
  // nearby Studio City and Valley Village sales, each labelled by area.
  const hasLocalSold = (listings ?? []).some((raw) => inArea(raw, "sherman-oaks") && toPropertyItem(raw).badge === "Sold");

  return (
    <div className="lcn-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Neighborhoods", item: abs("/neighborhoods") },
                { "@type": "ListItem", position: 3, name: "Sherman Oaks", item: abs(PATH) },
              ],
            },
            {
              "@type": "WebPage",
              "@id": `${abs(PATH)}#webpage`,
              url: abs(PATH),
              name: OG_TITLE,
              description: DESCRIPTION,
              primaryImageOfPage: abs(HERO_IMG),
              isPartOf: { "@type": "CollectionPage", "@id": `${abs("/neighborhoods")}#webpage`, url: abs("/neighborhoods") },
              mainEntity: {
                "@type": "Service",
                "@id": `${abs(PATH)}#service`,
                name: "Real Estate Agent Services in Sherman Oaks",
                serviceType: "Real estate agent",
                description: "Buying, selling and investment guidance for Sherman Oaks condos, townhomes and houses, each priced on its own comparable sales.",
                provider: { "@id": `${SITE_URL}/#agent` },
                areaServed: {
                  "@type": "Place",
                  "@id": `${abs(PATH)}#place`,
                  name: "Sherman Oaks",
                  description: "A neighborhood in the San Fernando Valley, City of Los Angeles, running from Burbank Boulevard up to Mulholland Drive.",
                  image: abs(HERO_IMG),
                  address: { "@type": "PostalAddress", addressLocality: "Sherman Oaks", addressRegion: "CA", postalCode: "91423", addressCountry: "US" },
                  containedInPlace: { "@type": "City", name: "Los Angeles" },
                  sameAs: "https://en.wikipedia.org/wiki/Sherman_Oaks,_Los_Angeles",
                },
              },
            },
            {
              "@type": ["RealEstateAgent", "LocalBusiness"],
              "@id": `${abs(PATH)}#office`,
              name: "Andrew Liberty, Compass",
              url: abs(PATH),
              telephone: "+1-310-709-0581",
              image: abs(HERO_IMG),
              address: { "@type": "PostalAddress", streetAddress: "12001 Ventura Pl, Ste 100", addressLocality: "Studio City", addressRegion: "CA", postalCode: "91604", addressCountry: "US" },
              areaServed: { "@id": `${abs(PATH)}#place` },
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ],
        }}
      />

      {/* 1. HERO */}
      <section className="lcn-hero-split">
        <div className="container lcn-hero-split-inner">
          <div>
            <nav className="lcn-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/neighborhoods">Neighborhoods</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Sherman Oaks</span>
            </nav>
            <p className="lcn-eyebrow">Sherman Oaks, Los Angeles</p>
            <h1 className="lcn-hero-title">
              Real Estate Agent in Sherman Oaks <em>Condos, flats and hillside homes, each priced on its own sales</em>
            </h1>
            <p className="lcn-hero-sub">
              A Sherman Oaks condo near Fashion Square, a ranch house in Chandler Estates and a view home off
              Mulholland share a ZIP code at most, and little else. I’m Andrew Liberty, a real estate agent in
              Sherman Oaks, CA, working from my office a few minutes away in Studio City. I match every client to the
              right type of home first, then to the sales that justify the price.
            </p>
            <div className="lcn-ctas">
              <Link href={mlsAreaUrl("sherman-oaks")} className="lcn-btn lcn-btn-dark">
                Browse Sherman Oaks Homes
              </Link>
              <Link href="/home-valuation" className="lcn-btn lcn-btn-outline">
                Get Your Home Value
              </Link>
            </div>
          </div>
          <div className="lcn-photo lcn-hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMG} alt="A tree-lined residential street in Sherman Oaks" fetchPriority="high" />
          </div>
        </div>
      </section>

      {/* 2. LOCAL INTRO, PROOF ROW, BUY / SELL / INVEST */}
      <section className="lcn-section lcn-ivory" id="intro">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Your Local Agent</p>
            <h2 className="lcn-title">A Sherman Oaks Real Estate Agent Who Prices by Home Type</h2>
            <p className="lcn-sub">
              Sherman Oaks stretches from Burbank Boulevard up to Mulholland Drive, so one neighborhood name covers
              condos, townhomes, flat-lot houses and hillside estates. A single average price for Sherman Oaks real
              estate hides all of that. When I work with a buyer or seller, we separate the market into the piece
              that actually applies, whether that is a building, a block or a canyon street.
            </p>
            <p className="lcn-sub">
              I started my career in commercial real estate, where a property is judged by its documents and its
              numbers before its looks. That habit is especially useful in Sherman Oaks, where condo buildings,
              hillside lots and older homes each come with paperwork worth reading closely.
            </p>
          </div>
          <ul className="lcn-proof-row">
            <li>Office at 12001 Ventura Place, Studio City</li>
            <li>Certified Real Estate Negotiation Expert (RENE)</li>
            <li>Commercial real estate background</li>
          </ul>
          <div className="lcn-grid-3">
            {START.map((c) => (
              <a key={c.title} href={c.href} className="lcn-card lcn-card-accent lcn-start-card">
                <p className="lcn-tag">{c.tag}</p>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <span className="lcn-card-link">
                  {c.cta} <ArrowRight />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AT A GLANCE + ZIP CODES */}
      <section className="lcn-section lcn-stone" id="glance">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Orientation</p>
            <h2 className="lcn-title">Sherman Oaks at a Glance</h2>
          </div>
          <dl className="lcn-facts lcn-facts-wide">
            {GLANCE.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="lcn-head lcn-subhead">
            <h3 className="lcn-h3">Sherman Oaks ZIP Codes</h3>
            <p className="lcn-sub">Sherman Oaks spans four ZIP codes, and each tends to mean a different kind of home.</p>
          </div>
          <div className="lcn-table-wrap">
            <table className="lcn-table">
              <thead>
                <tr>
                  <th scope="col">ZIP</th>
                  <th scope="col">What it generally covers</th>
                  <th scope="col">Recent median sale price</th>
                </tr>
              </thead>
              <tbody>
                {ZIPS.map(([z, c, p]) => (
                  <tr key={z}>
                    <th scope="row">{z}</th>
                    <td data-label="Covers">{c}</td>
                    <td data-label="Median sale">{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="lcn-note">
            Because a ZIP code can mix flats and hills, I always confirm the exact address before I pull comparable
            sales.
          </p>
        </div>
      </section>

      {/* 4. HOMES FOR SALE (Sherman Oaks only, no fallback) */}
      <section className="lcn-section lcn-ivory" id="listings">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Listings</p>
            <h2 className="lcn-title">Homes for Sale in Sherman Oaks, CA</h2>
            <p className="lcn-sub">
              These Sherman Oaks homes come from my MLS feed: condos, townhomes and houses, each with price,
              bedrooms, baths and square footage. If one stands out, I’ll set up a showing and show you the sales
              that support (or challenge) the asking price.
            </p>
          </div>
          <AreaListings
            initialListings={listings}
            area="sherman-oaks"
            place="Sherman Oaks"
            only="sale"
            fallback={false}
            emptyText="I don’t have an active Sherman Oaks listing at the moment, so here is the wider market at a glance. As of October 5, 2026, ZIP code 91423 had 35 active listings and 5 pending sales, with a median asking price of about $2.5 million and a median six-month sale price of about $1.52 million (Resideline). Search every Sherman Oaks listing below, or ask me to send you new Sherman Oaks homes as they come to market."
          />
        </div>
      </section>

      {/* 5. RECENTLY SOLD */}
      <section className="lcn-section lcn-stone" id="sold">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Recently Sold</p>
            <h2 className="lcn-title">Recently Sold Near Sherman Oaks</h2>
            <p className="lcn-sub">
              {hasLocalSold
                ? "Sold prices show what buyers actually paid, which is a better guide than asking prices when you set a budget or an offer. Here are recent closings from my Sherman Oaks clients."
                : "Sold prices show what buyers actually paid. Below are recent sales I’ve closed in nearby Studio City and Valley Village, which share many of the same buyers. I’m happy to send you recent Sherman Oaks sales for your street or building, matched by home type."}
            </p>
          </div>
          {hasLocalSold ? (
            <AreaListings initialListings={listings} area="sherman-oaks" place="Sherman Oaks" only="sold" fallback={false} searchLabel="View Sold Homes" />
          ) : (
            <>
              <AreaListings initialListings={listings} area="studio-city" place="Studio City" only="sold" fallback={false} max={3} searchLabel="View Sold Studio City Homes" />
              <AreaListings initialListings={listings} area="valley-village" place="Valley Village" only="sold" fallback={false} max={3} searchLabel="View Sold Valley Village Homes" />
            </>
          )}
        </div>
      </section>

      {/* 6. BUYING BY HOME TYPE */}
      <section className="lcn-section lcn-ivory" id="buying">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Buying</p>
            <h2 className="lcn-title">Sherman Oaks Condos, Townhomes and Houses</h2>
            <p className="lcn-sub">
              Condos, townhomes and houses are three different purchases, with different monthly costs, different
              documents and different resale patterns. Choosing among them comes before choosing a street. Among
              active Sherman Oaks listings in February 2026, houses numbered around 297, condos around 123, and
              townhomes only about 15 (Weichert), so condos are by far the more available attached option.
            </p>
          </div>

          <div className="lcn-split">
            <div className="lcn-prose">
              <h3 className="lcn-h3">Condos in Sherman Oaks, CA</h3>
              <p>
                Sherman Oaks condos for sale concentrate along Ventura Boulevard and on streets such as Moorpark
                Street, Fulton Avenue, Kester Avenue, Willis Avenue and Coldwater Canyon Avenue. Pricing is far
                lower than for houses: recent Homes.com figures show a median of roughly $475,000 for a one-bedroom
                and about $650,000–$700,000 for a two-bedroom.
              </p>
              <p>
                Whether you search for Sherman Oaks condos or Sherman Oaks condominiums, the building matters as much
                as the unit. Before I recommend an offer, I read three documents:
              </p>
              <ol className="lcn-list">
                <li><strong>The budget and reserve study.</strong> It shows what dues cover and whether large repairs are funded.</li>
                <li><strong>The CC&amp;Rs.</strong> They set the rules on rentals, pets, parking and renovations.</li>
                <li><strong>Recent meeting minutes.</strong> They reveal assessments, disputes and planned projects before they reach your bill.</li>
              </ol>
            </div>
            <div className="lcn-prose">
              <h3 className="lcn-h3">Townhomes in Sherman Oaks</h3>
              <p>
                Townhomes in Sherman Oaks are scarce compared with condos, so a good one can attract competition.
                They typically give you a private entrance, more interior space and often a garage, with shared walls
                and an HOA. I confirm who owns and maintains the roof and exterior, how the dues are set, and how the
                price compares with both condos and small houses in the same area.
              </p>
              <h3 className="lcn-h3">Sherman Oaks Houses for Sale</h3>
              <p>
                For a Sherman Oaks house, the first question is whether it sits on the flats or in the hills, because
                that choice changes the lot, the road, the insurance and the price. Recent median sale prices for
                single-family homes ran roughly $1.9–$2.0 million (Homes.com). On flat-lot houses I look at the age of
                the systems and the permit history. On hillside lots I add slope, drainage, retaining walls,
                fire-zone insurance and the City’s hillside building rules.
              </p>
            </div>
          </div>

          <h3 className="lcn-h3 lcn-table-title">Condo, Townhome or House: Quick Comparison</h3>
          <div className="lcn-table-wrap">
            <table className="lcn-table">
              <thead>
                <tr>
                  <td />
                  <th scope="col">Condo</th>
                  <th scope="col">Townhome</th>
                  <th scope="col">House</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([k, a, b, c]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td data-label="Condo">{a}</td>
                    <td data-label="Townhome">{b}</td>
                    <td data-label="House">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lcn-prose lcn-after">
            <h3 className="lcn-h3">Investing in Sherman Oaks</h3>
            <p>
              Duplexes and small apartment buildings appear only a handful of times a year in the listings. When one
              does, I evaluate rents, operating costs, repair needs and zoning before talking price.
            </p>
          </div>
        </div>
      </section>

      {/* 7. SELLING BY PROPERTY TYPE */}
      <section className="lcn-section lcn-stone" id="selling">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Selling</p>
            <h2 className="lcn-title">Selling a Home in Sherman Oaks</h2>
            <p className="lcn-sub">
              A good price starts with a good comparison, and in Sherman Oaks the wrong comparison is expensive. A
              condo priced from house sales leaves money on the table, and a hillside home priced from flat-lot sales
              can sit for months. I choose the comparable set first, then set the price, then plan preparation,
              marketing and offers.
            </p>
          </div>
          <div className="lcn-grid-3">
            <div className="lcn-card">
              <h3>Selling a Sherman Oaks House</h3>
              <p>
                I compare your house with true matches: similar lot type, size, age and street. I tell you which
                updates are worth doing before listing and which are not, and I check permits and disclosures early,
                because hillside homes and older additions are where surprises appear.
              </p>
            </div>
            <div className="lcn-card">
              <h3>Selling a Hillside or View Home</h3>
              <p>
                Homes in the hills rarely have a close twin. I build the price from the nearest comparable sales,
                adjust for view, lot, access and condition, and show you the range openly, including where the
                evidence is thin. Fire-zone disclosures, retaining walls and road access get attention before photos
                do.
              </p>
            </div>
            <div className="lcn-card">
              <h3>Selling a Sherman Oaks Condo or Townhome</h3>
              <p>
                Buyers read your building’s documents as closely as they inspect your unit. I price against recent
                sales in your own complex, gather the budget, reserve study and CC&amp;Rs before you list, and prepare
                answers on dues and assessments so buyers can move quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lcn-section lcn-ivory" id="valuation">
        <div className="container lcn-split lcn-split-center">
          <div>
            <p className="lcn-eyebrow">Free &amp; Confidential</p>
            <h2 className="lcn-title">Get Your Free Sherman Oaks Home Value</h2>
            <p className="lcn-sub">
              Share the address and I’ll review it personally against recent sales in your building or on your
              street. Free, confidential and no obligation.
            </p>
            <ul className="lcn-bullets">
              <li>Free and confidential</li>
              <li>Matched to your type of home</li>
              <li>Reviewed by Andrew himself</li>
            </ul>
          </div>
          <GuideValuationForm place="Sherman Oaks" title="Get Your Free Sherman Oaks Home Value" />
        </div>
      </section>

      {/* 8. MARKET SNAPSHOT (refresh monthly) */}
      <section className="lcn-section lcn-stone" id="market">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Market</p>
            <h2 className="lcn-title">Sherman Oaks Real Estate Market</h2>
            <p className="lcn-sub">
              Figures last updated <time dateTime="2026-11-21">{UPDATED}</time>. Each row shows its source and date.
            </p>
          </div>
          <div className="lcn-table-wrap">
            <table className="lcn-table">
              <thead>
                <tr>
                  <th scope="col">Measure</th>
                  <th scope="col">Figure</th>
                  <th scope="col">Source and date</th>
                </tr>
              </thead>
              <tbody>
                {MARKET.map(([m, f, s]) => (
                  <tr key={m}>
                    <th scope="row">{m}</th>
                    <td data-label="Figure">{f}</td>
                    <td data-label="Source">{s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lcn-prose lcn-after">
            <h3 className="lcn-h3">How to Read These Numbers</h3>
            <p>
              The ZIP-level rows show the real story. A six-month median that blends condos, flats and hillside
              estates sits near $1.4 million, but the middle half of sales in 91423 alone runs from about $935,000 to
              $2.5 million. That spread is the reason I never quote a neighborhood average to a client.
            </p>
            <p>
              Asking and selling prices also tell different stories. In 91423 the median asking price (about $2.5
              million) sits far above the median closed price ($1.52 million), partly because current listings skew
              toward larger and hillside homes. A buyer or seller who anchors on asking prices can be misled in either
              direction.
            </p>
          </div>
          <div className="lcn-after">
            <Link href="/contact" className="lcn-btn lcn-btn-outline">
              Ask Me for a Sherman Oaks Price Review
            </Link>
          </div>
        </div>
      </section>

      {/* 9. NEIGHBORHOODS AND POCKETS */}
      <section className="lcn-section lcn-ivory" id="pockets">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Pockets</p>
            <h2 className="lcn-title">Sherman Oaks Neighborhoods and Pockets</h2>
          </div>
          <div className="lcn-grid-2">
            {POCKETS.map(([name, text]) => (
              <div key={name} className="lcn-card">
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. SCHOOLS, PARKS AND DAILY LIFE */}
      <section className="lcn-section lcn-stone" id="daily-life">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Daily Life</p>
            <h2 className="lcn-title">Schools, Parks and Daily Life in Sherman Oaks</h2>
          </div>
          <div className="lcn-split">
            <div className="lcn-prose">
              <h3 className="lcn-h3">Sherman Oaks Schools</h3>
              <p>
                Public school assignment depends on the exact address, so confirm it with LAUSD before you write an
                offer. Schools families ask about include:
              </p>
              <ul className="lcn-list">
                <li>Dixie Canyon Community Charter (K–5), 4220 Dixie Canyon Avenue</li>
                <li>Riverside Drive Charter (K–5), 13061 Riverside Drive</li>
                <li>Chandler Elementary, 14030 Weddington Street</li>
                <li>Kester Avenue Elementary, 5353 Kester Avenue (serves some Sherman Oaks addresses)</li>
                <li>Millikan Middle School (performing arts magnet) and Louis Armstrong Middle School</li>
                <li>High schools by address: portions of Sherman Oaks, including Magnolia Woods, are zoned to Van Nuys High, while others are zoned to Grant High</li>
                <li>Private options in and near Sherman Oaks include The Buckley School, Notre Dame High School, St. Francis de Sales and several faith-based day schools</li>
              </ul>
            </div>
            <div className="lcn-prose">
              <h3 className="lcn-h3">Parks in Sherman Oaks</h3>
              <p>
                Van Nuys/Sherman Oaks Park and War Memorial Park (the recreation center and pool are at 14201 Huston
                Street) is the neighborhood’s main open space, with a running track, courts and playgrounds. Sherman
                Oaks Castle Park, at 4989 Sepulveda Boulevard, has an arcade, batting cages and miniature golf. For
                trails, Dixie Canyon Park offers a woodland loop with valley views, and Ernie’s Walk follows the LA
                River on the north side.
              </p>
              <h3 className="lcn-h3">Dining, Errands and Everyday Life</h3>
              <p>
                Ventura Boulevard carries Sherman Oaks’ restaurants, cafés and services, and Westfield Fashion Square
                is the main mall. Seasonal farmers markets run at Fashion Square and on Riverside Drive; check current
                days and hours before you go. Magnolia and Burbank boulevards add neighborhood shopping on the flats.
              </p>
              <h3 className="lcn-h3">Getting Around</h3>
              <p>
                The 101 and 405 meet here, which makes Sherman Oaks one of the easier Valley neighborhoods to reach
                from Burbank, downtown and the Westside. Coldwater Canyon Avenue and Beverly Glen Boulevard offer ways
                over the hills when the 405 backs up. Test any address at rush hour and at a quiet time before making
                an offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. WHY ANDREW */}
      <section className="lcn-section lcn-why" id="why-andrew">
        <div className="container">
          <div className="lcn-head lcn-head-center">
            <p className="lcn-eyebrow">Why Andrew</p>
            <h2 className="lcn-title">
              Why Work With Andrew, Among <em>Real Estate Agents in Sherman Oaks</em>
            </h2>
            <p className="lcn-sub">
              If you’re comparing real estate agents in Sherman Oaks, ask each one how they price a condo and how they
              price a hillside house, and whether they read HOA documents before an offer. Here’s how I work.
            </p>
          </div>
          <div className="lcn-why-grid">
            {WHY_POINTS.map(({ Icon, title, text }) => (
              <div className="lcn-why-card" key={title}>
                <span className="lcn-why-icon">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="lcn-ctas lcn-why-ctas">
            <a href="/contact" className="lcn-btn lcn-btn-light">
              Schedule a Consultation
            </a>
            <Link href="/team/andrew-liberty" className="lcn-btn lcn-btn-outline-light">
              Meet Andrew
            </Link>
          </div>
          <p className="lcn-why-license">
            Andrew Ruric Liberty II · CA DRE# 01965696 | Compass California, Inc. · CA DRE# 01991628
          </p>
        </div>
      </section>

      <section className="lcn-section lcn-ivory" id="process">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Process</p>
            <h2 className="lcn-title">How It Works</h2>
          </div>
          <ol className="lcn-process">
            {PROCESS.map(([t, d], i) => (
              <li key={t}>
                <span className="lcn-num">{pad(i)}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 12. CLIENT PROOF */}
      <section className="lcn-section lcn-stone" id="testimonials">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Client Proof</p>
            <h2 className="lcn-title">What Sherman Oaks Clients Say</h2>
          </div>
          <div className="lcn-grid-2">
            {QUOTES.map((q) => (
              <figure key={q} className="lcn-card lcn-quote">
                <blockquote>“{q}”</blockquote>
                <figcaption>Verified Client · Buyer</figcaption>
              </figure>
            ))}
          </div>
          <div className="lcn-after">
            <Link href="/testimonials" className="lcn-btn lcn-btn-outline">
              View All Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* 13. FAQ: every answer open in the HTML, grouped */}
      <section className="lcn-section lcn-ivory" id="faq">
        <div className="container lcn-aside-layout">
          <div className="lcn-aside">
            <p className="lcn-eyebrow">Common Questions</p>
            <h2 className="lcn-title">Sherman Oaks Real Estate FAQ</h2>
          </div>
          <div>
            {FAQ_GROUPS.map((g) => (
              <div key={g.title} className="lcn-faq-group">
                <p className="lcn-tag">{g.title}</p>
                <div className="lcn-qa lcn-faq">
                  {g.items.map((f) => (
                    <div key={f.q}>
                      <h3>{f.q}</h3>
                      <p>{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. NEARBY + FINAL CTA */}
      <section className="lcn-section lcn-stone" id="nearby">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Nearby</p>
            <h2 className="lcn-title">Explore Nearby Neighborhoods</h2>
          </div>
          <div className="lcn-grid-4">
            {NEARBY.map(([name, text, href]) => (
              <Link key={href} href={href} className="lcn-card lcn-card-accent lcn-start-card">
                <h3>{name}</h3>
                <p>{text}</p>
                <span className="lcn-card-link">
                  View guide <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
          <p className="lcn-note">
            Related reading: <Link href="/blog/studio-city-vs-sherman-oaks">Studio City vs Sherman Oaks</Link> ·{" "}
            <Link href="/blog/how-to-buy-a-house-in-los-angeles">How to buy a house in Los Angeles</Link> ·{" "}
            <Link href="/blog/selling-a-house-in-los-angeles">Selling a house in Los Angeles</Link>
          </p>
        </div>
      </section>

      <section className="lcn-section lcn-ivory lcn-final-wrap">
        <div className="container">
          <div className="lcn-final">
            <div>
              <p className="lcn-eyebrow">Next Step</p>
              <h2 className="lcn-title">Ready to Buy or Sell in Sherman Oaks?</h2>
              <p className="lcn-sub">
                Tell me which type of home you’re considering, your timing and the streets you like. I’ll show you
                what the Sherman Oaks market means for you. Free consultation, no pressure.
              </p>
            </div>
            <div className="lcn-ctas">
              <Link href={mlsAreaUrl("sherman-oaks")} className="lcn-btn lcn-btn-light">
                Browse Sherman Oaks Homes
              </Link>
              <Link href="/home-valuation" className="lcn-btn lcn-btn-outline-light">
                Get Your Home Value
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
