import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiVuedotjs,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiGit,
  SiDocker,
  SiAmazonwebservices,
  SiFigma,
  SiJira,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { type IconType } from "react-icons";

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

export const skills: SkillsData = {
  frontend: [
    {
      name: "React",
      icon: SiReact,
      color: "from-cyan-400 to-blue-500",
      shadowColor: "shadow-cyan-500/30",
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      color: "from-gray-600 to-gray-900 dark:from-gray-200 dark:to-white",
      shadowColor: "shadow-gray-500/30",
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      color: "from-blue-400 to-blue-600",
      shadowColor: "shadow-blue-500/30",
    },
    {
      name: "Tailwind",
      icon: SiTailwindcss,
      color: "from-teal-400 to-cyan-500",
      shadowColor: "shadow-teal-500/30",
    },
    {
      name: "Vue.js",
      icon: SiVuedotjs,
      color: "from-emerald-400 to-green-600",
      shadowColor: "shadow-emerald-500/30",
    },
  ],
  backend: [
    {
      name: "Node.js",
      icon: SiNodedotjs,
      color: "from-green-400 to-green-600",
      shadowColor: "shadow-green-500/30",
    },
    {
      name: "Python",
      icon: SiPython,
      color: "from-yellow-400 to-yellow-600",
      shadowColor: "shadow-yellow-500/30",
    },
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
      color: "from-indigo-400 to-blue-600",
      shadowColor: "shadow-indigo-500/30",
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
      color: "from-green-400 to-emerald-600",
      shadowColor: "shadow-green-500/30",
    },
    {
      name: "GraphQL",
      icon: SiGraphql,
      color: "from-pink-400 to-purple-600",
      shadowColor: "shadow-pink-500/30",
    },
  ],
  tools: [
    {
      name: "Git",
      icon: SiGit,
      color: "from-orange-400 to-red-500",
      shadowColor: "shadow-orange-500/30",
    },
    {
      name: "Docker",
      icon: SiDocker,
      color: "from-blue-400 to-blue-600",
      shadowColor: "shadow-blue-500/30",
    },
    {
      name: "AWS",
      icon: SiAmazonwebservices,
      color: "from-orange-300 to-yellow-500",
      shadowColor: "shadow-orange-500/30",
    },
    {
      name: "Figma",
      icon: SiFigma,
      color: "from-purple-400 to-pink-500",
      shadowColor: "shadow-purple-500/30",
    },
    {
      name: "VS Code",
      icon: VscCode,
      color: "from-blue-400 to-indigo-600",
      shadowColor: "shadow-blue-500/30",
    },
    {
      name: "Jira",
      icon: SiJira,
      color: "from-blue-500 to-blue-700",
      shadowColor: "shadow-blue-500/30",
    },
  ],
};
