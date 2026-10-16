import "server-only";

import { proxyIdxRequest } from "@/lib/idxProxy";
import { fetchRawListingsServer } from "@/lib/idxServer";
import { listingPath } from "@/lib/idx";

/**
 * The site's leads, read back out of IDX Broker for /dashboard/leads.
 *
 * Every form on the site (contact, valuation, listing enquiry, sign-up) files
 * its lead into IDX through createLead() in lib/idx.ts, so IDX is the one
 * place they all exist. This reads them server-side only: lead records are
 * names, emails and phone numbers, and nothing here may ever be reachable
 * from the public /api/idx proxy.
 *
 * Deliberately uncached. A lead that came in a minute ago is the one Andrew
 * most wants to see, and the dashboard is one person's page, not a public one
 * that could run through IDX's hourly limit.
 */

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  /** IDX "YYYY-MM-DD hh:mm:ss" strings, or "" */
  subscribeDate: string;
  lastActivity: string;
  lastLogin: string;
  receiveUpdates: boolean;
  disabled: boolean;
  /** every other non-empty field IDX returned, shown on the lead's own page */
  extra: [string, string][];
}

export interface LeadsResult {
  leads: Lead[];
  /** null when the read worked; otherwise a sentence saying why it did not */
  error: string | null;
}

type RawLead = Record<string, unknown>;

/** Fields rendered explicitly, so they are left out of `extra`. */
const KNOWN = new Set([
  "id", "firstName", "lastName", "email", "phone", "address", "city",
  "stateProvince", "zipCode", "country", "subscribeDate", "lastActivityDate",
  "lastLoginDate", "lastEdited", "receiveUpdates", "disabled", "canLogin",
]);

function str(v: unknown): string {
  if (v == null) return "";
  return String(v).trim();
}

/** IDX writes "0000-00-00 00:00:00" for "never". */
function date(v: unknown): string {
  const s = str(v);
  return !s || s.startsWith("0000") ? "" : s;
}

function yes(v: unknown): boolean {
  const s = str(v).toLowerCase();
  return s === "y" || s === "yes" || s === "1" || s === "true";
}

function toLead(raw: RawLead): Lead {
  const firstName = str(raw.firstName);
  // The site's forms send "—" when someone gives one name only.
  const lastName = str(raw.lastName) === "—" ? "" : str(raw.lastName);
  const address = [raw.address, raw.city, raw.stateProvince, raw.zipCode]
    .map(str)
    .filter(Boolean)
    .join(", ");

  const extra: [string, string][] = [];
  for (const [k, v] of Object.entries(raw)) {
    if (KNOWN.has(k) || v == null || typeof v === "object") continue;
    const s = str(v);
    if (s && !s.startsWith("0000")) extra.push([k, s]);
  }

  return {
    id: str(raw.id),
    firstName,
    lastName,
    name: [firstName, lastName].filter(Boolean).join(" ") || str(raw.email) || "Unnamed lead",
    email: str(raw.email),
    phone: str(raw.phone),
    address,
    subscribeDate: date(raw.subscribeDate),
    lastActivity: date(raw.lastActivityDate) || date(raw.lastEdited),
    lastLogin: date(raw.lastLoginDate),
    receiveUpdates: yes(raw.receiveUpdates),
    disabled: yes(raw.disabled),
    extra,
  };
}

async function idxGet(path: string): Promise<{ status: number; json: unknown }> {
  const res = await proxyIdxRequest({ method: "GET", path, query: new URLSearchParams() });
  if (res.status === 204 || !res.body) return { status: res.status, json: null };
  if (res.status < 200 || res.status >= 300) return { status: res.status, json: null };
  try {
    return { status: res.status, json: JSON.parse(res.body) };
  } catch {
    return { status: 502, json: null };
  }
}

/** Older API versions answer with a bare array, newer ones with a paged
 *  { data, next } envelope. Either is accepted. */
function rowsOf(json: unknown): { rows: RawLead[]; next: string | null } {
  if (Array.isArray(json)) return { rows: json as RawLead[], next: null };
  if (json && typeof json === "object") {
    const o = json as { data?: unknown; next?: unknown };
    const data = Array.isArray(o.data)
      ? (o.data as RawLead[])
      : o.data && typeof o.data === "object"
        ? (Object.values(o.data) as RawLead[])
        : [];
    return { rows: data, next: typeof o.next === "string" && o.next ? o.next : null };
  }
  return { rows: [], next: null };
}

function explain(status: number): string {
  if (status === 500) return "IDX_BROKER_ACCESS_KEY is not set on this server, so leads cannot be read.";
  if (status === 401 || status === 403 || status === 406)
    return "IDX Broker refused the request. Check that the API key is correct and that its permissions include Leads.";
  if (status === 429) return "IDX Broker's hourly request limit was reached. Try again in a few minutes.";
  return `IDX Broker did not answer as expected (status ${status}). Try again shortly.`;
}

