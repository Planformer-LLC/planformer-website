import Reveal from "@/components/animations/Reveal";

const trades = [
  {
    title: "Construction & Contracting",
    desc: "Measure plans, quantify materials and estimate labor across full project scopes, commercial and residential.",
  },
  {
    title: "Roofing",
    desc: "Calculate roof areas, slopes and material needs precisely, cutting waste and speeding up bids.",
  },
  {
    title: "Concrete & Asphalt",
    desc: "Get volumes, square footage and material requirements for foundations, driveways and sitework in minutes.",
  },
  {
    title: "Electrical",
    desc: "Measure wiring lengths, conduit runs and fixture placements from plans, fast and reliably.",
  },
  {
    title: "Flooring",
    desc: "Measure every floor area and work out material and waste for tile, hardwood, carpet and more.",
  },
  {
    title: "Framing & Carpentry",
    desc: "Count lumber, wall layouts, joists and studs instantly to make the most of your material.",
  },
];

/** Server component: every trade visible at once, no tabs and no client JS. */
export default function SupportedTrades() {
  return (
    <section aria-labelledby="trades-title" className="bg-white py-20 md:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 sm:px-6">
        <Reveal>
          <div className="flex max-w-[640px] flex-col gap-3">
            <p className="text-[13px] font-bold tracking-[0.12em] text-[#0062CC] uppercase">
              Supported trades
            </p>
            <h2
              id="trades-title"
              className="text-[28px] leading-[1.12] font-extrabold tracking-[-0.03em] text-ink md:text-[42px]"
            >
              Fast, accurate takeoffs for any trade.
            </h2>
          </div>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trades.map((t, i) => (
            <li key={t.title}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <div className="h-full rounded-[14px] border border-[#E3E6EB] p-6">
                  <h3 className="text-lg font-bold text-ink">{t.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#4A5260]">{t.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
