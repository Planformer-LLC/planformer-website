"use client";

import type { Dispatch } from "react";
import { Trash2 } from "lucide-react";
import { siteData } from "@/data/siteData";
import type { Action, Measurement, TakeoffState } from "@/lib/takeoff/types";
import { formatFeet, formatRowValue } from "@/lib/takeoff/format";
import { perimeterUnits, unitsToFeet } from "@/lib/takeoff/geometry";
import { KindIcon } from "./DemoChrome";

/** Main value and, for areas, the perimeter underneath, as the app lists them. */
export function rowLines(m: Measurement, ftPerUnit: number): [string, string | null] {
  const main = formatRowValue(m, ftPerUnit);
  if (m.kind !== "area") return [main, null];
  return [main, formatFeet(unitsToFeet(perimeterUnits(m.points), ftPerUnit))];
}

export default function ResultsPanel({
  state,
  dispatch,
  highlight,
}: {
  state: TakeoffState;
  dispatch: Dispatch<Action>;
  /** True once the visitor has traced an area: the sign-up nudge steps up. */
  highlight: boolean;
}) {
  const { measurements, scale } = state;

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
          Nothing measured yet. Pick a tool below the plan and your
          measurements show up here.
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
        {highlight ? (
          <p className="mb-3 text-sm leading-snug text-ink" aria-live="polite">
            That&apos;s a real takeoff. Upload your own plans and do the same on
            every job.
          </p>
        ) : null}
        <a
          href={siteData.signupHref}
          className={`inline-flex h-11 w-full items-center justify-center rounded-[10px] bg-brand text-sm font-bold text-white transition hover:bg-brand-hover ${
            highlight ? "ring-4 ring-brand/25" : ""
          }`}
        >
          Do this on your own plans
        </a>
      </div>
    </aside>
  );
}
