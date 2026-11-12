"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { Plus, Undo2, RotateCcw, Check, X } from "lucide-react";
import PlanBackdrop from "./PlanBackdrop";
import MeasurementLayer from "./MeasurementLayer";
import ResultsPanel from "./ResultsPanel";
import { KindIcon, ScaleSlot, TOOL_LABELS, WindowBar } from "./DemoChrome";
import { reducer, initialState, canClose } from "@/lib/takeoff/reducer";
import type { Pt } from "@/lib/takeoff/types";
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
import { formatArea, formatDistance } from "@/lib/takeoff/format";
import {
  CLOSE_PX_COARSE,
  CLOSE_PX_FINE,
  PALETTE,
  VIEWBOX,
} from "@/lib/takeoff/planFixture";

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

  /**
   * Size only. This used to also run on every scroll event, which meant a
   * forced layout (getBoundingClientRect) plus a React state update dozens of
   * times a second while the page moved — the cause of the scroll lag around
   * this section. The viewport's left/top DO change on scroll, but they are
   * only needed at pointer time, so they are read there instead (once per
   * animation frame, and only while a tool is active).
   */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      vpRef.current = computeViewport(
        { left: r.left, top: r.top, width: r.width, height: r.height },
        VIEWBOX,
      );
      setPxPerUnit((prev) =>
        prev === vpRef.current.pxPerUnit ? prev : vpRef.current.pxPerUnit,
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
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

  const clientRef = useRef<{ x: number; y: number } | null>(null);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      // Nothing to track unless the visitor is actually drawing. Previously
      // this re-rendered the whole canvas on every mouse move over the
      // section, including while merely scrolling past it.
      if (!drawing && !calibrating) return;

      clientRef.current = { x: e.clientX, y: e.clientY };
      const el = wrapRef.current;
      if (!el || rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const c = clientRef.current;
        if (!c) return;
        // One layout read per frame, only while drawing.
        const r = el.getBoundingClientRect();
        vpRef.current = computeViewport(
          { left: r.left, top: r.top, width: r.width, height: r.height },
          VIEWBOX,
        );
        cursorRef.current = clientToPlan(c.x, c.y, vpRef.current);
        setCursor(cursorRef.current);
      });
    },
    [drawing, calibrating],
  );

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

  const actionLabel = closeable
    ? "Close shape"
    : state.draft?.kind === "count"
      ? "Add count"
      : "Add point";

  // Haptic on the rising edge of the close affordance, as the app does.
  const wasCloseable = useRef(false);
  useEffect(() => {
    if (closeable && !wasCloseable.current) navigator.vibrate?.(10);
    wasCloseable.current = closeable;
  }, [closeable]);

  const pendingColorIdx = PALETTE.indexOf(
    (state.pending?.color ?? PALETTE[0]) as (typeof PALETTE)[number],
  );

  /* --------------------------------------------------------------- */
  /* Hints: only how to use the active tool, never what to measure    */
  /* --------------------------------------------------------------- */

  const hasMeasured = state.measurements.length > 0;
  const hint = (() => {
    if (state.pending) return "Save it to add it to your list.";
    const kind = state.draft?.kind;
    if (kind === "area") {
      if (coarse) return closeable ? "Tap Close shape to finish." : "Drag to a corner, then tap Add point.";
      return closeable ? "Click the first point to close the shape." : "Click each corner of the area.";
    }
    if (kind === "linear") {
      return coarse ? "Drag to a point, tap Add point. Tap Done to finish." : "Click along the line. Click Done to finish.";
    }
    if (kind === "count") {
      return coarse ? "Drag to an item and tap Add count." : "Click each item to count it.";
    }
    return null;
  })();

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-[#D7E2F1] bg-white shadow-[0_18px_50px_rgba(15,60,120,0.10)]">
        <WindowBar
          actions={
            <>
              <button
                type="button"
                onClick={() => dispatch({ type: "UNDO" })}
                disabled={state.past.length === 0}
                aria-label="Undo last point"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-brand transition hover:bg-[#F2F7FF] disabled:text-ink/25"
              >
                <Undo2 size={18} />
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: "RESET_DEMO" })}
                aria-label="Reset the demo"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-ink/55 transition hover:bg-[#F2F7FF] hover:text-ink"
              >
                <RotateCcw size={17} />
              </button>
            </>
          }
        />

        <div className="grid lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* Plan */}
          <div className="relative lg:order-2">
            <div
              ref={wrapRef}
              className="relative w-full touch-none select-none"
              style={{ aspectRatio: `${VIEWBOX.w} / ${VIEWBOX.h}` }}
            >
              <svg
                viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`}
                className="h-full w-full"
                style={{
                  fontFamily: "inherit",
                  cursor: drawing ? "crosshair" : "default",
                }}
                role="application"
                aria-roledescription="Interactive floor plan takeoff"
                aria-label="Sample house plan. Pick a tool, then click to place measurement points."
                tabIndex={0}
                onPointerMove={onPointerMove}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerLeave={() => cursor && setCursor(null)}
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
                  <MeasurementLayer measurements={[state.pending]} ftPerUnit={state.scale.ftPerUnit} />
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

                {/* Crosshair, red as in the app */}
                {cursor && drawing ? (
                  <g pointerEvents="none">
                    <line x1={VIEWBOX.x} y1={cursor.y} x2={VIEWBOX.w} y2={cursor.y} stroke="#E53935" strokeWidth={1.5} />
                    <line x1={cursor.x} y1={VIEWBOX.y} x2={cursor.x} y2={VIEWBOX.h} stroke="#E53935" strokeWidth={1.5} />
                    <circle cx={cursor.x} cy={cursor.y} r={9} fill="none" stroke="#E53935" strokeWidth={2} />
                  </g>
                ) : null}
              </svg>

              {/* Running value while drawing */}
              {drawing && liveValue && !state.pending ? (
                <span className="pointer-events-none absolute top-3 left-3 rounded-lg bg-[#FFBB00] px-3 py-1.5 text-sm font-bold text-ink shadow-sm tabular-nums">
                  {liveValue}
                </span>
              ) : null}

              {/* How to use the active tool */}
              {hint ? (
                <p
                  className="pointer-events-none absolute top-2 right-2 max-w-[min(230px,55%)] rounded-xl bg-surface-dark px-3 py-2 text-xs leading-snug font-semibold text-white shadow-lg sm:top-3 sm:right-3 sm:px-3.5 sm:py-2.5 sm:text-[13px]"
                  aria-live="polite"
                >
                  {hint}
                </p>
              ) : null}

              {/* Floating toolbar, which becomes the drawing controls */}
              <div className="absolute bottom-3 left-1/2 flex max-w-[calc(100%-1.5rem)] -translate-x-1/2 items-center gap-1 rounded-2xl border border-[#E3E6EB] bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.10)]">
                {state.pending ? (
                  <>
                    <div className="flex items-center gap-1.5 px-2">
                      {PALETTE.slice(0, 4).map((c, i) => (
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
                      className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-hover"
                    >
                      <Check size={16} /> Save
                    </button>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "DISCARD_PENDING" })}
                      aria-label="Discard this measurement"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink/60 transition hover:bg-[#F5F7FA] hover:text-ink"
                    >
                      <X size={17} />
                    </button>
                  </>
                ) : drawing ? (
                  <>
                    {coarse || closeable ? (
                      <button
                        type="button"
                        onClick={() => commitAt(cursor ?? { x: 560, y: 380 })}
                        className={`inline-flex h-10 items-center justify-center gap-1.5 rounded-xl px-4 text-sm font-semibold text-white transition ${
                          closeable ? "bg-[#00B51E]" : "bg-brand hover:bg-brand-hover"
                        }`}
                      >
                        {!closeable ? <Plus size={16} /> : null}
                        {actionLabel}
                      </button>
                    ) : null}
                    {draftPoints.length >= (state.draft?.kind === "count" ? 1 : 2) ? (
                      <button
                        type="button"
                        onClick={() => dispatch({ type: "FINISH_OPEN" })}
                        className="inline-flex h-10 items-center rounded-xl border border-[#E3E6EB] px-4 text-sm font-semibold text-ink transition hover:border-ink/30"
                      >
                        Done
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "SELECT_TOOL", tool: null })}
                      className="inline-flex h-10 items-center rounded-xl px-3 text-sm font-semibold text-ink/60 transition hover:text-ink"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <div role="radiogroup" aria-label="Takeoff tool" className="flex items-center gap-1">
                    <ScaleSlot />
                    {TOOL_LABELS.map((t) => {
                      const active = state.tool === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => dispatch({ type: "SELECT_TOOL", tool: active ? null : t.id })}
                          className={`flex min-w-[58px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                            active ? "bg-[#EAF3FF] text-brand" : "text-ink hover:bg-[#F5F7FA]"
                          }`}
                        >
                          <KindIcon kind={t.id} className="h-5 w-5" />
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:order-1">
            <ResultsPanel state={state} dispatch={dispatch} highlight={hasMeasured} />
          </div>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {state.announcement}
      </p>
    </div>
  );
}
