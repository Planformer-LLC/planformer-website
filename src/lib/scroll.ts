/**
 * Scroll to an element, a selector, or an absolute offset.
 *
 * Uses the browser's own smooth scrolling, which runs on the compositor.
 * The site previously ran Lenis, a JS momentum-scroll library; it drove the
 * scroll position from the main thread every frame, so any main-thread work
 * showed up directly as scroll stutter, and it fought native anchor jumps.
 */
export function scrollToElement(
  target: Element | string | number,
  offset = 0,
) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reduced ? "auto" : "smooth";

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior });
    return;
  }

  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;

  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY + offset,
    behavior,
  });
}
