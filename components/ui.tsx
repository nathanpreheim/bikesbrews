import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

export function SectionIntro({
  eyebrow,
  title,
  copy
}: {
  eyebrow?: string;
  title: string;
  copy: string;
}) {
  return (
    <div>
      {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
      <h2 className="section-title">{title}</h2>
      <p className="section-copy">{copy}</p>
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        padding: "8px 12px",
        borderRadius: 999,
        background: "rgba(220, 235, 255, 0.72)",
        color: "var(--accent-strong)",
        fontWeight: 700,
        fontSize: "0.85rem"
      }}
    >
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  ...props
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
} & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href={href}
      className={`button ${variant === "primary" ? "button-primary" : "button-secondary"}`}
      {...props}
    >
      {children}
    </Link>
  );
}
