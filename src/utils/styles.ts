import React from "react";

// Minimal styles so it looks decent without Tailwind
export const styles: Record<string, React.CSSProperties> = {
  app: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#0b0f17",
    color: "#eaf2ff",
    overflow: "hidden",
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "8px",
    overflow: "auto",
  },
  card: {
    flex: 1,
    background: "#101827",
    border: "1px solid #1f2a44",
    borderRadius: 12,
    padding: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,.35)",
    overflow: "auto",
  },
  nav: {
    background: "#101827",
    borderBottom: "1px solid #1f2a44",
    padding: "0 8px",
  },
  navInner: {
    maxWidth: 1024,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    flexWrap: "wrap",
    gap: 8,
  },
  navBrand: {
    fontSize: 18,
    fontWeight: 700,
    textDecoration: "none",
    color: "#eaf2ff",
  },
  navLinks: {
    display: "flex",
    gap: 12,
    listStyle: "none",
    margin: 0,
    padding: 0,
    flexWrap: "wrap",
  },
  navLink: {
    textDecoration: "none",
    color: "#c7d2fe",
    padding: "8px 12px",
    borderRadius: 8,
    transition: "all 0.2s",
    fontSize: 14,
    minHeight: 44, // Better touch target
    display: "flex",
    alignItems: "center",
  },
  navLinkActive: {
    background: "#1f6feb",
    color: "white",
  },
  row: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 8,
  },
  btn: {
    background: "#1f6feb",
    border: 0,
    color: "white",
    padding: "12px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-block",
    textAlign: "center",
    minHeight: 44, // Better touch target
    fontSize: 14,
  },
  btnGhost: {
    background: "transparent",
    border: "1px solid #2b3b63",
    color: "#c7d2fe",
    padding: "12px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-block",
    textAlign: "center",
    minHeight: 44, // Better touch target
    fontSize: 14,
  },
  btnLarge: {
    padding: "16px 24px",
    fontSize: 16,
    minHeight: 48,
  },
  select: {
    background: "#0f172a",
    color: "#eaf2ff",
    border: "1px solid #293351",
    padding: "12px",
    borderRadius: 10,
    minHeight: 44, // Better touch target
    fontSize: 14,
  },
  meter: {
    background: "#0f172a",
    border: "1px solid #2b3b63",
    borderRadius: 12,
    padding: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  canvasWrap: {
    position: "relative",
    width: "100%",
    aspectRatio: "16/9",
    background: "#06090f",
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid #1f2a44",
    maxHeight: "70vh", // Limit height on mobile
  },
  overlayPill: {
    position: "absolute",
    top: 12,
    left: 12,
    background: "rgba(0,0,0,.55)",
    padding: "6px 10px",
    borderRadius: 10,
    fontSize: 14,
  },
  overlayPillR: {
    position: "absolute",
    top: 12,
    right: 12,
    background: "rgba(0,0,0,.55)",
    padding: "6px 10px",
    borderRadius: 10,
    fontSize: 14,
  },
  footer: { opacity: 0.7, fontSize: 12, marginTop: 8 },
  hero: {
    textAlign: "center",
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: "clamp(28px, 6vw, 42px)", // Responsive font size
    fontWeight: 800,
    margin: "0 0 16px 0",
    background: "linear-gradient(135deg, #58f1b9, #7dd3fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: 1.2,
  },
  heroSubtitle: {
    fontSize: "clamp(14px, 4vw, 18px)", // Responsive font size
    opacity: 0.8,
    margin: "0 auto 24px auto",
    maxWidth: 600,
    lineHeight: 1.4,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // Smaller min width for mobile
    gap: 16,
    marginBottom: 24,
  },
  featureCard: {
    background: "#0f172a",
    border: "1px solid #2b3b63",
    borderRadius: 12,
    padding: 16,
    textAlign: "center",
  },
  featureIcon: {
    fontSize: "clamp(32px, 8vw, 48px)", // Responsive icon size
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: "clamp(16px, 4vw, 20px)", // Responsive title size
    fontWeight: 600,
    marginBottom: 8,
  },
  featureDesc: {
    opacity: 0.8,
    lineHeight: 1.5,
    fontSize: "clamp(12px, 3vw, 14px)", // Responsive description size
  },
};
