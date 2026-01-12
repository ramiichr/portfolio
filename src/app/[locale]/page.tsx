import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";

// Dynamic imports for below-the-fold sections to reduce initial bundle size
const AboutSection = dynamic(
  () =>
    import("@/components/sections/AboutSection").then(
      (mod) => mod.AboutSection
    ),
  {
    loading: () => (
      <section className="min-h-screen py-20 lg:py-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </section>
    ),
    ssr: true,
  }
);

const SkillsSection = dynamic(
  () =>
    import("@/components/sections/SkillsSection").then(
      (mod) => mod.SkillsSection
    ),
  {
    loading: () => (
      <section className="min-h-screen py-20 lg:py-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </section>
    ),
    ssr: true,
  }
);

const ProjectsSection = dynamic(
  () =>
    import("@/components/sections/ProjectsSection").then(
      (mod) => mod.ProjectsSection
    ),
  {
    loading: () => (
      <section className="min-h-screen py-20 lg:py-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </section>
    ),
    ssr: true,
  }
);

const ContactSection = dynamic(
  () =>
    import("@/components/sections/ContactSection").then(
      (mod) => mod.ContactSection
    ),
  {
    loading: () => (
      <section className="min-h-screen py-20 lg:py-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </section>
    ),
    ssr: true,
  }
);

export default function HomePage() {
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
