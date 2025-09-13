import { useState, useEffect } from "react";
import { PostureAnalyzer } from "../components/PostureAnalyzer";
import { styles } from "../utils/styles";

export function DeskPosturePage() {
  const [sensitivity, setSensitivity] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={styles.card}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <h1 style={{ fontSize: "clamp(18px, 5vw, 24px)", margin: 0 }}>
          Desk Posture Coaching
        </h1>
        <div style={{ fontSize: "clamp(12px, 3vw, 14px)", opacity: 0.7 }}>
          Mode: Desk Posture
        </div>
      </div>

      <div
        style={{
          ...styles.row,
          marginBottom: 16,
          justifyContent: "space-between",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "clamp(12px, 3vw, 14px)", opacity: 0.8 }}>
            Sensitivity:
          </span>
          <input
            type="range"
            min={0.6}
            max={1.6}
            step={0.1}
            value={sensitivity}
            onChange={(e) => setSensitivity(parseFloat(e.target.value))}
            style={{ minWidth: 100 }}
          />
          <span style={{ marginLeft: 8, fontSize: "clamp(12px, 3vw, 14px)" }}>
            {sensitivity.toFixed(1)}x
          </span>
        </label>

        <div
          style={{
            fontSize: "clamp(12px, 3vw, 14px)",
            opacity: 0.8,
            textAlign: isMobile ? "center" : "right",
          }}
        >
          Session Score: <strong>{totalScore}</strong>
        </div>
      </div>

      <PostureAnalyzer
        mode="desk"
        sensitivity={sensitivity}
        onScoreChange={setTotalScore}
      />

      <div
        style={{
          marginTop: 16,
          padding: 12,
          background: "#0f172a",
          borderRadius: 8,
        }}
      >
        <h3
          style={{
            fontSize: "clamp(14px, 4vw, 16px)",
            margin: "0 0 8px 0",
          }}
        >
          💡 Tips for Better Desk Posture
        </h3>
        <ul
          style={{
            margin: 0,
            paddingLeft: 20,
            opacity: 0.85,
            fontSize: "clamp(12px, 3vw, 14px)",
            lineHeight: 1.4,
          }}
        >
          <li>Keep your back straight against the chair</li>
          <li>Shoulders relaxed, not hunched forward</li>
          <li>Take breaks every 30-60 minutes to stand and stretch</li>
          <li>Keep feet flat on floor, knees at 90 degrees</li>
        </ul>
      </div>
    </div>
  );
}
