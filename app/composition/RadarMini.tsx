import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { STAT_AXES, StatKey, normalize } from "./data";

type Props = {
  readonly stats: Record<StatKey, number>;
  readonly color: string;
  readonly size: number;
  readonly delay?: number;
  readonly showLabels?: boolean;
  readonly compact?: boolean;
};

export function RadarMini({ stats, color, size, delay = 0, showLabels = true, compact = false }: Props) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - delay);

  const drawProgress = spring({
    frame: relFrame,
    fps,
    config: { damping: 24, mass: 1, stiffness: 90, overshootClamping: true },
  });

  const cx = size / 2;
  const cy = size / 2;
  const R = size * (compact ? 0.4 : 0.36);
  const N = STAT_AXES.length;
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / N;
  const point = (i: number, r: number) =>
    [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))] as const;

  const dataPolygon = STAT_AXES.map((axis, i) => {
    const v = normalize(stats[axis.key], axis.min, axis.max);
    const [x, y] = point(i, R * v * drawProgress);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");

  const labelOpacity = interpolate(relFrame, [0, fps * 0.4], [0, 1], { extrapolateRight: "clamp" });
  const glowId = `glow-${color.replace("#", "")}`;

  return (
    <svg width={size} height={size} style={{ overflow: "visible" }}>
      <defs>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
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
      <polygon
        points={dataPolygon}
        fill={color}
        fillOpacity={0.28}
        stroke={color}
        strokeWidth={4}
        strokeLinejoin="round"
        filter={`url(#${glowId})`}
      />
      {STAT_AXES.map((axis, i) => {
        const v = normalize(stats[axis.key], axis.min, axis.max);
        const [x, y] = point(i, R * v * drawProgress);
        return (
          <g key={axis.key}>
            <circle cx={x} cy={y} r={6} fill={color} filter={`url(#${glowId})`} />
            <circle cx={x} cy={y} r={3} fill="white" />
          </g>
        );
      })}
      {showLabels && STAT_AXES.map((axis, i) => {
        const [x, y] = point(i, R + (compact ? 20 : 26));
        const textAnchor = Math.abs(x - cx) < 5 ? "middle" : x > cx ? "start" : "end";
        const dy = y < cy ? 0 : y > cy + R * 0.5 ? 10 : 4;
        return (
          <g key={axis.key} opacity={labelOpacity}>
            <text
              x={x}
              y={y + dy}
              textAnchor={textAnchor}
              fontSize={compact ? 11 : 13}
              fontWeight={800}
              fill="#94A3B8"
              letterSpacing={1.5}
              style={{ textTransform: "uppercase" }}
            >
              {axis.label}
            </text>
            <text
              x={x}
              y={y + dy + (compact ? 16 : 19)}
              textAnchor={textAnchor}
              fontSize={compact ? 13 : 15}
              fontWeight={800}
              fill={color}
              style={{ filter: `drop-shadow(0 0 6px ${color})` }}
            >
              {axis.format(stats[axis.key])}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
