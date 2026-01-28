import Reveal from "@/components/animations/Reveal";
import { Play } from "lucide-react";

export default function HowItWorks() {
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
    <section className="pt-32 pb-20 md:pt-80">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="text-center">
          <h2 className="text-2xl font-black text-[#1A1A1A] md:text-3xl">
            How It Works
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-[0.6fr_1.3fr] md:items-center">
          {/* ✅ Video FIRST on mobile */}
          <Reveal className="order-1 md:order-2">
            <div className="h-[200px] w-full overflow-hidden rounded-2xl bg-black/10 md:h-[450px]">
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                  <Play size={18} className="text-[#1A1A1A]" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* ✅ Steps AFTER video on mobile */}
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
