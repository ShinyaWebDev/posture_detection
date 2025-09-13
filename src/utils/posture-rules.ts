import type { Pt, PostureFeedback } from "./types";
import { angleDeg, visible } from "./geometry";

// --- Rules (Desk posture v1) ---
export function deskPostureFeedback(
  landmarks: Pt[],
  sensitivity = 1
): PostureFeedback {
  // indices: 11=LShoulder, 12=RShoulder, 23=LHip, 24=RHip, 7=LEar, 8=REar
  const L = (i: number) => landmarks?.[i];
  const ear = L(7) ?? L(8);
  const sh = L(11) ?? L(12);
  const hip = L(23) ?? L(24);
  if (!visible(ear) || !visible(sh) || !visible(hip)) {
    return { ok: false, message: "Move into frame" };
  }
  // Straighter threshold depends on sensitivity (1 = default). Lower allows more slack.
  const baseMin = 150; // degrees
  const minAngle = baseMin - (sensitivity - 1) * 8; // stricter if sensitivity > 1
  const spineAngle = angleDeg(hip, sh, ear);
  if (spineAngle < minAngle)
    return { ok: false, message: "Straighten your back a bit" };

  // Rough forward-head check: ear relative to shoulder horizontally (mirrored view)
  const headForward = ear.x - sh.x; // in normalized 0..1 space (mirrored later for draw)
  const fwdThreshold = -0.05 * sensitivity; // more negative tolerated if sensitivity < 1
  if (headForward < fwdThreshold)
    return { ok: false, message: "Gently tuck your chin" };

  return { ok: true, message: "Nice posture!" };
}

// TODO: Add squat and guitar posture rules
export function squatPostureFeedback(
  _landmarks: Pt[],
  _sensitivity = 1
): PostureFeedback {
  return { ok: true, message: "Squat mode coming soon!" };
}

export function guitarPostureFeedback(
  _landmarks: Pt[],
  _sensitivity = 1
): PostureFeedback {
  return { ok: true, message: "Guitar mode coming soon!" };
}
