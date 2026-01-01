"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";
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

function useMouseParallax() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

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
          <HeroActions ctaText={t("cta")} downloadText={t("downloadCV")} />
          <TechStack className="mt-16" />
        </div>

        <ScrollIndicator />
      </div>
    </section>
  );
}
