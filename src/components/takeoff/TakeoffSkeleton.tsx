import PlanBackdrop from "./PlanBackdrop";
import MeasurementLayer from "./MeasurementLayer";
import { FT_PER_UNIT_DEFAULT, SEED_MEASUREMENTS, VIEWBOX } from "@/lib/takeoff/planFixture";

/**
 * Non-interactive stand-in shown before the island hydrates.
 *
 * It renders the real plan and the real seeded measurements rather than a grey
 * box, so the section looks finished with zero JS and hydration is a seamless
 * swap. The aspect-ratio wrapper reserves the exact height, so CLS is zero.
 */
export default function TakeoffSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.10)]">
      <div className="flex flex-wrap items-center gap-2 border-b border-black/10 px-3 py-3 sm:px-4">
        {["Scale", "Linear", "Area", "Count"].map((label, i) => (
          <span
            key={label}
            className={`inline-flex h-10 min-w-[76px] items-center justify-center rounded-full px-4 text-sm font-semibold ${
              i === 2 ? "bg-brand text-white" : "border border-black/10 text-ink"
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px]">
        <div
          className="relative w-full"
          style={{ aspectRatio: `${VIEWBOX.w} / ${VIEWBOX.h}` }}
        >
          <svg
            viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`}
            className="h-full w-full"
            style={{ fontFamily: "inherit" }}
            aria-label="Sample floor plan with example takeoff measurements"
            role="img"
          >
            <PlanBackdrop />
            <MeasurementLayer
              measurements={SEED_MEASUREMENTS}
              ftPerUnit={FT_PER_UNIT_DEFAULT}
            />
          </svg>
        </div>

        <aside className="border-t border-black/10 p-4 lg:border-t-0 lg:border-l">
          <p className="text-xs font-bold tracking-[0.14em] text-ink/50 uppercase">
            Measurements
          </p>
          <ul className="mt-3 space-y-3">
            {SEED_MEASUREMENTS.map((m) => (
              <li key={m.id} className="flex items-center gap-2.5">
                <span
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: m.color }}
                />
                <span className="text-sm font-semibold text-ink">{m.name}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
