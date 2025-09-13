import { Link } from "react-router-dom";
import { styles } from "../utils/styles";

export function HomePage() {
  return (
    <div style={styles.card}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Posture Coach</h1>
        <p style={styles.heroSubtitle}>
          Improve your posture with real-time AI feedback. All processing
          happens in your browser - no data is uploaded or stored.
        </p>
        <Link to="/desk" style={{ ...styles.btn, ...styles.btnLarge }}>
          Start Desk Posture Coaching
        </Link>
      </div>

      <div style={styles.grid}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🖥️</div>
          <h3 style={styles.featureTitle}>Desk Posture</h3>
          <p style={styles.featureDesc}>
            Get real-time feedback on your sitting posture while working at your
            desk. Improve spine alignment and reduce neck strain.
          </p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🏋️</div>
          <h3 style={styles.featureTitle}>Exercise Form</h3>
          <p style={styles.featureDesc}>
            Coming soon: Monitor your squat form and other exercises to prevent
            injury and maximize effectiveness.
          </p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🎸</div>
          <h3 style={styles.featureTitle}>Instrument Posture</h3>
          <p style={styles.featureDesc}>
            Coming soon: Maintain proper posture while playing guitar or other
            instruments to prevent repetitive strain injuries.
          </p>
        </div>
      </div>

      <div style={{ ...styles.meter, background: "#0f172a" }}>
        <div>
          <div style={{ fontWeight: 700, color: "#58f1b9" }}>
            ✨ Privacy First
          </div>
          <div style={{ opacity: 0.85, fontSize: 14, marginTop: 4 }}>
            All analysis happens locally in your browser. Your video never
            leaves your device.
          </div>
        </div>
        <div style={{ opacity: 0.7 }}>Powered by MediaPipe</div>
      </div>
    </div>
  );
}
