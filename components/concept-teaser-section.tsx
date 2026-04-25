"use client";

import { useEffect } from "react";
import { SectionIntro } from "@/components/ui";
import { trackClientEvent } from "@/lib/analytics";
import { conceptTeasers } from "@/lib/content";

export function ConceptTeaserSection() {
  useEffect(() => {
    trackClientEvent("teaser_section_viewed", { section: "concept_teaser" });
  }, []);

  return (
    <section className="page-section">
      <div className="page-shell">
        <SectionIntro
          eyebrow="A clue, not a reveal"
          title="One Concept We’re Exploring"
          copy="We do have a direction in mind. For now, we’re keeping it abstract on purpose so the page validates the problem before it validates a polished answer."
        />
        <div
          className="grid"
          style={{ marginTop: 34, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
        >
          {conceptTeasers.map((item) => (
            <article
              key={item.title}
              className="glass-card"
              style={{ borderRadius: "28px", padding: 24, minHeight: 220 }}
            >
              <div style={{ color: "var(--accent-strong)", fontWeight: 800 }}>{item.eyebrow}</div>
              <h3 style={{ margin: "14px 0 10px", fontSize: "1.35rem" }}>{item.title}</h3>
              <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.7 }}>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
