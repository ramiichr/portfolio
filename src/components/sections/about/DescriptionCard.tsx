"use client";

import { motion } from "framer-motion";
import { Card3D } from "@/components/ui";

interface DescriptionCardProps {
  children: React.ReactNode;
}

export function DescriptionCard({ children }: DescriptionCardProps) {
  return (
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

        {/* Terminal-style quote indicators */}
        <div className="absolute top-4 left-6 text-4xl font-mono text-cyan-600/20 dark:text-cyan-400/20">
          {"//"}
        </div>
        <div className="absolute bottom-4 right-6 text-4xl font-mono text-cyan-600/20 dark:text-cyan-400/20">
          {"//"}
        </div>

        <p className="relative text-gray-700 dark:text-gray-200 leading-relaxed text-lg lg:text-xl pl-8 pr-4 font-mono">
          {children}
        </p>
      </motion.div>
    </Card3D>
  );
}
