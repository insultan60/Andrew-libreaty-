import type { Metadata } from "next";
import { fetchLeads, leadCounts } from "@/lib/leads";
import { SectionHead, Shell } from "../../components/Chrome";
import { Card, Stat } from "../../components/panels";
import LeadsTable from "../../components/LeadsTable";

export const metadata: Metadata = { title: "Leads | Andrew Liberty Team" };

/* Read fresh on every visit: the lead that arrived a minute ago is the one
   that matters most, so this page is never served from a cache. */
export const dynamic = "force-dynamic";

export default async function LeadsSection() {
  const { leads, error } = await fetchLeads();
  const { new7, new30, active30 } = leadCounts(leads);

  return (
    <Shell>
      <SectionHead
        title="Leads"
        lead="Everyone who has filled in a form or signed up on the site, newest first. Pulled live from IDX Broker."
        days={0}
        basePath="/dashboard/leads"
        showRange={false}
      />

      {error ? (
        <div className="dash-banner">
          <span aria-hidden="true" className="dash-banner-mark">
            !
          </span>
          <div>
            <p className="dash-banner-title">Leads could not be loaded</p>
            <p className="dash-banner-body">{error}</p>
          </div>
        </div>
      ) : null}

      <div className="dash-stats dash-stats-4">
        <Stat label="All leads" value={leads.length} unavailable={!!error}
          compare={false} hint="Everyone on file" />
        <Stat label="New this week" value={new7} unavailable={!!error}
          compare={false} hint="Signed up in the last 7 days" />
        <Stat label="New this month" value={new30} unavailable={!!error}
          compare={false} hint="Signed up in the last 30 days" />
        <Stat
          label="Active this month"
          value={active30}
          unavailable={!!error}
          compare={false}
          hint="Searched, saved or logged in recently"
        />
      </div>

      {/* Hidden on an error so "no leads yet" never stands in for "could not read them". */}
      {error ? null : (
        <div className="dash-row">
          <Card title="Every lead" hint="Click a name for their details, saved searches and favorites">
            <LeadsTable
              leads={leads.map((l) => ({
                id: l.id,
                name: l.name,
                email: l.email,
                phone: l.phone,
                subscribeDate: l.subscribeDate,
                lastActivity: l.lastActivity,
              }))}
            />
          </Card>
        </div>
      )}
    </Shell>
  );
}
