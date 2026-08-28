import type { Action, Draft, Measurement, Pt, TakeoffState } from "./types";
import { calibrateFromPoints, calibrateFromRatio, isWithin, polygonAreaUnits, polylineLengthUnits, unitsToFeet, unitsToSqFeet } from "./geometry";
import { formatArea, formatDistance } from "./format";
import {
  FT_PER_UNIT_DEFAULT,
  MAX_MEASUREMENTS,
  MAX_VERTICES,
  MIN_VERTEX_SEPARATION_UNITS,
  PALETTE,
  SEED_MEASUREMENTS,
  SEED_NAME_COUNTERS,
  UNITS_PER_DRAWING_INCH,
} from "./planFixture";

export const initialState: TakeoffState = {
  tool: null,
  phase: "idle",
  draft: null,
  past: [],
  measurements: SEED_MEASUREMENTS,
  pending: null,
  scale: { ftPerUnit: FT_PER_UNIT_DEFAULT, source: "default" },
  calibration: null,
  sheet: null,
  selectedId: null,
  nameCounters: SEED_NAME_COUNTERS,
  announcement: "",
};

/**
 * Whether a click would CLOSE the shape rather than add a vertex.
 *
 * Mirrors canCloseArea in the Flutter app: area tool only (linear and count
 * can never close), at least 3 vertices, cursor within the threshold of the
 * first vertex. Derived at render time, never stored — so the button label
 * and the click behaviour cannot disagree.
 */
export function canClose(
  draft: Draft | null,
  cursor: Pt | null,
  thresholdUnits: number,
): boolean {
  if (!draft || draft.kind !== "area") return false;
  if (draft.points.length < 3 || !cursor) return false;
  return isWithin(cursor, draft.points[0], thresholdUnits);
}

function toolToKind(tool: TakeoffState["tool"]): Draft["kind"] | null {
  if (tool === "area" || tool === "linear" || tool === "count") return tool;
  return null;
}

function describe(draft: Draft, at: Pt, ftPerUnit: number): string {
  const n = draft.points.length + 1;
  if (draft.kind === "count") return `Dot ${n} added.`;
  if (draft.points.length === 0) return "Start point placed.";
  const last = draft.points[draft.points.length - 1];
  const feet = unitsToFeet(Math.hypot(at.x - last.x, at.y - last.y), ftPerUnit);
  return `Point ${n} added, ${formatDistance(feet)}.`;
}

function finalize(state: TakeoffState, draft: Draft): TakeoffState {
  const counter = state.nameCounters[draft.kind] + 1;
  const label = draft.kind === "area" ? "Area" : draft.kind === "linear" ? "Linear" : "Count";

  const pending: Measurement = {
    id: `m-${draft.kind}-${counter}-${draft.points.length}`,
    kind: draft.kind,
    name: `${label} ${counter}`,
    points: draft.points,
    color: PALETTE[state.measurements.length % PALETTE.length],
    fillPct: 50,
    borderPx: 2,
  };

  const summary =
    draft.kind === "area"
      ? formatArea(unitsToSqFeet(polygonAreaUnits(draft.points), state.scale.ftPerUnit))
      : draft.kind === "linear"
        ? formatDistance(unitsToFeet(polylineLengthUnits(draft.points), state.scale.ftPerUnit))
        : `${draft.points.length} dots`;

  return {
    ...state,
    phase: "naming",
    draft: null,
    past: [],
    pending,
    announcement: `${pending.name} ready to save. ${summary}.`,
  };
}

