"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { Plus, Undo2, RotateCcw, Ruler, Check, X } from "lucide-react";
import PlanBackdrop from "./PlanBackdrop";
import MeasurementLayer from "./MeasurementLayer";
import ScaleSheet from "./ScaleSheet";
import ResultsPanel from "./ResultsPanel";
import { reducer, initialState, canClose } from "@/lib/takeoff/reducer";
import type { Pt, ToolId } from "@/lib/takeoff/types";
import {
  clientToPlan,
  computeViewport,
  dist,
  edgeNormal,
  midpoint,
  polygonAreaUnits,
  polylineLengthUnits,
  unitsToFeet,
  unitsToSqFeet,
  type Viewport,
} from "@/lib/takeoff/geometry";
import { formatArea, formatDistance, formatScalePill } from "@/lib/takeoff/format";
import {
  CLOSE_PX_COARSE,
  CLOSE_PX_FINE,
  PALETTE,
  VIEWBOX,
} from "@/lib/takeoff/planFixture";

const TOOLS: Array<{ id: ToolId; label: string }> = [
  { id: "scale", label: "Scale" },
  { id: "linear", label: "Linear" },
  { id: "area", label: "Area" },
  { id: "count", label: "Count" },
];

export default function TakeoffDemo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Cursor is deliberately kept out of the reducer: pointermove fires at
  // 60-120Hz and routing it through dispatch would re-render everything.
  const cursorRef = useRef<Pt | null>(null);
  const rafRef = useRef(0);
  const [cursor, setCursor] = useState<Pt | null>(null);

  const vpRef = useRef<Viewport>(
    computeViewport({ left: 0, top: 0, width: 1120, height: 760 }, VIEWBOX),
  );
  const [pxPerUnit, setPxPerUnit] = useState(1);
  const [coarse, setCoarse] = useState(false);
  const downRef = useRef<{ x: number; y: number; t: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarse(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Track size; getBoundingClientRect never runs in the pointermove path.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      vpRef.current = computeViewport(
        { left: r.left, top: r.top, width: r.width, height: r.height },
        VIEWBOX,
      );
      setPxPerUnit(vpRef.current.pxPerUnit);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", measure);
    };
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const closePx = coarse ? CLOSE_PX_COARSE : CLOSE_PX_FINE;
  const closeThresholdUnits = closePx / (pxPerUnit || 1);

  const closeable = canClose(state.draft, cursor, closeThresholdUnits);
  const drawing = state.phase === "drawing" || state.phase === "armed";
  const calibrating = state.phase === "calibrating";

  /* --------------------------------------------------------------- */
  /* Pointer                                                          */
  /* --------------------------------------------------------------- */

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    cursorRef.current = clientToPlan(e.clientX, e.clientY, vpRef.current);
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      setCursor(cursorRef.current);
    });
  }, []);

  const commitAt = useCallback(
    (at: Pt) => dispatch({ type: "COMMIT_POINT", at, closeThresholdUnits }),
    [closeThresholdUnits],
  );

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    downRef.current = { x: e.clientX, y: e.clientY, t: e.timeStamp };
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const d = downRef.current;
      downRef.current = null;
      if (!d) return;
      // A drag is a pan, not a vertex.
      if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 4) return;
      if (e.timeStamp - d.t > 400) return;
      if (coarse) return; // touch commits via the Add Point button only
      if (!drawing && !calibrating) return;
      commitAt(clientToPlan(e.clientX, e.clientY, vpRef.current));
    },
    [coarse, drawing, calibrating, commitAt],
  );

  /* --------------------------------------------------------------- */
  /* Keyboard                                                         */
  /* --------------------------------------------------------------- */

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = e.shiftKey ? 40 : e.altKey ? 1 : 8;
      const cur = cursorRef.current ?? { x: 560, y: 380 };
      const move = (dx: number, dy: number) => {
        e.preventDefault();
        const next = { x: cur.x + dx, y: cur.y + dy };
        cursorRef.current = next;
        setCursor(next);
      };

      if (e.key === "ArrowLeft") return move(-step, 0);
      if (e.key === "ArrowRight") return move(step, 0);
      if (e.key === "ArrowUp") return move(0, -step);
      if (e.key === "ArrowDown") return move(0, step);
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (drawing || calibrating) commitAt(cur);
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        return dispatch({ type: "UNDO" });
      }
      if (e.key === "Escape") return dispatch({ type: "CANCEL_DRAFT" });
      if (e.key.toLowerCase() === "d") return dispatch({ type: "FINISH_OPEN" });
    },
    [drawing, calibrating, commitAt],
  );

  /* --------------------------------------------------------------- */
  /* Derived                                                          */
  /* --------------------------------------------------------------- */

  const EMPTY: Pt[] = useMemo(() => [], []);
  const draftPoints = state.draft?.points ?? EMPTY;
  const preview = useMemo(
    () => (cursor && draftPoints.length > 0 ? [...draftPoints, cursor] : draftPoints),
    [draftPoints, cursor],
  );

  const liveValue = useMemo(() => {
    if (!state.draft || draftPoints.length === 0) return null;
    const kind = state.draft.kind;
    if (kind === "count") return `${draftPoints.length} EA`;
    if (kind === "area" && preview.length >= 3) {
      return formatArea(unitsToSqFeet(polygonAreaUnits(preview), state.scale.ftPerUnit));
    }
    return formatDistance(unitsToFeet(polylineLengthUnits(preview), state.scale.ftPerUnit));
  }, [state.draft, draftPoints, preview, state.scale.ftPerUnit]);

  const prompt = calibrating
    ? state.calibration?.pts.length === 0
      ? "Select starting point"
      : "Click Next Point"
    : draftPoints.length === 0
      ? "Select starting point"
      : "Click Next Point";

  const actionLabel = closeable
    ? "Close Shape"
    : state.draft?.kind === "count"
      ? "Add Count"
      : "Add Point";

  // Haptic on the rising edge of the close affordance, as the app does.
  const wasCloseable = useRef(false);
  useEffect(() => {
    if (closeable && !wasCloseable.current) navigator.vibrate?.(10);
    wasCloseable.current = closeable;
  }, [closeable]);

  const pendingColorIdx = PALETTE.indexOf(
    (state.pending?.color ?? PALETTE[0]) as (typeof PALETTE)[number],
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.10)]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-black/10 bg-white px-3 py-3 sm:px-4">
        <div role="radiogroup" aria-label="Takeoff tool" className="flex flex-wrap gap-2">
          {TOOLS.map((t) => {
            const active = state.tool === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() =>
                  dispatch({ type: "SELECT_TOOL", tool: active && t.id !== "scale" ? null : t.id })
                }
                className={`inline-flex h-10 min-w-[76px] items-center justify-center rounded-full px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                  active
                    ? "bg-brand text-white"
                    : "border border-black/10 bg-white text-ink hover:border-black/25"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <span className="mx-1 hidden h-6 w-px bg-black/10 sm:block" />

        <button
          type="button"
          onClick={() => dispatch({ type: "UNDO" })}
          disabled={state.past.length === 0}
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-black/10 px-3.5 text-sm font-semibold text-ink transition hover:border-black/25 disabled:opacity-35"
        >
          <Undo2 size={15} /> Undo
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "RESET_DEMO" })}
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-black/10 px-3.5 text-sm font-semibold text-ink transition hover:border-black/25"
        >
          <RotateCcw size={15} /> Reset
        </button>

        <button
          type="button"
          onClick={() => dispatch({ type: "OPEN_SHEET", sheet: "scale" })}
          className="ml-auto inline-flex h-10 items-center gap-2 rounded-full border border-black/10 px-3.5 font-mono text-xs font-semibold text-ink/70 transition hover:border-brand hover:text-brand"
        >
          <Ruler size={15} />
          {formatScalePill(state.scale.ftPerUnit)}
          <span className="rounded-full bg-[#F5F5F5] px-2 py-0.5 text-[10px] tracking-wide uppercase">
            Uniform
          </span>
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px]">
        {/* Canvas */}
        <div className="relative">
          <div
            ref={wrapRef}
            data-lenis-prevent
            className="relative w-full touch-none select-none"
            style={{ aspectRatio: `${VIEWBOX.w} / ${VIEWBOX.h}` }}
          >
            <svg
              viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`}
              className="h-full w-full"
              style={{
                fontFamily: "inherit",
                cursor: drawing || calibrating ? "crosshair" : "default",
              }}
              role="application"
              aria-roledescription="Interactive floor plan takeoff"
              aria-label="Sample floor plan. Pick a tool, then click to place measurement points."
              tabIndex={0}
              onPointerMove={onPointerMove}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerLeave={() => setCursor(null)}
              onKeyDown={onKeyDown}
            >
              <PlanBackdrop />

              <MeasurementLayer
                measurements={state.measurements}
                ftPerUnit={state.scale.ftPerUnit}
                selectedId={state.selectedId}
                onSelect={(id) => dispatch({ type: "SELECT", id })}
              />

              {/* Pending (finalised, awaiting Save) */}
              {state.pending ? (
                <MeasurementLayer
                  measurements={[state.pending]}
                  ftPerUnit={state.scale.ftPerUnit}
                />
              ) : null}

              {/* Live draft */}
              {draftPoints.length > 0 && state.draft ? (
                <g>
                  {state.draft.kind !== "count" ? (
                    <path
                      d={
                        preview.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") +
                        (state.draft.kind === "area" && preview.length > 2 ? " Z" : "")
                      }
                      fill={state.draft.kind === "area" ? PALETTE[0] : "none"}
                      fillOpacity={state.draft.kind === "area" ? 0.3 : 0}
                      stroke={PALETTE[0]}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : null}

                  {/* Per-edge live dimensions */}
                  {state.draft.kind !== "count" &&
                    preview.slice(0, -1).map((a, i) => {
                      const b = preview[i + 1];
                      const len = dist(a, b);
                      if (len < 40) return null;
                      const mid = midpoint(a, b);
                      const nrm = edgeNormal(a, b);
                      return (
                        <text
                          key={i}
                          x={mid.x + nrm.x * 13}
                          y={mid.y + nrm.y * 13}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize={13}
                          fontWeight={600}
                          fill={PALETTE[0]}
                          paintOrder="stroke"
                          stroke="#fff"
                          strokeWidth={3}
                          strokeLinejoin="round"
                        >
                          {formatDistance(unitsToFeet(len, state.scale.ftPerUnit))}
                        </text>
                      );
                    })}

                  {draftPoints.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={5} fill={PALETTE[0]} />
                  ))}

                  {/* Close affordance: translucent green disc on vertex 1,
                      radius exactly equal to the hit zone. */}
                  {closeable ? (
                    <circle
                      cx={draftPoints[0].x}
                      cy={draftPoints[0].y}
                      r={closeThresholdUnits}
                      fill="#00B51E"
                      fillOpacity={0.3}
                    />
                  ) : null}
                </g>
              ) : null}

              {/* Calibration line */}
              {calibrating && state.calibration ? (
                <g>
                  {state.calibration.pts.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={6} fill="#0F83FF" />
                  ))}
                  {state.calibration.pts.length === 1 && cursor ? (
                    <line
                      x1={state.calibration.pts[0].x}
                      y1={state.calibration.pts[0].y}
                      x2={cursor.x}
                      y2={cursor.y}
                      stroke="#0F83FF"
                      strokeWidth={2.5}
                    />
                  ) : null}
                </g>
              ) : null}

              {/* Crosshair guides */}
              {cursor && (drawing || calibrating) ? (
                <g pointerEvents="none">
                  <line x1={VIEWBOX.x} y1={cursor.y} x2={VIEWBOX.w} y2={cursor.y} stroke="#1A1A1A" strokeOpacity={0.18} strokeWidth={1} />
                  <line x1={cursor.x} y1={VIEWBOX.y} x2={cursor.x} y2={VIEWBOX.h} stroke="#1A1A1A" strokeOpacity={0.18} strokeWidth={1} />
                </g>
              ) : null}
            </svg>

            {/* Amber prompt pill. The app uses white text on #FFBB00 (~1.9:1);
                near-black here gives ~11:1 without changing the colour. */}
            {(drawing || calibrating) && !state.pending ? (
              <div className="pointer-events-none absolute bottom-3 left-3 flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-[#FFBB00] px-3 py-1.5 font-mono text-xs font-bold text-ink shadow-sm">
                  {prompt}
                </span>
                {liveValue ? (
                  <span className="rounded-lg bg-[#FFBB00] px-3 py-1.5 font-mono text-xs font-bold text-ink shadow-sm">
                    {liveValue}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Action bar */}
          <div className="flex flex-wrap items-center gap-2 border-t border-black/10 bg-white px-3 py-3 sm:px-4">
            {state.pending ? (
              <>
                <span className="text-sm font-semibold text-ink">
                  {state.pending.name}
                </span>
                <div className="flex items-center gap-1.5">
                  {PALETTE.map((c, i) => (
                    <button
                      key={c}
                      type="button"
                      aria-label={`Colour ${i + 1}`}
                      aria-pressed={pendingColorIdx === i}
                      onClick={() => dispatch({ type: "PATCH_PENDING", patch: { color: c } })}
                      className={`h-5 w-5 rounded-full transition ${
                        pendingColorIdx === i ? "ring-2 ring-ink ring-offset-1" : ""
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "SAVE_PENDING" })}
                  className="btn-primary ml-auto h-10 gap-1.5 px-5"
                >
                  <Check size={16} /> Save
                </button>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "DISCARD_PENDING" })}
                  className="inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-black/10 px-4 text-sm font-semibold text-ink transition hover:border-black/25"
                >
                  <X size={16} /> Cancel
                </button>
              </>
            ) : drawing || calibrating ? (
              <>
                <button
                  type="button"
                  onClick={() => commitAt(cursor ?? { x: 560, y: 380 })}
                  disabled={!coarse && !cursor}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-[10px] px-5 text-sm font-semibold text-white transition disabled:opacity-40 ${
                    closeable ? "bg-[#00B51E]" : "bg-brand hover:bg-brand-hover"
                  }`}
                >
                  {/* The plus icon disappears when the label becomes Close Shape */}
                  {!closeable ? <Plus size={16} /> : null}
                  {actionLabel}
                </button>

                {draftPoints.length >= (state.draft?.kind === "count" ? 1 : 2) ? (
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "FINISH_OPEN" })}
                    className="inline-flex h-11 items-center rounded-[10px] border border-black/10 px-4 text-sm font-semibold text-ink transition hover:border-black/25"
                  >
                    Done
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={() => dispatch({ type: "SELECT_TOOL", tool: null })}
                  className="ml-auto inline-flex h-11 items-center rounded-[10px] px-3 text-sm font-semibold text-ink/55 transition hover:text-ink"
                >
                  Cancel
                </button>
              </>
            ) : (
              <p className="text-sm text-ink/60">
                Pick <strong className="font-semibold text-ink">Area</strong> and trace{" "}
                <strong className="font-semibold text-ink">STORAGE 102</strong> — it is the
                one room left unmeasured.
              </p>
            )}
          </div>
        </div>

        <ResultsPanel state={state} dispatch={dispatch} />
      </div>

      {state.sheet === "scale" ? (
        <ScaleSheet state={state} dispatch={dispatch} />
      ) : null}

      <p aria-live="polite" className="sr-only">
        {state.announcement}
      </p>
    </div>
  );
}
