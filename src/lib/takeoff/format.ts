import type { Measurement, MeasurementKind } from "./types";
import { polygonAreaUnits, polylineLengthUnits, unitsToFeet, unitsToSqFeet } from "./geometry";

/** The app prints feet/inches with U+2019, twice for inches — not an ASCII quote. */
const PRIME = "’";

/** e.g. 24.5 -> 24’6’’ (matches MeasurementUtils.formatDistance) */
export function formatDistance(feet: number): string {
  const totalInches = Math.round(feet * 12);
  const ft = Math.trunc(totalInches / 12);
  const inch = Math.abs(totalInches % 12);
  return `${ft}${PRIME}${inch}${PRIME}${PRIME}`;
}

/** e.g. 412.5 -> "412.50 ft²" */
export function formatArea(sqFt: number): string {
  return `${sqFt.toFixed(2)} ft²`;
}

/** On-canvas badges use the spelled-out unit: "412.50 SQ FT" */
export function formatAreaBadge(sqFt: number): string {
  return `${sqFt.toFixed(2)} SQ FT`;
}

export function formatLinearBadge(feet: number): string {
  return `${feet.toFixed(2)} FT`;
}

export function unitLabel(kind: MeasurementKind): string {
  if (kind === "area") return "SQ FT";
  if (kind === "linear") return "FT";
  return "EA";
}

/** Quantity in the measurement's own unit — SQ FT, FT or EA. */
export function quantityOf(m: Measurement, ftPerUnit: number): number {
  if (m.kind === "area") return unitsToSqFeet(polygonAreaUnits(m.points), ftPerUnit);
  if (m.kind === "linear") return unitsToFeet(polylineLengthUnits(m.points), ftPerUnit);
  return m.points.length;
}

/** Row value in the measurements list. Counts read "N dots", even at 1. */
export function formatRowValue(m: Measurement, ftPerUnit: number): string {
  if (m.kind === "count") return `${m.points.length} dots`;
  const q = quantityOf(m, ftPerUnit);
  return m.kind === "area" ? formatArea(q) : formatDistance(q);
}

/** Matches current_set_scale_sheet.dart: '1px = 0.1250 ft' */
export function formatScalePill(ftPerUnit: number): string {
  return `1px = ${ftPerUnit.toFixed(4)} ft`;
}

export function formatMoney(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const VULGAR: Record<string, number> = {
  "¼": 0.25,
  "½": 0.5,
  "¾": 0.75,
  "⅛": 0.125,
  "⅜": 0.375,
  "⅝": 0.625,
  "⅞": 0.875,
};

/** Accepts ¼ ½ ¾ ⅛ ⅜ ⅝ ⅞, "n/d", or a bare decimal. */
export function parseFraction(input: string): number | null {
  const s = input.trim();
  if (!s) return 0;
  if (s in VULGAR) return VULGAR[s];

  const ratio = s.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (ratio) {
    const d = Number(ratio[2]);
    return d === 0 ? null : Number(ratio[1]) / d;
  }

  const dec = Number(s);
  return Number.isFinite(dec) ? dec : null;
}
