import type { Metadata } from "next";
import "./bingo.css";

/**
 * Client-only event page: Bingo & Bites, November 2026.
 *
 * Unlisted on purpose. Andrew sends the link to his clients; the public should
 * not find it. So it is in no menu, no footer and not in the sitemap (ROUTES in
 * app/sitemap.ts is an explicit list), and it is noindex/nofollow below.
 *
 * It is deliberately NOT disallowed in robots.ts: a crawler that is blocked
 * from a page never reads its noindex, and a blocked URL that someone links to
 * can still be indexed bare. Crawlable + noindex is what keeps it out.
 *
 * Unlisted is not access control. Anyone the link reaches can open it, the same
 * as the Google Form link itself. If it ever has to be closed, add a passcode.
 *
 * Sign-ups go straight into the client's Google Form, embedded below, so the
 * responses land where they already collect them. The form needs no Google
 * sign-in, which is what lets it load inside the page for everyone.
 *
 * The phone call-to-action bar is switched off here (NO_CTA_BAR in
 * components/SiteChrome.tsx); take the path out of that list too when this
 * folder goes.
 *
 * Once the event has passed, delete this folder.
 */
export const metadata: Metadata = {
  title: "Bingo & Bites — A Thank-You to My Clients",
  description: "A private client event: bingo, bites and a Thanksgiving pie giveaway in Studio City.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const FORM_ID = "1FAIpQLSepTrlUaxjn4XCYgL67GnkwfG_uz8ml5B_Qln8lFq85eRsKdA";
const FORM_EMBED = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform?embedded=true`;
const FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`;
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("The Six Social House, 12650 Ventura Blvd, Studio City, CA");

/* The activity choices offered on the form itself. */
const ACTIVITIES = ["Pumpkin Painting", "Live Music", "Children’s Face Painting", "Craft Corner"];

export default function BingoAndBitesPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="bb-hero">
        <div className="container bb-hero-inner">
          <p className="eyebrow">A Thank-You to My Clients</p>
          <h1 className="bb-title">
            Bingo <em>&amp; Bites</em>
          </h1>
          <p className="bb-sub">
            I&rsquo;m grateful for each of you. As a token of my appreciation, join me for bingo,
            bites &amp; good company.
          </p>
          <a href="#sign-up" className="btn btn-gold">
            <span>Save Your Seat</span>
          </a>
        </div>
      </section>

      {/* ============ DETAILS ============ */}
      <section className="bb-details">
        <div className="container bb-cards">
          <div className="bb-card">
            <p className="bb-card-label">When</p>
            <p className="bb-card-main">Sunday, November 22</p>
            <p className="bb-card-sub">11:00 AM</p>
          </div>
          <div className="bb-card">
            <p className="bb-card-label">Where</p>
            <p className="bb-card-main">The Six Social House</p>
            <p className="bb-card-sub">
              <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
                12650 Ventura Blvd, Studio City
              </a>
            </p>
          </div>
          <div className="bb-card bb-card--pie">
            <p className="bb-card-label">Pie Giveaway</p>
            <p className="bb-card-main">Pie&rsquo;s on me!</p>
            <p className="bb-card-sub">Just in time for Thanksgiving. Reserve your flavor below.</p>
          </div>
        </div>

        <div className="container bb-activities">
          <p className="bb-activities-label">Also on the day</p>
          <ul>
            {ACTIVITIES.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ SIGN-UP FORM ============ */}
      <section className="bb-form" id="sign-up">
        <div className="container bb-form-inner">
          <p className="eyebrow">RSVP</p>
          <h2 className="bb-form-title">Sign up below</h2>
          <p className="bb-form-sub">
            Let me know you&rsquo;re coming, pick your pie, and tell me who you&rsquo;re bringing.
          </p>
          <div className="bb-frame">
            <iframe
              src={FORM_EMBED}
              title="Bingo and Bites sign-up form"
            >
              Loading…
            </iframe>
          </div>
          <p className="bb-fallback">
            Form not loading?{" "}
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer">
              Open it in a new tab
            </a>
            .
          </p>
          <p className="bb-private">
            This invitation is for my clients. Please keep the link between us.
          </p>
        </div>
      </section>
    </>
  );
}
