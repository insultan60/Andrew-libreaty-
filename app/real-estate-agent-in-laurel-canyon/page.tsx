import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/icons";
import JsonLd from "../components/JsonLd";
import AreaListings from "../components/AreaListings";
import GuideValuationForm from "../components/GuideValuationForm";
import { fetchRawListingsServer } from "@/lib/idxServer";
import { SITE_URL, SITE_NAME, abs } from "@/lib/site";
import { mlsAreaUrl } from "@/lib/mlsSearch";
// Shared neighbourhood-guide styles; every rule is under .lcn-page.
import "../neighborhood-guide.css";

/**
 * Laurel Canyon neighbourhood guide, rebuilt on the November 2026 content
 * brief: "one road at a time", Canyon Realities (one main road, shared roads,
 * slides, fire, loans), Mount Olympus owned here, neighborhood vs. ZIP market
 * data, a short history and an open grouped FAQ.
 */

const PATH = "/real-estate-agent-in-laurel-canyon";
const AREA_SEARCH = mlsAreaUrl("laurel-canyon");
const HERO = "/images/laurel-canyon.jpg";
const UPDATED = "November 21, 2026";

const TITLE = "Laurel Canyon Real Estate Agent | Homes for Sale | Andrew Liberty";
const OG_TITLE = "Real Estate Agent in Laurel Canyon | Andrew Liberty";
const DESCRIPTION =
  "Andrew Liberty is a Laurel Canyon real estate agent. See canyon homes for sale, prices, roads, schools and Mount Olympus, then book a free consultation.";

const svg = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
const IcPin = () => <svg {...svg}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>;
const IcChart = () => <svg {...svg}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>;
const IcShake = () => (
  <svg {...svg}><path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" /><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2.8 2.8 0 0 0-4 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a4.8 4.8 0 0 1 5.7-.8l.5.3a3 3 0 0 0 2 .4H21" /><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1.4 1.4 0 0 0 2-2M3 4h8" /></svg>
);

const WHY_POINTS = [
  { Icon: IcPin, title: "At the northern end of the canyon", text: "My office at 12001 Ventura Place is a few minutes down Laurel Canyon Boulevard, so I know the roads, the traffic and the trade-offs of both sides of the ridge." },
  { Icon: IcChart, title: "Pricing homes with no twin", text: "Starting in commercial real estate taught me to value properties that don’t fit a formula and to show you the evidence behind the number." },
  { Icon: IcShake, title: "Straight talk on trade-offs", text: "I’m a Certified Real Estate Negotiation Expert, and I tell you plainly what a home’s road, slope and insurance situation could mean for you, before it affects your offer." },
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
    images: [{ url: HERO, width: 900, height: 562, alt: "Wooded street in Laurel Canyon with canyon homes" }],
  },
  twitter: { card: "summary_large_image", title: OG_TITLE, description: DESCRIPTION, images: [HERO] },
};

/* The listings are rendered from the server-side IDX feed, cached for six hours
   in lib/idxServer.ts; the page follows the same cadence. */
export const revalidate = 21600;

const START = [
  { tag: "Buying", title: "Buying in Laurel Canyon", body: "Prices run from the low seven figures for a small cabin or bungalow up to multi-million-dollar canyon compounds. I help you decide which road and which type of home fits, then check access, slope and insurance before an offer.", cta: "Browse canyon homes", href: AREA_SEARCH },
  { tag: "Selling", title: "Selling in Laurel Canyon", body: "Redfin shows canyon homes selling about 5% under list and taking roughly 77 to 96 days, so a well-supported price matters. I start with a free valuation built on the nearest true comparables.", cta: "Get your home value", href: "/home-valuation" },
  { tag: "Investing", title: "Investing in Laurel Canyon", body: "Lots and rebuild projects depend on access, slope and city hillside rules. I run costs and permit risk before we discuss price.", cta: "Explore opportunities", href: "/contact" },
];

