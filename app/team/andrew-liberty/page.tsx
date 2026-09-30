import type { Metadata } from "next";
import { ArrowRight } from "../../components/icons";
import {
  SmsIcon, LocationIcon, StarIcon, ShieldTickIcon, ShareIcon,
  FacebookIcon, InstagramIcon, WhatsappIcon, LinkedInIcon, CompassIcon,
} from "../../components/vuesax";

export const metadata: Metadata = {
  title: "Andrew Liberty — Founder & Lead Agent | Andrew Liberty Team",
  description:
    "Andrew Liberty is a Los Angeles based REALTOR® and certified Real Estate Negotiation Expert, blending strategy and real-world experience to help clients move forward with clarity.",
  alternates: { canonical: "/team/andrew-liberty" },
};

const SPECIALTIES = ["Luxury Residential", "Historic Estates", "Relocation"];
const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/andrew.liberty.90?mibextid=wwXIfr", Icon: FacebookIcon },
  { label: "WhatsApp", href: "https://wa.me/13107090581", Icon: WhatsappIcon },
  { label: "Instagram", href: "https://www.instagram.com/iamandrewliberty?igsi=cnZ3c3g4dmxsdWdu", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/andrew-liberty-7768431a9", Icon: LinkedInIcon },
  { label: "Compass agent profile", href: "https://www.compass.com/agents/andrew-liberty/", Icon: CompassIcon },
  { label: "Google Reviews", href: "https://share.google/sbU7WzKUX9hpNJfOj", Icon: StarIcon },
];

export default function AndrewLibertyPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="ag-hero">
        <div className="ag-hero-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/team/IMG-42.png" alt="Andrew Liberty, Founder & Lead Agent" loading="eager" />
        </div>
        <div className="container ag-hero-inner">
          <div className="ag-hero-copy">
            <h1 className="ag-hero-name">Andrew Liberty</h1>
            <p className="ag-hero-role">Founder &amp; Lead Agent</p>
            <p className="ag-hero-bio">
              Andrew Liberty is a Los Angeles based REALTOR® and certified Real Estate Negotiation
              Expert who brings a strong mix of strategy and real-world experience to his work. With a
              background in commercial real estate, he has a sharp eye for value and opportunity —
              whether that&rsquo;s a single-family home, an income property, or a development play.
            </p>
            <div className="ag-hero-ctas">
              <a href="https://wa.me/13107090581" target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-magnetic">
                <span>Schedule a Call</span>
                <ArrowRight />
              </a>
              <a href="/contact" className="btn btn-outline">
                <span>Send a Message</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GET IN TOUCH ============ */}
      <section className="ag-touch">
        <div className="container">
          <div className="ag-touch-head">
            <p className="eyebrow">Get In Touch</p>
            <h2 className="ag-touch-name">Andrew Liberty</h2>
            <p className="ag-touch-sub">Founder &amp; Lead Agent — DRE# 01965696 · Compass</p>
            <div className="ag-touch-actions">
              <a href="https://wa.me/13107090581" target="_blank" rel="noopener noreferrer" className="ag-pill ag-pill-solid">
                <WhatsappIcon />
                <span>(310) 709-0581</span>
              </a>
              <a
                href="mailto:andrew.liberty@compass.com"
                className="ag-pill ag-pill-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SmsIcon />
                <span>andrew.liberty@compass.com</span>
              </a>
            </div>
          </div>

          <div className="ag-cards">
            <article className="ag-card">
              <span className="ag-card-ic"><LocationIcon /></span>
              <p className="ag-card-label">Office</p>
              <p className="ag-card-text">12001 Ventura Pl Ste 100, Studio City, CA 91604</p>
            </article>

            <article className="ag-card">
              <span className="ag-card-ic"><ShieldTickIcon /></span>
              <p className="ag-card-label">License</p>
              <p className="ag-card-text">License Number #01965696</p>
            </article>

            <article className="ag-card">
              <span className="ag-card-ic"><StarIcon /></span>
              <p className="ag-card-label">Specialties</p>
              <div className="ag-tags">
                {SPECIALTIES.map((s) => (
                  <span className="ag-tag" key={s}>{s}</span>
                ))}
              </div>
            </article>

            <article className="ag-card">
              <span className="ag-card-ic"><ShareIcon /></span>
              <p className="ag-card-label">Connect</p>
              <div className="ag-socials">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a className="ag-social" key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </article>

            <article className="ag-card ag-card--wide">
              <span className="ag-card-ic"><StarIcon /></span>
              <p className="ag-card-label">Recognition</p>
              <div className="ag-awards">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ag-award-img" src="/awards/realtrends-verified.png" alt="RealTrends Verified" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="ag-award-img ag-award-img--tall"
                  src="/awards/la-magazine-all-stars.png"
                  alt="Los Angeles Magazine Real Estate All-Stars"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ GET TO KNOW ============ */}
      <section className="ag-story">
        <div className="container">
          <div className="ag-story-head">
            <p className="eyebrow">The Story Behind the Agent</p>
            <h2 className="ag-story-title">Get to Know Andrew Liberty</h2>
          </div>

          <div className="ag-story-cols">
            <div>
              <p>
                Andrew Liberty is a Los Angeles based REALTOR® and certified Real Estate Negotiation
                Expert who brings a strong mix of strategy and real-world experience to his work. With
                a background in commercial real estate, he has a sharp eye for value and opportunity,
                whether that is a single-family home, an income property, or a development play.
              </p>
              <p>
                He works with both investors and homebuyers and tends to take on the role of advisor
                just as much as agent. Andrew is hands-on, thoughtful, and focused on helping clients
                make smart decisions without overcomplicating the process. He does the research, looks
                at the numbers, and makes sure his clients feel confident every step of the way.
              </p>
            </div>
            <div>
              <p>
                Moving into residential real estate was a deliberate shift. He wanted to be more
                involved with people and be part of something more personal. For Andrew, it is not
                just about closing deals, it is helping clients build something meaningful for
                themselves and their families.
              </p>
              <p>
                His background in the military and entertainment industry shaped a lot of how he works
                today. He is disciplined, easy to talk to, and knows how to stay calm and focused when
                things get complicated.
              </p>
              <p>
                Originally from the East Coast, Andrew has been in Los Angeles for over twenty years and
                now calls Studio City home. When he is not working, he is usually spending time with his
                wife Gloria, their kids Cross, Mei, and Sun, their dog Eddie, and their three cats.
              </p>
            </div>
          </div>

          <figure className="ag-quote">
            <span className="ag-quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="ag-quote-text">
              &ldquo;We do not sell houses. We help people move forward.&rdquo;
            </blockquote>
            <figcaption className="ag-quote-by">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/team/IMG-42.png" alt="Andrew Liberty" />
              <span>
                <span className="ag-quote-name">Andrew Liberty</span>
                <br />
                <span className="ag-quote-role">Founder &amp; Lead Agent</span>
              </span>
            </figcaption>
          </figure>
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
              <a href="/contact" className="btn btn-gold btn-magnetic">
                <span>Contact Us</span>
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
