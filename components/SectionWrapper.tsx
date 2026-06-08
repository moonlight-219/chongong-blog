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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "start 0.5"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], [18, 0]);

  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative py-20 md:py-28 px-6 max-w-6xl mx-auto", className)}
    >
      {title && (
        <motion.div style={{ opacity: headerOpacity, y: headerY }} className="mb-10 will-change-transform">
          {eyebrow && (
            <div className="text-xs font-mono text-blue-500 mb-2 tracking-widest opacity-80">
              {eyebrow}
            </div>
          )}
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {title}
          </h2>
        </motion.div>
      )}
      {/* Children handle their own entrance animations */}
      {children}
    </section>
  );
}