/** Newest first, following IDX's paging up to a sane ceiling. */
export async function fetchLeads(): Promise<LeadsResult> {
  try {
    const all: RawLead[] = [];
    let path: string | null = "leads/lead";
    for (let page = 0; path && page < 20; page += 1) {
      const { status, json } = await idxGet(path);
      if (status === 204) break;
      if (status < 200 || status >= 300) {
        return { leads: [], error: explain(status) };
      }
      const { rows, next } = rowsOf(json);
      all.push(...rows);
      path = next ? next.replace(/^https?:\/\/api\.idxbroker\.com\//, "") : null;
    }
    const leads = all.map(toLead).filter((l) => l.id);
    leads.sort((a, b) => b.subscribeDate.localeCompare(a.subscribeDate));
    return { leads, error: null };
  } catch {
    return { leads: [], error: "IDX Broker could not be reached. Try again shortly." };
  }
}

export interface LeadNote {
  id: string;
  note: string;
  created: string;
}

export interface LeadSearch {
  id: string;
  name: string;
  created: string;
  url: string;
  criteria: [string, string][];
}

export interface LeadFavorite {
  id: string;
  listingId: string;
  label: string;
  href: string | null;
  created: string;
}

export interface LeadDetail {
  lead: Lead | null;
  notes: LeadNote[];
  searches: LeadSearch[];
  favorites: LeadFavorite[];
  error: string | null;
}

export async function fetchLeadDetail(id: string): Promise<LeadDetail> {
  const empty: LeadDetail = { lead: null, notes: [], searches: [], favorites: [], error: null };
  if (!/^\d+$/.test(id)) return empty;

  try {
    const [leadRes, notesRes, searchRes, favRes, listings] = await Promise.all([
      idxGet(`leads/lead/${id}`),
      idxGet(`leads/note/${id}`),
      idxGet(`leads/search/${id}`),
      idxGet(`leads/property/${id}`),
      fetchRawListingsServer(),
    ]);

    if (leadRes.status >= 300) return { ...empty, error: explain(leadRes.status) };
    const rawLead = Array.isArray(leadRes.json)
      ? (leadRes.json[0] as RawLead | undefined)
      : (leadRes.json as RawLead | null);
    if (!rawLead || typeof rawLead !== "object") return empty;
    const lead = toLead({ id, ...rawLead });

    const notes: LeadNote[] = rowsOf(notesRes.json).rows.map((n) => ({
      id: str(n.id),
      note: str(n.note),
      created: date(n.created) || date(n.dateCreated),
    }));

    const rawSearches =
      (searchRes.json as { searchInformation?: RawLead[] } | null)?.searchInformation ?? [];
    const searches: LeadSearch[] = rawSearches.map((s) => ({
      id: str(s.id),
      name: str(s.searchName) || "Saved search",
      created: date(s.created),
      url: str(s.resultsURL),
      criteria: Object.entries((s.search as Record<string, unknown>) || {})
        .filter(([k, v]) => k !== "idxID" && str(v))
        .map(([k, v]) => [k, Array.isArray(v) ? v.join(", ") : str(v)]),
    }));

    const byId = new Map((listings ?? []).map((l) => [l.listingID, l]));
    const favorites: LeadFavorite[] = rowsOf(favRes.json).rows.map((f) => {
      const prop = (f.property as Record<string, unknown>) || {};
      const listingId = str(prop.listingID) || str(f.listingID) || str(f.propertyName);
      const match = byId.get(listingId);
      return {
        id: str(f.id),
        listingId,
        label: match ? `${match.address}, ${match.cityName}` : `MLS# ${listingId}`,
        href: match ? listingPath(match) : null,
        created: date(f.created),
      };
    });

    return { lead, notes, searches, favorites, error: null };
  } catch {
    return { ...empty, error: "IDX Broker could not be reached. Try again shortly." };
  }
}

/** "2026-10-13 09:41:00" → "Oct 13, 2026". IDX times are not zoned, so the
 *  date is shown and the clock time is not. */
export function shortDate(s: string): string {
  if (!s) return "—";
  const d = new Date(`${s.slice(0, 10)}T12:00:00`);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/** Whole days between an IDX date and now; Infinity for "never". */
export function daysAgo(s: string, now = Date.now()): number {
  if (!s) return Infinity;
  const t = new Date(`${s.slice(0, 10)}T12:00:00`).getTime();
  return Number.isNaN(t) ? Infinity : Math.floor((now - t) / 86_400_000);
}

/** The four headline counts on /dashboard/leads, measured from now. */
export function leadCounts(leads: Lead[]) {
  const now = Date.now();
  return {
    total: leads.length,
    new7: leads.filter((l) => daysAgo(l.subscribeDate, now) < 7).length,
    new30: leads.filter((l) => daysAgo(l.subscribeDate, now) < 30).length,
    active30: leads.filter((l) => daysAgo(l.lastActivity, now) < 30).length,
  };
}
