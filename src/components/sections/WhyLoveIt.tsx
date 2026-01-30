import Reveal from "@/components/animations/Reveal";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

const items = [
  {
    title: "Speed",
    desc: "Cut takeoff time by up to 90 percent.",
    icon: "/assets/icons/whyloveit-icons/zap, lightning, flash.svg",
  },
  {
    title: "Precision",
    desc: "Reduce manual errors and repeat work.",
    icon: "/assets/icons/whyloveit-icons/shield, security, protection.svg",
  },
  {
    title: "Multiplatform",
    desc: "Use the takeoff tools across office and field.",
    icon: "/assets/icons/whyloveit-icons/connect devices, macbook, iphone, phone.svg",
  },
  {
    title: "Accessibility",
    desc: "Easy to use even on the first try.",
    icon: "/assets/icons/whyloveit-icons/magic stick star.svg",
  },
];

export default function WhyLoveIt() {
  return (
    <section className="bg-white pt-16 pb-0 md:py-16">
      {/* ✅ reduce side padding on md+ to reduce left whitespace */}
      <div className="w-full md:mx-auto md:max-w-7xl md:px-4 lg:px-0">
        {/* ✅ slightly smaller gap so it feels tighter */}
        <div className="grid w-full gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,680px)_minmax(0,1fr)] md:items-start md:gap-10">
          {/* LEFT IMAGE */}
          <Reveal>
            <div
              className="
                overflow-hidden bg-white shadow-sm
                rounded-2xl
                md:w-full md:max-w-[720px]
                md:aspect-[720/740]
              "
            >
              <Image
                src="/assets/images/home/whyloveit.svg"
                alt="Why contractors love Planformer"
                width={680}
                height={810}
                priority
                className="h-full w-full object-cover object-top"
              />
            </div>
          </Reveal>

         <div className="w-full px-4 md:pl-6 md:pr-4 md:pt-0">

            <Reveal>
              <h2 className="text-2xl font-black text-[#1A1A1A] md:text-3xl">
                Why Contractors and <span className="hidden md:inline"><br /></span>
                Estimators Love It
              </h2>
            </Reveal>

            <div className="mt-7 space-y-4">
              {items.map((i, idx) => (
                <Reveal key={i.title} delay={idx * 0.06}>
                  {/* ✅ wider: allow full width on md+; cap only on very large screens */}
                  <div className="w-full rounded-2xl bg-[#F5F5F5] lg:max-w-[620px]">
                    <div className="px-[16px] py-[16px]">
                      <Image
                        src={i.icon}
                        alt=""
                        width={22}
                        height={22}
                        className="h-[22px] w-[22px]"
                      />

                      <p className="mt-[10px] font-extrabold text-[#1A1A1A]">
                        {i.title}
                      </p>

                      <p className="mt-[10px] text-sm text-[#1A1A1A]/70 leading-snug">
                        {i.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <Link
                href="/download"
                className="btn-primary mt-7 inline-flex h-[50px] w-full items-center justify-center gap-2 px-6 md:h-[46px] md:w-auto"
              >
                <Download size={18} />
                Download now
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
