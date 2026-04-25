export function Footer() {
  return (
    <footer className="page-section" style={{ paddingTop: 24 }}>
      <div
        className="page-shell"
        style={{
          padding: "20px 0 40px",
          borderTop: "1px solid rgba(26, 47, 37, 0.12)",
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
          color: "var(--muted)"
        }}
      >
        <div>
          <strong style={{ color: "var(--foreground)" }}>Bikes and Brews</strong>
          <div style={{ marginTop: 6 }}>Problem-validation landing page for Omaha demand research.</div>
        </div>
        <div>Explore locally. Be active. Ride responsibly.</div>
      </div>
    </footer>
  );
}
