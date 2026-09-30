import { HomeHashtagIcon, DollarSquareIcon, CalendarIcon } from "../vuesax";
import HeroVideo from "./HeroVideo";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <HeroVideo />
      <div className="hero-video-overlay" aria-hidden="true" />

      <div className="hero-map-texture" aria-hidden="true">
        <svg viewBox="0 0 900 700" preserveAspectRatio="xMidYMid slice">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M-20 120 C180 90 320 210 520 170 S 840 90 940 140" />
            <path d="M-20 260 C160 240 340 330 560 290 S 820 220 940 270" />
            <path d="M-20 420 C200 380 360 470 580 430 S 830 370 940 410" />
            <path d="M-20 560 C190 540 380 620 600 570 S 840 500 940 560" />
            <path d="M140 -20 C160 160 90 340 150 520 S 210 640 190 740" />
            <path d="M380 -20 C400 140 330 320 390 500 S 450 620 430 740" />
            <path d="M640 -20 C660 160 590 340 650 520 S 700 640 680 740" />
            <circle cx="520" cy="170" r="4" />
            <circle cx="390" cy="500" r="4" />
            <circle cx="650" cy="290" r="4" />
          </g>
        </svg>
      </div>

      <div className="hero-screen">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title reveal" data-reveal-delay="80">
            Real Estate Agent in Los&nbsp;Angeles
            <br />
            <em>for Smart, Confident Moves</em>
          </h1>
          <p className="hero-sub reveal" data-reveal-delay="160">
            Andrew Liberty, a Certified Real Estate Negotiation Expert with Compass, offers strategic
            guidance for buyers, sellers, and investors across Los&nbsp;Angeles.
          </p>

          {/* Search capsule */}
          <div
            className="hero-capsule reveal"
            data-reveal-delay="280"
            role="navigation"
            aria-label="Quick actions"
          >
            <a href="/home-search" className="capsule-item">
              <HomeHashtagIcon className="capsule-icon" />
              <span>Buy</span>
            </a>
            <a href="/home-valuation" className="capsule-item">
              <DollarSquareIcon className="capsule-icon" />
              <span>Sell</span>
            </a>
            <a href="https://wa.me/13107090581" target="_blank" rel="noopener noreferrer" className="capsule-item">
              <CalendarIcon className="capsule-icon" />
              <span>Schedule a Meeting</span>
            </a>
          </div>
        </div>

      </div>

      {/* Licensing credentials + Compass co-brand mark, bottom-right of the hero */}
      <div className="hero-compass" aria-label="Licensing">
        <p className="hero-compass-cred">
          Andrew Ruric Liberty II&nbsp;|&nbsp;CA DRE# 01965696
          <br />
          Compass California, Inc.&nbsp;|&nbsp;CA DRE# 01991628
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/AL logo 2.png" alt="Compass" className="hero-compass-logo" width={150} height={22} />
      </div>
      </div>
    </section>
  );
}
