"use client";

import { useCallback, useEffect, useState } from "react";
import { getSupabase, supabaseEnabled, ProjectRow } from "../lib/supabase";
import { ProTeam } from "../composition/data";

type Props = {
  teams: ProTeam[];
  onLoad: (teams: ProTeam[]) => void;
};

export function ProjectList({ teams, onLoad }: Props) {
  const [signedIn, setSignedIn] = useState(false);
  const [list, setList] = useState<ProjectRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const sb = getSupabase();
    if (!sb) return;
    const { data } = await sb
      .from("projects")
      .select("*")
      .order("updated_at", { ascending: false });
    setList((data as ProjectRow[] | null) ?? []);
  }, []);

  useEffect(() => {
    if (!supabaseEnabled) return;
    const sb = getSupabase();
    if (!sb) return;
    sb.auth.getUser().then(({ data }) => {
      setSignedIn(Boolean(data.user));
      if (data.user) void refresh();
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => {
      setSignedIn(Boolean(session?.user));
      if (session?.user) void refresh();
      else setList([]);
    });
    return () => sub.subscription.unsubscribe();
  }, [refresh]);

  async function saveAs() {
    const sb = getSupabase();
    if (!sb) return;
    const name = window.prompt("项目名称?") ?? "未命名项目";
    setBusy(true);
    setMsg(null);
    const { data: u } = await sb.auth.getUser();
    if (!u.user) {
      setBusy(false);
      return;
    }
    const { error } = await sb.from("projects").insert({
      user_id: u.user.id,
      name,
      data: { teams },
    });
    setBusy(false);
    if (error) setMsg(`✗ ${error.message.slice(0, 80)}`);
    else {
      setMsg(`✓ 已保存「${name}」`);
      void refresh();
    }
  }

  async function load(p: ProjectRow) {
    onLoad(p.data.teams as ProTeam[]);
    setMsg(`✓ 已加载「${p.name}」`);
  }

  async function remove(p: ProjectRow) {
    if (!window.confirm(`删除「${p.name}」?`)) return;
    const sb = getSupabase();
    if (!sb) return;
    await sb.from("projects").delete().eq("id", p.id);
    void refresh();
  }

  if (!supabaseEnabled || !signedIn) return null;

  return (
    <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-4 backdrop-blur space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-[10px] tracking-[3px] font-black text-purple-400 uppercase">
          我的项目
        </div>
        <button
          onClick={saveAs}
          disabled={busy}
          className="text-xs bg-purple-500 hover:bg-purple-400 disabled:opacity-50 text-[#08080F] font-black tracking-wide px-3 py-1.5 rounded transition"
        >
          {busy ? "保存中…" : "+ 另存为"}
        </button>
      </div>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {list.length === 0 && (
          <div className="text-xs text-zinc-500">还没有项目,点 + 另存为</div>
        )}
        {list.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-2 px-2 py-1.5 bg-zinc-900 rounded hover:bg-zinc-800"
          >
            <button
              onClick={() => load(p)}
              className="flex-1 text-left text-sm text-white truncate"
              title="加载到编辑器"
            >
              {p.name}
            </button>
            <span className="text-[10px] text-zinc-500 tabular-nums">
              {new Date(p.updated_at).toLocaleDateString("zh-CN", {
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
            <button
              onClick={() => remove(p)}
              className="text-zinc-500 hover:text-red-400 text-xs"
              title="删除"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      {msg && <div className="text-[11px] text-purple-400 font-mono">{msg}</div>}
    </div>
  );
}
