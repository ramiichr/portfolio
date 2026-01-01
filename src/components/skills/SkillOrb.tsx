"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useCallback } from "react";
import type { SkillOrbProps } from "@/types/skills";
import { springConfigs, staggerDelay } from "@/constants/animations";

export function SkillOrb({
  name,
  icon: Icon,
  color,
  shadowColor,
  index,
}: SkillOrbProps) {
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const springRotateX = useSpring(rotateX, springConfigs.smooth);
  const springRotateY = useSpring(rotateY, springConfigs.smooth);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * staggerDelay,
        type: "spring",
        ...springConfigs.gentle,
      }}
      style={{ rotateX: springRotateX, rotateY: springRotateY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative perspective-1000"
    >
      {/* Outer glow ring */}
      <motion.div
        animate={{
          scale: isHovered ? 1.15 : 1,
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{ type: "spring", ...springConfigs.snappy }}
        className={`absolute inset-0 bg-gradient-to-r ${color} rounded-2xl blur-xl`}
      />

      {/* Main card */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", ...springConfigs.bouncy }}
        className={`
          relative flex flex-col items-center justify-center p-6 rounded-sm cursor-pointer
          bg-white/90 dark:bg-gray-950/80 backdrop-blur-sm
          border border-gray-300 dark:border-gray-700/50
          shadow-sm overflow-hidden transition-all duration-500 ease-out
          ${
            isHovered
              ? `${shadowColor} border-cyan-500/50`
              : "shadow-gray-200/50 dark:shadow-gray-900/50"
          }
        `}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />

        {/* Scan line effect on hover */}
        {isHovered && (
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"
          />
        )}

        {/* Icon container */}
        <motion.div
          animate={{
            rotateY: isHovered ? 360 : 0,
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{
            rotateY: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
            scale: { type: "spring", ...springConfigs.bouncy },
          }}
          className={`
            relative w-16 h-16 rounded-sm bg-gradient-to-br ${color}
            border border-white/50 dark:border-gray-700/50
            flex items-center justify-center shadow-md ${shadowColor} mb-4
          `}
        >
          <Icon className="w-8 h-8 text-white drop-shadow-lg" />
        </motion.div>

        {/* Skill name */}
        <span className="relative font-mono font-bold text-gray-800 dark:text-gray-100 text-center text-xs uppercase tracking-wider">
          {name}
        </span>

        {/* Terminal-style underline */}
        <motion.div
          animate={{ width: isHovered ? "70%" : "0%" }}
          transition={{ type: "spring", ...springConfigs.snappy }}
          className="h-0.5 mt-2 rounded-sm bg-cyan-600 dark:bg-cyan-400"
        />
      </motion.div>
    </motion.div>
  );
}
