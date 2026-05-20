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

const FNC: ProTeam = {
  tag: "FNC" as ProTeam["tag"],
  name: "Fnatic",
  region: "EMEA",
  logo: "",
  color: "#FF6B00",
  accent: "#FED7AA",
  players: [
    { id: "boaster", alias: "boaster", real: "Jake Howlett", avatar: "", url: "", tagline: "IGL · Smokes", stats: { rating: 0.98, acs: 169.9, kd: 0.91, kast: 72, adr: 108.7, hs: 29, rnd: 323 } },
    { id: "crashies", alias: "crashies", real: "Austin Roberts", avatar: "", url: "", tagline: "Initiator", stats: { rating: 1.03, acs: 172.7, kd: 1.05, kast: 71, adr: 116.3, hs: 28, rnd: 323 } },
    { id: "kaajak", alias: "kaajak", real: "Kajetan Haremski", avatar: "", url: "", tagline: "Duelist · Top Frag", stats: { rating: 1.07, acs: 230.1, kd: 1.17, kast: 67, adr: 149.2, hs: 31, rnd: 323 } },
    { id: "cyvoph", alias: "cyvoph", real: "Clement Millard", avatar: "", url: "", tagline: "Sentinel · 新人", stats: { rating: 1.0, acs: 200.0, kd: 1.0, kast: 72, adr: 130.0, hs: 25, rnd: 200 } },
    { id: "veqaj", alias: "veqaj", real: "Sylvain Pattyn", avatar: "", url: "", tagline: "Flex · 新人", stats: { rating: 1.0, acs: 200.0, kd: 1.0, kast: 72, adr: 130.0, hs: 25, rnd: 200 } },
  ],
};

const TH: ProTeam = {
  tag: "TH" as ProTeam["tag"],
  name: "Team Heretics",
  region: "EMEA",
  logo: "",
  color: "#F59E0B",
  accent: "#FDE68A",
  players: [
    { id: "nats", alias: "nats", real: "Ayaz Akhmetshin", avatar: "", url: "", tagline: "Star · IGL", stats: { rating: 0.98, acs: 202.1, kd: 1.02, kast: 69, adr: 138.2, hs: 22, rnd: 362 } },
    { id: "purp0", alias: "purp0", real: "Semyon Borchev", avatar: "", url: "", tagline: "Anchor · 78% Hit", stats: { rating: 1.05, acs: 180.1, kd: 1.11, kast: 76, adr: 120.3, hs: 39, rnd: 362 } },
    { id: "wayne", alias: "wayne", real: "Wayne Chang", avatar: "", url: "", tagline: "Initiator", stats: { rating: 0.93, acs: 170.9, kd: 0.86, kast: 74, adr: 110.9, hs: 32, rnd: 362 } },
    { id: "miniboo", alias: "miniboo", real: "Dominykas Lukaševičius", avatar: "", url: "", tagline: "Top Frag", stats: { rating: 1.03, acs: 213.5, kd: 1.10, kast: 67, adr: 135.0, hs: 28, rnd: 362 } },
    { id: "kamo", alias: "kamo", real: "Kamil Frąckowiak", avatar: "", url: "", tagline: "Duelist", stats: { rating: 1.04, acs: 220.8, kd: 1.09, kast: 72, adr: 147.5, hs: 31, rnd: 362 } },
  ],
};

const SEN: ProTeam = {
  tag: "SEN" as ProTeam["tag"],
  name: "Sentinels",
  region: "Americas",
  logo: "",
  color: "#FF1744",
  accent: "#FCA5A5",
  players: [
    { id: "johnqt", alias: "johnqt", real: "Mohamed Amine Ouarid", avatar: "", url: "", tagline: "IGL · Smokes", stats: { rating: 1.06, acs: 182.8, kd: 1.07, kast: 71, adr: 118.6, hs: 26, rnd: 354 } },
    { id: "reduxx", alias: "reduxx", real: "Yassin Aboulalazm", avatar: "", url: "", tagline: "Duelist · Top Frag", stats: { rating: 1.09, acs: 227.7, kd: 1.11, kast: 74, adr: 144.5, hs: 24, rnd: 354 } },
    { id: "jerrwin", alias: "jerrwin", real: "Gurjiwan Gill", avatar: "", url: "", tagline: "Sub · Sentinel", stats: { rating: 0.89, acs: 207.5, kd: 0.96, kast: 66, adr: 129.1, hs: 18, rnd: 311 } },
    { id: "cortezia", alias: "cortezia", real: "Gabriel Cortez", avatar: "", url: "", tagline: "Star · Americas #1", stats: { rating: 1.16, acs: 205.6, kd: 1.25, kast: 73, adr: 135.8, hs: 30, rnd: 354 } },
    { id: "jonahp", alias: "jonahp", real: "Jonah Pulice", avatar: "", url: "", tagline: "Sentinel · Anchor", stats: { rating: 0.92, acs: 179.8, kd: 0.90, kast: 72, adr: 124.6, hs: 23, rnd: 354 } },
  ],
};

