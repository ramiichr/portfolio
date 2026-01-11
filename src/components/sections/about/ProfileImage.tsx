"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { Card3D } from "@/components/ui";

interface ProfileImageProps {
  name: string;
  location: string;
  imageSrc: string;
}

export function ProfileImage({ name, location, imageSrc }: ProfileImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card3D className="relative max-w-md mx-auto">
      <div
        className="relative aspect-[3/4] group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Outer glow */}
        <motion.div
          animate={{ opacity: isHovered ? 0.8 : 0.5 }}
          transition={{ duration: 0.4 }}
          className="absolute -inset-4 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-[2rem] blur-2xl opacity-50 bg-[length:200%_100%] animate-gradient-x"
        />

        {/* Decorative frame corners */}
        <FrameCorners isHovered={isHovered} />

        {/* Main image container */}
        <div className="relative h-full rounded-2xl overflow-hidden border-2 border-white/80 dark:border-gray-700/80 shadow-2xl">
          <Image
            src={imageSrc}
            alt="Profile photo"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-[center_10%] transition-all duration-700 ease-out group-hover:scale-110"
            priority
          />

          {/* Hover overlay effects */}
          <motion.div
            animate={{ opacity: isHovered ? 0.2 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />

          {/* Shimmer effect on hover */}
          <motion.div
            animate={{ x: isHovered ? ["-100%", "200%"] : "-100%" }}
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
                <p className="text-white font-bold text-xl">{name}</p>
                <div className="flex items-center gap-1.5 text-white/80 text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{location}</span>
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
  );
}

function FrameCorners({ isHovered }: { isHovered: boolean }) {
  const corners = [
    {
      position: "top-0 left-0",
      border: "border-t-4 border-l-4 border-primary-500 rounded-tl-xl",
    },
    {
      position: "top-0 right-0",
      border: "border-t-4 border-r-4 border-accent-500 rounded-tr-xl",
    },
    {
      position: "bottom-0 left-0",
      border: "border-b-4 border-l-4 border-accent-500 rounded-bl-xl",
    },
    {
      position: "bottom-0 right-0",
      border: "border-b-4 border-r-4 border-primary-500 rounded-br-xl",
    },
  ];

  return (
    <div className="absolute -inset-2 z-10 pointer-events-none">
      {corners.map((corner, index) => (
        <motion.div
          key={index}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          className={`absolute ${corner.position} w-8 h-8 ${corner.border}`}
        />
      ))}
    </div>
  );
}
