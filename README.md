# Lineup Studio

> 电竞数据视频在线制作工具 · 给电竞作者 / 主播 / UP 主 · 浏览器内编辑 + 实时预览 · 上传朋友照片自动抠图

[![Live](https://img.shields.io/badge/live-zhongrenfei1--hub.github.io/lineup--studio-A855F7?style=for-the-badge&logo=githubpages)](https://zhongrenfei1-hub.github.io/lineup-studio/)
[![License](https://img.shields.io/badge/license-MIT-22C55E?style=for-the-badge)](LICENSE)
[![Remotion](https://img.shields.io/badge/built%20with-Remotion%204-0EA5E9?style=for-the-badge&logo=react)](https://www.remotion.dev)

**🔗 Try it now → https://zhongrenfei1-hub.github.io/lineup-studio/**

---

## 它能干什么

把电竞战队 + 选手数据,1 分钟变成 74 秒高燃数据视频。

- **战队模板库** · EDG·PRX / EDG·T1 / PRX·T1(真实 vlr.gg 90 天数据)
- **在线编辑器** · 拖 slider 改 Rating/ACS/KAST,Player 实时同步
- **上传朋友照片** · 任意比例图,浏览器内裁剪 + AI 一键去背景
- **★ MVP 自动识别** · 队内 Rating 第一获徽章 + 8 秒头条段
- **LocalStorage 持久化** · 关掉浏览器再开,你改的东西还在
- **下载当前帧 PNG** · 截图发朋友圈
- **完整 mp4 渲染** · 候补名单中(Phase 3 后端 Lambda 上线)

## 当前 Phase

| | |
|---|---|
| **Phase 0** | ✅ Next.js 16 + Remotion Player + landing |
| **Phase 1.1** | ✅ 在线编辑器(双栏,实时同步) |
| **Phase 1.2** | ✅ 上传自定义头像 / 队标 |
| **Phase 1.2.b** | ✅ 裁剪 modal + AI 去背景(浏览器内 ONNX) |
| **Phase 1.2.c** | ✅ 战队模板库(3 模板) |
| **Phase 1.4** | ✅ LocalStorage 持久化 |
| **Phase 1.5** | 🟡 PNG 帧导出 · 完整 mp4 → waitlist |
| **Phase 1.3** | ⏳ 9:16 抖音版 |
| **Phase 2** | ⏳ Clerk 登录 + Supabase 存项目 |
| **Phase 3** | ⏳ VPS 渲染 worker + 队列 |
| **Phase 4** | ⏳ Stripe 付费 + 上线 |

## 本地开发

```bash
git clone https://github.com/zhongrenfei1-hub/lineup-studio.git
cd lineup-studio
npm install
npm run dev
# → http://localhost:3000
```

## 部署

```bash
npm run deploy
# build → push gh-pages → 1-3 分钟后 https://zhongrenfei1-hub.github.io/lineup-studio/ 自动更新
```

需要 `gh auth login` 已登录,且对 lineup-studio repo 有写权限。

## 技术栈

- **Next.js 16** · App Router · static export
- **React 19** · client-side state
- **Tailwind 4** · 深色电竞美学
- **Remotion 4** · `<Player>` 客户端渲染 composition
- **react-easy-crop** · 浏览器内裁剪
- **@imgly/background-removal** · ONNX + WebAssembly 抠图
- **html-to-image** · 帧截图导出
- **GitHub Pages** · 免费 CDN 托管

## 开源协议

代码 MIT · 框架版权各自归属。Remotion 商用需 [paid license](https://remotion.dev/license),个人/小团队/MVP demo 免费。

---

## English (TL;DR)

Esports stats video maker for creators. Pick teams, edit stats inline, upload friends' photos with auto background removal, watch live preview, download. Open source MIT, deployed free on GitHub Pages.

**Live:** https://zhongrenfei1-hub.github.io/lineup-studio/
