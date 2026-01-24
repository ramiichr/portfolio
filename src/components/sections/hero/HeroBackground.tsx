"use client";

import { motion } from "framer-motion";
import { useMemo, memo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface ParticleProps {
  index: number;
  reducedMotion: boolean;
}

const Particle = memo(function Particle({
  index,
  reducedMotion,
}: ParticleProps) {
  const randomX = useMemo(() => (index * 37) % 100, [index]);
  const randomDuration = useMemo(() => 15 + (index % 10), [index]);

  // Skip animation entirely for reduced motion
  if (reducedMotion) {
    return (
      <div
        className="absolute w-1 h-1 bg-primary-400/40 rounded-full"
        style={{ left: `${randomX}vw`, top: `${(index * 17) % 100}vh` }}
      />
    );
  }

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
      className="absolute w-1 h-1 bg-primary-400/60 rounded-full will-change-transform"
    />
  );
});

interface AnimatedOrbProps {
  className: string;
  animation: {
    scale: readonly number[];
    x: readonly number[];
    y: readonly number[];
  };
  duration: number;
  reducedMotion: boolean;
}

const AnimatedOrb = memo(function AnimatedOrb({
  className,
  animation,
  duration,
  reducedMotion,
}: AnimatedOrbProps) {
  // Skip animation for reduced motion - just show static orb
  if (reducedMotion) {
    return <div className={`${className} will-change-auto`} />;
  }

  return (
    <motion.div
      animate={{
        scale: [...animation.scale],
        x: [...animation.x],
        y: [...animation.y],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={`${className} will-change-transform`}
    />
  );
});

const ORBS_CONFIG = [
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
] as const;

// Reduced particles on mobile for better performance
const PARTICLE_COUNT_DESKTOP = 20;
const PARTICLE_COUNT_MOBILE = 8;

interface HeroBackgroundProps {
  mousePosition: { x: number; y: number };
}

export function HeroBackground({ mousePosition }: HeroBackgroundProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const particleCount = isMobile
    ? PARTICLE_COUNT_MOBILE
    : PARTICLE_COUNT_DESKTOP;

  return (
    <div className="absolute inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* Parallax animated orbs - disable parallax on mobile or reduced motion */}
      {!reducedMotion && !isMobile ? (
        <motion.div
          animate={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          className="absolute inset-0 will-change-transform"
        >
          {ORBS_CONFIG.map((orb, index) => (
            <AnimatedOrb key={index} {...orb} reducedMotion={reducedMotion} />
          ))}
        </motion.div>
      ) : (
        <div className="absolute inset-0">
          {ORBS_CONFIG.map((orb, index) => (
            <AnimatedOrb key={index} {...orb} reducedMotion={reducedMotion} />
          ))}
        </div>
      )}

      {/* Floating particles - reduced on mobile */}
      {Array.from({ length: particleCount }, (_, i) => (
        <Particle key={i} index={i} reducedMotion={reducedMotion} />
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
