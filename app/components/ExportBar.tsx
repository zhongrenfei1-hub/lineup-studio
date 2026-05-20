"use client";

import { useState, RefObject } from "react";
import type { PlayerRef } from "@remotion/player";
import { toPng } from "html-to-image";
import { ProTeam } from "../composition/data";

type Props = {
  playerRef: RefObject<PlayerRef | null>;
  teams: ProTeam[];
  onImport: (teams: ProTeam[]) => void;
};

export function ExportBar({ playerRef, teams, onImport }: Props) {
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState("");

  async function exportCurrentFrame() {
    const player = playerRef.current;
    if (!player) return;
    setWorking(true);
    setMessage(null);
    try {
      const wasPlaying = player.isPlaying();
      player.pause();
      const node = player.getContainerNode();
      if (!node) throw new Error("no container");
      // 等一帧让暂停状态生效
      await new Promise((r) => setTimeout(r, 60));
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: false,
      });
      const a = document.createElement("a");
      const frame = player.getCurrentFrame();
      a.download = `lineup-studio-frame-${frame.toString().padStart(4, "0")}.png`;
      a.href = dataUrl;
      a.click();
      if (wasPlaying) player.play();
      setMessage("✓ 已下载");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setMessage(`✗ ${msg.slice(0, 80)}`);
    } finally {
      setWorking(false);
    }
  }

  function exportProject() {
    const blob = new Blob([JSON.stringify({ version: 1, teams }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    a.download = `lineup-studio-project-${ts}.json`;
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
    setMessage("✓ 项目 JSON 已下载");
  }

  async function shareUrl() {
    try {
      const json = JSON.stringify({ version: 1, teams });
      const encoded = btoa(encodeURIComponent(json));
      if (encoded.length > 60000) {
        setMessage("⚠ 项目太大(图片占太多空间),改用 💾 导出项目");
        return;
      }
      const url = `${window.location.origin}${window.location.pathname}#share=${encoded}`;
      await navigator.clipboard.writeText(url);
      setMessage(`✓ 分享链接已复制(${(url.length / 1024).toFixed(1)} KB)`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setMessage(`✗ ${msg.slice(0, 80)}`);
    }
  }

  async function importProject(file: File) {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (Array.isArray(data.teams) && data.teams.length >= 1) {
        onImport(data.teams);
        setMessage(`✓ 已导入 ${data.teams.length} 队`);
      } else {
        setMessage("✗ JSON 格式不对");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setMessage(`✗ ${msg.slice(0, 60)}`);
    }
  }

  function submitWaitlist(e: React.FormEvent) {
    e.preventDefault();
    // MVP: 存 localStorage,后期接 Tally / Formspree
    try {
      const existing = JSON.parse(localStorage.getItem("lineup-studio:waitlist") ?? "[]");
      existing.push({ email: waitlistEmail, at: new Date().toISOString() });
      localStorage.setItem("lineup-studio:waitlist", JSON.stringify(existing));
    } catch {
      // ignore
    }
    setMessage("✓ 已加入候补,完整 mp4 渲染上线时通知你");
    setWaitlistEmail("");
  }

  return (
    <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-4 backdrop-blur space-y-3">
      <div className="text-[10px] tracking-[3px] font-black text-purple-400 uppercase">
        Export
      </div>
      <div className="grid grid-cols-1 gap-2">
        <button
          onClick={exportCurrentFrame}
          disabled={working}
          className="bg-purple-500 hover:bg-purple-400 disabled:opacity-50 text-[#08080F] text-sm font-black tracking-wide px-4 py-2.5 rounded-lg transition"
        >
          {working ? "导出中…" : "📸 下载当前帧 PNG"}
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={exportProject}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-black tracking-wide px-3 py-2 rounded transition"
          >
            💾 导出项目
          </button>
          <label className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-black tracking-wide px-3 py-2 rounded transition cursor-pointer text-center">
            📥 导入项目
            <input
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void importProject(f);
                e.target.value = "";
              }}
            />
          </label>
        </div>
        <button
          onClick={shareUrl}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-black tracking-wide px-3 py-2 rounded transition"
        >
          🔗 复制分享链接(URL)
        </button>
        <div className="text-[10px] text-zinc-600 leading-relaxed">
          快捷键:Space 播停 · ← / → 跳 1s · Shift+← / → 跳 5s
        </div>
      </div>
      <form onSubmit={submitWaitlist} className="space-y-2">
        <div className="text-xs text-zinc-400 leading-relaxed">
          🎬 <span className="font-black text-white">完整 mp4 渲染</span> 即将上线(Phase 3 服务端 Lambda),留邮箱第一批通知:
        </div>
        <div className="flex gap-2">
          <input
            type="email"
            required
            value={waitlistEmail}
            onChange={(e) => setWaitlistEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-black tracking-wide px-3 py-2 rounded transition uppercase"
          >
            候补
          </button>
        </div>
      </form>
      {message && (
        <div className="text-xs text-purple-400 font-mono">{message}</div>
      )}
    </div>
  );
}
