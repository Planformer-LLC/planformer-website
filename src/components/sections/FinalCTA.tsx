import Reveal from "@/components/animations/Reveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { siteData } from "@/data/siteData";

export default function FinalCTA() {
  return (
    <section className="relative bg-[#1A1F28] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/bg/bg2.svg')] bg-cover bg-center opacity-40" />

      {/* ✅ desktop: a bit taller so you get center text + bottom images nicely */}
      <div className="relative mx-auto max-w-6xl px-4 pt-40 pb-0 md:pt-2 md:pb-0 min-h-[840px] md:min-h-[520px]">
        {/* ✅ desktop: h-full so we can push images to bottom */}
        <div className="flex h-full flex-col md:flex-row md:justify-between">
          {/* ✅ desktop: center the text vertically */}
          <div className="mx-auto max-w-md text-center md:mx-0 md:text-left md:self-center relative z-30">
            <Reveal from="left" delay={0.1}>
              <h2 className="text-3xl font-extrabold md:text-4xl">
                Ready to take off
                <br className="md:hidden" /> faster?
              </h2>
            </Reveal>

            <Reveal from="left" delay={0.25}>
              <p className="mt-3 text-white/80">
                Start your free trial and complete your first takeoff in minutes.
              </p>
            </Reveal>

            <Reveal from="bottom" delay={0.4} scale={0.96}>
              <div className="mt-8 flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-5">
                <a
                  href={siteData.signupHref}
                  className="btn-primary inline-flex h-[54px] w-full items-center justify-center gap-2 px-7 text-base font-bold md:w-auto shadow-[0_8px_30px_rgb(15,131,255,0.4)]"
                >
                  <span>Start free trial</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/download"
                  className="inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-white/85 underline underline-offset-4 hover:text-white"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  or download the app
                </Link>
              </div>
            </Reveal>
          </div>

          {/* ✅ desktop: push the whole image group to the bottom */}
          <div className="relative mt-0 flex-1 md:flex md:items-end md:justify-end">
            {/* ✅ desktop: give a height so absolute bottom works */}
            <div className="relative h-[540px] w-full md:h-[520px]">
              {/* ✅ White UI image: pops in from right */}
              <Reveal
                from="right"
                delay={0.3}
                duration={0.8}
                className="absolute bottom-0 -right-40 z-10 md:bottom-0 md:left-[170px]"
              >
                <Image
                  src="/assets/images/home/finalcta2.webp"
                  alt="The Planformer takeoff editor showing measured areas on a site plan"
                  width={640}
                  height={400}
                  className="
                    h-auto w-[126%] max-w-[620px]
                    md:w-[620px] md:max-w-none
                    drop-shadow-2xl
                  "
                />
              </Reveal>

              {/* ✅ Man image: pops in from bottom */}
              <Reveal
                from="bottom"
                delay={0.5}
                duration={0.7}
                className="absolute bottom-0 left-[34%] -translate-x-1/2 z-20 md:left-auto md:right-[240px] md:translate-x-0"
              >
                <Image
                  src="/assets/images/home/finalcta.webp"
                  alt="A contractor giving a thumbs-up next to the Planformer app"
                  width={1200}
                  height={700}
                  className="
                    h-auto w-[80%] max-w-[470px]
                    md:w-[520px] md:max-w-none
                    drop-shadow-2xl
                  "
                />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
