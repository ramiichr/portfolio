"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { MagneticButton } from "@/components/ui";
import {
  fadeInUp,
  createDelayedTransition,
  bounceAnimation,
  bounceTransition,
} from "./HeroContent";

interface HeroActionsProps {
  ctaText: string;
  downloadText: string;
}

export function HeroActions({ ctaText, downloadText }: HeroActionsProps) {
  return (
    <motion.div
      {...fadeInUp}
      transition={createDelayedTransition(0.4)}
      className="flex flex-col sm:flex-row items-center justify-center gap-5"
    >
      <MagneticButton href="#projects" variant="primary">
        {ctaText}
        <motion.div animate={bounceAnimation} transition={bounceTransition}>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </MagneticButton>

      <MagneticButton href="/cv.pdf" variant="secondary">
        <Download className="w-5 h-5" />
        {downloadText}
      </MagneticButton>
    </motion.div>
  );
}
