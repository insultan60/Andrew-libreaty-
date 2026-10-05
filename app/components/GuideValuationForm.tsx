"use client";

import { useCallback, useState } from "react";
import { createLead } from "@/lib/idx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Valuation form for the neighbourhood guide pages (styled by
 *  app/neighborhood-guide.css). Submits an IDX lead tagged with the place. */
export default function GuideValuationForm({ place, title }: { place: string; title: string }) {
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
        comments: `${place} Page valuation request for: ${address}`,
      });
      if (leadId) {
        setStatus(`Thank you — your ${place} valuation request is in. Andrew will be in touch shortly.`);
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
  }, [place]);

  return (
    <form className="lcn-form" onSubmit={onSubmit} noValidate>
      <h3 className="lcn-form-title">{title}</h3>

      <label className="lcn-field">
        <span>
          Property address <em aria-hidden="true">*</em>
        </span>
        <input name="address" type="text" autoComplete="street-address" required onInput={clearInvalid} />
      </label>
      <label className="lcn-field">
        <span>
          Full name <em aria-hidden="true">*</em>
        </span>
        <input name="name" type="text" autoComplete="name" required onInput={clearInvalid} />
      </label>
      <label className="lcn-field">
        <span>
          Email <em aria-hidden="true">*</em>
        </span>
        <input name="email" type="email" autoComplete="email" required onInput={clearInvalid} />
      </label>
      <label className="lcn-field">
        <span>Phone (optional)</span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>

      <label className="lcn-consent">
        <input name="consent" type="checkbox" required onInput={clearInvalid} />
        <span>
          I agree to be contacted about my home valuation. Your information is never shared. Message and
          data rates may apply.
        </span>
      </label>

      <button type="submit" className="lcn-btn lcn-btn-dark lcn-btn-block" disabled={sending}>
        {sending ? "Sending…" : "Unlock Your Free Valuation"}
      </button>
      <p className={`lcn-form-status${isError ? " is-error" : ""}`} role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
