import type { Metadata } from "next";
import { ArrowRight } from "../components/icons";
import { SmsIcon, LocationIcon, CallIcon } from "../components/vuesax";
import PhoneLink from "../components/PhoneLink";
import ConciergeForm from "./ConciergeForm";

export const metadata: Metadata = {
  title: "Compass Concierge — Andrew Liberty Team | Sell Faster, For More",
  description:
    "Compass Concierge fronts the cost of home improvement services — staging, flooring, painting and more — with zero due until closing, helping you sell faster and for a higher price.",
  alternates: { canonical: "/compass-concierge" },
};

/* ---------- Icons ---------- */
const IcSmart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2a7 7 0 0 0-4 12.7V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.3A7 7 0 0 0 12 2z" /><path d="M9 21h6" /></svg>
);
const IcFast = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
const IcEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
);
const IcEasy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
);
const IcCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
);
const IcClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);

const WHY = [
  { Icon: IcSmart, title: "Smart", text: "Your Compass agent can help you determine which services can deliver the greatest return on your investment." },
  { Icon: IcFast, title: "Fast", text: "The entire process is designed to speed up the work on your home — so you go to market as quickly as possible." },
  { Icon: IcEye, title: "Transparent", text: "No hidden fees and zero due until closing — you always know exactly where things stand." },
  { Icon: IcEasy, title: "Easy", text: "Your Compass agent guides you and settles up with your side throughout the process." },
];

const SERVICES = [
  {
    title: "Repairs & Aesthetics",
    items: ["Fresh paint", "Carpet cleaning & replacement", "Staging", "Deep cleaning", "Landscaping", "Decluttering", "Cosmetic renovations", "Interior & exterior painting"],
  },
  {
    title: "Systems & Structure",
    items: ["HVAC", "Roofing repair", "Moving & storage", "Pest control", "Custom closet work", "Fencing", "Electrical work", "Water heating & plumbing repair"],
  },
  {
    title: "Major Improvements",
    items: ["Kitchen improvements", "Bathroom improvements", "Pool & tennis court services", "Sewer & lateral inspections", "Seller-side inspections & remediation", "100+ other home improvement services"],
  },
];

const STATS = [
  { num: "54%", text: "of homebuyers are willing to pay more for hardwood floors." },
  { num: "$400", text: "potential return for every $100 you invest in staging your home." },
  { num: "53%", text: "of sellers' agents say staging decreases a property's time on market." },
];

const STEPS = [
  { title: "Plan Your Budget", text: "Decide which services can increase your home's value the most and set an authorized budget for the work." },
  { title: "Engage Contractors", text: "When you're ready to start, your Compass agent will be by your side as you engage contractors and services." },
  { title: "Go to Market", text: "Once the transformation is complete, your home goes on the market — polished and ready to impress." },
  { title: "Pay at Close", text: "You'll pay for the services and any applicable fees when you sell the home. There's zero due until closing." },
];

const FAQ = [
  { q: "Are there any services not covered by the program?", a: "Concierge covers a wide range of home improvement services. Your Compass agent can confirm which specific services qualify for your home and market." },
  { q: "What are the fees associated with the Concierge program?", a: "There is zero due until closing. Depending on your state of residence, fees or interest may apply — your agent will walk you through the details before any work begins." },
  { q: "How do I sign up for Compass Concierge?", a: "It's easy — reach out to your Compass agent today to find out how to participate and get started preparing your home for market." },
];

