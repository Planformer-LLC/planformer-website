"use client";

import useSmoothScroll from "@/hooks/useSmoothScroll";

/**
 * Renders nothing — exists purely to keep the Lenis hook on the client
 * without dragging SiteLayout across the client boundary with it.
 */
export default function SmoothScroll() {
  useSmoothScroll();
  return null;
}
