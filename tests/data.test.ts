import { describe, it, expect } from "vitest";
import { TEAMS, normalize, teamMVP, teamAverages, SCHEMA_PRESETS, ProTeam } from "../app/composition/data";
import { TEMPLATES } from "../app/composition/templates";

describe("normalize", () => {
  it("clamps to 0-1", () => {
    expect(normalize(150, 100, 200)).toBe(0.5);
    expect(normalize(50, 100, 200)).toBe(0);
    expect(normalize(250, 100, 200)).toBe(1);
    expect(normalize(100, 100, 200)).toBe(0);
    expect(normalize(200, 100, 200)).toBe(1);
  });
});

describe("teamMVP", () => {
  it("picks highest-rating player from a team", () => {
    const team: ProTeam = {
      ...TEAMS[0],
      players: [
        { ...TEAMS[0].players[0], stats: { ...TEAMS[0].players[0].stats, rating: 1.0 } },
        { ...TEAMS[0].players[1], stats: { ...TEAMS[0].players[1].stats, rating: 1.5 } },
        { ...TEAMS[0].players[2], stats: { ...TEAMS[0].players[2].stats, rating: 1.2 } },
      ],
    };
    const mvp = teamMVP(team);
    expect(mvp.stats.rating).toBe(1.5);
  });

  it("default EDG MVP is CHICHOO (qiuqiu)", () => {
    const mvp = teamMVP(TEAMS[0]);
    expect(mvp.alias).toBe("CHICHOO");
  });
});

describe("teamAverages", () => {
  it("returns mean across 5 players", () => {
    const avg = teamAverages(TEAMS[0]);
    const expected =
      TEAMS[0].players.reduce((s, p) => s + p.stats.rating, 0) / TEAMS[0].players.length;
    expect(avg.rating).toBeCloseTo(expected, 4);
  });
});

describe("SCHEMA_PRESETS", () => {
  it("has 3 presets all with 6 axes", () => {
    expect(Object.keys(SCHEMA_PRESETS).length).toBe(3);
    for (const key of Object.keys(SCHEMA_PRESETS)) {
      expect(SCHEMA_PRESETS[key].axes.length).toBe(6);
    }
  });
});

describe("TEMPLATES", () => {
  it("every template has 2 teams of 5 starters", () => {
    expect(TEMPLATES.length).toBeGreaterThanOrEqual(3);
    for (const t of TEMPLATES) {
      expect(t.teams.length).toBe(2);
      for (const tm of t.teams) {
        expect(tm.players.length).toBe(5);
      }
    }
  });

  it("template ids are unique", () => {
    const ids = TEMPLATES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
