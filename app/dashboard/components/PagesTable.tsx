"use client";

import { useMemo, useState } from "react";
import { pageName } from "@/lib/analytics/sitePages";

/**
 * Every page on the site, sortable.
 *
 * Before analytics is connected this is the site's real route list reading
 * zero, which is more use than an empty box: it is a straight answer to "what
 * pages do we have", and it makes obvious that the zeros are a configuration
 * state rather than a traffic finding.
 *
 * The share bar is proportion-of-total, one hue, length as the encoding.
 */

export interface PageRow {
  path: string;
  views: number;
  users: number;
}

type SortKey = "name" | "views" | "users";

export default function PagesTable({
  rows,
  connected,
  compact = false,
  initialShowAll = false,
}: {
  rows: PageRow[];
  connected: boolean;
  /** already a trimmed list (the overview) — no expander, no footer note */
  compact?: boolean;
  initialShowAll?: boolean;
}) {
  const [sort, setSort] = useState<SortKey>("views");
  const [asc, setAsc] = useState(false);
  const [showAll, setShowAll] = useState(initialShowAll);

  const total = rows.reduce((n, r) => n + r.views, 0);

  const sorted = useMemo(() => {
    const out = [...rows].sort((a, b) => {
      if (sort === "name") return pageName(a.path).localeCompare(pageName(b.path));
      return b[sort] - a[sort];
    });
    return asc ? out.reverse() : out;
  }, [rows, sort, asc]);

  const visible = compact || showAll ? sorted : sorted.slice(0, 10);

  function head(key: SortKey, label: string, right = false) {
    const active = sort === key;
    return (
      <th
        scope="col"
        className={right ? "dash-th-right" : undefined}
        aria-sort={active ? (asc ? "ascending" : "descending") : "none"}
      >
        <button
          type="button"
          onClick={() => {
            if (active) setAsc(!asc);
            else {
              setSort(key);
              setAsc(false);
            }
          }}
          className={`dash-sort${active ? " is-active" : ""}`}
        >
          {label}
          <span aria-hidden="true" className="dash-sort-caret">
            {active && asc ? "▲" : "▼"}
          </span>
        </button>
      </th>
    );
  }

  return (
    <div>
      <div className="dash-table-wrap">
        <table className="dash-table">
          <thead>
            <tr>
              {head("name", "Page")}
              <th scope="col">Share of views</th>
              {head("views", "Views", true)}
              {head("users", "Users", true)}
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.path}>
                <td className="dash-cell-page">
                  <p className="dash-page-name" title={r.path}>
                    {pageName(r.path)}
                  </p>
                  <p className="dash-page-path" title={r.path}>
                    {r.path}
                  </p>
                </td>
                <td>
                  <div className="dash-track">
                    {total > 0 ? (
                      <div
                        className="dash-fill"
                        style={{
                          width: `${Math.max((r.views / total) * 100, r.views > 0 ? 1.5 : 0)}%`,
                        }}
                      />
                    ) : null}
                  </div>
                </td>
                <td className="dash-num">{r.views.toLocaleString()}</td>
                <td className="dash-num-soft">{r.users.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {compact ? null : (
        <div className="dash-table-foot">
          {sorted.length > 10 ? (
            <button type="button" onClick={() => setShowAll(!showAll)} className="dash-pill">
              {showAll ? "Show top 10" : `Show all ${sorted.length} pages`}
            </button>
          ) : (
            <span />
          )}
          {!connected ? (
            <p className="dash-quiet">
              The site&rsquo;s real pages, all reading zero &mdash; nothing is measuring them yet.
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}
