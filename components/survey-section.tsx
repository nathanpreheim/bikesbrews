import { SectionIntro } from "@/components/ui";
import { ValidationForm } from "@/components/validation-form";

export function SurveySection() {
  return (
    <section id="survey" className="page-section" style={{ paddingTop: 28 }}>
      <div className="page-shell" style={{ display: "grid", gap: 24 }}>
        <div style={{ maxWidth: 1180 }}>
          <SectionIntro
            eyebrow="Main action"
            title="Help Shape What Gets Built"
            copy="Your feedback will help determine whether this idea deserves to exist. This should feel quick, conversational, and useful, not like homework."
          />
        </div>

        <div style={{ width: "100%" }}>
          <ValidationForm />
        </div>
      </div>
    </section>
  );
}
