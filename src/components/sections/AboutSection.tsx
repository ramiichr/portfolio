"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Sparkles } from "lucide-react";
import { AnimatedBackground, SectionHeader } from "@/components/ui";
import { ProfileImage, DescriptionCard, TimelineCard } from "./about";

// Animation variants for reuse
const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
};

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
};

const slideInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export function AboutSection() {
  const t = useTranslations("about");

  // Transform education data for TimelineCard
  const educationItems = (
    t.raw("education") as Array<{
      degree: string;
      school: string;
      period: string;
      location?: string;
    }>
  ).map((edu) => ({
    title: edu.degree,
    subtitle: edu.school,
    period: edu.period,
    location: edu.location,
  }));

  // Transform experience data for TimelineCard
  const experienceItems = (
    t.raw("experience") as Array<{
      position: string;
      company: string;
      period: string;
      location?: string;
    }>
  ).map((exp) => ({
    title: exp.position,
    subtitle: exp.company,
    period: exp.period,
    location: exp.location,
  }));

  return (
    <section
      id="about"
      className="min-h-screen py-20 lg:py-32 relative overflow-hidden flex items-center"
    >
      <AnimatedBackground showParticles particleCount={15} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={Sparkles}
          badge="Get to know me"
          title={t("title")}
          subtitle={t("subtitle")}
        />

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Image side - 5 columns */}
          <motion.div {...slideInLeft} className="lg:col-span-5 relative">
            <ProfileImage
              name="Rami Cheikh Rouhou"
              location="San Francisco, CA"
              imageSrc="/images/profile.jpg"
            />
          </motion.div>

          {/* Content side - 7 columns */}
          <motion.div {...slideInRight} className="lg:col-span-7 space-y-8">
            <DescriptionCard>{t("description")}</DescriptionCard>

            {/* Education & Experience Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div {...slideInUp(0.1)} className="group">
                <TimelineCard
                  icon={Briefcase}
                  title={t("experienceTitle")}
                  tagline="// Professional Path"
                  items={experienceItems}
                  color="green"
                  showCurrentBadge
                />
              </motion.div>

              <motion.div {...slideInUp(0)} className="group">
                <TimelineCard
                  icon={GraduationCap}
                  title={t("educationTitle")}
                  tagline="// Academic Journey"
                  items={educationItems}
                  color="cyan"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
