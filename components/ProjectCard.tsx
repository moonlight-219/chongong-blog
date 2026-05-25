"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import type { MouseEvent } from "react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  onClick: () => void;
};

export function ProjectCard({ project, onClick }: Props) {
  // 3D 倾斜跟鼠标
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]),  { stiffness: 200, damping: 18 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer glass hover:border-indigo-500/40 transition-colors"
    >
      {/* 封面渐变 */}
      <div
        className="relative aspect-[16/10] flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* 大字首字母 */}
        <span
          style={{ transform: "translateZ(40px)" }}
          className="relative text-7xl md:text-8xl font-black text-white/90 drop-shadow-lg select-none"
        >
          {project.name.charAt(0).toUpperCase()}
        </span>
        {project.featured && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/50 backdrop-blur text-white text-[10px] font-mono tracking-wider">
            ⭐ FEATURED
          </span>
        )}
      </div>

      <div className="p-5" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-lg">{project.name}</h3>
            <p className="text-sm opacity-70 mt-0.5">{project.tagline}</p>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10"
                aria-label="Demo"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-black/5 dark:bg-white/10"
            >
              {s}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-mono opacity-50">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
