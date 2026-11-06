"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "../components/icons";
import { SmsIcon, ShareIcon, WhatsappIcon } from "../components/vuesax";
import PropertyMap from "./PropertyMap";
import { createLead } from "@/lib/idx";
import { useLead } from "@/hooks/useLead";
import { useSavedFavorites } from "@/hooks/useSavedFavorites";
import { addFavorite, removeFavorite } from "@/lib/favorites";
import { LISTING_SHOWCASE, type ShowcaseSection } from "@/lib/listingShowcase";
import type { Listing } from "./data";
import VideoTour from "./VideoTour";
import SuccessStory from "./SuccessStory";

/* ---------- Inline icons ---------- */
const AreaIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>);
const HeartIcon = ({ filled }: { filled?: boolean }) => (<svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>);
const PrintIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" /></svg>);
const CopyIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>);
const SendIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>);
const CloseIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>);

/** The dotted texture beside the headline and price, fading left to right. */
function Dots({ className = "" }: { className?: string }) {
  const cols = 11;
  const rows = 6;
  return (
    <svg className={`sc-dots ${className}`} viewBox={`0 0 ${cols * 22} ${rows * 22}`} aria-hidden="true">
      {Array.from({ length: rows * cols }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        return <circle key={i} cx={c * 22 + 11} cy={r * 22 + 11} r={2.4} fill="currentColor" opacity={1 - c / (cols + 1)} />;
      })}
    </svg>
  );
}

const FEATURE_GROUPS = [
  { key: "interior", title: "Interior" },
  { key: "exterior", title: "Exterior\n& Lot" },
  { key: "details", title: "Property\nDetails" },
] as const;

const EMPTY = new Set(["", "—", "-", "0"]);

/** "Listed Nov 1, 2026" within the last 30 days. */
function isJustListed(listed: string): boolean {
  const time = Date.parse(listed.replace(/^Listed\s+/i, ""));
  return Number.isFinite(time) && Date.now() - time < 30 * 24 * 60 * 60 * 1000;
}

/** MLS remarks arrive as one block; split them into readable paragraphs. */
function toParagraphs(text: string): string[] {
  // MLS remarks often run sentences together ("home.The"); put the space back.
  text = text.replace(/([a-z][.!?])(?=[A-Z])/g, "$1 ");
  const sentences = text.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) ?? [text];
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    paragraphs.push(sentences.slice(i, i + 3).join("").trim());
  }
  return paragraphs.filter(Boolean);
}

function Lines({ text }: { text: string }) {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {/* The space keeps the words apart where small screens hide the break. */}
          {i < parts.length - 1 && <>{" "}<br /></>}
        </span>
      ))}
    </>
  );
}

