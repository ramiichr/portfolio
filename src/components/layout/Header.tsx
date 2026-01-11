"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Menu, X, Zap, ChevronRight } from "lucide-react";

const navItems = [
  { key: "home", href: "#home", sectionId: "home" },
  { key: "about", href: "#about", sectionId: "about" },
  { key: "skills", href: "#skills", sectionId: "skills" },
  { key: "projects", href: "#projects", sectionId: "projects" },
  { key: "contact", href: "#contact", sectionId: "contact" },
];

// Neon text with glow effect
function NeonText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 blur-sm opacity-70">{children}</span>
    </span>
  );
}

// Cyberpunk nav link with scan line effect
function CyberNavLink({
  href,
  sectionId,
  children,
  isActive,
  onClick,
}: {
  href: string;
  sectionId: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update URL without page reload
      window.history.pushState(
        null,
        "",
        `/${sectionId === "home" ? "" : sectionId}`
      );
    }
    onClick?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative px-4 py-2 group cursor-pointer"
    >
      {/* Background with clip path */}
      <motion.div
        initial={false}
        animate={{
          opacity: isActive || isHovered ? 1 : 0,
          scaleX: isActive || isHovered ? 1 : 0.8,
        }}
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 
          border border-cyan-500/50 dark:border-cyan-400/50"
        style={{ clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)" }}
      />

      {/* Scan line effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ top: 0, opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
        )}
      </AnimatePresence>

      {/* Text */}
      <span
        className={`relative z-10 text-sm font-mono uppercase tracking-wider transition-colors duration-300 ${
          isActive
            ? "text-cyan-600 dark:text-cyan-300"
            : "text-gray-700 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
        }`}
      >
        {isActive && (
          <span className="mr-1 text-cyan-600 dark:text-cyan-400">&gt;</span>
        )}
        {children}
      </span>

      {/* Corner accents */}
      {isActive && (
        <>
          <span className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyan-400" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-cyan-400" />
        </>
      )}
    </a>
  );
}

// Cyberpunk logo
function CyberLogo() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Link href="/" className="relative flex items-center gap-3 group">
      {/* Logo container with neon border */}
      <motion.div whileHover={{ scale: 1.05 }} className="relative">
        {/* Outer glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-40 group-hover:opacity-70 transition-opacity" />

        {/* Logo box */}
        <div className="relative w-10 h-10 bg-gray-900 dark:bg-gray-950 rounded-lg border border-cyan-500/50 flex items-center justify-center overflow-hidden">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
              backgroundSize: "4px 4px",
            }}
          />

          {/* Icon */}
          <Zap className="w-5 h-5 text-cyan-400 relative z-10" />

          {/* Animated pulse */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-cyan-500/20 rounded-lg"
          />
        </div>
      </motion.div>

      {/* Text with glitch effect */}
      <div className="relative">
        <motion.span
          animate={glitch ? { x: [-2, 2, -1, 1, 0] } : {}}
          transition={{ duration: 0.15 }}
          className="text-xl font-mono font-bold text-gray-900 dark:text-white relative"
        >
          <NeonText className="text-cyan-600 dark:text-cyan-400">PORT</NeonText>
          <NeonText className="text-purple-600 dark:text-purple-400">
            FOLIO
          </NeonText>
        </motion.span>

        {/* Glitch layers */}
        {glitch && (
          <>
            <span className="absolute top-0 left-0 text-xl font-mono font-bold text-red-500/50 -translate-x-0.5 translate-y-0.5 clip-glitch">
              PORTFOLIO
            </span>
            <span className="absolute top-0 left-0 text-xl font-mono font-bold text-blue-500/50 translate-x-0.5 -translate-y-0.5 clip-glitch">
              PORTFOLIO
            </span>
          </>
        )}

        {/* Underline */}
        <motion.div
          className="h-px bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 mt-0.5"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ backgroundSize: "200% 100%" }}
        />
      </div>
    </Link>
  );
}

export function Header() {
  const t = useTranslations("navigation");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section based on scroll position
      const sections = navItems.map((item) => item.sectionId);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
    >
      {/* Cyberpunk background */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 dark:bg-gray-950/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        {/* Bottom border with neon glow */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        />

        {/* Animated scan line */}
        {isScrolled && (
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 h-px w-20 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          />
        )}
      </div>

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <CyberLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Nav container with border */}
            <div className="relative flex items-center border border-gray-200/50 dark:border-gray-800/50 rounded-sm px-2 py-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              {/* Corner decorations */}
              <span className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-500/50" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-purple-500/50" />

              {navItems.map((item) => (
                <CyberNavLink
                  key={item.key}
                  href={item.href}
                  sectionId={item.sectionId}
                  isActive={activeSection === item.key}
                >
                  {t(item.key)}
                </CyberNavLink>
              ))}
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Control panel style container */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 border border-gray-200/50 dark:border-gray-800/50 rounded-sm bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <LanguageSwitcher />
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-700" />
              <ThemeSwitcher />
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative p-2 border border-cyan-500/50 rounded-sm bg-gray-900/50 dark:bg-gray-950/50"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Outside nav for proper positioning */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-950 border-b border-cyan-500/30 shadow-lg"
          >
            <div className="relative py-4 container mx-auto px-4 sm:px-6 lg:px-8">
              {/* Grid background */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        const element = document.getElementById(item.sectionId);
                        if (element) {
                          setTimeout(() => {
                            element.scrollIntoView({ behavior: "smooth" });
                            window.history.pushState(
                              null,
                              "",
                              `/${
                                item.sectionId === "home" ? "" : item.sectionId
                              }`
                            );
                          }, 300);
                        }
                      }}
                      className={`flex items-center gap-3 px-4 py-3 font-mono uppercase text-sm tracking-wider transition-colors ${
                        activeSection === item.key
                          ? "text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400"
                          : "text-gray-600 dark:text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/5"
                      }`}
                    >
                      <ChevronRight
                        className={`w-4 h-4 ${
                          activeSection === item.key
                            ? "text-cyan-400"
                            : "text-gray-400"
                        }`}
                      />
                      {t(item.key)}
                      {activeSection === item.key && (
                        <span className="ml-auto text-xs text-cyan-500">
                          [ACTIVE]
                        </span>
                      )}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Mobile controls */}
              <div className="flex items-center gap-4 mt-4 pt-4 px-4 border-t border-gray-200/50 dark:border-gray-800/50">
                <span className="text-xs font-mono text-gray-500 uppercase">
                  SYS:
                </span>
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
