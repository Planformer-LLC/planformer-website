"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { platforms } from "@/data/siteData";

const appStoreUrl = platforms.find((p) => p.id === "ios")!.href;

/**
 * Real App Store reviews only, quoted as written (trimmed where marked with
 * an ellipsis). Names are the reviewers' App Store nicknames. Do not add
 * invented or paraphrased reviews here.
 */
const reviews = [
  {
    title: "Game Changer",
    quote:
      "I have been using PlanSwift on my laptop for years, but I always wished there was a mobile solution I could use on the go… Planformer has completely solved that problem.",
    name: "A J 84",
  },
  {
    title: "Great estimating app with excellent customer service",
    quote:
      "Planformer is a very good app for creating estimates based on construction plans. It has plenty of useful tools, but what stands out the most is the customer service, which is very responsive…",
    name: "LitoAlejandro",
  },
  {
    title: "Great app",
    quote: "Very user friendly and helpful for projects. Highly recommend!",
    name: "Harel M.",
  },
];

const ROTATE_MS = 7000;

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-[#F5A524]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${className} fill-current`} aria-hidden="true" />
      ))}
    </span>
  );
}

/**
 * One review at a time, rotating. Every review stays in the HTML (stacked in
 * one grid cell and cross-faded), so all of them are indexable and the box
 * keeps the height of the longest one: no layout jump between slides.
 */
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const timer = useRef<number | null>(null);
  const paused = useRef(false);

  const restart = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setInterval(() => {
      if (!paused.current) setActive((i) => (i + 1) % reviews.length);
    }, ROTATE_MS);
  }, []);

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [restart]);

  return (
    <section
      aria-labelledby="reviews-title"
      className="border-t border-[#E3ECF8] bg-[#F6F9FE] py-10 md:py-12"
      style={{
        backgroundImage:
          "linear-gradient(#E3ECF8 1px, transparent 1px), linear-gradient(90deg, #E3ECF8 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto max-w-[720px] px-4 sm:px-6">
        <div className="flex flex-col items-center gap-2.5 text-center">
          <h2
            id="reviews-title"
            className="text-[26px] leading-[1.1] font-extrabold tracking-[-0.03em] text-ink md:text-[32px]"
          >
            What contractors say on the App Store.
          </h2>
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#D7E2F1] bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand"
          >
            <Stars />
            5.0 on the App Store
          </a>
        </div>

        <div
          className="mt-5 grid rounded-2xl border border-[#D7E2F1] bg-white px-5 py-4 md:px-7 md:py-5"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          onFocus={() => (paused.current = true)}
          onBlur={() => (paused.current = false)}
        >
          {reviews.map((r, i) => (
            <figure
              key={r.name}
              aria-hidden={i !== active}
              className={`flex flex-col gap-2 transition-opacity duration-500 [grid-area:1/1] ${
                i === active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Stars />
              <blockquote className="text-base leading-relaxed text-ink md:text-[17px]">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto text-sm text-[#4A5260]">
                <strong className="text-ink">{r.name}</strong>, App Store review
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-2 flex justify-center gap-1">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => {
                setActive(i);
                restart();
              }}
              aria-label={`Show review ${i + 1} of ${reviews.length}`}
              aria-current={i === active}
              className="grid h-8 w-8 place-items-center"
            >
              <span
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-brand" : "w-2.5 bg-black/15 hover:bg-black/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
