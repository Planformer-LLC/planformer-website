"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/**
 * The active Lenis instance, if any.
 *
 * Lenis drives scrolling itself, so a plain `window.scrollTo` or a native
 * hash jump gets overwritten on its next frame — which is why in-page anchor
 * links appeared to do nothing. Anything that scrolls programmatically must
 * go through `scrollToElement` below.
 */
let lenisInstance: Lenis | null = null;

/**
 * Scroll to an element, a selector, or an absolute offset, working with or
 * without Lenis. Pass 0 to go to the top.
 */
export function scrollToElement(
  target: Element | string | number,
  offset = 0,
) {
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof target === "number") {
    if (lenisInstance) lenisInstance.scrollTo(target);
    else window.scrollTo({ top: target, behavior: smooth ? "smooth" : "auto" });
    return;
  }

  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, { offset });
    return;
  }

  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY + offset,
    behavior: smooth ? "smooth" : "auto",
  });
}

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
    lenisInstance = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
