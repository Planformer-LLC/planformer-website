import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { siteData } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Planformer LLC collects, uses and protects your information across the Planformer website, web app and apps.",
  alternates: { canonical: "/privacy" },
};

const contents = [
  ["who", "Who we are"],
  ["collect", "Information we collect"],
  ["cookies", "Cookies and tracking"],
  ["use", "How we use information"],
  ["share", "Who we share it with"],
  ["payments", "Payments"],
  ["retention", "How long we keep it"],
  ["security", "Security"],
  ["rights", "Your rights and choices"],
  ["children", "Children"],
  ["transfers", "International transfers"],
  ["changes", "Changes and contact"],
] as const;

export default function PrivacyPage() {
  const email = siteData.email;
  return (
    <LegalPage title="Privacy Policy" updated="October 19, 2026" replaces="July 2, 2025">
      <nav
        aria-label="Contents"
        className="rounded-2xl border border-black/10 px-6 py-5 text-[15px] [&_a]:no-underline hover:[&_a]:underline"
      >
        <p className="mb-2 text-xs font-extrabold tracking-[0.12em] text-ink uppercase">
          Contents
        </p>
        <ol className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
          {contents.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
        </ol>
      </nav>

      <p>
        This Privacy Policy explains how Planformer LLC (“Planformer”, “we”, “us”)
        collects, uses and shares information when you use our website
        (planformer.com), our web app (app.planformer.com) and our apps for Mac,
        Windows, iPhone, iPad and Android (together, the “Service”). By using the
        Service you agree to this policy.
      </p>

      <h2 id="who">1. Who we are</h2>
      <p>
        Planformer LLC, 1342 Boxwood Drive, W Hewlett, New York 11557, USA.
        Questions about privacy: <a href={`mailto:${email}`}>{email}</a>.
      </p>

      <h2 id="collect">2. Information we collect</h2>
      <p>
        <strong>Account information.</strong> When you sign up we collect your
        name, email address, organization, phone number and password. Passwords
        are handled by our sign-in provider and are never stored by us in
        readable form.
      </p>
      <p>
        <strong>Your project content.</strong> Plans, PDFs and images you upload,
        and the measurements, assemblies, prices and estimates you create. We
        store this to provide the Service to you.
      </p>
      <p>
        <strong>Subscription information.</strong> Your plan, trial and renewal
        dates and payment status. Card details are collected by our payment
        providers, not by us (see section 6).
      </p>
      <p>
        <strong>Usage and device data.</strong> Collected automatically: IP
        address, browser and device type, operating system, app version, pages
        and screens viewed, features used, time and date of use, crash reports
        and similar diagnostic data.
      </p>
      <p>
        <strong>With your permission.</strong> Our apps may ask to use your
        location, camera or photo library to provide specific features. You can
        turn this off at any time in your device settings.
      </p>
      <p>
        <strong>Communications.</strong> Messages you send us, and your choices
        about marketing email and push notifications.
      </p>

      <h2 id="cookies">3. Cookies and similar technologies</h2>
      <p>
        We and our partners use cookies, pixels, SDKs and similar technologies to
        run the Service, understand how it is used and measure our advertising.
        These include:
      </p>
      <ul>
        <li>
          <strong>Google Analytics and Google Ads</strong> (website, web app and
          apps), to measure visits and sign-ups and to tell whether our ads work,
          including which ad led to a free trial.
        </li>
        <li>
          <strong>Microsoft Clarity</strong> (website and apps), to see how people
          use our pages and screens so we can improve them.
        </li>
        <li>
          <strong>Meta (Facebook) SDK</strong> (mobile apps), to measure installs,
          sign-ups and subscriptions from our ads.
        </li>
        <li>
          <strong>Apple Search Ads attribution</strong> (iPhone and iPad), to tell
          whether an install came from an Apple ad.
        </li>
      </ul>
      <p>
        You can block or delete cookies in your browser settings, reset or limit
        your advertising ID in your device settings, and manage Google ad
        personalization at{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          adssettings.google.com
        </a>
        . On iPhone and iPad we only use cross-app tracking if you allow it when
        asked.
      </p>

      <h2 id="use">4. How we use information</h2>
      <ul>
        <li>To provide, maintain and secure the Service and your account.</li>
        <li>To process subscriptions and free trials and to manage billing.</li>
        <li>To give support and answer your requests.</li>
        <li>To send service messages such as security notices, billing messages and receipts.</li>
        <li>
          To send product news and offers if you opted in. You can unsubscribe at
          any time from the link in any email.
        </li>
        <li>To analyze usage, fix problems and improve the Service.</li>
        <li>To measure the effectiveness of our advertising.</li>
        <li>
          To comply with the law and enforce our{" "}
          <Link href="/terms">Terms of Service</Link>.
        </li>
      </ul>

      <h2 id="share">5. Who we share it with</h2>
      <p>
        <strong>We do not sell your personal information.</strong> We share it
        only as follows:
      </p>
      <ul>
        <li>
          <strong>Service providers</strong> that run parts of the Service for us
          under contract: Google Cloud and Firebase (hosting, sign-in, database,
          file storage and analytics), Stripe (web payments), Apple and Google
          (app store payments), RevenueCat (subscription management), Microsoft
          Clarity, Meta, and our email delivery provider.
        </li>
        <li>
          <strong>Advertising partners</strong> (Google and Meta), limited to the
          measurement described in section 3.
        </li>
        <li>
          <strong>Other people you choose to share with</strong>, for example when
          you send an estimate or report to a client.
        </li>
        <li>
          <strong>Legal and safety reasons</strong>: when required by law or valid
          requests from public authorities, or to protect the rights, property or
          safety of Planformer, our users or the public.
        </li>
        <li>
          <strong>Business transfers</strong>: in a merger, acquisition or sale of
          assets. We will give notice before your information becomes subject to a
          different privacy policy.
        </li>
        <li>
          <strong>With your consent</strong>, for any other purpose.
        </li>
      </ul>

      <h2 id="payments">6. Payments</h2>
      <p>
        Subscriptions bought on the web are processed by Stripe. Subscriptions
        bought in our iPhone, iPad or Android apps are processed by Apple or
        Google. These providers collect and store your card or payment details
        under their own privacy policies. We receive only what we need to manage
        your subscription, such as your plan, trial dates and payment status. We
        never receive or store your full card number.
      </p>

      <h2 id="retention">7. How long we keep it</h2>
      <p>
        We keep your account information and project content for as long as your
        account is active. If you delete your account, we delete or anonymize
        your personal information within a reasonable time, except where we must
        keep it longer, for example billing records for tax and accounting, or to
        resolve disputes. Usage data is generally kept for a shorter time unless
        it is needed for security or to improve the Service.
      </p>

      <h2 id="security">8. Security</h2>
      <p>
        We use commercially reasonable safeguards, including encryption in
        transit and access controls, to protect your information. No method of
        transmission over the internet or of electronic storage is 100% secure,
        so we cannot guarantee absolute security.
      </p>

      <h2 id="rights">9. Your rights and choices</h2>
      <p>
        <strong>Everyone.</strong> You can update your details in your account
        settings, delete your account from the app’s account settings or by
        emailing us, unsubscribe from marketing email at any time, and turn off
        push notifications and device permissions in your device settings.
      </p>
      <p>
        <strong>California and other US states.</strong> Depending on where you
        live, you may have the right to know what personal information we
        collect, use and disclose; to access, correct and delete it; to opt out
        of the “sharing” of personal information for cross-context behavioral
        (targeted) advertising; to limit the use of sensitive personal
        information; and not to be discriminated against for using these rights.
        To use any of them, or to opt out of sharing for targeted advertising,
        email <a href={`mailto:${email}`}>{email}</a>. We may need to verify your
        identity. Authorized agents may need to show proof of authorization.
      </p>
      <p>
        <strong>EEA, UK and Switzerland.</strong> You have the right to access,
        correct, delete, restrict or object to our processing of your personal
        data, to data portability, and to withdraw consent at any time. You may
        also complain to your local data protection authority. Our legal bases
        are the performance of our contract with you, your consent, our
        legitimate interests (such as improving and securing the Service) and
        legal obligations.
      </p>

      <h2 id="children">10. Children</h2>
      <p>
        Planformer is a business tool for adults. You must be 18 or older to use
        it. We do not knowingly collect personal information from children under
        13 (or under 16 in the EEA and UK). If you believe a child has given us
        personal information, contact us and we will delete it.
      </p>

      <h2 id="transfers">11. International transfers</h2>
      <p>
        We are based in the United States, and our service providers may process
        information in the US and other countries whose data protection laws may
        differ from yours. Where required, we use appropriate safeguards, such as
        standard contractual clauses, for these transfers.
      </p>

      <h2 id="changes">12. Changes and contact</h2>
      <p>
        We may update this policy from time to time. We will post the new version
        on this page with a new “Last updated” date, and for significant changes
        we will notify you by email or in the Service before they take effect.
        Our website and apps may link to other sites we do not control; their own
        privacy policies apply.
      </p>
      <p>
        Questions or requests: <a href={`mailto:${email}`}>{email}</a> ·
        Planformer LLC, 1342 Boxwood Drive, W Hewlett, New York 11557, USA.
      </p>
    </LegalPage>
  );
}
