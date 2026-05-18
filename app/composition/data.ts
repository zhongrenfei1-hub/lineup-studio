import rawData from "./sample-teams.json";

export type StatKey = "rating" | "acs" | "kd" | "kast" | "adr" | "hs";

export type ProPlayer = {
  id: string;
  alias: string;
  real: string;
  avatar: string;
  url: string;
  tagline: string;
  stats: Record<StatKey | "rnd", number>;
};

export type ProTeam = {
  tag: "EDG" | "PRX" | "T1";
  name: string;
  region: string;
  logo: string;
  color: string;
  accent: string;
  players: ProPlayer[];
};

export const TEAMS = rawData as unknown as ProTeam[];

export const STAT_AXES: { key: StatKey; label: string; min: number; max: number; format: (v: number) => string }[] = [
  { key: "rating", label: "Rating",  min: 0.85, max: 1.25, format: (v) => v.toFixed(2) },
  { key: "acs",    label: "ACS",     min: 165,  max: 245,  format: (v) => v.toFixed(1) },
  { key: "kd",     label: "K:D",     min: 0.85, max: 1.35, format: (v) => v.toFixed(2) },
  { key: "kast",   label: "KAST",    min: 68,   max: 80,   format: (v) => `${v.toFixed(0)}%` },
  { key: "adr",    label: "ADR",     min: 110,  max: 160,  format: (v) => v.toFixed(1) },
  { key: "hs",     label: "HS%",     min: 18,   max: 32,   format: (v) => `${v.toFixed(0)}%` },
];

export function normalize(v: number, min: number, max: number) {
  return Math.max(0, Math.min(1, (v - min) / (max - min)));
}

export function teamAverages(team: ProTeam): Record<StatKey, number> {
  const keys: StatKey[] = ["rating", "acs", "kd", "kast", "adr", "hs"];
  const out: Record<string, number> = {};
  for (const k of keys) {
    out[k] = team.players.reduce((s, p) => s + p.stats[k], 0) / team.players.length;
  }
  return out as Record<StatKey, number>;
}

export function teamMVP(team: ProTeam): ProPlayer {
  return team.players.slice().sort((a, b) => b.stats.rating - a.stats.rating)[0];
}
