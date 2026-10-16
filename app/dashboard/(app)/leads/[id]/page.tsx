import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { fetchLeadDetail, shortDate } from "@/lib/leads";
import { Shell } from "../../../components/Chrome";
import { Card } from "../../../components/panels";

export const metadata: Metadata = { title: "Lead | Andrew Liberty Team" };
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

/** "minPrice" → "Min price" for the saved-search criteria IDX stores. */
function label(key: string): string {
  const s = key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/_/g, " ").toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default async function LeadPage({ params }: Props) {
  const { id } = await params;
  const { lead, notes, searches, favorites, error } = await fetchLeadDetail(id);

  if (error) {
    return (
      <Shell>
        <Link href="/dashboard/leads" className="dash-back">
          ← All leads
        </Link>
        <div className="dash-banner">
          <span aria-hidden="true" className="dash-banner-mark">
            !
          </span>
          <div>
            <p className="dash-banner-title">This lead could not be loaded</p>
            <p className="dash-banner-body">{error}</p>
          </div>
        </div>
      </Shell>
    );
  }
  if (!lead) notFound();

  return (
    <Shell>
      <Link href="/dashboard/leads" className="dash-back">
        ← All leads
      </Link>

      <div className="dash-head">
        <div className="dash-head-text">
          <h1 className="dash-title">{lead.name}</h1>
          <p className="dash-lead">
            Signed up {shortDate(lead.subscribeDate)}
            {lead.lastActivity ? ` · last active ${shortDate(lead.lastActivity)}` : ""}
          </p>
        </div>
        <div className="dash-lead-actions">
          {lead.email ? (
            <a href={`mailto:${lead.email}`} className="dash-pill">
              Email
            </a>
          ) : null}
          {lead.phone ? (
            <a href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`} className="dash-pill">
              Call
            </a>
          ) : null}
        </div>
      </div>

      <div className="dash-row dash-row-2">
        <Card title="Contact">
          <dl className="dash-dl">
            <dt>Email</dt>
            <dd>{lead.email || "—"}</dd>
            <dt>Phone</dt>
            <dd>{lead.phone || "—"}</dd>
            {lead.address ? (
              <>
                <dt>Address</dt>
                <dd>{lead.address}</dd>
              </>
            ) : null}
            <dt>Email updates</dt>
            <dd>{lead.receiveUpdates ? "Yes" : "No"}</dd>
            <dt>Last login</dt>
            <dd>{shortDate(lead.lastLogin)}</dd>
            {lead.extra.map(([k, v]) => (
              <Fragment key={k}>
                <dt>{label(k)}</dt>
                <dd>{v}</dd>
              </Fragment>
            ))}
          </dl>
        </Card>

        <Card title="Notes" hint="Messages and notes on file in IDX">
          {notes.length ? (
            <ul className="dash-notes">
              {notes.map((n) => (
                <li key={n.id}>
                  <p className="dash-note-body">{n.note}</p>
                  {n.created ? <p className="dash-quiet">{shortDate(n.created)}</p> : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="dash-empty">No notes.</p>
          )}
        </Card>
      </div>

      <div className="dash-row dash-row-2">
        <Card title="Saved searches" hint={`${searches.length} saved`}>
          {searches.length ? (
            <ul className="dash-notes">
              {searches.map((s) => (
                <li key={s.id}>
                  <p className="dash-note-title">
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.name}
                      </a>
                    ) : (
                      s.name
                    )}
                  </p>
                  {s.criteria.length ? (
                    <p className="dash-note-body">
                      {s.criteria.map(([k, v]) => `${label(k)}: ${v}`).join(" · ")}
                    </p>
                  ) : null}
                  {s.created ? <p className="dash-quiet">Saved {shortDate(s.created)}</p> : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="dash-empty">No saved searches.</p>
          )}
        </Card>

        <Card title="Favorite homes" hint={`${favorites.length} saved`}>
          {favorites.length ? (
            <ul className="dash-notes">
              {favorites.map((f) => (
                <li key={f.id}>
                  <p className="dash-note-title">
                    {f.href ? (
                      <Link href={f.href} target="_blank">
                        {f.label}
                      </Link>
                    ) : (
                      f.label
                    )}
                  </p>
                  {f.created ? <p className="dash-quiet">Saved {shortDate(f.created)}</p> : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="dash-empty">No favorites.</p>
          )}
        </Card>
      </div>
    </Shell>
  );
}