const LEV: ProTeam = {
  tag: "LEV" as ProTeam["tag"],
  name: "Leviatán",
  region: "Americas",
  logo: "",
  color: "#06B6D4",
  accent: "#67E8F0",
  players: [
    { id: "artzin", alias: "artzin", real: "Arthur Araujo", avatar: "", url: "", tagline: "Duelist · Top Frag", stats: { rating: 1.07, acs: 210.5, kd: 1.10, kast: 71, adr: 142.5, hs: 24, rnd: 360 } },
    { id: "nerve", alias: "nerve", real: "Michael Yerrow", avatar: "", url: "", tagline: "Initiator", stats: { rating: 0.92, acs: 169.5, kd: 0.89, kast: 71, adr: 115.3, hs: 28, rnd: 360 } },
    { id: "eeiu", alias: "eeiu", real: "Daniel Vucenovic", avatar: "", url: "", tagline: "Flex · IGL", stats: { rating: 0.95, acs: 179.4, kd: 0.93, kast: 65, adr: 120.1, hs: 27, rnd: 360 } },
    { id: "koalanoob", alias: "koalanoob", real: "Gianfranco Potestio", avatar: "", url: "", tagline: "Sentinel", stats: { rating: 0.84, acs: 181.6, kd: 0.82, kast: 68, adr: 120.4, hs: 23, rnd: 360 } },
    { id: "alym", alias: "alym", real: "Torogul Baidyldaev", avatar: "", url: "", tagline: "Duelist", stats: { rating: 0.91, acs: 212.2, kd: 0.97, kast: 67, adr: 133.4, hs: 20, rnd: 360 } },
  ],
};

const _100T: ProTeam = {
  tag: "100T" as ProTeam["tag"],
  name: "100 Thieves",
  region: "Americas",
  logo: "",
  color: "#F97316",
  accent: "#FED7AA",
  players: [
    { id: "vora", alias: "vora", real: "Jordan Pulwer", avatar: "", url: "", tagline: "Smokes", stats: { rating: 0.92, acs: 167.8, kd: 0.92, kast: 74, adr: 117.2, hs: 25, rnd: 394 } },
    { id: "cryocells", alias: "cryocells", real: "Matthew Panganiban", avatar: "", url: "", tagline: "Sentinel · Anchor", stats: { rating: 1.06, acs: 201.9, kd: 1.15, kast: 72, adr: 132.8, hs: 22, rnd: 394 } },
    { id: "asuna", alias: "asuna", real: "Peter Mazuryk", avatar: "", url: "", tagline: "Duelist · Top Frag", stats: { rating: 1.05, acs: 210.0, kd: 1.05, kast: 74, adr: 136.0, hs: 20, rnd: 394 } },
    { id: "timotino", alias: "timotino", real: "Timothée Lavigne Dupont", avatar: "", url: "", tagline: "Duelist", stats: { rating: 1.02, acs: 223.1, kd: 1.02, kast: 69, adr: 144.0, hs: 22, rnd: 394 } },
    { id: "bang", alias: "bang", real: "Sean Bezerra", avatar: "", url: "", tagline: "Star · IGL", stats: { rating: 1.15, acs: 199.6, kd: 1.18, kast: 77, adr: 124.4, hs: 33, rnd: 394 } },
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
  {
    id: "fnc-vs-th",
    name: "FNC · TH",
    region: "EMEA 内战 · Fnatic vs Heretics",
    teams: [FNC, TH],
    badge: "🇪🇺⚔️🇪🇸",
  },
  {
    id: "sen-vs-lev",
    name: "SEN · LEV",
    region: "Americas · 美国 vs 拉美",
    teams: [SEN, LEV],
    badge: "🇺🇸⚔️🌎",
  },
  {
    id: "sen-vs-100t",
    name: "SEN · 100T",
    region: "Americas 内战 · 红黑双雄",
    teams: [SEN, _100T],
    badge: "🦅⚔️💯",
  },
  {
    id: "fnc-vs-sen",
    name: "FNC · SEN",
    region: "EMEA vs Americas · 世界决赛风",
    teams: [FNC, SEN],
    badge: "🇪🇺⚔️🇺🇸",
  },
  {
    id: "th-vs-100t",
    name: "TH · 100T",
    region: "EMEA vs Americas",
    teams: [TH, _100T],
    badge: "🇪🇸⚔️💯",
  },
];
