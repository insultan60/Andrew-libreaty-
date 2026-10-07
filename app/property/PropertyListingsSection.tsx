"use client";

import { useIdxListings } from "@/hooks/useIdxListings";
import { toPropertyItem, type RawIdxListing } from "@/lib/idx";
import { ArrowRight } from "../components/icons";
import PropertyCard from "./PropertyCard";
import PageLoader from "../components/PageLoader";

/* Past transactions run to dozens of closings, far more than belongs on a page
   that is also introducing the practice. Show two rows and send the rest to
   /property/sold, which lists every one. */
const PAST_PREVIEW = 6;

/* Two rows of current listings. Sold had a "see all" link for its overflow and
   this grid did not, so anything past the sixth was dropped with nothing to
   click — and "Featured Listings" reads as a curated subset either way, which
   leaves a visitor no route to the full set. /property/active is that route. */
const ACTIVE_PREVIEW = 6;

/* Below one full row of active listings, the rest of the row becomes a card
   pointing at the full MLS search. */
const MLS_FILL_BELOW = 3;

export default function PropertyListingsSection({
  initialListings,
}: {
  initialListings?: RawIdxListing[] | null;
}) {
  /* `error` matters as much as `data` here. Without it a failed fetch falls
     through to the same branch as a genuinely empty feed, and the page tells
     visitors there is nothing for sale when the truth is that IDX did not
     answer — which is exactly what happens when the account trips IDX's hourly
     rate limit. An outage should read as an outage. */
  const { data, loading, error } = useIdxListings(initialListings);
  const items = (data ?? []).map(toPropertyItem);
  /* Not Sold, rather than Active: a Pending listing is neither, so it used to
     be fetched and then rendered nowhere at all. See ./active. */
  const active = items.filter((p) => p.badge !== "Sold");
  const featured = active.slice(0, ACTIVE_PREVIEW);
  const sold = items.filter((p) => p.badge === "Sold");
  const past = sold.slice(0, PAST_PREVIEW);

  return (
    <>
      {/* ============ FEATURED LISTINGS ============ */}
      <section className="prop-section prop-featured">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Start Here</p>
            <h2 className="section-title">Featured Listings</h2>
            <p className="section-sub">
              See what is available now. Each listing includes photos, price, beds, baths, and square
              footage.
            </p>
          </div>
          {loading ? (
            <PageLoader label="Loading listings…" />
          ) : error ? (
            <p style={{ textAlign: "center", color: "var(--muted)" }}>
              Listings are unavailable right now — please try again shortly.
            </p>
          ) : featured.length < MLS_FILL_BELOW ? (
            /* A short feed leaves holes in the row, so the space goes to the
               full MLS search instead. With no active listings at all the card
               runs the full width and stands in for the grid. */
            <div className="prop-grid">
              {featured.map((p) => (
                <PropertyCard key={p.slug} p={p} href={p.href} />
              ))}
              <a
                href="/home-search"
                className="prop-mls-card"
                data-beside={featured.length}
              >
                <p className="eyebrow">Search Every Listing</p>
                <h3>Search My Full MLS</h3>
                <p>
                  {featured.length === 0
                    ? "Nothing of Andrew\u2019s own is on the market right now. Search every home for sale across Los Angeles, straight from the MLS."
                    : "Beyond Andrew\u2019s own listings, search every home for sale across Los Angeles, straight from the MLS."}
                </p>
                <span className="btn btn-gold">
                  <span>Search All Homes</span>
                  <ArrowRight />
                </span>
              </a>
            </div>
          ) : (
            <>
              <div className="prop-grid">
                {featured.map((p) => (
                  <PropertyCard key={p.slug} p={p} href={p.href} />
                ))}
              </div>
              {/* No "reveal" class, for the same reason as the sold link below:
                  GlobalEffects snapshots .reveal once per route, and this renders
                  only after the IDX fetch resolves, so it would sit at opacity 0. */}
              <div className="prop-more">
                <a href="/property/active" className="btn btn-gold btn-magnetic">
                  <span>
                    {active.length > ACTIVE_PREVIEW
                      ? `See All ${active.length} Active Listings`
                      : "See All Active Listings"}
                  </span>
                  <ArrowRight />
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ============ PAST TRANSACTIONS ============ */}
      <section className="prop-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Proof, Not Promises</p>
            <h2 className="section-title">Past Transactions</h2>
            <p className="section-sub">
              Every home on this page has already sold, so these are real results at real prices. They
              span Studio City, South Pasadena, Tarzana, and other Los Angeles neighborhoods, with sales
              reaching $3.8 million.
            </p>
            <p className="section-sub">
              If you are thinking about selling, this is how Andrew works: a clear pricing plan, honest
              communication, and steady guidance through offers, negotiation, and closing. No two homes or
              clients are alike, so each plan is built around the person behind the sale. The goal is
              simple. You should know what to expect at every step and feel confident about the result.
            </p>
          </div>
          {/* Same fault in a different shape: `!loading` alone rendered an empty
              grid and nothing else on a failed fetch — a heading followed by
              blank space, with no indication anything had gone wrong. */}
          {loading ? null : error ? (
            <p style={{ textAlign: "center", color: "var(--muted)" }}>
              Past transactions are unavailable right now — please try again shortly.
            </p>
          ) : past.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--muted)" }}>
              No past transactions to show yet.
            </p>
          ) : (
            <>
              <div className="prop-grid">
                {past.map((p) => (
                  <PropertyCard key={p.slug} p={p} href={p.href} />
                ))}
              </div>
              {/* No "reveal" class here: GlobalEffects snapshots .reveal once per
                  route, and this renders only after the IDX fetch resolves, so it
                  would never be observed and would sit at opacity 0 forever. */}
              {sold.length > PAST_PREVIEW && (
                <div className="prop-more">
                  <a href="/property/sold" className="btn btn-gold btn-magnetic">
                    <span>See All {sold.length} Sold Listings</span>
                    <ArrowRight />
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
