import type { Measurement, MeasurementKind, Pt } from "./types";
import type { ViewBox } from "./geometry";

/**
 * Synthetic sample plan.
 *
 * Authored so 1 plan unit = 0.125 ft, i.e. 1 ft = 8 units. That is exactly the
 * 1/8" = 1'-0" architectural scale (one printed inch = 8 ft = 64 units), and
 * it makes every room a whole number of feet — so the seeded quantities are
 * round and read as real takeoff numbers.
 */
export const FT_PER_UNIT_DEFAULT = 0.125;
export const UNITS_PER_DRAWING_INCH = 64;
export const UNITS_PER_FT = 1 / FT_PER_UNIT_DEFAULT;

export const VIEWBOX: ViewBox = { x: 0, y: 0, w: 1120, h: 760 };

/** Building envelope: 125 ft x 80 ft = 10,000 SQ FT. */
export const ENVELOPE = { x0: 60, y0: 60, x1: 1060, y1: 700 };

export interface Room {
  id: string;
  label: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export const ROOMS: Room[] = [
  { id: "office-101", label: "OFFICE 101", x0: 60, y0: 60, x1: 380, y1: 300 },
  { id: "storage-102", label: "STORAGE 102", x0: 380, y0: 60, x1: 620, y1: 300 },
  { id: "break-104", label: "BREAK 104", x0: 620, y0: 60, x1: 820, y1: 300 },
  { id: "mech-105", label: "MECH 105", x0: 820, y0: 60, x1: 1060, y1: 300 },
  { id: "warehouse-103", label: "WAREHOUSE 103", x0: 60, y0: 360, x1: 1060, y1: 700 },
];

/** Corridor separating the office row from the warehouse. */
export const CORRIDOR = { x0: 60, y0: 300, x1: 1060, y1: 360 };

export function ringOf(r: { x0: number; y0: number; x1: number; y1: number }): Pt[] {
  return [
    { x: r.x0, y: r.y0 },
    { x: r.x1, y: r.y0 },
    { x: r.x1, y: r.y1 },
    { x: r.x0, y: r.y1 },
  ];
}

/** Green first — the colour the app's own tutorial captures standardise on. */
export const PALETTE = [
  "#00B51E",
  "#0F83FF",
  "#FF7A1A",
  "#8B5CF6",
  "#E11D48",
  "#0EA5A4",
] as const;

export const CLOSE_PX_FINE = 12;
export const CLOSE_PX_COARSE = 18;
export const MIN_VERTEX_SEPARATION_UNITS = 3;
export const MAX_VERTICES = 200;
export const MAX_MEASUREMENTS = 60;

/** STORAGE 102 is left deliberately unmeasured — it is the "trace me" target. */
export const SEED_MEASUREMENTS: Measurement[] = [
  {
    id: "seed-area-1",
    kind: "area",
    name: "Area 1",
    points: ringOf(ROOMS[0]),
    color: PALETTE[0],
    fillPct: 50,
    borderPx: 2,
  },
  {
    id: "seed-area-2",
    kind: "area",
    name: "Area 2",
    points: ringOf(ROOMS[4]),
    color: PALETTE[1],
    // The largest shape uses the lightest legal fill step so it does not
    // visually swamp the plan.
    fillPct: 25,
    borderPx: 2,
  },
  {
    id: "seed-linear-1",
    kind: "linear",
    name: "Linear 1",
    points: [
      { x: 60, y: 300 },
      { x: 1060, y: 300 },
      { x: 1060, y: 700 },
    ],
    color: PALETTE[2],
    fillPct: 50,
    borderPx: 2,
  },
  {
    id: "seed-count-1",
    kind: "count",
    name: "Count 1",
    points: [
      { x: 200, y: 450 }, { x: 440, y: 450 }, { x: 680, y: 450 }, { x: 920, y: 450 },
      { x: 200, y: 610 }, { x: 440, y: 610 }, { x: 680, y: 610 }, { x: 920, y: 610 },
    ],
    color: PALETTE[3],
    fillPct: 50,
    borderPx: 2,
  },
];

/** So the visitor's first area auto-names "Area 3", not "Area 1". */
export const SEED_NAME_COUNTERS: Record<MeasurementKind, number> = {
  area: 2,
  linear: 1,
  count: 1,
};

/**
 * Cost rates. `total = (cost + markup) * qty` — markup is per-unit currency,
 * not a percentage, matching CalculatorItem in the app.
 */
export const RATE_DEFAULTS: Record<
  MeasurementKind,
  { item: string; cost: number; markup: number }
> = {
  area: { item: "Floor finish — LVT", cost: 4.25, markup: 1.5 },
  linear: { item: "Wall base & trim", cost: 3.1, markup: 1.15 },
  count: { item: "Recessed fixture", cost: 88, markup: 22 },
};
