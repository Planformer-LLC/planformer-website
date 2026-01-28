import Reveal from "@/components/animations/Reveal";

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="text-center">
          <p className="text-sm font-medium text-blue-700">Testimonials</p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">What users say</h2>
        </Reveal>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-black/10 bg-white p-6 text-center shadow-sm">
          <p className="text-black/70">
            “Switching to this software cut our takeoff time dramatically. Accurate, easy to use, and perfect for our team.”
          </p>
          <div className="mt-5 text-sm font-semibold">Abdullah Khan</div>
          <div className="text-xs text-black/60">Aztech Contractors</div>

          <div className="mt-5 flex justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="h-2 w-2 rounded-full bg-black/15" />
            <span className="h-2 w-2 rounded-full bg-black/15" />
          </div>
        </div>
      </div>
    </section>
  );
}
