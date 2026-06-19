"use client";

import { useRef, useState } from "react";
import { Upload, X, Check, Loader2, ImagePlus } from "lucide-react";

export function UploadButton() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.path);
      } else {
        setStatus("error");
        setMessage(data.error || "上传失败");
      }
    } catch {
      setStatus("error");
      setMessage("网络错误");
    }

    // Reset input
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        title="上传作品图"
      >
        <ImagePlus size={20} />
      </button>

      {/* Upload dialog */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" onClick={() => { setOpen(false); setStatus("idle"); setMessage(""); }} />

          {/* Panel */}
          <div className="relative w-[90vw] max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">上传作品截图</h3>
              <button
                onClick={() => { setOpen(false); setStatus("idle"); setMessage(""); }}
                className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Upload area */}
            <label className="block border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
              <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                onChange={handleFile}
                className="hidden"
              />
              {status === "uploading" ? (
                <div className="flex flex-col items-center gap-2 text-blue-600">
                  <Loader2 size={28} className="animate-spin" />
                  <span className="text-sm">上传中...</span>
                </div>
              ) : status === "success" ? (
                <div className="flex flex-col items-center gap-2 text-green-600">
                  <Check size={28} />
                  <span className="text-sm">上传成功!</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-zinc-400">
                  <Upload size={28} />
                  <span className="text-sm">点击选择图片</span>
                  <span className="text-xs opacity-60">PNG / JPG / WebP / GIF · 最大 10MB</span>
                </div>
              )}
            </label>

            {/* Result */}
            {status === "success" && message && (
              <div className="mt-4 p-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                <p className="text-xs text-green-700 dark:text-green-300 font-mono break-all">{message}</p>
              </div>
            )}
            {status === "error" && message && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                <p className="text-xs text-red-600 dark:text-red-400">{message}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
