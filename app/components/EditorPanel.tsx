"use client";

import { useState } from "react";
import { ProTeam, ProPlayer, StatKey, STAT_AXES } from "../composition/data";
import { staticFile } from "../composition/lib";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

type Props = {
  teams: ProTeam[];
  onChange: (teams: ProTeam[]) => void;
};

export function EditorPanel({ teams, onChange }: Props) {
  const [activeTeam, setActiveTeam] = useState(0);
  const [activePlayer, setActivePlayer] = useState(0);

  const team = teams[activeTeam];
  const player = team.players[activePlayer];

  function updateTeam(patch: Partial<ProTeam>) {
    const next = [...teams];
    next[activeTeam] = { ...team, ...patch };
    onChange(next);
  }

  function updatePlayer(patch: Partial<ProPlayer>) {
    const next = [...teams];
    const players = [...team.players];
    players[activePlayer] = { ...player, ...patch };
    next[activeTeam] = { ...team, players };
    onChange(next);
  }

  function updateStat(key: StatKey, value: number) {
    updatePlayer({ stats: { ...player.stats, [key]: value } });
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950/80 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur">
      <div className="px-5 py-4 border-b border-zinc-800">
        <div className="text-[10px] tracking-[3px] font-black text-purple-400 mb-1 uppercase">
          Live Editor
        </div>
        <div className="text-sm text-zinc-400">改任何字段,左边预览实时更新</div>
      </div>

      <div className="flex border-b border-zinc-800">
        {teams.map((t, i) => (
          <button
            key={t.tag}
            onClick={() => {
              setActiveTeam(i);
              setActivePlayer(0);
            }}
            className={`flex-1 px-4 py-3 text-sm font-black tracking-wide transition ${
              activeTeam === i
                ? "bg-purple-500/15 text-white border-b-2 border-purple-500"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {t.tag}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        <div className="space-y-2">
          <Label>战队</Label>
          <div className="grid grid-cols-2 gap-2">
            <FieldInput
              label="Name"
              value={team.name}
              onChange={(v) => updateTeam({ name: v })}
            />
            <FieldInput
              label="Region"
              value={team.region}
              onChange={(v) => updateTeam({ region: v })}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
              Color
            </label>
            <input
              type="color"
              value={team.color}
              onChange={(e) => updateTeam({ color: e.target.value })}
              className="w-12 h-9 rounded border border-zinc-700 bg-transparent cursor-pointer"
            />
            <span className="text-xs text-zinc-400 font-mono">{team.color}</span>
          </div>
          <AssetUpload
            label="队标"
            src={team.logoUrl ?? staticFile(`vlr/logos/${team.tag}.png`)}
            onPick={async (file) => updateTeam({ logoUrl: await fileToDataUrl(file) })}
            onReset={() => updateTeam({ logoUrl: undefined })}
            isCustom={!!team.logoUrl}
          />
        </div>

        <div className="space-y-2">
          <Label>选手 (5)</Label>
          <div className="flex flex-wrap gap-1.5">
            {team.players.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActivePlayer(i)}
                className={`px-3 py-1.5 text-xs font-bold rounded transition ${
                  activePlayer === i
                    ? "bg-purple-500 text-[#08080F]"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                {p.alias}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>{player.alias} · 资料</Label>
          <AssetUpload
            label="头像 · 上传朋友照片"
            src={player.avatarUrl ?? staticFile(`vlr/avatars/${team.tag}-${player.alias}.png`)}
            onPick={async (file) => updatePlayer({ avatarUrl: await fileToDataUrl(file) })}
            onReset={() => updatePlayer({ avatarUrl: undefined })}
            isCustom={!!player.avatarUrl}
          />
          <div className="grid grid-cols-1 gap-2">
            <FieldInput
              label="Alias (显示名)"
              value={player.alias}
              onChange={(v) => updatePlayer({ alias: v })}
            />
            <FieldInput
              label="Real name"
              value={player.real}
              onChange={(v) => updatePlayer({ real: v })}
            />
            <FieldInput
              label="Tagline"
              value={player.tagline}
              onChange={(v) => updatePlayer({ tagline: v })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>{player.alias} · 6 项数据</Label>
          {STAT_AXES.map((ax) => (
            <StatSlider
              key={ax.key}
              label={ax.label}
              value={player.stats[ax.key]}
              min={ax.min * 0.7}
              max={ax.max * 1.15}
              step={ax.key === "rating" || ax.key === "kd" ? 0.01 : 0.1}
              format={ax.format}
              onChange={(v) => updateStat(ax.key, v)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AssetUpload({
  label,
  src,
  onPick,
  onReset,
  isCustom,
}: {
  label: string;
  src: string;
  onPick: (f: File) => Promise<void>;
  onReset: () => void;
  isCustom: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="relative w-14 h-14 rounded border border-zinc-700 overflow-hidden bg-zinc-900 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="preview" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
          {label}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <label className="cursor-pointer text-xs bg-purple-500 hover:bg-purple-400 text-[#08080F] px-3 py-1.5 rounded font-bold tracking-wide">
            选图
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void onPick(f);
                e.target.value = "";
              }}
            />
          </label>
          {isCustom && (
            <button
              onClick={onReset}
              className="text-[10px] text-zinc-500 hover:text-zinc-300 uppercase tracking-widest font-bold"
            >
              ↺ 默认
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] tracking-[3px] font-black text-zinc-500 uppercase">
      {children}
    </div>
  );
}

function FieldInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-sm text-white focus:outline-none focus:border-purple-500"
      />
    </label>
  );
}

function StatSlider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
          {label}
        </span>
        <span className="text-sm font-black text-purple-400 tabular-nums">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-purple-500"
      />
    </div>
  );
}
