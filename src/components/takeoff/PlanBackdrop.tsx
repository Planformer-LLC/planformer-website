import { CORRIDOR, ENVELOPE, ROOMS, UNITS_PER_FT } from "@/lib/takeoff/planFixture";
import { polygonAreaUnits, unitsToSqFeet } from "@/lib/takeoff/geometry";
import { ringOf, FT_PER_UNIT_DEFAULT } from "@/lib/takeoff/planFixture";

/**
 * The sample plan linework.
 *
 * No hooks and no "use client", so this same component renders inside the
 * static skeleton (server) and the interactive island (client). That is what
 * makes the section look finished before any JS arrives, with zero CLS.
 */
export default function PlanBackdrop() {
  return (
    <g aria-hidden="true">
      {/* Dotted page background behind the sheet */}
      <defs>
        <pattern id="pf-dots" width={28} height={28} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={2} fill="rgba(0,0,0,0.08)" />
        </pattern>
        <filter id="pf-sheet-shadow" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity="0.10" />
        </filter>
      </defs>

      <rect x={0} y={0} width={1120} height={760} fill="#F3F3F2" />
      <rect x={0} y={0} width={1120} height={760} fill="url(#pf-dots)" />

      {/* The "sheet" the plan is printed on */}
      <rect
        x={28}
        y={28}
        width={1064}
        height={704}
        rx={4}
        fill="#FFFFFF"
        filter="url(#pf-sheet-shadow)"
      />

      {/* Rooms */}
      {ROOMS.map((r) => (
        <rect
          key={r.id}
          x={r.x0}
          y={r.y0}
          width={r.x1 - r.x0}
          height={r.y1 - r.y0}
          fill="none"
          stroke="#1A1A1A"
          strokeWidth={3}
        />
      ))}

      {/* Corridor */}
      <rect
        x={CORRIDOR.x0}
        y={CORRIDOR.y0}
        width={CORRIDOR.x1 - CORRIDOR.x0}
        height={CORRIDOR.y1 - CORRIDOR.y0}
        fill="none"
        stroke="#1A1A1A"
        strokeWidth={3}
      />

      {/* Exterior envelope, heavier */}
      <rect
        x={ENVELOPE.x0}
        y={ENVELOPE.y0}
        width={ENVELOPE.x1 - ENVELOPE.x0}
        height={ENVELOPE.y1 - ENVELOPE.y0}
        fill="none"
        stroke="#1A1A1A"
        strokeWidth={6}
      />

      {/* Room labels with their true area */}
      {ROOMS.map((r) => {
        const cx = (r.x0 + r.x1) / 2;
        const cy = (r.y0 + r.y1) / 2;
        const sqft = unitsToSqFeet(polygonAreaUnits(ringOf(r)), FT_PER_UNIT_DEFAULT);
        return (
          <g key={`${r.id}-label`}>
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              fontSize={19}
              fontWeight={700}
              letterSpacing="0.06em"
              fill="#9AA0A6"
            >
              {r.label}
            </text>
            <text
              x={cx}
              y={cy + 22}
              textAnchor="middle"
              fontSize={14}
              fontWeight={500}
              fill="#BFC4C9"
            >
              {sqft.toFixed(0)} SQ FT
            </text>
          </g>
        );
      })}

      {/* Corridor label */}
      <text
        x={(CORRIDOR.x0 + CORRIDOR.x1) / 2}
        y={(CORRIDOR.y0 + CORRIDOR.y1) / 2 + 5}
        textAnchor="middle"
        fontSize={14}
        fontWeight={600}
        letterSpacing="0.08em"
        fill="#BFC4C9"
      >
        CORRIDOR
      </text>

      {/* Dimension string along the south wall — the calibration target */}
      <g stroke="#9AA0A6" strokeWidth={1.5}>
        <line x1={ENVELOPE.x0} y1={724} x2={ENVELOPE.x1} y2={724} />
        <line x1={ENVELOPE.x0} y1={716} x2={ENVELOPE.x0} y2={732} />
        <line x1={ENVELOPE.x1} y1={716} x2={ENVELOPE.x1} y2={732} />
      </g>
      <text
        x={(ENVELOPE.x0 + ENVELOPE.x1) / 2}
        y={719}
        textAnchor="middle"
        fontSize={13}
        fontWeight={600}
        fill="#9AA0A6"
      >
        {(ENVELOPE.x1 - ENVELOPE.x0) / UNITS_PER_FT}&#8217;-0&#8221;
      </text>

      {/* Title block */}
      <text x={1060} y={50} textAnchor="end" fontSize={12} fontWeight={700} letterSpacing="0.1em" fill="#9AA0A6">
        PLANFORMER SAMPLE — LEVEL 1
      </text>
      <text x={60} y={50} fontSize={12} fontWeight={600} letterSpacing="0.06em" fill="#BFC4C9">
        SCALE: 1/8&#8221; = 1&#8217;-0&#8221;
      </text>
    </g>
  );
}
