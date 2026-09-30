import type { Metadata } from "next";
import { ArrowRight } from "../components/icons";
import Valuation from "../components/home/Valuation";
import Faq from "../components/home/Faq";

export const metadata: Metadata = {
  title: "Home Valuation in Los Angeles | Free & Accurate",
  description:
    "Get a free home valuation for your Los Angeles home in just a few minutes. Real comps, real numbers, reviewed by Andrew himself, not just an algorithm.",
  alternates: { canonical: "/home-valuation" },
};

const FAQS = [
  {
    q: "What is a home valuation?",
    a: "A home valuation is an estimate of what your property is currently worth in the market. It looks at factors like recent comparable sales, location, size, and condition, and it's commonly used for selling, refinancing, or general financial planning.",
  },
  {
    q: "How is the valuation of my home calculated?",
    a: "A home valuation is calculated by comparing your property to recently sold homes nearby with similar size, condition, and features. Each comparable sale gets adjusted up or down based on how it differs from your home, and those adjustments are combined to estimate current market value.",
  },
  {
    q: "How accurate is the online home valuation?",
    a: "Online home valuations are a solid starting estimate, but they rely on public data and algorithms, so they can miss details specific to your home, like recent upgrades or unique features. For a more precise number, a Comparative Market Analysis or professional appraisal is a better option.",
  },
  {
    q: "Is an online home valuation the same as an appraisal?",
    a: "No. An online home valuation gives you an estimate based on data and comparable sales. An appraisal is a formal, in-person evaluation by a licensed professional, and it's typically required by mortgage lenders for purchases and refinances.",
  },
  {
    q: "How often should I get my home valued?",
    a: "Once a year is a good rule of thumb, even if you have no plans to sell. Market conditions, interest rates, and neighborhood changes can shift your home's value more than most homeowners expect.",
  },
  {
    q: "Does a home valuation cost money?",
    a: "An online or agent-provided home valuation is typically free. A formal appraisal usually comes with a fee paid to a licensed appraiser, and it's often required for a mortgage or refinance.",
  },
  {
    q: "What factors affect my home's valuation the most?",
    a: "Location, recent comparable sales, square footage, condition, and current market demand are the biggest factors. Renovations can help too, but only when they match what buyers in your specific neighborhood actually expect.",
  },
  {
    q: "Can I use a home valuation to negotiate a lower property tax assessment?",
    a: "Yes, in some cases. If your valuation comes in significantly lower than your county's tax assessment, it can support an appeal. Local rules and evidence requirements vary by county, so it's worth checking with your assessor's office first.",
  },
];

const METHODS = [
  {
    tag: "Market analysis",
    title: "Comparative Market Analysis",
    body: "A Comparative Market Analysis (CMA) is the tool a real estate agent uses to estimate your home's value. We find recently sold homes as similar and as close to yours as possible, usually three strong comparables, then analyze the differences between each comp and your home. Each comp's price is adjusted to reflect what it would sell for if it were identical to your home in today's market.",
  },
  {
    tag: "Professional opinion",
    title: "Appraisals",
    body: "An appraisal is an unbiased home valuation based on a licensed professional's opinion, typically required by mortgage companies for purchases and refinances. A licensed appraiser visits the property and inspects both the interior and exterior condition, measures the home, and notes key features, upgrades, and any needed repairs. They compare the property to recent, similar sales in the area and compile a formal report that includes a building sketch, a map of comparable sales, and photos.",
  },
];

const WHY = [
  {
    num: "01",
    title: "Refinancing",
    body: "A home valuation determines how much you can borrow when refinancing. Conventional cash-out refinances typically cap at 80% of your home's value, while VA loans allow more, sometimes up to 100%, with no minimum equity requirement. The more equity you have, the better your refinance terms.",
  },
  {
    num: "02",
    title: "Qualifying for credit",
    body: "A valuation determines your eligibility for a Home Equity Line of Credit (HELOC). Most lenders require at least 20% equity in your home to qualify, and your valuation is used directly by the lender to calculate that equity — higher equity can also mean better rates and terms on the credit line.",
  },
  {
    num: "03",
    title: "Planning ahead",
    body: "Home values shift with the market, interest rates, and neighborhood changes. Checking your valuation once a year helps you track real equity growth over time and prepares you to act quickly on a job relocation, inheritance decision, or unexpected need for cash — you don't need to be selling to benefit from knowing your number.",
  },
  {
    num: "04",
    title: "Home improvements",
    body: "A valuation gives you a baseline before you spend, so you can tell whether a renovation is actually worth the cost. It shows your home's current value and helps you avoid over-improving beyond what buyers in your neighborhood will pay for. Compared against ROI data — minor kitchen remodels return 96–113% at resale, while major upscale remodels return only about 40% — a valuation tells you where your home already stands. Without it, you're guessing whether a project will pay off at all.",
  },
];

