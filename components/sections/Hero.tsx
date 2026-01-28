import Reveal from "@/components/animations/Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_55%)]" />
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Takeoff plans like <br className="hidden md:block" /> never before
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-black/70">
            Measure, estimate, and plan faster with a streamlined, accurate workflow anywhere you work.
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <a className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90" href="#download">
              Download now
            </a>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {[
            "10% faster takeoffs",
            "No more manual measurements",
            "Accurate cost estimates in minutes",
          ].map((t) => (
            <div key={t} className="rounded-2xl border border-black/10 bg-white p-4 text-center text-sm font-medium shadow-sm">
              {t}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="aspect-[16/7] w-full rounded-xl bg-black/5" />
          <p className="mt-3 text-center text-sm text-black/60">Replace this placeholder with your UI screenshot image.</p>
        </div>
      </div>
    </section>
  );
}
