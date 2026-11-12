import { Star } from "lucide-react";
import { platforms } from "@/data/siteData";

const appStoreUrl = platforms.find((p) => p.id === "ios")!.href;

/**
 * Real App Store reviews only, quoted as written (trimmed where marked with
 * an ellipsis). Names are the reviewers' App Store nicknames. Do not add
 * invented or paraphrased reviews here.
 */
const reviews = [
  {
    title: "Game Changer",
    quote:
      "I have been using PlanSwift on my laptop for years, but I always wished there was a mobile solution I could use on the go—especially on my iPhone and, more importantly, my iPad. Planformer has completely solved that problem. Now I can easily measure and double-check my takeoffs directly from my phone or iPad while visiting project sites.",
    name: "A J 84",
  },
  {
    title: "Great estimating app with excellent customer service",
    quote:
      "Planformer is a very good app for creating estimates based on construction plans. It has plenty of useful tools, but what stands out the most is the customer service, which is very responsive…",
    name: "LitoAlejandro",
  },
  {
    title: "Great app",
    quote: "Very user friendly and helpful for projects. Highly recommend!",
    name: "Harel M.",
  },
];

function Stars() {
  return (
    <span className="flex gap-0.5 text-[#F5A524]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
      ))}
    </span>
  );
}

/** Server component: all reviews visible and indexable, no rotation. */
export default function Testimonials() {
  const [lead, ...rest] = reviews;

  return (
    <section
      aria-labelledby="reviews-title"
      className="border-t border-[#E3ECF8] bg-[#F6F9FE] py-20 md:py-28"
      style={{
        backgroundImage:
          "linear-gradient(#E3ECF8 1px, transparent 1px), linear-gradient(90deg, #E3ECF8 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2
            id="reviews-title"
            className="max-w-[620px] text-[32px] leading-[1.06] font-extrabold tracking-[-0.03em] text-ink md:text-[46px]"
          >
            What contractors say on the App Store.
          </h2>
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[#D7E2F1] bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand md:self-auto"
          >
            <Stars />
            5.0 on the App Store
          </a>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <figure className="flex flex-col gap-5 rounded-2xl border-2 border-brand bg-white p-7 md:p-9">
            <Stars />
            <p className="text-lg font-extrabold text-ink">{lead.title}</p>
            <blockquote className="text-[19px] leading-relaxed text-ink md:text-[21px]">
              &ldquo;{lead.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-auto text-[15px] text-[#4A5260]">
              <strong className="text-ink">{lead.name}</strong>, App Store review
            </figcaption>
          </figure>

          <div className="grid gap-5">
            {rest.map((r) => (
              <figure
                key={r.name}
                className="flex flex-col gap-3 rounded-2xl border border-[#D7E2F1] bg-white p-6 md:p-7"
              >
                <Stars />
                <p className="font-extrabold text-ink">{r.title}</p>
                <blockquote className="text-base leading-relaxed text-ink">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto text-sm text-[#4A5260]">
                  <strong className="text-ink">{r.name}</strong>, App Store review
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
