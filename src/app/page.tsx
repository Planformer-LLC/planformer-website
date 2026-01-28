import SiteLayout from "@/components/layout/SiteLayout";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyLoveIt from "@/components/sections/WhyLoveIt";
import SupportedTrades from "@/components/sections/SupportedTrades";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Page() {
  return (
    <SiteLayout>
      <Hero />
      <HowItWorks />
      <WhyLoveIt />
      <SupportedTrades />
      <Testimonials />
      <FinalCTA />
    </SiteLayout>
  );
}
