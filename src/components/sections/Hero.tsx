import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { platforms, siteData } from "@/data/siteData";
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

// iPad shares the iPhone App Store page, so it is left out of this short row.
const heroDownloadLabels: Record<string, string> = {
  macos: "Mac",
  windows: "Windows",
  ios: "App Store",
  android: "Google Play",
};
const heroDownloads = platforms
  .filter((p) => p.id in heroDownloadLabels)
  .map((p) => ({ ...p, label: heroDownloadLabels[p.id] }));

const perks = ["Up to 14 days free", "Cancel anytime", "Works in your browser"];

const stats = [
  { value: "4.8★", label: "App Store rating" },
  { value: "90%", label: "Less takeoff time" },
  { value: "Offline", label: "No signal needed" },
];

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-white pt-32 pb-20 md:pt-40 md:pb-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        {/* Copy */}
        <div className="flex min-w-0 flex-col gap-6">
          <p className="text-[13px] font-bold tracking-[0.12em] text-[#0062CC] uppercase">
            Takeoff &amp; Estimating Software
          </p>

          <h1
            id="hero-title"
            // 34px keeps "Measure the plans." on one line at 375px wide.
            className="text-[34px] leading-[1.06] font-extrabold tracking-[-0.035em] text-ink min-[400px]:text-[38px] sm:text-[52px] xl:text-[60px]"
          >
            <span className="block">Measure the plans.</span>
            <span className="block">Price the job.</span>
            <span className="block text-brand">Same afternoon.</span>
          </h1>

          <p className="max-w-[520px] text-base leading-relaxed text-[#4A5260] sm:text-[19px] sm:leading-[1.6]">
            Planformer turns a PDF plan set into quantities, assemblies and a
            priced estimate — in your browser, on your desktop, or on your phone
            at the site.
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
              href="#pricing"
              className="py-3 text-center text-base font-semibold text-ink underline underline-offset-4 hover:text-brand"
            >
              See pricing
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-[#4A5260]">
            {perks.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#0A7A1E]" strokeWidth={2.5} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>

          {/* Secondary: installers and store pages, deliberately smaller than
              the trial button. data-download-* feeds the
              website_download_click conversion (WebsiteAnalytics). */}
          <div className="flex flex-col gap-2.5 border-t border-[#ECEEF1] pt-4 sm:flex-row sm:flex-wrap sm:items-center">
            <span className="text-[13px] text-[#5F6670]">Prefer the app? Download for</span>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {heroDownloads.map((d) => (
                <a
                  key={d.id}
                  href={d.href}
                  data-download-platform={d.id}
                  data-download-location="hero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-[10px] border border-[#D9DDE3] bg-white px-3 text-[13px] font-semibold text-[#3D4450] transition hover:border-brand hover:text-brand sm:h-9 sm:rounded-full"
                >
                  <Image
                    src={d.icon}
                    alt=""
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 object-contain invert"
                  />
                  {d.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Video + stats */}
        <Reveal from="right" duration={0.6} className="min-w-0">
          <div className="flex flex-col gap-5">
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
                <div key={s.label} className="rounded-xl bg-[#F5F7FA] p-3 sm:p-4">
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
