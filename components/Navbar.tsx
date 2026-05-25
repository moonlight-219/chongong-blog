"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const NAV_ITEMS = [
  { href: "#hero",     label: "首页" },
  { href: "#about",    label: "关于" },
  { href: "#skills",   label: "技能" },
  { href: "#projects", label: "项目" },
];

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // 滚动驱动的平滑过渡:0→80px 区间内连续插值
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const blurPx = useTransform(scrollY, [0, 80], [0, 12]);
  const padY = useTransform(scrollY, [0, 80], [20, 12]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const backdrop = useMotionTemplate`blur(${blurPx}px)`;

  const [active, setActive] = useState("#hero");
  const [open, setOpen] = useState(false);

  // 滚动监听:更新当前激活的锚点
  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map((i) => document.querySelector(i.href));
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i] as HTMLElement | null;
        if (el && el.offsetTop <= scrollPos) {
          setActive(NAV_ITEMS[i].href);
          return;
        }
      }
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-400 origin-left z-[60]"
      />
      <motion.header
        style={{ paddingTop: padY, paddingBottom: padY }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* 背景层:透明度 & 模糊跟随滚动平滑插值 */}
        <motion.div
          aria-hidden
          style={{
            opacity: bgOpacity,
            backdropFilter: backdrop,
            WebkitBackdropFilter: backdrop,
          }}
          className="absolute inset-0 bg-[var(--card)]/70 pointer-events-none"
        />
        {/* 底边线层:独立 opacity,避免被整层模糊吃掉 */}
        <motion.div
          aria-hidden
          style={{ opacity: borderOpacity }}
          className="absolute inset-x-0 bottom-0 h-px bg-[var(--border)] pointer-events-none"
        />

        <nav className="relative max-w-6xl mx-auto px-6 flex items-center justify-between">
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                    active === item.href
                      ? "text-white"
                      : "opacity-70 hover:opacity-100"
                  )}
                >
                  {active === item.href && (
                    <motion.span
                      layoutId="navActive"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
              onClick={() => setOpen((v) => !v)}
              aria-label="菜单"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* 移动端展开菜单 */}
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative md:hidden mt-3 mx-6 glass rounded-2xl overflow-hidden"
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-5 py-3 text-sm border-b border-[var(--border)] last:border-0",
                    active === item.href && "text-indigo-500 font-medium"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </motion.header>
    </>
  );
}
