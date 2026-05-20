"use client";

import { useEffect, useState } from "react";
import { getSupabase, supabaseEnabled } from "../lib/supabase";

export function AuthButton() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<{ email?: string | null } | null>(null);
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!supabaseEnabled) return;
    const sb = getSupabase();
    if (!sb) return;
    sb.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function sendMagic(e: React.FormEvent) {
    e.preventDefault();
    const sb = getSupabase();
    if (!sb) return;
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: typeof window !== "undefined" ? window.location.href : undefined,
      },
    });
    if (!error) setSent(true);
  }

  async function signOut() {
    const sb = getSupabase();
    if (!sb) return;
    await sb.auth.signOut();
    setUser(null);
  }

  if (!supabaseEnabled) {
    return (
      <div
        className="text-[10px] text-zinc-500 px-3 py-1.5 rounded border border-zinc-800 font-bold tracking-widest uppercase"
        title="设 NEXT_PUBLIC_SUPABASE_URL / KEY 后启用"
      >
        登录 · 待启用
      </div>
    );
  }

  if (user) {
    return (
      <button
        onClick={signOut}
        className="text-xs text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded font-bold tracking-wide"
      >
        {user.email?.split("@")[0]} · 登出
      </button>
    );
  }

  if (sent) {
    return (
      <div className="text-xs text-purple-400 font-bold tracking-wide">
        ✓ Magic link 已发到 {email}
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs bg-purple-500 hover:bg-purple-400 text-[#08080F] px-3 py-1.5 rounded font-black tracking-widest uppercase"
      >
        登录
      </button>
    );
  }

  return (
    <form onSubmit={sendMagic} className="flex items-center gap-2">
      <input
        type="email"
        required
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        className="bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 w-44"
      />
      <button
        type="submit"
        className="text-xs bg-purple-500 hover:bg-purple-400 text-[#08080F] px-3 py-1.5 rounded font-black tracking-wide"
      >
        发链接
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="text-xs text-zinc-500 hover:text-zinc-300"
      >
        ✕
      </button>
    </form>
  );
}
