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
 * Hollywood Hills neighbourhood guide, rebuilt on the November 2026 content
 * brief: East vs. West price tiers, a hillside "four checks" buying guide,
 * architecture, ZIP table, dated market table and an open grouped FAQ.
 * Laurel Canyon and Mount Olympus live on the Laurel Canyon page.
 *
 * Hero photo: Venti Views on Unsplash (Unsplash License).
 */

const PATH = "/real-estate-agent-in-hollywood-hills";
const AREA_SEARCH = mlsAreaUrl("hollywood-hills");
const HERO = "/images/hollywood-hills-hero.jpg";
const UPDATED = "November 21, 2026";

const TITLE = "Hollywood Hills Real Estate Agent | Homes for Sale | Andrew Liberty";
const OG_TITLE = "Real Estate Agent in Hollywood Hills | Andrew Liberty";
const DESCRIPTION =
  "Andrew Liberty is a Hollywood Hills real estate agent. See homes for sale, current prices, hillside and fire-zone guidance, then book a free consult.";

const svg = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
const IcChart = () => <svg {...svg}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>;
const IcHills = () => <svg {...svg}><path d="m2 20 6.5-11 4 6.5L15.5 11 22 20z" /><circle cx="17" cy="5.5" r="1.8" /></svg>;
const IcShake = () => (
  <svg {...svg}><path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" /><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2.8 2.8 0 0 0-4 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a4.8 4.8 0 0 1 5.7-.8l.5.3a3 3 0 0 0 2 .4H21" /><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1.4 1.4 0 0 0 2-2M3 4h8" /></svg>
);

const WHY_POINTS = [
  { Icon: IcChart, title: "Math on unusual properties", text: "My commercial real estate background means I price properties that don’t fit a formula and show you the evidence behind the number." },
  { Icon: IcHills, title: "Hillside homework before offers", text: "Fire zone, insurance quote, road access, permits and slope are part of every hillside search, not an afterthought." },
  { Icon: IcShake, title: "Negotiating from evidence", text: "I’m a Certified Real Estate Negotiation Expert, and I use that training on price, repairs and terms." },
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
    images: [{ url: HERO, alt: "Hillside homes in the Hollywood Hills" }],
  },
  twitter: { card: "summary_large_image", title: OG_TITLE, description: DESCRIPTION, images: [HERO] },
};

/* The listings are rendered from the server-side IDX feed, cached for six hours
   in lib/idxServer.ts; the page follows the same cadence. */
export const revalidate = 21600;

const START = [
  {
    tag: "Buying",
    title: "Buying in the Hollywood Hills",
    body: "The typical Hollywood Hills area sale ran about $1.8 million in the three months to October 2026 (Redfin). I help you find the pockets that fit your budget, then run the road, slope and insurance checks before any offer.",
    cta: "Browse Hollywood Hills homes",
    href: AREA_SEARCH,
  },
  {
    tag: "Selling",
    title: "Selling in the Hollywood Hills",
    body: "Homes in 90068 sold for close to list price in mid-2026, but view homes can take far longer to sell than flat-street homes. I build the price from the closest hillside sales and show you the range.",
    cta: "Get your home value",
    href: "/home-valuation",
  },
  {
    tag: "Investing",
    title: "Investing in the Hollywood Hills",
    body: "Teardowns, lots and rebuilds depend on hillside rules that cap how much earth you can move. I run permits, costs and resale value first.",
    cta: "Explore opportunities",
    href: "/contact",
  },
];

const GLANCE = [
  ["Location", "Above Hollywood, along the Santa Monica Mountains between the Cahuenga Pass and the Sunset Strip, inside the City of Los Angeles."],
  ["ZIP codes", "90068 for most of the Hills, with parts of 90046, 90069 and 90028 (see below)."],
  ["Main roads", "Mulholland Drive on the ridge; Beachwood Drive, Nichols Canyon Road and Outpost Drive up the canyons; Franklin Avenue, Sunset Boulevard and Cahuenga Boulevard below; US 101 through the pass."],
  ["Landmarks", "The Hollywood Sign, the Hollywood Bowl, the Lake Hollywood Reservoir, Runyon Canyon and Griffith Park."],
  ["Housing", "Single-family houses from 1920s cottages to contemporary glass homes, plus condos near the pass and apartments along lower Beachwood."],
  ["Neighbors", "Studio City and Universal City over the pass, Los Feliz, Hollywood, the Sunset Strip, and Laurel Canyon, which has its own page."],
];

