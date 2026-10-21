import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/icons";
import JsonLd from "../components/JsonLd";
import AreaListings from "../components/AreaListings";
import GuideValuationForm from "../components/GuideValuationForm";
import GuideWhy, { type WhyPoint } from "../components/GuideWhy";
import { fetchRawListingsServer } from "@/lib/idxServer";
import { SITE_URL, SITE_NAME, abs } from "@/lib/site";
// Shared neighbourhood-guide styles; every rule is under .lcn-page.
import "../neighborhood-guide.css";

/**
 * Hollywood Hills neighbourhood guide, built to "Hollywood Hills (desktop).pdf"
 * with the copy, tags and FAQ from the October 2026 content brief. As on
 * Studio City and Sherman Oaks, the Meet Andrew bio is replaced by three
 * proof points and the Local Places section is gone (the brief skips its
 * number 6).
 *
 * Hero photo: Venti Views on Unsplash (Unsplash License).
 */

const PATH = "/real-estate-agent-in-hollywood-hills";
const AREA_SEARCH = "/home-search?area=hollywood-hills";
const HERO = "/images/hollywood-hills-hero.jpg";

const TITLE = "Hollywood Hills Real Estate Agent | Homes for Sale";
const DESCRIPTION =
  "Looking for a Hollywood Hills real estate agent? Andrew Liberty guides buyers and sellers through canyon homes, views, and hillside rules.";

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
    images: [{ url: HERO, width: 2000, height: 1171, alt: "The Hollywood Sign above the Hollywood Hills at sunset" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [HERO],
  },
};

/* The listings are rendered from the server-side IDX feed, cached for six hours
   in lib/idxServer.ts; the page follows the same cadence. */
export const revalidate = 21600;

const START = [
  {
    tag: "Buying",
    title: "Buying in the Hollywood Hills",
    body: "Want a Hollywood house with real views? A buyer agent in Hollywood Hills, CA walks the lot with you, tests the access road, and keeps your offer honest.",
    cta: "Browse Hollywood Hills homes",
    href: AREA_SEARCH,
  },
  {
    tag: "Selling",
    title: "Selling in the Hollywood Hills",
    body: "A great view still needs a great price. I build yours from the view, the lot, and what comparable canyons actually sold for, starting with a free valuation.",
    cta: "Get your home value",
    href: "/home-valuation",
  },
  {
    tag: "Investing",
    title: "Investing in the Hollywood Hills",
    body: "Strong views and good access hold value. Rare architecture holds it even better. I study a lot before I suggest a purchase.",
    cta: "Explore opportunities",
    href: "/contact",
  },
];

const GLANCE = [
  ["Location", "Above Hollywood, across the Cahuenga Pass in the Santa Monica Mountains, inside the City of Los Angeles."],
  ["Primary ZIP", "90068, with parts of 90046 and 90069."],
  ["Key corridors", "Mulholland Drive on the ridge, Nichols Canyon Road, Beachwood Drive, and Laurel Canyon Boulevard. Sunset Boulevard sits at the base, and US 101 cuts through the pass."],
  ["Local character", "Narrow, winding roads, steep lots, and city views that change from canyon to canyon."],
  ["Housing stock", "Spanish revival homes, storybook cottages, mid-century houses, and new architectural builds. Condos cluster near the base of Runyon and Beachwood Canyons."],
  ["Bordering areas", "Studio City, Universal City, Griffith Park, Los Feliz, Hollywood, and the Sunset Strip."],
];

const CANYONS = [
  ["Beachwood Canyon and Hollywoodland", "This is the postcard canyon. Storybook cottages and stone walls line the road beneath the Hollywood Sign, and Griffith Park trails start close to the front door. Parking and access are the first questions to ask."],
  ["Nichols Canyon", "A single road threads a quiet canyon of mid-century and Spanish homes, with Runyon Canyon Park nearby. Lots here are generous, so a lot’s shape and privacy drive value."],
  ["Outpost and Mount Olympus", "Outpost Estates marks the western edge of the Hills. Mount Olympus, a planned community, adds private streets and wide city views. Road access and view easements decide what a home is worth."],
  ["Bird Streets and Sunset Plaza", "Streets named for birds climb above Sunset Plaza, where new view estates sit minutes from dining and shops. Homes here are priced on the view and the lot, with few true comparisons."],
  ["Streets and Getting Around", "You will drive to almost everything, and the roads are narrow. Sunset, Hollywood, and Franklin sit below, Mulholland Drive runs the ridge, and US 101 runs through the Cahuenga Pass. Test the commute at rush hour before you fall in love."],
  ["Nature and Privacy", "Trails, old trees, and wildlife are part of daily life, and a well-known mountain lion named P-22 once lived in these hills. That nature comes with fire-zone rules and brush clearance, so ask about both early."],
];

