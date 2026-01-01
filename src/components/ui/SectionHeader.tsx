"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  badge: string;
  title: string;
  subtitle: string;
}

export function SectionHeader({
  icon: Icon,
  badge,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-16 relative"
    >
      {/* Decorative rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 border-2 border-dashed border-primary-300/50 dark:border-primary-700/50 rounded-full"
      />

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          delay: 0.2,
          stiffness: 200,
          damping: 15,
        }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white/80 dark:bg-gray-950/50 border border-cyan-500/50 dark:border-cyan-500/50 mb-6 backdrop-blur-sm"
      >
        <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
        <span className="text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
          {badge}
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
