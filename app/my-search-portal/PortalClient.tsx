"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "../components/icons";
import PropertyCard from "../property/PropertyCard";
import { useIdxListings } from "@/hooks/useIdxListings";
import { toPropertyItem } from "@/lib/idx";
import { useLead } from "@/hooks/useLead";
import { listFavoriteMlsIds } from "@/lib/favorites";
import { listSavedSearches, deleteSavedSearch, type SavedSearchRow } from "@/lib/savedSearches";
import PageLoader from "../components/PageLoader";

const LockIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>);

function criteriaSummary(criteria: Record<string, unknown>): string {
  const parts = Object.entries(criteria)
    .filter(([, v]) => v != null && v !== "")
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`);
  return parts.length ? parts.join(" · ") : "All listings";
}

export default function PortalClient() {
  const [tab, setTab] = useState<"favorites" | "searches">("favorites");
  const { leadId, loading: authLoading, requireLead } = useLead();

  /* ---------- Favorites ---------- */
  const { data, loading: listingsLoading } = useIdxListings();
  const [savedMls, setSavedMls] = useState<Set<string>>(new Set());
  useEffect(() => {
    if (!leadId) return;
    listFavoriteMlsIds(leadId).then(setSavedMls);
  }, [leadId]);
  const favorites = useMemo(() => {
    if (!data) return [];
    return data.filter((raw) => savedMls.has(raw.listingID)).map(toPropertyItem);
  }, [data, savedMls]);

  /* ---------- Saved searches ---------- */
  const [searches, setSearches] = useState<SavedSearchRow[]>([]);
  const [searchesLoading, setSearchesLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!leadId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset when signed out
      setSearches([]);
      return;
    }
    setSearchesLoading(true);
    listSavedSearches(leadId)
      .then(setSearches)
      .finally(() => setSearchesLoading(false));
  }, [leadId]);

  const removeSearch = async (searchId: string) => {
    if (!leadId) return;
    setDeletingId(searchId);
    const ok = await deleteSavedSearch(leadId, searchId);
    if (ok) setSearches((prev) => prev.filter((s) => s.id !== searchId));
    setDeletingId(null);
  };

  if (authLoading) return null;

  if (!leadId) {
    return (
      <div className="container">
        <div className="mp-gate-wrap">
          <div className="mp-gate">
            <span className="mp-gate-ic"><LockIcon /></span>
            <span className="mp-gate-badge">Not signed in</span>
            <h1>My Search Portal</h1>
            <p>Log in to see your favorite properties and saved searches.</p>
            <div className="mp-gate-btns">
              <button type="button" className="btn btn-gold btn-magnetic" onClick={() => requireLead()}>
                <span>Log In / Register</span>
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="mp-head">
          <div>
            <h1>My Search Portal</h1>
            <p>Manage your favorite properties and saved searches in one place.</p>
          </div>
          <div className="mp-stats">
            <div className="mp-stat"><b>{favorites.length}</b><span>Properties Saved</span></div>
            <div className="mp-stat"><b>{searches.length}</b><span>Saved Searches</span></div>
          </div>
        </div>

        <div className="mp-tabs" role="tablist" aria-label="Portal sections">
          <button role="tab" aria-selected={tab === "favorites"} className={`mp-tab${tab === "favorites" ? " is-active" : ""}`} onClick={() => setTab("favorites")}>
            Favorites <span className="count">{favorites.length}</span>
          </button>
          <button role="tab" aria-selected={tab === "searches"} className={`mp-tab${tab === "searches" ? " is-active" : ""}`} onClick={() => setTab("searches")}>
            Saved Searches <span className="count">{searches.length}</span>
          </button>
        </div>
      </div>

      <div className="container mp-body">
        {tab === "favorites" ? (
          listingsLoading ? (
            <PageLoader />
          ) : favorites.length === 0 ? (
            <div className="mp-gate">
              <h1>No saved properties yet</h1>
              <p>Tap the heart icon on any listing in Home Search to save it here.</p>
              <div className="mp-gate-btns">
                <a href="/home-search" className="btn btn-gold btn-magnetic">
                  <span>Browse Homes</span>
                  <ArrowRight />
                </a>
              </div>
            </div>
          ) : (
            <div className="mp-grid">
              {favorites.map((p) => (
                <PropertyCard
                  key={p.slug}
                  p={p}
                  href={`/${p.slug}`}
                  showSave
                  initialSaved
                  onToggleSaved={(mlsId, isSaved) => {
                    if (isSaved) return;
                    setSavedMls((prev) => {
                      const next = new Set(prev);
                      next.delete(mlsId);
                      return next;
                    });
                  }}
                />
              ))}
            </div>
          )
        ) : searchesLoading ? (
          <PageLoader />
        ) : searches.length === 0 ? (
          <div className="mp-gate">
            <h1>No saved searches yet</h1>
            <p>Save a search from Home Search and it&rsquo;ll show up here.</p>
            <div className="mp-gate-btns">
              <a href="/home-search" className="btn btn-gold btn-magnetic">
                <span>Browse Homes</span>
                <ArrowRight />
              </a>
            </div>
          </div>
        ) : (
          <div className="mp-saved">
            {searches.map((s) => (
              <article className="mp-saved-card" key={s.id}>
                <div className="mp-saved-top">
                  <h3 className="mp-saved-name">{s.name}</h3>
                </div>
                <div className="mp-saved-crit">
                  <span>{criteriaSummary(s.criteria)}</span>
                </div>
                <div className="mp-saved-foot">
                  <a href="/home-search" className="mp-saved-view">
                    Go to Home Search →
                  </a>
                  <button
                    onClick={() => removeSearch(s.id)}
                    disabled={deletingId === s.id}
                    className="mp-signout"
                  >
                    {deletingId === s.id ? "Removing…" : "Remove"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
