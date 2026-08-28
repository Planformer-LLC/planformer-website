import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import { jsonLd, softwareApplicationSchema } from "@/lib/structuredData";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import TryItHere from "@/components/sections/TryItHere";
import WhyLoveIt from "@/components/sections/WhyLoveIt";
import SupportedTrades from "@/components/sections/SupportedTrades";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  // Title intentionally omitted so the root default (which already carries the
  // full value proposition) applies without the "| Planformer" suffix.
  description:
    "Turn a PDF plan set into quantities, assemblies and a priced estimate the same afternoon. Try a live takeoff in your browser — no sign-up. Mac, Windows, iPhone, iPad and Android.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(softwareApplicationSchema())}
      />
      <Hero />
      <HowItWorks />
      {/* Proves the workflow HowItWorks just described, while intent is highest */}
      <TryItHere />
      <SupportedTrades />
      <WhyLoveIt />
      <Testimonials />
      <FinalCTA />
    </SiteLayout>
  );
}
