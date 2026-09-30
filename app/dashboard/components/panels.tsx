import type { ReactNode } from "react";

/** Shared shells: the card, the KPI tile and the ranked bar list. */

export function Card({
  title,
  hint,
  action,
  children,
}: {
  title: string;
  hint?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="dash-card">
      <div className="dash-card-head">
        <div>
          <h2 className="dash-card-title">{title}</h2>
          {hint ? <p className="dash-card-hint">{hint}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

/**
 * Change against the previous period.
 *
 * Direction is carried by the arrow and the sign as well as the colour, so it
 * survives a red/green-blind reader and a black-and-white printout.
 *
 * `null` previous means there is nothing to compare against — a fresh install
 * has no prior window — and that is said in words rather than shown as 0%,
 * which would read as "flat" when the truth is "unknown".
 */
function Delta({
  current,
  previous,
  goodWhenUp = true,
}: {
  current: number;
  previous: number | null;
  goodWhenUp?: boolean;
}) {
  if (previous === null) {
    return <span className="dash-quiet">no prior period</span>;
  }
  if (previous === 0) {
    return <span className="dash-quiet">{current === 0 ? "no change" : "first data"}</span>;
  }

  const pct = ((current - previous) / previous) * 100;
  const up = pct >= 0;
  const good = up === goodWhenUp;

  return (
    <span className="dash-delta">
      <span className={`dash-delta-chip ${good ? "is-good" : "is-bad"}`}>
        <span aria-hidden="true">{up ? "▲" : "▼"}</span> {Math.abs(pct).toFixed(1)}%
      </span>
      <span className="dash-quiet">vs prev. period</span>
    </span>
  );
}

/**
 * A lone headline number. The form heuristic says a single magnitude with no
 * shape to show is a stat tile, not a chart, so these carry no sparkline.
 */
export function Stat({
  label,
  value,
  previous = null,
  hint,
  goodWhenUp = true,
  unavailable = false,
}: {
  label: string;
  value: string | number;
  previous?: number | null;
  hint?: string;
  goodWhenUp?: boolean;
  /** the source feeding this tile is not connected */
  unavailable?: boolean;
}) {
  return (
    <div className="dash-stat">
      <p className="dash-stat-label">{label}</p>
      <p className={`dash-stat-value${unavailable ? " is-muted" : ""}`}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      <div className="dash-stat-foot">
        {unavailable ? (
          <span className="dash-quiet">not connected</span>
        ) : (
          <Delta
            current={typeof value === "number" ? value : 0}
            previous={previous}
            goodWhenUp={goodWhenUp}
          />
        )}
      </div>
      {hint ? <p className="dash-stat-hint">{hint}</p> : null}
    </div>
  );
}

/**
 * Ranked categories. Magnitude is bar LENGTH in a single hue, so colour
 * carries no second meaning and needs no scale. Every row shows its own
 * number, which doubles as the table view the chart would otherwise owe.
 */
export function BarList({
  rows,
  emptyLabel = "Nothing recorded yet.",
  formatValue = (n: number) => n.toLocaleString(),
  secondaryLabel,
}: {
  rows: { label: string; value: number; secondary?: number }[];
  emptyLabel?: string;
  formatValue?: (n: number) => string;
  secondaryLabel?: string;
}) {
  if (rows.length === 0) {
    return <p className="dash-empty">{emptyLabel}</p>;
  }
  const max = Math.max(...rows.map((r) => r.value), 1);
  const allZero = rows.every((r) => r.value === 0);

  return (
    <ol className="dash-bars">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="dash-bar-top">
            <span className="dash-bar-label" title={r.label}>
              {r.label}
            </span>
            <span className="dash-bar-value">
              {formatValue(r.value)}
              {r.secondary !== undefined && secondaryLabel ? (
                <span className="dash-bar-second">
                  {r.secondary.toLocaleString()} {secondaryLabel}
                </span>
              ) : null}
            </span>
          </div>
          <div className="dash-track">
            {/* At zero the track is left empty rather than given a minimum
                stub, so "nothing here" never looks like "a little here". */}
            {allZero ? null : (
              <div
                className="dash-fill"
                style={{ width: `${Math.max((r.value / max) * 100, r.value > 0 ? 1.5 : 0)}%` }}
              />
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
