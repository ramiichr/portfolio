"use client";

import { useTranslations } from "next-intl";
import { Code2, Database, Wrench } from "lucide-react";
import { skills } from "@/constants/skills";
import {
  CategoryCard,
  SkillsBackground,
  SkillsSectionHeader,
} from "@/components/skills";

const SKILL_CATEGORIES = [
  {
    key: "frontend" as const,
    icon: <Code2 className="w-7 h-7 text-white" />,
    gradient: "from-primary-500 to-cyan-500",
    subtitle: "User interfaces & experiences",
    delay: 0,
  },
  {
    key: "backend" as const,
    icon: <Database className="w-7 h-7 text-white" />,
    gradient: "from-accent-500 to-pink-500",
    subtitle: "Server & database technologies",
    delay: 0.1,
  },
  {
    key: "tools" as const,
    icon: <Wrench className="w-7 h-7 text-white" />,
    gradient: "from-purple-500 to-indigo-500",
    subtitle: "Development & productivity",
    delay: 0.2,
  },
] as const;

export function SkillsSection() {
  const t = useTranslations("skills");

  return (
    <section
      id="skills"
      className="min-h-screen py-20 lg:py-32 relative overflow-hidden flex items-center"
    >
      <SkillsBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SkillsSectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="max-w-6xl mx-auto space-y-16">
          {SKILL_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.key}
              title={t(category.key)}
              subtitle={category.subtitle}
              icon={category.icon}
              skills={skills[category.key]}
              gradient={category.gradient}
              delay={category.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
