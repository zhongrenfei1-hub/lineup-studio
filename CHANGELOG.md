# Changelog

## v0.2.0 · 2026-05-20

### Build · 浏览器内全闭环

- **Phase 1.1** 在线编辑器(双栏,实时同步 Player)
- **Phase 1.2** 上传自定义头像 / 队标
- **Phase 1.2.b** 浏览器内裁剪 + AI 抠图(react-easy-crop + @imgly/background-removal)
- **Phase 1.2.c+** 8 战队 / 11 模板(EDG · PRX · T1 · DRG · FNC · TH · SEN · LEV · 100T)
- **Phase 1.3** 16:9 / 9:16 双比例 + portrait 布局重排
- **Phase 1.4** LocalStorage 持久化
- **Phase 1.5** PNG 帧导出 + 完整 mp4 waitlist
- **Phase 1.6** 项目 JSON 导出 / 导入
- **Phase 1.7** 键盘快捷键 + URL share 链接
- **Phase 1.8** SCHEMA_PRESETS (Valorant / LoL / 通用)
- **Phase 1.9** 时长 preset(快 32s / 标准 74s / 完整 120s)
- **Phase 2** Supabase Auth + Projects table 骨架

### Sell · 增长基建

- README + badges, OG / Twitter meta tags
- Waitlist 邮件收集
- `docs/social-posts.md` · 小红书 / 抖音 / B 站 文案
- `docs/launch-posts.md` · HN / Reddit / Twitter 投放
- GitHub Release v0.2.0

### Test · 质量门

- `scripts/smoke.sh` · curl + 关键字校验
- `npm test` · vitest 7 用例
- `.github/workflows/deploy.yml` · push main → test → build → gh-pages → smoke

### Fix · CI 稳定

- `git config http.postBuffer 524288000` 解决大 wasm 推 gh-pages HTTP 400
- `output: "export"` + custom staticFile wrapper 适配 basePath

---

## v0.1.0 · 2026-05-18

- Phase 0 Next.js 16 + Remotion Player landing
- 部署 https://zhongrenfei1-hub.github.io/lineup-studio/
