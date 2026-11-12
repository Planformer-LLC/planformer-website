import Image from "next/image";
import { Check, CircleDot, FileText, Pentagon, Ruler, Spline } from "lucide-react";
import type { ReactNode } from "react";
import type { MeasurementKind } from "@/lib/takeoff/types";

/**
 * Presentational pieces shared by the static skeleton (server) and the
 * interactive demo (client), so the swap on hydration is seamless. No hooks.
 */

/** The app's top bar, reduced to what reads at a glance. */
export function WindowBar({ actions }: { actions?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#EEF1F5] bg-white px-3 py-2.5 sm:px-4">
      <div className="flex items-center gap-1">
        <Image
          src="/assets/images/home/logo.svg"
          alt="Planformer"
          width={18}
          height={24}
          className="mr-2 h-6 w-[18px]"
        />
        {actions}
      </div>
      <p className="flex min-w-0 items-center gap-2 text-sm font-semibold text-ink">
        <FileText className="hidden h-4 w-4 shrink-0 text-brand sm:block" aria-hidden="true" />
        <span className="truncate">Sample house</span>
        <span className="hidden rounded-full bg-[#FFF3E0] px-2.5 py-0.5 text-xs font-semibold text-[#B85600] sm:inline">
          In progress
        </span>
      </p>
      {/* Keeps the project name centred now that Share is gone. */}
      <span className="w-[78px] shrink-0" aria-hidden="true" />
    </div>
  );
}

export function KindIcon({ kind, className }: { kind: MeasurementKind; className?: string }) {
  const Icon = kind === "area" ? Pentagon : kind === "linear" ? Spline : CircleDot;
  return <Icon className={className} aria-hidden="true" />;
}

/** Scale is preset, so its slot only ever shows the "set" state. */
export function ScaleSlot() {
  return (
    <span
      className="flex min-w-[58px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-semibold text-ink/70"
      title="Scale is already set for this plan"
    >
      <span className="relative">
        <Ruler className="h-5 w-5" aria-hidden="true" />
        <span className="absolute -right-1.5 -bottom-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#22B04B] text-white">
          <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
        </span>
      </span>
      Scale
      <span className="sr-only">(already set)</span>
    </span>
  );
}

export const TOOL_LABELS: { id: MeasurementKind; label: string }[] = [
  { id: "linear", label: "Linear" },
  { id: "area", label: "Area" },
  { id: "count", label: "Count" },
];