const WHY: WhyPoint[] = [
  { icon: "hills", title: "Reads the land", text: "Geology reports, access roads, view easements, and fire zone status come first. Beautiful photos come second." },
  { icon: "gem", title: "Prices the rare", text: "My start in commercial real estate taught me to value property with few comparables, which describes most of the Hills." },
  { icon: "shake", title: "Negotiates with proof", text: "I am a Certified Real Estate Negotiation Expert, RealTrends Verified, and a Los Angeles Magazine Real Estate All-Star." },
];

const PROCESS = [
  ["Consultation", "We talk through your goals, your timeline, and the view you want."],
  ["Strategy", "I map the canyons that fit and the sales that matter."],
  ["Search or Pricing", "Tours of the right view homes, or a price built on the view and the lot."],
  ["Negotiation", "Offers and counters backed by comps, reports, and repair findings."],
  ["Closing", "Escrow, inspections, and geology reports kept on schedule."],
  ["Ongoing", "Advice on value, permits, and improvements long after you close."],
];

const QUOTES = [
  "My wife and I have a very high bar for anyone we work with, and without exception Andrew over-delivered. He understood our needs and thought creatively to find the right home in a competitive market.",
  "Andrew and his team made the whole process easy. We were green to everything, and he always had time to answer our questions clearly and on time.",
];

