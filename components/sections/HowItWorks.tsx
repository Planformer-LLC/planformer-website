import Reveal from "@/components/animations/Reveal";

export default function HowItWorks() {
  const steps = [
    { n: "1", title: "Upload Your PDF or Blueprint", desc: "Drop in any plan. The system instantly prepares it for takeoff." },
    { n: "2", title: "Drag and Drop Assemblies", desc: "Add material and labor assemblies directly onto your takeoff." },
    { n: "3", title: "Export and Share", desc: "Send everything to Excel or share clean reports with clients." },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
        <Reveal>
          <h2 className="text-2xl font-bold md:text-3xl">How It Works</h2>
          <div className="mt-6 space-y-5">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-4">
                <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-blue-600/10 text-center text-sm font-bold leading-8 text-blue-700">
                  {s.n}
                </div>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-sm text-black/70">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-2xl border border-black/10 bg-black/5 p-6 shadow-sm">
            <div className="flex aspect-video items-center justify-center rounded-xl bg-white/60">
              <div className="h-12 w-12 rounded-full bg-white shadow-sm" />
            </div>
            <p className="mt-3 text-center text-sm text-black/60">Video placeholder</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
