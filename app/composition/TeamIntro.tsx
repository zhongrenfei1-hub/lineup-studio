import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { staticFile } from "./lib";
import { ProTeam, STAT_AXES, teamAverages } from "./data";
import { RadarMini } from "./RadarMini";

const FONT = "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";

function hexToRgba(hex: string, alpha: number) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function TeamIntro({ team }: { readonly team: ProTeam }) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isPortrait = height > width;

  const headerOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], { extrapolateRight: "clamp" });
  const headerY = interpolate(frame, [0, fps * 0.5], [16, 0], { extrapolateRight: "clamp" });

  const logoSpring = spring({ frame: frame - 3, fps, config: { damping: 22, mass: 1, stiffness: 80, overshootClamping: true } });

  const avg = teamAverages(team);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse at left, ${hexToRgba(team.color, 0.25)} 0%, #08080F 60%)`,
        fontFamily: FONT,
        padding: 60,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        overflow: "hidden",
        color: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -80,
          top: 60,
          fontSize: 200,
          fontWeight: 900,
          color: hexToRgba(team.color, 0.08),
          lineHeight: 0.85,
          letterSpacing: -8,
          pointerEvents: "none",
          fontFamily: "Impact, sans-serif",
          textTransform: "uppercase",
        }}
      >
        {team.tag}
      </div>
      <Img
        src={team.logoUrl ?? staticFile(`vlr/logos/${team.tag}.png`)}
        style={{
          position: "absolute",
          right: -140,
          bottom: -140,
          width: 560,
          height: 560,
          objectFit: "contain",
          opacity: 0.07,
          pointerEvents: "none",
          filter: `drop-shadow(0 0 30px ${team.color})`,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 28, opacity: headerOpacity, transform: `translateY(${headerY}px)`, position: "relative", zIndex: 3 }}>
        <Img
          src={team.logoUrl ?? staticFile(`vlr/logos/${team.tag}.png`)}
          style={{
            width: 130,
            height: 130,
            objectFit: "contain",
            transform: `scale(${logoSpring})`,
            filter: `drop-shadow(0 0 24px ${team.color})`,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: team.color, letterSpacing: 6, textTransform: "uppercase", textShadow: `0 0 12px ${team.color}` }}>
            Team Profile
          </div>
          <div
            style={{
              fontSize: isPortrait ? 56 : 76,
              fontWeight: 900,
              color: "white",
              lineHeight: 0.95,
              letterSpacing: -2,
              textTransform: "uppercase",
              textShadow: `0 0 30px ${hexToRgba(team.color, 0.6)}`,
            }}
          >
            {team.name}
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#94A3B8", marginTop: 4, letterSpacing: 2, textTransform: "uppercase" }}>
            {team.region} · 5-MAN STARTING ROSTER
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, gap: isPortrait ? 18 : 40, alignItems: "stretch", flexDirection: isPortrait ? "column" : "row", position: "relative", zIndex: 2 }}>
        <div style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
          {team.players.map((p, idx) => {
            const delay = 6 + idx * 4;
            const op = interpolate(frame, [delay, delay + fps * 0.4], [0, 1], { extrapolateRight: "clamp" });
            const x = interpolate(frame, [delay, delay + fps * 0.4], [-30, 0], { extrapolateRight: "clamp" });
            return (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "10px 18px",
                  background: hexToRgba(team.color, 0.1),
                  borderLeft: `4px solid ${team.color}`,
                  opacity: op,
                  transform: `translateX(${x}px)`,
                  backdropFilter: "blur(8px)",
                }}
              >
                <Img
                  src={p.avatarUrl ?? staticFile(`vlr/avatars/${team.tag}-${p.alias}.png`)}
                  style={{
                    width: 56,
                    height: 56,
                    objectFit: "cover",
                    clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)",
                    border: `2px solid ${team.color}`,
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "white", lineHeight: 1.05, letterSpacing: -0.5, textTransform: "uppercase" }}>{p.alias}</div>
                  <div style={{ fontSize: 11, color: team.color, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 }}>
                    {p.tagline}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", minWidth: 110 }}>
                  <div style={{ fontSize: 10, color: "#6B7280", fontWeight: 800, letterSpacing: 2 }}>RATING</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: team.color, fontVariantNumeric: "tabular-nums", textShadow: `0 0 10px ${team.color}` }}>{p.stats.rating.toFixed(2)}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: team.color, letterSpacing: 4, textTransform: "uppercase", textShadow: `0 0 8px ${team.color}` }}>
            Team Average Profile
          </div>
          <RadarMini stats={avg} color={team.color} size={400} delay={10} compact />
          <div style={{ display: "flex", gap: 28, marginTop: 4 }}>
            {STAT_AXES.slice(0, 3).map((ax) => {
              const v = avg[ax.key];
              return (
                <div key={ax.key} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontSize: 10, color: "#6B7280", fontWeight: 800, letterSpacing: 2 }}>{ax.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "white", fontVariantNumeric: "tabular-nums" }}>{ax.format(v)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