const ZIPS = [
  ["90068", "Most of the Hills: Beachwood Canyon, Hollywoodland, Lake Hollywood, Hollywood Dell and the Cahuenga Pass", "About $1.83–$1.9 million (Redfin, 3 months to Aug.–Sept. 2026)"],
  ["90046", "Western edge of the Hills, including Laurel Canyon (see the Laurel Canyon page)", "Ask me for current sales"],
  ["90069", "The Sunset Strip side, including the Bird Streets and Sunset Plaza", "Ask me for current sales"],
  ["90028", "Pockets near Hollywood, such as Whitley Heights and Hollywood Heights", "Ask me for current sales"],
];

const CHECKS = [
  ["1. Fire and insurance", "Fire hazard zone, defensible space, roof and vent type, and an actual insurance quote", "Many legacy insurers paused new policies in very high fire hazard zones, and the California FAIR Plan has grown fast, from about 205,000 dwelling policies in fiscal 2020 to about 621,000 in fiscal 2025. Get a quote before you remove contingencies."],
  ["2. Geology and slope", "Soils or geology reports, retaining walls, drainage, signs of movement", "Repairs on a hillside can cost far more than the same repair on flat ground."],
  ["3. Access and parking", "Road width, driveway grade, guest parking, fire-truck and delivery access", "A beautiful home on a narrow road can be hard to insure, live in and resell."],
  ["4. Permits and grading", "Permit history for additions, decks and walls; the city’s hillside limits", "The Baseline Hillside Ordinance caps by-right grading at 1,000 cubic yards on R1-zoned lots. Unpermitted work can derail a sale."],
];

const MARKET: [string, string, string][] = [
  ["Median sale price, Hollywood Hills area, last 3 months", "$1.8 million, up 4.3% year over year; about $768 per sq ft, down 3.2%", "Redfin, October 2026"],
  ["Median sale price, ZIP 90068, last 3 months", "$1.9 million (August 2026: $1,862,500), up 2.1%; about $919 per sq ft", "Redfin, 3 months ending Aug. 2026"],
  ["Median sale price, ZIP 90068, month", "$1,828,213, up 14.3% year over year", "Redfin, September 2026"],
  ["Median sale price, Hollywood Hills West", "$2,140,976, down 9.7% year over year", "Redfin, October 2026"],
  ["Time to sell, ZIP 90068", "About 59 days on market (vs. 96 a year earlier); about 62 days to pending", "Redfin, 3 months ending Aug. 2026"],
  ["Time to sell, Hollywood Hills West", "About 118 days", "Redfin, March 2026"],
  ["Sale price vs. list price", "90068: about 99.3% of list (Aug. 2026); Hollywood Hills West: about 97.0% (Mar. 2026)", "Redfin"],
  ["Range of recent closings, 90068", "From $850,000 (1-bedroom) to $4.25 million (4-bedroom), with sales both above and below list", "Redfin, November 2026"],
];

const EAST = [
  ["Beachwood Canyon and Hollywoodland", "The upper canyon is Hollywoodland, developed in 1923, with storybook and European-style homes and the Hollywood Sign above. Lower Beachwood is mostly apartments, but the side streets that climb into the hills are residential. Beachwood Village anchors daily errands."],
  ["Lake Hollywood, Hollywood Knolls and The Oaks", "Pockets around the Hollywood Reservoir, with lake and canyon views and a walking loop nearby. Below the reservoir dam sits Hollywood Dell, a quiet residential neighborhood east of the 101 and near the Hollywood Bowl."],
  ["Franklin Village and Bronson Canyon", "The flatter edge of the Hills, with cafés and shops on Franklin Avenue and quick access to Griffith Park. Many homes here date to the 1920s."],
];
const WEST = [
  ["Whitley Heights", "Developed around 1918 by H. J. Whitley as one of Hollywood’s first celebrity enclaves, with Mediterranean villas. It was added to the National Register of Historic Places in 1982, and residents are steps from the Hollywood Bowl."],
  ["Hollywood Heights and Outpost Estates", "Hollywood Heights sits between the Bowl, Highland Avenue, Franklin Avenue and Outpost Estates. Outpost Estates, developed in the 1920s by Charles Toberman and centered on Outpost Drive, is known for Spanish-style homes and sits just east of Runyon Canyon Park."],
  ["Nichols Canyon", "A narrow canyon, named for early Los Angeles mayor John G. Nichols, with creek-fed greenery and less development than its neighbors. Fire roads connect it to Runyon Canyon."],
  ["The Bird Streets, Sunset Plaza and Doheny Estates", "The Sunset Strip side of the Hills, with streets named for birds, modern architecture and views toward downtown and the ocean. This is the Hills’ highest-priced tier."],
];

