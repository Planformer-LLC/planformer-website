import { memo } from "react";
import { ENVELOPE, SCALE_LABEL } from "@/lib/takeoff/planFixture";

/**
 * The sample plan: a detached garage with a studio and bath, drawn as an
 * original residential floor plan (solid walls, window breaks, door swings,
 * light furniture, overall dimensions). 1 ft = 20 units.
 *
 * Coordinates are wall centrelines: x 200 | 680 | 1000, y 150 | 470 | 630.
 *
 * No hooks and no "use client", so this same component renders inside the
 * static skeleton (server) and the interactive island (client).
 */

const WALL = "#1A1A1A";
const EXT = 16; // exterior wall thickness, ~9 in
const INT = 9; // interior wall thickness, ~5 in
const THIN = "#6B7380";

type Run = { x1: number; y1: number; x2: number; y2: number; t: number };

/** A run of wall from a to b (axis-aligned), drawn as a filled bar. */
function Wall({ x1, y1, x2, y2, t }: Run) {
  const h = t / 2;
  return x1 === x2 ? (
    <rect x={x1 - h} y={Math.min(y1, y2) - h} width={t} height={Math.abs(y2 - y1) + t} fill={WALL} />
  ) : (
    <rect x={Math.min(x1, x2) - h} y={y1 - h} width={Math.abs(x2 - x1) + t} height={t} fill={WALL} />
  );
}

/** Window in a wall: the wall is broken and shown as a thin double line. */
function Win({ x1, y1, x2, y2, t }: Run) {
  const h = t / 2;
  const box =
    x1 === x2
      ? { x: x1 - h, y: y1, width: t, height: y2 - y1 }
      : { x: x1, y: y1 - h, width: x2 - x1, height: t };
  return (
    <g>
      <rect {...box} fill="#FFFFFF" />
      <rect {...box} fill="none" stroke={WALL} strokeWidth={1.5} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={WALL} strokeWidth={1.5} />
    </g>
  );
}

/** A clear opening in a wall (doors are drawn on top of it). */
function Gap({ x1, y1, x2, y2, t }: Run) {
  const h = t / 2 + 1;
  return x1 === x2 ? (
    <rect x={x1 - h} y={y1} width={h * 2} height={y2 - y1} fill="#FFFFFF" />
  ) : (
    <rect x={x1} y={y1 - h} width={x2 - x1} height={h * 2} fill="#FFFFFF" />
  );
}

/**
 * Door: leaf from the hinge (hx, hy) to its open position (ox, oy), and the
 * swing arc from the closed position (lx, ly) to the open one.
 */
function Swing({
  hx, hy, lx, ly, ox, oy, sweep,
}: { hx: number; hy: number; lx: number; ly: number; ox: number; oy: number; sweep: 0 | 1 }) {
  const r = Math.hypot(lx - hx, ly - hy);
  return (
    <g fill="none">
      <line x1={hx} y1={hy} x2={ox} y2={oy} stroke={WALL} strokeWidth={2.5} />
      <path d={`M${lx} ${ly} A ${r} ${r} 0 0 ${sweep} ${ox} ${oy}`} stroke={THIN} strokeWidth={1.5} />
    </g>
  );
}

