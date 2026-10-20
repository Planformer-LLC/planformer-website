import Link from "next/link";
import { Check } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { premiumFeatures, pricingPlans, siteData } from "@/data/siteData";

/**
 * Web (Stripe) plans. Both buttons go to the same sign-up; the plan is chosen
 * on the paywall after the account exists, which is where the trial starts.
 */
export default function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      // The header is fixed; keep the heading clear of it on /#pricing.
      className="scroll-mt-24 bg-[#F2F7FF] py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold tracking-[0.16em] text-brand uppercase">
              Pricing
            </p>
            <h2
              id="pricing-title"
              className="mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-[44px] md:leading-[1.1]"
            >
              Simple pricing. Free to start.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70 md:text-lg">
              Every plan includes all Premium features. Cancel before your trial
              ends and you won’t be charged.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[944px] gap-6 md:grid-cols-2">
          {pricingPlans.map((plan, i) => {
            const featured = "badge" in plan;
            return (
              <Reveal
                key={plan.id}
                from="bottom"
                delay={0.1 * i}
                // Phones show the best-value plan first; side by side keeps
                // Monthly on the left.
                className={featured ? "order-first md:order-none" : undefined}
              >
                <div
                  className={`relative flex h-full flex-col gap-5 rounded-[20px] bg-white p-7 md:p-9 ${
                    featured
                      ? "border-2 border-brand shadow-[0_24px_50px_rgba(15,131,255,0.16)]"
                      : "border border-black/10"
                  }`}
                >
                  {featured ? (
                    <span className="absolute -top-3.5 left-7 rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold text-white md:left-9">
                      {plan.badge}
                    </span>
                  ) : null}

                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-extrabold text-ink md:text-[22px]">
                      {plan.name}
                    </h3>
                    <span className="rounded-full bg-[#E6F6E9] px-3 py-1.5 text-xs font-bold text-[#0A6A1C]">
                      {plan.trialDays}-day free trial
                    </span>
                  </div>

                  <p className="flex items-baseline gap-1.5">
                    <span className="text-5xl font-extrabold tracking-tight text-ink">
                      {plan.price}
                    </span>
                    <span className="text-base text-ink/70">/ {plan.period}</span>
                  </p>
                  <p className="-mt-2 text-[15px] text-ink/70">{plan.note}</p>

                  <a
                    href={siteData.signupHref}
                    className={`mt-auto inline-flex h-14 items-center justify-center rounded-xl text-base font-bold transition active:scale-[0.98] ${
                      featured
                        ? "bg-brand text-white hover:bg-brand-hover"
                        : "border-2 border-brand bg-white text-brand hover:bg-brand hover:text-white"
                    }`}
                  >
                    Start free trial
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mx-auto mt-6 max-w-[944px] rounded-2xl border border-black/10 bg-white px-6 py-6 md:px-8">
          <p className="text-[15px] font-bold text-ink">Both plans include</p>
          <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {premiumFeatures.map((f) => (
              <li key={f} className="flex gap-2.5 text-[15px] text-ink/85">
                <Check
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#0A7A1E]"
                  aria-hidden="true"
                />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-[13px] leading-relaxed text-ink/60">
          Free trial for new subscribers, one per customer. Prices in USD; taxes
          may apply. Subscriptions renew automatically until cancelled. See our{" "}
          <Link href="/terms" className="underline underline-offset-2 hover:text-ink">
            Terms of Service
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
