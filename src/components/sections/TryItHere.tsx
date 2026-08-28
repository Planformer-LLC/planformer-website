import Reveal from "@/components/animations/Reveal";
import TakeoffDemoLoader from "@/components/takeoff/TakeoffDemoLoader";

/** Server component — the heading and copy cost zero JS and are indexable. */
export default function TryItHere() {
  return (
    <section
      id="try-it"
      aria-labelledby="try-it-heading"
      className="relative overflow-hidden bg-white pt-24 pb-8 md:pt-32 md:pb-10"
      style={{
        backgroundImage: "url('/assets/bg/bg3.svg')",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        backgroundSize: "auto",
      }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold tracking-[0.18em] text-brand uppercase">
              Try it right here
            </p>
            <h2
              id="try-it-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-4xl"
            >
              Take off this plan yourself.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-ink/70 md:text-base">
              A real takeoff on a sample floor plan — pick a tool, click the
              plan, and watch the quantities and cost add up. No sign-up.
            </p>
          </div>
        </Reveal>

        <div className="mt-10">
          <TakeoffDemoLoader />
        </div>

        <p className="mt-4 text-center text-xs text-ink/45">
          Demo only — the real app scales any PDF, saves your assemblies and
          exports to Excel.
        </p>
      </div>
    </section>
  );
}
