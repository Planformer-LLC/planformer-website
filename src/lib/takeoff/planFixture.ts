import type { Measurement, MeasurementKind, Pt } from "./types";
import type { ViewBox } from "./geometry";

/**
 * Synthetic sample plan: a detached garage with a studio and bath.
 *
 * Authored so 1 plan unit = 1/20 ft, i.e. 1 ft = 20 units. At the
 * 1/4" = 1'-0" architectural scale one printed inch is 4 ft = 80 units.
 * Every room is a whole number of feet, so the seeded quantities are round
 * and read as real takeoff numbers. The scale is preset in the demo.
 */
export const FT_PER_UNIT_DEFAULT = 0.05;
export const UNITS_PER_DRAWING_INCH = 80;
export const UNITS_PER_FT = 1 / FT_PER_UNIT_DEFAULT;
export const SCALE_LABEL = "1/4\u2033 = 1\u2032-0\u2033";

// Taller than the drawing so the floating toolbar sits below the plan, not on it.
export const VIEWBOX: ViewBox = { x: 0, y: 0, w: 1120, h: 850 };

/** Building envelope on the wall centrelines: 40 ft x 24 ft. */
export const ENVELOPE = { x0: 200, y0: 150, x1: 1000, y1: 630 };

export interface Room {
  id: string;
  label: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export const ROOMS: Room[] = [
  { id: "garage", label: "GARAGE", x0: 200, y0: 150, x1: 680, y1: 630 },
  { id: "studio", label: "STUDIO", x0: 680, y0: 150, x1: 1000, y1: 470 },
  { id: "bath", label: "BATH", x0: 680, y0: 470, x1: 1000, y1: 630 },
];

/** The room the guided first step asks visitors to trace (24 ft x 24 ft). */
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
    name: "Studio",
    points: ringOf(room("studio")),
    color: "#E8D44D",
    fillPct: 50,
    borderPx: 2,
  },
  {
    id: "seed-area-2",
    kind: "area",
    name: "Bath",
    points: ringOf(room("bath")),
    color: "#3FD6DD",
    fillPct: 50,
    borderPx: 2,
  },
  {
    id: "seed-linear-1",
    kind: "linear",
    name: "Exterior wall",
    points: [
      { x: 200, y: 150 },
      { x: 1000, y: 150 },
      { x: 1000, y: 630 },
    ],
    color: "#FF7A1A",
    fillPct: 50,
    borderPx: 2,
  },
  {
    id: "seed-count-1",
    kind: "count",
    name: "Outlets",
    points: [
      { x: 730, y: 200 }, { x: 870, y: 200 }, { x: 975, y: 440 },
      { x: 250, y: 200 }, { x: 630, y: 580 },
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
