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
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with Next.js and TypeScript. Features include internationalization (English/German), dark/light mode, animations with Framer Motion, and a dashboard for visitor analytics using Redis.",
    image: "/images/portfolio.png",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Redis"],
    category: "web",
    liveUrl: "https://rami-cheikhrouhou.vercel.app/",
    githubUrl: "https://github.com/ramiichr/myportfolio",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
  {
    id: 2,
    title: "Weather Forecast App",
    description:
      "A comprehensive weather application that provides current conditions and 7-day forecasts for any location. Features include interactive maps, hourly forecasts, air quality index, and severe weather alerts with a responsive design.",
    image: "/images/weather.png",
    tags: [
      "React",
      "OpenWeather API",
      "Leaflet Maps",
      "CSS Modules",
      "Responsive Design",
    ],
    category: "web",
    liveUrl: "https://weather-forecast-liveapp.vercel.app/",
    githubUrl: "https://github.com/ramiichr/WeatherForecastApp",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
  },
  {
    id: 3,
    title: "Exchange Flow",
    description:
      "A currency converter application that provides real-time exchange rates for over 150 currencies. Features include historical rate charts, currency comparison, and a clean, intuitive interface with responsive design for all devices.",
    image: "/images/exchangeflow.png",
    tags: [
      "Next.js",
      "React Query",
      "Chart.js",
      "Tailwind CSS",
      "API Integration",
    ],
    category: "web",
    liveUrl: "https://exchange-flow.vercel.app/",
    githubUrl: "https://github.com/ramiichr/CurrencyConverter",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
  },
  {
    id: 4,
    title: "ConnectHub",
    description:
      "A feature-rich real-time chat application with text, voice, and video capabilities. Features include real-time messaging, user authentication, voice & video calls, responsive design, user status indicators, and message history.",
    image: "/images/chatapp.png",
    tags: [
      "React",
      "Node.js",
      "Socket.io",
      "MongoDB",
      "Express",
      "Tailwind CSS",
    ],
    category: "web",
    liveUrl: "https://chat-app-connecthub.vercel.app/",
    githubUrl: "https://github.com/ramiichr/ChatApp",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
  },
];

export const categories = ["all", "web", "mobile", "design"] as const;
export type CategoryFilter = (typeof categories)[number];
