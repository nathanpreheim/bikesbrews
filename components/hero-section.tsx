"use client";

import Image from "next/image";
import heroImage from "../Hero Image.png";
import { ButtonLink, Pill } from "@/components/ui";
import { trackClientEvent } from "@/lib/analytics";

export function HeroSection() {
  return (
    <section className="page-section" style={{ paddingTop: 28 }}>
      <div
        className="page-shell glass-card"
        style={{
          paddingTop: 28,
          paddingBottom: 28,
          paddingInline: 24,
          position: "relative",
          overflow: "hidden",
          borderRadius: "40px",
          minHeight: "76vh",
          display: "flex",
          alignItems: "flex-end"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none"
          }}
        >
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "58% 78%",
              opacity: 0.42,
              transform: "scale(1.02)"
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(250,248,242,0.86) 0%, rgba(250,248,242,0.7) 34%, rgba(250,248,242,0.38) 62%, rgba(220,235,255,0.12) 100%)"
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(250,248,242,0.18) 0%, rgba(250,248,242,0.05) 38%, rgba(250,248,242,0.2) 100%)"
            }}
          />
        </div>

        <div style={{ position: "relative", display: "grid", gap: 24, maxWidth: 1280, paddingBottom: 8 }}>
          <Pill>bikesandbrews.co</Pill>
          <div>
            <h1
              className="section-title"
              style={{ fontSize: "clamp(3.3rem, 11vw, 7rem)", maxWidth: 1400 }}
            >
              Is Omaha Missing Better Daytime Experiences?
            </h1>
            <p className="section-copy" style={{ fontSize: "1.2rem", maxWidth: 1120 }}>
              We&apos;re researching whether Omaha needs more fun, social, active ways to discover
              neighborhoods and local gems. We have a concept in mind, but first we&apos;re validating
              the need.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <ButtonLink
              href="#survey"
              variant="primary"
              onClick={() =>
                trackClientEvent("primary_cta_click", { label: "Take the 2-Minute Survey" })
              }
            >
              Take the 2-Minute Survey
            </ButtonLink>
            <ButtonLink
              href="#early-access"
              variant="secondary"
              onClick={() =>
                trackClientEvent("secondary_cta_click", { label: "Get Early Access" })
              }
            >
              Get Early Access
            </ButtonLink>
          </div>

          <p style={{ margin: 0, color: "var(--muted)", fontWeight: 600 }}>
            Yes, the domain name is a clue.
          </p>
        </div>
      </div>
    </section>
  );
}
