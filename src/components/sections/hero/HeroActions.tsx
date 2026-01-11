"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { MagneticButton } from "@/components/ui";
import {
  fadeInUp,
  createDelayedTransition,
  bounceAnimation,
  bounceTransition,
} from "./HeroContent";

interface HeroActionsProps {
  ctaText: string;
}

export function HeroActions({ ctaText }: HeroActionsProps) {
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
    </motion.div>
  );
}
