"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  className?: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
};

export function SectionWrapper({ id, className, title, eyebrow, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  // 滚动锁定式淡入:section 顶部从「距视口底 15%」滑到「距视口顶 25%」期间渐变完成
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const headerY = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative py-24 px-6 max-w-6xl mx-auto", className)}
    >
      {(title || eyebrow) && (
        <motion.div style={{ opacity, y: headerY }} className="mb-12 will-change-transform">
          {eyebrow && (
            <div className="text-sm font-mono text-indigo-500 mb-2 tracking-wider">
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {title}
            </h2>
          )}
        </motion.div>
      )}
      <motion.div style={{ opacity, y }} className="will-change-transform">
        {children}
      </motion.div>
    </section>
  );
}
