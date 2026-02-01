"use client";

import React, { useId } from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;

  // timing
  delay?: number;
  duration?: number;

  // motion
  x?: number; // slide left/right
  y?: number; // slide up/down
  scale?: number; // subtle zoom
  blur?: number; // subtle blur in px (e.g. 1)

  // viewport controls
  once?: boolean;
  amount?: number;
  margin?: string;
};

export default function Reveal({
  children,
  className,

  delay = 0,
  duration = 0.32,

  x = 0,
  y = 12,
  scale = 1,
  blur = 0,

  once = true,
  amount = 0.12,
  margin = "0px 0px -10% 0px",
}: Props) {
  const reduceMotion = useReducedMotion();
  const id = useId();

  // Respect reduced motion
  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

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
        // GPU-friendly hints
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
