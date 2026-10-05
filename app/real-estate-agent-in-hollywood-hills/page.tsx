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
import Faq from "../components/home/Faq";
import { SITE_URL, SITE_NAME, AGENT, abs } from "@/lib/site";

const PATH = "/real-estate-agent-in-hollywood-hills";

const TITLE = "Real Estate Agent in Hollywood Hills | Knows Every View";
const DESCRIPTION =
  "Not all Hollywood Hills views are priced the same. Andrew Liberty, a real estate agent in Hollywood Hills, knows which holds value.";

const HERO_SUB =
  "Andrew Liberty helps you buy, sell, or invest in Hollywood Hills, where views, privacy, and architecture matter as much as price.";

const HERO_IMG = "/images/hollywood-hills.jpg";

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
    images: [{ url: HERO_IMG, width: 900, height: 562, alt: "Hollywood Hills, Los Angeles" }],
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
    body: "Every home in Hollywood Hills is different. Andrew helps you find the right one and make a smart offer, view and all.",
    ctaLabel: "Start Home Search",
    href: "/home-search?area=hollywood-hills",
  },
  {
    title: "Sell a Home",
    body: "Selling here means showing off the view and the design, not just the square footage. Andrew knows how to make your home stand out.",
    proof: "Priced on the view and the lot, not a formula",
    ctaLabel: "Get Home Value",
    href: "#valuation",
  },
  {
    title: "Invest Strategically",
    body: "Hollywood Hills homes hold their value well. Andrew looks at the real numbers before recommending any investment.",
    ctaLabel: "Explore Opportunities",
    href: "/contact",
  },
];

const BIO = [
  "I work throughout the Hollywood Hills, where every home is different, from architectural landmarks to hillside view lots. I'm a REALTOR® and Certified Real Estate Negotiation Expert with a background in commercial real estate, which gives me a sharp eye for value on any property, luxury or otherwise.",
  "Clients often look for the most experienced real estate agent in Hollywood Hills when the stakes are this high, and that experience comes from years of pricing, marketing, and negotiating homes in this specific market. I'm hands-on and straightforward, and I make sure my clients feel confident at every step, whether they're buying their first home or investing in a luxury property.",
];

const NEARBY = [
  {
    coords: "Los Angeles · 90046",
    name: "Laurel Canyon",
    desc: "Just over the ridge, with the same quiet, tucked-away feel and even more privacy.",
    img: "/images/laurel-canyon.jpg",
    href: "/real-estate-agent-in-laurel-canyon",
  },
  {
    coords: "Los Angeles · 91604",
    name: "Studio City",
    desc: "Down the hill and a different pace entirely, walkable, lively, and close to everything.",
    img: "/images/studio-city.jpg",
    href: "/real-estate-agent-in-studio-city",
  },
  {
    coords: "Los Angeles · 91403",
    name: "Sherman Oaks",
    desc: "A bit further into the Valley, but a market I work often enough to know well.",
    img: "/images/sold-sherman-oaks.jpg",
    href: "/real-estate-agent-in-sherman-oaks",
  },
];

const FAQS = [
  {
    q: "What's it like buying a home in the Hollywood Hills?",
    a: "Hollywood Hills homes vary a lot, from mid-century architectural gems to newer builds with sweeping views. Buyers should expect a wider price range and more variation in lot size, access, and privacy than in a typical neighborhood.",
  },
  {
    q: "Are Hollywood Hills homes a good investment?",
    a: "Yes, generally. Homes with strong views, unique architecture, or good access tend to hold their value well and appeal to a steady pool of luxury buyers, even when the broader market slows down.",
  },
  {
    q: "Why do Hollywood Hills homes vary so much in price?",
    a: "Price depends heavily on the view, lot access, privacy, and architectural style. Two homes on the same street can differ significantly in value based on these factors alone, more so than in most neighborhoods.",
  },
  {
    q: "Do I need a specialized agent for hillside properties?",
    a: "It helps. Hillside homes come with unique factors like geological reports, access roads, and view easements that a general agent may not deal with often. Local experience with these details can prevent costly surprises.",
  },
  {
    q: "How long does it take to sell a home in the Hollywood Hills?",
    a: "It varies more than in flatland neighborhoods, since Hollywood Hills homes appeal to a smaller, more specific buyer pool. Well-priced, well-marketed homes with strong views or architecture tend to move faster.",
  },
  {
    q: "What should I know before selling a Hollywood Hills home?",
    a: "Marketing matters more here. Buyers are often paying for the view, the design, and the lifestyle, not just square footage, so professional photography and smart positioning can significantly affect the final price.",
  },
];

