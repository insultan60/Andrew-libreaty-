"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "./icons";
import { CallIcon } from "./vuesax";
import PhoneLink, { PHONE_DISPLAY } from "./PhoneLink";

const NAV_LINKS = [
  { href: "/property", label: "Properties" },
  { href: "/home-search", label: "Home Search" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/home-valuation", label: "Home Valuation" },
  { href: "/contact", label: "Contact" },
];

// Full site navigation shown in the slide-out side drawer
const SIDE_LINKS = [
  { href: "/team", label: "Meet the Team" },
  { href: "/property", label: "Properties" },
  { href: "/home-search", label: "Home Search" },
  { href: "/home-valuation", label: "Home Valuation" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/compass-concierge", label: "Compass Concierge" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
  { href: "/my-search-portal", label: "My Search Portal" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");
  const pathname = usePathname();
  // Inner pages have no transparent hero behind the header — keep it solid & sticky.
  const solid = pathname !== "/";

  /* Sticky glass header — shrink on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scrollspy — active nav underline for in-page anchors */
  useEffect(() => {
    const anchors = NAV_LINKS.filter((l) => l.href.startsWith("#"));
    const sections = anchors
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => Boolean(el));
    if (!sections.length) return;

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHash(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  /* Lock scroll + close on Escape while the mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`site-header${solid ? " is-solid" : ""}${scrolled ? " is-scrolled" : ""}`}
        id="site-header"
      >
        <div className="header-inner">
          <a href="/#top" className="wordmark" aria-label="Andrew Liberty Team — home">
            {/* One SVG carries the whole lockup, so the mark and the words can no
                longer drift out of alignment with each other. width/height are the
                artwork's own box - they only supply the aspect ratio, since CSS
                sets the height. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/andrew-liberty-logo.svg" alt="" className="wordmark-svg" width={1054} height={214} />
          </a>

          <nav className="main-nav" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link${activeHash === link.href ||
                  (link.href.startsWith("/") && pathname === link.href)
                  ? " is-active"
                  : ""
                  }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <PhoneLink className="header-phone">
              <CallIcon />
              <span>{PHONE_DISPLAY}</span>
            </PhoneLink>
            <a href="/my-search-portal" className="header-portal">
              My Account
            </a>
            <a href="/contact" className="btn btn-primary btn-magnetic header-cta">
              <span>Contact Us</span>
              <ArrowRight />
            </a>
            <button
              className="menu-toggle"
              id="menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/line-md_menu-unfold-left.png" alt="" className="menu-toggle-icon" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`side-scrim${menuOpen ? " is-open" : ""}`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />
      <aside
        className={`side-drawer${menuOpen ? " is-open" : ""}`}
        id="mobile-menu"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
        }}
      >
        <div className="side-head">
          <span className="side-head-label">Menu</span>
          <button className="side-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="side-nav" aria-label="Site">
          {SIDE_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`side-item${link.href.startsWith("/") && pathname === link.href ? " is-active" : ""}`}
              aria-current={link.href.startsWith("/") && pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="side-foot">
          <a href="/my-search-portal" className="side-item">
            My Account
          </a>
          <p className="side-foot-label">Get in Touch</p>
          <a href="/contact" className="btn btn-primary side-connect">
            Let&rsquo;s Connect
          </a>
        </div>
      </aside>
    </>
  );
}
