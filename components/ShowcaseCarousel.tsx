"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";

const CircularGallery = dynamic(() => import("./CircularGallery"), {
  ssr: false,
});

/* ── collect all project screenshots ── */
const galleryItems = projects.flatMap((p) =>
  (p.images ?? []).map((src) => ({
    image: src,
    text: `${p.name} — ${p.tagline}`,
  }))
);

const slides = projects.flatMap((p) =>
  (p.images ?? []).map((src) => ({
    src,
    name: p.name,
    tagline: p.tagline,
    gradient: p.gradient,
  }))
);

export function ShowcaseCarousel() {
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMobile(window.innerWidth < 768);
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setMobile(window.innerWidth < 768), 200);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (!mounted || galleryItems.length === 0) return null;

  return mobile ? <MobileFallback /> : <DesktopGallery />;
}

/* ═══════════════════════════════════════
   Desktop: WebGL CircularGallery
   ═══════════════════════════════════════ */

function DesktopGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "start 0.5"],
  });
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], [18, 0]);

  return (
    <section id="showcase" ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Header */}
      <motion.div
        style={{ opacity: headerOpacity, y: headerY }}
        className="max-w-6xl mx-auto px-6 mb-8 will-change-transform"
      >
        <div className="text-xs font-mono text-blue-500 mb-2 tracking-widest opacity-80">
          SHOWCASE
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          作品展示
        </h2>
      </motion.div>

      {/* Gallery container — full width */}
      <div className="relative w-full" style={{ height: 480 }}>
        {CircularGallery && (
          <CircularGallery
            items={galleryItems}
            borderRadius={0.05}
            scrollSpeed={4}
            scrollEase={0.06}
          />
        )}
      </div>

      <p className="text-center text-[11px] opacity-30 mt-4">
        拖拽或滚轮浏览作品截图
      </p>
    </section>
  );
}

/* ═══════════════════════════════════════
   Mobile: horizontal swipe with snap
   ═══════════════════════════════════════ */

function MobileFallback() {
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
        style={{
          paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
          paddingRight: "max(1.5rem, env(safe-area-inset-right))",
        }}
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

      <p className="text-center text-[11px] opacity-30 mt-4">左右滑动浏览</p>
    </section>
  );
}

/* ═══════════════════════════════════════
   Shared card component (mobile)
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
      className="relative w-full rounded-2xl overflow-hidden shadow-xl shadow-black/15 border border-white/[0.08]"
      style={{
        aspectRatio: "3 / 2",
        background:
          "color-mix(in srgb, var(--card-bg, rgba(255,255,255,0.03)) 80%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <img
        src={slide.src}
        alt={slide.name}
        className="w-full h-full object-cover"
        draggable={false}
        loading="lazy"
        decoding="async"
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
