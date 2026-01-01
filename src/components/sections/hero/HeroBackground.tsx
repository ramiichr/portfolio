"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface ParticleProps {
  index: number;
}

function Particle({ index }: ParticleProps) {
  const randomX = useMemo(() => (index * 37) % 100, [index]);
  const randomDuration = useMemo(() => 15 + (index % 10), [index]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: "100vh",
        x: `${randomX}vw`,
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: "-10vh",
      }}
      transition={{
        delay: index * 0.5,
        duration: randomDuration,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute w-1 h-1 bg-primary-400/60 rounded-full"
    />
  );
}

interface AnimatedOrbProps {
  className: string;
  animation: {
    scale: number[];
    x: number[];
    y: number[];
  };
  duration: number;
}

function AnimatedOrb({ className, animation, duration }: AnimatedOrbProps) {
  return (
    <motion.div
      animate={animation}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    />
  );
}

const ORBS_CONFIG: AnimatedOrbProps[] = [
  {
    className:
      "absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary-400/30 to-cyan-400/30 dark:from-primary-600/20 dark:to-cyan-600/20 rounded-full blur-3xl",
    animation: { scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] },
    duration: 20,
  },
  {
    className:
      "absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-accent-400/30 to-pink-400/30 dark:from-accent-600/20 dark:to-pink-600/20 rounded-full blur-3xl",
    animation: { scale: [1, 1.15, 1], x: [0, -40, 0], y: [0, 50, 0] },
    duration: 18,
  },
  {
    className:
      "absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-gradient-to-br from-purple-400/20 to-indigo-400/20 dark:from-purple-600/15 dark:to-indigo-600/15 rounded-full blur-3xl",
    animation: { scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, 40, 0] },
    duration: 15,
  },
];

const PARTICLE_COUNT = 20;

interface HeroBackgroundProps {
  mousePosition: { x: number; y: number };
}

export function HeroBackground({ mousePosition }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* Parallax animated orbs */}
      <motion.div
        animate={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="absolute inset-0"
      >
        {ORBS_CONFIG.map((orb, index) => (
          <AnimatedOrb key={index} {...orb} />
        ))}
      </motion.div>

      {/* Floating particles */}
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
        <Particle key={i} index={i} />
      ))}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/50 dark:to-gray-950/50" />
    </div>
  );
}
