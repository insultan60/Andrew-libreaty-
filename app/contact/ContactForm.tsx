"use client";

import { useState } from "react";
import { ArrowRight } from "../components/icons";
import { createLead } from "@/lib/idx";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", consent: false });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const set = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setStatus("Please add your name and email.");
      return;
    }
    if (!form.consent) {
      setStatus("Please agree to be contacted before submitting.");
      return;
    }
    setSending(true);
    const [firstName, ...rest] = form.name.trim().split(" ");
    try {
      const leadId = await createLead({
        firstName,
        lastName: rest.join(" ") || "—",
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        comments: form.message.trim() || undefined,
      });
      if (leadId) {
        setStatus(`Thanks, ${firstName} — your message is on its way. Andrew will be in touch shortly.`);
        setForm({ name: "", email: "", phone: "", message: "", consent: false });
      } else {
        setStatus("Something went wrong sending your message — please try again, or call (310) 709-0581.");
      }
    } catch {
      setStatus("Something went wrong sending your message — please try again, or call (310) 709-0581.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="cf-form" onSubmit={submit} noValidate>
      <div className="cf-field">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" type="text" autoComplete="name" placeholder="Your full name" value={form.name} onChange={(e) => set("name", e.target.value)} />
      </div>
      <div className="cf-field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
      </div>
      <div className="cf-field">
        <label htmlFor="cf-phone">Phone</label>
        <input id="cf-phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
      </div>
      <div className="cf-field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" rows={3} maxLength={500} placeholder="Tell us about your real estate goals…" value={form.message} onChange={(e) => set("message", e.target.value)} />
        <p className="cf-hint">Maximum 500 characters</p>
      </div>

      <div className="cf-consent">
        <input id="cf-consent" type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} />
        <label htmlFor="cf-consent">
          I agree to be contacted by Andrew Liberty via call, email, and text for real estate services.
          To opt out, you can reply &lsquo;stop&rsquo; at any time or reply &lsquo;help&rsquo; for assistance.
          You can also click the unsubscribe link in the emails. Message and data rates may apply.{" "}
          <a href="#">Privacy Policy</a>.
        </label>
      </div>

      <button type="submit" className="btn btn-gold btn-magnetic" disabled={sending}>
        <span>{sending ? "Sending…" : "Submit"}</span>
        <ArrowRight />
      </button>
      <p className="cf-status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