const FAQS = [
  { q: "What does a Hollywood Hills real estate agent do?", a: "Beyond the usual pricing, negotiating, and closing, a Hollywood Hills real estate agent reads the land. That means geology reports, shared roads, view easements, permit history, and fire zone status. Hillside lots also fall under the city’s Baseline Hillside Ordinance, which regulates floor area, height, and stories." },
  { q: "How do I choose among Hollywood Hills real estate agents?", a: "Ask three hillside questions. How do you price a view with no true comparables? What do you check on a steep lot before an offer? Who handles geology and access problems when they surface? The answers show real hillside experience." },
  { q: "Do I need a buyer agent in Hollywood Hills, CA?", a: "Most buyers do better with one. A buyer agent in Hollywood Hills, CA can spot an unstable slope, a shared-driveway dispute, or an unpermitted addition before you are committed, and can negotiate price or repairs when issues appear." },
  { q: "Where are the Hollywood Hills?", a: "The Hollywood Hills sit above Hollywood and straddle the Cahuenga Pass in the Santa Monica Mountains, within the City of Los Angeles. US 101 runs through the pass. The main ZIP code is 90068, with parts in 90046 and 90069." },
  { q: "What are the Hollywood Hills known for?", a: "The Hollywood Sign, canyon roads, city views, and privacy. The Hollywood Bowl and the Hollywood Reservoir also sit within the neighborhood." },
  { q: "What are the main neighborhoods in the Hollywood Hills?", a: "They include Beachwood Canyon, Hollywoodland, Hollywood Dell, Hollywood Heights, Whitley Heights, Franklin Village, Outpost Estates, the Bird Streets, and Laurel Canyon, which includes Mount Olympus." },
  { q: "What is the difference between homes in Hollywood and Hollywood Hills homes?", a: "Homes in Hollywood sit on the flat streets below the hills. Hollywood Hills homes sit on hillside lots, with views, more privacy, and tighter access and building rules. A Hollywood house on the flats and a hillside house above it are different purchases, even a mile apart." },
  { q: "Where can I find Hollywood Hills homes for sale?", a: "Start with my home search page. It lists every active Hollywood Hills listing, from hillside houses to condos, with live prices and photos. The same search shows Hollywood homes for sale and homes for sale in Los Angeles, CA, and I can send new listings as they appear." },
  { q: "How much do homes cost in the Hollywood Hills?", a: "There is no single answer. The view, the lot, the access road, privacy, and architecture all move the price, and two homes on the same street can sit far apart. For a current number, search live listings or ask for a free home valuation." },
  { q: "Are Hollywood Hills homes at risk of wildfire?", a: "Some are. The city’s Very High Fire Hazard Severity Zone covers most of the hilly and mountainous areas of Los Angeles. Risk depends on the street, the surrounding brush, and how fire trucks reach the home. Get a fire rating and an insurance quote before you commit." },
  { q: "Can I build an addition on a hillside lot?", a: "Sometimes. City hillside rules can limit how large a house can be. Ask for the permit history and check the rules before you plan an addition." },
  { q: "How long does it take to sell a home in the Hollywood Hills?", a: "It varies more than in flatland neighborhoods, because these homes appeal to a smaller pool of buyers. Well-priced, well-marketed homes with strong views or architecture tend to move faster." },
];

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function HollywoodHillsPage() {
  // Whole feed, not the area subset: AreaListings filters it, and shows three
  // of Andrew's other homes when the area has none.
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
                { "@type": "ListItem", position: 3, name: "Hollywood Hills", item: abs(PATH) },
              ],
            },
            {
              "@type": "WebPage",
              "@id": `${abs(PATH)}#webpage`,
              url: abs(PATH),
              name: "Hollywood Hills Real Estate Agent | Andrew Liberty",
              description: DESCRIPTION,
              primaryImageOfPage: abs(HERO),
              isPartOf: {
                "@type": "CollectionPage",
                "@id": `${abs("/neighborhoods")}#webpage`,
                url: abs("/neighborhoods"),
              },
              mainEntity: {
                "@type": "Service",
                "@id": `${abs(PATH)}#service`,
                name: "Real Estate Agent Services in the Hollywood Hills",
                serviceType: "Real estate agent",
                description:
                  "Buying, selling, and investment guidance for hillside homes in the Hollywood Hills, with pricing built on the view, the lot, and comparable canyon sales.",
                provider: { "@id": `${SITE_URL}/#agent` },
                areaServed: {
                  "@type": "Place",
                  "@id": `${abs(PATH)}#place`,
                  name: "Hollywood Hills",
                  description:
                    "Hillside neighborhoods above Hollywood, straddling the Cahuenga Pass in the Santa Monica Mountains within the City of Los Angeles, known for canyon roads, city views, and privacy.",
                  image: abs("/images/hollywood-hills.jpg"),
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Los Angeles",
                    addressRegion: "CA",
                    postalCode: "90068",
                    addressCountry: "US",
                  },
                  containedInPlace: { "@type": "City", name: "Los Angeles" },
                  sameAs: "https://en.wikipedia.org/wiki/Hollywood_Hills",
                },
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />

      {/* ============================ HERO ============================ */}
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
            Hollywood Hills Real Estate Agent <em>Who Knows Every View</em>
          </h1>
          <p className="lcn-hero-sub">
            In the Hollywood Hills, the floor plan is only half the story. The slope, the road, the sightline, and
            the fire zone matter just as much. As a Hollywood Hills real estate agent, I read all of it before you
            write an offer, and I price what the view is really worth.
          </p>
          <div className="lcn-ctas">
            <Link href={AREA_SEARCH} className="lcn-btn lcn-btn-light">
              Browse Hollywood Hills Homes
            </Link>
            <Link href="/home-valuation" className="lcn-btn lcn-btn-outline-light">
              Get Your Home Valuation
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= START HERE ========================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head lcn-head-center">
            <p className="lcn-eyebrow">Start Here</p>
            <h2 className="lcn-title">What’s Your Move in the Hollywood Hills?</h2>
            <p className="lcn-sub">Not all views are priced the same. Pick where to begin.</p>
          </div>
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

      {/* ========================= AT A GLANCE ========================= */}
      <section className="lcn-section lcn-stone">
        <div className="container lcn-split">
          <div>
            <div className="lcn-head">
              <p className="lcn-eyebrow">What the View Means</p>
              <h2 className="lcn-title">Hollywood Hills Real Estate: Where the View Sets the Price</h2>
              <p className="lcn-sub">
                The Hills are not one market. They are a string of canyons and ridges, and every one has its own
                feel and its own price.
              </p>
            </div>
            <dl className="lcn-facts">
              {GLANCE.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lcn-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hollywood-hills.jpg" alt="Hillside homes in the Hollywood Hills" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ======================= CANYON BY CANYON ======================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Canyon by Canyon</p>
            <h2 className="lcn-title">Canyon by Canyon: Living in the Hollywood Hills</h2>
            <p className="lcn-sub">Your canyon shapes daily life more than square feet do.</p>
          </div>
          <ol className="lcn-rows">
            {CANYONS.map(([t, d], i) => (
              <li key={t}>
                <span className="lcn-num">{pad(i)}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =========================== LISTINGS =========================== */}
      <section className="lcn-section lcn-stone" id="listings">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Listings</p>
            <h2 className="lcn-title">Hollywood Hills Homes for Sale: See the View, Then the Sales</h2>
            <p className="lcn-sub">
              Browse Hollywood Hills homes for sale, from hillside houses to condos, pulled straight from my MLS
              feed, with recent sales below. Open any listing for photos, price, beds, baths, and square footage.
            </p>
            <p className="lcn-sub">
              Searching for Hollywood homes for sale, or a house for sale in Hollywood on the flat streets below?
              My <Link href="/home-search">home search</Link> covers those and other homes for sale in Los
              Angeles, CA.
            </p>
          </div>
          <AreaListings initialListings={listings} area="hollywood-hills" place="Hollywood Hills" />
        </div>
      </section>

      {/* ======================= WHY CHOOSE ANDREW ======================= */}
      <GuideWhy
        subline="Your Hollywood Hills real estate agent for hillside homes"
        intro="Anyone can call themselves the best Hollywood Hills real estate agent. What you can check is how an agent handles a steep lot, a shared road, or a view with no true comparable. Here is how I work."
        points={WHY}
        meetLink={false}
      />

      {/* ============================ PROCESS ============================ */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Process</p>
            <h2 className="lcn-title">Six Steps to Your Hollywood Hills Home</h2>
            <p className="lcn-sub">From first call to closing, built around the view.</p>
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

      {/* ========================== TESTIMONIALS ========================== */}
      <section className="lcn-section lcn-stone">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Client Proof</p>
            <h2 className="lcn-title">What Clients Say About Working With Andrew</h2>
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

      {/* =========================== VALUATION =========================== */}
      <section className="lcn-section lcn-ivory" id="valuation">
        <div className="container lcn-split lcn-split-center">
          <div>
            <p className="lcn-eyebrow">Personal Review</p>
            <h2 className="lcn-title">What’s Your Hollywood Hills View Worth?</h2>
            <p className="lcn-sub">
              An online estimate can’t see your sightline, your road, or your retaining walls. I review your
              property myself and give you a number built on the view, the lot, and what has sold nearby.
            </p>
            <ul className="lcn-bullets">
              <li>Free and confidential</li>
              <li>Built on the view, the lot, and nearby sales</li>
              <li>Reviewed by Andrew himself</li>
            </ul>
          </div>
          <GuideValuationForm place="Hollywood Hills" title="Get Your Free Hollywood Hills Home Valuation" />
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section className="lcn-section lcn-ivory">
        <div className="container lcn-aside-layout">
          <div className="lcn-aside">
            <p className="lcn-eyebrow">Common Questions</p>
            <h2 className="lcn-title">Hollywood Hills Real Estate Questions, Answered</h2>
            <p className="lcn-sub">Quick answers about views, hillsides, and buying.</p>
          </div>
          <div className="lcn-qa lcn-faq">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== NEXT STEP =========================== */}
      <section className="lcn-section lcn-ivory lcn-final-wrap">
        <div className="container">
          <div className="lcn-final">
            <div>
              <p className="lcn-eyebrow">Next Step</p>
              <h2 className="lcn-title">Ready for Your Hollywood Hills Move?</h2>
              <p className="lcn-sub">
                Tell me which canyon you have your eye on, and let’s talk about what the view is worth. Free
                consultation. No pressure.
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
