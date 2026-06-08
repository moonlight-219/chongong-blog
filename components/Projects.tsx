"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  X, Github, ExternalLink, Building2, Maximize2,
} from "lucide-react";
import { GiteeIcon } from "./icons/Gitee";
import { SectionWrapper } from "./SectionWrapper";
import { FilterTabs, type FilterOption } from "./FilterTabs";
import {
  projects, allTags, type Project, type ProjectTag,
} from "@/data/projects";

type ProjectFilter = ProjectTag | "all" | "demo" | "source" | "company";

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [active, setActive] = useState<Project | null>(null);

  const hasDemo = (project: Project) =>
    Boolean(project.demo ?? project.demoDesktop ?? project.demoMobile);

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
    { key: "demo", label: "可预览", count: projects.filter((p) => hasDemo(p)).length },
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

  return (
    <SectionWrapper id="projects" title="项目作品">
      <p className="opacity-50 -mt-6 mb-8 max-w-lg text-sm">
        收录部分项目，点击卡片查看详情
      </p>

      {/* Filter tabs */}
      <div className="space-y-3 mb-8">
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

      {/* Project cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <ProjectScrollCard project={p} onClick={() => setActive(p)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}

/* -- Scroll Card -- */

function ProjectScrollCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 h-full border border-black/[0.06] dark:border-white/[0.06] hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/[0.06]"
      style={{
        background: "color-mix(in srgb, var(--card-bg) 85%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Top gradient accent line */}
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      />

      <div className="p-5 flex flex-col min-h-[240px]">
        {/* Header area */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <h3 className="font-bold text-[15px] leading-tight group-hover:text-blue-500 transition-colors">
              {project.name}
            </h3>
            <p className="text-xs opacity-50 mt-1.5 leading-relaxed line-clamp-2">
              {project.tagline}
            </p>
          </div>
          <div className="flex gap-1 shrink-0">
            {!project.isCompanyProject && project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-blue-500/10 hover:text-blue-500 flex items-center justify-center transition-colors"
                aria-label="源码"
              >
                {project.github.includes("gitee.com") ? (
                  <GiteeIcon size={13} />
                ) : (
                  <Github size={13} />
                )}
              </a>
            )}
            {(project.demo ?? project.demoDesktop ?? project.demoMobile) && (
              <a
                href={(project.demoDesktop ?? project.demo ?? project.demoMobile) as string}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-blue-500/10 hover:text-blue-500 flex items-center justify-center transition-colors"
                aria-label="在线预览"
              >
                <ExternalLink size={13} />
              </a>
            )}
            {project.isCompanyProject && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.06] opacity-50">
                <Building2 size={10} />
                公司
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs opacity-45 leading-relaxed line-clamp-3 mb-auto">
          {project.description}
        </p>

        {/* Bottom section */}
        <div className="pt-4 mt-4 border-t border-black/[0.04] dark:border-white/[0.06]">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full text-[10px] text-blue-500 bg-blue-500/8 font-medium"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1">
            {project.stack.slice(0, 5).map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-blue-500/8 text-blue-600 dark:text-blue-400"
              >
                {s}
              </span>
            ))}
            {project.stack.length > 5 && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono opacity-35">
                +{project.stack.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -- Modal -- */

function getResponsiveDemoLink(project: Project) {
  const fallback = project.demo ?? project.demoDesktop ?? project.demoMobile;
  if (typeof window === "undefined") return fallback;

  const isMobile =
    window.matchMedia?.("(max-width: 768px)").matches ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );

  if (isMobile) return project.demoMobile ?? fallback;
  return project.demoDesktop ?? fallback;
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const demoLink = getResponsiveDemoLink(project);
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);

  return (
    <>
      {/* Fullscreen image overlay */}
      <AnimatePresence>
        {fullscreenImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImg(null)}
            className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setFullscreenImg(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={fullscreenImg}
              alt={project.name}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl my-8"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          {/* Top gradient */}
          <div
            className="h-[3px] w-full"
            style={{
              background: `linear-gradient(90deg, ${project.gradient[0]}, ${project.gradient[1]})`,
            }}
          />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
            aria-label="关闭"
          >
            <X size={16} />
          </button>

          <div className="px-7 pt-7 pb-7">
            <h3 className="text-xl font-bold">{project.name}</h3>
            <p className="text-sm opacity-60 mt-1">{project.tagline}</p>

            {/* Screenshots gallery */}
            {project.images && project.images.length > 0 && (
              <div className="mt-5">
                <div className="text-[10px] font-mono text-blue-500 tracking-wider mb-2">项目截图</div>
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {project.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setFullscreenImg(img)}
                      className="shrink-0 cursor-zoom-in group rounded-lg overflow-hidden border border-black/[0.06] dark:border-white/[0.08] hover:border-blue-500/30 transition-colors"
                    >
                      <div className="relative">
                        <img
                          src={img}
                          alt={`${project.name} 截图 ${idx + 1}`}
                          className="h-36 w-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <Maximize2
                            size={16}
                            className="text-white opacity-0 group-hover:opacity-70 transition-opacity drop-shadow-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex items-center gap-2 mt-4">
              {!project.isCompanyProject && project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass hover:border-blue-500/50 text-xs font-medium transition-colors"
                >
                  {project.github.includes("gitee.com") ? (
                    <GiteeIcon size={14} />
                  ) : (
                    <Github size={14} />
                  )}
                  源码
                </a>
              )}
              {demoLink && (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass hover:border-blue-500/50 text-xs font-medium transition-colors"
                >
                  <ExternalLink size={14} />
                  在线预览
                </a>
              )}
              {project.isCompanyProject && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-black/5 dark:bg-white/10 opacity-50">
                  <Building2 size={12} />
                  公司项目 / 源码不公开
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-5 text-sm leading-relaxed opacity-75">
              {project.description}
            </p>

            {/* Stack */}
            <div className="mt-5">
              <div className="text-[10px] font-mono text-blue-500 tracking-wider mb-2">技术栈</div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-black/5 dark:bg-white/10"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-full text-[10px] text-blue-500 bg-blue-500/10"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
