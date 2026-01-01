"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GridPatternProps {
  size?: number;
  color?: string;
}

export function GridPattern({ size = 10, color = "cyan" }: GridPatternProps) {
  return (
    <div
      className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
      style={{
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}

interface ScanLineProps {
  duration?: number;
  intensity?: "light" | "medium" | "strong";
  showOnHover?: boolean;
}

export function ScanLine({
  duration = 3,
  intensity = "light",
  showOnHover = false,
}: ScanLineProps) {
  const intensityMap = {
    light: "via-cyan-500/5",
    medium: "via-cyan-500/10",
    strong: "via-white/20",
  };

  return (
    <motion.div
      animate={{ y: ["-100%", "200%"] }}
      transition={{ duration, repeat: Infinity }}
      className={`absolute inset-x-0 h-8 bg-gradient-to-b from-transparent ${
        intensityMap[intensity]
      } to-transparent ${
        showOnHover ? "opacity-0 group-hover:opacity-100" : ""
      }`}
    />
  );
}

interface TechCardProps {
  children: ReactNode;
  className?: string;
}

export function TechCard({ children, className = "" }: TechCardProps) {
  return (
    <div
      className={`relative rounded-sm bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm 
        border border-gray-300 dark:border-gray-700/50 shadow-sm overflow-hidden ${className}`}
    >
      <GridPattern />
      {children}
    </div>
  );
}
