"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type FilterOption<T extends string> = {
  key: T;
  label: string;
  count?: number;
};

type Props<T extends string> = {
  options: FilterOption<T>[];
  value: T;
  onChange: (next: T) => void;
  /** 用于 layoutId,避免多个 FilterTabs 共享时背景互相跳动 */
  layoutGroupId: string;
  className?: string;
  /** 显示在 tabs 之前的标题/前缀,例如 "筛选" */
  prefix?: React.ReactNode;
};

export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  layoutGroupId,
  className,
  prefix,
}: Props<T>) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-3 mb-10 flex-wrap md:flex-nowrap",
        className
      )}
    >
      {prefix && (
        <div className="text-xs font-mono text-indigo-500/80 tracking-widest uppercase shrink-0">
          {prefix}
        </div>
      )}
      <div
        role="tablist"
        className="relative flex items-center gap-1 p-1 rounded-full glass overflow-x-auto no-scrollbar max-w-full"
      >
        {options.map((opt) => {
          const active = opt.key === value;
          return (
            <button
              key={opt.key}
              role="tab"
              aria-selected={active}
              onClick={() => onChange(opt.key)}
              data-cursor="hover"
              className={cn(
                "relative px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60",
                active
                  ? "text-white"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              {active && (
                <motion.span
                  layoutId={`filter-pill-${layoutGroupId}`}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 shadow-md shadow-indigo-500/30 -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative flex items-center gap-1.5">
                {opt.label}
                {typeof opt.count === "number" && (
                  <span
                    className={cn(
                      "inline-flex items-center justify-center min-w-[1.25rem] h-[1.1rem] px-1 rounded-full text-[10px] font-mono tabular-nums transition-colors",
                      active
                        ? "bg-white/25 text-white"
                        : "bg-black/5 dark:bg-white/10"
                    )}
                  >
                    {opt.count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
