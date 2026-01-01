"use client";

import { motion } from "framer-motion";
import { LucideIcon, ArrowUpRight } from "lucide-react";
import { ScanLine, GridPattern } from "@/components/ui/TechPatterns";

export interface ContactInfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
  action: string;
}

interface ContactInfoCardProps {
  item: ContactInfoItem;
  index: number;
}

export function ContactInfoCard({ item, index }: ContactInfoCardProps) {
  const Icon = item.icon;

  return (
    <motion.a
      href={item.action}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ x: 8, scale: 1.02 }}
      className="group relative flex items-center gap-4 p-5 rounded-sm
        bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm
        border border-gray-300 dark:border-gray-700/50
        shadow-sm hover:shadow-md hover:border-cyan-500/50 
        transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <GridPattern size={8} />
      <ScanLine duration={1} intensity="medium" showOnHover />

      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className={`relative p-3 rounded-sm bg-gradient-to-br ${item.color} border border-white/50 shadow-md`}
      >
        <Icon className="w-5 h-5 text-white" />
      </motion.div>

      <div className="flex-1">
        <p className="text-xs font-mono font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {item.label}
        </p>
        <p className="font-mono font-semibold text-gray-900 dark:text-white">
          {item.value}
        </p>
      </div>

      <ArrowUpRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.a>
  );
}
