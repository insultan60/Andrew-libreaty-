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
 * Valley Village neighbourhood guide, rebuilt on the November 2026 content
 * brief: "three ways in" (condo/townhome, house, multifamily), the Valley
 * Village Specific Plan, a full 91607 ZIP block, Valley Village Park, a dated
 * market table and an open grouped FAQ.
 */

const PATH = "/real-estate-agent-in-valley-village";
const AREA_SEARCH = mlsAreaUrl("valley-village");
const HERO = "/images/valley-village-hero.jpg";
const UPDATED = "November 21, 2026";

const TITLE = "Valley Village Real Estate Agent | Homes & Condos for Sale";
const OG_TITLE = "Real Estate Agent in Valley Village | Andrew Liberty";
const DESCRIPTION =
  "Andrew Liberty is a Valley Village real estate agent. See homes, condos and townhomes for sale, ZIP 91607 prices, schools and parks. Book a free consult.";

const svg = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
const IcGrid = () => <svg {...svg}><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" /></svg>;
const IcDoc = () => <svg {...svg}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h6" /></svg>;
const IcPin = () => <svg {...svg}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>;

const WHY_POINTS = [
  { Icon: IcGrid, title: "Three markets, one agent", text: "I work with condo buyers, house buyers and investors, and I price each from its own set of sales." },
  { Icon: IcDoc, title: "Reading the rules", text: "My commercial real estate background means I check zoning, the Specific Plan, rent-control status, reserve studies and permits before they surprise you." },
  { Icon: IcPin, title: "A Studio City neighbor", text: "My office at 12001 Ventura Place is a few minutes south, so I know how Valley Village compares with its neighbors." },
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
    images: [{ url: HERO, alt: "Tree-lined residential street in Valley Village" }],
  },
  twitter: { card: "summary_large_image", title: OG_TITLE, description: DESCRIPTION, images: [HERO] },
};

/* The listings are rendered from the server-side IDX feed, cached for six hours
   in lib/idxServer.ts; the page follows the same cadence. */
export const revalidate = 21600;

const START = [
  { tag: "Buying", title: "Buying in Valley Village", body: "Condos have sold from roughly $400,000 for a small unit to about $680,000 for a larger two-bedroom, while houses typically sell above $1 million. I help you choose a type, then a street, then a price you can defend.", cta: "Browse Valley Village homes", href: AREA_SEARCH },
  { tag: "Selling", title: "Selling in Valley Village", body: "Median sale prices have moved around in 2026, and inventory has grown, so pricing against the right comparables matters. I start with a free valuation.", cta: "Get your home value", href: "/home-valuation" },
  { tag: "Investing", title: "Investing in Valley Village", body: "Duplexes and small apartment buildings sell for about $1.6 million in recent examples. I run rents, rent-control status and the Specific Plan limits before we discuss price.", cta: "Explore opportunities", href: "/contact" },
];

const GLANCE = [
  ["Boundaries", "Burbank Boulevard to the north, the Tujunga Wash to the west, the Ventura Freeway (101) to the south and the Hollywood Freeway (170) to the east, per the Valley Village Neighborhood Council."],
  ["ZIP code", "91607 for most of the neighborhood, with some edge addresses in neighboring ZIP codes."],
  ["Main streets", "North–south: Whitsett Avenue, Laurel Canyon Boulevard and Colfax Avenue. East–west: Chandler Boulevard, Magnolia Boulevard and Riverside Drive."],
  ["Character", "Quiet residential streets, with commercial and multifamily zoning along the main boulevards."],
  ["Housing", "Single-family houses from the 1930s to the 1950s, condo and townhome buildings, duplexes and apartment buildings."],
  ["Local government", "Los Angeles City Council District 2 and the Valley Village Neighborhood Council."],
  ["Neighbors", "Studio City, Sherman Oaks, North Hollywood and the NoHo Arts District."],
];

