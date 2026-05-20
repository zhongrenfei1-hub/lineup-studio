"use client";

import { Player, PlayerRef } from "@remotion/player";
import { Ref, useMemo } from "react";
import { ProAnalysis, computeTotalFrames, DEFAULT_TIMING, Timing } from "../composition/ProAnalysis";
import { ProTeam, TEAMS } from "../composition/data";

export function PreviewPlayer({
  teams,
  playerRef,
  orientation = "landscape",
  timing = DEFAULT_TIMING,
}: {
  teams?: ProTeam[];
  playerRef?: Ref<PlayerRef>;
  orientation?: "landscape" | "portrait";
  timing?: Timing;
}) {
  const isPortrait = orientation === "portrait";
  const inputProps = useMemo(
    () => ({ teams, timing }),
    [teams, timing],
  );
  const totalFrames = useMemo(
    () => computeTotalFrames(teams ?? TEAMS, timing),
    [teams, timing],
  );

  return (
    <Player
      ref={playerRef}
      component={ProAnalysis}
      inputProps={inputProps}
      durationInFrames={totalFrames}
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
