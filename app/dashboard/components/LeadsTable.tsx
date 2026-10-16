"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/**
 * The lead list: searchable, sortable, and exportable as a CSV.
 *
 * The export is built here in the browser from rows the page already has,
 * rather than from a download route. A route would be one more URL serving
 * every lead's contact details that had to be kept behind the dashboard gate;
 * this way there is nothing new to protect.
 */

export interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  subscribeDate: string;
  lastActivity: string;
}

type SortKey = "name" | "subscribeDate" | "lastActivity";

function shortDate(s: string): string {
  if (!s) return "—";
  const d = new Date(`${s.slice(0, 10)}T12:00:00`);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function csvCell(s: string): string {
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function download(rows: LeadRow[]) {
  const head = ["Name", "Email", "Phone", "Signed up", "Last active"];
  const body = rows.map((r) =>
    [r.name, r.email, r.phone, r.subscribeDate, r.lastActivity].map(csvCell).join(","),
  );
  const blob = new Blob([[head.join(","), ...body].join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `andrew-liberty-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function LeadsTable({ leads }: { leads: LeadRow[] }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("subscribeDate");
  const [asc, setAsc] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const digits = needle.replace(/\D/g, "");
    const hits = needle
      ? leads.filter(
          (l) =>
            l.name.toLowerCase().includes(needle) ||
            l.email.toLowerCase().includes(needle) ||
            (digits.length >= 3 && l.phone.replace(/\D/g, "").includes(digits)),
        )
      : leads;
    const out = [...hits].sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : b[sort].localeCompare(a[sort]),
    );
    return asc ? out.reverse() : out;
  }, [leads, q, sort, asc]);

  const visible = showAll ? filtered : filtered.slice(0, 25);

  function head(key: SortKey, label: string) {
    const active = sort === key;
    return (
      <th scope="col" aria-sort={active ? (asc ? "ascending" : "descending") : "none"}>
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

  if (leads.length === 0) {
    return <p className="dash-empty">No leads yet. They appear here as soon as someone fills in a form.</p>;
  }

  return (
    <>
      <div className="dash-leads-tools">
        <input
          type="search"
          className="dash-leads-search"
          placeholder="Search name, email or phone"
          aria-label="Search leads"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="button" className="dash-pill" onClick={() => download(filtered)}>
          Download CSV{q ? ` (${filtered.length})` : ""}
        </button>
      </div>

      <div className="dash-table-wrap">
        <table className="dash-table dash-leads-table">
          <thead>
            <tr>
              {head("name", "Name")}
              <th scope="col">Contact</th>
              {head("subscribeDate", "Signed up")}
              {head("lastActivity", "Last active")}
            </tr>
          </thead>
          <tbody>
            {visible.map((l) => (
              <tr key={l.id}>
                <td>
                  <Link href={`/dashboard/leads/${l.id}`} className="dash-lead-name">
                    {l.name}
                  </Link>
                  <span className="dash-lead-sub">{shortDate(l.subscribeDate)}</span>
                </td>
                <td>
                  {l.email ? (
                    <a href={`mailto:${l.email}`} className="dash-lead-contact">
                      {l.email}
                    </a>
                  ) : null}
                  {l.phone ? (
                    <a href={`tel:${l.phone.replace(/[^\d+]/g, "")}`} className="dash-lead-contact is-soft">
                      {l.phone}
                    </a>
                  ) : null}
                </td>
                <td className="dash-lead-date">{shortDate(l.subscribeDate)}</td>
                <td className="dash-lead-date">{shortDate(l.lastActivity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 ? <p className="dash-empty">No lead matches &ldquo;{q}&rdquo;.</p> : null}

      {filtered.length > 25 ? (
        <div className="dash-table-foot">
          <span className="dash-quiet">
            Showing {visible.length} of {filtered.length}
          </span>
          <button type="button" className="dash-pill" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show fewer" : "Show all"}
          </button>
        </div>
      ) : null}
    </>
  );
}
