"use client";

import type { Dispatch } from "react";
import { useMemo } from "react";
import { Trash2 } from "lucide-react";
import { siteData } from "@/data/siteData";
import type { Action, Measurement, TakeoffState } from "@/lib/takeoff/types";
import { formatFeet, formatMoney, formatRowValue, quantityOf } from "@/lib/takeoff/format";
import { perimeterUnits, unitsToFeet } from "@/lib/takeoff/geometry";
import { RATE_DEFAULTS } from "@/lib/takeoff/planFixture";
import { KindIcon } from "./DemoChrome";

/** Main value and, for areas, the perimeter underneath, as the app lists them. */
export function rowLines(m: Measurement, ftPerUnit: number): [string, string | null] {
  const main = formatRowValue(m, ftPerUnit);
  if (m.kind !== "area") return [main, null];
  return [main, formatFeet(unitsToFeet(perimeterUnits(m.points), ftPerUnit))];
}

export function estimateTotal(measurements: Measurement[], ftPerUnit: number) {
  return measurements.reduce((sum, m) => {
    const r = RATE_DEFAULTS[m.kind];
    // Markup is per-unit currency, not a percentage (CalculatorItem in the app).
    return sum + (r.cost + r.markup) * quantityOf(m, ftPerUnit);
  }, 0);
}

export default function ResultsPanel({
  state,
  dispatch,
  highlight,
}: {
  state: TakeoffState;
  dispatch: Dispatch<Action>;
  /** True once the visitor has added their own measurement. */
  highlight: boolean;
}) {
  const { measurements, scale } = state;
  const total = useMemo(
    () => estimateTotal(measurements, scale.ftPerUnit),
    [measurements, scale.ftPerUnit],
  );

  return (
    <aside className="flex flex-col border-t border-[#EEF1F5] bg-white lg:border-t-0 lg:border-r">
      <div className="flex items-center justify-between px-4 pt-4 pb-1">
        <h3 className="text-[15px] font-semibold text-ink">Measurements</h3>
        {measurements.length > 0 ? (
          <button
            type="button"
            onClick={() => dispatch({ type: "CLEAR_ALL" })}
            className="text-xs font-semibold text-ink/50 transition hover:text-[#E11D48]"
          >
            Clear all
          </button>
        ) : null}
      </div>

      {measurements.length === 0 ? (
        <p className="px-4 py-3 text-sm text-ink/50">
          Nothing measured yet. Pick a tool below the plan.
        </p>
      ) : (
        <ul role="list" className="max-h-[300px] overflow-y-auto px-2 pb-2">
          {measurements.map((m) => {
            const [main, sub] = rowLines(m, scale.ftPerUnit);
            return (
              <li key={m.id}>
                <div
                  className={`group grid grid-cols-[20px_minmax(0,1fr)_auto_14px_28px] items-center gap-2 rounded-lg px-2 py-2 transition ${
                    state.selectedId === m.id ? "bg-[#F2F7FF]" : "hover:bg-[#F7F8FA]"
                  }`}
                >
                  <KindIcon kind={m.kind} className="h-[18px] w-[18px] text-[#4A5260]" />
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "SELECT", id: m.id })}
                    className="truncate text-left text-sm font-semibold text-ink"
                  >
                    {m.name}
                  </button>
                  <span className="text-right text-[13px] leading-tight text-ink">
                    {main}
                    {sub ? <span className="block text-xs text-[#5F6670]">{sub}</span> : null}
                  </span>
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ backgroundColor: m.color }}
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    aria-label={`Delete ${m.name}`}
                    onClick={() => dispatch({ type: "DELETE", id: m.id })}
                    className="flex h-7 w-7 items-center justify-center rounded text-ink/30 transition hover:bg-white hover:text-[#E11D48]"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-auto border-t border-[#EEF1F5] px-4 pt-4 pb-4">
        <div
          className={`rounded-xl px-4 py-3 transition-colors duration-500 ${
            highlight ? "bg-[#EAF3FF] ring-2 ring-brand" : "bg-[#F5F7FA]"
          }`}
          aria-live="polite"
        >
          <div className="flex items-baseline justify-between text-sm text-[#5F6670]">
            <span>Estimate</span>
            <span>
              {measurements.length} {measurements.length === 1 ? "item" : "items"}
            </span>
          </div>
          <p className="mt-1 text-[28px] leading-tight font-extrabold text-ink tabular-nums">
            {formatMoney(total)}
          </p>
          <p className="mt-1 text-xs text-[#5F6670]">
            Sample prices: flooring $5.75/sq ft, trim $4.25/ft, outlets $110 each.
          </p>
        </div>

        <a
          href={siteData.signupHref}
          className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-[10px] bg-brand text-sm font-bold text-white transition hover:bg-brand-hover"
        >
          Do this on your own plans
        </a>
      </div>
    </aside>
  );
}