const GLANCE = [
  ["Location", "The Santa Monica Mountains between Studio City and Hollywood, within the City of Los Angeles, along Laurel Canyon Boulevard."],
  ["ZIP code", "90046 for most of the canyon, with some addresses in 90069 or 91604."],
  ["Main road", "Laurel Canyon Boulevard, the canyon’s only through route."],
  ["Side streets", "Kirkwood Drive, Wonderland Avenue, Willow Glen Road, Lookout Mountain Avenue, Mount Olympus Drive and Hillside Avenue."],
  ["Housing", "Cabins and bungalows, mid-century and modern homes, view houses along the ridge, and estate compounds, almost all single-family. Condos are very rare."],
  ["Landmarks", "The Canyon Country Store at 2108 Laurel Canyon Boulevard, Wonderland Avenue Elementary and trail access at Wilacre and Fryman Canyon parks."],
  ["Neighbors", "Studio City to the north, the Hollywood Hills and Sunset Strip to the south."],
];

const TYPES = [
  ["Houses for Sale in Laurel Canyon", "A Laurel Canyon house can mean almost anything, which is why I sort the market before showing it. For houses on or just off Laurel Canyon Boulevard I compare with nearby sales on the same stretch of road. For houses on side streets and in the hills I compare with homes of similar slope, privacy and access. The houses for sale in Laurel Canyon you see online are a mix of all of these, so a single list price tells you very little."],
  ["Cabins and Bungalows", "Vintage cabins and bungalows from the canyon’s early decades are some of its most distinctive homes, and many come with guest houses or detached studios. They’re often smaller and sit closer to the road, which can mean more charm and more noise. I look at the age of the structure, the permit history for additions, and how well the lot drains."],
  ["Mid-Century Homes", "Post-and-beam frames, walls of glass and indoor-outdoor layouts define the canyon’s mid-century homes. They draw design-minded buyers, so a well-preserved example can attract more interest than its size would suggest. I check original wiring and plumbing, the condition of retaining walls and decks, and whether past remodels respected the architecture."],
  ["Modern and Contemporary Homes", "Newer builds and complete rebuilds trade charm for convenience, with open plans, large windows and systems built to current code. In the canyon they’re often tucked behind privacy walls with off-street parking. I confirm permits, structural engineering and the stability of any cut-and-fill pads."],
  ["View Homes on the Ridge", "Homes near Mulholland Drive and along Lookout Mountain Avenue trade access for openness, with canyon or city views and more privacy. Driveways are steeper and roads are narrower, so I test the drive and parking before you fall for the view."],
  ["Luxury Homes and Compounds", "Laurel Canyon’s higher-priced homes include estate compounds on large lots and the planned community of Mount Olympus. With few true comparables, I price from the closest sales and adjust openly for lot, privacy, views and condition."],
  ["Lots and Land", "With any Laurel Canyon land for sale, I check legal access and easements, utility connections, slope and soils, and the city’s hillside rules before discussing price. A lot that looks inexpensive can cost far more to build on than a house costs to buy, and some sit on narrow or unpaved roads, which affects both building and financing."],
  ["Condos in the Canyon", "Condos are very rare in Laurel Canyon proper, and at times none are for sale, so most condo buyers look just outside it. If you’re comparing, I can show you condo options nearby in Studio City or the Hollywood Hills."],
];

const REALITIES = [
  ["One main road", "Laurel Canyon Boulevard is the canyon’s only through route. In January 2017, a slab from a hillside home’s foundation fell onto it, and the road stayed closed for about a month. That’s unusual, but it shows why access and commute, and not just the house, belong in your decision."],
  ["Shared and private roads", "Many canyon homes sit on private or shared lanes. I ask for the road maintenance agreement, who pays for repairs and how decisions are made before you buy, because those costs and rules become yours."],
  ["Slopes and slides", "Heavy rain can send mud and debris down the hillsides. I look at retaining walls, drainage and soils reports, and ask your insurance broker what is and isn’t covered, since many standard policies exclude earth movement."],
  ["Fire and insurance", "Much of the canyon is in a high-fire-hazard area, and some insurers have restricted new policies there. I recommend getting an actual insurance quote early, and I can introduce you to brokers who work with hillside homes."],
  ["Loans and appraisals", "Steep lots, shared roads and unusual construction can slow an appraisal or limit lender options. Working with a lender who knows canyon homes helps, and I’ll flag potential issues before we write an offer."],
  ["Narrow streets and parking", "Plan for guests, deliveries and trash pickup on roads that may not allow two cars to pass. I test each address in person."],
];

