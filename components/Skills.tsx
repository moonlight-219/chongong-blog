"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { SectionWrapper } from "./SectionWrapper";
import { FilterTabs, type FilterOption } from "./FilterTabs";
import { skills, skillCategories, type Skill } from "@/data/skills";
import { cn } from "@/lib/utils";

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

  return (
    <SectionWrapper id="skills" eyebrow="02 / SKILLS" title="我的技能栈">
      <FilterTabs
        layoutGroupId="skills"
        options={options}
        value={filter}
        onChange={setFilter}
        prefix="分类"
      />

      <div
        ref={ref}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
      >
        {filtered.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{
              duration: 0.45,
              delay: i * 0.04,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ y: -4, scale: 1.04 }}
            data-cursor="hover"
            className="group relative p-4 rounded-2xl glass overflow-hidden cursor-default"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${skill.color}33, transparent 70%)`,
              }}
            />
            <div className="relative">
              <div
                className="w-2 h-2 rounded-full mb-3"
                style={{
                  backgroundColor: skill.color,
                  boxShadow: `0 0 12px ${skill.color}`,
                }}
              />
              <div className="font-semibold text-sm">{skill.name}</div>
              <div className="mt-3 flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <motion.span
                    key={n}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ delay: i * 0.04 + n * 0.05, duration: 0.3 }}
                    className={cn(
                      "h-1 flex-1 rounded-full origin-left",
                      n <= skill.level ? "" : "opacity-15"
                    )}
                    style={{
                      backgroundColor:
                        n <= skill.level ? skill.color : "currentColor",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
