"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

type Props = Readonly<{
  posterUrl: string;
  videoUrl: string;
  label: string;
  className?: string;
  /** Set on the above-the-fold hero poster only. */
  priority?: boolean;
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
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    setStarted(true);
    // The <video> mounts in this same commit; play once it is in the DOM.
    requestAnimationFrame(() => {
      void videoRef.current?.play();
    });
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.16)] md:rounded-[28px] ${className ?? ""}`}
    >
      {started ? (
        <video
          ref={videoRef}
          className="h-full w-full bg-white object-cover"
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
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/92 shadow-lg backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
              <Play size={28} className="ml-1 fill-ink text-ink" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
