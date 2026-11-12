import Link from "next/link";
import { Check, Globe, Laptop, Monitor, Smartphone, Tablet } from "lucide-react";
import { premiumFeatures, pricingPlans, siteData } from "@/data/siteData";

const monthly = pricingPlans.find((p) => p.id === "monthly")!;
/** What a year costs on the monthly plan, shown crossed out on Yearly. */
const twelveMonths = `$${(monthly.amount * 12).toFixed(2)}`;

const devices = [
  { label: "Mac", Icon: Laptop },
  { label: "Windows", Icon: Monitor },
  { label: "Web", Icon: Globe },
  { label: "iPhone", Icon: Smartphone },
  { label: "iPad", Icon: Tablet },
  { label: "Android", Icon: Smartphone },
];

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
      className="scroll-mt-24 border-t border-[#E3ECF8] bg-[#F6F9FE] py-12 md:py-16"
      style={{
        backgroundImage:
          "linear-gradient(#E3ECF8 1px, transparent 1px), linear-gradient(90deg, #E3ECF8 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="pricing-title"
            className="text-[32px] leading-[1.06] font-extrabold tracking-[-0.03em] text-ink md:text-[46px]"
          >
            One price. Every device.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4A5260] md:text-lg">
            Monthly or yearly. Both include every feature and a free trial.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[944px] gap-6 md:grid-cols-2">
          {pricingPlans.map((plan) => {
            const featured = "badge" in plan;
            return (
              <div
                key={plan.id}
                // Phones show the best-value plan first; side by side keeps
                // Monthly on the left.
                className={`relative flex flex-col gap-5 rounded-[20px] bg-white p-7 md:p-9 ${
                  featured
                    ? "order-first border-2 border-brand shadow-[0_24px_50px_rgba(15,131,255,0.16)] md:order-none"
                    : "border border-[#D7E2F1]"
                }`}
              >
                {featured ? (
                  <span className="absolute -top-3.5 left-7 rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold text-white md:left-9">
                    {plan.badge}
                  </span>
                ) : null}

                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-extrabold text-ink md:text-[22px]">{plan.name}</h3>
                  <span className="text-sm font-semibold text-[#1B7F3A]">
                    {plan.trialDays} days free
                  </span>
                </div>

                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-5xl font-extrabold tracking-tight text-ink">
                    {plan.price}
                  </span>
                  <span className="text-base text-ink/70">/ {plan.period}</span>
                  {featured ? (
                    <span className="text-lg font-semibold text-[#D32F2F] line-through decoration-2">
                      <span className="sr-only">instead of </span>
                      {twelveMonths}
                    </span>
                  ) : null}
                </p>
                <p className="-mt-2 text-[15px] text-[#4A5260]">
                  {featured ? "$33.25 a month, billed once a year." : plan.note}
                </p>

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
            );
          })}
        </div>

        <div className="mx-auto mt-6 max-w-[944px] rounded-2xl border border-[#D7E2F1] bg-white px-6 py-6 md:px-8">
          <p className="text-base font-extrabold text-ink">One account works on all of these</p>
          <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
            {devices.map(({ label, Icon }) => (
              <li
                key={label}
                className="flex flex-col items-center gap-1.5 rounded-xl bg-[#F2F7FF] px-2 py-3 text-[13px] font-bold text-[#0A5FC2]"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
          <ul className="mt-6 grid gap-x-6 gap-y-3 border-t border-[#EEF1F5] pt-5 sm:grid-cols-2">
            {premiumFeatures.map((f) => (
              <li key={f} className="flex gap-2.5 text-[15px] text-ink/85">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#0A7A1E]" aria-hidden="true" />
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
