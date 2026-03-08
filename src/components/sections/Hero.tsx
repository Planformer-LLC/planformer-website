"use client";

import TypewriterText from "@/components/animations/TypewriterText";
import Reveal from "@/components/animations/Reveal";
import StaggerContainer from "@/components/animations/StaggerContainer";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

const pills = [
  { icon: "/assets/icons/hero/zap, lightning, flash.svg", label: "100% faster takeoffs" },
  { icon: "/assets/icons/hero/ruler.svg", label: "No more manual measurements" },
  { icon: "/assets/icons/hero/clock alert, timer.svg", label: "Accurate cost estimates in seconds" },
];

function Pill({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#1A1A1A] shadow-sm transition-all duration-300 hover:shadow-md hover:border-black/20 hover:-translate-y-0.5 cursor-default">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-110">
        <Image src={icon} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}

export default function Hero() {
  return (
    // ✅ No bottom spacing + hero fills the screen nicely
    <section className="relative bg-[#F5F5F5] pt-24 pb-0 md:pt-27 md:pb-0 md:min-h-screen">

      {/* background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/bg/bg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      {/* ✅ Center the whole hero content vertically (desktop/tablet) */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-3 md:px-2 lg:px-10 md:flex md:min-h-[85vh] md:items-center">
        {/* ✅ Desktop/Tablet layout */}
        <div className="hidden w-full md:grid grid-cols-12 items-center gap-10 lg:gap-14">
          {/* Left content */}
          <div className="col-span-6 lg:col-span-5">
            {/* Heading — word-by-word typewriter reveal */}
            <h1 className="text-[46px] leading-[1.02] font-extrabold tracking-tight text-[#1A1A1A] lg:text-[60px] text-left">
              <TypewriterText text="Takeoff plans like never before" delay={0.1} stagger={0.07} />
            </h1>

            <Reveal from="bottom" delay={0.55} duration={0.45}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#1A1A1A]/80">
                Measure, estimate, and plan faster with a streamlined, accurate workflow anywhere you work.
              </p>
            </Reveal>

            <Reveal from="bottom" delay={0.65} duration={0.6} scale={0.96}>
              <div className="mt-7 flex justify-start">
                <Link
                  href="/download"
                  className="btn-primary inline-flex h-12 items-center gap-2 px-6 text-sm leading-none"
                >
                  <Download size={18} />
                  Download now
                </Link>
              </div>
            </Reveal>

            {/* Pills — staggered bottom-up */}
            <div className="mt-8 max-w-[420px]">
              <StaggerContainer delay={0.8} stagger={0.1}>
                <div className="grid grid-cols-2 gap-3">
                  <Reveal from="bottom">
                    <Pill icon={pills[0].icon} label={pills[0].label} />
                  </Reveal>
                  <Reveal from="bottom">
                    <Pill icon={pills[1].icon} label={pills[1].label} />
                  </Reveal>
                </div>
                <div className="mt-3">
                  <Reveal from="bottom">
                    <div className="inline-flex">
                      <Pill icon={pills[2].icon} label={pills[2].label} />
                    </div>
                  </Reveal>
                </div>
              </StaggerContainer>
            </div>
          </div>

          {/* Right image — pops in from the right */}
          <div className="col-span-6 lg:col-span-7">
            <Reveal from="right" delay={0.2} duration={0.75}>
              <div className="relative">
                <div
                  className="
                    ml-auto mt-0 w-full
                    md:max-w-[520px] md:mr-0
                    lg:w-[820px] lg:max-w-none lg:-mr-20
                    xl:w-[1000px] xl:-mr-100
                  "
                >
                  <Image
                    src="/assets/images/home/hero.webp"
                    alt="Planformer hero mockup"
                    width={1600}
                    height={900}
                    className="h-auto w-full"
                    priority
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ✅ Mobile layout (keep same design, but remove bottom spacing) */}
        <div className="md:hidden">
          {/* Heading */}
          <h1 className="mx-auto max-w-3xl text-[34px] leading-tight font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl text-center">
            <TypewriterText text="Takeoff plans like never before" delay={0.1} stagger={0.06} />
          </h1>

          <Reveal from="bottom" delay={0.55}>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-[#1A1A1A] sm:text-base text-center">
              Measure, estimate, and plan faster with a streamlined, accurate workflow anywhere you work.
            </p>
          </Reveal>

          <Reveal from="bottom" delay={0.7} scale={0.96}>
            <div className="mt-7 flex justify-center">
              <Link
                href="/download"
                className="btn-primary inline-flex items-center gap-2 px-6 py-[18px] text-base"
              >
                <Download size={18} />
                Download on App store
              </Link>
            </div>
          </Reveal>

          {/* pills */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {pills.map((p, i) => (
              <Reveal key={p.label} from="bottom" delay={0.75 + i * 0.08}>
                <div className="flex w-full max-w-[320px] items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-center text-xs text-[#1A1A1A] shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 sm:w-auto sm:max-w-none sm:py-2 sm:text-xs">
                  <Image src={p.icon} alt="" width={16} height={16} className="h-4 w-4" />
                  {p.label}
                </div>
              </Reveal>
            ))}
          </div>

          {/* ✅ Mobile image at bottom (no extra bottom space) */}
          <Reveal from="bottom" delay={0.3} duration={0.65}>
            <div className="mt-6 flex justify-center pb-0">
              <div className="w-full max-w-[560px] px-2 sm:max-w-[680px]">
                <Image
                  src="/assets/images/home/hero.webp"
                  alt="Planformer hero mockup"
                  width={1200}
                  height={640}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
