"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface OrbConfig {
  position: string;
  size: string;
  gradient: string;
  animation: {
    x?: number[];
    y?: number[];
    scale?: number[];
    opacity?: number[];
  };
  duration: number;
}

interface AnimatedBackgroundProps {
  orbs?: OrbConfig[];
  showParticles?: boolean;
  particleCount?: number;
  showGrid?: boolean;
  className?: string;
}

const defaultOrbs: OrbConfig[] = [
  {
    position: "top-10 left-10",
    size: "w-[500px] h-[500px]",
    gradient: "from-primary-400/20 to-cyan-400/20",
    animation: { x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] },
    duration: 20,
  },
  {
    position: "bottom-10 right-10",
    size: "w-[400px] h-[400px]",
    gradient: "from-accent-400/20 to-pink-400/20",
    animation: { x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.15, 1] },
    duration: 18,
  },
  {
    position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    size: "w-[600px] h-[600px]",
    gradient: "from-purple-400/10 to-blue-400/10",
    animation: { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] },
    duration: 15,
  },
];

export function AnimatedBackground({
  orbs = defaultOrbs,
  showParticles = false,
  particleCount = 15,
  showGrid = true,
  className = "",
}: AnimatedBackgroundProps) {
  // Generate stable particle positions using useMemo
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: `${10 + ((i * 37) % 80)}%`,
      top: `${10 + ((i * 53) % 80)}%`,
      duration: 3 + (i % 3),
      delay: i * 0.3,
    }));
  }, [particleCount]);

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* Animated gradient orbs */}
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          animate={orb.animation}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute ${orb.position} ${orb.size} bg-gradient-to-br ${orb.gradient} rounded-full blur-3xl`}
        />
      ))}

      {/* Floating decorative particles */}
      {showParticles &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [0, -20, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-1.5 h-1.5 bg-primary-400/40 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}

      {/* Grid overlay */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      )}
    </div>
  );
}
