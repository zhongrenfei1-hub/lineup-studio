import { Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { staticFile } from "./lib";
import { ProPlayer, ProTeam, STAT_AXES, normalize } from "./data";
import { RadarMini } from "./RadarMini";

const FONT = "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif";

function hexToRgba(hex: string, alpha: number) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function PlayerCard({
  player,
  team,
  indexInTeam,
  isMvp,
  assetPrefix = "vlr",
  headerLabel,
}: {
  readonly player: ProPlayer;
  readonly team: ProTeam;
  readonly indexInTeam: number;
  readonly isMvp: boolean;
  readonly assetPrefix?: string;
  readonly headerLabel?: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], { extrapolateRight: "clamp" });
  const headerY = interpolate(frame, [0, fps * 0.5], [16, 0], { extrapolateRight: "clamp" });

  const avatarSpring = spring({ frame: frame - 3, fps, config: { damping: 22, mass: 1, stiffness: 80, overshootClamping: true } });
  const avatarSlide = interpolate(avatarSpring, [0, 1], [-80, 0]);
  const mvpSpring = spring({ frame: frame - 10, fps, config: { damping: 20, mass: 0.9, stiffness: 110, overshootClamping: true } });

  const numberSpring = spring({ frame: frame - 4, fps, config: { damping: 24, mass: 1, stiffness: 90, overshootClamping: true } });
  const aliasOffset = interpolate(numberSpring, [0, 1], [40, 0]);
  const { width, height } = useVideoConfig();
  const isPortrait = height > width;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse at top right, ${hexToRgba(team.color, 0.22)} 0%, #08080F 55%)`,
        fontFamily: FONT,
        padding: 60,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* faint scan-line pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px)",
          pointerEvents: "none",
        }}
      />
      {/* big number watermark */}
      <div
        style={{
          position: "absolute",
          left: 40,
          bottom: -100,
          fontSize: 460,
          fontWeight: 900,
          color: hexToRgba(team.color, 0.06),
          lineHeight: 0.8,
          letterSpacing: -20,
          pointerEvents: "none",
          fontFamily: "Impact, sans-serif",
        }}
      >
        {String(indexInTeam + 1).padStart(2, "0")}
      </div>
      {/* logo watermark right */}
      <Img
        src={team.logoUrl ?? staticFile(`${assetPrefix}/logos/${team.tag}.png`)}
        style={{
          position: "absolute",
          right: -150,
          bottom: -150,
          width: 540,
          height: 540,
          objectFit: "contain",
          opacity: 0.08,
          pointerEvents: "none",
          filter: `drop-shadow(0 0 20px ${team.color})`,
        }}
      />

      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: headerOpacity, transform: `translateY(${headerY}px)`, position: "relative", zIndex: 3 }}>
        <Img src={team.logoUrl ?? staticFile(`${assetPrefix}/logos/${team.tag}.png`)} style={{ width: 44, height: 44, objectFit: "contain", filter: `drop-shadow(0 0 8px ${team.color})` }} />
        <div style={{ fontSize: 16, fontWeight: 900, color: "white", letterSpacing: 1 }}>{team.name.toUpperCase()}</div>
        <div style={{ width: 1, height: 22, background: "#2A2D3D" }} />
        <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 800, letterSpacing: 3 }}>
          {headerLabel ?? `ROSTER · ${indexInTeam + 1} / 5`}
        </div>
        {isMvp && (
          <div
            style={{
              marginLeft: 14,
              padding: "6px 18px",
              background: team.color,
              color: "#08080F",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: 3,
              transform: `scale(${mvpSpring})`,
              boxShadow: `0 0 20px ${team.color}, 0 0 40px ${hexToRgba(team.color, 0.5)}`,
              clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
            }}
          >
            ★ TEAM MVP
          </div>
        )}
        <div style={{ marginLeft: "auto", fontSize: 11, color: "#6B7280", fontWeight: 800, letterSpacing: 3, textTransform: "uppercase" }}>
          {team.region}
        </div>
      </div>

      {/* main grid */}
      <div style={{ display: "flex", flex: 1, gap: isPortrait ? 24 : 44, alignItems: "center", flexDirection: isPortrait ? "column" : "row", position: "relative", zIndex: 2 }}>
        {/* portrait + identity */}
        <div style={{ display: "flex", flexDirection: "column", flex: isPortrait ? "0 0 auto" : "0 0 300px", gap: isPortrait ? 14 : 22, alignItems: isPortrait ? "center" : "flex-start" }}>
          <div
            style={{
              position: "relative",
              transform: `translateX(${avatarSlide}px)`,
              opacity: avatarSpring,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -6,
                background: team.color,
                clipPath: "polygon(0 0, 88% 0, 100% 14%, 100% 100%, 12% 100%, 0 86%)",
                filter: `drop-shadow(0 0 24px ${team.color})`,
              }}
            />
            <Img
              src={player.avatarUrl ?? staticFile(`${assetPrefix}/avatars/${team.tag}-${player.alias}.png`)}
              style={{
                position: "relative",
                width: 240,
                height: 240,
                objectFit: "cover",
                clipPath: "polygon(0 0, 88% 0, 100% 14%, 100% 100%, 12% 100%, 0 86%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -10,
                right: 8,
                background: "#08080F",
                color: team.color,
                border: `2px solid ${team.color}`,
                padding: "4px 12px",
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: 1,
                boxShadow: `0 0 12px ${team.color}`,
              }}
            >
              {player.stats.rnd} RND
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", transform: `translateY(${aliasOffset}px)`, opacity: numberSpring, alignItems: isPortrait ? "center" : "flex-start", textAlign: isPortrait ? "center" : "left" }}>
            <div
              style={{
                fontSize: isPortrait ? 72 : 56,
                fontWeight: 900,
                color: "white",
                lineHeight: 0.95,
                letterSpacing: -2,
                textTransform: "uppercase",
                textShadow: `0 0 24px ${hexToRgba(team.color, 0.7)}`,
              }}
            >
              {player.alias}
            </div>
            <div
              style={{
                marginTop: 10,
                display: "inline-block",
                width: "fit-content",
                padding: "5px 12px",
                background: team.color,
                color: "#08080F",
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
              }}
            >
              {player.tagline}
            </div>
            <div style={{ fontSize: 13, color: "#6B7280", marginTop: 10, lineHeight: 1.3, fontWeight: 600 }}>
              {player.real}
            </div>
          </div>
        </div>

        {/* radar */}
        <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <RadarMini stats={player.stats} color={team.color} size={isPortrait ? 360 : 420} delay={8} />
        </div>

        {/* data bars */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minWidth: 0, width: isPortrait ? "100%" : undefined }}>
          {STAT_AXES.map((ax, idx) => {
            const delay = 12 + idx * 4;
            const op = interpolate(frame, [delay, delay + fps * 0.4], [0, 1], { extrapolateRight: "clamp" });
            const widthProg = interpolate(frame, [delay, delay + fps * 0.7], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });
            const v = player.stats[ax.key];
            const norm = normalize(v, ax.min, ax.max);
            return (
              <div key={ax.key} style={{ opacity: op, display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 900, letterSpacing: 3, textTransform: "uppercase" }}>{ax.label}</div>
                  <div style={{ fontSize: 22, color: "white", fontWeight: 900, fontVariantNumeric: "tabular-nums", textShadow: `0 0 8px ${hexToRgba(team.color, 0.6)}` }}>{ax.format(v)}</div>
                </div>
                <div style={{ height: 8, background: "#1A1D2D", borderRadius: 2, overflow: "hidden", border: "1px solid #2A2D3D" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${norm * widthProg * 100}%`,
                      background: `linear-gradient(90deg, ${hexToRgba(team.color, 0.5)} 0%, ${team.color} 100%)`,
                      boxShadow: `0 0 8px ${team.color}`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
