import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { pricingPlans, siteData } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using Planformer, including plans, free trials, billing, automatic renewal and how to cancel.",
  alternates: { canonical: "/terms" },
};

const [monthly, yearly] = pricingPlans;

export default function TermsPage() {
  const email = siteData.email;
  return (
    <LegalPage title="Terms of Service" updated="October 20, 2026" replaces="July 17, 2025">
      <div className="rounded-2xl border border-[#D6E6FF] bg-[#F2F7FF] px-6 py-5 text-[15px]">
        <p className="mb-2 text-xs font-extrabold tracking-[0.12em] text-ink uppercase">
          The short version
        </p>
        <ul>
          <li>
            Monthly is {monthly.price} a month with a {monthly.trialDays}-day free
            trial. Yearly is {yearly.price} a year with a {yearly.trialDays}-day free
            trial.
          </li>
          <li>Cancel before your trial ends and you will not be charged.</li>
          <li>
            Subscriptions renew automatically until you cancel. You keep access
            until the end of the period you paid for.
          </li>
          <li>Your plans and estimates belong to you.</li>
        </ul>
        <p className="mt-2 text-[13px] text-ink/70">
          This summary is for convenience. The full terms below apply.
        </p>
      </div>

      <p>
        These Terms of Service (“Terms”) govern your use of the Planformer
        website, web app and apps for Mac, Windows, iPhone, iPad and Android (the
        “Service”), provided by Planformer LLC (“Planformer”, “we”, “us”). By
        creating an account or using the Service you agree to these Terms. If you
        do not agree, do not use the Service.
      </p>

      <h2>1. Your account</h2>
      <p>
        You must be at least 18 years old to use the Service. Give accurate
        information when you sign up and keep it up to date. You are responsible
        for keeping your login details confidential and for everything that
        happens under your account. Accounts are for one person. Do not share
        your login. Team plans may be offered later under separate terms.
      </p>

      <h2>2. Plans and prices</h2>
      <p>
        Premium is available as a <strong>Monthly</strong> plan at{" "}
        <strong>{monthly.price} per month</strong> or a <strong>Yearly</strong> plan
        at <strong>{yearly.price} per year</strong>. Prices are in US dollars and do
        not include taxes, which may apply depending on where you live. Prices in
        the App Store or Google Play may differ by country and are shown before
        you buy. We may change prices in the future. If we do, we will tell you
        in advance, and the new price will apply from your next renewal. You can
        cancel before then.
      </p>

      <h2>3. Free trials</h2>
      <ul>
        <li>
          The Monthly plan includes a <strong>{monthly.trialDays}-day</strong> free
          trial and the Yearly plan a <strong>{yearly.trialDays}-day</strong> free
          trial.
        </li>
        <li>
          Free trials are for new subscribers only, one per customer. We may
          refuse a trial where we reasonably believe it has been used before.
        </li>
        <li>
          To start a trial you add a payment method.{" "}
          <strong>
            When the trial ends, your subscription starts and you are charged
            automatically
          </strong>{" "}
          unless you cancel before the trial ends.
        </li>
        <li>If you cancel during the trial, you will not be charged.</li>
      </ul>

      <h2>4. Billing and automatic renewal</h2>
      <p>
        You can subscribe on the web, where payments are processed securely by
        Stripe, or in our iPhone, iPad or Android app, where payments are
        processed by Apple or Google under their terms. On Mac and Windows,
        subscriptions are managed through the web app.
      </p>
      <p>
        Your subscription <strong>renews automatically</strong> at the end of each
        billing period, monthly or yearly, at the then-current price, and the
        payment method on file is charged, until you cancel. For App Store and
        Google Play subscriptions, turn off auto-renewal at least 24 hours before
        the end of the current period.
      </p>

      <h2>5. How to cancel</h2>
      <ul>
        <li>
          <strong>Subscribed on the web (including Mac and Windows):</strong> sign
          in at app.planformer.com, open your account settings and choose{" "}
          <em>Manage Subscription</em>.
        </li>
        <li>
          <strong>iPhone or iPad:</strong> Settings → your name → Subscriptions →
          Planformer → Cancel Subscription.
        </li>
        <li>
          <strong>Android:</strong> Google Play Store → your profile → Payments
          &amp; subscriptions → Subscriptions → Planformer → Cancel.
        </li>
      </ul>
      <p>
        When you cancel, you keep Premium until the end of the period you have
        already paid for. It then ends and is not renewed.
      </p>

      <h2>6. Refunds</h2>
      <p>
        Payments are non-refundable and we do not give credits for partial
        periods, except where required by law. Refunds for App Store and Google
        Play purchases are handled by Apple and Google under their policies. If
        you think you were charged in error, email{" "}
        <a href={`mailto:${email}`}>{email}</a> within 30 days of the charge and we
        will look into it.
      </p>

      <h2>7. Your content</h2>
      <p>
        You keep all rights to the plans, files, measurements and estimates you
        upload or create (“Your Content”). You give Planformer a limited,
        worldwide, royalty-free license to host, store, copy and process Your
        Content only to provide, secure and improve the Service for you. You
        confirm that you have the rights to upload Your Content and that it does
        not infringe anyone else’s rights or break any law. You are responsible
        for checking measurements, quantities and estimates before relying on
        them for bids or construction.
      </p>

      <h2>8. Our software and your license</h2>
      <p>
        The Service, including its software, design, trademarks and content,
        belongs to Planformer LLC and is protected by intellectual property laws.
        While your account is in good standing, we grant you a limited,
        non-exclusive, non-transferable, revocable license to use the Service for
        your own business purposes under these Terms. This section is also our
        End User License Agreement for our apps. For apps downloaded from the App
        Store, Apple’s standard license terms also apply, and Apple is not
        responsible for the app or its support.
      </p>
      <p>
        You must not, and must not let others: copy, modify or create derivative
        works of the Service; reverse-engineer, decompile or disassemble it;
        sell, rent, sublicense or distribute access to it; use it to build a
        competing product; remove proprietary notices; or try to bypass its
        security or access controls.
      </p>

      <h2>9. Acceptable use</h2>
      <p>
        Use the Service lawfully. Do not upload infringing, unlawful or malicious
        content; interfere with or compromise the Service or its security;
        misrepresent who you are; or violate anyone’s rights, including privacy
        and intellectual property rights.
      </p>

      <h2>10. Feedback and promotions</h2>
      <p>
        If you send us ideas or suggestions, we may use them without obligation
        to you. We may run promotions or offer coupons from time to time. Each
        promotion has its own terms, shown with the offer, and we may change or
        end a promotion at any time.
      </p>

      <h2>11. Availability</h2>
      <p>
        The Service is offered worldwide. You are responsible for following the
        laws that apply where you use it, including export rules. We work to keep
        the Service running but may change, suspend or discontinue features.
      </p>

      <h2>12. Disclaimers</h2>
      <p className="text-[15px]">
        THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE”, WITHOUT WARRANTIES OF
        ANY KIND, EXPRESS OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED BY LAW,
        PLANFORMER LLC DISCLAIMS ALL WARRANTIES, INCLUDING MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ACCURACY,
        RELIABILITY OR AVAILABILITY OF THE SERVICE. WE DO NOT WARRANT THAT THE
        SERVICE WILL BE UNINTERRUPTED, ERROR-FREE OR SECURE.
      </p>

      <h2>13. Limitation of liability</h2>
      <p className="text-[15px]">
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, PLANFORMER LLC AND ITS AFFILIATES
        WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
        EXEMPLARY OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST BUSINESS
        OPPORTUNITIES, LOSS OF DATA OR SERVICE INTERRUPTION, EVEN IF ADVISED OF
        THEIR POSSIBILITY. OUR TOTAL LIABILITY FOR ALL CLAIMS RELATING TO THE
        SERVICE WILL NOT EXCEED THE AMOUNT YOU PAID PLANFORMER LLC IN THE 12
        MONTHS BEFORE THE CLAIM.
      </p>

      <h2>14. Privacy</h2>
      <p>
        Our <Link href="/privacy">Privacy Policy</Link> explains how we collect,
        use and protect your information.
      </p>

      <h2>15. Suspension and termination</h2>
      <p>
        You can stop using the Service and delete your account at any time. We
        may suspend or end your access if you break these Terms or harm the
        Service, other users or us. When access ends, your license ends and you
        must stop using the Service. We may delete Your Content after a
        reasonable retention period unless the law requires us to keep it.
        Sections that by their nature should survive, such as 7, 12, 13 and 16,
        continue after termination.
      </p>

      <h2>16. Governing law and disputes</h2>
      <p>
        These Terms are governed by the laws of the State of New York, without
        regard to conflict-of-law rules. Any dispute arising from these Terms or
        the Service will be resolved by binding arbitration in New York, NY,
        under the rules of the American Arbitration Association. You and
        Planformer LLC each waive the right to a jury trial and to take part in a
        class action, except where the law does not allow this waiver.
      </p>

      <h2>17. Changes to these Terms</h2>
      <p>
        We may update these Terms. We will post the new version here with a new
        “Last updated” date and, for material changes, notify you by email or in
        the Service before they take effect. If you keep using the Service after
        changes take effect, you accept the updated Terms.
      </p>

      <h2>18. Contact</h2>
      <p>
        Planformer LLC, 1342 Boxwood Drive, W Hewlett, New York 11557, USA ·{" "}
        <a href={`mailto:${email}`}>{email}</a>
      </p>
    </LegalPage>
  );
}
