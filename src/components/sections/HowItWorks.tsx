import Reveal from "@/components/animations/Reveal";
import PosterVideo from "@/components/sections/PosterVideo";

// v3: re-encoded (x264 CRF 26) 4.77MB -> 3.3MB, poster as WebP 238KB -> 23KB.
// v2 is left in place untouched.
const thumbnailUrl =
  "https://firebasestorage.googleapis.com/v0/b/planformer-3408e.firebasestorage.app/o/marketing%2Fhow-it-works%2Fv3%2Fhow-it-works_thumbnail.webp?alt=media&token=a2c6a725-6c41-45b6-8e97-c672b90e75e3";
const videoUrl =
  "https://firebasestorage.googleapis.com/v0/b/planformer-3408e.firebasestorage.app/o/marketing%2Fhow-it-works%2Fv3%2Fhow-it-works.mp4?alt=media&token=b9cd538f-5af9-4b83-99d2-71a560c4bc2d";

const steps = [
  {
    title: "Drop in the plans",
    desc: "Upload a PDF plan set. Set the scale once per sheet and you're ready to measure.",
  },
  {
    title: "Measure and price",
    desc: "Trace areas, walls and counts, then drop in items from your saved library. Save an item once with your own costs and it's ready on every project.",
  },
  {
    title: "Export the estimate",
    desc: "Send quantities and costs to Excel to finish your bid.",
  },
  {
    title: "Share the takeoff",
    desc: "Send the marked-up plans to your client or crew, so everyone sees exactly what was measured.",
  },
];

/**
 * The steps hang off a blueprint dimension line: horizontal with tick marks
 * on desktop, vertical on phones with the step numbers sitting on the line.
 */
export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-title"
      // Same plan-paper grid as the hero, so the top of the page reads as one sheet.
      className="border-t border-[#E3ECF8] bg-[#F6F9FE] py-20 md:py-28"
      style={{
        backgroundImage:
          "linear-gradient(#E3ECF8 1px, transparent 1px), linear-gradient(90deg, #E3ECF8 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-14 px-4 sm:px-6 md:gap-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div className="flex max-w-[480px] flex-col gap-4">
            <h2
              id="how-title"
              className="text-[32px] leading-[1.06] font-extrabold tracking-[-0.03em] text-ink md:text-[46px]"
            >
              From the plan set to a number you can bid.
            </h2>
            <p className="text-base leading-relaxed text-[#4A5260] md:text-lg">
              Four steps, and you can do every one of them from your phone.
            </p>
          </div>

          <Reveal from="right" className="min-w-0">
            <PosterVideo
              posterUrl={thumbnailUrl}
              videoUrl={videoUrl}
              label="Play the How it works video"
              sizes="(max-width: 1024px) 100vw, 720px"
              // Source is 1280x720, so 16/9 exactly — no crop, no letterbox.
              className="aspect-video w-full"
            />
          </Reveal>
        </div>

        <ol className="relative ml-4 grid gap-10 border-l-2 border-brand pl-8 md:ml-0 md:grid-cols-4 md:gap-0 md:border-t-2 md:border-l-0 md:pl-0 md:after:absolute md:after:-top-[11px] md:after:right-0 md:after:h-5 md:after:w-[2px] md:after:bg-brand">
          {steps.map((s, i) => (
            <li key={s.title} className="relative md:pr-8">
              {/* Dimension-line tick at the start of each segment. */}
              <span
                aria-hidden="true"
                className="absolute -top-[11px] left-0 hidden h-5 w-[2px] bg-brand md:block"
              />
              <span className="absolute top-0 -left-[49px] flex h-8 w-8 items-center justify-center rounded-md border-2 border-brand bg-white text-sm font-extrabold text-brand md:static md:-mt-[17px] md:ml-4">
                {i + 1}
              </span>
              <h3 className="text-lg font-extrabold text-ink md:mt-5">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#4A5260]">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
