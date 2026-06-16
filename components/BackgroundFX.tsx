"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function BackgroundFX() {
  const x = useMotionValue(50);
  const y = useMotionValue(30);
  const springX = useSpring(x, { stiffness: 30, damping: 22, restDelta: 0.5 });
  const springY = useSpring(y, { stiffness: 30, damping: 22, restDelta: 0.5 });

  useEffect(() => {
    let ticking = false;
    const onMove = (e: MouseEvent) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        x.set((e.clientX / window.innerWidth) * 100);
        y.set((e.clientY / window.innerHeight) * 100);
        ticking = false;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Mouse-following glow — uses transform for GPU compositing */}
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        className="w-[300px] h-[300px] rounded-full bg-blue-500/12 dark:bg-blue-500/8 blur-2xl"
      />
      {/* Static ambient glow — no animation to save GPU */}
      <div className="absolute top-[55%] left-[8%] w-[250px] h-[250px] rounded-full bg-blue-400/6 dark:bg-blue-400/4 blur-2xl" />
      <div className="absolute top-[15%] right-[5%] w-[200px] h-[200px] rounded-full bg-sky-400/5 dark:bg-sky-400/3 blur-2xl" />
    </div>
  );
}
