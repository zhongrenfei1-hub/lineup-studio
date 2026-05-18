import { useMemo } from "react";
import { AbsoluteFill, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TEAMS, STAT_AXES, teamMVP, normalize, ProTeam, ProPlayer } from "./data";
import { TeamIntro } from "./TeamIntro";
import { PlayerCard } from "./PlayerCard";
import { FadeWrap } from "./FadeWrap";

const FONT = "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif";

const TITLE_F = 90;
const INTRO_F = 130;
const MVP_F = 230;
const SUB_F = 140;
const FINAL_F = 280;
const OVERLAP = 30;

type Seg =
  | { kind: "title"; dur: number }
  | { kind: "intro"; team: ProTeam; dur: number }
  | { kind: "player"; team: ProTeam; player: ProPlayer; isMvp: boolean; idx: number; dur: number }
  | { kind: "final"; teams: ProTeam[]; dur: number };

function buildSegments(teams: ProTeam[]): Seg[] {
  const segs: Seg[] = [];
  segs.push({ kind: "title", dur: TITLE_F });
  for (const team of teams) {
    segs.push({ kind: "intro", team, dur: INTRO_F });
    const mvp = teamMVP(team);
    const ordered = [mvp, ...team.players.filter((p) => p.id !== mvp.id)];
    ordered.forEach((p, i) => {
      segs.push({
        kind: "player",
        team,
        player: p,
        isMvp: i === 0,
        idx: i,
        dur: i === 0 ? MVP_F : SUB_F,
      });
    });
  }
  segs.push({ kind: "final", teams, dur: FINAL_F });
  return segs;
}

export const PRO_TOTAL_FRAMES = buildSegments(TEAMS).reduce((s, x) => s + x.dur, 0);

