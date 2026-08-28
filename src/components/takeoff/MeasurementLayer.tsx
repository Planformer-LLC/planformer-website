import { memo } from "react";
import type { Measurement } from "@/lib/takeoff/types";
import {
  centroid,
  midpoint,
  edgeNormal,
  dist,
  polygonAreaUnits,
  polylineLengthUnits,
  unitsToFeet,
  unitsToSqFeet,
} from "@/lib/takeoff/geometry";
import { formatAreaBadge, formatDistance, formatLinearBadge } from "@/lib/takeoff/format";

function edgesOf(m: Measurement): Array<[import("@/lib/takeoff/types").Pt, import("@/lib/takeoff/types").Pt]> {
  const pts = m.points;
  const out: Array<[(typeof pts)[0], (typeof pts)[0]]> = [];
  const n = pts.length;
  const last = m.kind === "area" ? n : n - 1;
  for (let i = 0; i < last; i++) out.push([pts[i], pts[(i + 1) % n]]);
  return out;
}

function Shape({ m, selected }: { m: Measurement; selected: boolean }) {
  if (m.kind === "count") {
    return (
      <g>
        {m.points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={selected ? 8 : 6}
            fill={m.color}
            fillOpacity={0.75}
            stroke="#fff"
            strokeWidth={1.5}
          />
        ))}
      </g>
    );
  }

  const d = m.points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const path = m.kind === "area" ? `${d} Z` : d;

  return (
    <g>
      <path
        d={path}
        fill={m.kind === "area" ? m.color : "none"}
        fillOpacity={m.kind === "area" ? m.fillPct / 100 : 0}
        stroke={m.color}
        strokeWidth={selected ? m.borderPx + 1.5 : m.borderPx}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {m.points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={5} fill={m.color} />
      ))}
    </g>
  );
}

/** Per-edge dimension labels, offset off the line along its normal. */
function EdgeLabels({ m, ftPerUnit }: { m: Measurement; ftPerUnit: number }) {
  if (m.kind === "count") return null;

  return (
    <g>
      {edgesOf(m).map(([a, b], i) => {
        const len = dist(a, b);
        // Skip labels that would not fit on their own edge.
        if (len < 46) return null;
        const mid = midpoint(a, b);
        const nrm = edgeNormal(a, b);
        return (
          <text
            key={i}
            x={mid.x + nrm.x * 13}
            y={mid.y + nrm.y * 13}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={13}
            fontWeight={600}
            fill={m.color}
            paintOrder="stroke"
            stroke="#fff"
            strokeWidth={3}
            strokeLinejoin="round"
          >
            {formatDistance(unitsToFeet(len, ftPerUnit))}
          </text>
        );
      })}
    </g>
  );
}

/**
 * Where a badge sits, chosen per kind so badges do not stack on each other —
 * a count grid and an area often share the same centroid.
 */
function badgeAnchor(m: Measurement) {
  if (m.kind === "count") {
    // Above the dot cluster.
    const minY = Math.min(...m.points.map((p) => p.y));
    const c = centroid(m.points);
    return { x: c.x, y: minY - 26 };
  }
  if (m.kind === "linear") {
    // On the middle vertex of the run, nudged clear of the line.
    const mid = m.points[Math.floor(m.points.length / 2)];
    return { x: mid.x, y: mid.y - 26 };
  }
  return centroid(m.points);
}

/** The app's name badge: #E8F879 pill at 85%, black text and border. */
function NameBadge({ m, ftPerUnit }: { m: Measurement; ftPerUnit: number }) {
  const c = badgeAnchor(m);
  const value =
    m.kind === "area"
      ? formatAreaBadge(unitsToSqFeet(polygonAreaUnits(m.points), ftPerUnit))
      : m.kind === "linear"
        ? formatLinearBadge(unitsToFeet(polylineLengthUnits(m.points), ftPerUnit))
        : `${m.points.length} EA`;

  const text = `${m.name} · ${value}`;
  const w = text.length * 7.6 + 20;

  return (
    <g>
      <rect
        x={c.x - w / 2}
        y={c.y - 13}
        width={w}
        height={26}
        rx={6}
        fill="#E8F879"
        fillOpacity={0.85}
        stroke="#1A1A1A"
        strokeWidth={1}
      />
      <text
        x={c.x}
        y={c.y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={13}
        fontWeight={700}
        fill="#1A1A1A"
      >
        {text}
      </text>
    </g>
  );
}

function MeasurementLayer({
  measurements,
  ftPerUnit,
  selectedId,
  onSelect,
  showBadges = true,
}: {
  measurements: readonly Measurement[];
  ftPerUnit: number;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  showBadges?: boolean;
}) {
  return (
    <g>
      {measurements.map((m) => (
        <g
          key={m.id}
          onPointerDown={onSelect ? () => onSelect(m.id) : undefined}
          style={onSelect ? { cursor: "pointer" } : undefined}
        >
          <Shape m={m} selected={selectedId === m.id} />
          <EdgeLabels m={m} ftPerUnit={ftPerUnit} />
          {showBadges ? <NameBadge m={m} ftPerUnit={ftPerUnit} /> : null}
        </g>
      ))}
    </g>
  );
}

export default memo(MeasurementLayer);
