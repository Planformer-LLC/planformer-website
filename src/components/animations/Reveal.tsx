"use client";

import React, { useId } from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 12,
  duration = 0.28,
}: Props) {
  const reduceMotion = useReducedMotion();
  const id = useId(); // helps avoid layout quirks in some cases

  // If user prefers reduced motion OR low-power device: no animation.
  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  const v: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
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
        once: true,
        // lower amount = triggers earlier and reduces “pop-in”
        amount: 0.12,
        // margin triggers before it enters view so it feels smoother
        margin: "0px 0px -10% 0px",
      }}
    >
      {children}
    </motion.div>
  );
}
