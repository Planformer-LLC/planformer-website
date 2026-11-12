import TakeoffDemoLoader from "@/components/takeoff/TakeoffDemoLoader";

/** Server component — the heading and copy cost zero JS and are indexable. */
export default function TryItHere() {
  return (
    <section
      id="try-it"
      aria-labelledby="try-it-heading"
      // The header is fixed; keep the section clear of it on #try-it jumps.
      className="relative scroll-mt-20 border-t border-[#E3ECF8] bg-[#F6F9FE] py-20 md:py-28"
      style={{
        backgroundImage:
          "linear-gradient(#E3ECF8 1px, transparent 1px), linear-gradient(90deg, #E3ECF8 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex max-w-[640px] flex-col gap-3">
          <h2
            id="try-it-heading"
            className="text-[32px] leading-[1.06] font-extrabold tracking-[-0.03em] text-ink md:text-[46px]"
          >
            Take off this plan yourself.
          </h2>
          <p className="text-base leading-relaxed text-[#4A5260] md:text-lg">
            The real Planformer tools on a sample house. No sign-up, nothing to
            install.
          </p>
        </div>

        <div className="mt-8 md:mt-10">
          <TakeoffDemoLoader />
        </div>
      </div>
    </section>
  );
}
