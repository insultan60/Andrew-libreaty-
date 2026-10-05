import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/icons";
import JsonLd from "../components/JsonLd";
import AreaListings from "../components/AreaListings";
import GuideValuationForm from "../components/GuideValuationForm";
import { fetchRawListingsServer } from "@/lib/idxServer";
import { SITE_URL, SITE_NAME, abs } from "@/lib/site";
// Shared neighbourhood-guide styles; every rule is under .lcn-page.
import "../neighborhood-guide.css";

/**
 * Hollywood Hills neighbourhood guide, built to "Hollywood Hills (desktop).pdf".
 *
 * Copy is the design's. Its bracketed notes to Andrew — "[Andrew: swap in
 * current MLS figures…]", "Data as of [Month Year]", "confirm local places",
 * the Homes.com sales note — are left off the page. The design's three
 * testimonial slots are all placeholders for Hollywood Hills quotes Andrew
 * has not supplied yet, so the section shows his two general client quotes
 * under a general heading rather than labelling them as Hills clients.
 *
 * Hero photo: Venti Views on Unsplash (Unsplash License).
 */

const PATH = "/real-estate-agent-in-hollywood-hills";
const AREA_SEARCH = "/home-search?area=hollywood-hills";
const HERO = "/images/hollywood-hills-hero.jpg";

const TITLE = "Real Estate Agent in Hollywood Hills | Knows Every View";
const DESCRIPTION =
  "Not all Hollywood Hills views are priced the same. Andrew Liberty, a real estate agent in Hollywood Hills, knows which holds value.";

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

/* The listings are rendered from the server-side IDX feed, cached for fifteen
   minutes in lib/idxServer.ts; the page follows the same cadence. */
export const revalidate = 900;

const START = [
  {
    tag: "Buying",
    title: "Buying in the Hollywood Hills",
    body: "Every home in the Hills is different. Andrew helps you find the right one and make a smart offer, view and all.",
    cta: "Browse Hollywood Hills homes",
    href: "/home-search?area=hollywood-hills",
  },
  {
    tag: "Selling",
    title: "Selling in the Hollywood Hills",
    body: "Selling here means showing off the view and the design, not just the square footage. Andrew prices on the view and the lot, not a formula.",
    cta: "Get your home value",
    href: "/home-valuation",
  },
  {
    tag: "Investing",
    title: "Investing in the Hollywood Hills",
    body: "Homes with strong views, unique architecture, and good access tend to hold their value. Andrew studies the numbers on each lot before he suggests any investment.",
    cta: "Explore opportunities",
    href: "/contact",
  },
];

const GLANCE = [
  ["Location", "Hillside neighborhoods above Hollywood, in the Santa Monica Mountains, City of Los Angeles."],
  ["Primary ZIP", "90068. Parts of the Hills also fall in 90046 and 90069."],
  ["Key corridors", "Mulholland Drive, Nichols Canyon Road, Beachwood Drive, Laurel Canyon Boulevard, and Sunset Boulevard at the base."],
  ["Local character", "Winding streets, steep lots, and city views. Each canyon has its own feel."],
  ["Housing stock", "Spanish, mid-century, storybook, and modern homes. Condos sit near the base of Runyon and Beachwood Canyons."],
  ["Bordering areas", "Laurel Canyon, Studio City, West Hollywood, the Sunset Strip, and Griffith Park."],
];

const LIFESTYLE = [
  ["Beachwood Canyon and Hollywoodland", "Storybook cottages and stone homes sit near Griffith Park trails. The Hollywood Sign rises above the neighborhood."],
  ["Nichols Canyon", "A quiet road with large lots and a spring-fed creek. Mid-century and Spanish homes line the way. Runyon Canyon Park sits on its east side."],
  ["Outpost and Mount Olympus", "Outpost Estates and Mount Olympus, a 1960s planned community, offer private streets and city views."],
  ["Bird Streets and Sunset Plaza", "The Bird Streets are an ultra-luxury area with new view estates. Sunset Plaza puts dining and shops close by."],
  ["Streets and Getting Around", "Streets are steep and narrow, so you drive to nearly everything. Sunset Boulevard, Hollywood Boulevard, and the Cahuenga Pass link you to the rest of the city."],
  ["Nature and Privacy", "Expect trails, tall trees, wildlife, and quiet streets, all minutes from Hollywood."],
];

