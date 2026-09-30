/**
 * The path from "appeared in Google" to "actually read something", as the
 * proportion surviving each step.
 *
 * Every stage is drawn against the SAME baseline — the first stage's value —
 * rather than each being rescaled to fill its own column. That is the whole
 * point of a funnel: the shrinking is the finding. Rescaling each bar to its
 * own maximum would make a 2% survival rate look identical to a 90% one.
 *
 * The hatched area above each bar is what was lost at that step, so the drop
 * is a visible quantity rather than only a percentage caption.
 */

export interface FunnelStage {
  label: string;
  value: number;
  /** what the number actually counts, for the caption under the axis */
  note: string;
}

function pct(from: number, to: number): number | null {
  if (from <= 0) return null;
  return ((from - to) / from) * 100;
}

export default function FunnelChart({ stages }: { stages: FunnelStage[] }) {
  const base = stages[0]?.value ?? 0;
  const anyData = stages.some((s) => s.value > 0);

  return (
    <div>
      <div className="dash-funnel">
        {stages.map((s, i) => {
          // With no data every bar is zero; a flat row of empty columns still
          // shows the shape of the funnel that will appear once data lands.
          const h = base > 0 ? Math.max((s.value / base) * 100, s.value > 0 ? 2 : 0) : 0;
          const drop = i === 0 ? null : pct(stages[i - 1].value, s.value);

          return (
            <div key={s.label} className="dash-funnel-col">
              <div className="dash-funnel-track">
                {/* the lost portion, as texture rather than another colour */}
                <div className="dash-funnel-hatch" aria-hidden="true" />
                <div
                  className={`dash-funnel-fill${i === 0 ? " is-base" : ""}`}
                  style={{ height: `${h}%` }}
                />

                {drop !== null && drop > 0 ? (
                  <span
                    className="dash-funnel-drop"
                    style={{ bottom: `calc(${Math.min(h, 88)}% + 8px)` }}
                  >
                    &darr; {drop.toFixed(1)}%
                  </span>
                ) : null}

                <span
                  className={`dash-funnel-value${i > 0 && h >= 18 ? " on-fill" : ""}`}
                >
                  {s.value.toLocaleString()}
                </span>
              </div>

              <p className="dash-funnel-label" title={s.label}>
                {s.label}
              </p>
              <p className="dash-funnel-note">{s.note}</p>
            </div>
          );
        })}
      </div>

      {!anyData ? (
        <p className="dash-funnel-empty">
          All stages read zero because no source is reporting yet &mdash; not because the funnel is
          empty.
        </p>
      ) : null}
    </div>
  );
}
