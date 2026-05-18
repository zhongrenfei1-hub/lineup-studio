"use client";

import { Player } from "@remotion/player";
import { ProAnalysis, PRO_TOTAL_FRAMES } from "../composition/ProAnalysis";

export function PreviewPlayer() {
  return (
    <Player
      component={ProAnalysis}
      durationInFrames={PRO_TOTAL_FRAMES}
      fps={30}
      compositionWidth={1280}
      compositionHeight={720}
      style={{ width: "100%", borderRadius: 12, overflow: "hidden", boxShadow: "0 24px 64px rgba(168, 85, 247, 0.25)" }}
      controls
      loop
      autoPlay
      acknowledgeRemotionLicense
    />
  );
}
