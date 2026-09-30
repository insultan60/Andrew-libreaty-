import type { Metadata } from "next";
import Link from "next/link";
import { loadDashboard, pageRows } from "@/lib/analytics/load";
import TrendChart from "../components/TrendChart";
import FunnelChart from "../components/FunnelChart";
import PagesTable from "../components/PagesTable";
import { NotLiveBanner, SectionHead, Shell } from "../components/Chrome";
import { Card, Stat } from "../components/panels";

export const metadata: Metadata = { title: "Overview | Andrew Liberty Team" };
export const revalidate = 900;

interface Props {
  searchParams: Promise<{ range?: string }>;
}

export default async function OverviewPage({ searchParams }: Props) {
  const { range } = await searchParams;
  const { days, ga, gsc, incomplete, collecting } = await loadDashboard(range);

  const t = ga.data.totals;
  const g = gsc.data.totals;
  const rows = pageRows(ga);

  return (
    <Shell>
      <SectionHead
        title="Overview"
        lead={`The last ${days} days at a glance, each figure against the same length of time before it.`}
        days={days}
        basePath="/dashboard"
      />

      {incomplete ? <NotLiveBanner collecting={collecting} /> : null}

      <div className="dash-stats dash-stats-5">
        <Stat
          label="Users"
          value={t.activeUsers}
          previous={ga.data.previousTotals?.activeUsers ?? null}
          unavailable={!ga.live}
        />
        <Stat
          label="Sessions"
          value={t.sessions}
          previous={ga.data.previousTotals?.sessions ?? null}
          unavailable={!ga.live}
        />
        <Stat
          label="Page views"
          value={t.screenPageViews}
          previous={ga.data.previousTotals?.screenPageViews ?? null}
          unavailable={!ga.live}
        />
        <Stat
          label="Search impressions"
          value={Math.round(g.impressions)}
          previous={gsc.data.previousTotals ? Math.round(gsc.data.previousTotals.impressions) : null}
          hint="Times the site appeared in Google"
          unavailable={!gsc.live}
        />
        <Stat
          label="Search clicks"
          value={Math.round(g.clicks)}
          previous={gsc.data.previousTotals ? Math.round(gsc.data.previousTotals.clicks) : null}
          hint="Times someone chose it"
          unavailable={!gsc.live}
        />
      </div>

      <div className="dash-row dash-row-split">
        <Card
          title="From search result to reader"
          hint="Each stage as a share of the one before it"
        >
          <FunnelChart
            stages={[
              {
                label: "Impressions",
                value: Math.round(g.impressions),
                note: "appeared in Google",
                available: gsc.live,
              },
              {
                label: "Clicks",
                value: Math.round(g.clicks),
                note: "chose the result",
                available: gsc.live,
              },
              {
                label: "Sessions",
                value: t.sessions,
                note: "visits, all sources",
                available: ga.live,
              },
              {
                label: "Page views",
                value: t.screenPageViews,
                note: "pages opened",
                available: ga.live,
              },
            ]}
          />
        </Card>

        {/* Two charts rather than one with two series. Users and page views
            are different measures, and each gets its own scale so neither is
            flattened against the other. */}
        <div className="dash-stack">
          <Card title="Users per day" hint={`Last ${days} days`}>
            <TrendChart
              label="Users"
              points={ga.data.daily.map((d) => ({ date: d.date, value: d.users }))}
            />
          </Card>
          <Card title="Page views per day" hint="On its own scale">
            <TrendChart
              label="Page views"
              points={ga.data.daily.map((d) => ({ date: d.date, value: d.views }))}
            />
          </Card>
        </div>
      </div>

      <div className="dash-row">
        <Card
          title="Most read pages"
          hint="Top ten by views"
          action={
            <Link href={`/dashboard/pages?range=${days}`} className="dash-pill">
              All pages &rarr;
            </Link>
          }
        >
          <PagesTable rows={rows.slice(0, 10)} connected={ga.live} compact />
        </Card>
      </div>
    </Shell>
  );
}
