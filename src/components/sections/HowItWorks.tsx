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
    title: "Upload your PDF or blueprint",
    desc: "Drop in any plan. Planformer prepares it for takeoff instantly.",
  },
  {
    title: "Measure and drop in assemblies",
    desc: "Measure areas, lines and counts, then add material and labor assemblies right on the takeoff.",
  },
  {
    title: "Export and share",
    desc: "Send everything to Excel or share clean reports with clients and your team.",
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="bg-[#F5F7FA] py-20 md:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 sm:px-6 md:gap-12">
        <Reveal>
          <div className="flex max-w-[640px] flex-col gap-3">
            <p className="text-[13px] font-bold tracking-[0.12em] text-[#0062CC] uppercase">
              How it works
            </p>
            <h2
              id="how-title"
              className="text-[28px] leading-[1.12] font-extrabold tracking-[-0.03em] text-ink md:text-[42px]"
            >
              From PDF to priced estimate in three steps.
            </h2>
          </div>
        </Reveal>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <ol className="flex flex-col gap-4">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal from="left" delay={i * 0.06}>
                  <div className="flex gap-[18px] rounded-[14px] border border-[#E3E6EB] bg-white p-[22px]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#E8F2FF] font-extrabold text-[#0062CC]">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-[#4A5260]">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal from="right" delay={0.1} className="min-w-0">
            <PosterVideo
              posterUrl={thumbnailUrl}
              videoUrl={videoUrl}
              label="Play the How it works video"
              sizes="(max-width: 1024px) 100vw, 680px"
              // Source is 1280x720, so 16/9 exactly — no crop, no letterbox.
              className="aspect-video w-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
