"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  opacity: number;
  baseOpacity: number;
  hue: number;
}

interface GlobalParticleCanvasProps {
  particleCount?: number;
  connectionDistance?: number;
  mouseInfluence?: number;
}

export function GlobalParticleCanvas({
  particleCount = 120,
  connectionDistance = 130,
  mouseInfluence = 120,
}: GlobalParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.25 + Math.random() * 0.6;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 1.8 + 1.2,
          baseSize: Math.random() * 1.8 + 1.2,
          opacity: Math.random() * 0.4 + 0.35,
          baseOpacity: Math.random() * 0.4 + 0.35,
          hue: 230 + Math.random() * 40,
        });
      }
      particlesRef.current = particles;
    },
    [particleCount]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let isInitialized = false;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!isInitialized) {
        initParticles(width, height);
        isInitialized = true;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      timeRef.current += 0.018;

      if (isInitialized && width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);

        const isDark = document.documentElement.classList.contains("dark");

        particlesRef.current.forEach((particle, i) => {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          if (dist < mouseInfluence && dist > 0) {
            const force = (mouseInfluence - dist) / mouseInfluence;
            particle.vx -= (dx / dist) * force * 0.025;
            particle.vy -= (dy / dist) * force * 0.025;
            particle.opacity = Math.min(particle.baseOpacity + force * 0.45, 1);
            particle.size = particle.baseSize * (1 + force * 0.9);
          } else {
            particle.opacity += (particle.baseOpacity - particle.opacity) * 0.05;
            particle.size += (particle.baseSize - particle.size) * 0.08;
          }

          particle.vx += (Math.random() - 0.5) * 0.008;
          particle.vy += (Math.random() - 0.5) * 0.008;

          const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
          const maxSpeed = 1.2;
          if (speed > maxSpeed) {
            particle.vx = (particle.vx / speed) * maxSpeed;
            particle.vy = (particle.vy / speed) * maxSpeed;
          }

          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x <= 0 || particle.x >= width) {
            particle.vx *= -1;
            particle.x = Math.max(0, Math.min(width, particle.x));
          }
          if (particle.y <= 0 || particle.y >= height) {
            particle.vy *= -1;
            particle.y = Math.max(0, Math.min(height, particle.y));
          }

          const breathe = Math.sin(timeRef.current * 2 + i * 0.6) * 0.32 + 1;
          const currentSize = particle.size * breathe;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);

          const saturation = isDark ? "70%" : "65%";
          const lightness = isDark ? "65%" : "55%";
          ctx.fillStyle = `hsla(${particle.hue}, ${saturation}, ${lightness}, ${particle.opacity})`;
          ctx.fill();

          if (isDark) {
            ctx.shadowBlur = currentSize * 2.5;
            ctx.shadowColor = `hsla(${particle.hue}, 70%, 65%, ${particle.opacity * 0.35})`;
            ctx.fill();
            ctx.shadowBlur = 0;
          }

          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const other = particlesRef.current[j];
            const distanceX = particle.x - other.x;
            const distanceY = particle.y - other.y;
            const distanceSq = distanceX * distanceX + distanceY * distanceY;
            const maxDistSq = connectionDistance * connectionDistance;

            if (distanceSq < maxDistSq) {
              const distance = Math.sqrt(distanceSq);
              const lineOpacity =
                (1 - distance / connectionDistance) * (isDark ? 0.22 : 0.13);

              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);

              const avgHue = (particle.hue + other.hue) / 2;
              ctx.strokeStyle = `hsla(${avgHue}, ${saturation}, ${lightness}, ${lineOpacity})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, connectionDistance, mouseInfluence]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
