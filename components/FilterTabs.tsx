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
  layoutGroupId: string;
  className?: string;
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
        "relative flex items-center gap-2.5 overflow-x-auto no-scrollbar",
        className
      )}
    >
      {prefix && (
        <div className="text-[10px] font-mono text-blue-500/60 tracking-widest uppercase shrink-0">
          {prefix}
        </div>
      )}
      <div
        role="tablist"
        className="relative flex items-center gap-0.5 p-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-transparent shrink-0"
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
                "relative px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200 outline-none",
                active
                  ? "text-white"
                  : "opacity-60 hover:opacity-90"
              )}
            >
              {active && (
                <motion.span
                  layoutId={`filter-pill-${layoutGroupId}`}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 shadow-sm shadow-blue-500/25 -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative flex items-center gap-1.5">
                {opt.label}
                {typeof opt.count === "number" && (
                  <span
                    className={cn(
                      "inline-flex items-center justify-center min-w-[1rem] h-[0.9rem] px-1 rounded-full text-[9px] font-mono tabular-nums transition-colors",
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
