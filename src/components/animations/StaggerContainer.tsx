"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode;
    className?: string;
    /** Delay before the first child appears (seconds) */
    delay?: number;
    /** Time gap between each child animation (seconds) */
    stagger?: number;
};

/**
 * StaggerContainer — wraps children and passes staggerChildren timing
 * down via Framer Motion variant propagation.
 *
 * Each direct child must use variants `hidden` and `show` to participate
 * in the stagger (any <Reveal> child automatically qualifies).
 */
export default function StaggerContainer({
    children,
    className,
    delay = 0,
    stagger = 0.08,
}: Props) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return <div className={cn(className)}>{children}</div>;
    }

    return (
        <motion.div
            className={cn("transform-gpu", className)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -8% 0px" }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: stagger,
                        delayChildren: delay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
