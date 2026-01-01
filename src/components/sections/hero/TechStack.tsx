"use client";

import { motion } from "framer-motion";

interface TechBadgeProps {
  tech: string;
  index: number;
}

export function TechBadge({ tech, index }: TechBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2 + index * 0.1 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="px-4 py-2 rounded-sm text-xs font-mono font-medium uppercase tracking-wider
        bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm
        border border-gray-300 dark:border-gray-700/50
        text-gray-700 dark:text-gray-300 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400
        shadow-sm hover:shadow-md transition-all cursor-default"
    >
      {tech}
    </motion.span>
  );
}

const TECH_STACK = ["React", "Next.js", "TypeScript", "Tailwind"] as const;

interface TechStackProps {
  className?: string;
}

export function TechStack({ className = "" }: TechStackProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className={`flex flex-wrap items-center justify-center gap-3 ${className}`}
    >
      {TECH_STACK.map((tech, index) => (
        <TechBadge key={tech} tech={tech} index={index} />
      ))}
    </motion.div>
  );
}