const PROCESS = [
  ["First conversation", "Budget, timing, how much risk and maintenance you’re comfortable with."],
  ["Map the Hills", "We narrow down the East and West pockets that fit."],
  ["Tour and test", "We drive the roads, check the lots and view each home at different times."],
  ["Diligence", "Insurance quote, fire-zone check, geology and permit review."],
  ["Offer and negotiation", "I protect your price, repairs and terms."],
  ["Closing and beyond", "Escrow stays on schedule, and I stay available for advice afterward."],
];

/* Not the quotes used on the Studio City or Sherman Oaks pages. */
const QUOTES = [
  "My wife and I have a very high bar for anyone we work with, and without exception Andrew over-delivered when he helped us buy our first home. He understood our needs and thought creatively to find the right home in a competitive market.",
];

const FAQ_GROUPS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Choosing an Agent",
    items: [
      { q: "What should a Hollywood Hills real estate agent check before an offer?", a: "At minimum: the fire hazard zone and an insurance quote, the road width and parking, the slope and drainage, and the permit history. I also compare the home with sales on similar slopes, not with the whole neighborhood." },
      { q: "Do I need an agent who knows both Hollywood Hills East and West?", a: "It helps. The East side (Beachwood, Hollywoodland, Lake Hollywood) and the West side (the Bird Streets, Sunset Plaza, Nichols, Outpost) have different price tiers, roads and buyers, so comparisons from one don’t transfer well to the other." },
    ],
  },
  {
    title: "The Area",
    items: [
      { q: "Where are the Hollywood Hills, and what is the ZIP code?", a: "The Hollywood Hills sit above Hollywood, along the Santa Monica Mountains between the Cahuenga Pass and the Sunset Strip. The main ZIP code is 90068, with parts of 90046, 90069 and 90028. Laurel Canyon is on its own page." },
      { q: "Is Hollywood Hills a good place to live?", a: "It suits people who want privacy, views and trails minutes from Hollywood and the Valley, and who are comfortable with narrow roads, limited parking and fire-zone rules. Visit at different times of day, and test the commute, before deciding." },
      { q: "What is the difference between Hollywood Hills and Hollywood Hills West?", a: "Hollywood Hills West is the Sunset-side area, including the Bird Streets, Sunset Plaza, Nichols Canyon, Outpost Estates and Whitley Heights. It generally trades at a higher price tier and takes longer to sell. In October 2026 Redfin showed a median sale price of about $2.14 million there versus about $1.8 million for the broader Hollywood Hills area." },
      { q: "Which schools serve Hollywood Hills homes?", a: "It depends on the address. Cheremoya, Valley View, Selma Avenue and Gardner Street are among the elementary schools serving parts of the Hills, with Le Conte and Bancroft nearby for middle school and Hollywood High among the high schools. Verify the assignment with LAUSD before an offer." },
    ],
  },
  {
    title: "Buying",
    items: [
      { q: "How much do homes cost in Hollywood Hills?", a: "Redfin’s three-month median sale price was about $1.8 million for the Hollywood Hills area in October 2026 and about $1.9 million in ZIP 90068 through August 2026. Hollywood Hills West ran higher, near $2.1 million. Recent 90068 closings ranged from $850,000 to $4.25 million. See the Market Snapshot above for each figure and its source." },
      { q: "Are there condos for sale in the Hollywood Hills?", a: "Yes, though they’re a smaller share of the market, mostly near the Cahuenga Pass and Cahuenga Boulevard. A recent one-bedroom condo of about 695 square feet sold for $850,000, and a two-bedroom of about 1,300 square feet sold for $1.4 million. I review the building’s budget, reserves and rules before recommending an offer." },
      { q: "How hard is it to insure a Hollywood Hills home?", a: "It can be hard. Many legacy insurers paused new policies in very high fire hazard zones, and the California FAIR Plan has grown sharply, so many hillside buyers need a quote early. I recommend getting one before your contingencies end. Coverage and cost vary by street, roof, defensible space and the carrier." },
      { q: "What is the Baseline Hillside Ordinance, and does it affect me?", a: "It’s the city’s set of limits on building and grading on hillside lots, including a 1,000-cubic-yard cap on by-right grading for R1-zoned lots. It matters most if you plan to add on, rebuild or regrade, and I recommend checking the specific lot in the city’s ZIMAS tool before you buy." },
    ],
  },
  {
    title: "Selling",
    items: [
      { q: "How do I price a Hollywood Hills view?", a: "Start with the closest sales on similar slopes and view directions, then adjust for lot, condition, privacy and any special features. I show you the range and where the evidence is thin, so you can choose between pricing for speed or a higher number." },
      { q: "How long does it take to sell a home in the Hollywood Hills?", a: "It depends on the pocket and price tier. Redfin showed about 59 days on market in ZIP 90068 in mid-2026 and about 118 days in Hollywood Hills West in March. Pricing, condition and disclosure readiness drive where your home lands." },
    ],
  },
];
const FAQS = FAQ_GROUPS.flatMap((g) => g.items);