const ZIPS: [string, string, React.ReactNode][] = [
  ["91607", "Core Valley Village", "Redfin median sale price $1,257,500, up 1.7% year over year, about 54 days to sell (Feb. 2026)"],
  ["91601, 91602", "North and east edges, shared with North Hollywood and Studio City", "Ask me for current sales"],
  ["91604", "Southern edge toward Studio City", <Link key="sc" href="/real-estate-agent-in-studio-city">See my Studio City page</Link>],
  ["91401, 91423", "Western edge across the Tujunga Wash", <Link key="so" href="/real-estate-agent-in-sherman-oaks">See my Sherman Oaks page</Link>],
];

const MARKET: [string, string, string][] = [
  ["Median sale price, Valley Village (all home types)", "About $1.2 million (June 2026: $1,228,573, down 6.4% year over year; about $640 per sq ft)", "Redfin, June–Aug. 2026"],
  ["Median sale price, ZIP 91607", "$1,257,500, up 1.7%; about $625 per sq ft; about 54 days to sell (72 a year earlier); 40 homes sold", "Redfin, February 2026"],
  ["Median sale price, ZIP 91607", "$1,359,900; about 42 days on market; 85 active listings", "Movoto, April 2026"],
  ["Median listing price vs. sold price", "Listing about $1.3 million, sold about $1.1 million (down 15.6% year over year)", "RealtyTrac, October 2026"],
  ["Inventory", "About 291 homes for sale, up from about 156 a year earlier; about 185 homes sold in 12 months", "RealtyTrac, October 2026"],
  ["Time to sell", "About 56 days in June 2026 (18 more than a year earlier); most listings in 91607 stay about 73 days", "Redfin, 2026"],
  ["Condo examples", "$400,000 (about 550 sq ft, April 2026); $679,000 (about 1,600 sq ft, Aug. 2025)", "Public records"],
  ["Multifamily examples", "$1,645,000 (about 5,700 sq ft, Aug. 2026); $1,650,000 (about 5,400 sq ft, Aug. 2025)", "Public records"],
];

const POCKETS = [
  ["Laurel Canyon Boulevard and Burbank Boulevard", "The neighborhood’s north-south commercial spine, with shops, services and many of its condo buildings. The sign at Burbank and Laurel Canyon marks the neighborhood’s northern gateway."],
  ["Magnolia Boulevard", "The east-west main street through the neighborhood’s center, with restaurants, services and a local market. Homes nearby are convenient and a bit noisier."],
  ["Chandler and Riverside", "Mixed-use and multifamily streets that run along the neighborhood’s northern and southern edges, with condos, townhomes and apartment buildings next to single-family blocks."],
  ["The residential interior", "Quiet side streets lined with older single-family homes from the 1930s to the 1950s and a growing number of rebuilds. Most of the neighborhood’s houses are here."],
];

const PROCESS = [
  ["First conversation", "We talk through your goals, timing, budget and type of property."],
  ["Choose your path", "Condo, house or multifamily, and which streets fit."],
  ["Search or price", "A short list that fits, or a price built on your block’s or building’s sales."],
  ["Diligence", "Documents, permits, inspections and, for investors, rents and rent-control status."],
  ["Offer and negotiation", "I protect your price, repairs and terms."],
  ["Closing and after", "Escrow stays on schedule, and I’m available for advice later."],
];

