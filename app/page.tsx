import { EmailCtaSection } from "@/components/email-cta-section";
import { HeroSection } from "@/components/hero-section";
import { SurveySection } from "@/components/survey-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SurveySection />
      <EmailCtaSection />
    </main>
  );
}
