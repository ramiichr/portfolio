"use client";

import { motion } from "framer-motion";

interface SocialLinkProps {
  icon: React.ElementType;
  href: string;
  label: string;
  color: string;
}

export function SocialLink({
  icon: Icon,
  href,
  label,
  color,
}: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative w-12 h-12 rounded-sm bg-gradient-to-br ${color} border border-white/50 dark:border-gray-700/50 flex items-center justify-center shadow-md cursor-pointer`}
    >
      <Icon className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-mono font-medium rounded-sm whitespace-nowrap"
      >
        {label}
      </motion.div>
    </motion.a>
  );
}
