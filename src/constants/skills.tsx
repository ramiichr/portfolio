import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSass,
  SiNodedotjs,
  SiPython,
  SiPhp,
  SiMysql,
  SiGit,
  SiDocker,
  SiGithub,
  SiFigma,
  SiJira,
  SiBitbucket,
  SiBootstrap,
  SiMui,
  SiHtml5,
} from "react-icons/si";
import { VscAzureDevops } from "react-icons/vsc";
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
      name: "SASS/SCSS",
      icon: SiSass,
      color: "from-pink-400 to-pink-600",
      shadowColor: "shadow-pink-500/30",
    },
    {
      name: "Bootstrap",
      icon: SiBootstrap,
      color: "from-purple-500 to-purple-700",
      shadowColor: "shadow-purple-500/30",
    },
    {
      name: "Material UI",
      icon: SiMui,
      color: "from-blue-400 to-blue-600",
      shadowColor: "shadow-blue-500/30",
    },
    {
      name: "HTML5",
      icon: SiHtml5,
      color: "from-orange-400 to-orange-600",
      shadowColor: "shadow-orange-500/30",
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
      color: "from-yellow-400 to-blue-500",
      shadowColor: "shadow-yellow-500/30",
    },
    {
      name: "PHP",
      icon: SiPhp,
      color: "from-indigo-400 to-purple-600",
      shadowColor: "shadow-indigo-500/30",
    },
    {
      name: "MySQL",
      icon: SiMysql,
      color: "from-blue-400 to-orange-500",
      shadowColor: "shadow-blue-500/30",
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
      name: "GitHub",
      icon: SiGithub,
      color: "from-gray-600 to-gray-900 dark:from-gray-200 dark:to-white",
      shadowColor: "shadow-gray-500/30",
    },
    {
      name: "Docker",
      icon: SiDocker,
      color: "from-blue-400 to-blue-600",
      shadowColor: "shadow-blue-500/30",
    },
    {
      name: "Azure DevOps",
      icon: VscAzureDevops,
      color: "from-blue-500 to-blue-700",
      shadowColor: "shadow-blue-500/30",
    },
    {
      name: "Bitbucket",
      icon: SiBitbucket,
      color: "from-blue-500 to-blue-700",
      shadowColor: "shadow-blue-500/30",
    },
    {
      name: "Jira",
      icon: SiJira,
      color: "from-blue-500 to-blue-700",
      shadowColor: "shadow-blue-500/30",
    },
    {
      name: "Figma",
      icon: SiFigma,
      color: "from-purple-400 to-pink-500",
      shadowColor: "shadow-purple-500/30",
    },
  ],
};
