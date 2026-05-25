"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label[for], [data-cursor="hover"]';

export function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // 外圈环:有明显滞后,体现"滑动感"
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.55 });
  // 内点:几乎贴着鼠标
  const dotX = useSpring(x, { stiffness: 800, damping: 32 });
  const dotY = useSpring(y, { stiffness: 800, damping: 32 });

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fineCursor =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;
    setEnabled(fineCursor);
    if (!fineCursor) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [x, y, visible]);

  if (!enabled) return null;

  return (
    <>
      {/* 外圈 */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        animate={{
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          backgroundColor: hovering
            ? "rgba(99, 102, 241, 0.16)"
            : "rgba(99, 102, 241, 0)",
          borderColor: hovering
            ? "rgba(236, 72, 153, 0.85)"
            : "rgba(99, 102, 241, 0.55)",
          scale: pressed ? 0.82 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full border-2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      {/* 内点 */}
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
        animate={{
          scale: pressed ? 1.6 : hovering ? 0.4 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className="pointer-events-none fixed left-0 top-0 z-[200] w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-indigo-400 to-pink-400 mix-blend-difference"
      />
    </>
  );
}
