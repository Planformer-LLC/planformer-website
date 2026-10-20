"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "We moved two estimators from spreadsheets to Planformer in one week. Now our quantity takeoffs are consistent and bid prep is noticeably faster across every project.",
    name: "Michael Rivera",
    company: "StoneBridge Construction",
    avatar: "/assets/images/home/reviews/reviewer-1.jpg",
  },
  {
    quote:
      "The interface is clean, the measurements are reliable, and our site managers can review estimates without extra training. It saves us several hours each week.",
    name: "Aisha Khan",
    company: "NorthStone Builders",
    avatar: "/assets/images/home/reviews/reviewer-2.jpg",
  },
  {
    quote:
      "What I like most is fewer revisions after handoff. Our project managers and estimators stay aligned, and we submit cleaner bids with better confidence.",
    name: "Ethan Collins",
    company: "PrimeLine Contractors",
    avatar: "/assets/images/home/reviews/reviewer-3.jpg",
  },
];

const ROTATE_MS = 6000;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const timer = useRef<number | null>(null);

  const restart = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(
      () => setActive((i) => (i + 1) % testimonials.length),
      ROTATE_MS,
    );
  }, []);

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [restart]);

  const t = testimonials[active];

  return (
    <section aria-label="Customer reviews" className="bg-[#F5F7FA] py-16 md:py-[88px]">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10"
          >
            <Image
              src={t.avatar}
              alt={t.name}
              width={160}
              height={200}
              className="hidden h-[200px] w-[160px] shrink-0 rounded-2xl object-cover sm:block"
            />
            <figure className="flex min-w-0 flex-col gap-[18px]">
              <blockquote className="text-[19px] leading-normal font-semibold tracking-[-0.01em] text-ink md:text-2xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="text-[15px] text-[#4A5260]">
                <strong className="text-ink">{t.name}</strong> · {t.company}
              </figcaption>
            </figure>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-center gap-1 sm:justify-start sm:pl-[200px]">
          {testimonials.map((r, idx) => (
            <button
              key={r.name}
              type="button"
              onClick={() => {
                setActive(idx);
                restart();
              }}
              aria-label={`Show review ${idx + 1} of ${testimonials.length}`}
              aria-current={idx === active}
              className="grid h-8 w-8 place-items-center"
            >
              <span
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === active ? "w-6 bg-brand" : "w-2.5 bg-black/15 hover:bg-black/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
