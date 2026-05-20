# Launch posts · v0.2.0

> 各平台投放文案,复制粘贴用

---

## Hacker News (Show HN)

**Title:** `Show HN: Lineup Studio – Browser-native esports stats radar video maker`

**URL:** `https://zhongrenfei1-hub.github.io/lineup-studio/`

**First comment (post yourself):**

```
Author here. Built this in ~5 evenings to scratch my own itch.

The pitch: drop in team + player stats, hit play, get a 60-90s
esports-style data video — all in your browser. No CLI, no Adobe.

Tech I had fun with:
- Remotion 4 `<Player>` running compositions client-side
- @imgly/background-removal — ONNX runtime in WASM, ~30MB model,
  lazy-loaded only if you tick "remove bg". Cuts a photo out
  in 3-5s on M-series Macs.
- React state → inputProps → Player. The whole 90s timeline
  re-renders when you drag a stat slider. Buttery.
- Static export to GitHub Pages. No backend. URL-encode whole
  project state into the hash for "share link" feature.
- Custom staticFile() wrapper for the basePath, since Remotion
  doesn't know about Next's basePath.

Stuff I cut for v0.2:
- True mp4 export needs a server (Lambda or VPS + Remotion CLI).
  Right now it's PNG-frame export + waitlist.
- 9:16 layout works but feels rushed — full responsive recompose
  is on the list.

Sample data is real (vlr.gg 90-day stats for VCT teams). MIT,
fork away — repo: https://github.com/zhongrenfei1-hub/lineup-studio
```

---

## Reddit r/VALORANT (or r/Esports)

**Title:** `[Tool] Built a free browser tool to make VCT-style data videos with your own teammates`

**Body:**

```
Made this in the past week, free & open source:
https://zhongrenfei1-hub.github.io/lineup-studio/

What it does:
- Pick a template (EDG·PRX, T1·PRX, FNC·TH, SEN·LEV, etc.)
- Live preview a 60-90s data video with radar chart, MVP detection,
  team logos, player portraits
- Upload friend's photo → browser crops + removes background (AI)
- Edit any stat with sliders, see it update in real time
- Export PNG frame, share URL, save project JSON

Real VCT data from vlr.gg (Masters London 2026 contenders).
Tried to make it look like an ESPN bumper, not Excel.

No login. No paywall. No watermark. Open source MIT.

If you make a video swapping in your 5-stack, drop the screenshot —
curious to see what people make.
```

---

## Reddit r/SideProject

**Title:** `Esports data video editor that runs entirely in the browser`

**Body:**

```
Site: https://zhongrenfei1-hub.github.io/lineup-studio/
Repo: https://github.com/zhongrenfei1-hub/lineup-studio

Stack: Next.js 16 static export → GitHub Pages.
Compositions render client-side via Remotion 4 Player. Image
upload → react-easy-crop → @imgly/background-removal (ONNX/WASM).
Hot reload of stats is instant because inputProps flow into the
composition.

Took 6 evenings. Currently free, MIT. Will add Supabase auth +
backend mp4 render (Lambda) for paid tier later.

Feedback welcome — esp. on the 9:16 portrait layout, that one's
still rough.
```

---

## Twitter/X thread (5 tweets)

**Tweet 1 (hook + video/gif):**
```
打开浏览器做电竞数据视频,我做了个工具:Lineup Studio 🎬

✅ 真实 VCT 数据(11 模板,4 大赛区)
✅ 上传朋友照片自动抠图
✅ 16:9 / 9:16 双比例
✅ 完全开源,MIT 协议

https://zhongrenfei1-hub.github.io/lineup-studio/

[视频/gif demo]
```

**Tweet 2 (tech):**
```
2/5 技术栈:Next.js 16 + Remotion 4 Player + Tailwind 4

实时编辑器无后端,Player 组件接 inputProps,React state 改了就同步重渲。
拖 stat slider 雷达图 60fps 跟着变,体感丝滑得不行。
```

**Tweet 3 (AI feature):**
```
3/5 AI 抠图全在浏览器跑:@imgly/background-removal

ONNX runtime + WASM,模型 30MB,首次下载,后续秒出。
M 系列 Mac 上 3-5 秒抠完一张人像,完全不依赖服务器。
```

**Tweet 4 (open source / fork):**
```
4/5 完全开源,代码 MIT 你可以:
- Fork 改成 LoL / 王者荣耀 / CS2 数据视频
- 改成自己公司 OKR 雷达图
- 改成产品对比图(2 个 SaaS battle)

repo: https://github.com/zhongrenfei1-hub/lineup-studio
```

**Tweet 5 (CTA):**
```
5/5 下一步要做的:
- 后端 mp4 渲染(完整下载)
- 项目云存储(账号系统已经搭好)
- 更多电竞游戏 schema

如果你想第一时间用上,加入候补:
https://zhongrenfei1-hub.github.io/lineup-studio/#waitlist
```

---

## 投放节奏

| 平台 | 时机 |
|---|---|
| Hacker News | 工作日 太平洋时间 8-10am(最佳前页机会) |
| Reddit r/VALORANT | 周末 / 比赛日(用户活跃) |
| Reddit r/SideProject | 周一晚 太平洋时间 |
| Twitter thread | 任意,@remotion 官号 RT 概率高 |
| 小红书 | 配截图 + 上传朋友头像 demo |
| B 站 (动态/视频) | 配 60s 操作录屏 |
