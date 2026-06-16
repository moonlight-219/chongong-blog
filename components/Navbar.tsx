"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const GooeyNav = dynamic(() => import("./GooeyNav"), { ssr: false });

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
  const blurPx = useTransform(scrollY, [0, 80], [0, 14]);
  const padY = useTransform(scrollY, [0, 80], [16, 10]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const backdrop = useMotionTemplate`blur(${blurPx}px)`;

  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  // Scroll-based active section detection (cached refs + rAF throttle)
  useEffect(() => {
    const sectionEls = NAV_ITEMS.map((i) => document.querySelector(i.href) as HTMLElement | null);
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        for (let i = sectionEls.length - 1; i >= 0; i--) {
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
    const el = document.querySelector(NAV_ITEMS[index].href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 origin-left z-[60]"
      />

      <motion.header
        style={{ paddingTop: padY, paddingBottom: padY }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* BG layer */}
        <motion.div
          aria-hidden
          style={{
            opacity: bgOpacity,
            backdropFilter: backdrop,
            WebkitBackdropFilter: backdrop,
            backgroundColor: "color-mix(in srgb, var(--card-bg) 80%, transparent)",
          }}
          className="absolute inset-0 pointer-events-none"
        />
        <motion.div
          aria-hidden
          style={{ opacity: borderOpacity, backgroundColor: "var(--border-subtle)" }}
          className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
        />

        <nav className="relative max-w-6xl mx-auto px-6 flex items-center justify-center">
          {/* Desktop nav — GooeyNav centered */}
          <div className="hidden md:block">
            <GooeyNav
              items={NAV_ITEMS}
              activeIndex={activeIndex}
              onItemClick={handleItemClick}
              particleCount={6}
              particleDistances={[90, 10]}
              particleR={100}
              animationTime={600}
              timeVariance={400}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          {/* Right side */}
          <div className="absolute right-6 flex items-center gap-2">
            <ThemeToggle />
            <button
              className="md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label="菜单"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="relative md:hidden mt-2 mx-6 glass rounded-xl overflow-hidden shadow-xl"
          >
            {NAV_ITEMS.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-5 py-3 text-sm border-b border-black/5 dark:border-white/5 last:border-0 transition-colors",
                    activeIndex === index
                      ? "bg-blue-500/10 text-blue-500 font-medium"
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