const MARKET: [string, string, string][] = [
  ["Median sale price, Laurel Canyon neighborhood", "About $2.1 to $2.6 million, depending on the month, based on only 3 to 7 sales a month", "Redfin neighborhood pages, 2026"],
  ["Time to sell, Laurel Canyon neighborhood", "About 77 to 96 days; homes sold about 4.6 to 4.9% under list", "Redfin, 2026"],
  ["Median sale price, ZIP 90046", "$1,669,509, down 3.7% year over year (3-month median about $1.7 million)", "Redfin, September 2026"],
  ["Time to sell, ZIP 90046", "About 75 days vs. 93 a year earlier; 87 homes sold in September", "Redfin, September 2026"],
  ["Price per square foot, ZIP 90046", "About $675, down 14.3%", "Redfin, September 2026"],
  ["Median sold price, ZIP 90046, 6 months", "$1,635,000 across 227 closings", "Resideline, Oct. 26, 2026"],
  ["Active listings, ZIP 90046", "129 active, 4 pending; median asking price $1.9 million; median listing age 97 days", "Resideline, Oct. 26, 2026"],
  ["Mount Olympus median sale price", "About $2.7 million", "Redfin, July 2026"],
];

const POCKETS = [
  ["Laurel Canyon Boulevard and the Country Store", "The canyon’s social center, at the corner of Laurel Canyon Boulevard and Kirkwood Drive. The Canyon Country Store at 2108 Laurel Canyon Boulevard has served the neighborhood for generations. Homes near the boulevard are the most convenient and the most exposed to traffic noise."],
  ["Kirkwood Drive and the side streets", "Wooded lanes that climb away from the boulevard, with cabins, bungalows and mid-century homes among the trees. Roads are narrow and parking is limited. Between Kirkwood and Mount Olympus Drive, a stretch known as “Little Laurel Canyon” (Laurel Canyon Road) runs parallel to the boulevard."],
  ["Wonderland Avenue", "Anchored by Wonderland Avenue Elementary and one of the canyon’s most-searched streets. Homes within a short walk of the school are in strong demand with families."],
  ["Lookout Mountain Avenue and Willow Glen Road", "Higher streets with more views and privacy, and one of the areas where view homes and larger lots come up."],
  ["Mulholland and the upper canyon", "Near Mulholland Drive, the lots steepen and the views open. Before you fall for a view, I check road access, slope and retaining walls."],
];

const PROCESS = [
  ["First conversation", "We talk through your goals, timing and tolerance for steep roads and maintenance."],
  ["Choose a road and a type", "We narrow the canyon to the pockets and home types that fit."],
  ["Visit and test", "We drive the roads at rush hour, check parking and walk the lot."],
  ["Diligence", "Road agreement, permits, soils reports and an insurance quote."],
  ["Offer and negotiation", "I protect your price, repairs and terms."],
  ["Closing and after", "Escrow stays on schedule, and I’m available for advice later."],
];

