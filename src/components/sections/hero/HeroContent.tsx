"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { TypewriterText } from "@/components/ui";

// Animation variants for consistent animations
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export const fadeInUpScale = {
  initial: { opacity: 0, y: 30, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

export const springTransition = {
  duration: 0.6,
  type: "spring" as const,
};

export const createDelayedTransition = (delay: number) => ({
  duration: 0.6,
  delay,
});

// Reusable animation configurations
export const waveAnimation = {
  rotate: [0, 15, -15, 0],
};

export const waveTransition = {
  duration: 2,
  repeat: Infinity,
  repeatDelay: 3,
};

export const bounceAnimation = {
  y: [0, 3, 0],
};

export const bounceTransition = {
  duration: 1.5,
  repeat: Infinity,
};

interface GreetingBadgeProps {
  text: string;
}

export function GreetingBadge({ text }: GreetingBadgeProps) {
  return (
    <motion.div
      {...fadeInUpScale}
      transition={springTransition}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm 
        bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm
        border border-cyan-500/50 dark:border-cyan-500/50 
        shadow-sm
        mb-8"
    >
      <motion.div animate={waveAnimation} transition={waveTransition}>
        <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
      </motion.div>
      <span className="text-sm font-mono font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
        {text}
      </span>
    </motion.div>
  );
}

interface HeroTitleProps {
  name: string;
}

export function HeroTitle({ name }: HeroTitleProps) {
  return (
    <motion.h1
      {...fadeInUp}
      transition={createDelayedTransition(0.1)}
      className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold mb-6 relative"
    >
      {/* Shadow text for 3D effect */}
      <span className="absolute inset-0 text-primary-200/20 dark:text-primary-800/20 blur-sm translate-x-1 translate-y-1">
        {name}
      </span>
      <span className="relative bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
        {name}
      </span>
    </motion.h1>
  );
}

interface HeroSubtitleProps {
  title: string;
}

export function HeroSubtitle({ title }: HeroSubtitleProps) {
  return (
    <motion.div
      {...fadeInUp}
      transition={createDelayedTransition(0.2)}
      className="mb-8 h-12 sm:h-14"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
          <TypewriterText text={title} delay={800} />
        </span>
      </h2>
    </motion.div>
  );
}

interface HeroDescriptionProps {
  text: string;
}

export function HeroDescription({ text }: HeroDescriptionProps) {
  return (
    <motion.p
      {...fadeInUp}
      transition={createDelayedTransition(0.3)}
      className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
    >
      {text}
    </motion.p>
  );
}
