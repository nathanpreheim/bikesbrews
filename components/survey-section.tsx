import { SectionIntro } from "@/components/ui";
import { ValidationForm } from "@/components/validation-form";

export function SurveySection() {
  return (
    <section id="survey" className="page-section" style={{ paddingTop: 12, paddingBottom: 32 }}>
      <div className="page-shell" style={{ display: "grid", gap: 22 }}>
        <div style={{ maxWidth: 1180 }}>
          <SectionIntro
            title="Would You Use This?"
            copy="We’re testing demand for a new Omaha experience. Tell us what sounds interesting and what doesn’t."
          />
        </div>

        <div style={{ width: "100%" }}>
          <ValidationForm />
        </div>
      </div>
    </section>
  );
}
