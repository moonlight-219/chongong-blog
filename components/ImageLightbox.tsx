"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  index: number;
  open: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({ images, index, open, onClose, onNavigate }: ImageLightboxProps) {
  const hasMultiple = images.length > 1;
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  /* mount / unmount with fade transition */
  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const goTo = useCallback(
    (delta: number) => {
      const next = index + delta;
      if (next < 0 || next >= images.length) return;
      onNavigate(next);
    },
    [index, images.length, onNavigate]
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTo(-1);
      if (e.key === "ArrowRight") goTo(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, goTo, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop — click to close */}
      <div className="absolute inset-0 bg-black/85" onClick={onClose} />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
        aria-label="关闭"
      >
        <X size={18} />
      </button>

      {/* Image */}
      <img
        src={images[index]}
        alt={`${index + 1} / ${images.length}`}
        className="relative z-[1] max-w-[92vw] max-h-[88vh] object-contain rounded-lg shadow-2xl select-none"
        draggable={false}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Prev button */}
      {hasMultiple && (
        <button
          onClick={(e) => { e.stopPropagation(); goTo(-1); }}
          disabled={index === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-[1] w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="上一张"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next button */}
      {hasMultiple && (
        <button
          onClick={(e) => { e.stopPropagation(); goTo(1); }}
          disabled={index === images.length - 1}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-[1] w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="下一张"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Counter */}
      {hasMultiple && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1] px-3 py-1 rounded-full bg-black/60 text-white text-xs pointer-events-none">
          {index + 1} / {images.length}
        </div>
      )}
    </div>,
    document.body
  );
}
