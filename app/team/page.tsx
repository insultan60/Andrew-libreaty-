import type { Metadata } from "next";
import { ArrowRight } from "../components/icons";
import Testimonials from "../components/home/Testimonials";
import PastTransactions from "./PastTransactions";
import { SmsIcon, WhatsappIcon } from "../components/vuesax";

export const metadata: Metadata = {
  title: "Meet the Team — Andrew Liberty Team | Los Angeles Real Estate",
  description:
    "A collective of dedicated professionals committed to delivering an extraordinary real estate experience across Los Angeles — the Andrew Liberty Team at Compass.",
  alternates: { canonical: "/team" },
};

const HERO_GALLERY = [
  { src: "/images/sold-studio-city.jpg", alt: "Modern residence, Studio City" },
  { src: "/images/sold-sherman-oaks.jpg", alt: "Traditional home, Sherman Oaks" },
  { src: "/images/sold-hollywood-hills.jpg", alt: "Estate with pool, Hollywood Hills" },
  { src: "/images/sold-toluca-lake.jpg", alt: "Architectural home, Toluca Lake" },
  { src: "/images/sold-canyon-midcentury.jpg", alt: "Mid-century home, Los Angeles" },
];

type Member = {
  name: string; role: string; meta: string; img: string;
  href?: string; bio?: string; specialties?: string[];
};
const TEAM: Member[] = [
  {
    name: "Andrew Liberty", role: "REALTOR®", meta: "License #01965696",
    img: "/team/andrew-liberty.png", href: "/team/andrew-liberty",
    bio: "A Los Angeles based REALTOR® and certified Real Estate Negotiation Expert who brings a strong mix of strategy and real-world experience.",
    specialties: ["Luxury Residential", "Historic Estates", "Relocation"],
  },
  { name: "Liza Calzoni", role: "REALTOR®", meta: "License Number # 02246252", img: "/team/lisa-cabrera.png" },
  /* Details and headshot from her Compass profile (compass.com/agents/
     marine-shirinian); the photo is cropped to the 391x504 the other cards use. */
  { name: "Marine Shirinian", role: "REALTOR®", meta: "License Number # 02443948", img: "/team/marine-shirinian.png" },
  { name: "Seda Naumenko", role: "Marketing and Operations", meta: "License Number # 02246252", img: "/team/sonia-naumenko.png" },
  { name: "Andrew Coleman", role: "Designer", meta: "License Number # 02246252", img: "/team/andrew-coleman.png" },
  { name: "Victor Jimenez", role: "Manager", meta: "License Number # 02246252", img: "/team/victor-jimenez.png" },
];

export default function TeamPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="team-hero">
        <div className="container">
          <h1 className="team-hero-title">Meet the Team</h1>
          <div className="team-hero-gallery">
            {HERO_GALLERY.map((g) => (
              <div className="prop-tile" key={g.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={g.alt} loading="eager" />
              </div>
            ))}
          </div>
          <p className="team-hero-sub">
            A collective of dedicated professionals committed to delivering an extraordinary real
            estate experience.
          </p>
        </div>
      </section>

      {/* ============ TEAM GRID ============ */}
      <section className="prop-section">
        <div className="container">
          <div className="section-head reveal">
            
            <p className="eyebrow">The People Behind the Service</p>
            <h2 className="section-title">Andrew Liberty Team</h2>
          </div>
          <div className="team-grid">
            {TEAM.map((m) => (
              <article className="team-card reveal" key={m.name}>
                <div className="team-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.img} alt={m.name} loading="lazy" />
                  <div className="team-overlay">
                    {m.bio ? (
                      <>
                        <p className="team-bio">{m.bio}</p>
                        {m.specialties && (
                          <div className="team-tags">
                            {m.specialties.map((s) => <span key={s}>{s}</span>)}
                          </div>
                        )}
                        {m.href && (
                          <a className="team-view" href={m.href}>
                            View Profile
                            <ArrowRight />
                          </a>
                        )}
                      </>
                    ) : (
                      <span className="team-soon">Coming Soon</span>
                    )}
                  </div>
                </div>
                <div className="team-body">
                  <h3 className="team-name">
                    {m.href ? <a href={m.href}>{m.name}</a> : m.name}
                  </h3>
                  <p className="team-role">{m.role}</p>
                  <p className="team-meta">{m.meta}</p>
                  <div className="team-contact">
                    <a
                      href="mailto:andrew.liberty@compass.com"
                      aria-label={`Email ${m.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SmsIcon />
                    </a>
                    <a href="https://wa.me/13107090581" target="_blank" rel="noopener noreferrer" aria-label={`Message ${m.name} on WhatsApp`}>
                      <WhatsappIcon />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <Testimonials />

      {/* ============ PAST TRANSACTIONS ============ */}
      <PastTransactions />

      {/* ============ START YOUR SEARCH ============ */}
      <section className="prop-searchband-wrap">
        <div className="container">
          <div className="prop-searchband reveal">
            <h2>Start Your Property Search</h2>
            <a href="/home-search" className="btn btn-gold btn-magnetic">
              <span>Browse Homes</span>
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ============ BEYOND THE TRANSACTION ============ */}
      <section className="prop-beyond-wrap">
        <div className="container">
          <div className="prop-beyond reveal">
            <p className="eyebrow">The Long View</p>
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
              <a href="/home-search" className="btn btn-secondary">
                Browse Homes
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
