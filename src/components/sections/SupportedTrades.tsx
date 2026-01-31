"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/animations/Reveal";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Trade = {
  key: string;
  label: string;
  image: string;
  title: string;
  description: string;
};

export default function SupportedTrades() {
  const trades: Trade[] = useMemo(
    () => [
      {
        key: "construction",
        label: "Construction & Contracting",
        image: "/assets/images/home/supportedtrade.webp",
        title: "Construction & Contracting",
        description:
          "Measure plans, quantify materials, and estimate labor across full project scopes for commercial and residential builds.",
      },
      {
        key: "roofing",
        label: "Roofing",
        image: "/assets/images/home/roofing 1.webp",
        title: "Roofing",
        description:
          "Quickly calculate roof areas, slopes, and material needs with precision, reducing waste and speeding up bids.",
      },
      {
        key: "concrete",
        label: "Concrete & Asphalt",
        image: "/assets/images/home/concrete.webp",
        title: "Concrete & Asphalt",
        description:
          "Get volumes, square footage, and material requirements for foundations, driveways, and sitework in minutes.",
      },
      {
        key: "electrical",
        label: "Electrical",
        image: "/assets/images/home/electrical.webp",
        title: "Electrical",
        description:
          "Measure wiring lengths, conduit runs, and fixture placements from plans with ease for fast, reliable results.",
      },
      {
        key: "flooring",
        label: "Flooring",
        image: "/assets/images/home/floring.webp",
        title: "Flooring",
        description:
          "Accurately measure all floor areas and calculate material needs and waste factors for tile, hardwood, carpet, and more.",
      },
      {
        key: "framing",
        label: "Framing & Carpentry",
        image: "/assets/images/home/framing.webp",
        title: "Framing & Carpentry",
        description:
          "Count lumber, wall layouts, joists, studs, and other framing elements instantly to optimize material usage.",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const current = trades[active];

  return (
    <section className="pt-32 pb-20 md:py-32">

      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="text-center">
          <h2 className="text-2xl font-extrabold text-[#1A1A1A] md:text-4xl">
            Supported Trades
          </h2>
          <p className="mt-2 text-sm text-[#1A1A1A] md:mt-3 md:text-base">
            Fast, accurate takeoffs for any trade.
          </p>
        </Reveal>

        <div className="mt-7 flex flex-col gap-6 md:mt-12 md:flex-row md:items-start md:gap-8">
          {/* ✅ MOBILE: horizontal scroll pills (inside padding + auto-center selected) */}
<div className="md:hidden my-2 w-full">
  <div className="w-full px-0">


    <div
      className="flex gap-4 overflow-x-auto whitespace-nowrap pb-2 [scrollbar-width:none] [-ms-overflow-style:none]"
      
    >
      {trades.map((t, idx) => {
        const isActive = idx === active;

        return (
          <button
            key={t.key}
            type="button"
            aria-selected={isActive}
            onClick={(e) => {
              setActive(idx);

              // ✅ auto-center the clicked pill in the scroll area (mobile only)
              e.currentTarget.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
              });
            }}
            className={cn(
              "shrink-0 rounded-[10px] text-sm font-medium transition",
              "px-4 py-3",
              isActive
                ? "bg-[#0F83FF] text-white shadow-sm"
                : "text-[#1A1A1A] hover:bg-black/5"
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>

    {/* hide scrollbar for webkit */}
    <style jsx>{`
      div::-webkit-scrollbar {
        display: none;
      }
    `}</style>
  </div>
</div>


          {/* ✅ DESKTOP: vertical list (no fixed/full width buttons) */}
          <div className="hidden md:block md:w-[260px]">
            <div className="flex flex-col items-start gap-2">
              {trades.map((t, idx) => {
                const isActive = idx === active;
                return (
                  <button
                    key={t.key}
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActive(idx)}
                    className={cn(
                      "inline-flex items-center justify-start rounded-[10px] text-left text-sm transition",
                      "px-4 py-[10px]",
                      isActive
                        ? "bg-[#0F83FF] text-white shadow-sm"
                        : "bg-transparent text-[#1A1A1A]/70 hover:bg-black/5"
                    )}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: image + heading + text */}
          <div className="flex-1">
            <div className="relative w-full overflow-hidden rounded-2xl md:ml-auto md:w-[860px]">
              <Image
                key={current.image}
                src={current.image}
                alt={current.title}
                width={860}
                height={190}
                className="h-[170px] w-full object-cover md:h-[190px]"
                priority={active === 0}
              />
            </div>

            <div className="mt-4 w-full text-left md:ml-auto md:w-[860px]">
              <p className="text-base font-extrabold text-[#1A1A1A] md:text-lg">
                {current.title}
              </p>
              <p className="mt-1 text-sm text-[#1A1A1A]/70 md:text-sm">
                {current.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
