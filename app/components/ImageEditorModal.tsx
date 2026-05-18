"use client";

import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";

type Props = {
  src: string;
  aspect: number;
  onConfirm: (dataUrl: string) => void;
  onCancel: () => void;
};

export function ImageEditorModal({ src, aspect, onConfirm, onCancel }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pixels, setPixels] = useState<Area | null>(null);
  const [working, setWorking] = useState<null | "bg" | "save">(null);
  const [removeBg, setRemoveBg] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onCropComplete = useCallback((_: Area, p: Area) => setPixels(p), []);

  async function handleConfirm() {
    if (!pixels) return;
    setError(null);
    try {
      setWorking("save");
      let dataUrl = await cropToDataUrl(src, pixels);

      if (removeBg) {
        setWorking("bg");
        const { removeBackground } = await import("@imgly/background-removal");
        const resp = await fetch(dataUrl);
        const blob = await resp.blob();
        const cleaned = await removeBackground(blob);
        dataUrl = await blobToDataUrl(cleaned);
      }

      onConfirm(dataUrl);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg.slice(0, 240));
    } finally {
      setWorking(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-2xl flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest font-black text-purple-400">
              Image Editor
            </div>
            <div className="text-sm text-zinc-400 mt-0.5">
              拖动选区 · 滚轮 / 滑条缩放 · 可选去除背景
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-zinc-500 hover:text-white text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="relative bg-black h-[400px]">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape="rect"
            showGrid
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            objectFit="contain"
          />
        </div>

        <div className="px-5 py-4 space-y-4 border-t border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 min-w-[40px]">
              Zoom
            </span>
            <input
              type="range"
              min={1}
              max={4}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 accent-purple-500"
            />
            <span className="text-xs text-zinc-400 tabular-nums w-10 text-right">
              {zoom.toFixed(2)}×
            </span>
          </div>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={removeBg}
              onChange={(e) => setRemoveBg(e.target.checked)}
              className="w-4 h-4 accent-purple-500"
            />
            <div className="flex flex-col">
              <span className="text-sm font-black text-white">去除背景</span>
              <span className="text-[11px] text-zinc-500">
                浏览器内 AI 抠图 · 首次约 30MB 模型下载,之后秒出
              </span>
            </div>
          </label>

          {error && (
            <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded">
              {error}
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-zinc-800 flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={!!working}
            className="text-sm text-zinc-400 hover:text-white px-4 py-2 font-bold tracking-wide disabled:opacity-40"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            disabled={!pixels || !!working}
            className="bg-purple-500 hover:bg-purple-400 disabled:opacity-50 disabled:hover:bg-purple-500 text-[#08080F] px-6 py-2 rounded-lg font-black tracking-wide text-sm transition"
          >
            {working === "bg"
              ? "去背景中…"
              : working === "save"
              ? "裁剪中…"
              : "确认应用"}
          </button>
        </div>
      </div>
    </div>
  );
}

async function cropToDataUrl(src: string, pixels: Area): Promise<string> {
  const image = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = pixels.width;
  canvas.height = pixels.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    image,
    pixels.x,
    pixels.y,
    pixels.width,
    pixels.height,
    0,
    0,
    pixels.width,
    pixels.height,
  );
  return canvas.toDataURL("image/png");
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
