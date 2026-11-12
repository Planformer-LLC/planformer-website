import Image from "next/image";
import { BrickWall, Calculator, CircleDot, Pentagon, Spline } from "lucide-react";

type Tool = "area" | "linear" | "count" | "calc";

const toolIcon = { area: Pentagon, linear: Spline, count: CircleDot, calc: Calculator } as const;
const toolName = { area: "Area", linear: "Linear", count: "Count", calc: "Calculator" } as const;

/**
 * What each trade actually measures, tagged with the tool that does it.
 * Keep this to what the app can do today: no roof pitch, no lumber counts.
 */
const trades: { title: string; photo: string | null; items: [Tool, string][] }[] = [
  {
    title: "General contracting",
    photo: "/assets/images/home/supportedtrade.webp",
    items: [
      ["area", "Floor areas"],
      ["linear", "Wall runs"],
      ["count", "Doors and windows"],
    ],
  },
  {
    title: "Concrete and asphalt",
    photo: "/assets/images/home/concrete.webp",
    items: [
      ["area", "Slabs, driveways, paving"],
      ["linear", "Footings and curbs"],
      ["calc", "Volume in cubic yards"],
    ],
  },
  {
    title: "Drywall and painting",
    photo: null,
    items: [
      ["linear", "Wall length times height"],
      ["area", "Ceilings"],
      ["count", "Doors and windows"],
    ],
  },
  {
    title: "Electrical",
    photo: "/assets/images/home/electrical.webp",
    items: [
      ["linear", "Conduit and wire runs"],
      ["count", "Outlets, switches, fixtures"],
    ],
  },
  {
    title: "Flooring",
    photo: "/assets/images/home/floring.webp",
    items: [
      ["area", "Every room, by finish"],
      ["linear", "Base and transitions"],
    ],
  },
  {
    title: "Framing",
    photo: "/assets/images/home/framing.webp",
    items: [
      ["linear", "Wall plates"],
      ["count", "Headers and openings"],
      ["area", "Sheathing"],
    ],
  },
];

/** Server component: every trade visible at once, no tabs and no client JS. */
export default function SupportedTrades() {
  return (
    <section aria-labelledby="trades-title" className="border-t border-[#E3ECF8] bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex max-w-[620px] flex-col gap-4">
          <h2
            id="trades-title"
            className="text-[32px] leading-[1.06] font-extrabold tracking-[-0.03em] text-ink md:text-[46px]"
          >
            Built for the way your trade measures.
          </h2>
          <p className="text-base leading-relaxed text-[#4A5260] md:text-lg">
            Area, Linear and Count cover almost every takeoff. Here&apos;s what
            that looks like for your trade.
          </p>
        </div>

        <ul className="mt-10 divide-y divide-[#EEF1F5] border-y border-[#EEF1F5] md:mt-12">
          {trades.map((t) => (
            <li
              key={t.title}
              className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 py-4 md:grid-cols-[120px_240px_minmax(0,1fr)] md:gap-x-6 md:py-5"
            >
              {t.photo ? (
                <Image
                  src={t.photo}
                  alt=""
                  width={240}
                  height={140}
                  sizes="120px"
                  className="h-[54px] w-[72px] rounded-lg object-cover md:h-[72px] md:w-[120px]"
                />
              ) : (
                <span className="flex h-[54px] w-[72px] items-center justify-center rounded-lg bg-[#EAF3FF] text-brand md:h-[72px] md:w-[120px]">
                  <BrickWall className="h-7 w-7" aria-hidden="true" />
                </span>
              )}
              <h3 className="text-lg font-extrabold text-ink md:text-xl">{t.title}</h3>
              <ul className="col-span-2 flex flex-wrap gap-2 md:col-span-1">
                {t.items.map(([tool, label]) => {
                  const Icon = toolIcon[tool];
                  return (
                    <li
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE8F7] bg-[#F2F7FF] px-3 py-1.5 text-sm text-ink"
                    >
                      <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
                      <span className="sr-only">{toolName[tool]}:</span>
                      {label}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[15px] text-[#4A5260]">
          Plumbing, HVAC and landscaping work the same way. If you can see it on
          the plan, you can measure it.
        </p>
      </div>
    </section>
  );
}
