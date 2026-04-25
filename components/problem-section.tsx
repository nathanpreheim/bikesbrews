import { SectionIntro } from "@/components/ui";
import { problemCards } from "@/lib/content";

export function ProblemSection() {
  return (
    <section id="what-we-are-exploring" className="page-section">
      <div className="page-shell">
        <SectionIntro
          eyebrow="Problem validation"
          title="What We’re Exploring"
          copy="We’re looking at whether Omaha has a real gap for daytime experiences that feel more social, more active, and easier to say yes to."
        />
        <div
          className="grid"
          style={{ marginTop: 34, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
        >
          {problemCards.map((item) => (
            <article
              key={item.title}
              className="glass-card"
              style={{ borderRadius: "26px", padding: 24 }}
            >
              <div
                style={{
                  color: "var(--gold)",
                  fontWeight: 800,
                  fontSize: ".85rem",
                  textTransform: "uppercase",
                  letterSpacing: ".08em"
                }}
              >
                {item.eyebrow}
              </div>
              <h3 style={{ margin: "14px 0 10px", fontSize: "1.35rem" }}>{item.title}</h3>
              <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.7 }}>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