export default function HollywoodHillsPage() {
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
                { "@type": "ListItem", position: 3, name: "Hollywood Hills", item: abs(PATH) },
              ],
            },
            {
              "@type": "WebPage",
              "@id": abs(PATH),
              url: abs(PATH),
              name: TITLE,
              description: DESCRIPTION,
              primaryImageOfPage: abs(HERO_IMG),
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
          ],
        }}
      />

      {/* ============================ HERO ============================ */}
      <section className="nb-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="nb-hero-bg" src={HERO_IMG} alt="" aria-hidden="true" fetchPriority="high" />
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
            <span aria-current="page">Hollywood Hills</span>
          </nav>

          <div className="nb-hero-copy">
            <p className="eyebrow eyebrow-light">Hollywood Hills · Compass</p>
            <h1 className="nb-hero-title">
              Real Estate Agent in Hollywood Hills
              <br />
              <em>Who Knows the Views and the Value</em>
            </h1>
            <p className="nb-hero-sub">{HERO_SUB}</p>
            <div className="nb-hero-ctas">
              <a href="#valuation" className="btn btn-primary btn-magnetic">
                <span>Get Your Hollywood Hills Home Value</span>
                <ArrowRight />
              </a>
              {/* btn-secondary is inked for light sections and disappears on
                  the hero photo; btn-ghost-light is the on-dark variant. */}
              <a href="/home-search?area=hollywood-hills" className="btn btn-ghost-light">
                Browse Hollywood Hills Listings
              </a>
            </div>
          </div>
        </div>
      </section>

      <WhatsTheMove
        eyebrow="Start Here"
        title="What’s the Move?"
        sub="A clearer path forward starts with the right first step."
        cards={MOVE_CARDS}
      />

      {/* The brief heads this one "Andrew Liberty", not "Meet Andrew Liberty". */}
      <MeetAndrew
        title="Andrew Liberty"
        bio={BIO}
        imageAlt={`${AGENT.name}, Hollywood Hills real estate agent`}
      />

      {/* Self-hiding: renders only once this neighborhood has closings in
          the feed. See lib/areas.ts for how a listing is placed. */}
      <RecentlySold
        area="hollywood-hills"
        title="Recently Sold in the Hollywood Hills"
        subtitle="Closings up on the hill, straight from the MLS feed."
      />

      <Neighborhoods
        title="Not Far From Hollywood Hills"
        sub="A couple of neighboring spots I know just as well."
        hoods={NEARBY}
      />

      {/* Valuation ahead of the process block, which is the order the brief
          sets for this page — the other neighborhood pages run it the other
          way round. */}
      <Valuation
        eyebrow="Free & Confidential"
        title="Know Your Hollywood Hills Home’s Value"
        sub="Automated estimates often get hillside homes wrong. Andrew Liberty reviews your property personally, factoring in the view, the lot, and what's actually selling nearby, so you get a number you can trust."
      />

      <Process
        title="How I Work With Clients"
        sub="From a free consultation to strategy, negotiation, closing, and advice after the sale, every client goes through the same clear, six-step process. No surprises, no guesswork."
        ctaLabel="See the Full Process"
        ctaHref="/#process"
      />

      <Faq title="Frequently Asked Questions" faqs={FAQS} />
    </>
  );
}
