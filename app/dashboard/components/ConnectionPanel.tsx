import type { SourceState, SourceStatus } from "@/lib/analytics/status";

/**
 * Which sources are live and which are not.
 *
 * State is carried by a word, an icon glyph and a colour together — never
 * colour alone — because this panel is the one thing on the page a
 * red/green-blind reader absolutely must not misread. Getting "connected" and
 * "missing" the wrong way round here would send someone hunting a traffic
 * problem that is really a configuration problem.
 */

const LOOK: Record<SourceState, { word: string; glyph: string; mod: string }> = {
  live: { word: "Connected", glyph: "✓", mod: "is-live" },
  missing: { word: "Not connected", glyph: "○", mod: "is-missing" },
  error: { word: "Error", glyph: "!", mod: "is-error" },
};

export function StatusChip({ state }: { state: SourceState }) {
  const l = LOOK[state];
  return (
    <span className={`dash-chip ${l.mod}`}>
      <span aria-hidden="true">{l.glyph}</span>
      {l.word}
    </span>
  );
}

function Source({ source }: { source: SourceStatus }) {
  const l = LOOK[source.state];
  const missing = source.vars.filter((v) => !v.set);

  return (
    <li className="dash-source">
      <div className="dash-source-head">
        <div className="dash-source-id">
          <span className={`dash-dot ${l.mod}`} aria-hidden="true" />
          <div>
            <p className="dash-source-title">{source.title}</p>
            <p className="dash-source-desc">{source.provides}</p>
          </div>
        </div>
        <StatusChip state={source.state} />
      </div>

      {source.error ? <pre className="dash-err">{source.error}</pre> : null}

      {missing.length > 0 ? (
        <div className="dash-missing">
          <p className="dash-missing-title">
            Missing {missing.length === 1 ? "variable" : "variables"}
          </p>
          <ul className="dash-vars">
            {missing.map((v) => (
              <li key={v.name}>
                <code className="dash-var-name">{v.name}</code>
                <p className="dash-var-what">{v.what}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

export default function ConnectionPanel({ sources }: { sources: SourceStatus[] }) {
  const live = sources.filter((s) => s.state === "live").length;

  return (
    <section className="dash-conn">
      <div className="dash-conn-head">
        <h2 className="dash-card-title">Data connections</h2>
        <span className="dash-quiet">
          {live} of {sources.length} live
        </span>
      </div>

      <ul className="dash-sources">
        {sources.map((s) => (
          <Source key={s.key} source={s} />
        ))}
      </ul>
    </section>
  );
}
