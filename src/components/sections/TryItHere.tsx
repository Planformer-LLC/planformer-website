import Reveal from "@/components/animations/Reveal";
import TakeoffDemoLoader from "@/components/takeoff/TakeoffDemoLoader";

/** Server component — the heading and copy cost zero JS and are indexable. */
export default function TryItHere() {
  return (
    <section
      id="try-it"
      aria-labelledby="try-it-heading"
      className="relative overflow-hidden bg-surface-dark py-20 text-white md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal>
          <div className="flex max-w-[640px] flex-col gap-3">
            <p className="text-[13px] font-bold tracking-[0.12em] text-[#7DBBFF] uppercase">
              Try it right here
            </p>
            <h2
              id="try-it-heading"
              className="text-[28px] leading-[1.12] font-extrabold tracking-[-0.03em] text-white md:text-[42px]"
            >
              Take off this plan yourself.
            </h2>
            <p className="text-base leading-relaxed text-[#C9CED6] md:text-[17px]">
              A real takeoff on a sample floor plan. Pick a tool, click the
              plan, and watch the quantities and cost add up. No sign-up.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 md:mt-10">
          <TakeoffDemoLoader />
        </div>

        <p className="mt-4 text-center text-xs text-white/60">
          Demo only — the real app scales any PDF, saves your assemblies and
          exports to Excel.
        </p>
      </div>
    </section>
  );
}
