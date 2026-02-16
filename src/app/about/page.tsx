import SiteLayout from "@/components/layout/SiteLayout";
import Reveal from "@/components/animations/Reveal";
import FinalCTA from "@/components/sections/FinalCTA";
import Image from "next/image";

const values = [
  {
    title: "Speed and Efficiency",
    desc: "Every feature serves one goal: help you complete takeoffs in minutes, not hours.",
    icon: "/assets/icons/aboutwhatwestandfor-icons/zap, lightning, flash.svg", // lightning
  },
  {
    title: "Accuracy You Can Trust",
    desc: "Clear measurements, real-time calculations, and precise results that help you bid confidently.",
    icon: "/assets/icons/aboutwhatwestandfor-icons/magic stick star.svg", // wand (as screenshot)
  },
  {
    title: "Simplicity Without Compromise",
    desc: "A modern, intuitive workflow your team can learn in minutes not in hours.So save your time for what matters.",
    icon: "/assets/icons/aboutwhatwestandfor-icons/star 2, magic sparkle.svg", // sparkle star (as screenshot)
  },
  {
    title: "Built for the Field",
    desc: "Contractors and estimators guided every part of our design. Real problems, real feedback, real solutions.",
    icon: "/assets/icons/aboutwhatwestandfor-icons/shield, security, protection.svg", // shield (as screenshot)
  },
];

export default function AboutPage() {
  return (
    <SiteLayout>
      {/* ✅ Background: show bg3.svg + more top/bottom spacing */}
     <section
  className="relative overflow-hidden bg-white pt-48 pb-26 md:pt-48 md:pb-24"
  style={{
    backgroundImage: "url('/assets/bg/bg3.svg')",
    backgroundRepeat: "repeat",       // pattern like screenshot
    backgroundPosition: "center",
    backgroundSize: "auto",
  }}
>
  <div className="mx-auto max-w-4xl px-4 text-center">
    <Reveal>
      <h1 className="text-[34px] font-extrabold text-[#1A1A1A] md:text-[36px]">
        About Us
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-[18px] leading-relaxed text-[#1A1A1A]">
        We built this platform to make takeoffs faster, easier, and more accurate for the people who actually do the work -
        contractors, estimators, and construction professionals who do not have time to fight complicated tools.
      </p>

      <p className="mx-auto mt-5 max-w-2xl text-[18px] leading-relaxed text-[#1A1A1A]">
        Takeoffs should not take hours. They should not require guesswork. And they definitely should not slow your bidding process
        down. So we set out to create a simple, powerful solution that helps you measure, estimate, and plan with confidence.
      </p>
    </Reveal>
  </div>
</section>


      <section className="py-6">
  <Reveal>
    <div className="-mx-40 md:mx-0">

      <Image
        src="/assets/images/about/aboutfull.webp"
        alt="Planformer overview"
        width={1440}
        height={560}
        className="h-auto w-full"
        priority
      />
    </div>
  </Reveal>
</section>


      {/* ✅ Boxes centered, equal left/right spacing, 32px gap */}
      <section className="pt-10 pb-0">

        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-center gap-4 md:flex-row md:gap-8">

            <Reveal>
             <div className="w-full max-w-[520px] rounded-2xl bg-black/5 p-5 md:h-[220px] md:p-7 card-hover">
  <p className="text-sm font-extrabold text-[#767676] md:text-base">Our Mission</p>
  <p className="mt-3 text-[15px] leading-relaxed text-[#1A1A1A] md:mt-4 md:text-[17px]">
                  To give builders and estimators a smarter, faster way to turn drawings into accurate quantities and cost estimates,
                  anytime and from any device.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
             <div className="w-full max-w-[520px] rounded-2xl bg-black/5 p-5 md:h-[220px] md:p-7 card-hover">

                <p className="text-base font-extrabold text-[#767676]">Our Commitment</p>
                <p className="mt-4 text-[17px] leading-relaxed text-[#1A1A1A]">
                  We are constantly improving, expanding features, and adding support for more trades to help you deliver better bids and
                  better projects. Your success is our blueprint.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    
<section className="bg-white py-16">
  <div className="w-full md:mx-auto md:max-w-7xl md:px-4 lg:px-0">
    <div className="grid w-full gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,680px)_minmax(0,1fr)] md:items-start md:gap-10">
      
      {/* LEFT IMAGE */}
      <Reveal>
        <div className="-mx-40 md:mx-0 md:pt-0 lg:pl-6">
          <div
            className="
              relative overflow-hidden shadow-sm
              rounded-none
              h-[360px]
              md:rounded-2xl
              md:w-full md:max-w-[720px]
             md:h-[710px] md:w-full md:max-w-[720px]

            "
          >
            <Image
              src="/assets/images/about/aboutwhatwestandfors.webp"
              alt="What we stand for"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
        </div>
      </Reveal>

      {/* RIGHT CONTENT */}
      <div className="w-full px-4 md:pl-6 md:pr-4 md:pt-4">
        <Reveal>
          <h2 className="text-2xl font-black text-[#1A1A1A] md:text-3xl">
            What We Stand For
          </h2>
        </Reveal>

        <div className="mt-7 space-y-4">
          {values.map((v, idx) => (
            <Reveal key={v.title} delay={idx * 0.06}>
              <div className="w-full rounded-2xl bg-[#F5F5F5] lg:max-w-[620px]">
                <div className="px-[16px] py-[16px]">
                  <Image
                    src={v.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px]"
                  />
                  <p className="mt-[10px] font-extrabold text-[#1A1A1A]">
                    {v.title}
                  </p>
                  <p className="mt-[10px] text-sm text-[#1A1A1A]/70 leading-snug">
                    {v.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>


      <FinalCTA />
    </SiteLayout>
  );
}
