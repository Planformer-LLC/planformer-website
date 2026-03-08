"use client";

import React, { useId } from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "left" | "right" | "top" | "bottom";

type Props = {
  children: React.ReactNode;
  className?: string;

  // shorthand direction (auto-sets x/y)
  from?: Direction;

  // timing
  delay?: number;
  duration?: number;

  // fine-grained overrides (used when `from` is not enough)
  x?: number;
  y?: number;
  scale?: number;
  blur?: number;

  // viewport controls
  once?: boolean;
  amount?: number;
  margin?: string;
};

/** Compute x/y based on direction shorthand */
function directionToXY(from: Direction, distance = 28): { x: number; y: number } {
  switch (from) {
    case "left":   return { x: -distance, y: 0 };
    case "right":  return { x:  distance, y: 0 };
    case "top":    return { x: 0, y: -distance };
    case "bottom": return { x: 0, y:  distance };
  }
}

export default function Reveal({
  children,
  className,

  from,

  delay = 0,
  duration = 0.5,

  x: xProp = 0,
  y: yProp = 12,
  scale = 1,
  blur = 0,

  once = true,
  amount = 0.12,
  margin = "0px 0px -8% 0px",
}: Props) {
  const reduceMotion = useReducedMotion();
  const id = useId();

  // Respect reduced motion — render children with no animation wrapper
  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  // Direction shorthand overrides manual x/y props
  const { x, y } = from ? directionToXY(from) : { x: xProp, y: yProp };

  const v: Variants = {
    hidden: {
      opacity: 0,
      x,
      y,
      scale,
      filter: blur ? `blur(${blur}px)` : "blur(0px)",
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // smooth premium easing
      },
    },
  };

  return (
    <motion.div
      key={id}
      className={cn(
        // GPU-friendly compositing hints
        "transform-gpu [backface-visibility:hidden] [transform:translateZ(0)] will-change-transform",
        className
      )}
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{
        once,
        amount,
        margin,
      }}
    >
      {children}
    </motion.div>
  );
}
