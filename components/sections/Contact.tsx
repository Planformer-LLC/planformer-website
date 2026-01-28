import Reveal from "@/components/animations/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold md:text-3xl">Contact</h2>
          <p className="mt-2 text-black/70">Email: sales@planformer.com</p>
        </Reveal>
      </div>
    </section>
  );
}