export default function ConciergePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="cc-hero">
        <div className="container">
          <p className="eyebrow">Compass Concierge</p>
          <h1 className="cc-hero-title">Compass Concierge</h1>
          <p className="cc-hero-sub">
            Get fronted for the cost of home improvement services with zero due until closing.
          </p>
          <div className="cc-hero-ctas">
            <a href="#how-it-works" className="btn btn-gold btn-magnetic">
              <span>How It Works</span>
              <ArrowRight />
            </a>
            <a href="#get-started" className="btn btn-outline">
              <span>Get Started</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============ SELL FASTER ============ */}
      <section className="cc-sell">
        <div className="container cc-sell-grid">
          <div>
            <p className="eyebrow">The Hassle-Free Way to Sell</p>
            <h2>Sell your home faster and for a higher price</h2>
            <p>
              Compass Concierge is the hassle-free way to sell your home faster and for a higher price.
              Services like staging, flooring, and painting can dramatically improve a home&rsquo;s sale
              price — and Concierge fronts the cost so you don&rsquo;t have to.
            </p>
            <p>
              Learn how we can help you prepare your home for market with no upfront cost and zero due
              until closing.
            </p>
            <div className="cc-contact-block">
              <p className="cc-contact-name">Andrew Liberty Team</p>
              <p className="cc-contact-line">
                <a href="mailto:andrew.liberty@compass.com" target="_blank" rel="noopener noreferrer">andrew.liberty@compass.com</a> · (310) 709-0581
              </p>
              <p className="cc-contact-line">12001 Ventura Pl Ste 100, Studio City, CA 91604</p>
              <p className="cc-contact-line">Compass California, Inc. · CA DRE# 01991628</p>
            </div>
            <a href="#get-started" className="btn btn-gold btn-magnetic">
              <span>Work With Us</span>
              <ArrowRight />
            </a>
          </div>
          <div className="cc-sell-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/valuation-interior.jpg" alt="Styled interior ready for market" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ============ WHY CONCIERGE ============ */}
      <section className="cc-why-wrap">
        <div className="container">
          <div className="cc-why">
            <p className="eyebrow">Why Concierge</p>
            <h2 className="cc-why-title">A smarter way to prepare your home for sale</h2>
            <p className="cc-why-sub">
              Four reasons sellers choose Compass Concierge to prepare their home before listing.
            </p>
            <div className="cc-why-grid">
              {WHY.map(({ Icon, title, text }) => (
                <article className="cc-why-card" key={title}>
                  <span className="cc-why-ic"><Icon /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ REAL RESULTS ============ */}
      <section className="cc-results">
        <div className="container">
          <p className="eyebrow">Success Stories</p>
          <h2>Real results from real sellers</h2>
          <blockquote className="cc-results-quote">
            <span className="cc-results-mark" aria-hidden="true">&ldquo;</span>
            The thing that was most daunting for me about selling the home was how I would get it to
            market, based on being retired and having limited income. That&rsquo;s where the Compass
            Concierge service was absolutely remarkable.
          </blockquote>
          <p className="cc-results-by">— A Compass Concierge seller, Los Angeles</p>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="cc-services">
        <div className="container">
          <div className="cc-services-head">
            <h2>Everything you need to maximize your sale</h2>
            <p>
              From roof-to-finish touch-ups to major renovations, Concierge covers a wide range of
              services to prepare your home for market.
            </p>
          </div>
          <div className="cc-services-grid">
            {SERVICES.map((col) => (
              <div className="cc-serv-col" key={col.title}>
                <h3>{col.title}</h3>
                <ul className="cc-serv-list">
                  {col.items.map((item) => (
                    <li key={item}><IcCheck />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="cc-stats">
        <div className="container">
          <div className="cc-stats-grid">
            {STATS.map((s) => (
              <div key={s.num}>
                <p className="cc-stat-num">{s.num}</p>
                <p className="cc-stat-text">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="cc-stats-source">Source: National Association of Realtors, 2023</p>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="cc-steps" id="how-it-works">
        <div className="container">
          <div className="cc-steps-head">
            <p className="eyebrow">Step by Step</p>
            <h2>How It Works</h2>
            <p>From planning to closing, we make the Concierge process straightforward and stress-free.</p>
          </div>
          <div className="cc-steps-grid">
            <div className="cc-steps-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/sold-studio-city.jpg" alt="Homeowners planning improvements" loading="lazy" />
            </div>
            <div className="cc-steps-list">
              {STEPS.map((step, i) => (
                <div className="cc-step" key={step.title}>
                  <span className="cc-step-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className="cc-cta-wrap">
        <div className="container">
          <div className="cc-cta">
            <h2>Curious how Compass Concierge can transform your sale?</h2>
            <p>See what a difference this program can make for yourself — get started right here.</p>
            <a href="#get-started" className="btn btn-gold btn-magnetic">
              <span>Get Started Today</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="cc-faq">
        <div className="container">
          <div className="cc-faq-head">
            <p className="eyebrow">FAQ</p>
            <h2>Your Questions, Answered</h2>
          </div>
          <div className="cc-faq-list">
            {FAQ.map((f) => (
              <details className="cc-faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LEGAL ============ */}
      <section className="cc-legal">
        <div className="container">
          <p>
            Compass Concierge fronts the costs of home improvement services with no interest, provided
            the services are billed through Compass Concierge. There is no interest charged on the funds
            Compass fronts to you, subject to certain terms and conditions. The seller remains
            responsible for repaying the cost of all services rendered. Compass is a licensed real estate
            broker and abides by Equal Housing Opportunity laws. All material presented herein is intended
            for informational purposes only. Information is compiled from sources deemed reliable but is
            subject to errors, omissions, changes in condition, prior sale, lease or financing, or
            withdrawal without notice. This is not intended to solicit property already listed. Andrew
            Liberty is a real estate licensee affiliated with Compass. Compass California, Inc. · CA DRE#
            01991628.
          </p>
        </div>
      </section>

      {/* ============ BEYOND THE TRANSACTION ============ */}
      <section className="prop-beyond-wrap">
        <div className="container">
          <div className="prop-beyond reveal">
            <h2>Beyond the Transaction</h2>
            <p>
              Our team brings together real-world experience, thoughtful strategy, and a calm,
              hands-on approach to help clients move with clarity. From homes to investments, we
              focus on smart decisions, not unnecessary complexity.
            </p>
            <div className="prop-beyond-ctas">
              <a href="#get-started" className="btn btn-gold btn-magnetic">
                <span>Contact Us</span>
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GET IN TOUCH ============ */}
      <section className="cc-touch" id="get-started">
        <div className="container cc-touch-grid">
          <div>
            <p className="eyebrow">Get in Touch</p>
            <h2>Ready to get started with Concierge?</h2>
            <p className="cc-touch-intro">
              Reach out to learn how Compass Concierge can help you sell your home faster and for a
              higher price. No obligation — just expert guidance.
            </p>
            <div className="cc-touch-rows">
              <div className="cc-touch-row">
                <span className="cc-touch-row-ic"><CallIcon /></span>
                <div>
                  <p className="cc-touch-row-label">Phone</p>
                  <p className="cc-touch-row-val">
                    <PhoneLink />
                  </p>
                </div>
              </div>
              <div className="cc-touch-row">
                <span className="cc-touch-row-ic"><SmsIcon /></span>
                <div>
                  <p className="cc-touch-row-label">Email</p>
                  <p className="cc-touch-row-val">
                    <a href="mailto:andrew.liberty@compass.com" target="_blank" rel="noopener noreferrer">
                      andrew.liberty@compass.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="cc-touch-row">
                <span className="cc-touch-row-ic"><LocationIcon /></span>
                <div>
                  <p className="cc-touch-row-label">Office</p>
                  <p className="cc-touch-row-val">12001 Ventura Pl Ste 100, Studio City, CA 91604</p>
                </div>
              </div>
              <div className="cc-touch-row">
                <span className="cc-touch-row-ic"><IcClock /></span>
                <div>
                  <p className="cc-touch-row-label">Hours</p>
                  <p className="cc-touch-row-val">Monday – Sunday · 8:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="cc-form-card">
            <h3>Send us a message</h3>
            <ConciergeForm />
          </div>
        </div>
      </section>
    </>
  );
}