const FAQ_GROUPS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Choosing an Agent",
    items: [
      { q: "How do I choose a real estate agent in Valley Village?", a: "Match the agent to the type of property. Valley Village has condos, houses and multifamily buildings, so ask whether the agent reads HOA documents and rent rolls, how they price each type, and for recent sales that match yours. Check licenses and reviews, and meet at least two agents." },
    ],
  },
  {
    title: "The Area",
    items: [
      { q: "What is the ZIP code for Valley Village?", a: "Most of Valley Village uses ZIP code 91607. Some edge addresses carry neighboring ZIP codes, so confirm the exact address before searching by ZIP or pulling comparable sales." },
      { q: "Where are the boundaries of Valley Village, and is it in LA?", a: "It is a neighborhood in the City of Los Angeles, in the San Fernando Valley, bounded by Burbank Boulevard on the north, the Tujunga Wash on the west, the 101 on the south and the 170 on the east, according to the Valley Village Neighborhood Council." },
      { q: "Is Valley Village a good place to live?", a: "It suits people who want a quiet, low-rise residential neighborhood close to Studio City, Sherman Oaks, North Hollywood and the freeways, and who don’t mind a car-oriented routine. Visit at different times of day and test the commute before deciding." },
      { q: "Is Valley Village safe?", a: "Safety varies by block, so I recommend checking the LAPD’s public crime data for the specific address and visiting at different times of day. I’m happy to share what I’ve seen working with clients here." },
      { q: "How does Valley Village compare with Studio City and North Hollywood?", a: "Valley Village typically trades at a lower price point than Studio City, with more condos and multifamily, and is quieter and more residential than much of North Hollywood. It sits between the two, close to both." },
      { q: "Which schools and parks serve Valley Village?", a: "It depends on the address. Colfax Charter Elementary and Burbank Boulevard Elementary are two public elementary schools in the neighborhood, and the area has several private schools. Valley Village Park is the neighborhood’s park, with larger parks nearby. Verify school assignment with LAUSD before an offer." },
    ],
  },
  {
    title: "Buying",
    items: [
      { q: "How much do homes cost in Valley Village?", a: "Recent medians have ranged from about $1.1 to $1.4 million depending on the source and window, with condos well below that and rebuilds above it. See the Market Snapshot above for each figure and its source." },
      { q: "How much do condos and townhomes cost in Valley Village?", a: "Recent examples include a small studio condo that sold for $400,000 and a two-bedroom of about 1,600 square feet that sold for $679,000. Compare monthly dues, reserves and rental rules along with the price." },
      { q: "What is the Valley Village Specific Plan, and does it affect me?", a: "It’s the city plan, adopted in 1993, that sets development rules for the neighborhood, including limits on height and commercial uses such as drive-thrus. It matters most if you’re building, adding on or buying an income property, so I check it before an offer." },
      { q: "Are there duplexes and apartment buildings for sale in Valley Village?", a: "Yes, though not often. Recent multifamily sales were around $1.65 million. I check rent-control status, actual rents and expenses, and the Specific Plan before discussing price." },
    ],
  },
  {
    title: "Selling",
    items: [
      { q: "How long does it take to sell a home in Valley Village, and how do condos differ?", a: "Recent data shows roughly 42 to 73 days depending on the source, and inventory has grown, so pricing and presentation matter. Condo sales also depend on how ready the building documents are, so I help sellers gather the budget, reserve study and CC&Rs before listing." },
    ],
  },
];
const FAQS = FAQ_GROUPS.flatMap((g) => g.items);

