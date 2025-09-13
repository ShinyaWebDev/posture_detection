import { useEffect, useRef, useState } from "react";
import type { Pt, PostureMode } from "../utils/types";
import { styles } from "../utils/styles";
import { loadPose } from "../utils/mediapipe";
import {
  deskPostureFeedback,
  squatPostureFeedback,
  guitarPostureFeedback,
} from "../utils/posture-rules";

interface PostureAnalyzerProps {
  mode: PostureMode;
  sensitivity?: number;
  onScoreChange?: (score: number) => void;
}

export function PostureAnalyzer({
  mode,
  sensitivity = 1,
  onScoreChange,
}: PostureAnalyzerProps) {
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState("Idle");
  const [message, setMessage] = useState<string>("");
  const [score, setScore] = useState(0);
  const [cams, setCams] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const poseRef = useRef<Awaited<ReturnType<typeof loadPose>> | null>(null);
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const beepRef = useRef<OscillatorNode | null>(null);

  // enumerate cameras once user allows permissions
  useEffect(() => {
    if (!navigator.mediaDevices?.enumerateDevices) return;
    navigator.mediaDevices
      .enumerateDevices()
      .then((list) => {
        setCams(list.filter((d) => d.kind === "videoinput"));
      })
      .catch(() => {});
  }, [running]);

  // Notify parent of score changes
  useEffect(() => {
    onScoreChange?.(score);
  }, [score, onScoreChange]);

  const start = async () => {
    if (running) return;
    setStatus("Requesting camera…");
    const stream = await navigator.mediaDevices.getUserMedia({
      video: deviceId
        ? { deviceId: { exact: deviceId } }
        : { facingMode: "user" },
      audio: false,
    });
    streamRef.current = stream;
    if (!videoRef.current) return;
    videoRef.current.srcObject = stream;
    await videoRef.current.play();

    setStatus("Loading pose model…");
    poseRef.current = await loadPose();
    setStatus("Running");
    setRunning(true);
    loop();
  };

  const stop = () => {
    setRunning(false);
    setStatus("Stopped");
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    try {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    } catch {}
    streamRef.current = null;
    try {
      poseRef.current?.close();
    } catch {}
    poseRef.current = null;
    stopBeep();
  };

  const loop = () => {
    if (!videoRef.current || !canvasRef.current || !poseRef.current) return;
    const res = poseRef.current.detect(videoRef.current);
    const ctx = canvasRef.current.getContext("2d")!;
    const w = (canvasRef.current.width = videoRef.current.videoWidth || 1280);
    const h = (canvasRef.current.height = videoRef.current.videoHeight || 720);

    // draw mirrored video
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, -w, 0, w, h);
    ctx.restore();

    const landmarks = res?.landmarks?.[0] as Pt[] | undefined;
    if (landmarks) {
      drawSkeleton(ctx, landmarks, w, h);
      let fb: { ok: boolean; message?: string } = { ok: true };

      switch (mode) {
        case "desk":
          fb = deskPostureFeedback(landmarks, sensitivity);
          break;
        case "squat":
          fb = squatPostureFeedback(landmarks, sensitivity);
          break;
        case "guitar":
          fb = guitarPostureFeedback(landmarks, sensitivity);
          break;
      }

      setMessage(fb.message || (fb.ok ? "Good" : "Hold form"));
      if (fb.ok) setScore((s) => Math.min(9999, s + 1));
      if (!fb.ok) beep();
      else stopBeep();
    } else {
      setMessage("No pose detected");
      stopBeep();
    }

    rafRef.current = requestAnimationFrame(loop);
  };

  // drawing utils
  function drawSkeleton(
    ctx: CanvasRenderingContext2D,
    lm: Pt[],
    w: number,
    h: number
  ) {
    const P = (i: number) => lm?.[i];
    const pairs: [number, number][] = [
      [11, 12],
      [11, 13],
      [13, 15],
      [12, 14],
      [14, 16],
      [11, 23],
      [12, 24],
      [23, 24],
      [23, 25],
      [24, 26],
      [25, 27],
      [26, 28],
    ];
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#58f1b9";
    ctx.beginPath();
    pairs.forEach(([a, b]) => {
      const A = P(a),
        B = P(b);
      if (!A || !B) return;
      ctx.moveTo(w * (1 - A.x), h * A.y);
      ctx.lineTo(w * (1 - B.x), h * B.y);
    });
    ctx.stroke();
    ctx.fillStyle = "#7dd3fc";
    lm.forEach((p) => {
      if (!p) return;
      ctx.beginPath();
      ctx.arc(w * (1 - p.x), h * p.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // audio cues
  function ensureAudio() {
    if (!audioCtxRef.current)
      audioCtxRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    return audioCtxRef.current;
  }
  function beep() {
    if (beepRef.current) return;
    const ctx = ensureAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = 0.02;
    osc.frequency.value = 740;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    beepRef.current = osc;
  }
  function stopBeep() {
    if (!beepRef.current) return;
    try {
      beepRef.current.stop();
    } catch {}
    try {
      beepRef.current.disconnect();
    } catch {}
    beepRef.current = null;
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canStart = !running;
  const canStop = running;

  return (
    <>
      <div style={{ ...styles.row, marginBottom: 12 }}>
        {cams.length > 1 && (
          <label>
            <span style={{ fontSize: 12, opacity: 0.8 }}>Camera:&nbsp;</span>
            <select
              style={styles.select}
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value || undefined)}
            >
              <option value="">Default</option>
              {cams.map((c) => (
                <option key={c.deviceId} value={c.deviceId}>
                  {c.label || `Camera ${c.deviceId.slice(0, 6)}`}
                </option>
              ))}
            </select>
          </label>
        )}

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button
            style={canStart ? styles.btn : styles.btnGhost}
            onClick={start}
            disabled={!canStart}
          >
            Start
          </button>
          <button
            style={canStop ? styles.btnGhost : styles.btnGhost}
            onClick={stop}
            disabled={!canStop}
          >
            Stop
          </button>
        </div>
      </div>

      <div style={styles.canvasWrap}>
        <video ref={videoRef} playsInline muted style={{ display: "none" }} />
        <canvas ref={canvasRef} />
        <div style={styles.overlayPill}>{message}</div>
        <div style={styles.overlayPillR}>Score: {score}</div>
      </div>

      <div style={{ ...styles.meter, marginTop: 12 }}>
        <div>
          <div style={{ fontWeight: 700 }}>Real‑time Feedback</div>
          <div style={{ opacity: 0.75, fontSize: 13 }}>
            All processing stays in your browser. No video is uploaded.
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ opacity: 0.8, fontSize: 13 }}>Status:</span>
          <span style={{ fontWeight: 700 }}>{status}</span>
        </div>
      </div>

      <div style={styles.footer}>
        Tip: For best results, keep upper body visible and ensure good lighting.
      </div>
    </>
  );
}
