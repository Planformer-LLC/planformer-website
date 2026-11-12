import { memo } from "react";
import { ENVELOPE, ROOMS, SCALE_LABEL, UNITS_PER_FT } from "@/lib/takeoff/planFixture";

/** Whole feet as a plan dimension, e.g. 24 -> 24'-0". */
const ftLabel = (units: number) => `${Math.round(units / UNITS_PER_FT)}′-0″`;

/**
 * The sample house plan linework.
 *
 * No hooks and no "use client", so this same component renders inside the
 * static skeleton (server) and the interactive island (client). That is what
 * makes the section look finished before any JS arrives, with zero CLS.
 */
function PlanBackdrop() {
  return (
    <g aria-hidden="true">
      {/* Canvas behind the sheet, the same dotted grey the app uses */}
      <defs>
        <pattern id="pf-dots" width={28} height={28} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={2} fill="rgba(0,0,0,0.07)" />
        </pattern>
      </defs>

      <rect x={0} y={0} width={1120} height={850} fill="#F4F5F7" />
      <rect x={0} y={0} width={1120} height={850} fill="url(#pf-dots)" />
      <rect x={24} y={20} width={1072} height={734} fill="#FFFFFF" stroke="#E3E6EB" />

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

      {/* Exterior walls, heavier */}
      <rect
        x={ENVELOPE.x0}
        y={ENVELOPE.y0}
        width={ENVELOPE.x1 - ENVELOPE.x0}
        height={ENVELOPE.y1 - ENVELOPE.y0}
        fill="none"
        stroke="#1A1A1A"
        strokeWidth={7}
      />

      {/* Door swings, so it reads as a house plan rather than boxes */}
      <g fill="none" stroke="#9AA0A6" strokeWidth={1.5}>
        <path d="M200 390 A 48 48 0 0 1 248 342" />
        <path d="M352 390 A 40 40 0 0 0 392 430" />
        <path d="M520 390 A 48 48 0 0 0 568 438" />
      </g>
      <g stroke="#FFFFFF" strokeWidth={5}>
        <line x1={200} y1={390} x2={248} y2={390} />
        <line x1={352} y1={390} x2={392} y2={390} />
        <line x1={520} y1={390} x2={568} y2={390} />
        {/* Garage door opening */}
        <line x1={720} y1={678} x2={976} y2={678} />
      </g>
      <line x1={720} y1={678} x2={976} y2={678} stroke="#9AA0A6" strokeWidth={2} strokeDasharray="10 6" />

      {/* Room names and sizes */}
      {ROOMS.map((r) => {
        const cx = (r.x0 + r.x1) / 2;
        const cy = (r.y0 + r.y1) / 2;
        return (
          <g key={`${r.id}-label`}>
            <text x={cx} y={cy} textAnchor="middle" fontSize={19} fontWeight={700} letterSpacing="0.06em" fill="#8A9099">
              {r.label}
            </text>
            <text x={cx} y={cy + 22} textAnchor="middle" fontSize={14} fontWeight={500} fill="#B3B8BF">
              {ftLabel(r.x1 - r.x0)} x {ftLabel(r.y1 - r.y0)}
            </text>
          </g>
        );
      })}

      {/* Overall dimension along the bottom */}
      <g stroke="#9AA0A6" strokeWidth={1.5}>
        <line x1={ENVELOPE.x0} y1={712} x2={ENVELOPE.x1} y2={712} />
        <line x1={ENVELOPE.x0} y1={702} x2={ENVELOPE.x0} y2={722} />
        <line x1={ENVELOPE.x1} y1={702} x2={ENVELOPE.x1} y2={722} />
      </g>
      <text x={(ENVELOPE.x0 + ENVELOPE.x1) / 2} y={734} textAnchor="middle" fontSize={13} fontWeight={600} fill="#8A9099">
        {ftLabel(ENVELOPE.x1 - ENVELOPE.x0)}
      </text>

      {/* Title block */}
      <text x={ENVELOPE.x1} y={52} textAnchor="end" fontSize={12} fontWeight={700} letterSpacing="0.1em" fill="#8A9099">
        SAMPLE HOUSE, FLOOR PLAN
      </text>
      <text x={ENVELOPE.x0} y={52} fontSize={12} fontWeight={600} letterSpacing="0.06em" fill="#B3B8BF">
        SCALE: {SCALE_LABEL}
      </text>
    </g>
  );
}

// Static: never changes. Without memo it was rebuilt on every cursor update.
export default memo(PlanBackdrop);
