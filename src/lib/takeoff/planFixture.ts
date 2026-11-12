import type { Measurement, MeasurementKind, Pt } from "./types";
import type { ViewBox } from "./geometry";

/**
 * Synthetic sample plan: a single-storey two-bedroom house, 40 ft x 30 ft.
 *
 * Authored so 1 ft = 18 plan units. At the 1/4" = 1'-0" architectural scale
 * one printed inch is 4 ft = 72 units. Every room is a whole number of feet,
 * so the seeded quantities are round and read as real takeoff numbers. The
 * scale is preset in the demo.
 */
export const UNITS_PER_FT = 18;
export const FT_PER_UNIT_DEFAULT = 1 / UNITS_PER_FT;
export const UNITS_PER_DRAWING_INCH = 72;
export const SCALE_LABEL = "1/4\u2033 = 1\u2032-0\u2033";

// Taller than the drawing so the floating toolbar sits below the plan, not on it.
export const VIEWBOX: ViewBox = { x: 0, y: 0, w: 1120, h: 850 };

/** Building envelope on the wall centrelines. */
export const ENVELOPE = { x0: 230, y0: 120, x1: 950, y1: 660 };

export interface Room {
  id: string;
  name: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

/** Back row 13 ft deep, front row 17 ft deep. */
export const ROOMS: Room[] = [
  { id: "bed-1", name: "bedroom 1", x0: 230, y0: 120, x1: 482, y1: 354 },
  { id: "bath", name: "bath", x0: 482, y0: 120, x1: 626, y1: 282 },
  { id: "bed-2", name: "bedroom 2", x0: 626, y0: 120, x1: 950, y1: 354 },
  { id: "living", name: "living room", x0: 230, y0: 354, x1: 626, y1: 660 },
  { id: "kitchen", name: "kitchen", x0: 626, y0: 354, x1: 950, y1: 660 },
];

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

const living = ROOMS.find((r) => r.id === "living")!;

/**
 * One finished area, so visitors see what a measurement looks like on the
 * plan and in the list before they draw their own.
 */
export const SEED_MEASUREMENTS: Measurement[] = [
  {
    id: "seed-area-1",
    kind: "area",
    name: "Living room",
    points: ringOf(living),
    color: "#00B51E",
    fillPct: 50,
    borderPx: 2,
  },
];

/** So the visitor's first area auto-names "Area 2", as the app would. */
export const SEED_NAME_COUNTERS: Record<MeasurementKind, number> = {
  area: 1,
  linear: 0,
  count: 0,
};
