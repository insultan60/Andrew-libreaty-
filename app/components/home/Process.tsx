import type { ReactNode } from "react";
import { ArrowRight } from "../icons";

const STEPS = [
  {
    index: "01",
    title: "Free Consultation",
    body: "A conversation about your goals, timing, and options — no pressure, no jargon.",
  },
  {
    index: "02",
    title: "Strategy & Market Research",
    body: "Data-backed analysis of value, comps, and market conditions before any move is made.",
  },
  {
    index: "03",
    title: "Property Search or Pricing Plan",
    body: "A curated search for buyers — or a precise positioning and pricing plan for sellers.",
  },
  {
    index: "04",
    title: "Negotiation & Due Diligence",
    body: "Certified negotiation expertise protecting your position at every point of leverage.",
  },
  {
    index: "05",
    title: "Closing Support",
    body: "Hands-on coordination through escrow, inspections, and paperwork — start to finish.",
  },
  {
    index: "06",
    title: "Ongoing Advisory",
    body: "Advice on value and improvements long after closing. When the next move makes sense, you’ll hear it from us first.",
  },
];

const DEFAULT_TITLE = (
  <>
    Smart Moves,
    <br />
    Clear Process
  </>
);

type Step = { index: string; title: string; body: string };

type Props = {
  title?: ReactNode;
  steps?: Step[];
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function Process({
  title = DEFAULT_TITLE,
  steps = STEPS,
  sub = "A clear plan from first call to closing. No surprises.",
  ctaLabel = "Book a Strategy Call",
  ctaHref = "/contact",
}: Props = {}) {
  return (
    <section className="section section-process" id="process">
      <div className="container process-grid">
        <div className="process-intro">
          <h2 className="section-title reveal">{title}</h2>
          <p className="section-sub reveal" data-reveal-delay="60">
            {sub}
          </p>
          <div className="process-ctas reveal" data-reveal-delay="120">
            <a href={ctaHref} className="btn btn-primary btn-magnetic">
              <span>{ctaLabel}</span>
              <ArrowRight />
            </a>
          </div>
        </div>

        <ol className="process-timeline">
          {steps.map((step, i) => (
            <li
              key={step.index}
              className="process-step reveal"
              data-reveal-delay={i === 0 ? undefined : i * 80}
            >
              <span className="step-index">{step.index}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
