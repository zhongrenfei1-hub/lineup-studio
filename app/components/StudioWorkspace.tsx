"use client";

import { useEffect, useRef, useState } from "react";
import type { PlayerRef } from "@remotion/player";
import { PreviewPlayer } from "./PreviewPlayer";
import { EditorPanel } from "./EditorPanel";
import { TemplateLibrary } from "./TemplateLibrary";
import { ExportBar } from "./ExportBar";
import { ProjectList } from "./ProjectList";
import { TEAMS, ProTeam } from "../composition/data";

const STORAGE_KEY = "lineup-studio:teams";

type Orientation = "landscape" | "portrait";

export function StudioWorkspace() {
  const [teams, setTeams] = useState<ProTeam[]>(TEAMS);
  const [hydrated, setHydrated] = useState(false);
  const [orientation, setOrientation] = useState<Orientation>("landscape");
  const playerRef = useRef<PlayerRef>(null);

  // 加载持久化数据(仅首次,URL hash 优先于 localStorage)
  useEffect(() => {
    let loaded = false;
    try {
      if (typeof window !== "undefined" && window.location.hash.startsWith("#share=")) {
        const encoded = window.location.hash.slice(7);
        const json = decodeURIComponent(atob(encoded));
        const data = JSON.parse(json);
        if (Array.isArray(data.teams) && data.teams.length >= 1) {
          setTeams(data.teams);
          loaded = true;
        }
      }
    } catch {
      // ignore — fall back to localStorage
    }
    if (!loaded) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as ProTeam[];
          if (Array.isArray(parsed) && parsed.length >= 1) {
            setTeams(parsed);
          }
        }
      } catch {
        // ignore
      }
    }
    setHydrated(true);
  }, []);

  // 键盘快捷键
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // 只在非 input/textarea 内才响应
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      const player = playerRef.current;
      if (!player) return;
      if (e.code === "Space") {
        e.preventDefault();
        if (player.isPlaying()) player.pause();
        else player.play();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        const step = e.shiftKey ? 150 : 30;
        player.seekTo(Math.max(0, player.getCurrentFrame() - step));
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        const step = e.shiftKey ? 150 : 30;
        player.seekTo(player.getCurrentFrame() + step);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 保存到 localStorage,debounce 300ms 避免 slider 拖动每帧写
  useEffect(() => {
    if (!hydrated) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (msg.toLowerCase().includes("quota")) {
          console.warn("[lineup-studio] localStorage quota exceeded — try smaller avatars");
        }
      }
    }, 300);
    return () => clearTimeout(t);
  }, [teams, hydrated]);

  function reset() {
    setTeams(TEAMS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-[10px] tracking-[4px] font-black text-zinc-500 uppercase">
            ↓ Live Preview · 实时同步右侧编辑
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-zinc-900 rounded-md p-0.5 text-xs font-black tracking-widest uppercase">
              <button
                onClick={() => setOrientation("landscape")}
                className={`px-3 py-1 rounded transition ${
                  orientation === "landscape"
                    ? "bg-purple-500 text-[#08080F]"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="16:9 — YouTube / B 站"
              >
                16:9
              </button>
              <button
                onClick={() => setOrientation("portrait")}
                className={`px-3 py-1 rounded transition ${
                  orientation === "portrait"
                    ? "bg-purple-500 text-[#08080F]"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="9:16 — 抖音 / 快手 (实验中)"
              >
                9:16
              </button>
            </div>
            <button
              onClick={reset}
              className="text-xs text-zinc-500 hover:text-purple-400 transition font-bold uppercase tracking-widest"
            >
              ↺ Reset
            </button>
          </div>
        </div>
        <div
          className={
            orientation === "portrait"
              ? "mx-auto"
              : ""
          }
          style={orientation === "portrait" ? { maxWidth: 360 } : undefined}
        >
          <PreviewPlayer
            teams={teams}
            playerRef={playerRef}
            orientation={orientation}
          />
        </div>
        <ExportBar playerRef={playerRef} teams={teams} onImport={setTeams} />
        <ProjectList teams={teams} onLoad={setTeams} />
      </div>
      <div className="lg:sticky lg:top-6 space-y-3">
        <TemplateLibrary onPick={setTeams} />
        <div className="h-[680px]">
          <EditorPanel teams={teams} onChange={setTeams} />
        </div>
      </div>
    </div>
  );
}