export function reducer(state: TakeoffState, action: Action): TakeoffState {
  switch (action.type) {
    case "SELECT_TOOL": {
      const kind = toolToKind(action.tool);
      if (action.tool === "scale") {
        return { ...state, tool: "scale", phase: "idle", draft: null, past: [], sheet: "scale" };
      }
      if (!kind) return { ...state, tool: null, phase: "idle", draft: null, past: [] };
      return {
        ...state,
        tool: action.tool,
        phase: "armed",
        draft: { kind, points: [], closed: false },
        past: [],
        selectedId: null,
        announcement: "Select starting point.",
      };
    }

    case "COMMIT_POINT": {
      // Scale calibration consumes clicks before any drafting.
      if (state.phase === "calibrating" && state.calibration) {
        const pts = [...state.calibration.pts, action.at];
        if (pts.length < 2) {
          return {
            ...state,
            calibration: { ...state.calibration, pts },
            announcement: "First scale point placed. Click the second point.",
          };
        }
        const factor = calibrateFromPoints(pts[0], pts[1], state.calibration.refFeet);
        if (factor <= 0) return state;
        return {
          ...state,
          phase: "idle",
          tool: null,
          calibration: null,
          scale: { ftPerUnit: factor, source: "points" },
          announcement: `Scale set. ${state.measurements.length} measurements recalculated.`,
        };
      }

      const d = state.draft;
      if (!d) return state;

      // The closing click is a COMMAND, not a vertex — it must not append.
      if (canClose(d, action.at, action.closeThresholdUnits)) {
        return finalize(state, { ...d, closed: true });
      }

      // Reject a degenerate click on top of the previous vertex.
      const last = d.points[d.points.length - 1];
      if (last && isWithin(action.at, last, MIN_VERTEX_SEPARATION_UNITS)) return state;

      if (d.points.length >= MAX_VERTICES) return state;

      return {
        ...state,
        phase: "drawing",
        past: [...state.past, d],
        draft: { ...d, points: [...d.points, action.at] },
        announcement: describe(d, action.at, state.scale.ftPerUnit),
      };
    }

    case "UNDO": {
      if (state.past.length === 0) return state;
      const prev = state.past[state.past.length - 1];
      return {
        ...state,
        draft: prev,
        past: state.past.slice(0, -1),
        phase: prev.points.length === 0 ? "armed" : "drawing",
        announcement: "Undid last point.",
      };
    }

    case "FINISH_OPEN": {
      const d = state.draft;
      if (!d) return state;
      const min = d.kind === "count" ? 1 : 2;
      if (d.points.length < min) return state;
      return finalize(state, { ...d, closed: false });
    }

    case "CANCEL_DRAFT":
      if (!state.draft && !state.calibration) return state;
      return {
        ...state,
        phase: state.tool && state.tool !== "scale" ? "armed" : "idle",
        draft: state.draft ? { ...state.draft, points: [] } : null,
        past: [],
        calibration: null,
        announcement: "Cancelled.",
      };

    case "PATCH_PENDING":
      if (!state.pending) return state;
      return { ...state, pending: { ...state.pending, ...action.patch } };

    case "SAVE_PENDING": {
      if (!state.pending) return state;
      if (state.measurements.length >= MAX_MEASUREMENTS) {
        return { ...state, pending: null, phase: "armed", announcement: "Measurement limit reached." };
      }
      const saved = { ...state.pending, ...(action.patch ?? {}) };
      return {
        ...state,
        measurements: [...state.measurements, saved],
        nameCounters: {
          ...state.nameCounters,
          [saved.kind]: state.nameCounters[saved.kind] + 1,
        },
        pending: null,
        phase: state.tool && state.tool !== "scale" ? "armed" : "idle",
        draft: state.tool && state.tool !== "scale" ? { kind: saved.kind, points: [], closed: false } : null,
        selectedId: saved.id,
        announcement: `${saved.name} saved.`,
      };
    }

    case "DISCARD_PENDING":
      return {
        ...state,
        pending: null,
        phase: state.tool && state.tool !== "scale" ? "armed" : "idle",
        draft: state.draft ?? (state.tool && state.tool !== "scale"
          ? { kind: state.tool as Draft["kind"], points: [], closed: false }
          : null),
        announcement: "Discarded.",
      };

    case "DELETE":
      return {
        ...state,
        measurements: state.measurements.filter((m) => m.id !== action.id),
        selectedId: state.selectedId === action.id ? null : state.selectedId,
        announcement: "Measurement deleted.",
      };

    case "CLEAR_ALL":
      return { ...state, measurements: [], selectedId: null, announcement: "All measurements cleared." };

    case "SELECT":
      return { ...state, selectedId: action.id };

    case "OPEN_SHEET":
      return { ...state, sheet: action.sheet };

    case "START_CALIBRATION":
      if (!(action.refFeet > 0)) return state;
      return {
        ...state,
        sheet: null,
        tool: "scale",
        phase: "calibrating",
        draft: null,
        past: [],
        calibration: { refFeet: action.refFeet, pts: [] },
        announcement: "Select starting point of the known dimension.",
      };

    case "APPLY_RATIO_SCALE": {
      const factor = calibrateFromRatio({
        drawingInches: action.drawingInches,
        realFeet: action.realFeet,
        realInches: action.realInches,
        unitsPerDrawingInch: UNITS_PER_DRAWING_INCH,
      });
      if (factor <= 0) return state;
      return {
        ...state,
        sheet: null,
        tool: null,
        phase: "idle",
        scale: { ftPerUnit: factor, source: "ratio" },
        announcement: `Scale updated — ${state.measurements.length} measurements recalculated.`,
      };
    }

    case "RESET_SCALE":
      return {
        ...state,
        scale: { ftPerUnit: FT_PER_UNIT_DEFAULT, source: "default" },
        announcement: "Scale reset.",
      };

    case "RESET_DEMO":
      return initialState;

    default:
      return state;
  }
}
