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

const DRG: ProTeam = {
  tag: "DRG" as ProTeam["tag"],
  name: "Dragon Ranger Gaming",
  region: "China",
  logo: "",
  color: "#22C55E",
  accent: "#86EFAC",
  players: [
    {
      id: "nicc",
      alias: "nicc",
      real: "Shao Yi-qun (邵逸群)",
      avatar: "",
      url: "",
      tagline: "Initiator · Controller",
      stats: { rating: 0.95, acs: 177.7, kd: 0.87, kast: 74, adr: 116.6, hs: 31, rnd: 384 },
    },
    {
      id: "flex1n",
      alias: "flex1n",
      real: "Lo Rui (罗瑞)",
      avatar: "",
      url: "",
      tagline: "Flex · Smokes",
      stats: { rating: 0.95, acs: 171.5, kd: 0.87, kast: 72, adr: 109.6, hs: 24, rnd: 384 },
    },
    {
      id: "life",
      alias: "life",
      real: "Qu Donghao (瞿东豪)",
      avatar: "",
      url: "",
      tagline: "Sentinel · Sharpshooter",
      stats: { rating: 0.80, acs: 189.8, kd: 0.79, kast: 68, adr: 124.5, hs: 37, rnd: 384 },
    },
    {
      id: "vo0kashu",
      alias: "vo0kashu",
      real: "Ilya Ushakov",
      avatar: "",
      url: "",
      tagline: "Star · Top Frag · CN #1",
      stats: { rating: 1.27, acs: 223.1, kd: 1.24, kast: 74, adr: 151.3, hs: 28, rnd: 384 },
    },
    {
      id: "akeman",
      alias: "akeman",
      real: "Zhang Haoran (张浩然) · 替补",
      avatar: "",
      url: "",
      tagline: "Sub · Duelist",
      stats: { rating: 0.92, acs: 195.0, kd: 0.95, kast: 71, adr: 128.0, hs: 26, rnd: 120 },
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
    id: "edg-vs-drg",
    name: "EDG · DRG",
    region: "中国内战 · VCT China",
    teams: [EDG, DRG],
    badge: "🇨🇳⚔️🇨🇳",
  },
  {
    id: "edg-vs-t1",
    name: "EDG · T1",
    region: "中国 vs 韩国",
    teams: [EDG, T1],
    badge: "🇨🇳⚔️🇰🇷",
  },
  {
    id: "drg-vs-prx",
    name: "DRG · PRX",
    region: "Masters London · 入围",
    teams: [DRG, PRX],
    badge: "🐉⚔️🌏",
  },
  {
    id: "prx-vs-t1",
    name: "PRX · T1",
    region: "新加坡 vs 韩国",
    teams: [PRX, T1],
    badge: "🌏⚔️🇰🇷",
  },
];
