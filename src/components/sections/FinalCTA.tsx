import Reveal from "@/components/animations/Reveal";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative bg-[#1A1F28] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/bg/BG2.svg')] bg-cover bg-center opacity-40" />

      {/* ✅ desktop: a bit taller so you get center text + bottom images nicely */}
      <div className="relative mx-auto max-w-6xl px-4 pt-40 pb-0 md:pt-2 md:pb-0 min-h-[840px] md:min-h-[520px]">
        <Reveal>
          {/* ✅ desktop: h-full so we can push images to bottom */}
          <div className="flex h-full flex-col md:flex-row md:justify-between">
            {/* ✅ desktop: center the text vertically */}
            <div className="mx-auto max-w-md text-center md:mx-0 md:text-left md:self-center">
              <h2 className="text-3xl font-extrabold md:text-4xl">
                Ready to take off
                <br className="md:hidden" /> faster?
              </h2>

              <p className="mt-3 text-white/80">
                Start your free trial and complete your first takeoff in minutes.
              </p>

              <Link
                href="/download"
                className="btn-primary mt-8 inline-flex h-[46px] w-full items-center justify-center gap-2 px-6 md:w-auto"
              >
                <Download className="h-4 w-4" />
                <span>Download now</span>
              </Link>
            </div>

            {/* ✅ desktop: push the whole image group to the bottom */}
            <div className="relative mt-0 flex-1 md:flex md:items-end md:justify-end">
              {/* ✅ desktop: give a height so absolute bottom works */}
              <div className="relative h-[540px] w-full md:h-[520px]">
                {/* ✅ White UI image: stick to bottom on desktop */}
                <Image
                  src="/assets/images/home/finalcta2.webp"
                  alt="Planformer detail"
                  width={640}
                  height={400}
                  className="
                    absolute bottom-0 -right-40 z-10
                    h-auto w-[126%] max-w-[620px]
                    md:bottom-0 md:left-[170] md:w-[620px] md:max-w-none
                  "
                />

                {/* ✅ Man image: stick to bottom on desktop */}
                <Image
                  src="/assets/images/home/finalcta.webp"
                  alt="Planformer preview"
                  width={1200}
                  height={700}
                  className="
                    absolute bottom-0 left-[34%] -translate-x-1/2 z-20
                    h-auto w-[80%] max-w-[470px]
                    md:left-auto md:right-[240px] md:translate-x-0 md:w-[520px] md:max-w-none
                  "
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
