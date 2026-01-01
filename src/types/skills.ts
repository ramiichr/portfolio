import type { IconType } from "react-icons";

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
  shadowColor: string;
}

export interface SkillsData {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
}

export interface SkillOrbProps extends Skill {
  index: number;
}

export interface CategoryCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  skills: Skill[];
  gradient: string;
  delay: number;
}
