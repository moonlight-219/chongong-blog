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

  const levelText = (level: number) => {
    switch (level) {
      case 5: return "精通";
      case 4: return "熟练";
      case 3: return "掌握";
      case 2: return "了解";
      default: return "入门";
    }
  };

  return (
    <SectionWrapper id="skills" eyebrow="02 / SKILLS" title="我的技能栈">
      <p className="opacity-70 -mt-6 mb-6 max-w-2xl text-sm">
        熟练掌握前端技术栈，具备全栈开发能力
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
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] border border-transparent hover:border-black/5 dark:hover:border-white/10 transition-all cursor-default"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: skill.color }}
            />
            <span className="text-sm font-medium">{skill.name}</span>
            <span className="text-[11px] opacity-40 font-mono">
              {levelText(skill.level)}
            </span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
