"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Heart,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUp,
  Terminal,
  Wifi,
  Battery,
  Signal,
} from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com",
    label: "GitHub",
    command: "git --connect",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
    command: "ln --network",
  },
  {
    icon: Twitter,
    href: "https://twitter.com",
    label: "Twitter",
    command: "tw --feed",
  },
  {
    icon: Mail,
    href: "mailto:hello@example.com",
    label: "Email",
    command: "mail --send",
  },
];

const quickLinks = [
  { key: "home", href: "#home", code: "00" },
  { key: "about", href: "#about", code: "01" },
  { key: "skills", href: "#skills", code: "02" },
  { key: "projects", href: "#projects", code: "03" },
  { key: "contact", href: "#contact", code: "04" },
];

// Terminal-style social link
function TerminalSocialLink({
  icon: Icon,
  href,
  label,
  command,
  index,
}: {
  icon: React.ElementType;
  href: string;
  label: string;
  command: string;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (isHovered) {
      let i = 0;
      const interval = setInterval(() => {
        setTyped(command.slice(0, i + 1));
        i++;
        if (i >= command.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    } else {
      setTyped("");
    }
  }, [isHovered, command]);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
      aria-label={label}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-3 px-4 py-3 bg-white/80 dark:bg-gray-950/50 
          border border-gray-300 dark:border-gray-700/50 rounded-sm backdrop-blur-sm overflow-hidden shadow-sm
          hover:border-cyan-500/50 transition-colors"
      >
        {/* Scan line */}
        <motion.div
          animate={isHovered ? { y: ["-100%", "200%"] } : { y: "-100%" }}
          transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"
        />

        {/* Icon */}
        <div
          className={`relative p-2 rounded-sm border transition-colors duration-300 ${
            isHovered
              ? "border-cyan-500/50 bg-cyan-500/10"
              : "border-gray-300 dark:border-gray-600/50 bg-gray-100 dark:bg-gray-800/50"
          }`}
        >
          <Icon
            className={`w-4 h-4 transition-colors ${
              isHovered
                ? "text-cyan-600 dark:text-cyan-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          />
        </div>

        {/* Label and command */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-mono text-gray-700 dark:text-gray-200">
            {label}
          </div>
          <div className="h-4 text-xs font-mono text-cyan-600/70 dark:text-cyan-500/70 truncate">
            {isHovered ? `$ ${typed}` : "$ ..."}
            {isHovered && <span className="animate-pulse">_</span>}
          </div>
        </div>

        {/* Status indicator */}
        <div
          className={`w-2 h-2 rounded-full transition-colors ${
            isHovered ? "bg-green-500 animate-pulse" : "bg-gray-600"
          }`}
        />
      </motion.div>
    </motion.a>
  );
}

// Cyberpunk scroll to top
function CyberScrollTop() {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        className="absolute -inset-2 bg-cyan-500 rounded-lg blur-lg"
      />

      <div
        className="relative px-6 py-3 bg-white dark:bg-gray-950 border border-cyan-600 dark:border-cyan-500/50 rounded-sm shadow-sm
        flex items-center gap-3 font-mono text-sm uppercase tracking-wider overflow-hidden"
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />

        <motion.div
          animate={{ y: isHovered ? -3 : 0 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <ArrowUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
        </motion.div>
        <span className="text-cyan-600 dark:text-cyan-400">Scroll.top()</span>
      </div>
    </motion.button>
  );
}

// Animated status bar
function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-white/80 dark:bg-gray-950/80 border border-gray-300 dark:border-gray-700/50 rounded-sm font-mono text-xs shadow-sm">
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
        <Wifi className="w-3 h-3" />
        <span>ONLINE</span>
      </div>
      <div className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
      <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
        <Signal className="w-3 h-3" />
        <span>100%</span>
      </div>
      <div className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
      <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
        <Battery className="w-3 h-3" />
        <span>FULL</span>
      </div>
      <div className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
      <div className="text-gray-600 dark:text-gray-400">{time}</div>
    </div>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("navigation");

  return (
    <footer className="relative overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Cyberpunk background */}
      <div className="absolute inset-0 -z-10">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#00d4ff 1px, transparent 1px), linear-gradient(90deg, #00d4ff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 dark:from-gray-950/80 to-transparent" />

        {/* Animated horizontal lines */}
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
        />
      </div>

      {/* Top decorative border */}
      <div className="relative h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative py-16">
        {/* Main grid */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Brand section - Terminal style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="relative p-6 bg-white/80 dark:bg-gray-950/50 border border-gray-300 dark:border-gray-700/50 rounded-sm backdrop-blur-sm shadow-sm">
              {/* Terminal header */}
              <div className="flex items-center gap-2 pb-4 border-b border-gray-300 dark:border-gray-700/50 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="ml-2 text-xs font-mono text-gray-500">
                  portfolio.exe
                </span>
              </div>

              {/* Terminal content */}
              <div className="space-y-2 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-gray-500 dark:text-gray-400">$</span>
                  <span className="text-cyan-600 dark:text-cyan-400">
                    whoami
                  </span>
                </div>
                <div className="pl-6 text-gray-700 dark:text-gray-200">
                  <span className="text-purple-600 dark:text-purple-400">
                    Rami Cheikh Rouhou
                  </span>{" "}
                  - Full Stack Developer
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-gray-500 dark:text-gray-400">$</span>
                  <span className="text-cyan-600 dark:text-cyan-400">cat</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    mission.txt
                  </span>
                </div>
                <div className="pl-6 text-gray-600 dark:text-gray-500 text-xs leading-relaxed">
                  Crafting digital experiences with code and creativity.
                  Building the future, one commit at a time.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick links - File system style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                <span className="text-gray-400 dark:text-gray-500">{"//"}</span>{" "}
                Navigation
              </div>
              <div className="space-y-1">
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={link.key}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 px-3 py-2 font-mono text-sm 
                      text-gray-700 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/5
                      border-l-2 border-transparent hover:border-cyan-600 dark:hover:border-cyan-500 transition-all group"
                  >
                    <span className="text-xs text-gray-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-500">
                      [{link.code}]
                    </span>
                    <span className="uppercase tracking-wider">
                      {navT(link.key)}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                <span className="text-gray-400 dark:text-gray-500">{"//"}</span>{" "}
                Connect
              </div>
              <div className="grid grid-cols-1 gap-2">
                {socialLinks.map((link, index) => (
                  <TerminalSocialLink
                    key={link.label}
                    {...link}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-gray-700/30">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Status bar */}
            <StatusBar />

            {/* Scroll to top */}
            <CyberScrollTop />
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 flex items-center justify-center text-sm font-mono"
          >
            <div className="flex items-center gap-3 px-6 py-3 bg-white/50 dark:bg-gray-950/30 border border-gray-300 dark:border-gray-700/30 rounded-sm shadow-sm">
              <span className="text-gray-400 dark:text-gray-500">{"/*"}</span>
              <span className="text-gray-600 dark:text-gray-400">
                Designed & Built by
              </span>
              <span className="text-cyan-600 dark:text-cyan-400">
                Rami Cheikh Rouhou
              </span>
              <span className="text-gray-400 dark:text-gray-600">|</span>
              <span className="text-purple-600 dark:text-purple-400">
                {new Date().getFullYear()}
              </span>
              <span className="text-gray-400 dark:text-gray-500">{"*/"}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
