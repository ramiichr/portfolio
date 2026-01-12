"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  HeroBackground,
  TechStack,
  ScrollIndicator,
  GreetingBadge,
  HeroTitle,
  HeroSubtitle,
  HeroDescription,
} from "./hero";
import { HeroActions } from "./hero/HeroActions";
import { useIsMobile } from "@/hooks/useMediaQuery";

function useMouseParallax() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const rafRef = useRef<number | null>(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Store the latest position
    lastPositionRef.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    };

    // Throttle using requestAnimationFrame
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition(lastPositionRef.current);
        rafRef.current = null;
      });
    }
  }, []);

  useEffect(() => {
    // Disable parallax on mobile to save battery and improve performance
    if (isMobile) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, isMobile]);

  return mousePosition;
}

export function HeroSection() {
  const t = useTranslations("hero");
  const mousePosition = useMouseParallax();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroBackground mousePosition={mousePosition} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <GreetingBadge text={t("greeting")} />
          <HeroTitle name={t("name")} />
          <HeroSubtitle title={t("title")} />
          <HeroDescription text={t("subtitle")} />
          <HeroActions ctaText={t("cta")} />
          <TechStack className="mt-16" />
        </div>

        <ScrollIndicator />
      </div>
    </section>
  );
}
