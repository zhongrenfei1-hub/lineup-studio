"use client";

import { useState } from "react";
import { TEMPLATES } from "../composition/templates";
import { ProTeam } from "../composition/data";
import { staticFile } from "../composition/lib";

export function TemplateLibrary({ onPick }: { onPick: (teams: ProTeam[]) => void }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(TEMPLATES[0].id);

  function selectTemplate(id: string) {
    const t = TEMPLATES.find((x) => x.id === id);
    if (t) {
      setActiveId(id);
      onPick([t.teams[0], t.teams[1]]);
      setOpen(false);
    }
  }

  const active = TEMPLATES.find((t) => t.id === activeId);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 hover:border-purple-500/50 rounded-lg px-4 py-2.5 transition w-full"
      >
        <span className="text-xl">{active?.badge}</span>
        <div className="flex flex-col items-start min-w-0">
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
            模板
          </span>
          <span className="text-sm font-black text-white">{active?.name}</span>
        </div>
        <span className="ml-auto text-zinc-500">▾</span>
      </button>

      {open && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-zinc-950 border border-zinc-800 rounded-lg shadow-[0_24px_64px_rgba(0,0,0,0.5)] overflow-hidden">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => selectTemplate(t.id)}
              className={`flex items-center gap-3 px-4 py-3 w-full text-left transition ${
                t.id === activeId
                  ? "bg-purple-500/10"
                  : "hover:bg-zinc-900"
              }`}
            >
              <span className="text-xl">{t.badge}</span>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {t.teams.map((tm) => (
                    <img
                      key={tm.tag}
                      src={staticFile(`vlr/logos/${tm.tag}.png`)}
                      alt={tm.tag}
                      className="w-5 h-5 object-contain"
                    />
                  ))}
                  <span className="text-sm font-black text-white">{t.name}</span>
                </div>
                <span className="text-[11px] text-zinc-500 mt-0.5">{t.region}</span>
              </div>
              {t.id === activeId && (
                <span className="text-purple-400 text-sm font-black">✓</span>
              )}
            </button>
          ))}
          <div className="px-4 py-2 text-[10px] text-zinc-600 border-t border-zinc-900 uppercase tracking-widest font-bold">
            更多联赛模板规划中…
          </div>
        </div>
      )}
    </div>
  );
}
