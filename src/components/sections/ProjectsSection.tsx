"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { projects, type CategoryFilter } from "@/constants/projects";
import {
  ProjectCard,
  ProjectsBackground,
  CategoryFilters,
} from "@/components/projects";

export function ProjectsSection() {
  const t = useTranslations("projects");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "all" || project.category === activeCategory
  );

  return (
    <section
      id="projects"
      className="min-h-screen py-20 lg:py-32 relative overflow-hidden flex items-center"
    >
      <ProjectsBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <ProjectsGrid projects={filteredProjects} />

        <BottomDecoration />
      </div>
    </section>
  );
}

function SectionHeader({
  title,
  subtitle,
  activeCategory,
  onCategoryChange,
}: {
  title: string;
  subtitle: string;
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-16 relative"
    >
      {/* Rotating decorative circle */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 border border-dashed border-primary-300/30 dark:border-primary-700/30 rounded-full"
      />

      {/* Badge */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white/80 dark:bg-gray-950/50 border border-cyan-500/50 dark:border-cyan-500/50 mb-6 backdrop-blur-sm"
      >
        <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
        <span className="text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
          Featured Work
        </span>
      </motion.div>

      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
        <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
          {title}
        </span>
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
        {subtitle}
      </p>

      <CategoryFilters
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />
    </motion.div>
  );
}

function ProjectsGrid({
  projects: projectList,
}: {
  projects: typeof projects;
}) {
  return (
    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {projectList.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

function BottomDecoration() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex justify-center mt-16"
    >
      <div className="flex items-center gap-4">
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-700" />
        <Sparkles className="w-5 h-5 text-primary-400" />
        <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-700" />
      </div>
    </motion.div>
  );
}