const NEARBY = [
  ["Studio City", "Village streets and hillside pockets just south", "/real-estate-agent-in-studio-city"],
  ["Sherman Oaks", "Condos, flats and hills to the west", "/real-estate-agent-in-sherman-oaks"],
  ["Laurel Canyon", "Wooded canyon living over the ridge", "/real-estate-agent-in-laurel-canyon"],
  ["Hollywood Hills", "View homes and canyon streets", "/real-estate-agent-in-hollywood-hills"],
];

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function ValleyVillagePage() {
  const listings = await fetchRawListingsServer();
  // Section 5 shows Andrew's Valley Village closings when he has them,
  // otherwise nearby Studio City and Sherman Oaks sales, each labelled.
  const hasLocalSold = (listings ?? []).some((raw) => inArea(raw, "valley-village") && toPropertyItem(raw).badge === "Sold");

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
                { "@type": "ListItem", position: 3, name: "Valley Village", item: abs(PATH) },
              ],
            },
            {
              "@type": "WebPage",
              "@id": `${abs(PATH)}#webpage`,
              url: abs(PATH),
              name: OG_TITLE,
              description: DESCRIPTION,
              primaryImageOfPage: abs(HERO),
              isPartOf: { "@type": "CollectionPage", "@id": `${abs("/neighborhoods")}#webpage`, url: abs("/neighborhoods") },
              mainEntity: {
                "@type": "Service",
                "@id": `${abs(PATH)}#service`,
                name: "Real Estate Agent Services in Valley Village",
                serviceType: "Real estate agent",
                description: "Buying, selling and investment guidance for Valley Village condos, townhomes, houses and small multifamily buildings, each priced from its own sales.",
                provider: { "@id": `${SITE_URL}/#agent` },
                areaServed: {
                  "@type": "Place",
                  "@id": `${abs(PATH)}#place`,
                  name: "Valley Village",
                  description: "A low-rise residential neighborhood of Los Angeles in the San Fernando Valley, bounded by Burbank Boulevard, the Tujunga Wash, the 101 and the 170.",
                  image: abs(HERO),
                  address: { "@type": "PostalAddress", addressLocality: "Valley Village", addressRegion: "CA", postalCode: "91607", addressCountry: "US" },
                  containedInPlace: { "@type": "City", name: "Los Angeles" },
                  sameAs: "https://en.wikipedia.org/wiki/Valley_Village,_Los_Angeles",
                },
              },
            },
            {
              "@type": ["RealEstateAgent", "LocalBusiness"],
              "@id": `${abs(PATH)}#office`,
              name: "Andrew Liberty, Compass",
              url: abs(PATH),
              telephone: "+1-310-709-0581",
              image: abs(HERO),
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
      <section className="lcn-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="lcn-hero-bg" src={HERO} alt="" aria-hidden="true" fetchPriority="high" />
        <div className="container lcn-hero-inner">
          <nav className="lcn-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/neighborhoods">Neighborhoods</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Valley Village</span>
          </nav>
          <p className="lcn-eyebrow">Valley Village, Los Angeles</p>
          <h1 className="lcn-hero-title">
            Real Estate Agent in Valley Village <em>Condos, ranch homes and small multifamily, in one low-rise neighborhood</em>
          </h1>
          <p className="lcn-hero-sub">
            Valley Village is a small neighborhood with a big range of homes: a condo near Burbank Boulevard, a 1940s
            ranch on a tree-lined street, and a fourplex that pencils out as an investment. I’m Andrew Liberty, and I
            work from Studio City, a few minutes south across the 101. I help you pick the right path into Valley
            Village first, then price it using sales from your own block or building.
          </p>
          <div className="lcn-ctas">
            <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-light">
              Browse Valley Village Homes
            </Link>
            <Link href="/home-valuation" className="lcn-btn lcn-btn-outline-light">
              Get Your Home Value
            </Link>
          </div>
        </div>
      </section>

      {/* 2. LOCAL INTRO, PROOF ROW, BUY / SELL / INVEST */}
      <section className="lcn-section lcn-ivory" id="intro">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Your Local Agent</p>
            <h2 className="lcn-title">Valley Village Real Estate: Three Ways In</h2>
            <p className="lcn-sub">
              Valley Village sits between Studio City, Sherman Oaks and North Hollywood, bounded by Burbank Boulevard
              on the north, the Tujunga Wash on the west, the Ventura Freeway (101) on the south and the Hollywood
              Freeway (170) on the east. Inside that box are three very different ways to buy, and Valley Village real
              estate behaves differently in each:
            </p>
            <ul className="lcn-list lcn-sub">
              <li><strong>Condos and townhomes</strong> for buyers who want the lowest entry point and the lowest upkeep.</li>
              <li><strong>Single-family houses</strong>, mostly ranch, Spanish and traditional homes from the 1930s to the 1950s, with a growing number of rebuilds.</li>
              <li><strong>Small multifamily</strong>, from duplexes to apartment buildings, for investors.</li>
            </ul>
            <p className="lcn-sub">
              The neighborhood also has its own rulebook. The Valley Village Specific Plan, adopted in 1993 after the
              City Council started it in 1986, sets limits on height and commercial uses. That’s part of why the area
              still feels like a low-rise neighborhood, and it matters for anyone planning to build or invest. I
              started in commercial real estate, so I read zoning, documents and numbers alongside the house itself.
            </p>
          </div>
          <ul className="lcn-proof-row">
            <li>Office at 12001 Ventura Place, just south across the 101</li>
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

      {/* 3. AT A GLANCE + ZIP BLOCK */}
      <section className="lcn-section lcn-stone" id="glance">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Orientation</p>
            <h2 className="lcn-title">Valley Village at a Glance</h2>
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
            <h3 className="lcn-h3">Valley Village ZIP Code</h3>
            <p className="lcn-sub">
              Most of the neighborhood uses ZIP code 91607, which is what people mean when they search for the Valley
              Village ZIP code. Some blocks near the edges carry neighboring ZIP codes, toward North Hollywood, Studio
              City, Van Nuys and Sherman Oaks. That matters when you’re pulling comparable sales, because ZIP-level
              statistics can include homes that aren’t in Valley Village at all.
            </p>
          </div>
          <div className="lcn-table-wrap">
            <table className="lcn-table">
              <thead>
                <tr>
                  <th scope="col">ZIP</th>
                  <th scope="col">Role</th>
                  <th scope="col">Recent market signal</th>
                </tr>
              </thead>
              <tbody>
                {ZIPS.map(([z, r, m]) => (
                  <tr key={z}>
                    <th scope="row">{z}</th>
                    <td data-label="Role">{r}</td>
                    <td data-label="Market">{m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lcn-prose lcn-after">
            <h3 className="lcn-h3">Is Valley Village in LA?</h3>
            <p>
              Yes. Valley Village is a neighborhood in the City of Los Angeles, in the San Fernando Valley. Some listing
              sites label addresses &ldquo;Valley Village,&rdquo; &ldquo;North Hollywood&rdquo; or simply &ldquo;Los
              Angeles,&rdquo; and all can be correct.
            </p>
          </div>
        </div>
      </section>

      {/* 4. HOMES FOR SALE (Valley Village only, no fallback) */}
      <section className="lcn-section lcn-ivory" id="listings">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Listings</p>
            <h2 className="lcn-title">Homes for Sale in Valley Village, CA</h2>
            <p className="lcn-sub">
              Browse Valley Village homes for sale from my MLS feed, including houses for sale in Valley Village,
              condos, townhomes and small multifamily buildings, each with price, beds, baths and square footage. If
              one catches your eye, I’ll set up a showing and give you the sales that support or challenge the asking
              price.
            </p>
          </div>
          <AreaListings
            initialListings={listings}
            area="valley-village"
            place="Valley Village"
            only="sale"
            fallback={false}
            emptyText="I don’t have an active Valley Village listing right now. Search every Valley Village listing on the MLS, or ask me to send you new homes as they come to market."
          />
        </div>
      </section>

      {/* 5. RECENTLY SOLD */}
      <section className="lcn-section lcn-stone" id="sold">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Recently Sold</p>
            <h2 className="lcn-title">Recently Sold in Valley Village</h2>
            <p className="lcn-sub">
              {hasLocalSold
                ? "Sold prices show what buyers actually paid, which matters more than asking prices when you’re setting a budget or an offer. Here are recent closings from my Valley Village clients."
                : "Sold prices show what buyers actually paid. Below are recent sales I’ve closed in nearby Studio City and Sherman Oaks, which draw many of the same buyers. I can send you recent Valley Village sales matched to your street or building."}
            </p>
          </div>
          {hasLocalSold ? (
            <AreaListings initialListings={listings} area="valley-village" place="Valley Village" only="sold" fallback={false} searchLabel="View Sold Homes" />
          ) : (
            <>
              <AreaListings initialListings={listings} area="studio-city" place="Studio City" only="sold" fallback={false} max={3} searchLabel="View Sold Studio City Homes" />
              <AreaListings initialListings={listings} area="sherman-oaks" place="Sherman Oaks" only="sold" fallback={false} max={3} searchLabel="View Sold Sherman Oaks Homes" />
            </>
          )}
        </div>
      </section>

      {/* 6. BUYING BY HOME TYPE */}
      <section className="lcn-section lcn-ivory" id="buying">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Buying</p>
            <h2 className="lcn-title">Condos, Townhomes, Houses and Multifamily in Valley Village</h2>
            <p className="lcn-sub">
              Valley Village offers three different purchases under one name. Each has its own price range, its own
              paperwork and its own kind of buyer, so I choose the type first and the street second.
            </p>
          </div>
          <div className="lcn-split">
            <div className="lcn-prose">
              <h3 className="lcn-h3">Valley Village Condos for Sale</h3>
              <p>
                Valley Village condos for sale cluster along and near the main streets, including Laurel Canyon
                Boulevard, Burbank Boulevard, Chandler Boulevard and Riverside Drive. Many buildings date to the 1970s
                and 1980s, so the building’s age and maintenance history matter as much as the unit.
              </p>
              <p>
                Recent sales show the range. A small studio condo of about 550 square feet sold for $400,000 in April
                2026, and a two-bedroom condo of roughly 1,600 square feet sold for $679,000 in August 2025 (public
                records).
              </p>
              <p>
                With any condo or condominium purchase, I read the budget and reserve study, the CC&amp;Rs and recent
                meeting minutes. In Valley Village I also check the rental rules and parking assignments, because many
                buyers are investors or commuters and those rules affect both your lifestyle and resale. For more, see
                my guide to <Link href="/blog/buying-a-condo-in-los-angeles">buying a condo in Los Angeles</Link>.
              </p>
              <h3 className="lcn-h3">Townhomes in Valley Village</h3>
              <p>
                Townhomes sit between condos and houses, with more interior space and often a private entrance and
                garage. They’re a smaller share of the market, so a good townhome for sale in Valley Village can
                attract competition. I check how ownership and exterior maintenance are structured, and compare with
                both nearby condos and small houses.
              </p>
            </div>
            <div className="lcn-prose">
              <h3 className="lcn-h3">Valley Village Houses for Sale</h3>
              <p>
                Most single-family homes in Valley Village are 1930s to 1950s ranch, Spanish and traditional houses on
                regular residential lots, with a growing number of rebuilds. Recent medians for all homes have run
                around $1.1 to $1.4 million, with original houses at the lower end, updated homes above that, and new
                construction at the top of the range.
              </p>
              <h3 className="lcn-h3">Ranch Homes and Single-Family Character</h3>
              <p>
                Ranch-style homes from the 1940s and 1950s are the neighborhood’s backbone. They’re popular with buyers
                who want a yard and a classic Valley layout, and with owners planning updates or additions. I check the
                age of the roof, electrical and plumbing, the sewer line and permit history before an offer.
              </p>
              <h3 className="lcn-h3">Multifamily: Duplexes and Apartment Buildings</h3>
              <p>
                Investors searching for a duplex or an apartment building for sale in Valley Village will find them
                mainly along the boulevards. Recent examples include an eight-bedroom multifamily property of about
                5,400 square feet that sold for $1,650,000 in August 2025 and a similar property of about 5,700 square
                feet that sold for $1,645,000 in August 2026 (public records). Before discussing price, I check three
                things: rent-control status (buildings built before October 1978 are generally subject to the city’s
                rent stabilization ordinance), actual rents and expenses, and the Specific Plan’s limits on height and
                development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SELLING */}
      <section className="lcn-section lcn-stone" id="selling">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Selling</p>
            <h2 className="lcn-title">Selling a Home in Valley Village</h2>
            <p className="lcn-sub">
              Selling in Valley Village starts with deciding which market your home belongs to. A condo, a ranch house
              and a duplex each draw a different buyer and need a different set of comparable sales. I choose the
              right set first, set the price second, then plan preparation, marketing and offers.
            </p>
          </div>
          <div className="lcn-grid-3">
            <div className="lcn-card">
              <h3>Selling a Valley Village House</h3>
              <p>
                I compare your house with true matches: similar lot, size, age and condition, on similar streets. I
                tell you which updates are worth doing before listing and which aren’t, and I check permits and the
                sewer line early. If your home sits near a boulevard, I price the trade-off between convenience and
                noise honestly.
              </p>
            </div>
            <div className="lcn-card">
              <h3>Selling a Valley Village Condo or Townhome</h3>
              <p>
                Buyers study your building as closely as your unit. I price against recent sales in your own complex,
                gather the budget, reserve study, CC&amp;Rs and rental rules before you list, and prepare answers about
                dues and assessments.
              </p>
            </div>
            <div className="lcn-card">
              <h3>Selling a Duplex or Apartment Building</h3>
              <p>
                Buyers of multifamily properties focus on income. I help you assemble rent rolls, expenses and
                rent-control status in advance, and I price against recent income-property sales, not house comps.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lcn-section lcn-ivory" id="valuation">
        <div className="container lcn-split lcn-split-center">
          <div>
            <p className="lcn-eyebrow">Free &amp; Confidential</p>
            <h2 className="lcn-title">Get Your Free Valley Village Home Value</h2>
            <p className="lcn-sub">
              Share the address and I’ll review it personally against recent sales on your block or in your building.
              Free, confidential and no obligation.
            </p>
            <ul className="lcn-bullets">
              <li>Free and confidential</li>
              <li>Matched to your type of property</li>
              <li>Reviewed by Andrew himself</li>
            </ul>
          </div>
          <GuideValuationForm place="Valley Village" title="Get Your Free Valley Village Home Value" />
        </div>
      </section>

      {/* 8. MARKET SNAPSHOT (refresh monthly) */}
      <section className="lcn-section lcn-stone" id="market">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Market</p>
            <h2 className="lcn-title">Valley Village Real Estate Market</h2>
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
                {MARKET.map(([m, f, s], i) => (
                  <tr key={`${m}-${i}`}>
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
              Three things stand out. First, prices have eased: Redfin’s neighborhood median was down about 6% in June
              2026, and RealtyTrac shows the median sold price down about 16% over the year. Second, inventory has
              grown sharply, roughly doubling in RealtyTrac’s data, which gives buyers more choice and more room to
              negotiate. Third, time to sell has lengthened, from the 40s to the 50s and 70s depending on the source.
            </p>
            <p>
              The sources disagree because each measures a different area, window and mix. A median can swing when a
              few condos or a few large rebuilds sell in the same month, which is why I look at your type of property
              and your street.
            </p>
          </div>
          <div className="lcn-after">
            <Link href="/contact" className="lcn-btn lcn-btn-outline">
              Ask Me for a Valley Village Price Review
            </Link>
          </div>
        </div>
      </section>

      {/* 9. STREETS AND POCKETS */}
      <section className="lcn-section lcn-ivory" id="pockets">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Pockets</p>
            <h2 className="lcn-title">Valley Village Streets and Pockets</h2>
          </div>
          <div className="lcn-grid-2">
            {POCKETS.map(([name, text]) => (
              <div key={name} className="lcn-card">
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <p className="lcn-note">
            Toward Studio City, the southern edge near the 101 has its own feel and typically higher prices: see my{" "}
            <Link href="/real-estate-agent-in-studio-city">Studio City page</Link>. Toward Sherman Oaks, the western
            edge sits near the Tujunga Wash: see my <Link href="/real-estate-agent-in-sherman-oaks">Sherman Oaks page</Link>.
          </p>
        </div>
      </section>

      {/* 10. LIVING IN VALLEY VILLAGE */}
      <section className="lcn-section lcn-stone" id="daily-life">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Daily Life</p>
            <h2 className="lcn-title">Living in Valley Village: Schools, Parks and Daily Life</h2>
          </div>
          <div className="lcn-split">
            <div className="lcn-prose">
              <h3 className="lcn-h3">Valley Village Schools</h3>
              <p>
                Public school assignment depends on the exact address, so confirm it with LAUSD before an offer.
                Schools in or near the neighborhood include:
              </p>
              <ul className="lcn-list">
                <li>Colfax Charter Elementary (11724 Addison Street), an LAUSD charter school that families ask about often</li>
                <li>Burbank Boulevard Elementary (12215 Albers Street)</li>
                <li>Amelia Earhart continuation school (5355 Colfax Avenue)</li>
                <li>Private options include The Country School (5243 Laurel Canyon Boulevard), Campbell Hall (4533 Laurel Canyon Boulevard), Beth Hillel Day School (12326 Riverside Drive), Oakwood Secondary (11600 Magnolia Boulevard) and Valley Torah (12517 Chandler Boulevard)</li>
              </ul>
              <p>Middle and high school assignments vary by address.</p>
            </div>
            <div className="lcn-prose">
              <h3 className="lcn-h3">Valley Village Park</h3>
              <p>
                Valley Village Park, at 5000 Westpark Drive, is the neighborhood’s namesake park, with a play area,
                picnic space and walking paths. Larger parks, such as North Hollywood Park on Chandler Boulevard, are a
                short drive away.
              </p>
              <h3 className="lcn-h3">Dining, Errands and Everyday Life</h3>
              <p>
                Daily errands center on Magnolia, Laurel Canyon, Burbank and Chandler boulevards, and the NoHo Arts
                District is close by. The Valley Village Neighborhood Council organizes community events through the
                year. Hollywood Burbank Airport is a short drive away.
              </p>
              <h3 className="lcn-h3">Getting Around</h3>
              <p>
                The 101 runs along the south side and the 170 along the east, putting Hollywood, Burbank and the
                Westside within a short drive. Whitsett, Laurel Canyon and Colfax are the main north-south streets, and
                bus lines run along the main boulevards. The neighborhood is more car-oriented than pedestrian, though
                pockets along Laurel Canyon, Riverside and Magnolia are walkable.
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
              Why Work With Andrew, Your <em>Valley Village Realtor</em>
            </h2>
            <p className="lcn-sub">
              If you’re choosing a Valley Village realtor, ask whether they can handle condos, houses and multifamily
              equally, and whether they read HOA documents, rent rolls and zoning rules before you buy. Here’s how I
              work.
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
            <Link href="/contact" className="lcn-btn lcn-btn-light">
              Schedule a Consultation
            </Link>
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
          <div className="lcn-after">
            <Link href="/testimonials" className="lcn-btn lcn-btn-outline">
              Read Client Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* 13. FAQ: every answer open in the HTML, grouped */}
      <section className="lcn-section lcn-stone" id="faq">
        <div className="container lcn-aside-layout">
          <div className="lcn-aside">
            <p className="lcn-eyebrow">Common Questions</p>
            <h2 className="lcn-title">Valley Village Real Estate FAQ</h2>
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
      <section className="lcn-section lcn-ivory" id="nearby">
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
            Related reading: <Link href="/blog/buying-a-condo-in-los-angeles">Buying a condo in Los Angeles</Link> ·{" "}
            <Link href="/blog/real-estate-negotiation-tips-for-buyers">Real estate negotiation tips for buyers</Link> ·{" "}
            <Link href="/blog/house-hacking-in-los-angeles">House hacking in Los Angeles</Link>
          </p>
        </div>
      </section>

      <section className="lcn-section lcn-ivory lcn-final-wrap">
        <div className="container">
          <div className="lcn-final">
            <div>
              <p className="lcn-eyebrow">Next Step</p>
              <h2 className="lcn-title">Ready to Buy or Sell in Valley Village?</h2>
              <p className="lcn-sub">
                Tell me whether you’re looking at a condo, a house or an income property, your timing and the streets
                you like. I’ll show you what the Valley Village market means for your situation. Free consultation, no
                pressure.
              </p>
            </div>
            <div className="lcn-ctas">
              <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-light">
                Browse Valley Village Homes
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