type LeadForm = { first: string; last: string; email: string; phone: string; message: string };
const BLANK: LeadForm = { first: "", last: "", email: "", phone: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PropertyDetail({ listing }: { listing: Listing }) {
  const { leadId, requireLead } = useLead();
  const savedMls = useSavedFavorites();
  const [saved, setSaved] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from an async favorites fetch
  useEffect(() => setSaved(savedMls.has(listing.mlsId)), [savedMls, listing.mlsId]);

  const toggleSave = () => {
    if (!leadId) {
      requireLead("Save your info to add homes to your favorites.");
      return;
    }
    const next = !saved;
    setSaved(next);
    const persist = next ? addFavorite(leadId, listing.mlsId) : removeFavorite(leadId, listing.mlsId);
    persist.then((ok) => {
      if (!ok) setSaved(!next);
    });
  };

  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<LeadForm>(BLANK);
  const [status, setStatus] = useState("");

  /* ---------- What kind of page this is ---------- */
  const sold = /sold|closed/i.test(listing.status);
  const pending = /pending|contract|contingent/i.test(listing.status);
  const statusLabel = sold ? "Sold" : pending ? "Pending" : isJustListed(listing.listed) ? "Just Listed" : "For Sale";
  const cityName = listing.city.split(",")[0].trim();
  const showcase = LISTING_SHOWCASE[listing.slug];
  const headline =
    showcase?.headline ??
    (/^\d+$/.test(listing.beds)
      ? `A ${listing.beds}-Bedroom ${listing.type} in ${cityName}`
      : `${listing.type} in ${cityName}`);
  const remarks = listing.overview.join(" ").trim();
  const sections: ShowcaseSection[] =
    showcase?.sections ?? (remarks ? [{ title: "The\nHome", body: toParagraphs(remarks) }] : []);
  const featureGroups = FEATURE_GROUPS.map((group) => ({
    ...group,
    rows: listing.features[group.key].filter((f) => !EMPTY.has(f.value.trim())),
  })).filter((group) => group.rows.length > 0);
  const lot = listing.features.exterior.find((f) => f.label === "Lot Size")?.value ?? "—";
  const stats = [
    { value: listing.beds, label: "Bedrooms" },
    { value: listing.baths, label: "Bathrooms" },
    { value: listing.sqft, label: "Living Area (sq ft)" },
    EMPTY.has(lot) ? { value: listing.built, label: "Year Built" } : { value: lot.replace(/\s*sqft$/i, ""), label: lot.endsWith("Acres") ? "Lot Size" : "Lot Size (sq ft)" },
  ].filter((s) => !EMPTY.has(s.value));

  /* ---------- Lightbox gallery ---------- */
  const gallery = listing.gallery;
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("center");

  const openLightbox = (i: number) => { setLightbox(i); setZoom(false); };
  const closeLightbox = () => { setLightbox(null); setZoom(false); };
  const step = (dir: number) =>
    setLightbox((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length));

  const onZoomMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!zoom) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  // Keyboard nav + scroll lock while the lightbox is open
  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") { setZoom(false); step(1); }
      else if (e.key === "ArrowLeft") { setZoom(false); step(-1); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  /* ---------- Private showing request ---------- */
  const [showing, setShowing] = useState(false);
  const [showingStatus, setShowingStatus] = useState("");
  const [showingSent, setShowingSent] = useState(false);
  const showingClose = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!showing) return;
    document.body.style.overflow = "hidden";
    showingClose.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowing(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showing]);

  const openShowing = () => {
    setShowingSent(false);
    setShowingStatus("");
    setShowing(true);
  };

  const submitShowing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    if (!get("first") || !get("last") || !EMAIL_RE.test(get("email")) || !get("date")) {
      setShowingStatus("Please add your name, a valid email and a preferred day.");
      return;
    }
    setShowingStatus("Sending…");
    const comments = [
      `Private showing request: ${listing.address}, ${listing.city}`,
      `Preferred: ${get("date")}${get("time") ? `, ${get("time")}` : ""}`,
      get("alt") && `Also available: ${get("alt")}`,
      get("message"),
    ]
      .filter(Boolean)
      .join(" · ");
    try {
      await createLead({ firstName: get("first"), lastName: get("last"), email: get("email"), phone: get("phone"), comments });
      setShowingSent(true);
      setShowingStatus("");
    } catch {
      setShowingStatus("Something went wrong — please try again or call (310) 709-0581.");
    }
  };

  /* ---------- Inquiry form ---------- */
  const set = (k: keyof LeadForm, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const copyAddr = async () => {
    try {
      await navigator.clipboard.writeText(`${listing.address}, ${listing.city}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try { await navigator.share({ title: listing.address, url }); } catch { /* dismissed */ }
    } else {
      try { await navigator.clipboard.writeText(url); setStatus("Link copied to clipboard."); } catch { /* noop */ }
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first.trim() || !EMAIL_RE.test(form.email.trim())) {
      setStatus("Please add your first name and a valid email.");
      return;
    }
    const subject = sold ? "Looking for a home like" : "Re:";
    try {
      await createLead({
        firstName: form.first.trim(),
        lastName: form.last.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        comments: `${form.message.trim()} (${subject} ${listing.address}, ${listing.city})`.trim(),
      });
      setStatus(`Thanks, ${form.first.trim()} — Andrew will reach out about ${listing.address} shortly.`);
      setForm(BLANK);
    } catch {
      setStatus("Something went wrong sending your request — please try again or call directly.");
    }
  };

  /* ---------- Price band (shown twice, like a printed brochure) ---------- */
  const priceBand = (id?: string) => (
    <section className="sc-price" id={id}>
      <div className="container sc-price-inner">
        <Dots className="sc-price-dots" />
        <div className="sc-price-figure">
          <p className="sc-price-label">{sold ? "Sold Price" : statusLabel}</p>
          <p className="sc-price-value">{listing.price}</p>
          {listing.perSqft && <p className="sc-price-sub">{listing.perSqft}</p>}
        </div>
        {sold ? (
          <Link href="/home-valuation" className="sc-btn">
            What&rsquo;s My Home Worth?
          </Link>
        ) : (
          <button type="button" className="sc-btn" onClick={openShowing}>
            Schedule a Private Showing
          </button>
        )}
      </div>
    </section>
  );

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="sc-hero" id="overview">
        <button type="button" className="sc-hero-media" onClick={() => openLightbox(0)} aria-label={`View photos of ${listing.address}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={gallery[0]} alt={`${listing.address}, ${listing.city}`} loading="eager" />
        </button>
        <div className="sc-hero-shade" aria-hidden="true" />

        <div className="sc-hero-tools">
          <button type="button" className={`sc-tool${saved ? " is-active" : ""}`} onClick={toggleSave}>
            <HeartIcon filled={saved} />{saved ? "Saved" : "Save"}
          </button>
          <button type="button" className="sc-tool" onClick={share}><ShareIcon />Share</button>
          <button type="button" className="sc-tool" onClick={() => window.print()}><PrintIcon />Print</button>
          {gallery.length > 1 && (
            <button type="button" className="sc-tool" onClick={() => openLightbox(0)}><AreaIcon />{gallery.length} Photos</button>
          )}
        </div>

        <div className="container sc-hero-inner">
          <span className="sc-chip">{statusLabel}</span>
          <h1 className="sc-hero-title">{listing.address}</h1>
          <p className="sc-hero-city">{listing.city}</p>
          <dl className="sc-hero-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ LIGHTBOX ============ */}
      {lightbox !== null && (
        <div className="pd-lightbox" role="dialog" aria-modal="true" aria-label="Photo gallery" onClick={closeLightbox}>
          <button className="pd-lb-close" onClick={closeLightbox} aria-label="Close gallery">
            <CloseIcon />
          </button>
          <span className="pd-lb-counter">{lightbox + 1} / {gallery.length}</span>

          <button
            className="pd-lb-nav pd-lb-prev"
            onClick={(e) => { e.stopPropagation(); setZoom(false); step(-1); }}
            aria-label="Previous photo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="pd-lb-stage" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={`pd-lb-img${zoom ? " is-zoomed" : ""}`}
              src={gallery[lightbox]}
              alt={`${listing.address} photo ${lightbox + 1}`}
              style={zoom ? { transformOrigin: origin } : undefined}
              onClick={() => setZoom((z) => !z)}
              onMouseMove={onZoomMove}
            />
          </div>

          <button
            className="pd-lb-nav pd-lb-next"
            onClick={(e) => { e.stopPropagation(); setZoom(false); step(1); }}
            aria-label="Next photo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
          </button>

          <div className="pd-lb-thumbs" onClick={(e) => e.stopPropagation()}>
            {gallery.map((src, i) => (
              <button
                key={i}
                className={`pd-lb-thumb${i === lightbox ? " is-active" : ""}`}
                onClick={() => { setLightbox(i); setZoom(false); }}
                aria-label={`Go to photo ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ============ HEADLINE ============ */}
      <section className="sc-tagline">
        <div className="container sc-tagline-inner">
          <h2>{headline}</h2>
          <Dots className="sc-tagline-dots" />
        </div>
      </section>

      {priceBand()}

      {/* ============ THE STORY ============ */}
      {(sections.length > 0 || featureGroups.length > 0) && (
        <section className="sc-story" id="features">
          <div className="container">
            {sections.map((s) => (
              <div className="sc-story-row" key={s.title}>
                <h2 className="sc-story-title"><Lines text={s.title} /></h2>
                <div className="sc-story-body">
                  {s.body.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            ))}
            {featureGroups.map((g) => (
              <div className="sc-story-row" key={g.key}>
                <h2 className="sc-story-title"><Lines text={g.title} /></h2>
                <dl className="sc-story-facts">
                  {g.rows.map((f) => (
                    <div key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Seller's story and video tour — only for listings that have them */}
      <div className="container sc-extras">
        <SuccessStory slug={listing.slug} />
        <VideoTour slug={listing.slug} />
      </div>

      {priceBand()}

      {/* ============ PHOTO STRIP ============ */}
      {gallery.length > 1 && (
        <section className="sc-strip" aria-label="Photos">
          <div className="sc-strip-track">
            {gallery.map((src, i) => (
              <button type="button" key={i} className="sc-strip-item" onClick={() => openLightbox(i)} aria-label={`View photo ${i + 1} of ${gallery.length}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ============ INQUIRY + MAP ============ */}
      <section className="sc-inquire" id="location">
        <div className="container sc-inquire-grid">
          <div className="sc-inquire-card">
            <p className="sc-inquire-eyebrow">{sold ? "Looking for a home like" : "Interested in"}</p>
            <h2 className="sc-inquire-title">
              {listing.address}
              <br />
              {listing.city}
            </h2>
            <form className="sc-form" onSubmit={submit} noValidate>
              <div className="sc-form-grid">
                <label className="sc-field">
                  <span>First Name *</span>
                  <input type="text" autoComplete="given-name" value={form.first} onChange={(e) => set("first", e.target.value)} />
                </label>
                <label className="sc-field">
                  <span>Last Name</span>
                  <input type="text" autoComplete="family-name" value={form.last} onChange={(e) => set("last", e.target.value)} />
                </label>
                <label className="sc-field">
                  <span>Phone</span>
                  <input type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                </label>
                <label className="sc-field">
                  <span>Email *</span>
                  <input type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </label>
              </div>
              <label className="sc-field">
                <span>Message</span>
                <textarea rows={3} maxLength={500} value={form.message} onChange={(e) => set("message", e.target.value)} />
              </label>
              <div className="sc-form-foot">
                <p className="sc-form-status" role="status" aria-live="polite">{status}</p>
                <button type="submit" className="sc-send" aria-label="Send message"><SendIcon /></button>
              </div>
            </form>
            <div className="sc-inquire-alt">
              <a href="https://wa.me/13107090581" target="_blank" rel="noopener noreferrer"><WhatsappIcon />WhatsApp Andrew</a>
              <button type="button" onClick={copyAddr}><CopyIcon />{copied ? "Copied!" : "Copy address"}</button>
            </div>
          </div>
          <div className="sc-inquire-map">
            <PropertyMap lat={listing.lat} lng={listing.lng} label={listing.pin} />
          </div>
        </div>
      </section>

      <div className="container">
        {/* History */}
        {listing.history.length > 0 && (
          <section className="pd-section sc-history" id="history">
            <h2 className="pd-section-title">Property History</h2>
            <div className="pd-history">
              {listing.history.map((h, i) => (
                <div className="pd-hist-item" key={i}>
                  <span className="pd-hist-dot" />
                  <div>
                    <p className="pd-hist-event">{h.event}</p>
                    <p className="pd-hist-sub">{h.sub}</p>
                  </div>
                  {h.price && <span className="pd-hist-price">{h.price}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Agent CTA band */}
        <div className="pd-cta">
          <div className="pd-cta-agent">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/f1955b4c-7280-45c9-87ab-f1e6103bfc65.avif" alt="Andrew Liberty" />
            <div>
              <p className="pd-cta-name">Andrew Liberty</p>
              <p className="pd-cta-dre">Compass · CA DRE# 01965696</p>
              <p className="pd-cta-sub">Listed by Andrew R. Liberty with Compass · Listing contact: (310) 709-0581</p>
            </div>
          </div>
          <div className="pd-cta-btns">
            <Link href="/contact" className="btn btn-gold btn-magnetic"><span>Selling Consultation</span><ArrowRight /></Link>
            <Link href="/contact" className="btn btn-outline"><SmsIcon /><span>Contact Agent</span></Link>
          </div>
        </div>
      </div>

      {/* ============ SHOWING REQUEST ============ */}
      {showing && (
        <div className="sc-modal" role="dialog" aria-modal="true" aria-labelledby="sc-modal-title" onClick={() => setShowing(false)}>
          <div className="sc-modal-card" onClick={(e) => e.stopPropagation()}>
            <button ref={showingClose} type="button" className="sc-modal-close" onClick={() => setShowing(false)} aria-label="Close">
              <CloseIcon />
            </button>
            {showingSent ? (
              <div className="sc-modal-done" role="status">
                <h2 id="sc-modal-title">Request received</h2>
                <p>Thank you. Andrew will be in touch shortly to confirm a time to see {listing.address}.</p>
                <button type="button" className="sc-btn" onClick={() => setShowing(false)}>Close</button>
              </div>
            ) : (
              <>
                <p className="sc-modal-eyebrow">{listing.address}</p>
                <h2 id="sc-modal-title">Schedule a Private Showing</h2>
                <p className="sc-modal-lead">Tell us how to reach you and when suits you, and Andrew will confirm a time.</p>
                <form className="sc-modal-form" onSubmit={submitShowing} noValidate>
                  <label className="sc-mfield"><span>First Name *</span><input name="first" autoComplete="given-name" required /></label>
                  <label className="sc-mfield"><span>Last Name *</span><input name="last" autoComplete="family-name" required /></label>
                  <label className="sc-mfield"><span>Email *</span><input name="email" type="email" autoComplete="email" required /></label>
                  <label className="sc-mfield"><span>Phone</span><input name="phone" type="tel" autoComplete="tel" /></label>
                  <label className="sc-mfield"><span>Preferred Day *</span><input name="date" type="date" required /></label>
                  <label className="sc-mfield">
                    <span>Preferred Time</span>
                    <select name="time" defaultValue="">
                      <option value="">Any time</option>
                      <option>Morning</option>
                      <option>Afternoon</option>
                      <option>Evening</option>
                    </select>
                  </label>
                  <label className="sc-mfield sc-mfield-wide"><span>Another time that works?</span><input name="alt" placeholder="e.g. Saturday afternoon" /></label>
                  <label className="sc-mfield sc-mfield-wide"><span>Message</span><textarea name="message" rows={3} maxLength={500} /></label>
                  <p className="sc-modal-status" role="status" aria-live="polite">{showingStatus}</p>
                  <button type="submit" className="sc-btn sc-mfield-wide">Request Showing</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
