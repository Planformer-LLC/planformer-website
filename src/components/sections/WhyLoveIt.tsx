import Image from "next/image";
import { MonitorSmartphone, Smile, Target, Zap } from "lucide-react";
import Reveal from "@/components/animations/Reveal";

const items = [
  { title: "Speed", desc: "Cut takeoff time by up to 90 percent.", Icon: Zap },
  { title: "Precision", desc: "Fewer manual errors and less repeat work.", Icon: Target },
  {
    title: "Multiplatform",
    desc: "The same takeoff in the office and in the field.",
    Icon: MonitorSmartphone,
  },
  { title: "Easy to use", desc: "Easy to pick up, even on the first try.", Icon: Smile },
];

export default function WhyLoveIt() {
  return (
    <section aria-labelledby="why-title" className="bg-white py-20 md:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <Reveal from="left" duration={0.7} className="min-w-0">
          <Image
            src="/assets/images/home/whyloveit.webp"
            alt="Three contractors in hard hats reviewing a floor plan together"
            width={796}
            height={804}
            sizes="(max-width: 1024px) 100vw, 520px"
            className="mx-auto aspect-[796/804] h-auto w-full max-w-[520px] rounded-[18px] object-cover lg:mx-0"
          />
        </Reveal>

        <div className="flex min-w-0 flex-col gap-7">
          <Reveal from="right">
            <div className="flex flex-col gap-3">
              <p className="text-[13px] font-bold tracking-[0.12em] text-[#0062CC] uppercase">
                Why Planformer
              </p>
              <h2
                id="why-title"
                className="text-[28px] leading-[1.12] font-extrabold tracking-[-0.03em] text-ink md:text-[42px]"
              >
                Why contractors and estimators love it.
              </h2>
            </div>
          </Reveal>

          <ul className="grid gap-6 sm:grid-cols-2">
            {items.map(({ title, desc, Icon }, i) => (
              <li key={title}>
                <Reveal from="right" delay={i * 0.06}>
                  <div className="flex flex-col gap-2">
                    <Icon className="h-7 w-7 text-brand" strokeWidth={2} aria-hidden="true" />
                    <h3 className="text-lg font-bold text-ink">{title}</h3>
                    <p className="text-[15px] leading-relaxed text-[#4A5260]">{desc}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
