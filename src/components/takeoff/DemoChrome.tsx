import Image from "next/image";
import { Check, CircleDot, FileText, Pentagon, Ruler, Spline, Upload } from "lucide-react";
import type { ReactNode } from "react";
import type { MeasurementKind } from "@/lib/takeoff/types";
import { siteData } from "@/data/siteData";

/**
 * Presentational pieces shared by the static skeleton (server) and the
 * interactive demo (client), so the swap on hydration is seamless. No hooks.
 */

export type StepStatus = "done" | "now" | "next";

export function GuideSteps({ steps }: { steps: { label: string; status: StepStatus }[] }) {
  return (
    <ol className="flex flex-wrap gap-2" aria-label="Try it in three steps">
      {steps.map((s, i) => (
        <li
          key={s.label}
          aria-current={s.status === "now" ? "step" : undefined}
          className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-colors ${
            s.status === "done"
              ? "border-[#BFE5CB] bg-[#EFFAF2] text-[#1B7F3A]"
              : s.status === "now"
                ? "border-brand bg-brand text-white"
                : "border-[#D7E2F1] bg-white text-[#5F6670]"
          }`}
        >
          {s.status === "done" ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <span aria-hidden="true">{i + 1}</span>
          )}
          {s.label}
          {s.status === "done" ? <span className="sr-only">(done)</span> : null}
        </li>
      ))}
    </ol>
  );
}

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
      <a
        href={siteData.signupHref}
        title="Start a free trial to share your own takeoffs"
        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-brand px-3.5 text-sm font-semibold text-white transition hover:bg-brand-hover"
      >
        <Upload className="h-4 w-4" aria-hidden="true" />
        Share
      </a>
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
