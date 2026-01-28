import Reveal from "@/components/animations/Reveal";

export default function WhyLoveIt() {
  const items = [
    { title: "Speed", desc: "Cut takeoff time by up to 90 percent." },
    { title: "Precision", desc: "Reduces manual errors and repeat work." },
    { title: "Multiplatform", desc: "Use the takeoff tools for precise measurements." },
    { title: "Accessibility", desc: "Easy to use even on the first try." },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2 md:items-center">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-black/5 shadow-sm">
            <div className="aspect-[4/3] w-full bg-black/10" />
          </div>
        </Reveal>

        <Reveal>
          <h2 className="text-2xl font-bold md:text-3xl">Why Contractors and Estimators Love It</h2>
          <div className="mt-6 space-y-5">
            {items.map((i) => (
              <div key={i.title} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                <p className="font-semibold">{i.title}</p>
                <p className="text-sm text-black/70">{i.desc}</p>
              </div>
            ))}
          </div>

          <a href="#download" className="mt-7 inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
            Download now
          </a>
        </Reveal>
      </div>
    </section>
  );
}
