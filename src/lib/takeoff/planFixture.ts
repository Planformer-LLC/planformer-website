import type { Measurement, MeasurementKind, Pt } from "./types";
import type { ViewBox } from "./geometry";

/**
 * Synthetic sample plan: a single-storey house.
 *
 * Authored so 1 plan unit = 1/16 ft, i.e. 1 ft = 16 units. That is exactly the
 * 1/4" = 1'-0" architectural scale (one printed inch = 4 ft = 64 units), and
 * it makes every room a whole number of feet, so the seeded quantities are
 * round and read as real takeoff numbers. The scale is preset in the demo.
 */
export const FT_PER_UNIT_DEFAULT = 0.0625;
export const UNITS_PER_DRAWING_INCH = 64;
export const UNITS_PER_FT = 1 / FT_PER_UNIT_DEFAULT;
export const SCALE_LABEL = "1/4\u2033 = 1\u2032-0\u2033";

// Taller than the drawing so the floating toolbar sits below the plan, not on it.
export const VIEWBOX: ViewBox = { x: 0, y: 0, w: 1120, h: 850 };

/** Building envelope: 60 ft x 38 ft. */
export const ENVELOPE = { x0: 80, y0: 70, x1: 1040, y1: 678 };

export interface Room {
  id: string;
  label: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

/** Front row 20 ft deep, back row 18 ft deep. */
export const ROOMS: Room[] = [
  { id: "living", label: "LIVING", x0: 80, y0: 70, x1: 464, y1: 390 },
  { id: "kitchen", label: "KITCHEN", x0: 464, y0: 70, x1: 752, y1: 390 },
  { id: "dining", label: "DINING", x0: 752, y0: 70, x1: 1040, y1: 390 },
  { id: "bed-1", label: "BED 1", x0: 80, y0: 390, x1: 304, y1: 678 },
  { id: "bath", label: "BATH", x0: 304, y0: 390, x1: 432, y1: 678 },
  { id: "bed-2", label: "BED 2", x0: 432, y0: 390, x1: 656, y1: 678 },
  { id: "garage", label: "GARAGE", x0: 656, y0: 390, x1: 1040, y1: 678 },
];

/** The room the guided first step asks visitors to trace (24 ft x 18 ft). */
export const TARGET_ROOM = ROOMS.find((r) => r.id === "garage")!;

export function ringOf(r: { x0: number; y0: number; x1: number; y1: number }): Pt[] {
  return [
    { x: r.x0, y: r.y0 },
    { x: r.x1, y: r.y0 },
    { x: r.x1, y: r.y1 },
    { x: r.x0, y: r.y1 },
  ];
}

/** Colours for new shapes, close to the app's own fills. */
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

const room = (id: string) => ROOMS.find((r) => r.id === id)!;

/** The garage is left deliberately unmeasured: it is the "trace me" target. */
export const SEED_MEASUREMENTS: Measurement[] = [
  {
    id: "seed-area-1",
    kind: "area",
    name: "Living room",
    points: ringOf(room("living")),
    color: "#E8D44D",
    fillPct: 50,
    borderPx: 2,
  },
  {
    id: "seed-area-2",
    kind: "area",
    name: "Kitchen",
    points: ringOf(room("kitchen")),
    color: "#3FD6DD",
    fillPct: 50,
    borderPx: 2,
  },
  {
    id: "seed-linear-1",
    kind: "linear",
    name: "Exterior wall",
    points: [
      { x: 80, y: 678 },
      { x: 80, y: 70 },
      { x: 1040, y: 70 },
    ],
    color: "#1A1A1A",
    fillPct: 50,
    borderPx: 2,
  },
  {
    id: "seed-count-1",
    kind: "count",
    name: "Outlets",
    points: [
      { x: 140, y: 130 }, { x: 400, y: 130 }, { x: 520, y: 330 },
      { x: 700, y: 130 }, { x: 150, y: 620 }, { x: 590, y: 620 },
    ],
    color: "#7B2FBE",
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
  area: { item: "Flooring, LVP", cost: 4.25, markup: 1.5 },
  linear: { item: "Base trim", cost: 3.1, markup: 1.15 },
  count: { item: "Outlet, installed", cost: 88, markup: 22 },
};
