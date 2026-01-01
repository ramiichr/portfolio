"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { infiniteAnimationDurations } from "@/constants/animations";

export function SkillsBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* Animated orbs */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: infiniteAnimationDurations.slow,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-primary-400/15 to-cyan-400/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: infiniteAnimationDurations.medium,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-accent-400/15 to-pink-400/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, 50, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

interface SkillsSectionHeaderProps {
  title: string;
  subtitle: string;
}

export function SkillsSectionHeader({
  title,
  subtitle,
}: SkillsSectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-20 relative"
    >
      {/* Decorative rotating circle */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 border-2 border-dashed border-primary-300/50 dark:border-primary-700/50 rounded-full"
      />

      {/* Tech Stack badge */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white/80 dark:bg-gray-950/50 border border-cyan-500/50 dark:border-cyan-500/50 mb-6 backdrop-blur-sm"
      >
        <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
        <span className="text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
          Tech Stack
        </span>
      </motion.div>

      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
        <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
          {title}
        </span>
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  );
}
