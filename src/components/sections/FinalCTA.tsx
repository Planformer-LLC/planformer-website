import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { siteData } from "@/data/siteData";

export default function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="bg-[#F5F7FA] px-4 pt-4 pb-20 sm:px-6 md:pb-24">
      <Reveal from="bottom">
        <div className="mx-auto flex max-w-[1200px] flex-col overflow-hidden rounded-3xl bg-[#0062CC] text-white md:flex-row md:items-center md:gap-6">
          <div className="flex min-w-0 flex-1 flex-col gap-[18px] px-6 pt-10 pb-8 md:py-14 md:pl-14">
            <h2
              id="cta-title"
              className="text-[30px] leading-[1.08] font-extrabold tracking-[-0.03em] md:text-[44px]"
            >
              Ready to take off faster?
            </h2>
            <p className="text-base leading-relaxed text-[#E1EEFF] md:text-lg">
              Start your free trial and finish your first takeoff in minutes.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <a
                href={siteData.signupHref}
                className="inline-flex h-[58px] items-center justify-center gap-2 rounded-xl bg-white px-[30px] text-lg font-extrabold text-[#0062CC] transition hover:bg-[#EAF3FF] active:scale-[0.98]"
              >
                Start free trial
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <Link
                href="/download"
                className="py-3 text-center text-[15px] font-semibold text-white underline underline-offset-4 hover:text-[#E1EEFF]"
              >
                or download the app
              </Link>
            </div>
          </div>
          <Image
            src="/assets/images/home/finalcta.webp"
            alt=""
            width={596}
            height={393}
            sizes="(max-width: 768px) 90vw, 420px"
            className="mx-auto h-auto w-full max-w-[420px] self-end md:mx-0 md:mr-6"
          />
        </div>
      </Reveal>
    </section>
  );
}
