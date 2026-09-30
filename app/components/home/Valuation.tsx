"use client";

import { useCallback, useState } from "react";
import { ArrowRight } from "../icons";
import { createLead } from "@/lib/idx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  eyebrow?: string;
  title?: string;
  sub?: string;
};

export default function Valuation({
  eyebrow = "Free & Confidential",
  title = "How Much Is Your Home Worth?",
  sub = "Get an instant property valuation and expert guidance from Andrew Liberty, your Los Angeles real estate advisor.",
}: Props = {}) {
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
      setStatus("Please complete the highlighted fields.");
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
        comments: `Home valuation request for: ${address}`,
      });
      if (leadId) {
        setStatus("Thank you — your valuation request is in. Expect a response within the hour.");
        form.reset();
      } else {
        setIsError(true);
        setStatus("Something went wrong — please try again, or reach out on WhatsApp.");
      }
    } catch {
      setIsError(true);
      setStatus("Something went wrong — please try again, or reach out on WhatsApp.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <section className="section section-valuation" id="valuation">
      <div className="container valuation-grid">
        <div className="valuation-visual reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/valuation-interior.jpg"
            alt="Sunlit luxury living room interior"
            loading="lazy"
          />
          <ul className="trust-bullets">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m13 2-2 10h6L11 22l2-10H7L13 2z" />
              </svg>
              Instant property valuation
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 3v18h18" />
                <path d="m7 14 4-4 3 3 5-6" />
              </svg>
              Sell for more
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
                <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
              </svg>
              Expert advice
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              No obligation
            </li>
          </ul>
        </div>

        <div className="valuation-form-wrap reveal" data-reveal-delay="120">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-sub">{sub}</p>

          <form className="valuation-form" onSubmit={onSubmit} noValidate>
            <div className="form-field form-field-full">
              <label htmlFor="val-address">
                Property address <span aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="val-address"
                name="address"
                autoComplete="street-address"
                placeholder="12001 Ventura Pl, Studio City"
                required
                onInput={clearInvalid}
              />
            </div>
            <div className="form-field">
              <label htmlFor="val-name">
                Full name <span aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="val-name"
                name="name"
                autoComplete="name"
                placeholder="Jane Smith"
                required
                onInput={clearInvalid}
              />
            </div>
            <div className="form-field">
              <label htmlFor="val-email">
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                id="val-email"
                name="email"
                autoComplete="email"
                placeholder="jane@email.com"
                required
                onInput={clearInvalid}
              />
            </div>
            <div className="form-field form-field-full">
              <label htmlFor="val-phone">Phone</label>
              <input
                type="tel"
                id="val-phone"
                name="phone"
                autoComplete="tel"
                placeholder="(310) 000-0000"
                onInput={clearInvalid}
              />
            </div>
            <div className="form-consent form-field-full">
              <input type="checkbox" id="val-consent" name="consent" required onInput={clearInvalid} />
              <label htmlFor="val-consent">
                I agree to be contacted about my home valuation. Your information is never shared. By
                submitting, you consent to receive calls, texts, or emails from Andrew Liberty Team.
                Msg &amp; data rates may apply.
              </label>
            </div>
            <div className="form-actions form-field-full">
              <button type="submit" className="btn btn-primary btn-magnetic" disabled={sending}>
                <span>{sending ? "Sending…" : "Unlock Your Free Valuation"}</span>
                <ArrowRight />
              </button>
              <a href="https://wa.me/13107090581" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Schedule a Consultation
              </a>
            </div>
            <p className={`form-status${isError ? " is-error" : ""}`} role="status" aria-live="polite">
              {status}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
