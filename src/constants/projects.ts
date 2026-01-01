export type ProjectCategory = "web" | "mobile" | "design";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: ProjectCategory;
  liveUrl: string;
  githubUrl: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with cart, checkout, and payment integration.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    category: "web",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Collaborative project management tool with real-time updates.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "web",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
  },
  {
    id: 3,
    title: "Fitness Tracker",
    description:
      "Mobile app for tracking workouts, nutrition, and health metrics.",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop",
    tags: ["React Native", "Firebase", "Redux"],
    category: "mobile",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Modern portfolio with animations and dark mode support.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    category: "web",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
  },
  {
    id: 5,
    title: "Brand Identity",
    description: "Complete brand identity design for a tech startup.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    tags: ["Figma", "Branding", "UI/UX"],
    category: "design",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    gradient: "from-pink-500 via-rose-500 to-red-500",
  },
  {
    id: 6,
    title: "AI Chat Assistant",
    description: "Intelligent chatbot powered by machine learning.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    tags: ["Python", "OpenAI", "FastAPI", "React"],
    category: "web",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
  },
];

export const categories = ["all", "web", "mobile", "design"] as const;
export type CategoryFilter = (typeof categories)[number];
