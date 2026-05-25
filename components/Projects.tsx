"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { X, Github, ExternalLink } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { ProjectCard } from "./ProjectCard";
import { FilterTabs, type FilterOption } from "./FilterTabs";
import { projects, allTags, type Project, type ProjectTag } from "@/data/projects";

type ProjectFilter = ProjectTag | "all";

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [active, setActive] = useState<Project | null>(null);

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(filter));

  const options = useMemo<FilterOption<ProjectFilter>[]>(
    () => [
      { key: "all", label: "全部", count: projects.length },
      ...allTags
        .map((tag) => ({
          key: tag,
          label: tag,
          count: projects.filter((p) => p.tags.includes(tag)).length,
        }))
        .filter((o) => o.count > 0),
    ],
    []
  );

  return (
    <SectionWrapper id="projects" eyebrow="03 / WORKS" title="项目作品">
      <p className="opacity-70 -mt-6 mb-8 max-w-2xl">
        这里收录了我做过的一些项目,有大有小,有线上跑着的也有快乐车库实验。点击卡片查看详情。
      </p>

      <FilterTabs
        layoutGroupId="projects"
        options={options}
        value={filter}
        onChange={setFilter}
        prefix="标签"
      />

      {/* 卡片网格 */}
      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{ perspective: 1200 }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
            >
              <ProjectCard project={p} onClick={() => setActive(p)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 详情 Modal */}
      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </SectionWrapper>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-[var(--card)] shadow-2xl my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur transition-colors"
          aria-label="关闭"
        >
          <X size={18} />
        </button>

        <div
          className="relative h-56 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
          <span className="relative text-8xl font-black text-white/90 drop-shadow-lg">
            {project.name.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">{project.name}</h3>
              <p className="opacity-70 mt-1">{project.tagline}</p>
            </div>
            <div className="flex gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg glass hover:border-indigo-500/50"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg glass hover:border-indigo-500/50"
                  aria-label="Demo"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          <p className="mt-5 leading-relaxed opacity-80">{project.description}</p>

          <div className="mt-6">
            <div className="text-xs font-mono text-indigo-500 tracking-wider mb-2">技术栈</div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-md text-xs font-mono bg-black/5 dark:bg-white/10"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full text-[11px] text-indigo-500 bg-indigo-500/10"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
