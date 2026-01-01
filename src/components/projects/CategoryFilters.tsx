"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  categories,
  type CategoryFilter as CategoryFilterType,
} from "@/constants/projects";

interface CategoryFilterProps {
  activeCategory: CategoryFilterType;
  onCategoryChange: (category: CategoryFilterType) => void;
}

function FilterButton({
  category,
  isActive,
  onClick,
  label,
  index,
}: {
  category: CategoryFilterType;
  isActive: boolean;
  onClick: () => void;
  label: string;
  index: number;
}) {
  const baseClasses = `relative px-6 py-2.5 rounded-sm text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 overflow-hidden`;

  const activeClasses =
    "text-white shadow-lg shadow-cyan-500/30 bg-cyan-600 dark:bg-cyan-500 border border-cyan-500";
  const inactiveClasses =
    "bg-white/80 dark:bg-gray-950/50 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm hover:border-cyan-500/50";

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {isActive && (
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent"
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        <Layers className="w-4 h-4" />
        {label}
      </span>
    </motion.button>
  );
}

export function CategoryFilters({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const t = useTranslations("projects");

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category, index) => (
        <FilterButton
          key={category}
          category={category}
          isActive={activeCategory === category}
          onClick={() => onCategoryChange(category)}
          label={t(category)}
          index={index}
        />
      ))}
    </div>
  );
}
