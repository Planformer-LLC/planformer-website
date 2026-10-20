"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

type Props = Readonly<{
  posterUrl: string;
  videoUrl: string;
  label: string;
  className?: string;
  /** Set on the above-the-fold hero poster only. */
  priority?: boolean;
  /**
   * Window event name that starts playback, so a button elsewhere on the page
   * (e.g. the hero's "Watch a takeoff") can drive this video without pulling
   * the whole hero across the client boundary.
   */
  playOnEvent?: string;
  /** Anchor id, so the play button can scroll the video into view. */
  id?: string;
  /** next/image `sizes` for the poster; match it to the rendered width. */
  sizes?: string;
  /**
   * When set, the play control is a labelled pill in the bottom-left corner
   * (the hero) instead of the round button in the middle.
   */
  pillLabel?: string;
}>;

/**
 * Poster-first video.
 *
 * Nothing about the video file is fetched until the visitor asks for it:
 * `preload="none"`, no autoplay, and the still frame goes through next/image
 * (WebP/AVIF, resized) instead of a raw `poster` attribute, which bypasses
 * image optimisation entirely.
 */
export default function PosterVideo({
  posterUrl,
  videoUrl,
  label,
  className,
  priority = false,
  playOnEvent,
  id,
  sizes = "(max-width: 768px) 100vw, 1200px",
  pillLabel,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);

  const handlePlay = useCallback(() => {
    setStarted(true);
    // The <video> mounts in this same commit; play once it is in the DOM.
    requestAnimationFrame(() => {
      void videoRef.current?.play();
    });
  }, []);

  useEffect(() => {
    if (!playOnEvent) return;
    const onPlay = () => handlePlay();
    window.addEventListener(playOnEvent, onPlay);
    return () => window.removeEventListener(playOnEvent, onPlay);
  }, [playOnEvent, handlePlay]);

  return (
    <div
      id={id}
      className={`relative overflow-hidden rounded-2xl border border-[#E3E6EB] bg-white shadow-[0_30px_70px_rgba(16,24,40,0.14)] md:rounded-[18px] ${className ?? ""}`}
    >
      {started ? (
        <video
          ref={videoRef}
          // object-contain, never cover: cover crops the sides off a
          // screencast, which is where the plan detail lives.
          className="h-full w-full bg-white object-contain"
          controls
          loop
          playsInline
          preload="none"
          poster={posterUrl}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          className="group absolute inset-0 h-full w-full cursor-pointer"
          aria-label={label}
        >
          <Image
            src={posterUrl}
            alt=""
            fill
            priority={priority}
            sizes={sizes}
            className="object-contain"
          />
          {pillLabel ? (
            <span className="absolute bottom-4 left-4 inline-flex h-12 items-center gap-2.5 rounded-full bg-surface-dark py-0 pr-[18px] pl-2 text-sm font-semibold text-white shadow-lg transition-transform duration-200 group-hover:scale-[1.03] sm:bottom-6 sm:left-6">
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-brand">
                <Play size={14} className="ml-0.5 fill-white text-white" />
              </span>
              {pillLabel}
            </span>
          ) : (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform duration-200 group-hover:scale-105">
                <Play size={24} className="ml-1 fill-brand text-brand" />
              </span>
            </span>
          )}
        </button>
      )}
    </div>
  );
}
