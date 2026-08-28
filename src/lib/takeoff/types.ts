export interface Pt {
  readonly x: number;
  readonly y: number;
}

export type ToolId = "scale" | "linear" | "area" | "count";
export type MeasurementKind = "linear" | "area" | "count";
export type DraftPhase = "idle" | "armed" | "drawing" | "naming" | "calibrating";

export interface Measurement {
  id: string;
  kind: MeasurementKind;
  name: string;
  /** Area: ring (implicitly closed). Linear: polyline. Count: one dot per point. */
  points: Pt[];
  color: string;
  fillPct: 25 | 50 | 75 | 100;
  borderPx: number;
}

export interface Draft {
  kind: MeasurementKind;
  points: Pt[];
  closed: boolean;
}

export interface ScaleState {
  /** Feet per plan unit — the app's `uniformFactor`. */
  ftPerUnit: number;
  source: "default" | "points" | "ratio";
}

export interface TakeoffState {
  tool: ToolId | null;
  phase: DraftPhase;
  draft: Draft | null;
  /** Draft-scoped undo, pushed after every vertex (mirrors the app's pushUndoState). */
  past: Draft[];
  measurements: Measurement[];
  /** Finalised shape awaiting Save. */
  pending: Measurement | null;
  scale: ScaleState;
  calibration: { refFeet: number; pts: Pt[] } | null;
  sheet: null | "scale";
  selectedId: string | null;
  nameCounters: Record<MeasurementKind, number>;
  /** Bound to an aria-live region. */
  announcement: string;
}

export type Action =
  | { type: "SELECT_TOOL"; tool: ToolId | null }
  | { type: "COMMIT_POINT"; at: Pt; closeThresholdUnits: number }
  | { type: "UNDO" }
  | { type: "FINISH_OPEN" }
  | { type: "CANCEL_DRAFT" }
  | { type: "SAVE_PENDING"; patch?: Partial<Measurement> }
  | { type: "DISCARD_PENDING" }
  | { type: "PATCH_PENDING"; patch: Partial<Measurement> }
  | { type: "DELETE"; id: string }
  | { type: "CLEAR_ALL" }
  | { type: "SELECT"; id: string | null }
  | { type: "OPEN_SHEET"; sheet: TakeoffState["sheet"] }
  | { type: "APPLY_RATIO_SCALE"; drawingInches: number; realFeet: number; realInches: number }
  | { type: "START_CALIBRATION"; refFeet: number }
  | { type: "RESET_SCALE" }
  | { type: "RESET_DEMO" };
