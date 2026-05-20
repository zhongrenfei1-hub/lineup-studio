"use client";

import { useEffect, useRef, useState } from "react";
import type { PlayerRef } from "@remotion/player";
import { PreviewPlayer } from "./PreviewPlayer";
import { EditorPanel } from "./EditorPanel";
import { TemplateLibrary } from "./TemplateLibrary";
import { ExportBar } from "./ExportBar";
import { TEAMS, ProTeam } from "../composition/data";

const STORAGE_KEY = "lineup-studio:teams";

export function StudioWorkspace() {
  const [teams, setTeams] = useState<ProTeam[]>(TEAMS);
  const [hydrated, setHydrated] = useState(false);
  const playerRef = useRef<PlayerRef>(null);

  // 加载持久化数据(仅首次)
  useEffect(() => {
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
    setHydrated(true);
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
          <button
            onClick={reset}
            className="text-xs text-zinc-500 hover:text-purple-400 transition font-bold uppercase tracking-widest"
          >
            ↺ Reset
          </button>
        </div>
        <PreviewPlayer teams={teams} playerRef={playerRef} />
        <ExportBar playerRef={playerRef} />
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
