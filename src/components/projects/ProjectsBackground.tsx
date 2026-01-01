"use client";

import { motion } from "framer-motion";

const ORB_ANIMATIONS = {
  left: {
    x: [0, 50, 0],
    y: [0, -30, 0],
    scale: [1, 1.1, 1],
  },
  right: {
    x: [0, -40, 0],
    y: [0, 40, 0],
    scale: [1, 1.15, 1],
  },
};

function GradientOrb({
  position,
  gradient,
  size,
  duration,
}: {
  position: "left" | "right";
  gradient: string;
  size: string;
  duration: number;
}) {
  const positionClasses =
    position === "left" ? "top-1/4 -left-20" : "bottom-1/4 -right-20";

  return (
    <motion.div
      animate={ORB_ANIMATIONS[position]}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute ${positionClasses} ${size} ${gradient} rounded-full blur-3xl`}
    />
  );
}

function DecorativeGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
      style={{
        backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), 
                          linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

export function ProjectsBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* Floating gradient orbs */}
      <GradientOrb
        position="left"
        gradient="bg-gradient-to-br from-primary-400/20 to-purple-400/20"
        size="w-96 h-96"
        duration={20}
      />
      <GradientOrb
        position="right"
        gradient="bg-gradient-to-br from-accent-400/20 to-pink-400/20"
        size="w-80 h-80"
        duration={18}
      />

      {/* Decorative grid */}
      <DecorativeGrid />
    </div>
  );
}
