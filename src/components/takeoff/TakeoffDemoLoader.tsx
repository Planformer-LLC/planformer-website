"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import TakeoffSkeleton from "./TakeoffSkeleton";

// ssr:false keeps a second copy of the canvas markup out of the initial HTML —
// the skeleton already covers that.
const TakeoffDemo = dynamic(() => import("./TakeoffDemo"), {
  ssr: false,
  loading: () => <TakeoffSkeleton />,
});

/**
 * Mounts the interactive demo only as it approaches the viewport, so the
 * homepage pays nothing for it above the fold.
 */
export default function TakeoffDemoLoader() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || armed) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [armed]);

  return <div ref={ref}>{armed ? <TakeoffDemo /> : <TakeoffSkeleton />}</div>;
}
