import type { Pt } from "./types";

/* ------------------------------------------------------------------ */
/* Distance                                                            */
/* ------------------------------------------------------------------ */

export function dist2(a: Pt, b: Pt): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export function dist(a: Pt, b: Pt): number {
  return Math.sqrt(dist2(a, b));
}

/** Sqrt-free proximity test for the hot path. */
export function isWithin(a: Pt, b: Pt, r: number): boolean {
  return dist2(a, b) <= r * r;
}

/* ------------------------------------------------------------------ */
/* Polygon / polyline                                                  */
/* ------------------------------------------------------------------ */

/**
 * Shoelace area in square plan units. Ports
 * MeasurementUtils.calculatePolygonAreaSqFt from the Flutter app: the ring is
 * implicitly closed via (i + 1) % n, so `points` must NOT repeat the first
 * vertex at the end.
 */
export function polygonAreaUnits(pts: readonly Pt[]): number {
  if (pts.length < 3) return 0;
  let acc = 0;
  for (let i = 0; i < pts.length; i++) {
    const p1 = pts[i];
    const p2 = pts[(i + 1) % pts.length];
    acc += p1.x * p2.y - p2.x * p1.y;
  }
  return Math.abs(acc) * 0.5;
}

export function polylineLengthUnits(pts: readonly Pt[], closed = false): number {
  if (pts.length < 2) return 0;
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) total += dist(pts[i], pts[i + 1]);
  if (closed && pts.length > 2) total += dist(pts[pts.length - 1], pts[0]);
  return total;
}

export function perimeterUnits(pts: readonly Pt[]): number {
  return polylineLengthUnits(pts, true);
}

export function midpoint(a: Pt, b: Pt): Pt {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/** Unit normal of an edge, used to offset dimension labels off the line. */
export function edgeNormal(a: Pt, b: Pt): Pt {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: -dy / len, y: dx / len };
}

export function centroid(pts: readonly Pt[]): Pt {
  if (pts.length === 0) return { x: 0, y: 0 };
  let sx = 0;
  let sy = 0;
  for (const p of pts) {
    sx += p.x;
    sy += p.y;
  }
  return { x: sx / pts.length, y: sy / pts.length };
}

/* ------------------------------------------------------------------ */
/* Unit conversion                                                     */
/* ------------------------------------------------------------------ */

export function unitsToFeet(units: number, ftPerUnit: number): number {
  return units * ftPerUnit;
}

/** Area scales with the square of the linear factor. */
export function unitsToSqFeet(sqUnits: number, ftPerUnit: number): number {
  return sqUnits * ftPerUnit * ftPerUnit;
}

/** Two points a known real distance apart give feet-per-unit directly. */
export function calibrateFromPoints(a: Pt, b: Pt, refFeet: number): number {
  const px = dist(a, b);
  if (px <= 0 || refFeet <= 0) return 0;
  return refFeet / px;
}

export function calibrateFromRatio(args: {
  drawingInches: number;
  realFeet: number;
  realInches: number;
  unitsPerDrawingInch: number;
}): number {
  const { drawingInches, realFeet, realInches, unitsPerDrawingInch } = args;
  const totalFeet = realFeet + realInches / 12;
  if (drawingInches <= 0 || totalFeet <= 0) return 0;
  return totalFeet / (drawingInches * unitsPerDrawingInch);
}

/* ------------------------------------------------------------------ */
/* Screen <-> plan                                                     */
/* ------------------------------------------------------------------ */

export interface ViewBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Viewport {
  rect: { left: number; top: number; width: number; height: number };
  vb: ViewBox;
  pxPerUnit: number;
}

/**
 * The wrapper's CSS aspect-ratio is pinned to the viewBox ratio, so the SVG
 * never letterboxes and this reduces to a single scale factor. Avoids
 * getScreenCTM(), which forces layout on every pointer move.
 */
export function computeViewport(
  rect: { left: number; top: number; width: number; height: number },
  vb: ViewBox,
): Viewport {
  return { rect, vb, pxPerUnit: rect.width / vb.w || 1 };
}

export function clientToPlan(clientX: number, clientY: number, vp: Viewport): Pt {
  return {
    x: vp.vb.x + (clientX - vp.rect.left) / vp.pxPerUnit,
    y: vp.vb.y + (clientY - vp.rect.top) / vp.pxPerUnit,
  };
}
