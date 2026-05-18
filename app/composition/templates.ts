import { ProTeam } from "./data";
import { TEAMS as SAMPLE_TEAMS } from "./data";

const T1: ProTeam = {
  tag: "T1",
  name: "T1",
  region: "South Korea",
  logo: "",
  color: "#0EA5E9",
  accent: "#7DD3FC",
  players: [
    {
      id: "2489",
      alias: "Munchkin",
      real: "Byeon Sang-beom (변상범)",
      avatar: "",
      url: "",
      tagline: "IGL · Initiator",
      stats: { rating: 0.98, acs: 178.0, kd: 0.93, kast: 73, adr: 115.2, hs: 19, rnd: 535 },
    },
    {
      id: "485",
      alias: "stax",
      real: "Kim Gu-taek (김구택)",
      avatar: "",
      url: "",
      tagline: "Sentinel · Anchor",
      stats: { rating: 1.04, acs: 187.8, kd: 1.07, kast: 74, adr: 123.0, hs: 28, rnd: 535 },
    },
    {
      id: "13039",
      alias: "Meteor",
      real: "Kim Tae-oh (김태오)",
      avatar: "",
      url: "",
      tagline: "Sharpshooter",
      stats: { rating: 0.92, acs: 195.2, kd: 0.94, kast: 70, adr: 130.8, hs: 30, rnd: 535 },
    },
    {
      id: "804",
      alias: "BuZz",
      real: "Yu Byeong-cheol (유병철)",
      avatar: "",
      url: "",
      tagline: "Duelist · Top Frag",
      stats: { rating: 1.06, acs: 241.7, kd: 1.15, kast: 73, adr: 148.9, hs: 22, rnd: 535 },
    },
    {
      id: "29833",
      alias: "iZu",
      real: "Ham Woo-ju (함우주)",
      avatar: "",
      url: "",
      tagline: "Star · Duelist",
      stats: { rating: 1.17, acs: 219.1, kd: 1.31, kast: 70, adr: 145.2, hs: 28, rnd: 535 },
    },
  ],
};

const EDG = SAMPLE_TEAMS[0];
const PRX = SAMPLE_TEAMS[1];

export type Template = {
  id: string;
  name: string;
  region: string;
  teams: [ProTeam, ProTeam];
  badge: string;
};

export const TEMPLATES: Template[] = [
  {
    id: "edg-vs-prx",
    name: "EDG · PRX",
    region: "中国 vs 太平洋",
    teams: [EDG, PRX],
    badge: "🇨🇳⚔️🌏",
  },
  {
    id: "edg-vs-t1",
    name: "EDG · T1",
    region: "中国 vs 韩国",
    teams: [EDG, T1],
    badge: "🇨🇳⚔️🇰🇷",
  },
  {
    id: "prx-vs-t1",
    name: "PRX · T1",
    region: "新加坡 vs 韩国",
    teams: [PRX, T1],
    badge: "🌏⚔️🇰🇷",
  },
];