const FAQ_GROUPS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Choosing an Agent",
    items: [
      { q: "How do I choose a real estate agent in Laurel Canyon?", a: "Look for an agent who has handled canyon homes specifically, because they come with road agreements, slopes and insurance issues that flat-street homes don’t. Ask how they price a home with no close comparables, ask for recent hillside sales, and ask what they check before you remove contingencies." },
    ],
  },
  {
    title: "The Area",
    items: [
      { q: "Where is Laurel Canyon, and what is its ZIP code?", a: "Laurel Canyon is a hillside neighborhood in Los Angeles along Laurel Canyon Boulevard between Ventura Boulevard in Studio City and Sunset Boulevard on the Hollywood side, with Mulholland Drive marking the ridge. Most of the canyon uses ZIP code 90046, with some addresses in 90069 or 91604." },
      { q: "Is Laurel Canyon a good place to live?", a: "It suits people who want trees, privacy and quiet minutes from Hollywood and the Valley, and who are comfortable with narrow roads, limited parking and a car-based routine. Visit at different times of day and test the commute before deciding." },
      { q: "What is Mount Olympus, and is it part of Laurel Canyon?", a: "Mount Olympus is a planned community of roughly 300 acres, developed in the 1960s, on the Laurel Canyon side of the Hollywood Hills. It’s reached from Laurel Canyon Boulevard by Mount Olympus Drive and is known for wide streets, a Greek-style entrance and street names from Greek and Roman mythology. I cover it on this page, with a median sale price around $2.7 million as of July 2026." },
      { q: "Which schools serve Laurel Canyon homes?", a: "Wonderland Avenue Elementary is the canyon’s own K–5 school, with a gifted and high-ability magnet program that draws from across LAUSD. Some addresses are zoned for other schools, and middle and high school depend on the address, so verify each with LAUSD before an offer." },
    ],
  },
  {
    title: "Buying",
    items: [
      { q: "How much do homes cost in Laurel Canyon?", a: "It depends on the source and the month. Redfin’s Laurel Canyon neighborhood figures have ranged from about $2.1 to $2.6 million in 2026, based on only a few sales a month, while ZIP 90046 showed a median of about $1.67 million in September 2026. See the Market Snapshot above for each figure and its source." },
      { q: "Why are Laurel Canyon homes so hard to price?", a: "Few homes match. Road access, slope, privacy, views, lot size and condition differ from house to house, so I build the price from the closest true comparables and adjust openly for the differences." },
      { q: "Are Laurel Canyon roads private or public?", a: "Both exist. Some homes sit on private or shared lanes with shared repair costs and decision rules, so I ask for the road maintenance agreement before you buy." },
      { q: "Are Laurel Canyon homes at risk of wildfire or landslides?", a: "Some are. Much of the canyon is in a high-fire-hazard area, and heavy rain has sent mud and debris down hillsides, including the 2017 slide that closed Laurel Canyon Boulevard for about a month. Risk varies by street, slope and drainage, so I recommend an insurance quote and a look at retaining walls, drainage and soils reports before you buy." },
      { q: "Is it hard to get a loan or insurance for a canyon home?", a: "It can be. Steep lots, shared roads and unusual construction can slow an appraisal, and some insurers restrict new policies in fire zones. Working with a lender and an insurance broker who know canyon homes helps, and I’ll flag likely issues early." },
    ],
  },
  {
    title: "Selling",
    items: [
      { q: "What should I prepare before listing a canyon home?", a: "Gather the road maintenance agreement, permit records, any soils or geology reports, retaining-wall and drainage information and recent insurance details. Having answers ready keeps buyers from reopening the price later." },
      { q: "How long does it take to sell a home in Laurel Canyon?", a: "Redfin shows roughly 77 to 96 days for the neighborhood and about 75 days for ZIP 90046, with canyon homes selling about 5% below list on average. Well-priced homes can move faster than that, so price, condition and presentation matter." },
    ],
  },
];
const FAQS = FAQ_GROUPS.flatMap((g) => g.items);

