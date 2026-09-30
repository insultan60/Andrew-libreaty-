import type { Metadata } from "next";
import { loadDashboard } from "@/lib/analytics/load";
import { GTM_CONTAINER_ID } from "@/lib/site";
import ConnectionPanel from "../../components/ConnectionPanel";
import { SectionHead, Shell } from "../../components/Chrome";

export const metadata: Metadata = { title: "Connections | Andrew Liberty Team" };
export const revalidate = 900;

interface Props {
  searchParams: Promise<{ range?: string }>;
}

/**
 * The setup, in the order it has to happen.
 *
 * This site starts further along than a bare install: the Tag Manager
 * container is already on every page and the domain is already verified in
 * Search Console (there is a google-site-verification token in the root
 * layout's metadata). So the steps below are about what is left — confirming
 * what the container fires, and granting this page read access — rather than
 * setting analytics up from nothing.
 */
const STEPS: [string, string][] = [
  [
    "Check what the container actually fires",
    `tagmanager.google.com → container ${GTM_CONTAINER_ID}. If there is no GA4 configuration tag inside it, nothing is being recorded and this is the step that matters most — analytics is not retrospective, so every day without it is a day that cannot be recovered. Copy the measurement ID (G-…) into GA4_MEASUREMENT_ID.`,
  ],
  [
    "Find the numeric property ID",
    "analytics.google.com → Admin → Property details. This is a number, and it is not the G- measurement ID; both exist and they are used for different things. It goes in GA4_PROPERTY_ID.",
  ],
  [
    "Make a service account",
    'console.cloud.google.com → IAM → Service Accounts → create, then add a JSON key. Enable the "Google Analytics Data API" and the "Search Console API" for that project.',
  ],
  [
    "Grant it read access on both properties",
    "In GA4: Admin → Property access management → add the service account email as Viewer. In Search Console: Settings → Users and permissions → add it as a Full or Restricted user. This is the step people skip, and it is what produces a 403 once the keys are already in.",
  ],
  [
    "Add the variables",
    "Locally in .env.local; on the host, in its environment settings. Then redeploy. None of these are NEXT_PUBLIC_, so no key here is ever sent to a browser.",
  ],
];

export default async function ConnectionsSection({ searchParams }: Props) {
  const { range } = await searchParams;
  const { days, sources } = await loadDashboard(range);
  const live = sources.filter((s) => s.state === "live").length;

  return (
    <Shell>
      <SectionHead
        title="Connections"
        lead="What is feeding this dashboard, and what is still missing. These steps only need doing once, and only someone with the Google account can do them."
        days={days}
        basePath="/dashboard/connections"
        showRange={false}
      />

      <div className="dash-row dash-row-2 dash-row-top">
        <ConnectionPanel sources={sources} />

        <div className="dash-card">
          <h2 className="dash-card-title">How to connect it</h2>
          <p className="dash-lead">
            Analytics is not retrospective. History begins the day a GA4 tag starts recording, so
            the sooner step&nbsp;1 is answered, the sooner there is anything to look at.
          </p>

          <ol className="dash-steps">
            {STEPS.map(([title, body], i) => (
              <li key={title} className="dash-step">
                <span className="dash-step-n">{i + 1}</span>
                <div>
                  <p className="dash-step-title">{title}</p>
                  <p className="dash-step-body">{body}</p>
                </div>
              </li>
            ))}
          </ol>

          {live === sources.length ? (
            <p className="dash-all-good">
              All three sources are live. Nothing here needs doing.
            </p>
          ) : null}
        </div>
      </div>
    </Shell>
  );
}
