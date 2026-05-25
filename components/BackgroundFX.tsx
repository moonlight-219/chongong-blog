"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function BackgroundFX() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.3 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* 网格 */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* 渐变光斑 */}
      <motion.div
        animate={{
          left: `calc(${pos.x * 100}% - 250px)`,
          top: `calc(${pos.y * 100}% - 250px)`,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
        className="absolute w-[500px] h-[500px] rounded-full bg-indigo-500/30 dark:bg-indigo-500/20 blur-3xl"
      />
      <div className="absolute top-[60%] left-[10%] w-[400px] h-[400px] rounded-full bg-pink-500/20 dark:bg-pink-500/15 blur-3xl animate-blob" />
      <div className="absolute top-[20%] right-[5%] w-[350px] h-[350px] rounded-full bg-amber-400/15 dark:bg-amber-400/10 blur-3xl animate-blob" style={{ animationDelay: "-4s" }} />
    </div>
  );
}
