"use client";

import { useId, useMemo, useState } from "react";

/**
 * One measure over time.
 *
 * Deliberately single-series. The version of this on the other site takes two,
 * on a shared y-axis; here the second categorical hue does not exist, because
 * this site's only other brand colour is gold and gold is needed for the
 * "warning" state (see the colour note at the top of dashboard.css). A hue
 * cannot mean "page views" in one panel and "something is wrong" in another.
 *
 * So where two measures would have been overlaid, there are two charts. That
 * is the better form regardless: impressions outscale clicks by orders of
 * magnitude, and putting them on one plot needs a second y-axis — which lets
 * whoever draws it imply any relationship they like just by sliding the two
 * scales past each other.
 *
 * One series needs no legend box; the card title above it names the measure.
 */

export interface TrendPoint {
  date: string;
  value: number;
}

const W = 560;
const H = 170;
const PAD = { top: 14, right: 10, bottom: 22, left: 10 };

function niceDate(iso: string): string {
  // GA4 hands back YYYYMMDD; Search Console hands back YYYY-MM-DD.
  const clean = iso.includes("-") ? iso : `${iso.slice(0, 4)}-${iso.slice(4, 6)}-${iso.slice(6, 8)}`;
  const d = new Date(`${clean}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

export default function TrendChart({
  label,
  points,
  format = (n: number) => n.toLocaleString(),
}: {
  label: string;
  points: TrendPoint[];
  format?: (n: number) => string;
}) {
  const uid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);

  const geo = useMemo(() => {
    if (points.length === 0) return null;
    const max = Math.max(1, ...points.map((p) => p.value));
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;
    const step = points.length > 1 ? innerW / (points.length - 1) : 0;
    const baseline = PAD.top + innerH;

    const xy = points.map((p, i) => ({
      x: PAD.left + i * step,
      y: baseline - (p.value / max) * innerH,
      ...p,
    }));
    const line = xy
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
      .join(" ");
    const area = `${line} L${xy[xy.length - 1].x.toFixed(2)},${baseline} L${xy[0].x.toFixed(2)},${baseline} Z`;

    return { xy, line, area, baseline, max };
  }, [points]);

  function onMove(e: React.MouseEvent<SVGSVGElement>) {
    if (!geo) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let best = Infinity;
    geo.xy.forEach((p, i) => {
      const d = Math.abs(p.x - x);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setHover(nearest);
  }

  if (!geo) {
    return <p className="dash-empty">No dates in this range.</p>;
  }

  const hx = hover === null ? null : geo.xy[hover].x;
  const frac = hover === null ? 0.5 : geo.xy[hover].x / W;
  const shift = frac < 0.12 ? "-10%" : frac > 0.88 ? "-90%" : "-50%";

  return (
    <div className="dash-chart">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="dash-chart-svg"
        role="img"
        aria-label={`${label} over time`}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="dash-stop-top" />
            <stop offset="100%" className="dash-stop-bottom" />
          </linearGradient>
        </defs>

        {/* recessive baseline only — the numbers live on the tiles above */}
        <line
          x1={PAD.left}
          y1={geo.baseline}
          x2={W - PAD.right}
          y2={geo.baseline}
          className="dash-baseline"
        />

        <path d={geo.area} fill={`url(#${uid}-fill)`} />
        <path d={geo.line} className="dash-series-line" />

        {hx !== null && hover !== null ? (
          <g>
            <line x1={hx} y1={PAD.top} x2={hx} y2={geo.baseline} className="dash-crosshair" />
            <circle cx={geo.xy[hover].x} cy={geo.xy[hover].y} r="5.5" className="dash-series-ring" />
            <circle cx={geo.xy[hover].x} cy={geo.xy[hover].y} r="4" className="dash-series-dot" />
          </g>
        ) : null}
      </svg>

      {hover !== null && points[hover] ? (
        <div
          className="dash-tip"
          style={{ left: `${frac * 100}%`, transform: `translateX(${shift})` }}
        >
          <p className="dash-tip-date">{niceDate(points[hover].date)}</p>
          <p className="dash-tip-row">
            <span aria-hidden="true" className="dash-swatch" />
            <span className="dash-tip-name">{label}</span>
            <span className="dash-tip-value">{format(points[hover].value)}</span>
          </p>
        </div>
      ) : null}

      <div className="dash-axis">
        <span>{niceDate(points[0].date)}</span>
        <span>{niceDate(points[points.length - 1].date)}</span>
      </div>
    </div>
  );
}
