"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Code2 } from "lucide-react";
import Image from "next/image";
import { use3DCard } from "@/hooks/use3DCard";
import type { Project } from "@/constants/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ANIMATION_CONFIG = {
  card: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50, scale: 0.9 },
  },
  transition: {
    duration: 0.5,
    ease: [0.25, 0.1, 0.25, 1],
  },
  hover: {
    duration: 0.4,
    ease: "easeOut" as const,
  },
} as const;

function ActionButton({
  href,
  gradient,
  icon: Icon,
  variant = "primary",
}: {
  href: string;
  gradient?: string;
  icon: typeof ExternalLink;
  variant?: "primary" | "secondary";
}) {
  const baseClasses =
    "p-3 rounded-xl text-white shadow-lg transition-shadow duration-300";
  const variantClasses =
    variant === "primary"
      ? `bg-gradient-to-r ${gradient} hover:shadow-xl`
      : "bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, rotate: variant === "primary" ? 5 : -5 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses}`}
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
}

function ProjectImage({
  project,
  isHovered,
}: {
  project: Project;
  isHovered: boolean;
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
      />

      {/* Gradient overlays */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.3 }}
        transition={ANIMATION_CONFIG.hover}
        className={`absolute inset-0 bg-gradient-to-t ${project.gradient} mix-blend-overlay pointer-events-none`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Floating icon */}
      <motion.div
        animate={{ y: isHovered ? -5 : 0, opacity: isHovered ? 1 : 0.5 }}
        transition={ANIMATION_CONFIG.hover}
        className="absolute top-4 right-4"
      >
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} p-[1px]`}
        >
          <div className="w-full h-full rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Category badge */}
      <motion.div
        animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0.7 }}
        transition={ANIMATION_CONFIG.hover}
        className="absolute top-4 left-4"
      >
        <span
          className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full
            bg-gradient-to-r ${project.gradient} text-white shadow-lg`}
        >
          {project.category}
        </span>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
        transition={ANIMATION_CONFIG.hover}
        className="absolute bottom-4 right-4 flex gap-2"
      >
        <ActionButton
          href={project.liveUrl}
          gradient={project.gradient}
          icon={ExternalLink}
        />
        <ActionButton
          href={project.githubUrl}
          icon={Github}
          variant="secondary"
        />
      </motion.div>

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
        <motion.div
          animate={{ y: isHovered ? -5 : 0 }}
          transition={ANIMATION_CONFIG.hover}
        >
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            {project.title}
            <motion.span
              animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.span>
          </h3>
        </motion.div>
      </div>
    </div>
  );
}

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 + 0.2 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider rounded-sm
            bg-white/80 dark:bg-gray-950/80
            text-gray-700 dark:text-gray-300
            border border-gray-300 dark:border-gray-700/50
            hover:border-cyan-500/50 dark:hover:border-cyan-500/50
            transition-all duration-300 cursor-default"
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}

export const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(
  function ProjectCard({ project, index }, ref) {
    const {
      isHovered,
      springRotateX,
      springRotateY,
      handleMouseMove,
      handleMouseEnter,
      handleMouseLeave,
    } = use3DCard({ rotationRange: 8 });

    return (
      <motion.article
        ref={ref}
        layout
        {...ANIMATION_CONFIG.card}
        transition={{ ...ANIMATION_CONFIG.transition, delay: index * 0.1 }}
        style={{ rotateX: springRotateX, rotateY: springRotateY }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative perspective-1000"
      >
        {/* Glow effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.05 : 0.95,
          }}
          transition={ANIMATION_CONFIG.hover}
          className={`absolute -inset-2 bg-gradient-to-r ${project.gradient} rounded-3xl blur-2xl -z-10`}
        />

        {/* Main card */}
        <div
          className="relative rounded-sm overflow-hidden
          bg-white/80 dark:bg-gray-950/70 backdrop-blur-sm
          border border-gray-300 dark:border-gray-700/50
          shadow-sm shadow-gray-200/50 dark:shadow-black/50 hover:border-cyan-500/50
          transition-all duration-500"
        >
          <ProjectImage project={project} isHovered={isHovered} />

          {/* Content section */}
          <div className="p-6 relative">
            <motion.div
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${project.gradient} origin-left`}
            />

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-2">
              {project.description}
            </p>

            <ProjectTags tags={project.tags} />

            <motion.div
              animate={{ width: isHovered ? "100%" : "0%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${project.gradient}`}
            />
          </div>

          {/* Shine effect */}
          <motion.div
            animate={{ x: isHovered ? 400 : -400 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
          />
        </div>
      </motion.article>
    );
  }
);
