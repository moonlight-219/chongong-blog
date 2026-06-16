"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Github, ExternalLink, Building2 } from "lucide-react";
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

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("all");

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
        url: (p.demo ?? p.demoDesktop ?? p.demoMobile) || p.github || "",
      })),
    [filtered]
  );

  return (
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
        renderItem={(item: any) => <ProjectCard project={item as Project & { gradient: string; borderColor: string; url: string }} />}
      />
    </SectionWrapper>
  );
}

/* -- Inline Project Card (no modal) -- */

function ProjectCard({ project }: { project: Project }) {
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
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="源码"
              >
                {project.github.includes("gitee.com") ? (
                  <GiteeIcon size={14} />
                ) : (
                  <Github size={14} />
                )}
              </a>
            )}
            {demoLink && (
              <a
                href={demoLink as string}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="在线预览"
              >
                <ExternalLink size={14} />
              </a>
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
