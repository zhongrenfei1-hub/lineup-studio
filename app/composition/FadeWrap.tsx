import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ReactNode } from "react";

export function FadeWrap({
  fadeIn = 0,
  fadeOut = 0,
  totalDur,
  children,
}: {
  readonly fadeIn?: number;
  readonly fadeOut?: number;
  readonly totalDur: number;
  readonly children: ReactNode;
}) {
  const frame = useCurrentFrame();
  let opacity = 1;
  if (fadeIn > 0 && frame < fadeIn) {
    opacity = interpolate(frame, [0, fadeIn], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }
  const tailStart = totalDur - fadeOut;
  if (fadeOut > 0 && frame >= tailStart) {
    opacity = interpolate(frame, [tailStart, totalDur], [1, 0], {
      extrapolateRight: "clamp",
    });
  }
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
}
