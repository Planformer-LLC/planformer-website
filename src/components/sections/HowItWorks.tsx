"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/animations/Reveal";

export default function HowItWorks() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const thumbnailUrl =
    "https://firebasestorage.googleapis.com/v0/b/planformer-3408e.firebasestorage.app/o/marketing%2Fhow-it-works%2Fv2%2Fhowitworkthumbnail.png?alt=media&token=f2aaa944-bac2-4f7a-971c-6068cb0463cf";
  const videoUrl =
    "https://firebasestorage.googleapis.com/v0/b/planformer-3408e.firebasestorage.app/o/marketing%2Fhow-it-works%2Fv2%2Fhow%20it%20works%20animation.mp4?alt=media&token=4044b122-fe9d-4f95-a8bf-d2211e8e938e";

  const handlePlay = async () => {
    setHasStarted(true);
    await videoRef.current?.play();
  };

  const steps = [
    {
      n: "1",
      title: "Upload Your PDF or Blueprint",
      desc: "Drop in any plan. The system instantly prepares it for takeoff.",
      color: "#0F83FF",
    },
    {
      n: "2",
      title: "Drag and Drop Assemblies",
      desc: "Add material and labor assemblies directly onto your takeoff for quick, organized estimating",
      color: "#F4B400",
    },
    {
      n: "3",
      title: "Export and Share",
      desc: "Send everything to Excel or share clean reports with clients and teams.",
      color: "#14B86A",
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-white pt-24 pb-8 md:pt-32 md:pb-10"
      style={{
        backgroundImage: "url('/assets/bg/bg3.svg')",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        backgroundSize: "auto",
      }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="text-center">
          <h2 className="text-2xl font-black text-[#1A1A1A] md:text-3xl">
            How It Works
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-[0.52fr_1.48fr] md:items-center md:gap-12">
          <Reveal className="order-1 md:order-2">
            <div className="relative aspect-[45/32] w-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
              <video
                ref={videoRef}
                className="h-full w-full object-contain"
                controls={hasStarted}
                playsInline
                preload="metadata"
                poster={thumbnailUrl}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {!hasStarted ? (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-transparent"
                  aria-label="Play how it works video"
                >
                  <span className="flex h-18 w-18 items-center justify-center rounded-full bg-white/92 shadow-lg backdrop-blur-sm transition-transform duration-200 hover:scale-105">
                    <span className="ml-1 border-y-[12px] border-y-transparent border-l-[18px] border-l-[#1A1A1A]" />
                  </span>
                </button>
              ) : null}
            </div>
          </Reveal>

          <div className="order-2 space-y-14 md:order-1">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div>
                  <p
                    className="text-lg font-extrabold"
                    style={{ color: s.color }}
                  >
                    {s.n}
                  </p>
                  <p className="mt-3 text-base font-extrabold text-[#1A1A1A]">
                    {s.title}
                  </p>
                  <p className="mt-2 text-sm text-[#1A1A1A]/70">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
