// Common types used across the application
export type Pt = { x: number; y: number; z?: number; visibility?: number };

export type PostureMode = "desk" | "squat" | "guitar";

export type PostureFeedback = {
  ok: boolean;
  message?: string;
};
