"use client";

import { useEffect, useMemo, useState } from "react";
import { countFor, DEFAULT_STATE, type SearchState, type Listing } from "./listings";
import { mlsSearch } from "@/lib/mlsSearch";

const Caret = () => (
  <svg className="acc-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const TYPE_CHIPS = [
  { val: "House", label: "Houses" },
  { val: "Townhouse", label: "Townhomes" },
  { val: "Multi-Family", label: "Multi-family" },
  { val: "Condo", label: "Condos" },
  { val: "Land", label: "Land" },
];
const STATUS_CHIPS = [
  { val: "Active", label: "Active" },
  { val: "Pending", label: "Pending" },
  { val: "Sold", label: "Sold" },
];
function Seg({
  options,
  value,
  onChange,
}: {
  options: { val: number; label: string }[];
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="seg">
      {options.map((o, i) => (
        <button
          key={o.label + i}
          className={`seg-btn${value === o.val ? " is-active" : ""}`}
          onClick={() => onChange(o.val)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const BEDS = [
  { val: 0, label: "Any" }, { val: 0, label: "Studio" }, { val: 1, label: "1+" },
  { val: 2, label: "2+" }, { val: 3, label: "3+" }, { val: 4, label: "4+" }, { val: 5, label: "5+" },
];
const BATHS = [
  { val: 0, label: "Any" }, { val: 1, label: "1+" }, { val: 1.5, label: "1.5+" }, { val: 2, label: "2+" },
  { val: 3, label: "3+" }, { val: 4, label: "4+" }, { val: 5, label: "5+" },
];
type Draft = {
  status: string[];
  types: string[];
  priceMin: string;
  priceMax: string;
  beds: number;
  baths: number;
  sqftMin: string;
  keywords: string;
  mls: string;
};

function seed(state: SearchState): Draft {
  return {
    status: state.status,
    types: state.types,
    priceMin: state.priceMin != null ? String(state.priceMin) : "",
    priceMax: state.priceMax != null ? String(state.priceMax) : "",
    beds: state.beds,
    baths: state.baths,
    sqftMin: state.sqft ? String(state.sqft) : "",
    keywords: state.q, mls: "",
  };
}

export default function FiltersDrawer({
  open,
  state,
  listings,
  onApply,
  onReset,
  onClose,
  rent,
  onRentChange,
}: {
  open: boolean;
  state: SearchState;
  listings: Listing[];
  onApply: (next: Partial<SearchState>) => void;
  onReset: () => void;
  onClose: () => void;
  /** For sale vs for rent. Only the full-MLS search has rentals. */
  rent: boolean;
  onRentChange: (rent: boolean) => void;
}) {
  const [draft, setDraft] = useState<Draft>(() => seed(state));
  const [filterQ, setFilterQ] = useState("");

  // Re-seed the draft from committed state each time the drawer opens.
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- re-seeds the drawer's draft state when it opens, not a sync-on-mount read
      setDraft(seed(state));
      setFilterQ("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const set = <K extends keyof Draft>(key: K, val: Draft[K]) => setDraft((d) => ({ ...d, [key]: val }));
  const toggleIn = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const count = useMemo(
    () =>
      countFor(listings, {
        status: draft.status,
        types: draft.types,
        priceMin: draft.priceMin ? +draft.priceMin : null,
        priceMax: draft.priceMax ? +draft.priceMax : null,
        beds: draft.beds,
        baths: draft.baths,
        sqft: draft.sqftMin ? +draft.sqftMin : 0,
        q: draft.keywords.trim() || draft.mls.trim(),
        area: state.area,
      }),
    [draft, listings, state.area]
  );

  const apply = () => {
    onApply({
      status: draft.status,
      types: draft.types,
      priceMin: draft.priceMin ? +draft.priceMin : null,
      priceMax: draft.priceMax ? +draft.priceMax : null,
      beds: draft.beds,
      baths: draft.baths,
      sqft: draft.sqftMin ? +draft.sqftMin : 0,
      q: draft.keywords.trim() || draft.mls.trim(),
    });
    onClose();
  };

  /* The same draft filters, run against every active MLS listing. */
  const mlsUrl = mlsSearch({
    area: state.area as Parameters<typeof mlsSearch>[0]["area"],
    location: draft.keywords.trim(),
    rent,
    priceMin: draft.priceMin ? +draft.priceMin : null,
    priceMax: draft.priceMax ? +draft.priceMax : null,
    beds: draft.beds,
    baths: draft.baths,
    sqft: draft.sqftMin ? +draft.sqftMin : 0,
    types: draft.types,
    sort: state.sort,
  }).url;

  const reset = () => {
    setDraft(seed(DEFAULT_STATE));
    onReset();
  };

  const priceQuick = (min: string, max: string) => {
    set("priceMin", min);
    setDraft((d) => ({ ...d, priceMin: min, priceMax: max }));
  };

  // Which accordions to show given the "search for a filter" query
  const accVisible = (sec: string, featureLabels: string[] = []) => {
    const q = filterQ.trim().toLowerCase();
    if (!q) return true;
    return sec.toLowerCase().includes(q) || featureLabels.some((f) => f.toLowerCase().includes(q));
  };

  return (
    <>
      {open && <div className="drawer-scrim" onClick={onClose} />}
      <aside
        className={`filters-drawer${open ? " is-open" : ""}`}
        aria-label="All filters"
        aria-hidden={!open}
      >
        <div className="drawer-head">
          <h2>Filters</h2>
          <button className="drawer-close" aria-label="Close filters" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          <div className="salerent-toggle">
            {(["sale", "rent"] as const).map((v) => (
              <button
                key={v}
                className={`sr-btn${(v === "rent") === rent ? " is-active" : ""}`}
                aria-pressed={(v === "rent") === rent}
                onClick={() => onRentChange(v === "rent")}
              >
                {v === "sale" ? "For sale" : "For rent"}
              </button>
            ))}
          </div>

          <div className="drawer-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              placeholder="Search for a filter…"
              aria-label="Search for a filter"
              value={filterQ}
              onChange={(e) => setFilterQ(e.target.value)}
            />
          </div>

          {accVisible("Price") && (
            <details className="acc" open>
              <summary>Price<Caret /></summary>
              <div className="acc-body">
                <div className="price-inputs">
                  <label>
                    Min
                    <input type="number" placeholder="No min" step={50000} value={draft.priceMin} onChange={(e) => set("priceMin", e.target.value)} />
                  </label>
                  <span className="price-dash">to</span>
                  <label>
                    Max
                    <input type="number" placeholder="No max" step={50000} value={draft.priceMax} onChange={(e) => set("priceMax", e.target.value)} />
                  </label>
                </div>
                <div className="price-quick">
                  <button onClick={() => priceQuick("", "1000000")}>Under $1M</button>
                  <button onClick={() => priceQuick("1000000", "2000000")}>$1M–$2M</button>
                  <button onClick={() => priceQuick("2000000", "5000000")}>$2M–$5M</button>
                  <button onClick={() => priceQuick("5000000", "")}>$5M+</button>
                </div>
              </div>
            </details>
          )}

          {accVisible("Bedrooms") && (
            <details className="acc" open>
              <summary>Bedrooms<Caret /></summary>
              <div className="acc-body">
                <Seg options={BEDS} value={draft.beds} onChange={(v) => set("beds", v)} />
              </div>
            </details>
          )}

          {accVisible("Bathrooms") && (
            <details className="acc" open>
              <summary>Bathrooms<Caret /></summary>
              <div className="acc-body">
                <Seg options={BATHS} value={draft.baths} onChange={(v) => set("baths", v)} />
              </div>
            </details>
          )}

          {accVisible("Property types") && (
            <details className="acc" open>
              <summary>Property types<Caret /></summary>
              <div className="acc-body">
                <div className="chip-row">
                  {TYPE_CHIPS.map((c) => (
                    <button
                      key={c.val}
                      className={`chip${draft.types.includes(c.val) ? " is-active" : ""}`}
                      onClick={() => set("types", toggleIn(draft.types, c.val))}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </details>
          )}

          {accVisible("Listing status") && (
            <details className="acc">
              <summary>Listing status<Caret /></summary>
              <div className="acc-body">
                <div className="chip-row">
                  {STATUS_CHIPS.map((c) => (
                    <button
                      key={c.val}
                      className={`chip${draft.status.includes(c.val) ? " is-active" : ""}`}
                      onClick={() => set("status", toggleIn(draft.status, c.val))}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </details>
          )}

          {accVisible("Property details") && (
            <details className="acc">
              <summary>Property details<Caret /></summary>
              <div className="acc-body">
                <p className="acc-label">Minimum square feet</p>
                <div className="price-inputs">
                  <label className="full">Min<input type="number" placeholder="No min" step={250} value={draft.sqftMin} onChange={(e) => set("sqftMin", e.target.value)} /></label>
                </div>
              </div>
            </details>
          )}

          {accVisible("Advanced") && (
            <details className="acc">
              <summary>Advanced<Caret /></summary>
              <div className="acc-body">
                <p className="acc-label">Location</p>
                <input className="drawer-text" type="text" placeholder="City, neighborhood, or ZIP" value={draft.keywords} onChange={(e) => set("keywords", e.target.value)} />
                <p className="acc-label">MLS number (Andrew&rsquo;s listings)</p>
                <input className="drawer-text" type="text" placeholder="e.g. 26861057" value={draft.mls} onChange={(e) => set("mls", e.target.value)} />
              </div>
            </details>
          )}
        </div>

        <div className="drawer-foot">
          <button className="btn btn-tertiary" onClick={reset}>Reset filters</button>
          {!rent && (
            <button className="btn btn-secondary" onClick={apply}>
              <span>Andrew&rsquo;s:</span>&nbsp;<span>{count === 1 ? "1 home" : count.toLocaleString() + " homes"}</span>
            </button>
          )}
          <a className="btn btn-primary btn-magnetic" href={mlsUrl}>
            <span>Search full MLS</span>
          </a>
        </div>
      </aside>
    </>
  );
}
