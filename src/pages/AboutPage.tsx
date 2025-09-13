import { styles } from "../utils/styles";

export function AboutPage() {
  return (
    <div style={styles.card}>
      <h1 style={{ fontSize: 24, margin: "0 0 24px 0" }}>
        About Posture Coach
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* What is Posture Coach */}
        <section>
          <h2 style={{ fontSize: 20, margin: "0 0 12px 0", color: "#58f1b9" }}>
            What is Posture Coach?
          </h2>
          <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
            Posture Coach is a real-time AI-powered application that helps you
            maintain better posture while working, exercising, or playing
            instruments. Using advanced computer vision technology, it analyzes
            your body position and provides instant feedback to help you develop
            healthier habits.
          </p>
        </section>

        {/* How it Works */}
        <section>
          <h2 style={{ fontSize: 20, margin: "0 0 12px 0", color: "#58f1b9" }}>
            How it Works
          </h2>
          <div style={{ lineHeight: 1.6, opacity: 0.9 }}>
            <p>
              <strong>1. Real-time Analysis:</strong> Your camera captures video
              of your upper body
            </p>
            <p>
              <strong>2. AI Processing:</strong> MediaPipe AI identifies key
              body landmarks
            </p>
            <p>
              <strong>3. Posture Assessment:</strong> Algorithms analyze your
              spine alignment and head position
            </p>
            <p>
              <strong>4. Instant Feedback:</strong> Visual and audio cues guide
              you to better posture
            </p>
          </div>
        </section>

        {/* Privacy & Security */}
        <section>
          <h2 style={{ fontSize: 20, margin: "0 0 12px 0", color: "#58f1b9" }}>
            Privacy & Security
          </h2>
          <div
            style={{
              background: "#0f172a",
              padding: 16,
              borderRadius: 8,
              lineHeight: 1.6,
            }}
          >
            <p
              style={{ margin: "0 0 8px 0", fontWeight: 600, color: "#7dd3fc" }}
            >
              🔒 100% Private & Secure
            </p>
            <p style={{ margin: "0 0 8px 0", opacity: 0.9 }}>
              • All video processing happens locally in your browser
            </p>
            <p style={{ margin: "0 0 8px 0", opacity: 0.9 }}>
              • No video data is ever uploaded, stored, or transmitted
            </p>
            <p style={{ margin: "0", opacity: 0.9 }}>
              • No personal information is collected or shared
            </p>
          </div>
        </section>

        {/* Technology */}
        <section>
          <h2 style={{ fontSize: 20, margin: "0 0 12px 0", color: "#58f1b9" }}>
            Technology
          </h2>
          <div style={styles.grid}>
            <div style={styles.featureCard}>
              <h4 style={{ margin: "0 0 8px 0" }}>MediaPipe</h4>
              <p style={{ margin: 0, opacity: 0.8, fontSize: 14 }}>
                Google's machine learning framework for real-time pose detection
              </p>
            </div>
            <div style={styles.featureCard}>
              <h4 style={{ margin: "0 0 8px 0" }}>React</h4>
              <p style={{ margin: 0, opacity: 0.8, fontSize: 14 }}>
                Modern web framework for responsive user interfaces
              </p>
            </div>
            <div style={styles.featureCard}>
              <h4 style={{ margin: "0 0 8px 0" }}>TypeScript</h4>
              <p style={{ margin: 0, opacity: 0.8, fontSize: 14 }}>
                Type-safe JavaScript for reliable code
              </p>
            </div>
          </div>
        </section>

        {/* Health Benefits */}
        <section>
          <h2 style={{ fontSize: 20, margin: "0 0 12px 0", color: "#58f1b9" }}>
            Health Benefits
          </h2>
          <div style={{ lineHeight: 1.6, opacity: 0.9 }}>
            <p>Regular use of Posture Coach can help:</p>
            <ul style={{ paddingLeft: 20 }}>
              <li>Reduce neck and back pain</li>
              <li>Prevent long-term spinal issues</li>
              <li>Improve breathing and circulation</li>
              <li>Increase energy and focus</li>
              <li>Build better posture habits</li>
            </ul>
          </div>
        </section>

        {/* Version Info */}
        <section
          style={{
            textAlign: "center",
            paddingTop: 16,
            borderTop: "1px solid #2b3b63",
          }}
        >
          <div style={{ opacity: 0.7 }}>
            <p>Posture Coach v1.0.0</p>
            <p>Built with ❤️ for better health and productivity</p>
          </div>
        </section>
      </div>
    </div>
  );
}
