"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "../components/icons";
import { SmsIcon, ShareIcon, WhatsappIcon } from "../components/vuesax";
import PropertyMap from "./PropertyMap";
import { createLead } from "@/lib/idx";
import { useLead } from "@/hooks/useLead";
import { useSavedFavorites } from "@/hooks/useSavedFavorites";
import { addFavorite, removeFavorite } from "@/lib/favorites";
import type { Listing } from "./data";

/* ---------- Inline icons ---------- */
const BedIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M2 16h20M2 20v-2M22 20v-2M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" /></svg>);
const BathIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 4 0v.5M6 19l-1 2M18 19l1 2" /></svg>);
const AreaIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>);
const CalIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>);
const HomeTypeIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 10l9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 21v-6h6v6" /></svg>);
const HeartIcon = ({ filled }: { filled?: boolean }) => (<svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>);
const PrintIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" /></svg>);
const CopyIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>);

const FEATURE_TABS = [
  { key: "interior", label: "Interior" },
  { key: "exterior", label: "Exterior & Lot" },
  { key: "details", label: "Property Details" },
] as const;

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

  const [tab, setTab] = useState<"interior" | "exterior" | "details">("interior");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ first: "", last: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("");

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

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

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
    if (!form.first.trim() || !form.email.trim()) {
      setStatus("Please add your name and email.");
      return;
    }
    const [firstName, ...rest] = form.first.trim().split(" ");
    try {
      await createLead({
        firstName,
        lastName: rest.join(" ") || form.last.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        comments: `${form.message.trim()} (Re: ${listing.address}, ${listing.city})`.trim(),
      });
      setStatus(`Thanks, ${form.first.trim()} — Andrew will reach out about ${listing.address} shortly.`);
      setForm({ first: "", last: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("Something went wrong sending your request — please try again or call directly.");
    }
  };

  const rows = listing.features[tab];

  return (
    <>
      {/* ============ GALLERY ============ */}
      <div className="pd-gallery-wrap">
        {gallery.length > 1 ? (
          <div className="container">
            <div className="pd-gallery">
              {gallery.slice(0, 5).map((src, i) => (
                <button
                  type="button"
                  className="pd-cell"
                  key={i}
                  onClick={() => openLightbox(i)}
                  aria-label={`View photo ${i + 1} of ${gallery.length}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${listing.address} photo ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} />
                  {i === 4 && gallery.length > 5 && (
                    <span className="pd-more"><AreaIcon />{gallery.length - 5} More</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="pd-gallery-single"
            onClick={() => openLightbox(0)}
            aria-label={`View photo of ${listing.address}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gallery[0]} alt={listing.address} loading="eager" />
          </button>
        )}
      </div>

      {/* ============ LIGHTBOX ============ */}
      {lightbox !== null && (
        <div className="pd-lightbox" role="dialog" aria-modal="true" aria-label="Photo gallery" onClick={closeLightbox}>
          <button className="pd-lb-close" onClick={closeLightbox} aria-label="Close gallery">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
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

      {/* ============ SUB-NAV ============ */}
      <nav className="pd-subnav" aria-label="Section navigation">
        <div className="container pd-subnav-inner">
          <a href="#overview">Overview</a>
          <a href="#features">Features</a>
          <a href="#location">Location</a>
          <a href="#history">History</a>
          <a href="#similar">Similar Properties</a>
        </div>
      </nav>

      {/* ============ LAYOUT ============ */}
      <div className="container">
        <div className="pd-layout">
          <div className="pd-main">
            {/* Header */}
            <div className="pd-head" id="overview">
              <div>
                <div className="pd-status-row">
                  <span className="pd-status">{listing.status}</span>
                  <span className="pd-listed">{listing.listed}</span>
                </div>
                <h1 className="pd-title">{listing.address}</h1>
                <p className="pd-addr">{listing.city}</p>
              </div>
              <div className="pd-price">
                {listing.price}
                <small>{listing.perSqft}</small>
              </div>
            </div>

            {/* Stats */}
            <div className="pd-stats">
              <div className="pd-stat"><b>{listing.beds}</b><span className="pd-stat-lbl"><BedIcon />Beds</span></div>
              <div className="pd-stat"><b>{listing.baths}</b><span className="pd-stat-lbl"><BathIcon />Baths</span></div>
              <div className="pd-stat"><b>{listing.sqft}</b><span className="pd-stat-lbl"><AreaIcon />Sq Ft</span></div>
              <div className="pd-stat"><b>{listing.built}</b><span className="pd-stat-lbl"><CalIcon />Built</span></div>
              <div className="pd-stat"><b>{listing.type}</b><span className="pd-stat-lbl"><HomeTypeIcon />Property Type</span></div>
            </div>

            {/* Actions */}
            <div className="pd-actions">
              <button className={`pd-act${saved ? " is-active" : ""}`} onClick={toggleSave}>
                <HeartIcon filled={saved} />{saved ? "Saved" : "Save"}
              </button>
              <button className="pd-act" onClick={share}><ShareIcon />Share</button>
              <button className="pd-act" onClick={() => window.print()}><PrintIcon />Print</button>
            </div>

            {/* Overview */}
            <section className="pd-section pd-overview">
              <h2 className="pd-section-title">Overview</h2>
              {listing.overview.map((p, i) => <p key={i}>{p}</p>)}
            </section>

            {/* Features */}
            <section className="pd-section" id="features">
              <h2 className="pd-section-title">Features &amp; Amenities</h2>
              <div className="pd-feat-tabs" role="tablist" aria-label="Feature groups">
                {FEATURE_TABS.map((t) => (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={tab === t.key}
                    className={`pd-feat-tab${tab === t.key ? " is-active" : ""}`}
                    onClick={() => setTab(t.key)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <dl>
                {rows.map((f) => (
                  <div className="pd-feat-row" key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Location */}
            <section className="pd-section" id="location">
              <div className="pd-loc-head">
                <h2 className="pd-section-title" style={{ marginBottom: 0 }}>Location</h2>
                <button className="pd-copy" onClick={copyAddr}>
                  <CopyIcon />{copied ? "Copied!" : "Copy address"}
                </button>
              </div>
              <p className="pd-addr" style={{ marginBottom: 14 }}>{listing.address}, {listing.city}</p>
              <PropertyMap lat={listing.lat} lng={listing.lng} label={listing.pin} />
            </section>

            {/* History */}
            <section className="pd-section" id="history">
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
          </div>

          {/* Sidebar */}
          <aside className="pd-sidebar">
            <div className="pd-agent-box">
              <div className="pd-agent-top">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/f1955b4c-7280-45c9-87ab-f1e6103bfc65.avif" alt="Andrew Liberty" />
                <div>
                  <b>Andrew Liberty</b>
                  <span>Founder &amp; Lead Agent</span>
                </div>
              </div>
              <form className="cf-form pd-form" onSubmit={submit} noValidate>
                <div className="cf-field">
                  <label htmlFor="pd-name">Full Name <span className="pd-req">*</span></label>
                  <input id="pd-name" type="text" placeholder="Your full name" value={form.first} onChange={(e) => set("first", e.target.value)} />
                </div>
                <div className="cf-field">
                  <label htmlFor="pd-email">Email <span className="pd-req">*</span></label>
                  <input id="pd-email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </div>
                <div className="cf-field">
                  <label htmlFor="pd-phone">Phone Number</label>
                  <input id="pd-phone" type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                </div>
                <div className="cf-field">
                  <label htmlFor="pd-msg">Message (optional)</label>
                  <textarea id="pd-msg" rows={3} maxLength={100} placeholder="Message" value={form.message} onChange={(e) => set("message", e.target.value)} />
                  <div className="pd-msg-count">{form.message.length}/100</div>
                </div>
                <button type="submit" className="btn btn-primary btn-magnetic">
                  <span>Request Info</span>
                </button>
                <a href="https://wa.me/13107090581" target="_blank" rel="noopener noreferrer" className="pd-form-alt">
                  <WhatsappIcon />Contact Agent
                </a>
                <p className="pd-form-status" role="status" aria-live="polite">{status}</p>
              </form>
            </div>
          </aside>
        </div>

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
            <a href="/contact" className="btn btn-gold btn-magnetic"><span>Selling Consultation</span><ArrowRight /></a>
            <a href="/contact" className="btn btn-outline"><SmsIcon /><span>Contact Agent</span></a>
          </div>
        </div>
      </div>
    </>
  );
}
