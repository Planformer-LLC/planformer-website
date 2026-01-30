import Reveal from "@/components/animations/Reveal";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

const pills = [
  { icon: "/assets/icons/hero/zap, lightning, flash.svg", label: "10% faster takeoffs" },
  { icon: "/assets/icons/hero/ruler.svg", label: "No more manual measurements" },
  { icon: "/assets/icons/hero/clock alert, timer.svg", label: "Accurate cost estimates in minutes" },
];

export default function Hero() {
  return (
    <section className="relative bg-[#F5F5F5] pt-40 pb-48 md:pt-48 md:pb-120">

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

      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="text-center">
          <h1 className="mx-auto max-w-3xl text-[34px] leading-tight font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl md:text-6xl">
            Takeoff plans like <br className="hidden md:block" /> never before
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#1A1A1A] sm:text-base">
            Measure, estimate, and plan faster with a streamlined, accurate workflow anywhere you work.
          </p>

          {/* ✅ bigger on mobile, normal on desktop */}
          <div className="mt-7 flex justify-center">
            <Link
              href="/download"
              className="btn-primary inline-flex items-center gap-2 px-6 py-4 text-base md:px-5 md:py-3 md:text-sm"
            >
              <Download size={18} />
              Download now
            </Link>
          </div>
        </Reveal>

        {/* pills */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          {pills.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.07}>
              <div className="flex w-full max-w-[320px] items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-center text-xs text-[#1A1A1A] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:w-auto sm:max-w-none sm:py-2 sm:text-xs md:text-sm"
>
                <Image src={p.icon} alt="" width={16} height={16} className="h-4 w-4" />
                {p.label}
              </div>
            </Reveal>
          ))}
        </div>

        {/* IMAGE overflow */}
        <div className="pointer-events-none absolute left-1/2 top-full z-10 w-full -translate-x-1/2 -translate-y-40 md:-translate-y-108">

          <div className="mx-auto max-w-6xl px-4">
            <Image
              src="/assets/images/home/hero.svg"
              alt="Planformer hero mockup"
              width={1200}
              height={640}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
