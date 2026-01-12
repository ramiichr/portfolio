"use client";

import { forwardRef, memo, useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Code2 } from "lucide-react";
import Image from "next/image";
import { use3DCard } from "@/hooks/use3DCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";
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

// Static animation config for reduced motion
const REDUCED_MOTION_CONFIG = {
  card: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  transition: {
    duration: 0.2,
  },
  hover: {
    duration: 0.15,
    ease: "easeOut" as const,
  },
} as const;

const ActionButton = memo(function ActionButton({
  href,
  gradient,
  icon: Icon,
  variant = "primary",
  reducedMotion = false,
}: {
  href: string;
  gradient?: string;
  icon: typeof ExternalLink;
  variant?: "primary" | "secondary";
  reducedMotion?: boolean;
}) {
  const baseClasses =
    "p-3 rounded-xl text-white shadow-lg transition-shadow duration-300";
  const variantClasses =
    variant === "primary"
      ? `bg-gradient-to-r ${gradient} hover:shadow-xl`
      : "bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30";

  if (reducedMotion) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${variantClasses} hover:scale-105 transition-transform`}
      >
        <Icon className="w-5 h-5" />
      </a>
    );
  }

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
});

const ProjectImage = memo(function ProjectImage({
  project,
  isHovered,
  reducedMotion,
  isMobile,
  isPriority,
}: {
  project: Project;
  isHovered: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
  isPriority: boolean;
}) {
  const animConfig = reducedMotion ? REDUCED_MOTION_CONFIG : ANIMATION_CONFIG;

  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover transition-all ${
          reducedMotion ? "duration-200" : "duration-700"
        } ease-out ${isHovered && !reducedMotion ? "scale-110" : ""}`}
        priority={isPriority}
        loading={isPriority ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAIRAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABgRAAMBAQAAAAAAAAAAAAAAAAABEQIS/9oADAMBAAIRAxEAPwDUtu7d0+C3milt2eaKLyspkZVBbHwdZ+1rN0m9llmmYySE+SRyckn9pSu0hOO//9k="
      />

      {/* Gradient overlays - simplified for mobile */}
      {!isMobile && (
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0.3 }}
          transition={animConfig.hover}
          className={`absolute inset-0 bg-gradient-to-t ${project.gradient} mix-blend-overlay pointer-events-none`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Floating icon - simplified on mobile */}
      {!isMobile && !reducedMotion ? (
        <motion.div
          animate={{ y: isHovered ? -5 : 0, opacity: isHovered ? 1 : 0.5 }}
          transition={animConfig.hover}
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
      ) : (
        <div className="absolute top-4 right-4">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} p-[1px]`}
          >
            <div className="w-full h-full rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Category badge */}
      <div className="absolute top-4 left-4">
        <span
          className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full
            bg-gradient-to-r ${project.gradient} text-white shadow-lg`}
        >
          {project.category}
        </span>
      </div>

      {/* Action buttons - always visible on mobile */}
      <div
        className={`absolute bottom-4 right-4 flex gap-2 ${
          isMobile ? "opacity-100" : isHovered ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <ActionButton
          href={project.liveUrl}
          gradient={project.gradient}
          icon={ExternalLink}
          reducedMotion={reducedMotion}
        />
        <ActionButton
          href={project.githubUrl}
          icon={Github}
          variant="secondary"
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            {project.title}
            {isHovered && !reducedMotion && (
              <ArrowUpRight className="w-5 h-5 animate-pulse" />
            )}
          </h3>
        </div>
      </div>
    </div>
  );
});

const ProjectTags = memo(function ProjectTags({
  tags,
  reducedMotion,
}: {
  tags: string[];
  reducedMotion: boolean;
}) {
  // On reduced motion, skip the staggered animation
  if (reducedMotion) {
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider rounded-sm
              bg-white/80 dark:bg-gray-950/80
              text-gray-700 dark:text-gray-300
              border border-gray-300 dark:border-gray-700/50
              hover:border-cyan-500/50 dark:hover:border-cyan-500/50
              transition-colors duration-200 cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }

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
});

export const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(
  function ProjectCard({ project, index }, ref) {
    const reducedMotion = useReducedMotion();
    const isMobile = useIsMobile();

    // Disable 3D effect on mobile for better performance
    const {
      isHovered,
      springRotateX,
      springRotateY,
      handleMouseMove,
      handleMouseEnter,
      handleMouseLeave,
    } = use3DCard({ rotationRange: isMobile ? 0 : 8 });

    const animConfig = reducedMotion ? REDUCED_MOTION_CONFIG : ANIMATION_CONFIG;

    // First two cards get priority loading
    const isPriority = index < 2;

    // Memoize styles to prevent recalculation
    const cardStyle = useMemo(
      () =>
        isMobile || reducedMotion
          ? {}
          : { rotateX: springRotateX, rotateY: springRotateY },
      [isMobile, reducedMotion, springRotateX, springRotateY]
    );

    // Simplified card for reduced motion
    if (reducedMotion) {
      return (
        <motion.article
          ref={ref}
          layout
          {...animConfig.card}
          transition={{ ...animConfig.transition, delay: index * 0.05 }}
          className="group relative"
        >
          {/* Main card without effects */}
          <div
            className="relative rounded-sm overflow-hidden
            bg-white/80 dark:bg-gray-950/70 backdrop-blur-sm
            border border-gray-300 dark:border-gray-700/50
            shadow-sm shadow-gray-200/50 dark:shadow-black/50 hover:border-cyan-500/50
            transition-colors duration-200"
          >
            <ProjectImage
              project={project}
              isHovered={isHovered}
              reducedMotion={reducedMotion}
              isMobile={isMobile}
              isPriority={isPriority}
            />

            {/* Content section */}
            <div className="p-6 relative">
              <div
                className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${
                  project.gradient
                } ${
                  isHovered ? "scale-x-100" : "scale-x-0"
                } transition-transform duration-300 origin-left`}
              />

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-2">
                {project.description}
              </p>

              <ProjectTags tags={project.tags} reducedMotion={reducedMotion} />
            </div>
          </div>
        </motion.article>
      );
    }

    return (
      <motion.article
        ref={ref}
        layout
        {...animConfig.card}
        transition={{ ...animConfig.transition, delay: index * 0.1 }}
        style={cardStyle}
        onMouseMove={isMobile ? undefined : handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative perspective-1000"
      >
        {/* Glow effect - disabled on mobile */}
        {!isMobile && (
          <motion.div
            animate={{
              opacity: isHovered ? 0.6 : 0,
              scale: isHovered ? 1.05 : 0.95,
            }}
            transition={animConfig.hover}
            className={`absolute -inset-2 bg-gradient-to-r ${project.gradient} rounded-3xl blur-2xl -z-10 will-change-transform`}
          />
        )}

        {/* Main card */}
        <div
          className="relative rounded-sm overflow-hidden
          bg-white/80 dark:bg-gray-950/70 backdrop-blur-sm
          border border-gray-300 dark:border-gray-700/50
          shadow-sm shadow-gray-200/50 dark:shadow-black/50 hover:border-cyan-500/50
          transition-all duration-500"
        >
          <ProjectImage
            project={project}
            isHovered={isHovered}
            reducedMotion={reducedMotion}
            isMobile={isMobile}
            isPriority={isPriority}
          />

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

            <ProjectTags tags={project.tags} reducedMotion={reducedMotion} />

            <motion.div
              animate={{ width: isHovered ? "100%" : "0%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${project.gradient}`}
            />
          </div>

          {/* Shine effect - disabled on mobile */}
          {!isMobile && (
            <motion.div
              animate={{ x: isHovered ? 400 : -400 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none will-change-transform"
            />
          )}
        </div>
      </motion.article>
    );
  }
);
