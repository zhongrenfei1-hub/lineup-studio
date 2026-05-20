"use client";

import { Player, PlayerRef } from "@remotion/player";
import { Ref, useMemo } from "react";
import { ProAnalysis, PRO_TOTAL_FRAMES } from "../composition/ProAnalysis";
import { ProTeam } from "../composition/data";

export function PreviewPlayer({
  teams,
  playerRef,
}: {
  teams?: ProTeam[];
  playerRef?: Ref<PlayerRef>;
}) {
  const inputProps = useMemo(() => ({ teams }), [teams]);

  return (
    <Player
      ref={playerRef}
      component={ProAnalysis}
      inputProps={inputProps}
      durationInFrames={PRO_TOTAL_FRAMES}
      fps={30}
      compositionWidth={1280}
      compositionHeight={720}
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