const NEARBY = [
  ["Hollywood Hills", "Nichols Canyon, the Bird Streets, Beachwood and more", "/real-estate-agent-in-hollywood-hills"],
  ["Studio City", "Village streets and hillside pockets just to the north", "/real-estate-agent-in-studio-city"],
  ["Sherman Oaks", "Condos, flats and hills in the Valley", "/real-estate-agent-in-sherman-oaks"],
  ["Valley Village", "Condos and ranch homes to the northeast", "/real-estate-agent-in-valley-village"],
];

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function LaurelCanyonPage() {
  const listings = await fetchRawListingsServer();

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
                { "@type": "ListItem", position: 3, name: "Laurel Canyon", item: abs(PATH) },
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
                name: "Real Estate Agent Services in Laurel Canyon",
                serviceType: "Real estate agent",
                description: "Buying, selling and investment guidance for Laurel Canyon and Mount Olympus homes, priced one road at a time, with access, slope, insurance and road-agreement checks.",
                provider: { "@id": `${SITE_URL}/#agent` },
                areaServed: {
                  "@type": "Place",
                  "@id": `${abs(PATH)}#place`,
                  name: "Laurel Canyon",
                  description: "A hillside neighborhood of Los Angeles along Laurel Canyon Boulevard in the Santa Monica Mountains, between Studio City and Hollywood.",
                  image: abs(HERO),
                  address: { "@type": "PostalAddress", addressLocality: "Los Angeles", addressRegion: "CA", postalCode: "90046", addressCountry: "US" },
                  containedInPlace: { "@type": "City", name: "Los Angeles" },
                  sameAs: "https://en.wikipedia.org/wiki/Laurel_Canyon",
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
            <span aria-current="page">Laurel Canyon</span>
          </nav>
          <p className="lcn-eyebrow">Laurel Canyon, Los Angeles</p>
          <h1 className="lcn-hero-title">
            Real Estate Agent in Laurel Canyon <em>Cabins, mid-century homes and ridge-top views, priced one road at a time</em>
          </h1>
          <p className="lcn-hero-sub">
            Laurel Canyon is a single winding artery with a hundred small worlds on either side of it: a cabin down a
            shared lane, a glass house near Mulholland, a Mount Olympus estate behind Greek columns. I’m Andrew
            Liberty, and my Studio City office sits at the northern end of the same road, so I drive these streets as
            much as I show them. I price each home on the road, slope and setting it actually has.
          </p>
          <div className="lcn-ctas">
            <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-light">
              Browse Canyon Homes
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
            <h2 className="lcn-title">Laurel Canyon Real Estate: Priced One Road at a Time</h2>
            <p className="lcn-sub">
              Laurel Canyon was first developed in the 1910s and became part of the City of Los Angeles in 1923.
              Today Laurel Canyon Boulevard connects Ventura Boulevard in the Valley to Hollywood and Sunset on the
              other side of the ridge, and Mulholland Drive marks the dividing line. Side streets such as Kirkwood
              Drive, Wonderland Avenue, Willow Glen Road, Lookout Mountain Avenue and Mount Olympus Drive branch off
              into the hills.
            </p>
            <p className="lcn-sub">
              That layout is why Laurel Canyon real estate rarely follows a formula. Two houses a few hundred feet
              apart can differ in access, slope, privacy and insurance, and that is where a Laurel Canyon real estate
              agent earns the fee. I started in commercial real estate, so I’m used to valuing properties that don’t
              have a neat twin, and I show you the numbers and trade-offs behind every price.
            </p>
          </div>
          <ul className="lcn-proof-row">
            <li>Office at 12001 Ventura Place, at the canyon’s north end</li>
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

      {/* 3. AT A GLANCE + ZIP */}
      <section className="lcn-section lcn-stone" id="glance">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Orientation</p>
            <h2 className="lcn-title">Laurel Canyon at a Glance</h2>
          </div>
          <dl className="lcn-facts lcn-facts-wide">
            {GLANCE.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="lcn-prose lcn-after">
            <h3 className="lcn-h3">Laurel Canyon ZIP Code</h3>
            <p>
              Most of Laurel Canyon uses ZIP code 90046, which also covers parts of West Hollywood and the flatter
              streets below the hills. A few canyon addresses use 90069 or 91604. That matters for pricing:
              Redfin’s median sale price for ZIP 90046 was about $1.67 million in September 2026, while Redfin’s
              Laurel Canyon neighborhood figures have run between about $2.1 and $2.6 million this year. The ZIP code
              blends canyon homes with lower-priced homes outside the canyon, so I look at the street, not the ZIP.
            </p>
          </div>
        </div>
      </section>

      {/* 4. HOMES FOR SALE (canyon only, no fallback) */}
      <section className="lcn-section lcn-ivory" id="listings">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Listings</p>
            <h2 className="lcn-title">Laurel Canyon Homes for Sale</h2>
            <p className="lcn-sub">
              Here are Laurel Canyon houses for sale from my MLS feed, from small canyon cabins to larger compounds,
              each with price, beds, baths and square footage. If you’re searching for homes for sale in Laurel
              Canyon, CA, I can arrange a showing and give you the nearby sales that support or challenge the asking
              price.
            </p>
          </div>
          <AreaListings
            initialListings={listings}
            area="laurel-canyon"
            place="Laurel Canyon"
            only="sale"
            fallback={false}
            emptyText="I don’t have an active Laurel Canyon listing right now, so here is the market at a glance. As of October 26, 2026, ZIP code 90046 had 129 active listings and 4 pending sales, with a median asking price of about $1.9 million and a median listing age of 97 days (Resideline). Search every Laurel Canyon listing below, or ask me to send you new homes as they come to market."
          />
        </div>
      </section>

      {/* 5. RECENTLY SOLD */}
      <section className="lcn-section lcn-stone" id="sold">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Recently Sold</p>
            <h2 className="lcn-title">Recently Sold in Laurel Canyon</h2>
            <p className="lcn-sub">
              Sold prices show what buyers actually paid, which matters more than asking prices when a home has few
              close twins. My Laurel Canyon sales include a two-bedroom on Laurel Canyon Boulevard that closed at
              $1,050,000. For context, public records show 2026 closings on and just off Laurel Canyon Boulevard from
              about $1.45 million to $1.83 million for three-bedroom homes of roughly 2,000 to 2,500 square feet.
            </p>
          </div>
          <AreaListings initialListings={listings} area="laurel-canyon" place="Laurel Canyon" only="sold" fallback={false} searchLabel="View Sold Homes" />
        </div>
      </section>

      {/* 6. BUYING BY HOME TYPE + CANYON REALITIES */}
      <section className="lcn-section lcn-ivory" id="buying">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Buying</p>
            <h2 className="lcn-title">Buying a Home in Laurel Canyon</h2>
            <p className="lcn-sub">
              The way to shop in the canyon is by type and by road. Each of the home types below behaves differently
              on price, upkeep and resale, and each road brings its own conditions.
            </p>
          </div>
          <div className="lcn-grid-2">
            {TYPES.map(([t, d]) => (
              <div key={t} className="lcn-card">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>

          <div className="lcn-head lcn-subhead">
            <h3 className="lcn-h3">Canyon Realities: What to Know Before You Buy</h3>
          </div>
          <div className="lcn-grid-3">
            {REALITIES.map(([t, d], i) => (
              <div key={t} className="lcn-card lcn-step-card">
                <span className="lcn-num">{pad(i)}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SELLING */}
      <section className="lcn-section lcn-stone" id="selling">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Selling</p>
            <h2 className="lcn-title">Selling a Home in Laurel Canyon</h2>
            <p className="lcn-sub">
              Selling in the canyon starts with finding the closest true comparables, not a neighborhood average. A
              cabin on a shared lane, a mid-century home near Mulholland and a Mount Olympus house are three different
              products with three different buyers. I pick the comparable set first, set the price second, then plan
              preparation, photography and marketing.
            </p>
          </div>
          <div className="lcn-grid-3">
            <div className="lcn-card">
              <h3>Pricing a Canyon Home With No Close Twin</h3>
              <p>
                I start with sales on similar roads and slopes, then adjust for lot, privacy, views, condition and any
                special features such as a guest house. I show you the range and where the evidence is thin. Redfin’s
                neighborhood data shows canyon homes selling around 5% below list on average, so I build negotiating
                room into the strategy.
              </p>
            </div>
            <div className="lcn-card">
              <h3>What to Prepare Before Listing</h3>
              <p>
                Canyon buyers ask the same questions in the same order: Who owns and maintains the road? What are the
                retaining walls and drainage like? Are the additions permitted? What does insurance cost? I help you
                gather the road agreement, permit records, any soils or geology reports and recent insurance details
                before you list.
              </p>
            </div>
            <div className="lcn-card">
              <h3>Showing a Home on a Narrow Road</h3>
              <p>
                Parking and access shape the showing plan. I arrange guest parking, staging time and visit windows to
                keep showings smooth and neighbors happy, and I choose photography timing to show the setting
                honestly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lcn-section lcn-ivory" id="valuation">
        <div className="container lcn-split lcn-split-center">
          <div>
            <p className="lcn-eyebrow">Free &amp; Confidential</p>
            <h2 className="lcn-title">Get Your Free Laurel Canyon Home Value</h2>
            <p className="lcn-sub">
              Share your address and I’ll review it personally against the nearest canyon sales. Free, confidential
              and no obligation.
            </p>
            <ul className="lcn-bullets">
              <li>Free and confidential</li>
              <li>Built on canyon sales</li>
              <li>Reviewed by Andrew himself</li>
            </ul>
          </div>
          <GuideValuationForm place="Laurel Canyon" title="Get Your Free Laurel Canyon Home Value" />
        </div>
      </section>

      {/* 8. MARKET SNAPSHOT (refresh monthly) */}
      <section className="lcn-section lcn-stone" id="market">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Market</p>
            <h2 className="lcn-title">Laurel Canyon Real Estate Market</h2>
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
              The most important point is sample size. Laurel Canyon records only a handful of sales a month, so a
              single closing can move the neighborhood median by hundreds of thousands of dollars. That’s why
              Redfin’s canyon figure bounces between roughly $2.1 and $2.6 million. ZIP 90046 is steadier because it
              includes many more sales, but it also includes homes outside the canyon, which pulls the median lower.
            </p>
            <p>
              Two other patterns are consistent. Canyon homes tend to sell below asking, by about 5% on Redfin’s
              numbers, and they take longer than a typical LA neighborhood, around 75 to 97 days depending on the
              measure. Well-priced, updated homes can sell far faster than that, so presentation and pricing make a
              bigger difference here than the market average suggests.
            </p>
          </div>
          <div className="lcn-after">
            <Link href="/contact" className="lcn-btn lcn-btn-outline">
              Ask Me for a Laurel Canyon Price Review
            </Link>
          </div>
        </div>
      </section>

      {/* 9. NEIGHBORHOODS AND POCKETS (Mount Olympus owned here) */}
      <section className="lcn-section lcn-ivory" id="pockets">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Pockets</p>
            <h2 className="lcn-title">Laurel Canyon Neighborhoods and Pockets</h2>
          </div>
          <div className="lcn-grid-2">
            {POCKETS.map(([name, text]) => (
              <div key={name} className="lcn-card">
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="lcn-card lcn-after" id="mount-olympus">
            <p className="lcn-tag">Mount Olympus</p>
            <h3 className="lcn-h3">Mount Olympus, Los Angeles</h3>
            <div className="lcn-prose">
              <p>
                A roughly 300-acre planned community developed in the 1960s, reached from Laurel Canyon Boulevard by
                Mount Olympus Drive and bordered by Laurel Canyon Boulevard and Nichols Canyon Road. It’s known for
                wide streets, a decorative entrance with Greek-style columns, and streets named after figures from
                Greek and Roman mythology, including Apollo, Hercules, Jupiter, Venus and Zeus.
              </p>
              <p>
                Mount Olympus homes are typically larger and more expensive than most canyon homes, with a median sale
                price around $2.7 million (Redfin, July 2026). Like other hillside areas, parts of it have seen
                periodic mudslides, so slope and drainage get close attention.
              </p>
            </div>
          </div>
          <p className="lcn-note">
            Nearby Nichols Canyon and the Bird Streets are covered on my{" "}
            <Link href="/real-estate-agent-in-hollywood-hills">Hollywood Hills page</Link>.
          </p>
        </div>
      </section>

      {/* 10. LIVING IN LAUREL CANYON + HISTORY */}
      <section className="lcn-section lcn-stone" id="daily-life">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Daily Life</p>
            <h2 className="lcn-title">Living in Laurel Canyon: Schools, Parks and Daily Life</h2>
          </div>
          <div className="lcn-split">
            <div className="lcn-prose">
              <h3 className="lcn-h3">Laurel Canyon Schools</h3>
              <p>
                Wonderland Avenue Elementary (K–5, 8510 Wonderland Avenue) is the canyon’s own school and one of its
                biggest draws. It serves the neighborhood and also runs a gifted and high-ability magnet program that
                draws students from across LAUSD, so neighborhood attendance and magnet admission are separate
                questions. Some addresses are zoned for other schools, such as Gardner Street Elementary, so always
                confirm the assignment for a specific address with LAUSD. Middle and high school assignments depend on
                the address.
              </p>
              <h3 className="lcn-h3">Parks and Trails</h3>
              <p>
                Wilacre Park (3431 Fryman Road, Studio City) is a 128-acre park off Laurel Canyon Boulevard with the
                Betty B. Dearing Trail and a trail system leading to Fryman Canyon, Coldwater Canyon and Franklin
                Canyon parks. Fryman Canyon Park is next door.
              </p>
            </div>
            <div className="lcn-prose">
              <h3 className="lcn-h3">Dining, Errands and Everyday Life</h3>
              <p>
                The Canyon Country Store covers daily basics, and Sunset Strip restaurants are minutes south while
                Ventura Boulevard dining is minutes north. Most errands need a car.
              </p>
              <h3 className="lcn-h3">Getting Around</h3>
              <p>
                Laurel Canyon Boulevard is the main route, and Mulholland Drive crosses the top. Test any address at
                rush hour and at a quiet time before making an offer.
              </p>
              <h3 className="lcn-h3">A Short History of Laurel Canyon</h3>
              <p>
                Laurel Canyon began to develop in the 1910s as a streetcar-served retreat, with a rustic community of
                cabins and bungalows that annexed to Los Angeles in 1923. In the 1960s and 1970s, it became closely
                associated with the folk and rock music scene, and the Canyon Country Store turned up in the music of
                that era. Today the canyon remains a quiet, wooded neighborhood with one foot in Hollywood and the
                other in the Valley.
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
              Why Work With Andrew, Your <em>Laurel Canyon Realtor</em>
            </h2>
            <p className="lcn-sub">
              If you’re choosing a Laurel Canyon realtor, ask how they would price a home with no close comparables,
              and whether they’ll review road agreements, permits and soils reports before you remove contingencies.
              Here’s how I work.
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
            <h2 className="lcn-title">Laurel Canyon Real Estate FAQ</h2>
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
            Related reading:{" "}
            <Link href="/blog/real-estate-negotiation-tips-for-buyers">Real estate negotiation tips for buyers</Link> ·{" "}
            <Link href="/blog/how-to-negotiate-after-home-inspection-in-california">Negotiating after a home inspection</Link> ·{" "}
            <Link href="/blog/how-to-buy-a-house-in-los-angeles">How to buy a house in Los Angeles</Link>
          </p>
        </div>
      </section>

      <section className="lcn-section lcn-ivory lcn-final-wrap">
        <div className="container">
          <div className="lcn-final">
            <div>
              <p className="lcn-eyebrow">Next Step</p>
              <h2 className="lcn-title">Ready to Buy or Sell in Laurel Canyon?</h2>
              <p className="lcn-sub">
                Tell me which road or pocket interests you, your timing and how much slope and maintenance you’re
                comfortable with. I’ll show you what the market means for your situation. Free consultation, no
                pressure.
              </p>
            </div>
            <div className="lcn-ctas">
              <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-light">
                Browse Canyon Homes
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
