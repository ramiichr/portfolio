"use client";

import { motion } from "framer-motion";

const scrollAnimation = {
  y: [0, 8, 0],
};

const dotAnimation = {
  y: [0, 12, 0],
  opacity: [1, 0.5, 1],
};

const defaultTransition = {
  duration: 2,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={scrollAnimation}
        transition={defaultTransition}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-start justify-center p-1.5">
          <motion.div
            animate={dotAnimation}
            transition={defaultTransition}
            className="w-1.5 h-1.5 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
