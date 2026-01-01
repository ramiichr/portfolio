import type { SpringOptions, Transition } from "framer-motion";

// Spring configurations for consistent animations
export const springConfigs = {
  smooth: {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  } satisfies SpringOptions,

  bouncy: {
    stiffness: 300,
    damping: 20,
  } satisfies SpringOptions,

  gentle: {
    stiffness: 100,
    damping: 15,
    mass: 0.8,
  } satisfies SpringOptions,

  snappy: {
    stiffness: 200,
    damping: 25,
  } satisfies SpringOptions,
} as const;

// Transition presets
export const transitionPresets = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },

  fadeInScale: {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
  },

  slideInLeft: {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },
} as const;

// Duration presets for infinite animations
export const infiniteAnimationDurations = {
  slow: 25,
  medium: 20,
  fast: 8,
} as const;

// Easing functions
export const easings = {
  smooth: [0.25, 0.1, 0.25, 1],
  snappy: [0.4, 0, 0.2, 1],
} as const;

// Stagger delay multiplier
export const staggerDelay = 0.06;
