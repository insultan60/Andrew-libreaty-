import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import PropertyMap from "../[slug]/PropertyMap";
import {
  SmsIcon, LocationIcon, InstagramIcon, FacebookIcon, LinkedInIcon, CompassIcon, StarIcon, WhatsappIcon,
} from "../components/vuesax";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/iamandrewliberty?igsi=cnZ3c3g4dmxsdWdu", Icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/andrew.liberty.90?mibextid=wwXIfr", Icon: FacebookIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/andrew-liberty-7768431a9", Icon: LinkedInIcon },
  { label: "Compass agent profile", href: "https://www.compass.com/agents/andrew-liberty/", Icon: CompassIcon },
  { label: "Google Reviews", href: "https://share.google/sbU7WzKUX9hpNJfOj", Icon: StarIcon },
];

export const metadata: Metadata = {
  title: "Contact — Andrew Liberty Team | Los Angeles Real Estate",
  description:
    "Get in touch with the Andrew Liberty Team — call, email, or send a message about buying, selling, or investing in Los Angeles real estate.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
    <section className="contact-page">
      {/* ============ LEFT: DETAILS ============ */}
      <div className="contact-left">
        <h1 className="contact-heading">Contact Details</h1>
        <p className="contact-team">Andrew Liberty Team</p>

        <div className="contact-list">
          <div className="contact-item">
            <span className="contact-item-ic">
              <WhatsappIcon />
            </span>
            <div>
              <p className="contact-item-label">Phone</p>
              <p className="contact-item-val">
                <a href="https://wa.me/13107090581" target="_blank" rel="noopener noreferrer">(310) 709-0581</a>
              </p>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-item-ic">
              <SmsIcon />
            </span>
            <div>
              <p className="contact-item-label">Email</p>
              <p className="contact-item-val">
                <a href="mailto:andrew.liberty@compass.com" target="_blank" rel="noopener noreferrer">andrew.liberty@compass.com</a>
              </p>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-item-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </span>
            <div>
              <p className="contact-item-label">Open Hours</p>
              <p className="contact-item-val">
                Monday – Sunday
                <br />
                8:00 AM – 7:00 PM
              </p>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-item-ic">
              <LocationIcon />
            </span>
            <div>
              <p className="contact-item-label">Address</p>
              <p className="contact-item-val">
                12001 Ventura Pl Ste 100
                <br />
                Studio City, CA 91604
              </p>
            </div>
          </div>
        </div>

        <p className="contact-licensing">
          Andrew Ruric Liberty II | CA DRE# 01965696
          <br />
          Compass California, Inc. | CA DRE# 01991628
        </p>

        <div className="contact-social" aria-label="Social links">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={label}>
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* ============ RIGHT: MESSAGE FORM ============ */}
      <div className="contact-right">
        <h2 className="contact-heading">Submit a Message</h2>
        <ContactForm />
      </div>
    </section>

    {/* ============ MAP ============ */}
    <section className="contact-map-band">
      <div className="container">
        <div className="contact-map-head">
          <p className="eyebrow">Find Us</p>
          <h2 className="contact-map-title">Visit the Office</h2>
          <p className="contact-map-addr">12001 Ventura Pl Ste 100, Studio City, CA 91604</p>
        </div>
        <PropertyMap lat={34.1479} lng={-118.396} label="Andrew Liberty Team" />
      </div>
    </section>
    </>
  );
}
