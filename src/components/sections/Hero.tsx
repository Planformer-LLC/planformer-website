import Link from "next/link";
import Reveal from "@/components/animations/Reveal";
import PosterVideo from "@/components/sections/PosterVideo";

// v2: re-encoded at native resolution (x264 CRF 24) — 15.7MB -> 11.2MB with no
// visible loss on the plan linework, and the poster as WebP (347KB -> 109KB).
// v1 is left in place untouched.
const heroPosterUrl =
  "https://firebasestorage.googleapis.com/v0/b/planformer-3408e.firebasestorage.app/o/marketing%2Fhero%2Fv2%2Fhero_thumbnail.webp?alt=media&token=ac2c235a-00f2-4cf2-aabd-81d769d0152c";
const heroVideoUrl =
  "https://firebasestorage.googleapis.com/v0/b/planformer-3408e.firebasestorage.app/o/marketing%2Fhero%2Fv2%2Fhero_video_1080p.mp4?alt=media&token=d1a3c46d-afc0-441b-a3f5-da252861ae14";

const stats = [
  { value: "4.8★", label: "App Store rating" },
  { value: "90%", label: "Less takeoff time" },
  { value: "Offline", label: "No signal needed" },
];

export default function Hero() {
  return (
    <section className="relative bg-[#F5F5F5] pt-28 pb-0 md:pt-32">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/bg/bg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 lg:px-10">
        {/* Copy — centered above a full-width video */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-1.5 text-[11px] font-extrabold tracking-[0.16em] text-brand uppercase backdrop-blur-sm sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            Takeoff &amp; Estimating · 5 Platforms
          </p>

          <h1 className="mt-6 text-[38px] leading-[1.04] font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[64px]">
            Measure the plans. Price the job.
            <br />
            <span className="text-brand">Same afternoon.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/70 lg:text-lg">
            Planformer turns a PDF plan set into quantities, assemblies and a
            priced estimate — on your phone at the site or your desktop at the
            office.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/download"
              className="btn-primary h-[52px] w-full px-8 text-base sm:w-auto"
            >
              Start free trial
            </Link>
            <Link
              href="#try-it"
              className="inline-flex h-[52px] w-full items-center justify-center rounded-[10px] border border-black/10 bg-white px-8 text-base font-semibold text-ink transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] active:scale-[0.98] sm:w-auto"
            >
              Watch a takeoff
            </Link>
          </div>

          {/* Stat row */}
          <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-black/10 pt-8 text-left sm:gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-2xl font-extrabold text-ink sm:text-3xl">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-xs text-ink/60 sm:text-sm">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Full-width video */}
        <Reveal from="bottom" delay={0.1} duration={0.6}>
          <div className="mt-14 md:mt-16">
            <PosterVideo
              posterUrl={heroPosterUrl}
              videoUrl={heroVideoUrl}
              label="Play the Planformer takeoff demo video"
              priority
              className="aspect-[16/10] w-full md:aspect-[16/9]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
