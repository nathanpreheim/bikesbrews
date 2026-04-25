import { AudienceSection } from "@/components/audience-section";
import { ConceptTeaserSection } from "@/components/concept-teaser-section";
import { EmailCtaSection } from "@/components/email-cta-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { SurveySection } from "@/components/survey-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SurveySection />
      <ProblemSection />
      <AudienceSection />
      <ConceptTeaserSection />
      <EmailCtaSection />
      <Footer />
    </main>
  );
}
