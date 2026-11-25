"use client";

import { ArrowRight } from "../icons";
import { useLeadForm } from "../useLeadForm";

export default function Newsletter() {
  const { status, sending, onSubmit, clearInvalid } = useLeadForm(
    "Welcome to The Liberty Brief. First issue is on its way."
  );

  return (
    <section className="section section-newsletter">
      <div className="container">
        <div className="newsletter-panel reveal">
          <div className="newsletter-copy">
            <p className="eyebrow eyebrow-light">Newsletter</p>
            <h2>The Liberty Brief</h2>
            <p>Market perspective, smart analysis, and opportunities from a Studio City real estate agent, delivered with clarity.</p>
          </div>
          <form className="newsletter-form" onSubmit={onSubmit} noValidate>
            <div className="newsletter-row">
              <label className="visually-hidden" htmlFor="nl-email">
                Email address
              </label>
              <input
                type="email"
                id="nl-email"
                name="email"
                autoComplete="email"
                placeholder="Your email address"
                required
                onInput={clearInvalid}
              />
              <button type="submit" className="btn btn-primary btn-light btn-magnetic" disabled={sending}>
                <span>{sending ? "Sending…" : "Subscribe"}</span>
                <ArrowRight />
              </button>
            </div>
            <p className="newsletter-note">
              No spam, ever. Unsubscribe anytime.{" "}
              <a href="/blog" className="inline-link">
                Read the Blog
              </a>
            </p>
            <p className="form-status form-status-light" role="status" aria-live="polite">
              {status}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
