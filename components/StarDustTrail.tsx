"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  hue: number;
  brightness: number;
}

export function StarDustTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const lastMouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>();
  const lastSpawnRef = useRef(0);
  const enabledRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only enable on fine-pointer devices (desktop)
    const mq = window.matchMedia("(pointer: fine)");
    enabledRef.current = mq.matches;
    if (!mq.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const spawnParticle = (x: number, y: number, isBurst = false) => {
      if (particlesRef.current.length >= 180) return;

      const spread = isBurst ? 3 : 1;
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 0.6 + 0.15) * spread;

      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (isBurst ? 0 : 0.35),
        size: Math.random() * 2.2 + 0.8,
        life: 1,
        maxLife: Math.random() * 35 + 25,
        // Blue-cyan-white spectrum: 200-230 hue
        hue: 200 + Math.random() * 30,
        brightness: Math.random() * 25 + 75,
      });
    };

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Spawn particles along the trail
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const lx = lastMouseRef.current.x;
      const ly = lastMouseRef.current.y;

      if (mx > 0 && my > 0) {
        const dx = mx - lx;
        const dy = my - ly;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Spawn based on distance moved (interpolate for smooth trail)
        if (dist > 2 && lx > 0) {
          const steps = Math.min(Math.floor(dist / 4), 6);
          for (let i = 0; i < steps; i++) {
            const t = i / steps;
            spawnParticle(lx + dx * t, ly + dy * t);
          }
        }

        // Always spawn a couple at current position
        if (dist > 0.5) {
          spawnParticle(mx, my);
          if (Math.random() > 0.5) spawnParticle(mx, my);
        }

        lastMouseRef.current = { x: mx, y: my };
      }

      // Update & draw particles
      const alive: Particle[] = [];

      ctx.globalCompositeOperation = "lighter";

      for (const p of particlesRef.current) {
        p.life -= 1 / p.maxLife;
        if (p.life <= 0) continue;

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        // Gentle upward drift (stardust floating)
        p.vy -= 0.008;

        const alpha = p.life * p.life; // Quadratic fade for softer falloff
        const size = p.size * (0.4 + 0.6 * p.life);

        // Outer glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3);
        grad.addColorStop(0, `hsla(${p.hue}, 60%, ${p.brightness}%, ${alpha * 0.7})`);
        grad.addColorStop(0.3, `hsla(${p.hue}, 50%, 70%, ${alpha * 0.3})`);
        grad.addColorStop(1, `hsla(${p.hue}, 40%, 60%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Bright core
        const coreGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        coreGrad.addColorStop(0, `hsla(0, 0%, 100%, ${alpha * 0.9})`);
        coreGrad.addColorStop(1, `hsla(${p.hue}, 50%, 85%, ${alpha * 0.3})`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();

        alive.push(p);
      }

      ctx.globalCompositeOperation = "source-over";
      particlesRef.current = alive;

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current!);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 150 }}
      aria-hidden
    />
  );
}
