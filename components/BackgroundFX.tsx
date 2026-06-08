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
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Mouse-following glow */}
      <motion.div
        animate={{
          left: `calc(${pos.x * 100}% - 200px)`,
          top: `calc(${pos.y * 100}% - 200px)`,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 18 }}
        className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/15 dark:bg-blue-500/10 blur-3xl"
      />
      {/* Ambient orbs - blue tones */}
      <div className="absolute top-[55%] left-[8%] w-[350px] h-[350px] rounded-full bg-blue-400/10 dark:bg-blue-400/6 blur-3xl animate-blob" />
      <div className="absolute top-[15%] right-[5%] w-[300px] h-[300px] rounded-full bg-sky-400/8 dark:bg-sky-400/5 blur-3xl animate-blob" style={{ animationDelay: "-4s" }} />
    </div>
  );
}
