"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
    /** The full text to reveal word by word */
    text: string;
    /** Additional class names on the outer span */
    className?: string;
    /** Delay before the first word appears (seconds) */
    delay?: number;
    /** Time gap between each word appearing (seconds) */
    stagger?: number;
    /** Duration for each word's fade+slide (seconds) */
    duration?: number;
};

/**
 * TypewriterText — reveals words one by one with a smooth staggered
 * fade + slide-up effect. GPU-friendly: only opacity and transform.
 * Respects prefers-reduced-motion.
 */
export default function TypewriterText({
    text,
    className,
    delay = 0,
    stagger = 0.07,
    duration = 0.45,
}: Props) {
    const reduceMotion = useReducedMotion();
    const words = text.split(" ");

    if (reduceMotion) {
        return <span className={className}>{text}</span>;
    }

    return (
        <span className={className} aria-label={text}>
            {words.map((word, i) => (
                <motion.span
                    key={`${word}-${i}`}
                    className="inline-block transform-gpu will-change-transform"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration,
                        delay: delay + i * stagger,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    // Screen readers see the aria-label on the parent, so hide individual spans
                    aria-hidden="true"
                >
                    {/* Non-breaking space after each word except the last */}
                    {word}
                    {i < words.length - 1 ? "\u00A0" : ""}
                </motion.span>
            ))}
        </span>
    );
}
