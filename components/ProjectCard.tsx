"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, Building2 } from "lucide-react";
import type { MouseEvent } from "react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  onClick: () => void;
};

export function ProjectCard({ project, onClick }: Props) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 18 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
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
      className="group relative rounded-2xl overflow-hidden cursor-pointer glass hover:border-indigo-500/40 transition-all duration-300"
    >
      <div
        className="relative p-6 flex flex-col h-full min-h-[220px]"
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]}15, ${project.gradient[1]}15)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${project.gradient[0]}20, ${project.gradient[1]}20)`,
          }}
        />

        <div className="relative flex items-start justify-between gap-3 mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg leading-tight">{project.name}</h3>
            <p className="text-sm opacity-70 mt-1.5 line-clamp-2">{project.tagline}</p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            {!project.isCompanyProject && project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
                aria-label="源码"
              >
                <Github size={16} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
                aria-label="在线预览"
              >
                <ExternalLink size={16} />
              </a>
            )}
            {project.isCompanyProject && (
              <span className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-[11px] font-medium bg-black/5 dark:bg-white/10 opacity-60">
                <Building2 size={12} />
                公司项目
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/10">
          <p className="text-xs opacity-60 line-clamp-2 mb-3">{project.description.slice(0, 80)}...</p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="px-2 py-1 rounded-md text-[11px] font-mono"
                style={{
                  backgroundColor: `${project.gradient[0]}20`,
                  color: project.gradient[0],
                }}
              >
                {s}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="px-2 py-1 rounded-md text-[11px] font-mono opacity-40">
                +{project.stack.length - 4}
              </span>
            )}
          </div>
        </div>

        {project.featured && (
          <div
            className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-mono tracking-wider backdrop-blur-sm"
            style={{
              backgroundColor: `${project.gradient[0]}30`,
              color: project.gradient[0],
            }}
          >
            FEATURED
          </div>
        )}
      </div>
    </motion.div>
  );
}
