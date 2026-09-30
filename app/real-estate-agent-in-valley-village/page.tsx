import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "../components/icons";
import JsonLd from "../components/JsonLd";
import WhatsTheMove from "../components/home/WhatsTheMove";
import MeetAndrew from "../components/home/MeetAndrew";
import RecentlySold from "../components/home/RecentlySold";
import Process from "../components/home/Process";
import Neighborhoods from "../components/home/Neighborhoods";
import Valuation from "../components/home/Valuation";
import FinalCta from "../components/home/FinalCta";
import Faq from "../components/home/Faq";
import { SITE_URL, SITE_NAME, AGENT, abs } from "@/lib/site";

const PATH = "/real-estate-agent-in-valley-village";

const TITLE = "Real Estate Agent in Valley Village | Quiet Streets Expert";
const DESCRIPTION =
  "Valley Village's quiet streets don't show up in a citywide search. Andrew Liberty is a real estate agent in Valley Village who knows every block.";

const HERO_SUB =
  "I am a real estate agent in Valley Village who knows its schools, its streets, and what your home is really worth. Whether you are buying your first home here or getting ready to sell, I will walk you through it step by step. Let's talk.";

/* The neighborhood's own photo is the square sold-listing shot; it crops fine
   behind the hero, but a wide Valley Village image would serve better here and
   as the share card. */
const HERO_IMG = "/images/sold-valley-village.jpg";

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
    images: [
      {
        url: HERO_IMG,
        width: 800,
        height: 800,
        alt: "Valley Village, Los Angeles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [HERO_IMG],
  },
};

const MOVE_CARDS = [
  {
    title: "Buy a Home",
    body: "Valley Village draws families for the schools and the quiet streets. I will help you find a home that actually fits how you want to live.",
    ctaLabel: "Start Home Search",
    href: "/home-search",
  },
  {
    title: "Sell a Home",
    body: "Good schools and tree-lined blocks are Valley Village's biggest draw. I price and position your home to reach the families looking for exactly that.",
    proof: "Priced on real Valley Village comps, not a formula",
    ctaLabel: "Get Home Value",
    href: "#valuation",
  },
  {
    title: "Invest Strategically",
    body: "Valley Village offers steady, dependable demand without the price tag of its flashier neighbors. I run the real numbers before recommending any investment.",
    ctaLabel: "Explore Opportunities",
    href: "/contact",
  },
];

const BIO = [
  "I work throughout Valley Village, where good schools and quiet, tree-lined streets matter more to most buyers than anything flashy. I am a REALTOR® and Certified Real Estate Negotiation Expert with a background in commercial real estate, which gives me a sharp eye for value on any property.",
  "As a real estate agent in Valley Village, I have learned that steady, well-kept homes here hold their value in ways that surprise people looking from outside the area.",
  "I am hands-on and straightforward, backed by RealTrends Verified status and recognition as a Los Angeles Magazine Real Estate All-Star, and I make sure you feel confident at every step.",
];

const NEARBY = [
  {
    coords: "Los Angeles · 91604",
    name: "Studio City",
    desc: "Right next door, with a walkable village and a livelier pace.",
    img: "/images/studio-city.jpg",
    href: "/real-estate-agent-in-studio-city",
    cta: "Explore Studio City",
  },
  {
    coords: "Los Angeles · 91403",
    name: "Sherman Oaks",
    desc: "Just around the corner, with Ventura Boulevard's shops and restaurants close by.",
    img: "/images/sold-sherman-oaks.jpg",
    href: "/real-estate-agent-in-sherman-oaks",
    cta: "Explore Sherman Oaks",
  },
];

const FAQS = [
  {
    q: "What should I look for in a real estate agent in Valley Village?",
    a: "Look for someone who knows the local schools, recent comparable sales, and specific streets, not just citywide averages. Proven experience with homes like yours matters more than a big client list.",
  },
  {
    q: "Is it a good time to buy a home in Valley Village?",
    a: "Recent data shows home prices per square foot have softened slightly compared to last year, which can give buyers more room to negotiate. Timing still depends on your personal goals.",
  },
  {
    q: "Is it a good time to sell a home in Valley Village?",
    a: "Yes, for many sellers. Even with a slight dip in price per square foot, well-priced homes in strong school zones like Colfax Charter continue to attract serious buyers.",
  },
  {
    q: "Are the schools good in Valley Village?",
    a: "Yes. Valley Village is known for strong schools, especially the Colfax Charter district, which is a major reason families target this neighborhood specifically.",
  },
  {
    q: "Is Valley Village a walkable neighborhood?",
    a: "Yes, reasonably. Valley Village has a Walk Score of 77, meaning most errands can be accomplished on foot, which is high for a Los Angeles Valley neighborhood.",
  },
  {
    q: "What is the median home price in Valley Village?",
    a: "Recent data puts the median home value in Valley Village at around $1.27 million, notably higher than the wider Los Angeles County median.",
  },
];

