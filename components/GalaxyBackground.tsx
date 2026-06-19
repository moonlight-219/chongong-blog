"use client";

import dynamic from "next/dynamic";

const Galaxy = dynamic(() => import("./Galaxy"), { ssr: false });

export function GalaxyBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500" style={{ zIndex: -1 }}>
      <Galaxy
        hueShift={220}
        density={0.6}
        glowIntensity={0.3}
        saturation={0.15}
        starSpeed={0.5}
        speed={1.0}
        rotationSpeed={0.08}
        twinkleIntensity={0.4}
        transparent={true}
        mouseInteraction={true}
        mouseRepulsion={false}
        repulsionStrength={0}
      />
    </div>
  );
}
