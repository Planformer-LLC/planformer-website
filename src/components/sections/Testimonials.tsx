"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "@/components/animations/Reveal";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Testimonial = {
  quote: string;
  name: string;
  company: string;
  avatar: string;
};

export default function Testimonials() {
  const testimonials: Testimonial[] = useMemo(
    () => [
      {
        quote:
          "Switching to this software cut our takeoff time dramatically. What used to take half a day now takes under an hour. Accurate, easy to use, and perfect for our estimating team.",
        name: "James Anderson",
        company: "Globaltech Constructions",
        avatar: "/assets/images/home/profile.png",
      },
      {
        quote:
          "Clean interface and smooth workflow. Our team got productive fast and the estimates feel more accurate. It’s simple to use and saves real time every week.",
        name: "Sarah Williams",
        company: "NorthStone Builders",
        avatar: "/assets/images/home/profile.png",
      },
      {
        quote:
          "Reliable results with less rework. It improved coordination across our team and helped us deliver faster. Great tool for estimators and project managers.",
        name: "Daniel Carter",
        company: "PrimeLine Contractors",
        avatar: "/assets/images/home/profile.png",
      },
    ],
    []
  );

  const total = testimonials.length;

  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1); // 1 next, -1 prev

  const intervalRef = useRef<number | null>(null);

  const startInterval = () => {
    // clear existing interval first
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDir(1);
      setActive((prev) => (prev + 1) % total);
    }, 5000);
  };

  // start autoplay on mount
  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const goTo = (idx: number) => {
    setDir(idx > active ? 1 : -1);
    setActive(idx);

    // ✅ reset timer when user clicks a dot
    startInterval();
  };

  const t = testimonials[active];

  const variants = {
    enter: (direction: 1 | -1) => ({
      opacity: 0,
      x: direction === 1 ? 40 : -40,
      filter: "blur(2px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
    },
    exit: (direction: 1 | -1) => ({
      opacity: 0,
      x: direction === 1 ? -40 : 40,
      filter: "blur(2px)",
    }),
  };

  return (
    <section className="bg-[#F5F5F5] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="relative bg-transparent px-4 py-8 sm:px-6 sm:py-10 md:px-12">
            {/* Left quote */}
            <span className="absolute left-4 top-4 sm:left-6 sm:top-6">
              <Image
                src="/assets/icons/quotas/open quote, blockquote.svg"
                alt="Open quote"
                width={22}
                height={22}
                className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]"
              />
            </span>

            {/* Animated swap */}
            <div className="relative">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={active}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Quote text */}
                  <div className="relative mx-auto max-w-2xl">
                    <p className="text-[16px] leading-relaxed text-[#1A1A1A] sm:text-[18px] md:text-[20px]">
                      {t.quote}
                    </p>

                    {/* Right quote */}
                    <span className="absolute -bottom-6 right-0">
                      <Image
                        src="/assets/icons/quotas/close quote, blockquote.svg"
                        alt="Close quote"
                        width={22}
                        height={22}
                        className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]"
                      />
                    </span>
                  </div>

                  {/* Profile */}
                  <div className="mt-14 sm:mt-16 md:mt-20 flex flex-col items-center">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-[#0F83FF]/20 sm:h-14 sm:w-14">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                        priority
                      />
                    </div>

                    <div className="mt-4 text-[15px] font-semibold text-[#1A1A1A] sm:text-[16px]">
                      {t.name}
                    </div>

                    <div className="mt-1 text-[12px] text-[#767676] sm:text-[13px]">
                      {t.company}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots (slightly bigger now) */}
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                  className="grid place-items-center p-1"
                >
                  <span
                    className={[
                      "rounded-full transition-all",
                      "h-3 w-3 sm:h-[10px] sm:w-[10px]", // ✅ bigger dots
                      idx === active ? "bg-[#0F83FF]" : "bg-black/10",
                    ].join(" ")}
                  />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
