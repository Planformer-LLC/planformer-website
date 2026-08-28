"use client";

import type { Dispatch } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { Action, TakeoffState } from "@/lib/takeoff/types";
import { formatMoney, formatRowValue, quantityOf, unitLabel } from "@/lib/takeoff/format";
import { RATE_DEFAULTS } from "@/lib/takeoff/planFixture";

export default function ResultsPanel({
  state,
  dispatch,
}: {
  state: TakeoffState;
  dispatch: Dispatch<Action>;
}) {
  const { measurements, scale } = state;

  const rows = useMemo(
    () =>
      measurements.map((m) => {
        const rate = RATE_DEFAULTS[m.kind];
        const qty = quantityOf(m, scale.ftPerUnit);
        // Markup is per-unit currency, not a percentage.
        return {
          m,
          item: rate.item,
          qty,
          unit: unitLabel(m.kind),
          cost: rate.cost,
          markup: rate.markup,
          total: (rate.cost + rate.markup) * qty,
        };
      }),
    [measurements, scale.ftPerUnit],
  );

  const total = useMemo(() => rows.reduce((a, r) => a + r.total, 0), [rows]);

  return (
    <aside className="flex flex-col border-t border-black/10 lg:border-t-0 lg:border-l">
      {/* Measurements */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h3 className="text-xs font-bold tracking-[0.14em] text-ink/50 uppercase">
          Measurements
        </h3>
        {measurements.length > 0 ? (
          <button
            type="button"
            onClick={() => dispatch({ type: "CLEAR_ALL" })}
            className="text-xs font-semibold text-ink/45 transition hover:text-[#E11D48]"
          >
            Clear All
          </button>
        ) : null}
      </div>

      {measurements.length === 0 ? (
        <p className="px-4 pb-4 text-sm text-ink/45">No items yet</p>
      ) : (
        <ul role="list" className="max-h-[240px] overflow-y-auto px-2 pb-2">
          {measurements.map((m) => (
            <li key={m.id}>
              <div
                className={`flex items-center gap-2.5 rounded-lg px-2 py-2 transition ${
                  state.selectedId === m.id ? "bg-[#F5F5F5]" : "hover:bg-[#FAFAFA]"
                }`}
              >
                <span
                  className="h-4 w-4 shrink-0 rounded"
                  style={{ backgroundColor: m.color }}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => dispatch({ type: "SELECT", id: m.id })}
                  className="min-w-0 flex-1 text-left"
                >
                  <span className="block truncate text-sm font-semibold text-ink">
                    {m.name}
                  </span>
                  <span className="block text-xs text-[#A3A3A3]">
                    {formatRowValue(m, scale.ftPerUnit)}
                  </span>
                </button>
                <button
                  type="button"
                  aria-label={`Delete ${m.name}`}
                  onClick={() => dispatch({ type: "DELETE", id: m.id })}
                  className="shrink-0 rounded p-1.5 text-ink/30 transition hover:bg-white hover:text-[#E11D48]"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Estimate */}
      <div className="mt-auto border-t border-black/10 px-4 pt-4 pb-4">
        <h3 className="text-xs font-bold tracking-[0.14em] text-ink/50 uppercase">
          Estimate
        </h3>

        {rows.length === 0 ? (
          <p className="mt-2 text-sm text-ink/45">No items yet</p>
        ) : (
          <div className="mt-3 space-y-2">
            {rows.map((r) => (
              <div key={r.m.id} className="flex items-baseline justify-between gap-2 text-xs">
                <span className="min-w-0 flex-1 truncate text-ink/70">{r.item}</span>
                <span className="shrink-0 font-mono text-ink/45">
                  {r.qty.toFixed(r.m.kind === "count" ? 0 : 2)} {r.unit}
                </span>
                <span className="shrink-0 font-mono font-semibold text-ink">
                  {formatMoney(r.total)}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 rounded-xl bg-surface-dark px-4 py-3.5">
          <p className="text-[10px] font-bold tracking-[0.14em] text-white/50 uppercase">
            Total Price
          </p>
          <p className="mt-1 font-mono text-2xl font-extrabold text-white">
            {formatMoney(total)}
          </p>
          <p className="mt-1 text-[11px] text-white/45">
            $4.25/SF · $3.10/LF · $88 each, plus markup
          </p>
        </div>

        <Link href="/download" className="btn-primary mt-3 h-11 w-full text-sm">
          Do this on your own plans
        </Link>
        <p className="mt-2 text-center text-[11px] leading-snug text-ink/45">
          Your real plans are PDFs. Planformer handles those too.
        </p>
      </div>
    </aside>
  );
}
