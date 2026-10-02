"use client";

import { useState, useCallback } from "react";
import { ArrowRight } from "../components/icons";
import { createLead } from "@/lib/idx";
import { LIFESTYLE_ITEMS, FAQ_ITEMS } from "./data";

/* ==========================================================================
   LIFESTYLE SHOWCASE (01 - 06)
   ========================================================================== */
export function LifestyleShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = LIFESTYLE_ITEMS[activeIndex];

  return (
    <div className="sc-lifestyle-layout">
      <div className="sc-lifestyle-list">
        {LIFESTYLE_ITEMS.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.num}
              type="button"
              className={`sc-lifestyle-item${isActive ? " is-active" : ""}`}
              onClick={() => setActiveIndex(idx)}
              aria-expanded={isActive}
            >
              <div className="sc-lifestyle-item-header">
                <div className="sc-lifestyle-title-wrap">
                  <span className="sc-lifestyle-num">{item.num}</span>
                  <h3 className="sc-lifestyle-title">{item.title}</h3>
                </div>
                <ArrowRight
                  style={{
                    transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease",
                    opacity: isActive ? 1 : 0.4,
                  }}
                />
              </div>
              {isActive && <p>{item.desc}</p>}
            </button>
          );
        })}
      </div>

      <div className="sc-lifestyle-media-wrap">
        <div className="sc-lifestyle-media-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeItem.img}
            alt={activeItem.captionTitle}
            loading="lazy"
            key={activeItem.img}
          />
          <div className="sc-lifestyle-media-caption">
            <h4>{activeItem.captionTitle}</h4>
            <span>{activeItem.captionSub}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="sc-faq-list">
      {FAQ_ITEMS.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.q} className={`sc-faq-item${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="sc-faq-btn"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <svg
                className="sc-faq-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isOpen && <div className="sc-faq-content">{item.a}</div>}
          </div>
        );
      })}
    </div>
  );
}

/* ==========================================================================
   VALUATION LEAD CAPTURE FORM
   ========================================================================== */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function StudioCityValuationForm() {
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [sending, setSending] = useState(false);

  const clearInvalid = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.classList.remove("is-invalid");
  }, []);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    let valid = true;

    form.querySelectorAll<HTMLInputElement>("input[required]").forEach((input) => {
      const empty = input.type === "checkbox" ? !input.checked : !input.value.trim();
      const badEmail = input.type === "email" && !!input.value && !EMAIL_RE.test(input.value);
      input.classList.toggle("is-invalid", empty || badEmail);
      if (empty || badEmail) valid = false;
    });

    if (!valid) {
      setIsError(true);
      setStatus("Please complete the required fields.");
      form.querySelector<HTMLInputElement>(".is-invalid")?.focus();
      return;
    }

    setIsError(false);
    setStatus("");
    setSending(true);

    const data = new FormData(form);
    const address = String(data.get("address") || "").trim();
    const fullName = String(data.get("name") || "").trim();
    const [firstName, ...rest] = fullName.split(" ");
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();

    try {
      const leadId = await createLead({
        firstName: firstName || fullName,
        lastName: rest.join(" ") || "—",
        email,
        phone: phone || undefined,
        comments: `Studio City Page valuation request for: ${address}`,
      });
      if (leadId) {
        setStatus("Thank you — your Studio City valuation request is in. Andrew will be in touch shortly.");
        form.reset();
      } else {
        setIsError(true);
        setStatus("Something went wrong — please try again or call (310) 709-0581.");
      }
    } catch {
      setIsError(true);
      setStatus("Something went wrong — please try again or call (310) 709-0581.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <div className="sc-val-box" id="valuation-form">
      <div className="sc-val-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/valuation-interior.jpg"
          alt="Studio City luxury interior living space"
          loading="lazy"
        />
      </div>
      <div className="sc-val-form-pane">
        <span className="sc-eyebrow">Free &amp; Confidential</span>
        <h3 className="sc-title" style={{ fontSize: "2rem", marginBottom: "12px" }}>
          Get Your Studio City Home Valuation
        </h3>
        <p className="sc-sub" style={{ fontSize: "0.95rem" }}>
          A valuation built on your street and your comparable set, plus guidance on what — if anything — is worth doing before you list.
        </p>

        <form className="sc-val-form" onSubmit={onSubmit} noValidate>
          <div className="sc-form-group">
            <label htmlFor="sc-address">
              Property Address <span>*</span>
            </label>
            <input
              type="text"
              id="sc-address"
              name="address"
              autoComplete="street-address"
              placeholder="123 Example St, Studio City, CA 91604"
              required
              onInput={clearInvalid}
            />
          </div>

          <div className="sc-form-group">
            <label htmlFor="sc-name">
              Full Name <span>*</span>
            </label>
            <input
              type="text"
              id="sc-name"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              required
              onInput={clearInvalid}
            />
          </div>

          <div className="sc-form-group">
            <label htmlFor="sc-email">
              Email <span>*</span>
            </label>
            <input
              type="email"
              id="sc-email"
              name="email"
              autoComplete="email"
              placeholder="you@email.com"
              required
              onInput={clearInvalid}
            />
          </div>

          <div className="sc-form-group">
            <label htmlFor="sc-phone">Phone (Optional)</label>
            <input
              type="tel"
              id="sc-phone"
              name="phone"
              autoComplete="tel"
              placeholder="(310) 000-0000"
              onInput={clearInvalid}
            />
          </div>

          <div className="sc-form-consent">
            <input type="checkbox" id="sc-consent" name="consent" required onInput={clearInvalid} />
            <label htmlFor="sc-consent">
              I agree to be contacted about my home valuation. Your information is never shared. By submitting, you consent to receive calls, texts or emails from Andrew Liberty Team. Msg &amp; data rates may apply.
            </label>
          </div>

          <button type="submit" className="btn-gold" disabled={sending} style={{ marginTop: "12px" }}>
            <span>{sending ? "Sending..." : "Unlock Your Free Valuation"}</span>
            <ArrowRight />
          </button>

          {status && (
            <p
              style={{
                marginTop: "12px",
                fontSize: "0.9rem",
                color: isError ? "#a33b3b" : "#2b7a4b",
                fontWeight: 500,
              }}
              role="status"
              aria-live="polite"
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