const NEARBY = [
  ["Laurel Canyon", "Wooded canyon living and Mount Olympus over the ridge", "/real-estate-agent-in-laurel-canyon"],
  ["Studio City", "Village streets and hillside pockets just over the pass", "/real-estate-agent-in-studio-city"],
  ["Sherman Oaks", "Condos, flats and hills in the Valley", "/real-estate-agent-in-sherman-oaks"],
  ["Valley Village", "Condos and ranch homes to the north", "/real-estate-agent-in-valley-village"],
];

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function HollywoodHillsPage() {
  const listings = await fetchRawListingsServer();
  // Section 5 shows Andrew's Hills closings when he has them, otherwise nearby
  // Laurel Canyon and Studio City sales, each labelled by area.
  const hasLocalSold = (listings ?? []).some((raw) => inArea(raw, "hollywood-hills") && toPropertyItem(raw).badge === "Sold");

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
                { "@type": "ListItem", position: 3, name: "Hollywood Hills", item: abs(PATH) },
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
                name: "Real Estate Agent Services in the Hollywood Hills",
                serviceType: "Real estate agent",
                description: "Buying, selling and investment guidance for Hollywood Hills homes and condos, with hillside fire, insurance, geology, access and permit checks.",
                provider: { "@id": `${SITE_URL}/#agent` },
                areaServed: {
                  "@type": "Place",
                  "@id": `${abs(PATH)}#place`,
                  name: "Hollywood Hills",
                  description: "Hillside neighborhoods above Hollywood in the Santa Monica Mountains, between the Cahuenga Pass and the Sunset Strip, City of Los Angeles.",
                  image: abs(HERO),
                  address: { "@type": "PostalAddress", addressLocality: "Los Angeles", addressRegion: "CA", postalCode: "90068", addressCountry: "US" },
                  containedInPlace: { "@type": "City", name: "Los Angeles" },
                  sameAs: "https://en.wikipedia.org/wiki/Hollywood_Hills",
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
            <span aria-current="page">Hollywood Hills</span>
          </nav>
          <p className="lcn-eyebrow">Hollywood Hills, Los Angeles</p>
          <h1 className="lcn-hero-title">
            Real Estate Agent in Hollywood Hills <em>Views, canyons and fire zones, checked house by house</em>
          </h1>
          <p className="lcn-hero-sub">
            In the Hollywood Hills, two homes with the same view can be worth very different amounts. One sits on a
            wide, legal road with a stable slope; the other has a steep driveway and a retaining wall nobody
            permitted. I’m Andrew Liberty, and I work out of Studio City, just over the Cahuenga Pass. I price the
            view and the risks together, so you know what a home is worth before you make an offer.
          </p>
          <div className="lcn-ctas">
            <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-light">
              Browse Hollywood Hills Homes
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
            <h2 className="lcn-title">Hollywood Hills Real Estate: Where the View Meets the Fine Print</h2>
            <p className="lcn-sub">
              Hollywood Hills real estate is not one market. The Hills are a chain of canyons and ridges between
              Studio City and Hollywood, and each pocket has its own roads, its own risks and its own buyers. Recent
              closings in ZIP 90068 alone ran from about $850,000 to $4.25 million (Redfin, November 2026). That
              spread is why I work from the home outward, not from a neighborhood average.
            </p>
            <p className="lcn-sub">
              I began in commercial real estate, where unusual properties are normal and every asset is judged on its
              documents and numbers. Hillside homes reward the same discipline, whether the question is a
              hard-to-compare luxury property, a condo near the Cahuenga Pass or a 1920s cottage in a canyon.
            </p>
          </div>
          <ul className="lcn-proof-row">
            <li>Office at 12001 Ventura Place, just over the pass</li>
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

      {/* 3. AT A GLANCE, ZIP CODES, EAST VS WEST */}
      <section className="lcn-section lcn-stone" id="glance">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Orientation</p>
            <h2 className="lcn-title">Hollywood Hills at a Glance</h2>
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
            <h3 className="lcn-h3">Hollywood Hills ZIP Codes</h3>
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
            Listing sites often label Hills addresses &ldquo;Hollywood&rdquo; or &ldquo;West Hollywood,&rdquo; so I
            confirm the exact address before I pull comparable sales.
          </p>

          <div className="lcn-prose lcn-after">
            <h3 className="lcn-h3">Hollywood Hills East vs. Hollywood Hills West</h3>
            <p>
              Buyers and data sources split the Hills in two, and the price tiers differ. East (Beachwood Canyon,
              Hollywoodland, Lake Hollywood, Hollywood Dell) leans toward canyon charm and historic homes. West (the
              Bird Streets, Sunset Plaza, Nichols Canyon, Outpost Estates, Whitley Heights, Hollywood Heights) leans
              toward views of the Strip and more high-end inventory. Redfin reports separate numbers for each:
              roughly $1.8 million for the Hollywood Hills area in October 2026, and about $2.1 million for Hollywood
              Hills West.
            </p>
          </div>
        </div>
      </section>

      {/* 4. HOMES FOR SALE (Hills only, no fallback) */}
      <section className="lcn-section lcn-ivory" id="listings">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Listings</p>
            <h2 className="lcn-title">Hollywood Hills Homes for Sale</h2>
            <p className="lcn-sub">
              Browse Hollywood Hills homes for sale from my MLS feed, from hillside houses and luxury homes to condos
              near the pass, each with price, beds, baths and square footage. If you’re looking at Hollywood Hills
              houses for sale, I’ll set up a showing and give you the sales that justify, or challenge, the asking
              price.
            </p>
          </div>
          <AreaListings
            initialListings={listings}
            area="hollywood-hills"
            place="Hollywood Hills"
            only="sale"
            fallback={false}
            emptyText="I don’t have an active Hollywood Hills listing right now. Search every Hollywood Hills listing on the MLS, or ask me to send you new Hills homes as they come to market."
          />
        </div>
      </section>

      {/* 5. RECENTLY SOLD */}
      <section className="lcn-section lcn-stone" id="sold">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Recently Sold</p>
            <h2 className="lcn-title">Recently Sold in and Near the Hollywood Hills</h2>
            <p className="lcn-sub">
              {hasLocalSold
                ? "Sold prices show what buyers actually paid, which matters more than asking prices when homes have few close comparables. Here are recent closings from my Hollywood Hills clients."
                : "Sold prices show what buyers actually paid. Below are recent sales I’ve closed in nearby Laurel Canyon and Studio City, which draw many of the same buyers. I can send you recent Hollywood Hills sales matched to your pocket and home type."}
            </p>
          </div>
          {hasLocalSold ? (
            <AreaListings initialListings={listings} area="hollywood-hills" place="Hollywood Hills" only="sold" fallback={false} searchLabel="View Sold Homes" />
          ) : (
            <>
              <AreaListings initialListings={listings} area="laurel-canyon" place="Laurel Canyon" only="sold" fallback={false} max={3} searchLabel="View Sold Laurel Canyon Homes" />
              <AreaListings initialListings={listings} area="studio-city" place="Studio City" only="sold" fallback={false} max={3} searchLabel="View Sold Studio City Homes" />
            </>
          )}
        </div>
      </section>

      {/* 6. BUYING BY HOME TYPE + FOUR CHECKS */}
      <section className="lcn-section lcn-ivory" id="buying">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Buying</p>
            <h2 className="lcn-title">Buying a Home in the Hollywood Hills</h2>
            <p className="lcn-sub">
              The right way to buy in the Hills is to choose a pocket and a home type first, then look at the
              property. After that, four checks matter more than the view.
            </p>
          </div>

          <div className="lcn-split">
            <div className="lcn-prose">
              <h3 className="lcn-h3">Houses for Sale in Hollywood Hills</h3>
              <p>
                Most buyers searching for houses for sale in Hollywood Hills want a hillside single-family home with a
                view. If you want to buy a house in Hollywood Hills, the lot and road matter as much as the interior:
                how wide the street is, whether you can park two cars, how steep the driveway is, and how far the
                nearest flat ground is. I compare each house with sales on similar slopes and view orientations, not
                with the whole neighborhood.
              </p>
              <h3 className="lcn-h3">Hollywood Hills Condos for Sale</h3>
              <p>
                Condos are a smaller part of the market, but they exist, especially near the Cahuenga Pass and
                Cahuenga Boulevard, including gated complexes with shared pools and tennis courts. Recent closings in
                90068 show how wide the range is, from a one-bedroom of about 695 square feet that sold for $850,000
                to a two-bedroom of about 1,300 square feet that sold for $1.4 million (Redfin, November 2026). For a
                condo I read the budget, reserves and CC&amp;Rs before recommending an offer.
              </p>
              <h3 className="lcn-h3">Luxury Real Estate in the Hollywood Hills</h3>
              <p>
                Hollywood Hills luxury real estate is priced by lot, view, privacy and architecture more than by
                square footage. The Bird Streets, Sunset Plaza and the Nichols Canyon and Outpost areas are where the
                highest-priced sales cluster, and a single sale there can move a monthly median. With few true
                comparables, I build the price from the closest sales, then adjust openly for view, lot and condition.
              </p>
            </div>
            <div className="lcn-prose">
              <h3 className="lcn-h3">Hollywood Hills Architecture and Modern Homes</h3>
              <p>The Hills read like an architecture timeline.</p>
              <ul className="lcn-list">
                <li><strong>Spanish Colonial Revival and Mediterranean (1910s–1920s):</strong> Whitley Heights and Outpost Estates, with stucco walls, clay tile roofs and arched doorways.</li>
                <li><strong>Storybook and European revival cottages (1920s):</strong> the Hollywoodland area of upper Beachwood Canyon.</li>
                <li><strong>Mid-century modern (1950s–60s):</strong> post-and-beam and glass-wall homes on ridge and canyon lots.</li>
                <li><strong>Contemporary glass and steel:</strong> new builds and complete rebuilds, many with views toward downtown or the ocean.</li>
              </ul>
              <p>
                If you’re searching for Hollywood Hills modern homes for sale, expect a premium for design, plus a
                closer look at permits, structure and any rebuild work.
              </p>
              <h3 className="lcn-h3">Investing in the Hollywood Hills</h3>
              <p>
                Small multifamily buildings are concentrated on the flats and lower streets, while lots and teardowns
                in the Hills depend on hillside rules and fire-zone requirements. I run rents, costs and permit risk
                before discussing price.
              </p>
            </div>
          </div>

          <h3 className="lcn-h3 lcn-table-title">The Four Checks Before Any Hillside Offer</h3>
          <div className="lcn-table-wrap">
            <table className="lcn-table">
              <thead>
                <tr>
                  <th scope="col">Check</th>
                  <th scope="col">What I look at</th>
                  <th scope="col">Why it matters</th>
                </tr>
              </thead>
              <tbody>
                {CHECKS.map(([c, w, y]) => (
                  <tr key={c}>
                    <th scope="row">{c}</th>
                    <td data-label="What I look at">{w}</td>
                    <td data-label="Why it matters">{y}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. SELLING */}
      <section className="lcn-section lcn-stone" id="selling">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Selling</p>
            <h2 className="lcn-title">Selling a Hollywood Hills Home</h2>
            <p className="lcn-sub">
              Pricing a Hills home is part data and part judgment, because few homes have a close twin. The goal is a
              price that holds up against the nearest real sales and still reflects what the view, lot and privacy
              are worth. I choose the comparable set first, set the price second, then plan preparation, marketing
              and offers.
            </p>
          </div>
          <div className="lcn-grid-3">
            <div className="lcn-card">
              <h3>Pricing a View With No Close Comparables</h3>
              <p>
                I start with sales on similar slopes, view directions and road types, then adjust for lot size,
                condition, privacy and any special features. I show you the range openly, including where the
                evidence is thin. In mid-2026, homes in 90068 sold for about 99% of list price, while Hollywood Hills
                West homes sold for about 97% of list and took about 118 days in March (Redfin), a reminder that tier
                and pocket matter.
              </p>
            </div>
            <div className="lcn-card">
              <h3>Disclosures and Preparation</h3>
              <p>
                Hillside sellers have extra homework: fire-zone and natural-hazard disclosures, permit records,
                retaining-wall and drainage condition, and clear road-access information. Getting these ready before
                listing keeps buyers from reopening the price later. I also advise which updates are worth doing and
                how to photograph a view honestly.
              </p>
            </div>
            <div className="lcn-card">
              <h3>Selling a Hollywood Hills Condo</h3>
              <p>
                Buyers read your building’s budget, reserves and rules closely. I price against recent sales in your
                complex, gather the HOA documents early, and prepare answers on dues and assessments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lcn-section lcn-ivory" id="valuation">
        <div className="container lcn-split lcn-split-center">
          <div>
            <p className="lcn-eyebrow">Free &amp; Confidential</p>
            <h2 className="lcn-title">Get Your Free Hollywood Hills Home Value</h2>
            <p className="lcn-sub">
              Share the address and I’ll review it personally against the closest hillside sales. Free, confidential
              and no obligation.
            </p>
            <ul className="lcn-bullets">
              <li>Free and confidential</li>
              <li>Built on hillside sales</li>
              <li>Reviewed by Andrew himself</li>
            </ul>
          </div>
          <GuideValuationForm place="Hollywood Hills" title="Get Your Free Hollywood Hills Home Value" />
        </div>
      </section>

      {/* 8. MARKET SNAPSHOT (refresh monthly) */}
      <section className="lcn-section lcn-stone" id="market">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Market</p>
            <h2 className="lcn-title">Hollywood Hills Real Estate Market</h2>
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
              The Hills produce noisy statistics. A few high-end sales in a month can push the median up, and a few
              smaller ones can pull it down, which is why the same area can show prices up 14% in one report and down
              3% per square foot in another. The more reliable signals are the tiers. Hollywood Hills West runs higher
              and moves more slowly (about 118 days in March), while 90068 has sped up (59 days versus 96 a year ago)
              and sells close to list price.
            </p>
            <p>
              For buyers, that means the right offer depends on the pocket. For sellers, it means a flat citywide
              price per square foot can badly misprice a view home.
            </p>
          </div>
          <div className="lcn-after">
            <Link href="/contact" className="lcn-btn lcn-btn-outline">
              Ask Me for a Hollywood Hills Price Review
            </Link>
          </div>
        </div>
      </section>

      {/* 9. NEIGHBORHOODS AND POCKETS */}
      <section className="lcn-section lcn-ivory" id="pockets">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Pockets</p>
            <h2 className="lcn-title">Hollywood Hills Neighborhoods and Pockets</h2>
          </div>
          <h3 className="lcn-h3">Hollywood Hills East</h3>
          <div className="lcn-grid-3">
            {EAST.map(([name, text]) => (
              <div key={name} className="lcn-card">
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <h3 className="lcn-h3 lcn-table-title">Hollywood Hills West</h3>
          <div className="lcn-grid-2">
            {WEST.map(([name, text]) => (
              <div key={name} className="lcn-card">
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <p className="lcn-note">
            Neighboring pockets: Laurel Canyon and Mount Olympus are covered on my{" "}
            <Link href="/real-estate-agent-in-laurel-canyon">Laurel Canyon page</Link>.
          </p>
        </div>
      </section>

      {/* 10. LIVING IN HOLLYWOOD HILLS */}
      <section className="lcn-section lcn-stone" id="daily-life">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Daily Life</p>
            <h2 className="lcn-title">Living in Hollywood Hills: Schools, Parks and Daily Life</h2>
          </div>
          <div className="lcn-split">
            <div className="lcn-prose">
              <h3 className="lcn-h3">Hollywood Hills Schools</h3>
              <p>
                Public school assignment depends on the exact address, so confirm it with LAUSD before an offer.
                Elementary schools that serve parts of the Hills include Cheremoya Avenue Elementary, Valley View
                Elementary, Selma Avenue Elementary and Gardner Street Elementary. For middle school, families often
                look at Le Conte and Bancroft, and for high school at Hollywood High and nearby options. Private
                options in and near the Hills include The Oaks School, The Episcopal School of Los Angeles and
                Immaculate Heart.
              </p>
              <h3 className="lcn-h3">Parks and Trails</h3>
              <p>
                Runyon Canyon Park sits at the edge of Hollywood Heights and Outpost Estates, with popular trails and
                city views. Lake Hollywood Park and the walking path around the Hollywood Reservoir offer views of the
                Hollywood Sign. Griffith Park, including the Bronson Canyon area known for its film-location caves,
                borders the Hills on the east. The Hollywood Bowl is a short walk from Whitley Heights and Hollywood
                Heights.
              </p>
            </div>
            <div className="lcn-prose">
              <h3 className="lcn-h3">Dining, Errands and Everyday Life</h3>
              <p>
                Franklin Village and Beachwood Village are the neighborhood-scale shopping and dining areas on the
                east side, while Sunset Plaza and the Strip anchor the west. Hollywood’s theaters, restaurants and
                studios are just below.
              </p>
              <h3 className="lcn-h3">Getting Around</h3>
              <p>
                Most trips start with a narrow, winding road, and many streets have little or no parking, so plan for
                deliveries, guests and trash pickup. Mulholland Drive runs the ridge, and the 101 through the Cahuenga
                Pass links the Hills to Studio City and the San Fernando Valley. Test any address at rush hour before
                you commit.
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
              Why Work With Andrew, Your <em>Hollywood Hills Realtor</em>
            </h2>
            <p className="lcn-sub">
              If you’re choosing a Hollywood Hills realtor, ask how they would price a view home with no close
              comparables, and what they check before you remove contingencies. Here’s how I work.
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
            <h2 className="lcn-title">What Hollywood Hills Clients Say</h2>
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
            <h2 className="lcn-title">Hollywood Hills Real Estate FAQ</h2>
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
            Related reading:{" "}
            <Link href="/blog/real-estate-negotiation-tips-for-buyers">Real estate negotiation tips for buyers</Link> ·{" "}
            <Link href="/blog/how-to-negotiate-after-home-inspection-in-california">Negotiating after a home inspection</Link> ·{" "}
            <Link href="/blog/buying-a-condo-in-los-angeles">Buying a condo in Los Angeles</Link>
          </p>
        </div>
      </section>

      <section className="lcn-section lcn-ivory lcn-final-wrap">
        <div className="container">
          <div className="lcn-final">
            <div>
              <p className="lcn-eyebrow">Next Step</p>
              <h2 className="lcn-title">Ready to Buy or Sell in the Hollywood Hills?</h2>
              <p className="lcn-sub">
                Tell me which pocket interests you, your timing and how much hillside risk and maintenance you’re
                comfortable with. I’ll show you what the market means for your situation. Free consultation, no
                pressure.
              </p>
            </div>
            <div className="lcn-ctas">
              <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-light">
                Browse Hollywood Hills Homes
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
