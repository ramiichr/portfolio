"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";
import { Code2, Database, Wrench, Zap } from "lucide-react";

const skills = {
  frontend: [
    {
      name: "React",
      icon: "⚛️",
      color: "from-cyan-400 to-blue-500",
      shadowColor: "shadow-cyan-500/30",
    },
    {
      name: "Next.js",
      icon: "▲",
      color: "from-gray-600 to-gray-900 dark:from-gray-200 dark:to-white",
      shadowColor: "shadow-gray-500/30",
    },
    {
      name: "TypeScript",
      icon: "📘",
      color: "from-blue-400 to-blue-600",
      shadowColor: "shadow-blue-500/30",
    },
    {
      name: "Tailwind",
      icon: "🎨",
      color: "from-teal-400 to-cyan-500",
      shadowColor: "shadow-teal-500/30",
    },
    {
      name: "Vue.js",
      icon: "💚",
      color: "from-emerald-400 to-green-600",
      shadowColor: "shadow-emerald-500/30",
    },
  ],
  backend: [
    {
      name: "Node.js",
      icon: "🟢",
      color: "from-green-400 to-green-600",
      shadowColor: "shadow-green-500/30",
    },
    {
      name: "Python",
      icon: "🐍",
      color: "from-yellow-400 to-yellow-600",
      shadowColor: "shadow-yellow-500/30",
    },
    {
      name: "PostgreSQL",
      icon: "🐘",
      color: "from-indigo-400 to-blue-600",
      shadowColor: "shadow-indigo-500/30",
    },
    {
      name: "MongoDB",
      icon: "🍃",
      color: "from-green-400 to-emerald-600",
      shadowColor: "shadow-green-500/30",
    },
    {
      name: "GraphQL",
      icon: "◈",
      color: "from-pink-400 to-purple-600",
      shadowColor: "shadow-pink-500/30",
    },
  ],
  tools: [
    {
      name: "Git",
      icon: "🔀",
      color: "from-orange-400 to-red-500",
      shadowColor: "shadow-orange-500/30",
    },
    {
      name: "Docker",
      icon: "🐳",
      color: "from-blue-400 to-blue-600",
      shadowColor: "shadow-blue-500/30",
    },
    {
      name: "AWS",
      icon: "☁️",
      color: "from-orange-300 to-yellow-500",
      shadowColor: "shadow-orange-500/30",
    },
    {
      name: "Figma",
      icon: "🎨",
      color: "from-purple-400 to-pink-500",
      shadowColor: "shadow-purple-500/30",
    },
    {
      name: "VS Code",
      icon: "💻",
      color: "from-blue-400 to-indigo-600",
      shadowColor: "shadow-blue-500/30",
    },
    {
      name: "Jira",
      icon: "📋",
      color: "from-blue-500 to-blue-700",
      shadowColor: "shadow-blue-500/30",
    },
  ],
};

interface SkillOrbProps {
  name: string;
  icon: string;
  color: string;
  shadowColor: string;
  index: number;
  totalInRow: number;
}

function SkillOrb({
  name,
  icon,
  color,
  shadowColor,
  index,
  totalInRow,
}: SkillOrbProps) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  // Smoother spring physics with lower stiffness and higher damping
  const springRotateX = useSpring(rotateX, {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });
  const springRotateY = useSpring(rotateY, {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.06,
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8,
      }}
      style={{ rotateX: springRotateX, rotateY: springRotateY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative perspective-1000"
    >
      {/* Outer glow ring */}
      <motion.div
        animate={{
          scale: isHovered ? 1.15 : 1,
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
        className={`absolute inset-0 bg-gradient-to-r ${color} rounded-2xl blur-xl`}
      />

      {/* Main card */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className={`relative flex flex-col items-center justify-center p-6 rounded-sm cursor-pointer
          bg-white/90 dark:bg-gray-950/80 backdrop-blur-sm
          border border-gray-300 dark:border-gray-700/50
          shadow-sm ${
            isHovered
              ? shadowColor + " border-cyan-500/50"
              : "shadow-gray-200/50 dark:shadow-gray-900/50"
          }
          transition-all duration-500 ease-out overflow-hidden`}
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

        {/* Icon container with terminal style */}
        <motion.div
          animate={{
            rotateY: isHovered ? 360 : 0,
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{
            rotateY: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
            scale: { type: "spring", stiffness: 300, damping: 20 },
          }}
          className={`relative w-16 h-16 rounded-sm bg-gradient-to-br ${color} border border-white/50 dark:border-gray-700/50 flex items-center justify-center shadow-md ${shadowColor} mb-4`}
        >
          <span className="text-3xl filter drop-shadow-lg">{icon}</span>
        </motion.div>

        {/* Skill name with monospace font */}
        <span className="relative font-mono font-bold text-gray-800 dark:text-gray-100 text-center text-xs uppercase tracking-wider">
          {name}
        </span>

        {/* Terminal-style underline */}
        <motion.div
          animate={{ width: isHovered ? "70%" : "0%" }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="h-0.5 mt-2 rounded-sm bg-cyan-600 dark:bg-cyan-400"
        />
      </motion.div>
    </motion.div>
  );
}

interface CategoryCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  skills: Array<{
    name: string;
    icon: string;
    color: string;
    shadowColor: string;
  }>;
  gradient: string;
  delay: number;
}

function CategoryCard({
  title,
  subtitle,
  icon,
  skills: categorySkills,
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
        ease: [0.25, 0.1, 0.25, 1],
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
            rotate: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
            scale: { type: "spring", stiffness: 300, damping: 20 },
          }}
          className={`relative w-14 h-14 rounded-sm bg-gradient-to-br ${gradient} border border-white/50 dark:border-gray-700/50 flex items-center justify-center shadow-lg`}
        >
          {icon}
        </motion.div>
        <div>
          <h3 className="text-2xl font-mono font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            {title}
          </h3>
          <p className="text-xs font-mono text-gray-500 dark:text-gray-400">
            {/* // */}
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
        {categorySkills.map((skill, index) => (
          <SkillOrb
            key={skill.name}
            {...skill}
            index={index}
            totalInRow={categorySkills.length}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const t = useTranslations("skills");

  return (
    <section
      id="skills"
      className="min-h-screen py-20 lg:py-32 relative overflow-hidden flex items-center"
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

        {/* Animated orbs - slow and smooth */}
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-primary-400/15 to-cyan-400/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-accent-400/15 to-pink-400/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
            scale: [1, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 relative"
        >
          {/* Decorative elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 border-2 border-dashed border-primary-300/50 dark:border-primary-700/50 rounded-full"
          />

          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white/80 dark:bg-gray-950/50 border border-cyan-500/50 dark:border-cyan-500/50 mb-6 backdrop-blur-sm"
          >
            <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Tech Stack
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
              {t("title")}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Skills categories */}
        <div className="max-w-6xl mx-auto space-y-16">
          <CategoryCard
            title={t("frontend")}
            subtitle="User interfaces & experiences"
            icon={<Code2 className="w-7 h-7 text-white" />}
            skills={skills.frontend}
            gradient="from-primary-500 to-cyan-500"
            delay={0}
          />

          <CategoryCard
            title={t("backend")}
            subtitle="Server & database technologies"
            icon={<Database className="w-7 h-7 text-white" />}
            skills={skills.backend}
            gradient="from-accent-500 to-pink-500"
            delay={0.1}
          />

          <CategoryCard
            title={t("tools")}
            subtitle="Development & productivity"
            icon={<Wrench className="w-7 h-7 text-white" />}
            skills={skills.tools}
            gradient="from-purple-500 to-indigo-500"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
