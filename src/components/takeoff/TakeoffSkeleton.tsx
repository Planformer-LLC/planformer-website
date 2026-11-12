import { RotateCcw, Undo2 } from "lucide-react";
import PlanBackdrop from "./PlanBackdrop";
import { GuideSteps, KindIcon, ScaleSlot, TOOL_LABELS, WindowBar } from "./DemoChrome";
import { TARGET_ROOM, VIEWBOX } from "@/lib/takeoff/planFixture";

/**
 * Non-interactive stand-in shown before the island hydrates.
 *
 * Same layout, plan and seeded measurements as the live demo, so the section
 * looks finished with zero JS and hydration is a seamless swap. The
 * aspect-ratio wrapper reserves the exact height, so CLS is zero.
 */
export default function TakeoffSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <GuideSteps
        steps={[
          { label: "Scale is set", status: "done" },
          { label: `Trace the ${TARGET_ROOM.name}`, status: "now" },
          { label: "Try Linear or Count", status: "next" },
        ]}
      />

      <div className="overflow-hidden rounded-2xl border border-[#D7E2F1] bg-white shadow-[0_18px_50px_rgba(15,60,120,0.10)]">
        <WindowBar
          actions={
            <>
              <span className="flex h-9 w-9 items-center justify-center text-ink/25">
                <Undo2 size={18} aria-hidden="true" />
              </span>
              <span className="flex h-9 w-9 items-center justify-center text-ink/55">
                <RotateCcw size={17} aria-hidden="true" />
              </span>
            </>
          }
        />

        <div className="grid lg:grid-cols-[300px_minmax(0,1fr)]">
          <div className="relative lg:order-2">
            <div className="relative w-full" style={{ aspectRatio: `${VIEWBOX.w} / ${VIEWBOX.h}` }}>
              <svg
                viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`}
                className="h-full w-full"
                style={{ fontFamily: "inherit" }}
                aria-label="Sample house plan with example takeoff measurements"
                role="img"
              >
                <PlanBackdrop />
                <rect
                  x={TARGET_ROOM.x0 + 6}
                  y={TARGET_ROOM.y0 + 6}
                  width={TARGET_ROOM.x1 - TARGET_ROOM.x0 - 12}
                  height={TARGET_ROOM.y1 - TARGET_ROOM.y0 - 12}
                  fill="#0F83FF"
                  fillOpacity={0.06}
                  stroke="#0F83FF"
                  strokeWidth={3}
                  strokeDasharray="14 10"
                />
              </svg>

              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-[#E3E6EB] bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.10)]">
                <ScaleSlot />
                {TOOL_LABELS.map((t) => (
                  <span
                    key={t.id}
                    className={`flex min-w-[58px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-semibold ${
                      t.id === "area" ? "bg-[#EAF3FF] text-brand ring-2 ring-brand/40" : "text-ink"
                    }`}
                  >
                    <KindIcon kind={t.id} className="h-5 w-5" />
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="flex flex-col border-t border-[#EEF1F5] lg:order-1 lg:border-t-0 lg:border-r">
            <p className="px-4 pt-4 pb-1 text-[15px] font-semibold text-ink">Measurements</p>
            <p className="px-4 py-3 text-sm text-ink/50">
              Nothing measured yet. Pick a tool below the plan and your
              measurements show up here.
            </p>
            <div className="mt-auto border-t border-[#EEF1F5] px-4 pt-4 pb-4">
              <span className="inline-flex h-11 w-full items-center justify-center rounded-[10px] bg-brand text-sm font-bold text-white">
                Do this on your own plans
              </span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
