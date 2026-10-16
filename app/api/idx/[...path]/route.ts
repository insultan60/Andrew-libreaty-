import { NextRequest, NextResponse } from "next/server";
import { proxyIdxRequest } from "@/lib/idxProxy";

/**
 * This route is public — the browser calls it for listings, sign-ups, saved
 * searches and favorites — so it must never hand out the lead list. Before
 * this guard, GET /api/idx/leads/lead returned every lead's name, email and
 * phone to anyone who asked. The dashboard reads leads server-side instead
 * (lib/leads.ts), so nothing legitimate needs these reads through here.
 */
function refused(method: string, path: string, query: URLSearchParams): boolean {
  const p = path.toLowerCase().replace(/\/+$/, "");
  // Notes, and anything that deletes or rewrites a lead record.
  if (p.startsWith("leads/note")) return true;
  if (p.startsWith("leads/lead/")) return true;
  if (p === "leads/lead" && method !== "PUT" && method !== "GET") return true;
  // The one lead read the site needs is "does this email already exist"
  // (lib/idx.ts findLeadByEmail); without an email it is the whole list.
  if (p === "leads/lead" && method === "GET" && !query.get("email")) return true;
  return false;
}

async function handle(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const query = new URLSearchParams(req.nextUrl.search);

  if (refused(req.method, path.join("/"), query)) {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }

  let jsonBody: Record<string, unknown> | undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    try {
      jsonBody = await req.json();
    } catch {
      jsonBody = undefined;
    }
  }

  const result = await proxyIdxRequest({
    method: req.method,
    path: path.join("/"),
    query,
    jsonBody,
  });

  // The Fetch spec forbids a body on null-body statuses (204/205/304) — even
  // an empty string throws when constructing the Response. IDX Broker
  // returns a bare 204 for "no results" on some calls (e.g. an account with
  // zero featured listings), so this isn't just theoretical.
  const nullBodyStatus = result.status === 204 || result.status === 205 || result.status === 304;

  // The email lookup only needs the matching lead's id. Strip the rest so an
  // email address is not enough to read back someone's phone and address.
  if (req.method === "GET" && path.join("/").toLowerCase() === "leads/lead" && !nullBodyStatus) {
    try {
      const parsed = JSON.parse(result.body) as { data?: unknown } | unknown[];
      const rows = (Array.isArray(parsed) ? parsed : Array.isArray(parsed.data) ? parsed.data : []) as {
        id?: unknown;
        email?: unknown;
      }[];
      const want = (query.get("email") || "").toLowerCase();
      const data = rows
        .filter((r) => String(r.email ?? "").toLowerCase() === want)
        .map((r) => ({ id: String(r.id ?? ""), email: String(r.email ?? "") }));
      return NextResponse.json({ data }, { status: result.status });
    } catch {
      return NextResponse.json({ data: [] }, { status: result.status });
    }
  }

  return new NextResponse(nullBodyStatus ? null : result.body, {
    status: result.status,
    headers: { "Content-Type": result.contentType },
  });
}

export const GET = handle;
export const PUT = handle;
export const POST = handle;
export const DELETE = handle;
