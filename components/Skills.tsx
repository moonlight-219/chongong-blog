"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { SectionWrapper } from "./SectionWrapper";
import { FilterTabs, type FilterOption } from "./FilterTabs";
import { skills, skillCategories, type Skill } from "@/data/skills";

type SkillFilter = Skill["category"] | "all";

export function Skills() {
  const [filter, setFilter] = useState<SkillFilter>("all");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    filter === "all" ? skills : skills.filter((skill) => skill.category === filter);

  const options = useMemo<FilterOption<SkillFilter>[]>(
    () => [
      { key: "all", label: "全部", count: skills.length },
      ...skillCategories.map((category) => ({
        key: category.key,
        label: category.label,
        count: skills.filter((skill) => skill.category === category.key).length,
      })),
    ],
    []
  );

  return (
    <SectionWrapper id="skills" title="技能栈">
      <p className="-mt-6 mb-8 max-w-lg text-sm opacity-60">
        前端为主，具备小程序、管理后台、数据可视化和基础后端联调经验。
      </p>

      <FilterTabs
        layoutGroupId="skills"
        options={options}
        value={filter}
        onChange={setFilter}
        prefix="分类"
      />
      <br />

      <div ref={ref} className="flex flex-wrap gap-2.5">
        {filtered.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.3,
              delay: index * 0.03,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ y: -2, scale: 1.05 }}
            data-cursor="hover"
            className="group relative inline-flex cursor-default items-center gap-2.5 rounded-xl border border-transparent bg-black/[0.05] px-4 py-2.5 transition-all hover:border-blue-500/20 hover:bg-black/[0.08] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: skill.color }}
            />
            <span className="text-sm font-medium">{skill.name}</span>
            <span className="ml-0.5 flex items-center gap-[2px]">
              {[1, 2, 3, 4, 5].map((dot) => (
                <span
                  key={dot}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: "3px",
                    height: `${4 + dot * 1.5}px`,
                    backgroundColor: dot <= skill.level ? skill.color : "transparent",
                    opacity: dot <= skill.level ? 0.6 : 0.3,
                    border:
                      dot <= skill.level
                        ? "none"
                        : "1px solid var(--border-subtle)",
                  }}
                />
              ))}
            </span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
