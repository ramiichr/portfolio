import { useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useCallback } from "react";

interface Use3DCardOptions {
  rotationRange?: number;
  springConfig?: {
    stiffness: number;
    damping: number;
    mass?: number;
  };
}

const defaultSpringConfig = {
  stiffness: 150,
  damping: 20,
  mass: 0.5,
};

export function use3DCard(options: Use3DCardOptions = {}) {
  const { rotationRange = 8, springConfig = defaultSpringConfig } = options;

  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [rotationRange, -rotationRange]);
  const rotateY = useTransform(x, [-100, 100], [-rotationRange, rotationRange]);

  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    },
    [x, y]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  return {
    isHovered,
    springRotateX,
    springRotateY,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}
