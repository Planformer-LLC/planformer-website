"use client";

import { Play } from "lucide-react";
import { scrollToElement } from "@/hooks/useSmoothScroll";

export const HERO_PLAY_EVENT = "planformer:play-hero";

/**
 * Scrolls the hero video into view and starts it. Kept as its own client
 * component so the rest of the hero stays server-rendered.
 */
export default function WatchTakeoffButton() {
  return (
    <button
      type="button"
      onClick={() => {
        const el = document.getElementById("hero-video");
        if (el) scrollToElement(el, -80);
        window.dispatchEvent(new Event(HERO_PLAY_EVENT));
      }}
      className="inline-flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-black/10 bg-white px-8 text-base font-semibold text-ink transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] active:scale-[0.98] sm:w-auto"
    >
      <Play size={17} className="fill-ink" />
      Watch a takeoff
    </button>
  );
}