export default function ValleyVillagePage() {
  return (
    <>
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
              "@id": abs(PATH),
              url: abs(PATH),
              name: TITLE,
              description: DESCRIPTION,
              primaryImageOfPage: abs(HERO_IMG),
              about: {
                "@type": "Place",
                name: "Valley Village, Los Angeles, CA",
              },
              provider: { "@id": `${SITE_URL}/#agent` },
            },
            {
              "@type": "Service",
              serviceType: "Real estate agent",
              provider: { "@id": `${SITE_URL}/#agent` },
              areaServed: { "@type": "Place", name: "Valley Village, Los Angeles, CA" },
              url: abs(PATH),
            },
          ],
        }}
      />

      {/* ============================ HERO ============================ */}
      <section className="nb-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="nb-hero-bg"
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
        />
        <div className="container">
          <nav className="nb-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="nb-crumb-sep" aria-hidden="true">
              /
            </span>
            <Link href="/neighborhoods">Neighborhoods</Link>
            <span className="nb-crumb-sep" aria-hidden="true">
              /
            </span>
            <span aria-current="page">Valley Village</span>
          </nav>

          <div className="nb-hero-copy">
            <p className="eyebrow eyebrow-light">Valley Village · Compass</p>
            <h1 className="nb-hero-title">
              Real Estate Agent in Valley Village
              <br />
              <em>Who Knows Its Quiet Streets</em>
            </h1>
            <p className="nb-hero-sub">{HERO_SUB}</p>
            <div className="nb-hero-ctas">
              <a href="#valuation" className="btn btn-primary btn-magnetic">
                <span>Get Your Valley Village Home Value</span>
                <ArrowRight />
              </a>
              {/* btn-secondary is inked for light sections and disappears on
                  the hero photo; btn-ghost-light is the on-dark variant. */}
              <a href="/home-search" className="btn btn-ghost-light">
                Browse Valley Village Listings
              </a>
            </div>
          </div>
        </div>
      </section>

      <WhatsTheMove
        eyebrow="Start Here"
        title="What’s the Move?"
        sub="Buying, selling, or investing on these streets. Here is where to begin."
        cards={MOVE_CARDS}
      />

      <MeetAndrew
        title="Meet Andrew Liberty"
        bio={BIO}
        imageAlt={`${AGENT.name}, Valley Village real estate agent`}
      />

      {/* Self-hiding: renders only once this neighborhood has closings in
          the feed. See lib/areas.ts for how a listing is placed. */}
      <RecentlySold
        area="valley-village"
        title="Recently Sold in Valley Village"
        subtitle="Closings on these streets, straight from the MLS feed."
      />

      <Process
        title="How I Work With Clients"
        sub="From a free consultation to strategy, negotiation, closing, and advice after the sale, every client goes through the same clear, six-step process. No surprises, no guesswork."
        ctaLabel="See the Full Process"
        ctaHref="/#process"
      />

      <Neighborhoods
        title="Not Far From Valley Village"
        sub="A couple of neighboring areas I know just as well."
        hoods={NEARBY}
      />

      <Valuation
        eyebrow="Free & Confidential"
        title="Know Your Valley Village Home’s Value"
        sub="Get an instant property valuation and expert guidance from Andrew Liberty, your Valley Village real estate advisor."
      />

      <FinalCta
        title="Ready to Find Your Place in Valley Village?"
        copy="Quiet streets, strong schools, and steady value make Valley Village one of the smartest places to put down roots in the Valley. Whether you're buying your first home or ready to sell, I will help you make the move with confidence."
      />

      <Faq title="Frequently Asked Questions" faqs={FAQS} />
    </>
  );
}
