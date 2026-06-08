"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { projects } from "@/data/projects";

/* ── collect all project screenshots ── */
const slides = projects.flatMap((p) =>
  (p.images ?? []).map((src) => ({
    src,
    name: p.name,
    tagline: p.tagline,
    gradient: p.gradient,
  }))
);

/* ── orbit params (desktop) ── */
const X_RADIUS = 36;
const Y_RADIUS = 4;
const SPEED = 0.22;
const MIN_SCALE = 0.45;
const MIN_OPACITY = 0.18;
const CARD_W = 380;
const CARD_H = 260;

export function ShowcaseCarousel() {
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMobile(window.innerWidth < 768);
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!mounted || slides.length === 0) return null;

  return mobile ? <MobileCarousel /> : <DesktopCarousel />;
}

/* ═══════════════════════════════════════
   Desktop: 3D elliptical orbit carousel
   ═══════════════════════════════════════ */

function DesktopCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const angleRef = useRef(0);
  const lastTimeRef = useRef(0);
  const pausedRef = useRef(false);
  const [, forceRender] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "start 0.5"],
  });
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], [18, 0]);

  useEffect(() => {
    let id: number;
    const tick = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
      if (!pausedRef.current) {
        angleRef.current += dt * SPEED;
      }
      forceRender((v) => v + 1);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const pause = useCallback(() => {
    pausedRef.current = true;
    lastTimeRef.current = 0;
  }, []);
  const resume = useCallback(() => {
    pausedRef.current = false;
    lastTimeRef.current = 0;
  }, []);

  const n = slides.length;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Header */}
      <motion.div
        style={{ opacity: headerOpacity, y: headerY }}
        className="max-w-6xl mx-auto px-6 mb-10 will-change-transform"
      >
        <div className="text-xs font-mono text-blue-500 mb-2 tracking-widest opacity-80">
          SHOWCASE
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          作品展示
        </h2>
      </motion.div>

      {/* Orbit area */}
      <div
        className="relative mx-auto"
        style={{ height: CARD_H + 160 }}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {slides.map((slide, i) => {
          const base = (i / n) * Math.PI * 2;
          const a = angleRef.current + base;
          const sinA = Math.sin(a);
          const cosA = Math.cos(a);
          const depth = (sinA + 1) / 2;

          return (
            <div
              key={`${slide.name}-${i}`}
              className="absolute"
              style={{
                width: CARD_W,
                height: CARD_H,
                left: "50%",
                top: "50%",
                transform: `translateX(calc(-50% + ${cosA * X_RADIUS}vw)) translateY(calc(-50% + ${-sinA * Y_RADIUS}vh)) scale(${MIN_SCALE + depth * (1 - MIN_SCALE)})`,
                opacity: MIN_OPACITY + depth * (1 - MIN_OPACITY),
                zIndex: Math.round(depth * 100),
                willChange: "transform, opacity",
              }}
            >
              <CarouselCard slide={slide} />
            </div>
          );
        })}
      </div>

      <p className="text-center text-[11px] opacity-30 mt-2">
        悬停暂停 · 自动轮播
      </p>
    </section>
  );
}

/* ═══════════════════════════════════════
   Mobile: horizontal swipe with snap
   ═══════════════════════════════════════ */

function MobileCarousel() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "start 0.5"],
  });
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], [18, 0]);

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden">
      {/* Header */}
      <motion.div
        style={{ opacity: headerOpacity, y: headerY }}
        className="px-6 mb-8 will-change-transform"
      >
        <div className="text-xs font-mono text-blue-500 mb-2 tracking-widest opacity-80">
          SHOWCASE
        </div>
        <h2 className="text-2xl font-bold tracking-tight">作品展示</h2>
      </motion.div>

      {/* Swipe row */}
      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4"
        style={{ paddingLeft: "max(1.5rem, env(safe-area-inset-left))", paddingRight: "max(1.5rem, env(safe-area-inset-right))" }}
      >
        {slides.map((slide, i) => (
          <motion.div
            key={`${slide.name}-${i}`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="snap-center shrink-0"
            style={{ width: "min(320px, 80vw)" }}
          >
            <CarouselCard slide={slide} />
          </motion.div>
        ))}
        <div className="shrink-0 w-4" />
      </div>

      <p className="text-center text-[11px] opacity-30 mt-4">
        左右滑动浏览
      </p>
    </section>
  );
}

/* ═══════════════════════════════════════
   Shared card component
   ═══════════════════════════════════════ */

function CarouselCard({
  slide,
}: {
  slide: {
    src: string;
    name: string;
    tagline: string;
    gradient: [string, string];
  };
}) {
  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl shadow-black/15 border border-black/[0.06] dark:border-white/[0.08]"
      style={{
        background: "color-mix(in srgb, var(--card-bg) 80%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <img
        src={slide.src}
        alt={slide.name}
        className="w-full h-full object-cover"
        draggable={false}
      />

      {/* Bottom info */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-4 pt-10 pb-3">
        <h3 className="text-white text-sm font-bold">{slide.name}</h3>
        <p className="text-white/55 text-[11px] mt-0.5 line-clamp-1">
          {slide.tagline}
        </p>
      </div>

      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: `linear-gradient(90deg, ${slide.gradient[0]}, ${slide.gradient[1]})`,
        }}
      />
    </div>
  );
}
