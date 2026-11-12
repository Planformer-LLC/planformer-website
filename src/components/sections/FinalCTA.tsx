import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteData } from "@/data/siteData";

/** A corner of a plan with one measured room, drawn in white on the blueprint. */
function PlanCorner() {
  return (
    <svg
      viewBox="0 0 420 340"
      className="pointer-events-none absolute right-0 bottom-0 h-[78%] w-auto opacity-90 md:h-full"
      aria-hidden="true"
    >
      <g fill="none" stroke="#FFFFFF">
        {/* Dimension string over the measured room: 12 ft = 200 units */}
        <g strokeOpacity={0.6} strokeWidth={1.5}>
          <line x1={60} y1={34} x2={420} y2={34} />
          <line x1={60} y1={24} x2={60} y2={44} />
          <line x1={260} y1={24} x2={260} y2={44} />
        </g>
        {/* Walls */}
        <path d="M60 340 V60 H420" strokeOpacity={0.55} strokeWidth={10} />
        <path d="M60 260 H180 M230 260 H260 V60" strokeOpacity={0.45} strokeWidth={5} />
        <path d="M260 260 V340" strokeOpacity={0.45} strokeWidth={5} />
        {/* Door into the room below, swinging away from the measured area */}
        <line x1={230} y1={260} x2={230} y2={310} strokeOpacity={0.6} strokeWidth={3} />
        <path d="M180 260 A 50 50 0 0 0 230 310" strokeOpacity={0.45} strokeWidth={1.5} />
        {/* The measured room, 12 ft x 12 ft */}
        <rect
          x={66}
          y={66}
          width={188}
          height={188}
          fill="#FFFFFF"
          fillOpacity={0.12}
          strokeOpacity={0.75}
          strokeWidth={2}
          strokeDasharray="8 6"
        />
      </g>
      <g fill="#FFFFFF" textAnchor="middle" fontFamily="inherit">
        <text x={160} y={22} fontSize={14} fillOpacity={0.85}>
          12&#8242; 0&#8243;
        </text>
        <text x={160} y={166} fontSize={16} fontWeight={700}>
          144.00 sq ft
        </text>
      </g>
    </svg>
  );
}

export default function FinalCTA() {
  return (
    <section
      aria-labelledby="cta-title"
      className="bg-[#F6F9FE] px-4 pt-4 pb-20 sm:px-6 md:pb-24"
      style={{
        backgroundImage:
          "linear-gradient(#E3ECF8 1px, transparent 1px), linear-gradient(90deg, #E3ECF8 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div
        className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl bg-[#0062CC] text-white"
        // Blueprint: white grid on the brand blue.
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <PlanCorner />
        <div className="relative flex max-w-[560px] flex-col gap-[18px] px-6 pt-10 pb-44 sm:pb-52 md:py-16 md:pl-14">
          <h2
            id="cta-title"
            className="text-[32px] leading-[1.06] font-extrabold tracking-[-0.03em] md:text-[46px]"
          >
            Take your next takeoff anywhere.
          </h2>
          <p className="text-base leading-relaxed text-[#E1EEFF] md:text-lg">
            Start a free trial on the web, then pick it up on any device.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={siteData.signupHref}
              className="inline-flex h-[58px] items-center justify-center gap-2 rounded-xl bg-white px-[30px] text-lg font-extrabold text-[#0062CC] transition hover:bg-[#EAF3FF] active:scale-[0.98]"
            >
              Start free trial
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <Link
              href="/download"
              className="py-3 text-center text-[15px] font-semibold text-white underline underline-offset-4 hover:text-[#E1EEFF]"
            >
              or download the app
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
