"use client";

import { useState } from "react";

const TARGET_EMAIL = "lineup.studio.waitlist@gmail.com";

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Lineup Studio · 候补名单");
    const body = encodeURIComponent(
      `请把我加入 Lineup Studio 候补名单。\n\n我的邮箱: ${email}\n\n首选模板: \n来自: ${typeof window !== "undefined" ? window.location.href : ""}\n`,
    );
    window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
    try {
      const list = JSON.parse(localStorage.getItem("lineup-studio:waitlist") ?? "[]");
      list.push({ email, at: new Date().toISOString() });
      localStorage.setItem("lineup-studio:waitlist", JSON.stringify(list));
    } catch {
      // ignore
    }
    setDone(true);
  }

  if (done) {
    return (
      <div
        className={`bg-purple-500/15 border border-purple-500/40 rounded-lg ${
          compact ? "px-4 py-3" : "px-6 py-5"
        } text-purple-300 font-bold`}
      >
        ✓ 邮件客户端已打开,发送即可加入候补
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={`flex ${
        compact ? "gap-2" : "gap-3 max-w-lg mx-auto"
      } items-stretch`}
    >
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className={`flex-1 bg-zinc-900 border border-zinc-800 rounded-lg ${
          compact ? "px-3 py-2 text-sm" : "px-5 py-3"
        } text-white focus:outline-none focus:border-purple-500`}
      />
      <button
        type="submit"
        className={`bg-purple-500 hover:bg-purple-400 text-[#08080F] font-black tracking-wide rounded-lg transition ${
          compact ? "px-4 py-2 text-xs" : "px-6 py-3"
        }`}
      >
        {compact ? "候补" : "加入候补 →"}
      </button>
    </form>
  );
}