export function ProAnalysis({ teams = TEAMS }: { teams?: ProTeam[] }) {
  const segments = useMemo(() => buildSegments(teams), [teams]);
  let cursor = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#08080F", fontFamily: FONT }}>
      {segments.map((seg, i) => {
        const from = cursor;
        cursor += seg.dur;
        const isFirst = i === 0;
        const isLast = i === segments.length - 1;
        const fadeIn = isFirst ? 0 : OVERLAP;
        const fadeOut = isLast ? 0 : OVERLAP;
        const seqDur = seg.dur + (isLast ? 0 : OVERLAP);
        return (
          <Sequence key={i} from={from} durationInFrames={seqDur} layout="none">
            <FadeWrap fadeIn={fadeIn} fadeOut={fadeOut} totalDur={seqDur}>
              {renderSegment(seg, teams)}
            </FadeWrap>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}

function renderSegment(seg: Seg, allTeams: ProTeam[]) {
  if (seg.kind === "title") return <TitleCard teams={allTeams} />;
  if (seg.kind === "intro") return <TeamIntro team={seg.team} />;
  if (seg.kind === "player") return <PlayerCard player={seg.player} team={seg.team} indexInTeam={seg.idx} isMvp={seg.isMvp} />;
  return <FinalCompare teams={seg.teams} />;
}

function TitleCard({ teams }: { teams: ProTeam[] }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleProgress = spring({ frame, fps, config: { damping: 24, mass: 1, stiffness: 90, overshootClamping: true } });
  const subOpacity = interpolate(frame, [fps * 0.4, fps * 1.1], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 0, background: "radial-gradient(ellipse at center, #1A0B2A 0%, #08080F 70%)", color: "white" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)",
          pointerEvents: "none",
        }}
      />
      <div style={{ fontSize: 13, letterSpacing: 8, color: "#A855F7", fontWeight: 900, marginBottom: 18, opacity: subOpacity, textTransform: "uppercase", textShadow: "0 0 14px #A855F7" }}>
        VCT World Tour · Pro Analysis
      </div>
      <div
        style={{
          fontSize: 96,
          fontWeight: 900,
          color: "white",
          letterSpacing: -3,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [50, 0])}px)`,
          opacity: titleProgress,
          lineHeight: 1,
          marginBottom: 36,
          textTransform: "uppercase",
          textShadow: "0 0 40px rgba(168,85,247,0.5)",
        }}
      >
        {teams.map((t) => t.tag).join(" · ")}
      </div>
      <div style={{ display: "flex", gap: 64, opacity: subOpacity, alignItems: "center" }}>
        {teams.map((team) => (
          <div key={team.tag} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <Img src={staticFile(`vlr/logos/${team.tag}.png`)} style={{ width: 88, height: 88, objectFit: "contain", filter: `drop-shadow(0 0 14px ${team.color})` }} />
            <div style={{ fontSize: 16, fontWeight: 900, color: team.color, letterSpacing: 3, textShadow: `0 0 10px ${team.color}` }}>{team.tag}</div>
            <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{team.region}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 44, fontSize: 12, color: "#6B7280", opacity: subOpacity, letterSpacing: 4, fontWeight: 700, textTransform: "uppercase" }}>
        Source · vlr.gg · last 90 days · 5-man starting roster
      </div>
    </AbsoluteFill>
  );
}

function FinalCompare({ teams }: { teams: ProTeam[] }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], { extrapolateRight: "clamp" });

  const size = 560;
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.36;
  const N = STAT_AXES.length;
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / N;
  const point = (i: number, r: number) =>
    [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))] as const;

  const mvps = teams.map((t) => ({ team: t, player: teamMVP(t) }));

  return (
    <AbsoluteFill style={{ padding: 60, display: "flex", flexDirection: "column", gap: 24, background: "radial-gradient(ellipse at center, #1A0B2A 0%, #08080F 70%)", color: "white" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px)",
          pointerEvents: "none",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 4, opacity: headerOpacity, position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 13, letterSpacing: 6, color: "#A855F7", fontWeight: 900, textTransform: "uppercase", textShadow: "0 0 12px #A855F7" }}>
          Top Performer · per Team
        </div>
        <div style={{ fontSize: 60, fontWeight: 900, color: "white", lineHeight: 1.05, letterSpacing: -2, textTransform: "uppercase", textShadow: "0 0 30px rgba(168,85,247,0.5)" }}>
          MVPs Compared
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, gap: 40, alignItems: "center", position: "relative", zIndex: 2 }}>
        <div style={{ flex: "0 0 auto", width: size, height: size, position: "relative" }}>
          <svg width={size} height={size}>
            <defs>
              {teams.map((t) => (
                <filter key={t.tag} id={`glow-final-${t.tag}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              ))}
            </defs>
            {[0.25, 0.5, 0.75, 1].map((lvl) => (
              <polygon
                key={lvl}
                points={STAT_AXES.map((_, i) => {
                  const [x, y] = point(i, R * lvl);
                  return `${x.toFixed(2)},${y.toFixed(2)}`;
                }).join(" ")}
                fill="none"
                stroke="#1F2333"
                strokeWidth={1}
              />
            ))}
            {STAT_AXES.map((_, i) => {
              const [x, y] = point(i, R);
              return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#1F2333" strokeWidth={1} strokeDasharray="2 4" />;
            })}
            {mvps.map(({ team, player }, idx) => {
              const prog = spring({ frame: frame - idx * 8, fps, config: { damping: 24, mass: 1, stiffness: 90, overshootClamping: true } });
              const poly = STAT_AXES.map((axis, i) => {
                const v = normalize(player.stats[axis.key], axis.min, axis.max);
                const [x, y] = point(i, R * v * prog);
                return `${x.toFixed(2)},${y.toFixed(2)}`;
              }).join(" ");
              return (
                <polygon
                  key={team.tag}
                  points={poly}
                  fill={team.color}
                  fillOpacity={0.25}
                  stroke={team.color}
                  strokeWidth={4}
                  strokeLinejoin="round"
                  filter={`url(#glow-final-${team.tag})`}
                />
              );
            })}
            {STAT_AXES.map((axis, i) => {
              const [x, y] = point(i, R + 26);
              const textAnchor = Math.abs(x - cx) < 5 ? "middle" : x > cx ? "start" : "end";
              const dy = y < cy ? 0 : y > cy + R * 0.5 ? 12 : 4;
              return (
                <text key={axis.key} x={x} y={y + dy} textAnchor={textAnchor} fontSize={14} fontWeight={900} fill="#94A3B8" opacity={headerOpacity} letterSpacing={2} style={{ textTransform: "uppercase" }}>
                  {axis.label}
                </text>
              );
            })}
          </svg>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          {mvps.map(({ team, player }, idx) => {
            const delay = idx * 10 + 8;
            const op = interpolate(frame, [delay, delay + fps * 0.4], [0, 1], { extrapolateRight: "clamp" });
            const x = interpolate(frame, [delay, delay + fps * 0.4], [16, 0], { extrapolateRight: "clamp" });
            return (
              <div
                key={team.tag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  padding: 18,
                  background: "rgba(20, 20, 30, 0.8)",
                  borderLeft: `4px solid ${team.color}`,
                  boxShadow: `0 0 24px ${team.color}33, inset 0 0 30px ${team.color}11`,
                  opacity: op,
                  transform: `translateX(${x}px)`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <Img src={staticFile(`vlr/avatars/${team.tag}-${player.alias}.png`)} style={{ width: 80, height: 80, objectFit: "cover", clipPath: "polygon(0 0, 88% 0, 100% 14%, 100% 100%, 12% 100%, 0 86%)", border: `2px solid ${team.color}` }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: "white", letterSpacing: -0.5, textTransform: "uppercase", textShadow: `0 0 12px ${team.color}` }}>{player.alias}</div>
                    <div style={{ fontSize: 13, fontWeight: 900, color: team.color, letterSpacing: 2 }}>{team.tag}</div>
                  </div>
                  <div style={{ fontSize: 11, color: team.color, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>{player.tagline}</div>
                  <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 600 }}>{player.real}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", minWidth: 100 }}>
                  <div style={{ fontSize: 10, color: "#6B7280", fontWeight: 800, letterSpacing: 2 }}>RATING</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: team.color, fontVariantNumeric: "tabular-nums", textShadow: `0 0 14px ${team.color}` }}>{player.stats.rating.toFixed(2)}</div>
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: "auto", fontSize: 11, color: "#6B7280", opacity: headerOpacity, letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>
            Source · vlr.gg / stats · timespan 90 days · MVP = highest rating in starting roster
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
