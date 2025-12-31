"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

// Animated text that types out
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, started]);

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[3px] h-[1em] bg-primary-500 ml-1 align-middle"
        />
      )}
    </span>
  );
}

// Interactive magnetic button
function MagneticButton({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (variant === "primary") {
    return (
      <motion.a
        href={href}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative px-8 py-4 rounded-sm overflow-hidden"
      >
        {/* Terminal-style background */}
        <div className="absolute inset-0 bg-cyan-600 dark:bg-cyan-500" />

        {/* Glow effect */}
        <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />

        {/* Scan line effect */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent"
        />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2 text-white font-mono font-semibold uppercase tracking-wider">
          {children}
        </span>
      </motion.a>
    );
  }

  return (
    <motion.a
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative px-8 py-4 rounded-sm bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm
        border border-gray-300 dark:border-gray-700/50
        hover:border-cyan-500/50 dark:hover:border-cyan-500/50
        shadow-lg hover:shadow-xl transition-all duration-300
        text-gray-800 dark:text-gray-200 font-mono font-semibold uppercase tracking-wider
        flex items-center gap-2 overflow-hidden"
    >
      {/* Scan line on hover */}
      <motion.div
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

// Animated particle
function Particle({ delay }: { delay: number }) {
  const randomX = Math.random() * 100;
  const randomDuration = 15 + Math.random() * 10;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: "100vh",
        x: `${randomX}vw`,
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: "-10vh",
      }}
      transition={{
        delay,
        duration: randomDuration,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute w-1 h-1 bg-primary-400/60 rounded-full"
    />
  );
}

export function HeroSection() {
  const t = useTranslations("hero");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

        {/* Parallax animated orbs */}
        <motion.div
          animate={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary-400/30 to-cyan-400/30 dark:from-primary-600/20 dark:to-cyan-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              x: [0, -40, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-accent-400/30 to-pink-400/30 dark:from-accent-600/20 dark:to-pink-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 30, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-gradient-to-br from-purple-400/20 to-indigo-400/20 dark:from-purple-600/15 dark:to-indigo-600/15 rounded-full blur-3xl"
          />
        </motion.div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <Particle key={i} delay={i * 0.5} />
        ))}

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/50 dark:to-gray-950/50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Greeting badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm 
              bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm
              border border-cyan-500/50 dark:border-cyan-500/50 
              shadow-sm
              mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </motion.div>
            <span className="text-sm font-mono font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              {t("greeting")}
            </span>
          </motion.div>

          {/* Name with 3D text effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold mb-6 relative"
          >
            {/* Shadow text for 3D effect */}
            <span className="absolute inset-0 text-primary-200/20 dark:text-primary-800/20 blur-sm translate-x-1 translate-y-1">
              {t("name")}
            </span>
            <span className="relative bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              {t("name")}
            </span>
          </motion.h1>

          {/* Animated title with typewriter effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 h-12 sm:h-14"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
                <TypewriterText text={t("title")} delay={800} />
              </span>
            </h2>
          </motion.div>

          {/* Subtitle with staggered word animation */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTA Buttons with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <MagneticButton href="#projects" variant="primary">
              {t("cta")}
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            </MagneticButton>

            <MagneticButton href="/cv.pdf" variant="secondary">
              <Download className="w-5 h-5" />
              {t("downloadCV")}
            </MagneticButton>
          </motion.div>

          {/* Tech stack badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-3"
          >
            {["React", "Next.js", "TypeScript", "Tailwind"].map(
              (tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-sm text-xs font-mono font-medium uppercase tracking-wider
                  bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm
                  border border-gray-300 dark:border-gray-700/50
                  text-gray-700 dark:text-gray-300 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400
                  shadow-sm hover:shadow-md transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              )
            )}
          </motion.div>
        </div>

        {/* Enhanced scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              Scroll
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-start justify-center p-1.5">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
