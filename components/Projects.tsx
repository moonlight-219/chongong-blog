"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Github, ExternalLink, Building2, X } from "lucide-react";
import { GiteeIcon } from "./icons/Gitee";
import { SectionWrapper } from "./SectionWrapper";
import { FilterTabs, type FilterOption } from "./FilterTabs";
import {
  projects,
  allTags,
  type Project,
  type ProjectTag,
} from "@/data/projects";

const ChromaGrid = dynamic(() => import("./ChromaGrid"), { ssr: false });

type ProjectFilter = ProjectTag | "all" | "demo" | "source" | "company";

type DialogState =
  | null
  | { type: "company"; project: string }
  | { type: "source"; project: string; url: string }
  | { type: "demo"; project: string; url: string }
  | { type: "card"; project: string; demoUrl?: string; sourceUrl?: string };

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [dialog, setDialog] = useState<DialogState>(null);

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

  // Map projects to ChromaGrid items
  const chromaItems = useMemo(
    () =>
      filtered.map((p) => ({
        ...p,
        borderColor: p.gradient[0],
        gradient: `linear-gradient(145deg, ${p.gradient[0]}, #0a0a0f)`,
        url: "",
        onItemClick: p.isCompanyProject
          ? () => setDialog({ type: "company", project: p.name })
          : () => {
              const demoUrl = (p.demo ?? p.demoDesktop ?? p.demoMobile) as string | undefined;
              setDialog({
                type: "card",
                project: p.name,
                demoUrl: demoUrl || undefined,
                sourceUrl: p.github || undefined,
              });
            },
      })),
    [filtered]
  );

  const handleSourceClick = (project: Project) => {
    if (project.github) {
      setDialog({ type: "source", project: project.name, url: project.github });
    }
  };

  const handleDemoClick = (project: Project) => {
    const url = (project.demo ?? project.demoDesktop ?? project.demoMobile) as string;
    if (url) {
      setDialog({ type: "demo", project: project.name, url });
    }
  };

  return (
    <>
    <SectionWrapper id="projects" title="项目作品">
      <p className="opacity-50 -mt-6 mb-8 max-w-lg text-sm">
        收录部分项目，鼠标移入查看彩色效果
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

      {/* ChromaGrid project cards */}
      <ChromaGrid
        items={chromaItems}
        radius={350}
        damping={0.45}
        fadeOut={0.6}
        renderItem={(item: any) => (
          <ProjectCard
            project={item as Project & { gradient: string; borderColor: string; url: string }}
            onSourceClick={handleSourceClick}
            onDemoClick={handleDemoClick}
          />
        )}
      />
    </SectionWrapper>

    {/* Centered dialog — rendered at root level for proper viewport centering */}
    {dialog && (
      <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setDialog(null)}
        />
        {/* Dialog panel */}
        <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.08] shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
          {/* Gradient top accent */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />

          <div className="p-6">
            {/* Close button */}
            <button
              onClick={() => setDialog(null)}
              className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="关闭"
            >
              <X size={15} />
            </button>

            {/* Project name */}
            <h4 className="text-base font-bold tracking-tight mb-1.5">{dialog.project}</h4>

            {/* Message */}
            {dialog.type === "company" && (
              <p className="text-sm opacity-60 leading-relaxed">
                该项目为公司项目，暂不提供代码查看。
              </p>
            )}
            {dialog.type === "source" && (
              <p className="text-sm opacity-60 leading-relaxed">
                即将前往源码仓库，确认跳转？
              </p>
            )}
            {dialog.type === "demo" && (
              <p className="text-sm opacity-60 leading-relaxed">
                即将前往预览页面，确认跳转？
              </p>
            )}
            {dialog.type === "card" && (
              <p className="text-sm opacity-60 leading-relaxed">
                选择要执行的操作：
              </p>
            )}

            {/* Actions */}
            <div className="mt-5 flex items-center flex-wrap gap-2.5">
              {dialog.type === "source" && (
                <a
                  href={dialog.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setDialog(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
                >
                  <Github size={14} />
                  查看源码
                </a>
              )}
              {dialog.type === "demo" && (
                <a
                  href={dialog.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setDialog(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
                >
                  <ExternalLink size={14} />
                  前往预览
                </a>
              )}
              {dialog.type === "card" && dialog.demoUrl && (
                <a
                  href={dialog.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setDialog(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
                >
                  <ExternalLink size={14} />
                  前往预览
                </a>
              )}
              {dialog.type === "card" && dialog.sourceUrl && (
                <a
                  href={dialog.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setDialog(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 text-sm font-medium hover:shadow-lg transition-shadow"
                >
                  {dialog.sourceUrl.includes("gitee.com") ? (
                    <GiteeIcon size={14} />
                  ) : (
                    <Github size={14} />
                  )}
                  查看源码
                </a>
              )}
              <button
                onClick={() => setDialog(null)}
                className="inline-flex items-center px-4 py-2 rounded-lg border border-black/[0.08] dark:border-white/[0.1] text-sm font-medium opacity-70 hover:opacity-100 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

/* -- Inline Project Card (no modal) -- */

interface ProjectCardProps {
  project: Project;
  onSourceClick: (project: Project) => void;
  onDemoClick: (project: Project) => void;
}

function ProjectCard({ project, onSourceClick, onDemoClick }: ProjectCardProps) {
  const demoLink =
    project.demo ?? project.demoDesktop ?? project.demoMobile;

  return (
    <div className="chroma-project">
      {/* Gradient accent line */}
      <div
        className="chroma-accent-line"
        style={{
          background: `linear-gradient(90deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      />

      <div className="chroma-project-body">
        {/* Header */}
        <div className="chroma-project-header">
          <div className="min-w-0">
            <h3 className="chroma-project-title">{project.name}</h3>
            <p className="chroma-project-tagline">{project.tagline}</p>
          </div>
          <div className="chroma-project-links">
            {!project.isCompanyProject && project.github && (
              <button
                onClick={(e) => { e.stopPropagation(); onSourceClick(project); }}
                aria-label="源码"
              >
                {project.github.includes("gitee.com") ? (
                  <GiteeIcon size={14} />
                ) : (
                  <Github size={14} />
                )}
              </button>
            )}
            {demoLink && (
              <button
                onClick={(e) => { e.stopPropagation(); onDemoClick(project); }}
                aria-label="在线预览"
              >
                <ExternalLink size={14} />
              </button>
            )}
            {project.isCompanyProject && (
              <span className="chroma-company-badge">
                <Building2 size={10} />
                公司
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="chroma-project-desc">{project.description}</p>

        {/* Bottom: tags + stack */}
        <div className="chroma-project-bottom">
          <div className="chroma-project-tags">
            {project.tags.map((t) => (
              <span key={t}>#{t}</span>
            ))}
          </div>
          <div className="chroma-project-stack">
            {project.stack.slice(0, 5).map((s) => (
              <span key={s}>{s}</span>
            ))}
            {project.stack.length > 5 && (
              <span>+{project.stack.length - 5}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
