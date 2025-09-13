import { useState, useEffect } from "react";
import { styles } from "../utils/styles";

export function SettingsPage() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [alertFrequency, setAlertFrequency] = useState(5);
  const [darkMode, setDarkMode] = useState(true);

  // Load settings from localStorage
  useEffect(() => {
    const settings = localStorage.getItem("posture-coach-settings");
    if (settings) {
      const parsed = JSON.parse(settings);
      setAudioEnabled(parsed.audioEnabled ?? true);
      setAlertFrequency(parsed.alertFrequency ?? 5);
      setDarkMode(parsed.darkMode ?? true);
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = () => {
    const settings = {
      audioEnabled,
      alertFrequency,
      darkMode,
    };
    localStorage.setItem("posture-coach-settings", JSON.stringify(settings));
    alert("Settings saved!");
  };

  return (
    <div style={styles.card}>
      <h1 style={{ fontSize: 24, margin: "0 0 24px 0" }}>Settings</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Audio Settings */}
        <div>
          <h3 style={{ fontSize: 18, margin: "0 0 12px 0" }}>
            🔊 Audio Feedback
          </h3>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={audioEnabled}
              onChange={(e) => setAudioEnabled(e.target.checked)}
            />
            <span>Enable audio alerts for poor posture</span>
          </label>
        </div>

        {/* Alert Frequency */}
        <div>
          <h3 style={{ fontSize: 18, margin: "0 0 12px 0" }}>
            ⏰ Alert Frequency
          </h3>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>Alert every:</span>
            <select
              style={styles.select}
              value={alertFrequency}
              onChange={(e) => setAlertFrequency(parseInt(e.target.value))}
            >
              <option value={1}>1 second</option>
              <option value={3}>3 seconds</option>
              <option value={5}>5 seconds</option>
              <option value={10}>10 seconds</option>
              <option value={30}>30 seconds</option>
            </select>
          </label>
        </div>

        {/* Theme Settings */}
        <div>
          <h3 style={{ fontSize: 18, margin: "0 0 12px 0" }}>🎨 Appearance</h3>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
            <span>Dark mode (Light mode coming soon)</span>
          </label>
        </div>

        {/* Camera Settings */}
        <div>
          <h3 style={{ fontSize: 18, margin: "0 0 12px 0" }}>📹 Camera</h3>
          <div style={{ opacity: 0.7, fontSize: 14, marginBottom: 8 }}>
            Camera selection is available on the posture coaching pages
          </div>
          <button
            style={styles.btnGhost}
            onClick={() => {
              navigator.mediaDevices
                .getUserMedia({ video: true })
                .then(() => alert("Camera access granted!"))
                .catch(() => alert("Camera access denied or unavailable"));
            }}
          >
            Test Camera Access
          </button>
        </div>

        {/* Privacy */}
        <div>
          <h3 style={{ fontSize: 18, margin: "0 0 12px 0" }}>🔒 Privacy</h3>
          <div style={{ opacity: 0.85, lineHeight: 1.5 }}>
            <p>• All video processing happens locally in your browser</p>
            <p>• No video data is ever uploaded or stored</p>
            <p>• Settings are saved only on your device</p>
            <p>• No personal data is collected or transmitted</p>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ textAlign: "center", paddingTop: 16 }}>
          <button style={styles.btn} onClick={saveSettings}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
