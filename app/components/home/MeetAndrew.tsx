import { ArrowRight } from "../icons";
import { InstagramIcon, LinkedInIcon, YoutubeIcon, FacebookIcon, CompassIcon } from "../vuesax";
import { AGENT } from "@/lib/site";

/* Built from AGENT.sameAs so these links are the same profiles the
   structured data names — one list, not two that can drift apart. */
const SOCIAL_ICONS = [
  { match: "instagram.com", label: "Instagram", Icon: InstagramIcon },
  { match: "linkedin.com", label: "LinkedIn", Icon: LinkedInIcon },
  { match: "youtube.com", label: "YouTube", Icon: YoutubeIcon },
  { match: "facebook.com", label: "Facebook", Icon: FacebookIcon },
  { match: "compass.com", label: "Compass agent profile", Icon: CompassIcon },
];
const SOCIALS = AGENT.sameAs.flatMap((href) => {
  const icon = SOCIAL_ICONS.find((i) => href.includes(i.match));
  return icon ? [{ ...icon, href }] : [];
});

const DEFAULT_BIO = [
  "I’m a Los Angeles based REALTOR® and Certified Real Estate Negotiation Expert who combines strategic thinking with real-world experience. With a background in commercial real estate, I bring a sharp eye for value and opportunity, whether that is a single-family home, an income property, or a development play.",
  "I work with both investors and homebuyers, often taking on the role of advisor as much as agent. I’m hands-on, thoughtful, and focused on helping clients make smart decisions without overcomplicating the process. I do the research, look at the numbers, and make sure my clients feel confident every step of the way.",
];

type Props = {
  title?: string;
  /** One <p> per entry. Neighborhood pages pass localised copy. */
  bio?: string[];
  imageAlt?: string;
};

export default function MeetAndrew({
  title = "Meet Andrew Liberty",
  bio = DEFAULT_BIO,
  imageAlt = "Andrew Liberty, Studio City real estate agent",
}: Props = {}) {
  return (
    <section className="section section-about" id="about">
      <div className="container about-grid">
        <div className="about-visual reveal">
          <div className="about-image-card tilt-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/andrew-liberty.jpg" alt={imageAlt} loading="lazy" />
          </div>
          <div className="about-image-backdrop" aria-hidden="true"></div>
          <div className="about-experience-chip">
            <span className="chip-number">RENE</span>
            <span className="chip-label">Certified Negotiation Expert</span>
          </div>
        </div>

        <div className="about-copy">
          <h2 className="section-title reveal">{title}</h2>
          <p className="about-credentials reveal" data-reveal-delay="60">
            Andrew Ruric Liberty II | CA DRE# 01965696
            <br />
            Compass California, Inc. | CA DRE# 01991628
          </p>
          {bio.map((para, i) => (
            <p key={i} className="about-bio reveal" data-reveal-delay={120 + i * 40}>
              {para}
            </p>
          ))}

          <ul className="credential-chips" aria-label="Credentials">
            {["REALTOR®", "Real Estate Negotiation Expert", "Compass · California", "Residential · Investment · Development"].map(
              (label, i) => (
                <li key={label} className="reveal" data-reveal-delay={240 + i * 70}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{label}</span>
                </li>
              )
            )}
          </ul>

          <div className="about-awards reveal" data-reveal-delay="270">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="about-award-img" src="/awards/realtrends-verified.png" alt="RealTrends Verified" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="about-award-img about-award-img--tall"
              src="/awards/la-magazine-all-stars.png"
              alt="Los Angeles Magazine Real Estate All-Stars"
            />
          </div>

          <div className="about-ctas reveal" data-reveal-delay="300">
            <a href="/contact" className="btn btn-primary btn-magnetic">
              <span>Schedule a Consultation</span>
              <ArrowRight />
            </a>
            <a href="/team/andrew-liberty" className="btn btn-secondary">
              Meet the Team
            </a>
          </div>

          <div className="about-social reveal" data-reveal-delay="340" aria-label="Andrew Liberty on social media">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
