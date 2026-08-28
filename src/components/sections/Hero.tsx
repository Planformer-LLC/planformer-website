import Link from "next/link";
import Reveal from "@/components/animations/Reveal";
import PosterVideo from "@/components/sections/PosterVideo";
import WatchTakeoffButton, {
  HERO_PLAY_EVENT,
} from "@/components/sections/WatchTakeoffButton";

// v2: re-encoded at native resolution (x264 CRF 24) — 15.7MB -> 11.2MB with no
// visible loss on the plan linework, and the poster as WebP (347KB -> 109KB).
// v1 is left in place untouched.
// Poster is a real frame from the video at its exact 1920x1016, so the still
// and the playing video occupy the same box with no letterboxing. The previous
// thumbnail was 1440x1024 — a different aspect ratio from the video entirely.
const heroPosterUrl =
  "https://firebasestorage.googleapis.com/v0/b/planformer-3408e.firebasestorage.app/o/marketing%2Fhero%2Fv2%2Fhero_poster_1920.webp?alt=media&token=a8d4c143-9eac-412a-b9b9-e3f721955db0";
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

          {/* One sentence per line at every breakpoint — letting these wrap
              naturally left a two-word orphan on the second line. */}
          <h1 className="mt-6 text-[30px] leading-[1.08] font-extrabold tracking-tight text-ink sm:text-[44px] lg:text-[60px] xl:text-[64px]">
            <span className="block">Measure the plans.</span>
            <span className="block">Price the job.</span>
            <span className="block text-brand">Same afternoon.</span>
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
            <WatchTakeoffButton />
          </div>

          {/* Stat row. No divider — the section background already draws
              grid lines, so an extra rule reads as a stray artifact. */}
          <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4 text-center sm:gap-8">
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
              id="hero-video"
              posterUrl={heroPosterUrl}
              videoUrl={heroVideoUrl}
              label="Play the Planformer takeoff demo video"
              priority
              playOnEvent={HERO_PLAY_EVENT}
              // Matches the source exactly (1920x1016) so nothing is cropped
              // or letterboxed at any width.
              className="aspect-[1920/1016] w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
