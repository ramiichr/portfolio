"use client";

import { motion } from "framer-motion";
import { Calendar, LucideIcon } from "lucide-react";
import { Card3D } from "@/components/ui";

interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
}

interface TimelineCardProps {
  icon: LucideIcon;
  title: string;
  tagline: string;
  items: TimelineItem[];
  color: "cyan" | "green";
  showCurrentBadge?: boolean;
}

const colorConfig = {
  cyan: {
    iconBg: "bg-cyan-600 dark:bg-cyan-500",
    iconBorder: "border-cyan-500 dark:border-cyan-400",
    iconShadow: "shadow-cyan-500/40",
    tagline: "text-cyan-600 dark:text-cyan-400",
    hoverBorder: "hover:border-cyan-500/50",
    timelineDot: "border-cyan-500 shadow-cyan-500/30",
    timelineLine:
      "from-cyan-500 to-cyan-500/20 dark:from-cyan-400 dark:to-cyan-600/20",
    subtitle: "text-cyan-600 dark:text-cyan-400",
    scanLine: "via-cyan-500/10",
    gridColor: "cyan",
  },
  green: {
    iconBg: "bg-green-600 dark:bg-green-500",
    iconBorder: "border-green-500 dark:border-green-400",
    iconShadow: "shadow-green-500/40",
    tagline: "text-green-600 dark:text-green-400",
    hoverBorder: "hover:border-green-500/50",
    timelineDot: "border-green-500 shadow-green-500/30",
    timelineLine:
      "from-green-500 to-green-500/20 dark:from-green-400 dark:to-green-600/20",
    subtitle: "text-green-600 dark:text-green-400",
    scanLine: "via-green-500/10",
    gridColor: "green",
  },
};

export function TimelineCard({
  icon: Icon,
  title,
  tagline,
  items,
  color,
  showCurrentBadge = false,
}: TimelineCardProps) {
  const config = colorConfig[color];

  return (
    <Card3D>
      <div
        className={`relative p-6 rounded-sm bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700/50 shadow-sm ${config.hoverBorder} transition-all duration-500 overflow-hidden`}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(${config.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${config.gridColor} 1px, transparent 1px)`,
            backgroundSize: "10px 10px",
          }}
        />

        {/* Scan line effect */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inset-x-0 h-8 bg-gradient-to-b from-transparent ${config.scanLine} to-transparent`}
        />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <div
                className={`w-14 h-14 rounded-sm ${config.iconBg} border ${config.iconBorder} flex items-center justify-center shadow-lg ${config.iconShadow}`}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>
            </motion.div>
            <div>
              <h3 className="text-xl font-mono font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                {title}
              </h3>
              <p className={`text-xs font-mono ${config.tagline}`}>{tagline}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {items.map((item, index) => (
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
                {index !== items.length - 1 && (
                  <div
                    className={`absolute left-[9px] top-5 bottom-0 w-0.5 bg-gradient-to-b ${config.timelineLine}`}
                  />
                )}

                {/* Timeline dot */}
                <div className="absolute left-0 top-2">
                  <div
                    className={`w-5 h-5 rounded-full bg-white dark:bg-gray-950 border-[3px] ${config.timelineDot} shadow-lg`}
                  />
                  {showCurrentBadge && index === 0 && (
                    <div
                      className={`absolute inset-0 w-5 h-5 rounded-full bg-${color}-500 animate-ping opacity-30`}
                    />
                  )}
                </div>

                <div
                  className={`bg-white/80 dark:bg-gray-800/80 rounded-sm p-4 border border-gray-300 dark:border-gray-700/50 shadow-sm hover:shadow-md ${config.hoverBorder} transition-all duration-300`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-mono font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    {showCurrentBadge && index === 0 && (
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-${color}-500 text-white rounded-sm`}
                      >
                        Current
                      </span>
                    )}
                  </div>
                  <p
                    className={`${config.subtitle} text-sm font-mono font-medium`}
                  >
                    {item.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Card3D>
  );
}
