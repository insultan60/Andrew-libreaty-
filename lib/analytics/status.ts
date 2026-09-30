import { GTM_CONTAINER_ID, GA4_MEASUREMENT_ID } from "@/lib/site";

/**
 * What is actually wired up, and what is not.
 *
 * The dashboard always renders its full shape — every tile, every chart —
 * whether or not anything is connected. That is a deliberate choice: an empty
 * shell tells you what the page will look like once data arrives, which a wall
 * of setup text does not.
 *
 * But it carries an obvious risk. A row of zeros is indistinguishable from a
 * genuinely dead week unless the page says which one it is looking at, and
 * "nobody visited" and "nothing is measuring" are opposite conclusions that
 * would lead to opposite decisions. So every zero on this page is accompanied
 * by state from here, and the distinction is made in words, not by absence.
 */

export type SourceState = "live" | "missing" | "error";

export interface VarStatus {
  name: string;
  set: boolean;
  what: string;
}

export interface SourceStatus {
  key: "collection" | "ga4" | "gsc";
  title: string;
  state: SourceState;
  /** one line on what this source contributes */
  provides: string;
  vars: VarStatus[];
  /** set when state === 'error' */
  error?: string;
  /** set when the error is a known one: what to do about it, in words */
  fix?: string;
}

/**
 * Google's error bodies are JSON meant for developers. The two failures that
 * actually happen here — the service account was never granted access, or the
 * ID points at the wrong property — get a sentence naming the exact account
 * to add, so whoever owns the Google login can act without reading a stack.
 */
function explain(source: "ga4" | "gsc", error?: string): string | undefined {
  if (!error) return undefined;
  const who = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() || "the service account";
  if (/\((403)\)/.test(error) || /PERMISSION_DENIED/.test(error)) {
    return source === "ga4"
      ? `Google Analytics refused access. Open analytics.google.com → Admin → Property access management on property ${process.env.GA4_PROPERTY_ID ?? ""} and add ${who} as a Viewer. If it is already there, GA4_PROPERTY_ID is pointing at a different property.`
      : `Search Console refused access. Open search.google.com/search-console → Settings → Users and permissions and add ${who} as a Restricted user.`;
  }
  if (/\((404)\)/.test(error)) {
    return source === "ga4"
      ? "Google Analytics has no property with that ID. Check GA4_PROPERTY_ID against Admin → Property details — it is the number, not the G- ID."
      : "Search Console has no property by that name. GSC_SITE_URL must match the property exactly, e.g. sc-domain:andrewliberty.com.";
  }
  if (/DECODER|PEM|private key/i.test(error)) {
    return "The private key could not be read. Copy private_key from the service account JSON again, in quotes, with its literal backslash-n line breaks left as they are.";
  }
  return undefined;
}

function has(name: string): boolean {
  return Boolean(process.env[name]?.trim());
}

/**
 * Collection is listed separately from reporting on purpose. A tag is what
 * *records* visits; the property ID and service account only *read* them back.
 * Someone can wire the reading side perfectly and still see zeros forever
 * because nothing is recording, and that failure is invisible unless the two
 * are shown apart.
 *
 * This site differs from a plain gtag install in a way that matters here. The
 * Tag Manager container is already hard-coded into the root layout, so the
 * container is definitely on every page — that is a fact read from the code,
 * not from an environment variable, and it is stated as such. What this code
 * CANNOT see is what is configured inside that container: whether a GA4
 * configuration tag lives in it, and which property it points at. That is why
 * GA4_MEASUREMENT_ID exists.
 *
 * It is deliberately NOT a NEXT_PUBLIC_ variable and deliberately does not
 * inject a gtag snippet. Adding a second tag beside the container would
 * double-count every session on the site. It is a written-down confirmation of
 * which GA4 stream the container fires, nothing more, so it stays server-side.
 */
export function collectionStatus(): SourceStatus {
  const set = Boolean(GA4_MEASUREMENT_ID);
  return {
    key: "collection",
    title: "Tracking tag",
    state: set ? "live" : "missing",
    provides: set
      ? `Tag Manager container ${GTM_CONTAINER_ID} is installed on every page, and the GA4 stream it fires is recorded as ${GA4_MEASUREMENT_ID}.`
      : `Tag Manager container ${GTM_CONTAINER_ID} is installed on every page, but nothing here confirms a GA4 tag inside it. If the container has no GA4 configuration tag, nothing is being recorded and no history is accumulating.`,
    vars: [
      {
        name: "GA4_MEASUREMENT_ID",
        set,
        what: `The GA4 measurement ID (G-XXXXXXXXXX) that the ${GTM_CONTAINER_ID} container fires. Open tagmanager.google.com, find the GA4 configuration tag, and copy the ID out of it. Setting this does not install a second tag — it only records which stream is already live, so this panel can stop guessing.`,
      },
    ],
  };
}

export function ga4Status(error?: string): SourceStatus {
  const vars: VarStatus[] = [
    {
      name: "GA4_PROPERTY_ID",
      set: has("GA4_PROPERTY_ID"),
      what: "Numeric property ID, from Admin → Property details. Not the G- id.",
    },
    {
      name: "GOOGLE_SERVICE_ACCOUNT_EMAIL",
      set: has("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
      what: "Service account address, ending @<project>.iam.gserviceaccount.com.",
    },
    {
      name: "GOOGLE_PRIVATE_KEY",
      set: has("GOOGLE_PRIVATE_KEY"),
      what: "private_key from the service account JSON, with the literal backslash-n line breaks left exactly as they are in the file.",
    },
  ];
  const complete = vars.every((v) => v.set);
  return {
    key: "ga4",
    title: "Google Analytics",
    state: error ? "error" : complete ? "live" : "missing",
    provides: "Visitors, sessions, page views, devices, cities, and which pages get read.",
    vars,
    error,
    fix: explain("ga4", error),
  };
}

export function gscStatus(error?: string): SourceStatus {
  const vars: VarStatus[] = [
    {
      name: "GSC_SITE_URL",
      set: has("GSC_SITE_URL"),
      what: "Exactly as Search Console lists it — sc-domain:andrewliberty.com for a domain property, or https://andrewliberty.com/ with the trailing slash for a URL-prefix one.",
    },
    {
      name: "GOOGLE_SERVICE_ACCOUNT_EMAIL",
      set: has("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
      what: "The same service account as above.",
    },
    {
      name: "GOOGLE_PRIVATE_KEY",
      set: has("GOOGLE_PRIVATE_KEY"),
      what: "The same private key as above.",
    },
  ];
  const complete = vars.every((v) => v.set);
  return {
    key: "gsc",
    title: "Search Console",
    state: error ? "error" : complete ? "live" : "missing",
    provides:
      "Impressions, clicks, click-through rate, ranking position, and the queries people search. The site is already verified in Search Console, so the property exists — these variables only grant this page read access to it.",
    vars,
    error,
    fix: explain("gsc", error),
  };
}

/** True when nothing at all is wired, which changes the page's headline. */
export function nothingConnected(sources: SourceStatus[]): boolean {
  return sources.every((s) => s.state === "missing");
}
