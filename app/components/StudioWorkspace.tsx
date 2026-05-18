"use client";

import { useState } from "react";
import { PreviewPlayer } from "./PreviewPlayer";
import { EditorPanel } from "./EditorPanel";
import { TEAMS, ProTeam } from "../composition/data";

export function StudioWorkspace() {
  const [teams, setTeams] = useState<ProTeam[]>(TEAMS);

  function reset() {
    setTeams(TEAMS);
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
        <PreviewPlayer teams={teams} />
      </div>
      <div className="lg:sticky lg:top-6 h-[680px]">
        <EditorPanel teams={teams} onChange={setTeams} />
      </div>
    </div>
  );
}
