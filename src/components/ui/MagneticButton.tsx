"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}

export function MagneticButton({
  children,
  href,
  variant = "primary",
}: MagneticButtonProps) {
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
