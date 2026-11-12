import { memo } from "react";
import { ENVELOPE, SCALE_LABEL } from "@/lib/takeoff/planFixture";

/**
 * The sample plan: a single-storey two-bedroom house, drawn as an original
 * residential floor plan (solid walls, window breaks, door swings, simple
 * furniture, overall dimensions). 1 ft = 18 units.
 *
 * Wall centrelines: x 230 | 482 | 626 | 950, y 120 | 282 | 354 | 660.
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
        {/* Bedroom 1: queen bed with pillows, nightstand */}
        <rect x={290} y={132} width={100} height={124} />
        <rect x={298} y={138} width={40} height={20} rx={4} />
        <rect x={342} y={138} width={40} height={20} rx={4} />
        <line x1={290} y1={170} x2={390} y2={170} />
        <rect x={396} y={132} width={30} height={30} />
        {/* Bedroom 2: queen bed, dresser */}
        <rect x={760} y={132} width={100} height={124} />
        <rect x={768} y={138} width={40} height={20} rx={4} />
        <rect x={812} y={138} width={40} height={20} rx={4} />
        <line x1={760} y1={170} x2={860} y2={170} />
        <rect x={896} y={250} width={44} height={90} />
        {/* Bath: tub, toilet, vanity */}
        <rect x={492} y={130} width={124} height={44} rx={6} />
        <rect x={500} y={136} width={108} height={32} rx={14} />
        <ellipse cx={598} cy={240} rx={13} ry={18} />
        <rect x={604} y={226} width={14} height={30} />
        <rect x={492} y={214} width={34} height={54} />
        <ellipse cx={509} cy={241} rx={10} ry={14} />
        {/* Hall: washer and dryer */}
        <rect x={588} y={290} width={30} height={30} />
        <rect x={588} y={322} width={30} height={26} />
        {/* Living room: sofa, coffee table, armchair, rug */}
        <rect x={262} y={430} width={46} height={170} rx={8} />
        <line x1={278} y1={430} x2={278} y2={600} />
        <rect x={360} y={470} width={110} height={90} rx={8} stroke="#C3C8CF" />
        <rect x={380} y={495} width={70} height={40} rx={4} />
        <rect x={510} y={480} width={56} height={56} rx={8} />
        {/* Kitchen: L counter with range and sink, dining table and chairs */}
        <rect x={640} y={364} width={300} height={34} />
        <rect x={906} y={364} width={34} height={150} />
        <circle cx={760} cy={376} r={6} />
        <circle cx={780} cy={376} r={6} />
        <circle cx={760} cy={390} r={5} />
        <circle cx={780} cy={390} r={5} />
        <rect x={912} y={430} width={22} height={40} rx={4} />
        <rect x={690} y={530} width={150} height={66} />
        {[710, 750, 790].map((x) => (
          <g key={x}>
            <rect x={x} y={512} width={24} height={14} rx={3} />
            <rect x={x} y={600} width={24} height={14} rx={3} />
          </g>
        ))}
      </g>

      {/* Walls */}
      <Wall x1={230} y1={120} x2={950} y2={120} t={EXT} />
      <Wall x1={230} y1={660} x2={950} y2={660} t={EXT} />
      <Wall x1={230} y1={120} x2={230} y2={660} t={EXT} />
      <Wall x1={950} y1={120} x2={950} y2={660} t={EXT} />
      <Wall x1={230} y1={354} x2={482} y2={354} t={INT} />
      <Wall x1={626} y1={354} x2={950} y2={354} t={INT} />
      <Wall x1={482} y1={120} x2={482} y2={354} t={INT} />
      <Wall x1={626} y1={120} x2={626} y2={660} t={INT} />
      <Wall x1={482} y1={282} x2={626} y2={282} t={INT} />

      {/* Windows */}
      <Win x1={300} y1={120} x2={390} y2={120} t={EXT} />
      <Win x1={230} y1={190} x2={230} y2={280} t={EXT} />
      <Win x1={530} y1={120} x2={580} y2={120} t={EXT} />
      <Win x1={760} y1={120} x2={860} y2={120} t={EXT} />
      <Win x1={950} y1={170} x2={950} y2={240} t={EXT} />
      <Win x1={230} y1={440} x2={230} y2={590} t={EXT} />
      <Win x1={440} y1={660} x2={580} y2={660} t={EXT} />
      <Win x1={950} y1={540} x2={950} y2={620} t={EXT} />
      <Win x1={700} y1={660} x2={840} y2={660} t={EXT} />

      {/* Openings */}
      <Gap x1={410} y1={354} x2={464} y2={354} t={INT} />
      <Gap x1={650} y1={354} x2={704} y2={354} t={INT} />
      <Gap x1={530} y1={282} x2={575} y2={282} t={INT} />
      <Gap x1={626} y1={430} x2={626} y2={610} t={INT} />
      <Gap x1={320} y1={660} x2={374} y2={660} t={EXT} />

      {/* Doors */}
      <Swing hx={464} hy={354} lx={410} ly={354} ox={464} oy={300} sweep={1} />
      <Swing hx={650} hy={354} lx={704} ly={354} ox={650} oy={300} sweep={0} />
      <Swing hx={575} hy={282} lx={530} ly={282} ox={575} oy={237} sweep={1} />
      <Swing hx={320} hy={660} lx={374} ly={660} ox={320} oy={606} sweep={0} />

      {/* Room names and sizes */}
      <g textAnchor="middle">
        <text x={356} y={300} fontSize={21} fontWeight={600} fill="#2B2F36">Bedroom</text>
        <text x={356} y={324} fontSize={15} fill="#8A9099">14&#8242; x 13&#8242;</text>
        <text x={555} y={206} fontSize={19} fontWeight={600} fill="#2B2F36">Bath</text>
        <text x={800} y={300} fontSize={21} fontWeight={600} fill="#2B2F36">Bedroom</text>
        <text x={800} y={324} fontSize={15} fill="#8A9099">18&#8242; x 13&#8242;</text>
        <text x={428} y={420} fontSize={24} fontWeight={600} fill="#2B2F36">Living Room</text>
        <text x={428} y={444} fontSize={16} fill="#8A9099">22&#8242; x 17&#8242;</text>
        <text x={788} y={460} fontSize={22} fontWeight={600} fill="#2B2F36">Kitchen</text>
        <text x={788} y={484} fontSize={15} fill="#8A9099">18&#8242; x 17&#8242;</text>
      </g>

      {/* Overall dimensions with arrows, outside the walls */}
      <g stroke="#4A5260" strokeWidth={1.5}>
        <line x1={ENVELOPE.x0} y1={76} x2={ENVELOPE.x1} y2={76} markerStart="url(#pf-arrow)" markerEnd="url(#pf-arrow)" />
        <line x1={ENVELOPE.x0} y1={64} x2={ENVELOPE.x0} y2={88} />
        <line x1={ENVELOPE.x1} y1={64} x2={ENVELOPE.x1} y2={88} />
        <line x1={160} y1={ENVELOPE.y0} x2={160} y2={ENVELOPE.y1} markerStart="url(#pf-arrow)" markerEnd="url(#pf-arrow)" />
        <line x1={148} y1={ENVELOPE.y0} x2={172} y2={ENVELOPE.y0} />
        <line x1={148} y1={ENVELOPE.y1} x2={172} y2={ENVELOPE.y1} />
      </g>
      <g fontSize={17} fontWeight={600} fill="#4A5260" textAnchor="middle">
        <text x={midX} y={62}>40&#8242; 0&#8243;</text>
        <text x={142} y={midY} transform={`rotate(-90 142 ${midY})`}>
          30&#8242; 0&#8243;
        </text>
      </g>

      {/* Title block and north arrow */}
      <text x={ENVELOPE.x1} y={712} textAnchor="end" fontSize={15} fontWeight={700} fill="#4A5260">
        Two-bedroom house, floor plan
      </text>
      <text x={ENVELOPE.x1} y={734} textAnchor="end" fontSize={13} fill="#8A9099">
        Scale {SCALE_LABEL}
      </text>
      <g transform="translate(1030 700)">
        <circle r={18} fill="none" stroke="#4A5260" strokeWidth={1.5} />
        <path d="M0 -14 L7 8 L0 3 L-7 8 Z" fill="#4A5260" />
      </g>
    </g>
  );
}

// Static: never changes. Without memo it was rebuilt on every cursor update.
export default memo(PlanBackdrop);
