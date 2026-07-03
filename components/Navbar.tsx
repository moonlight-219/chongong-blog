"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "#hero", label: "首页" },
  { href: "#about", label: "关于" },
  { href: "#skills", label: "技能" },
  { href: "#projects", label: "作品" },
  { href: "#showcase", label: "展示" },
];

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const padY = useTransform(scrollY, [0, 80], [16, 10]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sectionEls = NAV_ITEMS.map((item) =>
      document.querySelector(item.href) as HTMLElement | null
    );
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        for (let i = sectionEls.length - 1; i >= 0; i -= 1) {
          const el = sectionEls[i];
          if (el && el.offsetTop <= scrollPos) {
            setActiveIndex(i);
            ticking = false;
            return;
          }
        }
        ticking = false;
      });
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    setOpen(false);
    const el = document.querySelector(NAV_ITEMS[index].href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-blue-600"
      />

      <motion.header
        style={{ paddingTop: padY, paddingBottom: padY }}
        className="fixed left-0 right-0 top-0 z-50"
      >
        <motion.div
          aria-hidden
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 border-b border-black/5 bg-white/90 dark:border-white/5 dark:bg-zinc-950/90"
        />

        <nav className="relative mx-auto flex max-w-6xl items-center justify-center px-6">
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(index);
                  }}
                  className={cn(
                    "relative rounded-lg px-4 py-2 text-sm transition-colors",
                    activeIndex === index
                      ? "font-medium text-blue-600 dark:text-blue-400"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="absolute right-6 flex items-center gap-2">
            <ThemeToggle />
            <button
              className="rounded-lg p-2 transition-colors hover:bg-black/5 md:hidden dark:hover:bg-white/5"
              onClick={() => setOpen((value) => !value)}
              aria-label="菜单"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="glass relative mx-6 mt-2 overflow-hidden rounded-xl shadow-xl md:hidden"
          >
            {NAV_ITEMS.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(index);
                  }}
                  className={cn(
                    "block border-b border-black/5 px-5 py-3 text-sm transition-colors last:border-0 dark:border-white/5",
                    activeIndex === index
                      ? "bg-blue-500/10 font-medium text-blue-500"
                      : "hover:bg-black/5 dark:hover:bg-white/5"
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
