import type { Metadata } from "next";
import { loadDashboard } from "@/lib/analytics/load";
import TrendChart from "../../components/TrendChart";
import { NotLiveBanner, SectionHead, Shell } from "../../components/Chrome";
import { BarList, Card, Stat } from "../../components/panels";

export const metadata: Metadata = { title: "Audience | Andrew Liberty Team" };
export const revalidate = 900;

interface Props {
  searchParams: Promise<{ range?: string }>;
}

function secs(n: number): string {
  const m = Math.floor(n / 60);
  const s = Math.round(n % 60);
  return m ? `${m}m ${s}s` : `${s}s`;
}

export default async function AudienceSection({ searchParams }: Props) {
  const { range } = await searchParams;
  const { days, ga, incomplete, collecting } = await loadDashboard(range);
  const t = ga.data.totals;

  return (
    <Shell>
      <SectionHead
        title="Audience"
        lead="Who arrives, how they got here, and what they do once they land."
        days={days}
        basePath="/dashboard/audience"
      />

      {incomplete ? <NotLiveBanner collecting={collecting} /> : null}

      <div className="dash-stats dash-stats-4">
        <Stat
          label="Users"
          value={t.activeUsers}
          previous={ga.data.previousTotals?.activeUsers ?? null}
          unavailable={!ga.live}
        />
        <Stat
          label="New users"
          value={t.newUsers}
          previous={ga.data.previousTotals?.newUsers ?? null}
          hint="First visit in this window"
          unavailable={!ga.live}
        />
        <Stat
          label="Average visit"
          value={secs(t.averageSessionDuration)}
          previous={null}
          hint="Time on the site per session"
          unavailable={!ga.live}
        />
        <Stat
          label="Bounce rate"
          value={`${(t.bounceRate * 100).toFixed(1)}%`}
          previous={null}
          hint="Left without engaging. Lower is better."
          unavailable={!ga.live}
        />
      </div>

      <div className="dash-row">
        <Card title="Users per day" hint={`Last ${days} days`}>
          <TrendChart
            label="Users"
            points={ga.data.daily.map((d) => ({ date: d.date, value: d.users }))}
          />
        </Card>
      </div>

      <div className="dash-row dash-row-3">
        <Card title="How they arrive" hint="Sessions by channel">
          <BarList rows={ga.data.channels} />
        </Card>
        <Card title="Device">
          <BarList rows={ga.data.devices} />
        </Card>
        {/* City, not country. This is one agent working the valley — "United
            States, 98%" would be true and useless, whereas the split between
            Studio City and Sherman Oaks is the question the site is built
            around. */}
        <Card title="Where they are" hint="By city">
          <BarList rows={ga.data.cities} emptyLabel="No cities recorded yet." />
        </Card>
      </div>
    </Shell>
  );
}
