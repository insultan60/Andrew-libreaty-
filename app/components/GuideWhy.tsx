import Link from "next/link";
import type { ReactNode } from "react";

/**
 * "Why Choose Andrew Liberty" for the neighbourhood guides: brand teal with
 * three white proof cards and gold icons, as on Studio City. Styles are the
 * .lcn-why rules in neighborhood-guide.css, so the page must sit inside
 * .lcn-page.
 */

const svg = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

const ICONS = {
  pin: (
    <svg {...svg}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
  ),
  chart: (
    <svg {...svg}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>
  ),
  shake: (
    <svg {...svg}><path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" /><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2.8 2.8 0 0 0-4 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a4.8 4.8 0 0 1 5.7-.8l.5.3a3 3 0 0 0 2 .4H21" /><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1.4 1.4 0 0 0 2-2M3 4h8" /></svg>
  ),
  hills: (
    <svg {...svg}><path d="m2 20 6.5-11 4 6.5L15.5 11 22 20z" /><circle cx="17" cy="5.5" r="1.8" /></svg>
  ),
  building: (
    <svg {...svg}><path d="M3 21h18M5 21V5l7-2v18M12 9h7v12" /><path d="M8 8h1M8 12h1M8 16h1M15 13h1M15 17h1" /></svg>
  ),
  gem: (
    <svg {...svg}><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M2 9h20M12 21 8 9l4-6 4 6z" /></svg>
  ),
};

export type WhyIcon = keyof typeof ICONS;
export type WhyPoint = { icon: WhyIcon; title: string; text: string };

export default function GuideWhy({
  subline,
  intro,
  points,
  meetLink = true,
}: {
  /** Short line under the heading, e.g. "Your Laurel Canyon Realtor for…". */
  subline?: string;
  intro: ReactNode;
  points: WhyPoint[];
  /** False leaves Schedule a Consultation as the only button. */
  meetLink?: boolean;
}) {
  return (
    <section className="lcn-section lcn-why" id="why-andrew">
      <div className="container">
        <div className="lcn-head lcn-head-center">
          <p className="lcn-eyebrow">Why Andrew</p>
          <h2 className="lcn-title">
            Why Choose <em>Andrew Liberty</em>
          </h2>
          {subline && <p className="lcn-why-subline">{subline}</p>}
          <p className="lcn-sub">{intro}</p>
        </div>
        <div className="lcn-why-grid">
          {points.map((p) => (
            <div className="lcn-why-card" key={p.title}>
              <span className="lcn-why-icon">{ICONS[p.icon]}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
        <div className="lcn-ctas lcn-why-ctas">
          <a href="https://wa.me/13107090581" target="_blank" rel="noopener noreferrer" className="lcn-btn lcn-btn-light">
            Schedule a Consultation
          </a>
          {meetLink && (
            <Link href="/team/andrew-liberty" className="lcn-btn lcn-btn-outline-light">
              Meet Andrew
            </Link>
          )}
        </div>
        <p className="lcn-why-license">
          Andrew Ruric Liberty II · CA DRE# 01965696 | Compass California, Inc. · CA DRE# 01991628
        </p>
      </div>
    </section>
  );
}