const EVERYDAY = [
  ["Food and drink", "Dining", "Beachwood Village and Sunset Plaza have cafes and restaurants. Hollywood and Sunset Boulevards sit minutes below the hills."],
  ["Errands", "Everyday Errands", "Groceries and daily services sit along the base of the hills, on Sunset, Hollywood, and Franklin."],
  ["Outdoors", "Hiking and Parks", "Runyon Canyon Park, Griffith Park, and Lake Hollywood Park offer trails and open space."],
  ["Anchors", "Schools", "LAUSD serves the Hills, and private and charter options exist. Confirm the school for each address."],
];

const CREDENTIALS = [
  "REALTOR®",
  "Certified Real Estate Negotiation Expert (RENE)",
  "RealTrends Verified and Los Angeles Magazine Real Estate All-Stars",
  "Residential, investment, and development",
];

const PROCESS = [
  ["Consultation", "We talk about your goals, your timing, and what the view means to you."],
  ["Strategy", "I compare sales from your canyon and weigh the view, lot, and access."],
  ["Search or Pricing", "A search of view homes, or a price built on the view and the lot."],
  ["Negotiation", "Certified skill on price, repairs, and geology findings."],
  ["Closing", "Escrow, inspections, and reports handled."],
  ["Ongoing", "Advice on value and improvements long after closing."],
];

const QUOTES = [
  "His professionalism, patience and expertise made purchasing a home in an incredibly difficult market seamless.",
  "Andrew and his team made the whole process easy. We were green to everything, and he always had time to answer our questions.",
];

