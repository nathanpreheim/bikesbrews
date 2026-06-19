"use client";

import { useRef, useState } from "react";
import {
  audienceOptions,
  bikingAppealOptions,
  experienceOptions,
  likelihoodOptions,
  priceOptions,
  problemTruthOptions,
  storytellingOptions
} from "@/lib/content";
import { trackClientEvent } from "@/lib/analytics";
import { InterestFormPayload } from "@/lib/interest-form";

const initialForm: InterestFormPayload = {
  email: "",
  audienceType: "",
  coreProblem: "",
  appealingExperience: "",
  selfGuidedInterest: "",
  bikingAppeal: "",
  storytellingInterest: "",
  premiumPrice: "",
  areaSuggestion: "",
  additionalNotes: ""
};

export function ValidationForm() {
  const [form, setForm] = useState<InterestFormPayload>(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const trackedStartRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  function updateField<K extends keyof InterestFormPayload>(key: K, value: InterestFormPayload[K]) {
    if (!trackedStartRef.current) {
      trackClientEvent("survey_started", { source: "validation_form" });
      trackedStartRef.current = true;
    }

    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = (await response.json()) as { ok: boolean; message: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Submission failed");
      }

      trackClientEvent("survey_completed", {
        selfGuidedInterest: form.selfGuidedInterest,
        premiumPrice: form.premiumPrice
      });
      setStatus("success");
      setMessage(data.message);
      setForm(initialForm);
      setStep(1);
      trackedStartRef.current = false;
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <form
      ref={formRef}
      className="glass-card"
      style={{ borderRadius: "32px", padding: 24 }}
      onSubmit={handleSubmit}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
        <div>
          <div style={{ color: "var(--accent-strong)", fontWeight: 800 }}>
            Quick Validation Survey
          </div>
          <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>
            Takes about a minute. Honest reactions are most helpful.
          </p>
        </div>
        <div style={{ color: "var(--muted)", fontWeight: 700 }}>Step {step} of 3</div>
      </div>

      {step === 1 ? (
        <div className="grid" style={{ marginTop: 24 }}>
          <Field label="Which best describes you?" required>
            <select
              required
              value={form.audienceType}
              onChange={(event) => updateField("audienceType", event.target.value)}
            >
              <option value="">Select one</option>
              {audienceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Which feels most true?" required>
            <select
              required
              value={form.coreProblem}
              onChange={(event) => updateField("coreProblem", event.target.value)}
            >
              <option value="">Choose the closest fit</option>
              {problemTruthOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Which kind of experience sounds most appealing?" required>
            <select
              required
              value={form.appealingExperience}
              onChange={(event) => updateField("appealingExperience", event.target.value)}
            >
              <option value="">Choose one</option>
              {experienceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              setStep(2);
              formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            disabled={!form.audienceType || !form.coreProblem || !form.appealingExperience}
          >
            Continue
          </button>
        </div>
      ) : step === 2 ? (
        <div className="grid" style={{ marginTop: 24 }}>
          <Field label="How likely are you to try a self-guided local experience if it felt well-designed?" required>
            <select
              required
              value={form.selfGuidedInterest}
              onChange={(event) => updateField("selfGuidedInterest", event.target.value)}
            >
              <option value="">Choose one</option>
              {likelihoodOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Would biking make something like this:" required>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}>
              {bikingAppealOptions.map((option) => (
                <ChoiceButton
                  key={option}
                  active={form.bikingAppeal === option}
                  onClick={() => updateField("bikingAppeal", option)}
                >
                  {option}
                </ChoiceButton>
              ))}
            </div>
          </Field>

          <Field label="Would optional storytelling or audio guidance make it more interesting?" required>
            <select
              required
              value={form.storytellingInterest}
              onChange={(event) => updateField("storytellingInterest", event.target.value)}
            >
              <option value="">Select one</option>
              {storytellingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field label="What would feel fair for a premium version?" required>
            <select
              required
              value={form.premiumPrice}
              onChange={(event) => updateField("premiumPrice", event.target.value)}
            >
              <option value="">Choose one</option>
              {priceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="button" className="button button-secondary" onClick={() => setStep(1)}>
              Back
            </button>
            <button
              type="button"
              className="button button-primary"
              onClick={() => {
                setStep(3);
                formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              disabled={!form.selfGuidedInterest || !form.bikingAppeal || !form.storytellingInterest || !form.premiumPrice}
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div className="grid" style={{ marginTop: 24 }}>
          <Field label="What neighborhood, district, or local area should definitely be included?">
            <textarea
              rows={3}
              value={form.areaSuggestion}
              onChange={(event) => updateField("areaSuggestion", event.target.value)}
              placeholder="Benson, Blackstone, Aksarben, Dundee, downtown, Little Bohemia..."
            />
          </Field>

          <Field label="Email for updates" required>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@omaha.com"
            />
          </Field>

          <Field label="Anything else we should know?" helper="Optional">
            <textarea
              rows={4}
              value={form.additionalNotes}
              onChange={(event) => updateField("additionalNotes", event.target.value)}
              placeholder="Anything that would make this feel more useful, social, accessible, or worth trying"
            />
          </Field>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="button" className="button button-secondary" onClick={() => setStep(2)}>
              Back
            </button>
            <button
              type="submit"
              className="button button-primary"
              disabled={status === "submitting" || !form.email}
            >
              {status === "submitting" ? "Submitting..." : "Share My Input"}
            </button>
          </div>
        </div>
      )}

      {message ? (
        <p
          style={{
            marginTop: 18,
            color: status === "error" ? "#8c2f1b" : "var(--accent-strong)",
            fontWeight: 600
          }}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  children,
  required = false,
  helper
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  helper?: string;
}) {
  return (
    <label style={{ display: "grid", gap: 10 }}>
      <span style={{ fontWeight: 700 }}>
        {label}
        {required ? " *" : ""}
        {helper ? <span style={{ color: "var(--muted)", fontWeight: 500 }}> {helper}</span> : null}
      </span>
      {children}
    </label>
  );
}

function ChoiceButton({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        minHeight: 48,
        padding: "0 14px",
        borderRadius: 18,
        border: active ? "1px solid var(--accent)" : "1px solid rgba(30, 79, 168, 0.14)",
        background: active ? "rgba(220, 235, 255, 0.72)" : "rgba(255,255,255,0.7)",
        color: "var(--foreground)",
        fontWeight: 700
      }}
    >
      {children}
    </button>
  );
}
