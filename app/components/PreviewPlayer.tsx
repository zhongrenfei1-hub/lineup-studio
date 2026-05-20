"use client";

import { Player, PlayerRef } from "@remotion/player";
import { Ref, useMemo } from "react";
import { ProAnalysis, PRO_TOTAL_FRAMES } from "../composition/ProAnalysis";
import { ProTeam } from "../composition/data";

export function PreviewPlayer({
  teams,
  playerRef,
  orientation = "landscape",
}: {
  teams?: ProTeam[];
  playerRef?: Ref<PlayerRef>;
  orientation?: "landscape" | "portrait";
}) {
  const isPortrait = orientation === "portrait";
  const inputProps = useMemo(
    () => ({ teams, orientation }),
    [teams, orientation],
  );

  return (
    <Player
      ref={playerRef}
      component={ProAnalysis}
      inputProps={inputProps}
      durationInFrames={PRO_TOTAL_FRAMES}
      fps={30}
      compositionWidth={isPortrait ? 720 : 1280}
      compositionHeight={isPortrait ? 1280 : 720}
      style={{
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 24px 64px rgba(168, 85, 247, 0.25)",
      }}
      controls
      loop
      autoPlay
      acknowledgeRemotionLicense
    />
  );
}
