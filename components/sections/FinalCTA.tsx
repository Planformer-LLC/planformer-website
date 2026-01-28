import Reveal from "@/components/animations/Reveal";

export default function FinalCTA() {
  return (
    <section id="download" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="overflow-hidden rounded-3xl bg-black px-6 py-12 text-white md:px-12 md:py-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-extrabold md:text-4xl">Ready to take off faster?</h2>
              <p className="mt-3 text-white/70">
                Start your free trial and complete your first takeoff in minutes.
              </p>
              <a className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90" href="#">
                Download now
              </a>
            </div>
            <div className="aspect-[16/9] rounded-2xl bg-white/10" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
