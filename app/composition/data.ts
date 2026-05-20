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
  avatarUrl?: string;
};

export type ProTeam = {
  tag: "EDG" | "PRX" | "T1";
  name: string;
  region: string;
  logo: string;
  color: string;
  accent: string;
  players: ProPlayer[];
  logoUrl?: string;
};

export const TEAMS = rawData as unknown as ProTeam[];

export type AxisSpec = { key: StatKey; label: string; min: number; max: number; format: (v: number) => string };

export const SCHEMA_PRESETS: Record<string, { name: string; axes: AxisSpec[] }> = {
  valorant: {
    name: "Valorant · vlr.gg",
    axes: [
      { key: "rating", label: "Rating",  min: 0.85, max: 1.25, format: (v) => v.toFixed(2) },
      { key: "acs",    label: "ACS",     min: 165,  max: 245,  format: (v) => v.toFixed(1) },
      { key: "kd",     label: "K:D",     min: 0.85, max: 1.35, format: (v) => v.toFixed(2) },
      { key: "kast",   label: "KAST",    min: 68,   max: 80,   format: (v) => `${v.toFixed(0)}%` },
      { key: "adr",    label: "ADR",     min: 110,  max: 160,  format: (v) => v.toFixed(1) },
      { key: "hs",     label: "HS%",     min: 18,   max: 32,   format: (v) => `${v.toFixed(0)}%` },
    ],
  },
  lol: {
    name: "LoL · KDA + Lane",
    axes: [
      { key: "rating", label: "KDA",     min: 1.5, max: 6.0,  format: (v) => v.toFixed(2) },
      { key: "acs",    label: "CSPM",    min: 6.0, max: 11.0, format: (v) => v.toFixed(2) },
      { key: "kd",     label: "K/D",     min: 0.8, max: 4.0,  format: (v) => v.toFixed(2) },
      { key: "kast",   label: "KP%",     min: 55,  max: 85,   format: (v) => `${v.toFixed(0)}%` },
      { key: "adr",    label: "DPM",     min: 350, max: 700,  format: (v) => v.toFixed(0) },
      { key: "hs",     label: "VS/Min",  min: 0.8, max: 2.4,  format: (v) => v.toFixed(2) },
    ],
  },
  custom: {
    name: "通用 · 6 维任意",
    axes: [
      { key: "rating", label: "维度 1", min: 0,   max: 100, format: (v) => v.toFixed(0) },
      { key: "acs",    label: "维度 2", min: 0,   max: 100, format: (v) => v.toFixed(0) },
      { key: "kd",     label: "维度 3", min: 0,   max: 100, format: (v) => v.toFixed(0) },
      { key: "kast",   label: "维度 4", min: 0,   max: 100, format: (v) => v.toFixed(0) },
      { key: "adr",    label: "维度 5", min: 0,   max: 100, format: (v) => v.toFixed(0) },
      { key: "hs",     label: "维度 6", min: 0,   max: 100, format: (v) => v.toFixed(0) },
    ],
  },
};

export const STAT_AXES: AxisSpec[] = SCHEMA_PRESETS.valorant.axes;

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
