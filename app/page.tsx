import { PreviewPlayer } from "./components/PreviewPlayer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08080F] text-white">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top, rgba(168, 85, 247, 0.18) 0%, transparent 60%), repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px)",
        }}
      />

      <nav className="relative z-10 max-w-7xl mx-auto flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 grid place-items-center font-black text-lg shadow-[0_0_24px_rgba(168,85,247,0.6)]">
            L
          </div>
          <div className="font-black text-lg tracking-wide">LINEUP STUDIO</div>
          <span className="ml-2 text-[10px] tracking-[3px] font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
            BETA
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <a href="#features" className="hover:text-white transition">特性</a>
          <a href="#pricing" className="hover:text-white transition">定价</a>
          <a
            href="https://github.com/zhongrenfei1-hub/lineup-studio"
            className="hover:text-white transition"
          >
            GitHub
          </a>
          <a
            href="#waitlist"
            className="bg-purple-500 hover:bg-purple-400 transition px-4 py-2 rounded-lg font-bold text-sm text-[#08080F] shadow-[0_0_18px_rgba(168,85,247,0.5)]"
          >
            加入候补 →
          </a>
        </div>
      </nav>

      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-10 pb-12 text-center">
        <div className="text-xs tracking-[8px] font-black text-purple-400 mb-5 uppercase">
          For Esports Creators · LPL · VCT · LCK · KPL
        </div>
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-[-0.04em] leading-[0.95] mb-6">
          数据视频·
          <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            一键出片
          </span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          上传战队 + 选手数据,1 分钟生成电竞风格高燃数据视频。
          <br />
          雷达图 · MVP 自动识别 · 真实头像 · 16:9 + 9:16 双比例。
          不写代码,直接出抖音/B 站/视频号能用的成片。
        </p>
        <div className="flex items-center justify-center gap-3 mb-12">
          <a
            href="#waitlist"
            className="bg-purple-500 hover:bg-purple-400 transition px-7 py-3.5 rounded-lg font-black tracking-wide text-[#08080F] shadow-[0_0_28px_rgba(168,85,247,0.5)]"
          >
            加入候补名单
          </a>
          <a
            href="https://github.com/zhongrenfei1-hub/lineup-studio"
            className="border border-zinc-700 hover:border-zinc-500 transition px-7 py-3.5 rounded-lg font-bold tracking-wide text-zinc-300"
          >
            ☆ Star on GitHub
          </a>
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-8 pb-20">
        <div className="text-center text-xs tracking-[6px] font-black text-zinc-500 mb-4 uppercase">
          ↓ Live Preview · EDG vs PRX Demo · 6 stats axes · 74 seconds
        </div>
        <PreviewPlayer />
      </section>

      <section id="features" className="relative z-10 max-w-6xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur"
          >
            <div className="text-2xl mb-3">{f.emoji}</div>
            <div className="text-lg font-black tracking-wide mb-2">{f.title}</div>
            <div className="text-sm text-zinc-400 leading-relaxed">{f.body}</div>
          </div>
        ))}
      </section>

      <section id="pricing" className="relative z-10 max-w-5xl mx-auto px-8 py-20">
        <div className="text-center mb-10">
          <div className="text-xs tracking-[6px] font-black text-purple-400 mb-3 uppercase">
            Pricing
          </div>
          <h2 className="text-4xl font-black tracking-tight">先免费 · 后随时升级</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PriceCard
            tier="Free"
            price="¥0"
            features={[
              "720p · 16:9 渲染",
              "每月 3 条视频",
              "Lineup Studio 角标水印",
              "Stats Radar 模板",
            ]}
            cta="开始使用(候补)"
            highlight={false}
          />
          <PriceCard
            tier="Creator"
            price="¥19/月"
            features={[
              "1080p · 16:9 + 9:16",
              "每月 30 条视频",
              "去水印",
              "全部模板(陆续上线)",
              "优先客服",
            ]}
            cta="加入候补"
            highlight
          />
        </div>
      </section>

      <section id="waitlist" className="relative z-10 max-w-3xl mx-auto px-8 py-20 text-center">
        <div className="text-xs tracking-[6px] font-black text-purple-400 mb-3 uppercase">
          Waitlist
        </div>
        <h2 className="text-4xl font-black tracking-tight mb-3">候补名单开启</h2>
        <p className="text-zinc-400 mb-8">
          MVP 上线时第一批通知 · 包含 50% 永久折扣 · 限前 200 名
        </p>
        <p className="text-zinc-500 text-sm">
          (等候表单接好邮件后开放,先 Star GitHub 跟进进度)
        </p>
      </section>

      <footer className="relative z-10 max-w-7xl mx-auto px-8 py-10 border-t border-zinc-900 text-center text-zinc-600 text-xs tracking-wider">
        © 2026 Lineup Studio · Open source under MIT · Built with Remotion
      </footer>
    </main>
  );
}

const FEATURES = [
  {
    emoji: "⚡",
    title: "1 分钟出片",
    body: "粘贴战队 + 6 项数据,浏览器实时预览,渲染下载 mp4。比 PR/AE 快 20 倍。",
  },
  {
    emoji: "🎯",
    title: "MVP 自动识别",
    body: "队内 Rating 最高的选手自动获得头条段 + ★ TEAM MVP 徽章 + 8 秒深度卡。",
  },
  {
    emoji: "📱",
    title: "16:9 + 9:16 双比例",
    body: "横版给 YouTube / B 站,竖版给抖音 / 快手 / 视频号,一份数据双版本同步出。",
  },
  {
    emoji: "🎨",
    title: "电竞美学",
    body: "黑底霓虹 + 战队色 glow + 斜切多边形头像。看着就像 ESPN 的赛事预告。",
  },
  {
    emoji: "🔓",
    title: "MIT 开源",
    body: "渲染引擎完全开源,自己 fork 也能跑(GitHub: pro-stats-radar)。",
  },
  {
    emoji: "🌏",
    title: "11 个电竞联赛(规划)",
    body: "LPL / VCT / LCK / KPL / Worlds / Masters / Champions Tour · 数据 schema 适配多游戏。",
  },
];

function PriceCard({
  tier,
  price,
  features,
  cta,
  highlight,
}: {
  tier: string;
  price: string;
  features: string[];
  cta: string;
  highlight: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-8 border ${
        highlight
          ? "bg-purple-500/10 border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.2)]"
          : "bg-zinc-950/60 border-zinc-800"
      }`}
    >
      <div className="text-xs tracking-[4px] font-black text-zinc-400 mb-2 uppercase">
        {tier}
      </div>
      <div className="text-5xl font-black tracking-tight mb-6">{price}</div>
      <ul className="space-y-2 mb-8">
        {features.map((f) => (
          <li key={f} className="text-zinc-300 text-sm flex items-start gap-2">
            <span className={highlight ? "text-purple-400" : "text-zinc-500"}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 rounded-lg font-black tracking-wide text-sm transition ${
          highlight
            ? "bg-purple-500 hover:bg-purple-400 text-[#08080F]"
            : "border border-zinc-700 hover:border-zinc-500 text-zinc-300"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}
