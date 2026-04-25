"use client";

import { useState } from "react";
import { SectionIntro } from "@/components/ui";
import { trackClientEvent } from "@/lib/analytics";

export function EmailCtaSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = (await response.json()) as { ok: boolean; message: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Submission failed");
      }

      trackClientEvent("email_submit", { source: "repeated_cta" });
      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Try again.");
    }
  }

  return (
    <section id="early-access" className="page-section">
      <div
        className="page-shell glass-card"
        style={{
          borderRadius: "36px",
          padding: "32px 24px",
          background:
            "linear-gradient(135deg, rgba(250,248,242,0.96), rgba(220,235,255,0.82) 58%, rgba(242,140,40,0.14))"
        }}
      >
        <SectionIntro
          eyebrow="Stay close"
          title="Want first access when we reveal more?"
          copy="Leave your email if you want the first update when the concept becomes more concrete."
        />
        <form
          onSubmit={handleSubmit}
          style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}
        >
          <label style={{ flex: "1 1 280px" }}>
            <span className="sr-only">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@omaha.com"
            />
          </label>
          <button
            type="submit"
            className="button button-primary"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Submitting..." : "Get Early Access"}
          </button>
        </form>
        {message ? (
          <p
            style={{
              marginTop: 16,
              color: status === "error" ? "#8c2f1b" : "var(--accent-strong)",
              fontWeight: 600
            }}
          >
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