const FAQS = [
  { q: "What are the Hollywood Hills known for?", a: "The Hollywood Hills are known for city views, winding canyon roads, privacy, and homes that range from cottages to estates." },
  { q: "Where are the Hollywood Hills?", a: "The Hollywood Hills are hillside neighborhoods above Hollywood, in the Santa Monica Mountains. The main ZIP code is 90068. Parts also sit in 90046 and 90069." },
  { q: "How much do homes cost in the Hollywood Hills?", a: "Median prices run about $1.7 million to $2.4 million, depending on the source. Condos start near $600,000. View estates in the Bird Streets reach $20 million and up." },
  { q: "What are the main neighborhoods in the Hollywood Hills?", a: "They include Beachwood Canyon, Hollywoodland, Nichols Canyon, Outpost Estates, Mount Olympus, the Bird Streets, and Laurel Canyon." },
  { q: "Why do Hollywood Hills homes vary so much in price?", a: "Price depends on the view, lot access, privacy, and architectural style. Two homes on the same street can differ widely in value based on these factors alone." },
  { q: "Do I need a specialized agent for hillside properties?", a: "It helps. Hillside homes come with geology reports, access roads, and view easements that a general agent may not handle often. Local experience can prevent costly surprises." },
  { q: "Are Hollywood Hills homes at risk of wildfire?", a: "Some are. Fire risk depends on the street, the brush, and how fire trucks reach the home. Get a fire rating and an insurance quote first." },
  { q: "Can I build an addition on a hillside lot?", a: "Maybe. City hillside rules can limit how large a house can be. Ask for the permit history and check the rules before you plan an addition." },
  { q: "How long does it take to sell a home in the Hollywood Hills?", a: "It varies more than in flatland neighborhoods, since these homes appeal to a smaller buyer pool. Well-priced, well-marketed homes with strong views or architecture tend to move faster." },
  { q: "Who is the best real estate agent in the Hollywood Hills?", a: "Pick an agent with hillside experience and strong negotiation skill. Andrew Liberty is a Certified Real Estate Negotiation Expert, a REALTOR®, RealTrends Verified, and a Los Angeles Magazine Real Estate All-Star." },
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
              "@id": abs(PATH),
              url: abs(PATH),
              name: TITLE,
              description: DESCRIPTION,
              primaryImageOfPage: abs(HERO),
              about: { "@type": "Place", name: "Hollywood Hills, Los Angeles, CA" },
              provider: { "@id": `${SITE_URL}/#agent` },
            },
            {
              "@type": "Service",
              serviceType: "Real estate agent",
              provider: { "@id": `${SITE_URL}/#agent` },
              areaServed: { "@type": "Place", name: "Hollywood Hills, Los Angeles, CA" },
              url: abs(PATH),
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
          <p className="lcn-eyebrow">Neighborhood Guide · Hollywood Hills</p>
          <h1 className="lcn-hero-title">
            Real Estate Agent in Hollywood Hills <em>Who Knows the Views and the Value</em>
          </h1>
          <p className="lcn-hero-sub">
            The Hollywood Hills are hillside neighborhoods above Hollywood, in the Santa Monica Mountains. Typical
            median prices run about $1.7 million to $2.4 million, and view estates cost far more. Andrew Liberty
            helps people buy, sell, and invest here, where views, privacy, and architecture matter as much as
            price.
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
            <h2 className="lcn-title">What’s the Move in the Hollywood Hills?</h2>
            <p className="lcn-sub">Not all views are priced the same. Pick where to begin.</p>
          </div>
          <div className="lcn-grid-3">
            {START.map((c) => (
              <a key={c.title} href={c.href} className="lcn-card lcn-start-card">
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
              <p className="lcn-eyebrow">Orientation</p>
              <h2 className="lcn-title">Hollywood Hills at a Glance</h2>
              <p className="lcn-sub">
                The short version first. The Hills are a set of canyons and ridges, and each one has its own feel
                and its own price.
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

      {/* ========================== LIFESTYLE ========================== */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Lifestyle</p>
            <h2 className="lcn-title">Living in the Hollywood Hills: What to Know Before You Buy</h2>
            <p className="lcn-sub">Your canyon shapes daily life more than square feet do.</p>
          </div>
          <ol className="lcn-rows">
            {LIFESTYLE.map(([t, d], i) => (
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
            <h2 className="lcn-title">Hollywood Hills Homes for Sale and Recently Sold</h2>
            <p className="lcn-sub">
              View homes for sale now, then recent sales. Open any listing for photos, price, beds, baths, and
              square footage.
            </p>
          </div>
          <AreaListings initialListings={listings} area="hollywood-hills" place="Hollywood Hills" />
        </div>
      </section>

      {/* ========================= EVERYDAY LIFE ========================= */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Everyday Life</p>
            <h2 className="lcn-title">Local Places in the Hollywood Hills</h2>
            <p className="lcn-sub">Where the Hills eat, hike, and run errands.</p>
          </div>
          <div className="lcn-grid-4">
            {EVERYDAY.map(([tag, t, d]) => (
              <div key={t} className="lcn-card">
                <p className="lcn-tag">{tag}</p>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== MEET ANDREW ========================== */}
      <section className="lcn-section lcn-stone">
        <div className="container lcn-andrew">
          <div className="lcn-photo lcn-photo-portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/andrew-liberty.jpg" alt="Andrew Liberty, Hollywood Hills real estate agent" loading="lazy" />
          </div>
          <div>
            <p className="lcn-eyebrow">Local Expertise</p>
            <h2 className="lcn-title">Meet Your Hollywood Hills Agent</h2>
            <p className="lcn-license">
              Andrew Ruric Liberty II · CA DRE# 01965696 | Compass California, Inc. · CA DRE# 01991628
            </p>
            <p className="lcn-body">
              I work throughout the Hollywood Hills, where every home is different, from architectural landmarks
              to hillside view lots. I am a REALTOR®, and I earned the Certified Real Estate Negotiation Expert
              designation. I started in commercial real estate, so I have a sharp eye for value on any property,
              luxury or otherwise.
            </p>
            <p className="lcn-body">
              I am hands-on and straightforward. I explain each step in plain words, so you feel confident whether
              you are buying your first home or investing in a luxury property.
            </p>
            <p className="lcn-body">
              My commercial real estate background helps me weigh value on landmark homes where comparable sales
              are thin.
            </p>
            <ul className="lcn-bullets">
              {CREDENTIALS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div className="lcn-ctas">
              <a
                href="https://wa.me/13107090581"
                target="_blank"
                rel="noopener noreferrer"
                className="lcn-btn lcn-btn-dark"
              >
                Schedule a Consultation
              </a>
              <Link href="/team/andrew-liberty" className="lcn-btn lcn-btn-outline">
                Meet Andrew
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ PROCESS ============================ */}
      <section className="lcn-section lcn-ivory">
        <div className="container">
          <div className="lcn-head">
            <p className="lcn-eyebrow">Process</p>
            <h2 className="lcn-title">How I Work With Hollywood Hills Clients</h2>
            <p className="lcn-sub">Six steps from first call to closing, built around the view.</p>
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
            <h2 className="lcn-title">Know Your Hollywood Hills Home’s Value</h2>
            <p className="lcn-sub">
              Automated estimates often get hillside homes wrong. Andrew reviews your property personally,
              factoring in the view, the lot, and what is actually selling nearby, so you get a number you can
              trust.
            </p>
            <ul className="lcn-bullets">
              <li>Free and confidential</li>
              <li>Built on the view, the lot, and nearby sales</li>
              <li>Reviewed personally by Andrew</li>
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
            <h2 className="lcn-title">Hollywood Hills Real Estate FAQ</h2>
            <p className="lcn-sub">Quick answers about views, hillsides, and prices.</p>
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
              <h2 className="lcn-title">Buying or Selling in the Hollywood Hills?</h2>
              <p className="lcn-sub">
                Start with a conversation about your canyon, your timing, and what the market means for you. Free
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
