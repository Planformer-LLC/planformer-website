"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function useSmoothScroll() {
  useEffect(() => {
    // Respect the OS setting — a hijacked scroll is exactly what this
    // preference is asking us not to do.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
