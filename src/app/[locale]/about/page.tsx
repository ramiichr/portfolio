"use client";

import { useEffect } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function AboutPage() {
  useEffect(() => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "instant" });
    }
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