function PlanBackdrop() {
  const midX = (ENVELOPE.x0 + ENVELOPE.x1) / 2;
  const midY = (ENVELOPE.y0 + ENVELOPE.y1) / 2;

  return (
    <g aria-hidden="true">
      <defs>
        <pattern id="pf-dots" width={28} height={28} patternUnits="userSpaceOnUse">
          <circle cx={2} cy={2} r={2} fill="rgba(0,0,0,0.07)" />
        </pattern>
        <marker id="pf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <path d="M0 1 L9 5 L0 9 Z" fill="#4A5260" />
        </marker>
      </defs>

      <rect x={0} y={0} width={1120} height={850} fill="#F4F5F7" />
      <rect x={0} y={0} width={1120} height={850} fill="url(#pf-dots)" />
      <rect x={24} y={20} width={1072} height={734} fill="#FFFFFF" stroke="#E3E6EB" />

      {/* Furniture and fixtures first, so walls sit on top */}
      <g fill="none" stroke={THIN} strokeWidth={1.5}>
        {/* Garage: one parked car, drawn light, and a workbench */}
        <rect x={290} y={250} width={130} height={270} rx={34} stroke="#C3C8CF" />
        <rect x={305} y={315} width={100} height={70} rx={10} stroke="#C3C8CF" />
        <rect x={470} y={164} width={190} height={34} />
        {/* Studio: sofa, round table, desk */}
        <rect x={720} y={380} width={170} height={60} rx={8} />
        <line x1={720} y1={398} x2={890} y2={398} />
        <circle cx={800} cy={325} r={38} />
        <rect x={900} y={170} width={86} height={110} />
        {/* Bath: shower, toilet, vanity */}
        <rect x={880} y={485} width={106} height={130} />
        <line x1={880} y1={485} x2={986} y2={615} />
        <ellipse cx={720} cy={580} rx={18} ry={24} />
        <rect x={702} y={604} width={36} height={14} />
        <rect x={780} y={584} width={70} height={34} />
        <ellipse cx={815} cy={601} rx={18} ry={10} />
      </g>

      {/* Walls */}
      <Wall x1={200} y1={150} x2={1000} y2={150} t={EXT} />
      <Wall x1={200} y1={630} x2={1000} y2={630} t={EXT} />
      <Wall x1={200} y1={150} x2={200} y2={630} t={EXT} />
      <Wall x1={1000} y1={150} x2={1000} y2={630} t={EXT} />
      <Wall x1={680} y1={150} x2={680} y2={630} t={INT} />
      <Wall x1={680} y1={470} x2={1000} y2={470} t={INT} />

      {/* Windows */}
      <Win x1={760} y1={150} x2={860} y2={150} t={EXT} />
      <Win x1={1000} y1={290} x2={1000} y2={390} t={EXT} />
      <Win x1={200} y1={320} x2={200} y2={420} t={EXT} />
      <Win x1={300} y1={150} x2={400} y2={150} t={EXT} />
      <Win x1={1000} y1={515} x2={1000} y2={575} t={EXT} />

      {/* Openings */}
      <Gap x1={280} y1={630} x2={600} y2={630} t={EXT} />
      <Gap x1={680} y1={230} x2={680} y2={290} t={INT} />
      <Gap x1={700} y1={470} x2={750} y2={470} t={INT} />

      {/* Garage overhead door, 16 ft */}
      <g stroke={THIN} strokeWidth={1.5} strokeDasharray="10 6">
        <line x1={280} y1={622} x2={600} y2={622} />
        <line x1={280} y1={638} x2={600} y2={638} />
      </g>
      {/* Garage to studio, 3 ft, swings into the studio */}
      <Swing hx={680} hy={290} lx={680} ly={230} ox={740} oy={290} sweep={1} />
      {/* Bath door, 2 ft 6 in, swings into the bath */}
      <Swing hx={700} hy={470} lx={750} ly={470} ox={700} oy={520} sweep={1} />

      {/* Room names and sizes */}
      <g textAnchor="middle">
        <text x={550} y={440} fontSize={24} fontWeight={600} fill="#2B2F36">Garage</text>
        <text x={550} y={466} fontSize={16} fill="#8A9099">24&#8242; x 24&#8242;</text>
        <text x={830} y={240} fontSize={24} fontWeight={600} fill="#2B2F36">Studio</text>
        <text x={830} y={266} fontSize={16} fill="#8A9099">16&#8242; x 16&#8242;</text>
        <text x={810} y={508} fontSize={22} fontWeight={600} fill="#2B2F36">Bath</text>
      </g>

      {/* Overall dimensions with arrows, outside the walls */}
      <g stroke="#4A5260" strokeWidth={1.5}>
        <line x1={ENVELOPE.x0} y1={96} x2={ENVELOPE.x1} y2={96} markerStart="url(#pf-arrow)" markerEnd="url(#pf-arrow)" />
        <line x1={ENVELOPE.x0} y1={84} x2={ENVELOPE.x0} y2={108} />
        <line x1={ENVELOPE.x1} y1={84} x2={ENVELOPE.x1} y2={108} />
        <line x1={130} y1={ENVELOPE.y0} x2={130} y2={ENVELOPE.y1} markerStart="url(#pf-arrow)" markerEnd="url(#pf-arrow)" />
        <line x1={118} y1={ENVELOPE.y0} x2={142} y2={ENVELOPE.y0} />
        <line x1={118} y1={ENVELOPE.y1} x2={142} y2={ENVELOPE.y1} />
      </g>
      <g fontSize={17} fontWeight={600} fill="#4A5260" textAnchor="middle">
        <text x={midX} y={82}>40&#8242; 0&#8243;</text>
        <text x={112} y={midY} transform={`rotate(-90 112 ${midY})`}>
          24&#8242; 0&#8243;
        </text>
      </g>

      {/* Title block and north arrow */}
      <text x={ENVELOPE.x1} y={704} textAnchor="end" fontSize={15} fontWeight={700} fill="#4A5260">
        Garage and studio, floor plan
      </text>
      <text x={ENVELOPE.x1} y={726} textAnchor="end" fontSize={13} fill="#8A9099">
        Scale {SCALE_LABEL}
      </text>
      <g transform="translate(1050 700)">
        <circle r={18} fill="none" stroke="#4A5260" strokeWidth={1.5} />
        <path d="M0 -14 L7 8 L0 3 L-7 8 Z" fill="#4A5260" />
      </g>
    </g>
  );
}

// Static: never changes. Without memo it was rebuilt on every cursor update.
export default memo(PlanBackdrop);
