import { Calculator, Library, Share2 } from "lucide-react";

/**
 * Three features the rest of the page doesn't already cover. Kept to what the
 * app does today (saved items, the concrete/asphalt volume calculator,
 * sharing the marked-up takeoff).
 */
const features = [
  {
    title: "Saved items library",
    desc: "Set up your materials and labor once, with your own costs. Drop them into any project instead of typing them in again.",
    Icon: Library,
  },
  {
    title: "Volume calculator",
    desc: "Measure it, add the depth and width, and get the cubic yards or tons of concrete or asphalt you need.",
    Icon: Calculator,
  },
  {
    title: "Share the takeoff",
    desc: "Send the marked-up plans to your client or crew, so everyone sees exactly what was measured.",
    Icon: Share2,
  },
];

export default function WhyLoveIt() {
  return (
    <section
      aria-labelledby="why-title"
      className="border-t border-[#E3ECF8] bg-[#F6F9FE] py-12 md:py-16"
      style={{
        backgroundImage:
          "linear-gradient(#E3ECF8 1px, transparent 1px), linear-gradient(90deg, #E3ECF8 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <h2
          id="why-title"
          className="max-w-[620px] text-[32px] leading-[1.06] font-extrabold tracking-[-0.03em] text-ink md:text-[46px]"
        >
          The tools you&apos;ll use on every job.
        </h2>

        <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {features.map(({ title, desc, Icon }) => (
            <li key={title} className="border-t-2 border-brand pt-5">
              <Icon className="h-7 w-7 text-brand" aria-hidden="true" />
              <h3 className="mt-3 text-xl font-extrabold text-ink">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#4A5260]">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
