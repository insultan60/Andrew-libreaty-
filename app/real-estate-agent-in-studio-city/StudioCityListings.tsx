"use client";

import Link from "next/link";
import { useState } from "react";
import { createLead } from "@/lib/idx";
import { useIdxListings } from "@/hooks/useIdxListings";
import { toPropertyItem, type RawIdxListing } from "@/lib/idx";
import { inArea } from "@/lib/areas";
import PropertyCard from "../property/PropertyCard";
import PageLoader from "../components/PageLoader";
import { ArrowRight } from "../components/icons";
import { mlsAreaUrl } from "@/lib/mlsSearch";

/* Most a neighbourhood page shows before handing over to the full search. */
const MAX = 9;

/**
 * Every Studio City listing in Andrew's IDX feed, for sale first, then sold —
 * the same homes /home-search shows when filtered to Studio City.
 *
 * page.tsx fetches the feed on the server and passes the Studio City subset
 * in, so the cards are in the HTML search engines receive. If IDX did not
 * answer there, this falls back to fetching in the browser.
 *
 * Matching is lib/areas.ts's "studio-city" (city name OR ZIP 91604), which
 * also catches the feed's listings filed under "Los Angeles" with a Studio
 * City ZIP.
 */
export default function StudioCityListings({
  initialListings,
  tone = "ivory",
  mode,
}: {
  initialListings?: RawIdxListing[] | null;
  /** Section background, so the page can keep its ivory/stone alternation. */
  tone?: "ivory" | "stone";
  /** "sale" = active listings (section 4), "sold" = recent sales (section 5). */
  mode: "sale" | "sold";
}) {
  const { data, loading, error } = useIdxListings(initialListings);
  /* The MLS files some 91604 homes under "Los Angeles". Every home here has
     already been matched to Studio City, so it is labelled that way. Never
     backfilled with other areas. */
  const items = (data ?? [])
    .filter((raw) => inArea(raw, "studio-city"))
    .map(toPropertyItem)
    .map((p) => ({ ...p, location: "Studio City, CA" }));
  const shown = items.filter((p) => (mode === "sold" ? p.badge === "Sold" : p.badge !== "Sold")).slice(0, MAX);
  const empty = !loading && !error && shown.length === 0;

  if (mode === "sold" && empty) return null;

  return (
    <section className={`sc-section sc-bg-${tone}`} id={mode === "sold" ? "sold" : "listings"}>
      <div className="container">
        <div className="sc-section-head">
          <span className="sc-eyebrow">{mode === "sold" ? "RECENTLY SOLD" : "LISTINGS"}</span>
          {mode === "sold" ? (
            <>
              <h2 className="sc-title">Recently Sold in Studio City</h2>
              <p className="sc-sub">
                My recent Studio City sales run from a $775,000 condo to a $3.8 million house. Sold
                prices show what buyers actually paid, which is a more reliable guide than asking
                prices when you&rsquo;re setting a budget or an offer.
              </p>
            </>
          ) : (
            <>
              <h2 className="sc-title">Homes for Sale in Studio City, CA</h2>
              <p className="sc-sub">
                These Studio City homes for sale come straight from my MLS feed: houses, condos and
                townhomes, each with price, beds, baths and square footage. If one catches your eye,
                I&rsquo;ll set up a showing and give you the sales that justify (or challenge) the
                asking price.
              </p>
            </>
          )}
        </div>

        {loading ? (
          <PageLoader label="Loading Studio City listings…" />
        ) : error ? (
          <p style={{ textAlign: "center", color: "var(--muted)" }}>
            Listings are unavailable right now — please try again shortly.
          </p>
        ) : empty ? (
          <p className="sc-empty">
            I don&rsquo;t have an active Studio City listing right now. Search every Studio City
            listing on the MLS, or join the list below and I&rsquo;ll send you new Studio City homes
            for sale as they come to market.
          </p>
        ) : (
          <div className="prop-grid">
            {shown.map((p) => (
              <PropertyCard key={p.slug} p={p} href={`/${p.slug}`} />
            ))}
          </div>
        )}

        {mode === "sale" && <ListingSignup />}

        {/* No "reveal" class: in the browser-fetch fallback this mounts after
            GlobalEffects has snapshotted .reveal, and would stay invisible. */}
        <div className="prop-more">
          <Link href={mlsAreaUrl("studio-city")} className="btn btn-gold btn-magnetic">
            <span>{mode === "sold" ? "View Sold Studio City Homes" : "Search All Studio City Homes"}</span>
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** "Get new Studio City listings by email": saved as an IDX lead. */
function ListingSignup() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }
    setSending(true);
    try {
      await createLead({ firstName: "Studio City", lastName: "Subscriber", email, comments: "Studio City page: new listing alerts" });
      setStatus("You're on the list. New Studio City homes will come straight to your inbox.");
      form.reset();
    } catch {
      setStatus("Something went wrong — please try again or call (310) 709-0581.");
    } finally {
      setSending(false);
    }
  };
  return (
    <form className="sc-signup" onSubmit={onSubmit} noValidate>
      <label htmlFor="sc-signup-email">Get new Studio City listings by email</label>
      <div className="sc-signup-row">
        <input id="sc-signup-email" name="email" type="email" placeholder="Your email" autoComplete="email" required />
        <button type="submit" className="btn-gold" disabled={sending}>
          <span>{sending ? "Sending…" : "Subscribe"}</span>
        </button>
      </div>
      {status && <p className="sc-signup-status" role="status">{status}</p>}
    </form>
  );
}
