import { SectionIntro } from "@/components/ui";
import { audienceCards } from "@/lib/content";

export function AudienceSection() {
  return (
    <section className="page-section">
      <div className="page-shell">
        <SectionIntro
          eyebrow="Audience"
          title="Who Might Feel This Most"
          copy="This is intentionally framed around daytime discovery, not nightlife. We’re trying to understand who most wants better ways to spend a few good hours in the city."
        />
        <div
          className="grid"
          style={{ marginTop: 34, gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}
        >
          {audienceCards.map((item) => (
            <article
              key={item.title}
              className="glass-card"
              style={{ borderRadius: "24px", padding: 22 }}
            >
              <div style={{ fontSize: "1.9rem" }} aria-hidden="true">
                {item.icon}
              </div>
              <h3 style={{ marginBottom: 8 }}>{item.title}</h3>
              <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.7 }}>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
