"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { X, Github, ExternalLink, Building2 } from "lucide-react";
import { GiteeIcon } from "./icons/Gitee";
import { SectionWrapper } from "./SectionWrapper";
import { ProjectCard } from "./ProjectCard";
import { FilterTabs, type FilterOption } from "./FilterTabs";
import { projects, allTags, type Project, type ProjectTag } from "@/data/projects";

type ProjectFilter = ProjectTag | "all" | "demo" | "source" | "company";

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [active, setActive] = useState<Project | null>(null);

  const hasDemo = (project: Project) => Boolean(project.demo ?? project.demoDesktop ?? project.demoMobile);

  const filtered = useMemo(() => {
    switch (filter) {
      case "demo":
        return projects.filter((p) => hasDemo(p));
      case "source":
        return projects.filter((p) => p.github && !p.isCompanyProject);
      case "company":
        return projects.filter((p) => p.isCompanyProject);
      default:
        return filter === "all"
          ? projects
          : projects.filter((p) => p.tags.includes(filter as ProjectTag));
    }
  }, [filter]);

  const typeOptions: FilterOption<ProjectFilter>[] = [
    { key: "all", label: "全部", count: projects.length },
    { key: "demo", label: "可在线预览", count: projects.filter((p) => hasDemo(p)).length },
    { key: "source", label: "有源码", count: projects.filter((p) => p.github && !p.isCompanyProject).length },
    { key: "company", label: "公司项目", count: projects.filter((p) => p.isCompanyProject).length },
  ];

  const tagOptions = useMemo<FilterOption<ProjectFilter>[]>(
    () =>
      allTags
        .map((tag) => ({
          key: tag,
          label: tag,
          count: projects.filter((p) => p.tags.includes(tag)).length,
        }))
        .filter((o) => o.count > 0),
    []
  );

  const options = [...typeOptions, ...tagOptions];

  return (
    <SectionWrapper id="projects" eyebrow="03 / WORKS" title="项目作品">
      <p className="opacity-70 -mt-6 mb-8 max-w-2xl">
        这里收录了我做过的一些项目，有大有小，点击卡片查看详情。
      </p>

      <div className="space-y-4 mb-10">
        <FilterTabs
          layoutGroupId="projects-type"
          options={typeOptions}
          value={filter}
          onChange={setFilter}
          prefix="类型"
        />
        <FilterTabs
          layoutGroupId="projects-tag"
          options={tagOptions}
          value={filter}
          onChange={setFilter}
          prefix="标签"
        />
      </div>

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

function getResponsiveDemoLink(project: Project) {
  const fallback = project.demo ?? project.demoDesktop ?? project.demoMobile;

  if (typeof window === "undefined") {
    return fallback;
  }

  const isMobile =
    window.matchMedia?.("(max-width: 768px)").matches ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);

  if (isMobile) {
    return project.demoMobile ?? fallback;
  }

  return project.demoDesktop ?? fallback;
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const demoLink = getResponsiveDemoLink(project);

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
          className="relative px-7 pt-8 pb-5"
          style={{
            background: `linear-gradient(135deg, ${project.gradient[0]}10, ${project.gradient[1]}10)`,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
          <div className="relative">
            <h3 className="text-2xl font-bold">{project.name}</h3>
            <p className="opacity-70 mt-1">{project.tagline}</p>
          </div>
        </div>

        <div className="px-7 pb-7">
          <div className="flex items-center gap-2 mt-2 mb-5">
            {!project.isCompanyProject && project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass hover:border-indigo-500/50 text-sm transition-colors"
                aria-label="源码"
              >
                {project.github.includes("gitee.com") ? <GiteeIcon size={16} /> : <Github size={16} />}
                源码
              </a>
            )}
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass hover:border-indigo-500/50 text-sm transition-colors"
                aria-label="在线预览"
              >
                <ExternalLink size={16} />
                在线预览
              </a>
            )}
            {project.isCompanyProject && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-black/5 dark:bg-white/10 opacity-60">
                <Building2 size={14} />
                公司项目 · 源码不公开
              </span>
            )}
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
