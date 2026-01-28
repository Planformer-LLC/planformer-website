import Reveal from "@/components/animations/Reveal";

const trades = [
  "Construction & Contracting",
  "Roofing",
  "Concrete & Asphalt",
  "Electrical",
  "Flooring",
  "Framing & Carpentry",
];

export default function SupportedTrades() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Supported Trades</h2>
          <p className="mt-2 text-black/70">Fast, accurate takeoffs for any trade.</p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-[280px,1fr]">
          <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-semibold">Trades</p>
            <div className="space-y-2">
              {trades.map((t) => (
                <button
                  key={t}
                  className="w-full rounded-xl border border-black/10 px-3 py-2 text-left text-sm hover:bg-black/5"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
            <div className="aspect-[16/6] w-full bg-black/10" />
            <div className="p-5">
              <p className="font-semibold">Construction & Contracting</p>
              <p className="mt-1 text-sm text-black/70">
                Measure plans, quantify materials, and estimate labor across full project scopes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
