"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import type { CategoryCardProps } from "@/types/skills";
import { springConfigs, easings } from "@/constants/animations";
import { SkillOrb } from "./SkillOrb";

export function CategoryCard({
  title,
  subtitle,
  icon,
  skills,
  gradient,
  delay,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        delay,
        duration: 0.8,
        ease: easings.smooth,
      }}
      className="relative"
    >
      {/* Floating header */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: delay + 0.2,
          duration: 0.6,
          ease: "easeOut",
        }}
        className="flex items-center gap-4 mb-8"
      >
        <motion.div
          whileHover={{ rotate: 360, scale: 1.08 }}
          transition={{
            rotate: { duration: 0.8, ease: easings.snappy },
            scale: { type: "spring", ...springConfigs.bouncy },
          }}
          className={`
            relative w-14 h-14 rounded-sm bg-gradient-to-br ${gradient}
            border border-white/50 dark:border-gray-700/50
            flex items-center justify-center shadow-lg
          `}
        >
          {icon}
        </motion.div>

        <div>
          <h3 className="text-2xl font-mono font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            {title}
          </h3>
          <p className="text-xs font-mono text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex-1 h-[2px] rounded-sm bg-gradient-to-r ${gradient} opacity-30`}
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 rounded-sm border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center"
        >
          <Zap className="w-4 h-4 text-gray-400" />
        </motion.div>
      </motion.div>

      {/* Skills grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {skills.map((skill, index) => (
          <SkillOrb key={skill.name} {...skill} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
