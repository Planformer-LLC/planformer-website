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

export default function HowItWorks() {
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
          <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
            How It Works
          </h2>
        </Reveal>

        {/* Steps as a row above the video */}
        <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div>
                <p className="text-lg font-extrabold" style={{ color: s.color }}>
                  {s.n}
                </p>
                <p className="mt-3 text-base font-extrabold text-ink">
                  {s.title}
                </p>
                <p className="mt-2 text-sm text-ink/70">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Full-width video */}
        <Reveal delay={0.1}>
          <div className="mt-12 md:mt-14">
            <PosterVideo
              posterUrl={thumbnailUrl}
              videoUrl={videoUrl}
              label="Play the How It Works video"
              className="aspect-[45/32] w-full md:aspect-[16/9]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