export default function HomeValuationPage() {
  return (
    <div className="val-page">
      {/* ============ HERO ============ */}
      <section className="val-hero">
        <div className="container">
          <h1 className="val-hero-title">Free Home Valuation in Los Angeles</h1>
          <p className="val-hero-sub">
            Enter your address to get a free, no-obligation home valuation for your Los Angeles home.
            Andrew Liberty reviews every valuation using recent comparable sales in your neighborhood.
          </p>
        </div>
      </section>

      {/* ============ VALUATION FORM ============ */}
      {/* The same form as the homepage. It replaced an address-only search bar
          that showed a thank-you message but never sent the request anywhere,
          so every valuation asked for through it was lost. */}
      <Valuation />

      {/* ============ A VALUATION BUILT ON YOUR NEIGHBORHOOD ============ */}
      <section className="section">
        <div className="container val-worth-grid">
          <div className="val-worth-media reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/valuation-interior.jpg" alt="Los Angeles home interior" loading="lazy" />
          </div>
          <div className="val-worth-copy reveal" data-reveal-delay={100}>
            <p className="eyebrow">Knowledge, not guesswork</p>
            <h2 className="section-title">A Valuation Built on Your Actual Neighborhood</h2>
            <p className="val-lead">
              Automated online estimates rely on broad, citywide data, which often gets your property
              value wrong for your specific street or neighborhood.
            </p>
            <p className="val-body" style={{ marginBottom: 4 }}>
              Our approach is different:
            </p>
            <ul className="val-checklist">
              <li>Based on recent, comparable sales specific to your area of Los Angeles</li>
              <li>Reviewed personally by Andrew, not just generated by an algorithm</li>
              <li>Comes with context on how your number was calculated, not just a figure</li>
              <li>Can be followed up with a full Comparative Market Analysis or a licensed appraisal for even more precision</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============ HOW WE CALCULATE YOUR HOME'S VALUE ============ */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">How it&rsquo;s done</p>
            <h2 className="section-title">How We Calculate Your Home&rsquo;s Value</h2>
          </div>
          <div className="methods-grid">
            {METHODS.map((m, i) => (
              <article className="method-card reveal" key={m.title} data-reveal-delay={i * 100}>
                <span className="method-tag">{m.tag}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY A VALUATION MATTERS ============ */}
      <section className="section val-why">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">When you&rsquo;ll need one</p>
            <h2 className="section-title">Why a Home Valuation Matters</h2>
            <p className="section-sub">Situations where knowing your home&rsquo;s value pays off.</p>
          </div>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <article className="why-card reveal" key={w.num} data-reveal-delay={i * 80}>
                <span className="why-num">{w.num}</span>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section">
        <div className="container val-final-inner">
          <h2 className="reveal">Ready for your number?</h2>
          <p className="reveal" data-reveal-delay={60}>
            Get a free, no-obligation valuation and a local expert&rsquo;s read on your home — usually
            back to you within the hour.
          </p>
          <div className="val-final-ctas reveal" data-reveal-delay={120}>
            <a href="#valuation" className="btn btn-primary btn-magnetic">
              <span>Unlock Your Free Valuation</span>
              <ArrowRight />
            </a>
            <a href="https://wa.me/13107090581" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* ============ KNOW BEFORE YOU ASK ============ */}
      {/* Last on the page. The shared Faq component also emits the matching
          FAQPage structured data from this same array. */}
      <Faq title="Know Before You Ask" faqs={FAQS} />
    </div>
  );
}
