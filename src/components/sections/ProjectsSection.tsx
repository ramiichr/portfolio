"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  ExternalLink,
  Github,
  Sparkles,
  ArrowUpRight,
  Code2,
  Layers,
} from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with cart, checkout, and payment integration.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    category: "web",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Collaborative project management tool with real-time updates.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "web",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
  },
  {
    id: 3,
    title: "Fitness Tracker",
    description:
      "Mobile app for tracking workouts, nutrition, and health metrics.",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop",
    tags: ["React Native", "Firebase", "Redux"],
    category: "mobile",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Modern portfolio with animations and dark mode support.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    category: "web",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
  },
  {
    id: 5,
    title: "Brand Identity",
    description: "Complete brand identity design for a tech startup.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    tags: ["Figma", "Branding", "UI/UX"],
    category: "design",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    gradient: "from-pink-500 via-rose-500 to-red-500",
  },
  {
    id: 6,
    title: "AI Chat Assistant",
    description: "Intelligent chatbot powered by machine learning.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    tags: ["Python", "OpenAI", "FastAPI", "React"],
    category: "web",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
  },
];

const categories = ["all", "web", "mobile", "design"] as const;

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{ rotateX: springRotateX, rotateY: springRotateY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative perspective-1000"
    >
      {/* Glow effect behind card */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.05 : 0.95,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`absolute -inset-2 bg-gradient-to-r ${project.gradient} rounded-3xl blur-2xl -z-10`}
      />

      {/* Main card container */}
      <div
        className="relative rounded-sm overflow-hidden
        bg-white/80 dark:bg-gray-950/70 backdrop-blur-sm
        border border-gray-300 dark:border-gray-700/50
        shadow-sm shadow-gray-200/50 dark:shadow-black/50 hover:border-cyan-500/50
        transition-all duration-500"
      >
        {/* Image section */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* Image */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
            className={`absolute inset-0 bg-gradient-to-t ${project.gradient} mix-blend-overlay`}
          />

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Floating decorative elements */}
          <motion.div
            animate={{
              y: isHovered ? -5 : 0,
              opacity: isHovered ? 1 : 0.5,
            }}
            transition={{ duration: 0.4 }}
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
            transition={{ duration: 0.4 }}
            className="absolute top-4 left-4"
          >
            <span
              className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full
              bg-gradient-to-r ${project.gradient} text-white shadow-lg`}
            >
              {project.category}
            </span>
          </motion.div>

          {/* Action buttons - revealed on hover */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute bottom-4 right-4 flex gap-2"
          >
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-xl bg-gradient-to-r ${project.gradient} text-white shadow-lg
                hover:shadow-xl transition-shadow duration-300`}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-white/20 backdrop-blur-md text-white shadow-lg
                hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Title overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.div
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.4 }}
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

        {/* Content section */}
        <div className="p-6 relative">
          {/* Decorative gradient line */}
          <motion.div
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${project.gradient} origin-left`}
          />

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-2">
            {project.description}
          </p>

          {/* Tags with creative styling */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: tagIndex * 0.05 + 0.2 }}
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

          {/* Bottom gradient accent */}
          <motion.div
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${project.gradient}`}
          />
        </div>

        {/* Shine effect on hover */}
        <motion.div
          animate={{ x: isHovered ? 400 : -400 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
        />
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const t = useTranslations("projects");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "all" || project.category === activeCategory
  );

  return (
    <section
      id="projects"
      className="min-h-screen py-20 lg:py-32 relative overflow-hidden flex items-center"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

        {/* Floating gradient orbs */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-primary-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gradient-to-br from-accent-400/20 to-pink-400/20 rounded-full blur-3xl"
        />

        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), 
                              linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 relative"
        >
          {/* Decorative elements */}
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
              {t("title")}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            {t("subtitle")}
          </p>

          {/* Category filters with creative styling */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`relative px-6 py-2.5 rounded-sm text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 overflow-hidden
                  ${
                    activeCategory === category
                      ? "text-white shadow-lg shadow-cyan-500/30 bg-cyan-600 dark:bg-cyan-500 border border-cyan-500"
                      : "bg-white/80 dark:bg-gray-950/50 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700/50 backdrop-blur-sm hover:border-cyan-500/50"
                  }`}
              >
                {/* Scan line on active */}
                {activeCategory === category && (
                  <motion.div
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  {t(category)}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom decorative element */}
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
      </div>
    </section>
  );
}
