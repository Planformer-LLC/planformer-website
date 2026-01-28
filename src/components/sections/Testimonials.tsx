import Reveal from "@/components/animations/Reveal";
import Image from "next/image";

export default function Testimonials() {
  return (
    // More top padding, less bottom padding
    <section className="bg-[#F5F5F5] pt-24 pb-10">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="relative bg-transparent px-6 py-10 md:px-12">
            {/* Left quote */}
            <span className="absolute left-6 top-6">
              <Image
                src="/assets/icons/quotas/open quote, blockquote.svg"
                alt="Open quote"
                width={22}
                height={22}
              />
            </span>

            {/* Text */}
            <div className="relative mx-auto max-w-2xl">
              <p className="text-[20px] leading-relaxed text-[#1A1A1A]">
                Switching to this software cut our takeoff time dramatically. What used to take half a day now takes under an
                hour. Accurate, easy to use, and perfect for our estimating team.
              </p>

              {/* Right quote */}
              <span className="absolute -bottom-6 right-0">
                <Image
                  src="/assets/icons/quotas/close quote, blockquote.svg"
                  alt="Close quote"
                  width={22}
                  height={22}
                />
              </span>
            </div>

            {/* 100px gap to profile */}
            <div className="mt-[100px] flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F83FF]/10 text-sm font-extrabold text-[#0F83FF]">
                AK
              </div>

              {/* Bigger name */}
              <div className="mt-[16px] text-[16px] font-semibold text-[#1A1A1A]">
                Abdullah Kahn
              </div>

              {/* Bigger company text */}
              <div className="mt-[4px] text-[13px] text-[#767676]">
                Globaltech Constructions
              </div>
            </div>

            {/* 24px gap to dots */}
            <div className="mt-[24px] flex justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0F83FF]" />
              <span className="h-2 w-2 rounded-full bg-black/10" />
              <span className="h-2 w-2 rounded-full bg-black/10" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
