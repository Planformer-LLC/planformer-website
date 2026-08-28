"use client";

import { useState, type Dispatch } from "react";
import { X } from "lucide-react";
import type { Action, TakeoffState } from "@/lib/takeoff/types";
import { formatScalePill, parseFraction } from "@/lib/takeoff/format";

function Field({
  label,
  value,
  onChange,
  suffix,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-ink/60">{label}</span>
      <span className="mt-1 flex items-center rounded-lg border border-black/12 bg-white px-2.5 focus-within:border-brand">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputMode="decimal"
          placeholder={placeholder}
          className="h-10 w-full bg-transparent text-sm text-ink outline-none"
        />
        {suffix ? <span className="pl-1 text-xs text-ink/40">{suffix}</span> : null}
      </span>
    </label>
  );
}

export default function ScaleSheet({
  state,
  dispatch,
}: {
  state: TakeoffState;
  dispatch: Dispatch<Action>;
}) {
  const [mode, setMode] = useState<"points" | "ratio">("points");

  // Calibrate by Points — the real app takes the length FIRST, then two clicks.
  const [feet, setFeet] = useState("125");
  const [inches, setInches] = useState("0");
  const [fraction, setFraction] = useState("");

  // Direct Ratio — prefilled to reproduce the plan's authored 1/8" = 1'-0".
  const [drawingIn, setDrawingIn] = useState("1");
  const [realFt, setRealFt] = useState("8");
  const [realIn, setRealIn] = useState("0");

  const close = () => dispatch({ type: "OPEN_SHEET", sheet: null });

  const startPoints = () => {
    const f = Number(feet) || 0;
    const i = Number(inches) || 0;
    const fr = parseFraction(fraction) ?? 0;
    const refFeet = f + (i + fr) / 12;
    if (refFeet > 0) dispatch({ type: "START_CALIBRATION", refFeet });
  };

  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/35 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Set Scale"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="max-h-full w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-ink">Set Scale</h3>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="rounded-lg p-1.5 text-ink/40 transition hover:bg-[#F5F5F5] hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMode("points")}
            aria-pressed={mode === "points"}
            className={`rounded-lg border p-3 text-left transition ${
              mode === "points" ? "border-brand bg-brand/5" : "border-black/12 hover:border-black/25"
            }`}
          >
            <span className="block text-sm font-bold text-ink">Calibrate by Points</span>
            <span className="mt-1 block text-[11px] leading-snug text-ink/55">
              Set scale using two endpoints of that dimension on the plan
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMode("ratio")}
            aria-pressed={mode === "ratio"}
            className={`rounded-lg border p-3 text-left transition ${
              mode === "ratio" ? "border-brand bg-brand/5" : "border-black/12 hover:border-black/25"
            }`}
          >
            <span className="block text-sm font-bold text-ink">Direct Ratio</span>
            <span className="mt-1 block text-[11px] leading-snug text-ink/55">
              Enter the drawing-to-real ratio directly. No clicks needed.
            </span>
          </button>
        </div>

        {mode === "points" ? (
          <div className="mt-4">
            <p className="text-xs text-ink/55">
              Enter the real length first, then click the two ends of the{" "}
              <strong className="font-semibold text-ink">125&#8217;-0&#8221;</strong> dimension
              line below the plan.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Field label="Feet" value={feet} onChange={setFeet} suffix="ft" placeholder="enter feet" />
              <Field label="Inches" value={inches} onChange={setInches} suffix="in" placeholder="enter inches" />
              <Field label="Fraction" value={fraction} onChange={setFraction} placeholder="¼, ½ or 1/8" />
            </div>
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={close} className="h-11 flex-1 rounded-[10px] border border-black/12 text-sm font-semibold text-ink transition hover:border-black/25">
                Cancel
              </button>
              <button type="button" onClick={startPoints} className="btn-primary h-11 flex-1">
                Set Points
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-2">
              <Field label="Drawing Inches" value={drawingIn} onChange={setDrawingIn} suffix="in" />
              <Field label="Real Feet" value={realFt} onChange={setRealFt} suffix="ft" />
              <Field label="Real Inches" value={realIn} onChange={setRealIn} suffix="in" />
            </div>
            <p className="mt-2 font-mono text-xs text-ink/50">
              {drawingIn || 0}&#8221; → {Number(realFt) || 0} ft {Number(realIn) || 0} in
            </p>
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={close} className="h-11 flex-1 rounded-[10px] border border-black/12 text-sm font-semibold text-ink transition hover:border-black/25">
                Cancel
              </button>
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: "APPLY_RATIO_SCALE",
                    drawingInches: Number(drawingIn) || 0,
                    realFeet: Number(realFt) || 0,
                    realInches: Number(realIn) || 0,
                  })
                }
                className="btn-primary h-11 flex-1"
              >
                Set Scale
              </button>
            </div>
          </div>
        )}

        {/* Current scale */}
        <div className="mt-5 flex items-center justify-between rounded-lg bg-[#F5F5F5] px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold tracking-wide text-ink/60 uppercase">
              Uniform
            </span>
            <span className="font-mono text-xs font-semibold text-ink">
              {formatScalePill(state.scale.ftPerUnit)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => dispatch({ type: "RESET_SCALE" })}
            className="text-xs font-semibold text-brand transition hover:underline"
          >
            Reset Scale
          </button>
        </div>

        <p className="mt-3 text-[11px] leading-snug text-ink/45">
          In the app, drawing tools stay locked until you set the scale. This
          sample is pre-calibrated so you can start right away.
        </p>
      </div>
    </div>
  );
}
