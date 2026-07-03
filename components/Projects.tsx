"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Building2, ExternalLink, Github, X } from "lucide-react";
import { GiteeIcon } from "./icons/Gitee";
import { SectionWrapper } from "./SectionWrapper";
import { FilterTabs, type FilterOption } from "./FilterTabs";
import {
  allTags,
  projects,
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
        return projects.filter((project) => hasDemo(project));
      case "source":
        return projects.filter((project) => project.github && !project.isCompanyProject);
      case "company":
        return projects.filter((project) => project.isCompanyProject);
      default:
        return filter === "all"
          ? projects
          : projects.filter((project) => project.tags.includes(filter as ProjectTag));
    }
  }, [filter]);

  const typeOptions: FilterOption<ProjectFilter>[] = [
    { key: "all", label: "全部", count: projects.length },
    { key: "demo", label: "可预览", count: projects.filter((project) => hasDemo(project)).length },
    {
      key: "source",
      label: "有源码",
      count: projects.filter((project) => project.github && !project.isCompanyProject).length,
    },
    {
      key: "company",
      label: "公司项目",
      count: projects.filter((project) => project.isCompanyProject).length,
    },
  ];

  const tagOptions = useMemo<FilterOption<ProjectFilter>[]>(
    () =>
      allTags
        .map((tag) => ({
          key: tag,
          label: tag,
          count: projects.filter((project) => project.tags.includes(tag)).length,
        }))
        .filter((option) => option.count > 0),
    []
  );

  const chromaItems = useMemo(
    () =>
      filtered.map((project) => ({
        ...project,
        borderColor: project.gradient[0],
        gradient: `linear-gradient(145deg, ${project.gradient[0]}, #0a0a0f)`,
        url: "",
        onItemClick: project.isCompanyProject
          ? () => setDialog({ type: "company", project: project.name })
          : () => {
              const demoUrl = (project.demo ??
                project.demoDesktop ??
                project.demoMobile) as string | undefined;
              setDialog({
                type: "card",
                project: project.name,
                demoUrl: demoUrl || undefined,
                sourceUrl: project.github || undefined,
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
        <p className="-mt-6 mb-8 max-w-lg text-sm opacity-50">
          收录部分项目，鼠标移入卡片可查看高亮效果。
        </p>

        <div className="mb-8 space-y-3">
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

      {dialog && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 animate-in fade-in bg-black/50 backdrop-blur-sm duration-200 dark:bg-black/60"
            onClick={() => setDialog(null)}
          />
          <div className="relative z-10 w-full max-w-sm animate-in overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-2xl fade-in zoom-in-95 duration-200 dark:border-white/[0.08] dark:bg-zinc-900">
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />

            <div className="p-6">
              <button
                onClick={() => setDialog(null)}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-black/5 hover:text-zinc-600 dark:hover:bg-white/5 dark:hover:text-zinc-200"
                aria-label="关闭"
              >
                <X size={15} />
              </button>

              <h4 className="mb-1.5 text-base font-bold tracking-tight">{dialog.project}</h4>

              {dialog.type === "company" && (
                <p className="text-sm leading-relaxed opacity-60">
                  该项目为公司项目，暂不提供代码查看。
                </p>
              )}
              {dialog.type === "source" && (
                <p className="text-sm leading-relaxed opacity-60">
                  即将前往源码仓库，确认跳转吗？
                </p>
              )}
              {dialog.type === "demo" && (
                <p className="text-sm leading-relaxed opacity-60">
                  即将前往预览页面，确认跳转吗？
                </p>
              )}
              {dialog.type === "card" && (
                <p className="text-sm leading-relaxed opacity-60">
                  请选择要查看的内容。
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                {dialog.type === "source" && (
                  <a
                    href={dialog.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setDialog(null)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-medium text-white transition-shadow hover:shadow-lg hover:shadow-blue-500/25"
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
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-medium text-white transition-shadow hover:shadow-lg hover:shadow-blue-500/25"
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
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-medium text-white transition-shadow hover:shadow-lg hover:shadow-blue-500/25"
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
                    className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-shadow hover:shadow-lg dark:bg-zinc-200 dark:text-zinc-900"
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
                  className="inline-flex items-center rounded-lg border border-black/[0.08] px-4 py-2 text-sm font-medium opacity-70 transition-all hover:bg-black/[0.03] hover:opacity-100 dark:border-white/[0.1] dark:hover:bg-white/[0.05]"
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

interface ProjectCardProps {
  project: Project;
  onSourceClick: (project: Project) => void;
  onDemoClick: (project: Project) => void;
}

function ProjectCard({ project, onSourceClick, onDemoClick }: ProjectCardProps) {
  const demoLink = project.demo ?? project.demoDesktop ?? project.demoMobile;

  return (
    <div className="chroma-project">
      <div
        className="chroma-accent-line"
        style={{
          background: `linear-gradient(90deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      />

      <div className="chroma-project-body">
        <div className="chroma-project-header">
          <div className="min-w-0">
            <h3 className="chroma-project-title">{project.name}</h3>
            <p className="chroma-project-tagline">{project.tagline}</p>
          </div>
          <div className="chroma-project-links">
            {!project.isCompanyProject && project.github && (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onSourceClick(project);
                }}
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
                onClick={(event) => {
                  event.stopPropagation();
                  onDemoClick(project);
                }}
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

        <p className="chroma-project-desc">{project.description}</p>

        <div className="chroma-project-bottom">
          <div className="chroma-project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
          <div className="chroma-project-stack">
            {project.stack.slice(0, 5).map((stack) => (
              <span key={stack}>{stack}</span>
            ))}
            {project.stack.length > 5 && <span>+{project.stack.length - 5}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
