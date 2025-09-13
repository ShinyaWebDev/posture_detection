// --- MediaPipe loader ---
// Using dynamic import so app still renders before WASM loads
export async function loadPose() {
  const vision = await import("@mediapipe/tasks-vision");
  const fileset = await vision.FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
  );
  const landmarker = await vision.PoseLandmarker.createFromOptions(fileset, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
    },
    runningMode: "VIDEO",
    numPoses: 1,
    minPoseDetectionConfidence: 0.5,
    minPosePresenceConfidence: 0.5,
    outputSegmentationMasks: false,
  });
  return {
    landmarker,
    detect(video: HTMLVideoElement) {
      const now = performance.now();
      return landmarker.detectForVideo(video, now);
    },
    close() {
      try {
        landmarker.close();
      } catch {}
    },
  } as const;
}
