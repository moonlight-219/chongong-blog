"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { SectionWrapper } from "./SectionWrapper";
import { FilterTabs, type FilterOption } from "./FilterTabs";
import { skills, skillCategories, type Skill } from "@/data/skills";

type SkillFilter = Skill["category"] | "all";

const levelLabels = ["", "了解", "熟悉", "掌握", "熟练", "精通"];

export function Skills() {
  const [filter, setFilter] = useState<SkillFilter>("all");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    filter === "all" ? skills : skills.filter((s) => s.category === filter);

  const options = useMemo<FilterOption<SkillFilter>[]>(
    () => [
      { key: "all", label: "全部", count: skills.length },
      ...skillCategories.map((c) => ({
        key: c.key,
        label: c.label,
        count: skills.filter((s) => s.category === c.key).length,
      })),
    ],
    []
  );

  return (
    <SectionWrapper id="skills" title="技能栈">
      <p className="opacity-50 -mt-6 mb-8 max-w-lg text-sm">
        前端为主，具备全栈开发能力
      </p>

      <FilterTabs
        layoutGroupId="skills"
        options={options}
        value={filter}
        onChange={setFilter}
        prefix="分类"
      />

      <div ref={ref} className="flex flex-wrap gap-2.5">
        {filtered.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.3,
              delay: i * 0.03,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ y: -2, scale: 1.05 }}
            data-cursor="hover"
            className="group relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] border border-transparent hover:border-blue-500/20 transition-all cursor-default"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: skill.color }}
            />
            <span className="text-sm font-medium">{skill.name}</span>
            {/* Level dots */}
            <span className="flex items-center gap-[2px] ml-0.5">
              {[1, 2, 3, 4, 5].map((dot) => (
                <span
                  key={dot}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: "3px",
                    height: `${4 + dot * 1.5}px`,
                    backgroundColor: dot <= skill.level ? skill.color : "transparent",
                    opacity: dot <= skill.level ? 0.6 : 0.15,
                    border: dot <= skill.level ? "none" : "1px solid var(--border-subtle)",
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
