"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";
import {
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

// Interactive 3D card component
function Card3D({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

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
  };

  return (
    <motion.div
      style={{ rotateX: springRotateX, rotateY: springRotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function AboutSection() {
  const t = useTranslations("about");
  const [imageHovered, setImageHovered] = useState(false);

  const education = [
    {
      degree: t("education.degree1"),
      school: t("education.school1"),
      period: t("education.period1"),
    },
    {
      degree: t("education.degree2"),
      school: t("education.school2"),
      period: t("education.period2"),
    },
  ];

  const experience = [
    {
      position: t("experience.position1"),
      company: t("experience.company1"),
      period: t("experience.period1"),
    },
    {
      position: t("experience.position2"),
      company: t("experience.company2"),
      period: t("experience.period2"),
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen py-20 lg:py-32 relative overflow-hidden flex items-center"
    >
      {/* Animated mesh background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-br from-primary-400/20 to-cyan-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gradient-to-br from-accent-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"
        />

        {/* Floating decorative particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-1.5 h-1.5 bg-primary-400/40 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with decorative elements */}
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
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Get to know me
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

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Image side - 5 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <Card3D className="relative max-w-md mx-auto">
              <div
                className="relative aspect-[3/4] group"
                onMouseEnter={() => setImageHovered(true)}
                onMouseLeave={() => setImageHovered(false)}
              >
                {/* Outer glow */}
                <motion.div
                  animate={{ opacity: imageHovered ? 0.8 : 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -inset-4 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-[2rem] blur-2xl opacity-50 bg-[length:200%_100%] animate-gradient-x"
                />

                {/* Decorative frame corners */}
                <div className="absolute -inset-2 z-10 pointer-events-none">
                  <motion.div
                    animate={{ opacity: imageHovered ? 1 : 0.7 }}
                    className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-500 rounded-tl-xl"
                  />
                  <motion.div
                    animate={{ opacity: imageHovered ? 1 : 0.7 }}
                    className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent-500 rounded-tr-xl"
                  />
                  <motion.div
                    animate={{ opacity: imageHovered ? 1 : 0.7 }}
                    className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent-500 rounded-bl-xl"
                  />
                  <motion.div
                    animate={{ opacity: imageHovered ? 1 : 0.7 }}
                    className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-500 rounded-br-xl"
                  />
                </div>

                {/* Main image container */}
                <div className="relative h-full rounded-2xl overflow-hidden border-2 border-white/80 dark:border-gray-700/80 shadow-2xl">
                  <Image
                    src="/images/profile.jpg"
                    alt="Profile photo"
                    fill
                    className="object-cover object-[center_10%] transition-all duration-700 ease-out group-hover:scale-110"
                    priority
                  />

                  {/* Hover overlay effects */}
                  <motion.div
                    animate={{ opacity: imageHovered ? 0.2 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />

                  {/* Shimmer effect on hover */}
                  <motion.div
                    animate={{ x: imageHovered ? ["-100%", "200%"] : "-100%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />

                  {/* Bottom info card */}
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.4,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    className="absolute bottom-0 left-0 right-0 p-5 backdrop-blur-md bg-white/10 dark:bg-black/30 border-t border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-bold text-xl">
                          Rami Cheikh Rouhou
                        </p>
                        <div className="flex items-center gap-1.5 text-white/80 text-sm">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>San Francisco, CA</span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card3D>
          </motion.div>

          {/* Content side - 7 columns */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Description card with glassmorphism */}
            <Card3D>
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative p-8 rounded-sm bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700/50 shadow-sm overflow-hidden"
              >
                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#00d4ff 1px, transparent 1px), linear-gradient(90deg, #00d4ff 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Scan line */}
                <motion.div
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"
                />

                {/* Terminal-style quote indicator */}
                <div className="absolute top-4 left-6 text-4xl font-mono text-cyan-600/20 dark:text-cyan-400/20">
                  {"//"}
                </div>

                <p className="relative text-gray-700 dark:text-gray-200 leading-relaxed text-lg lg:text-xl pl-8 pr-4 font-mono">
                  {t("description")}
                </p>

                <div className="absolute bottom-4 right-6 text-4xl font-mono text-cyan-600/20 dark:text-cyan-400/20">
                  {"//"}
                </div>
              </motion.div>
            </Card3D>

            {/* Education & Experience Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Education Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <Card3D>
                  <div className="relative p-6 rounded-sm bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700/50 shadow-sm hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
                    {/* Grid pattern */}
                    <div
                      className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
                      style={{
                        backgroundImage:
                          "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
                        backgroundSize: "10px 10px",
                      }}
                    />

                    {/* Scan line effect */}
                    <motion.div
                      animate={{ y: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"
                    />

                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                          className="relative"
                        >
                          <div className="w-14 h-14 rounded-sm bg-cyan-600 dark:bg-cyan-500 border border-cyan-500 dark:border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/40">
                            <GraduationCap className="w-7 h-7 text-white" />
                          </div>
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-mono font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                            {t("educationTitle")}
                          </h3>
                          <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                            {"// Academic Journey"}
                          </p>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-4">
                        {education.map((edu, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.4 }}
                            whileHover={{ x: 5 }}
                            className="relative pl-6"
                          >
                            {/* Timeline line */}
                            {index !== education.length - 1 && (
                              <div className="absolute left-[9px] top-5 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-cyan-500/20 dark:from-cyan-400 dark:to-cyan-600/20" />
                            )}
                            {/* Timeline dot with glow */}
                            <div className="absolute left-0 top-2">
                              <div className="w-5 h-5 rounded-full bg-white dark:bg-gray-950 border-[3px] border-cyan-500 shadow-lg shadow-cyan-500/30" />
                            </div>

                            <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm p-4 border border-gray-300 dark:border-gray-700/50 shadow-sm hover:shadow-md hover:border-cyan-500/50 transition-all duration-300">
                              <h4 className="font-mono font-bold text-gray-900 dark:text-white">
                                {edu.degree}
                              </h4>
                              <p className="text-cyan-600 dark:text-cyan-400 text-sm font-mono font-medium">
                                {edu.school}
                              </p>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono">
                                <Calendar className="w-3.5 h-3.5" />
                                {edu.period}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>

              {/* Experience Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="group"
              >
                <Card3D>
                  <div className="relative p-6 rounded-sm bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700/50 shadow-sm hover:border-green-500/50 transition-all duration-500 overflow-hidden">
                    {/* Grid pattern */}
                    <div
                      className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
                      style={{
                        backgroundImage:
                          "linear-gradient(green 1px, transparent 1px), linear-gradient(90deg, green 1px, transparent 1px)",
                        backgroundSize: "10px 10px",
                      }}
                    />

                    {/* Scan line effect */}
                    <motion.div
                      animate={{ y: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-green-500/10 to-transparent"
                    />

                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                          className="relative"
                        >
                          <div className="w-14 h-14 rounded-sm bg-green-600 dark:bg-green-500 border border-green-500 dark:border-green-400 flex items-center justify-center shadow-lg shadow-green-500/40">
                            <Briefcase className="w-7 h-7 text-white" />
                          </div>
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-mono font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                            {t("experienceTitle")}
                          </h3>
                          <p className="text-xs font-mono text-green-600 dark:text-green-400">
                            {"// Professional Path"}
                          </p>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-4">
                        {experience.map((exp, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.4 }}
                            whileHover={{ x: 5 }}
                            className="relative pl-6"
                          >
                            {/* Timeline line */}
                            {index !== experience.length - 1 && (
                              <div className="absolute left-[9px] top-5 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-green-500/20 dark:from-green-400 dark:to-green-600/20" />
                            )}
                            {/* Timeline dot with pulse for current */}
                            <div className="absolute left-0 top-2">
                              <div className="w-5 h-5 rounded-full bg-white dark:bg-gray-950 border-[3px] border-green-500 shadow-lg shadow-green-500/30" />
                              {index === 0 && (
                                <div className="absolute inset-0 w-5 h-5 rounded-full bg-green-500 animate-ping opacity-30" />
                              )}
                            </div>

                            <div className="bg-white/80 dark:bg-gray-800/80 rounded-sm p-4 border border-gray-300 dark:border-gray-700/50 shadow-sm hover:shadow-md hover:border-green-500/50 transition-all duration-300">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-mono font-bold text-gray-900 dark:text-white">
                                  {exp.position}
                                </h4>
                                {index === 0 && (
                                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-green-500 text-white rounded-sm">
                                    Current
                                  </span>
                                )}
                              </div>
                              <p className="text-green-600 dark:text-green-400 text-sm font-mono font-medium">
                                {exp.company}
                              </p>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono">
                                <Calendar className="w-3.5 h-3.5" />
                                {exp.period}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
