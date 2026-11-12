import {
  ArrowRight,
  Globe,
  Laptop,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { siteData } from "@/data/siteData";
import PosterVideo from "@/components/sections/PosterVideo";

// v2: re-encoded at native resolution (x264 CRF 24) — 15.7MB -> 11.2MB with no
// visible loss on the plan linework, and the poster as WebP (347KB -> 109KB).
// v1 is left in place untouched.
// Poster is a real frame from the video at its exact 1920x1016, so the still
// and the playing video occupy the same box with no letterboxing.
const heroPosterUrl =
  "https://firebasestorage.googleapis.com/v0/b/planformer-3408e.firebasestorage.app/o/marketing%2Fhero%2Fv2%2Fhero_poster_1920.webp?alt=media&token=a8d4c143-9eac-412a-b9b9-e3f721955db0";
const heroVideoUrl =
  "https://firebasestorage.googleapis.com/v0/b/planformer-3408e.firebasestorage.app/o/marketing%2Fhero%2Fv2%2Fhero_video_1080p.mp4?alt=media&token=d1a3c46d-afc0-441b-a3f5-da252861ae14";

// Every platform on one subscription is the main thing desktop-only
// competitors can't say, so it gets its own row under the video.
const devices = [
  { label: "Mac", Icon: Laptop },
  { label: "Windows", Icon: Monitor },
  { label: "Web", Icon: Globe },
  { label: "iPhone", Icon: Smartphone },
  { label: "iPad", Icon: Tablet },
  { label: "Android", Icon: Smartphone },
];

const stats = [
  { value: `${siteData.rating.value.toFixed(1)}★`, label: "App Store rating" },
  { value: "2.5×", label: "Faster takeoffs" },
  { value: "Offline", label: "No signal needed" },
];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      // Faint plan-paper grid: reads as construction without stock photos.
      className="bg-[#F6F9FE] pt-28 pb-12 md:pt-36 md:pb-16"
      style={{
        backgroundImage:
          "linear-gradient(#E3ECF8 1px, transparent 1px), linear-gradient(90deg, #E3ECF8 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        {/* Copy */}
        <div className="flex min-w-0 flex-col gap-6">
          <h1
            id="hero-title"
            className="text-[40px] leading-[1.02] font-extrabold tracking-[-0.035em] text-ink sm:text-[56px] lg:text-[52px] xl:text-[64px]"
          >
            Your takeoff goes where you go.
          </h1>

          <p className="max-w-[520px] text-base leading-relaxed text-[#4A5260] sm:text-[19px] sm:leading-[1.6]">
            Desktop takeoff software keeps you chained to one Windows PC.
            Planformer works on every device you own, so the bid moves with
            you from the office to the jobsite.
          </p>

          <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:gap-6">
            {/* Explicit classes, not .btn-primary: that class is unlayered CSS
                and silently overrides any size utilities added next to it. */}
            <a
              href={siteData.signupHref}
              className="inline-flex h-[60px] w-full items-center justify-center gap-2.5 rounded-xl bg-brand px-8 text-lg font-bold text-white shadow-[0_10px_24px_rgba(15,131,255,0.28)] transition hover:bg-brand-hover active:scale-[0.98] sm:w-auto"
            >
              Start free trial
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#try-it"
              className="py-3 text-center text-base font-semibold text-ink underline underline-offset-4 hover:text-brand"
            >
              Try a takeoff, no sign-up
            </a>
          </div>

          <p className="text-sm text-[#5F6670]">
            Free for up to 14 days. Cancel anytime. Rated{" "}
            {siteData.rating.value.toFixed(1)} on the App Store.
          </p>
        </div>

        {/* Video + devices */}
        <Reveal from="right" duration={0.6} className="min-w-0">
          <div className="flex flex-col gap-4">
            <PosterVideo
              id="hero-video"
              posterUrl={heroPosterUrl}
              videoUrl={heroVideoUrl}
              label="Play the Planformer takeoff demo video"
              pillLabel="Watch a takeoff"
              priority
              sizes="(max-width: 1024px) 100vw, 640px"
              // Matches the source exactly (1920x1016): no crop, no letterbox.
              className="aspect-[1920/1016] w-full"
            />
            <dl className="grid grid-cols-3 gap-2 sm:gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-white p-3 sm:p-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-xl font-extrabold text-ink sm:text-[26px]">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-xs text-[#5F6670] sm:text-[13px]">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col gap-3 rounded-xl border border-[#D7E2F1] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-[#4A5260]">
                One account, every device
              </p>
              <ul className="grid grid-cols-6 gap-1 text-[#0A5FC2] sm:flex sm:gap-4">
                {devices.map(({ label, Icon }) => (
                  <li key={label} className="flex flex-col items-center gap-1">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="text-[11px] font-semibold">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
