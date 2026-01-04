import {
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  LucideIcon,
} from "lucide-react";

export interface ContactInfo {
  icon: LucideIcon;
  labelKey: string;
  value: string;
  color: string;
  action: string;
}

export interface SocialLinkData {
  icon: LucideIcon;
  href: string;
  label: string;
  color: string;
}

export const CONTACT_INFO: Omit<ContactInfo, "labelKey">[] = [
  {
    icon: Mail,
    value: "ramii.cheikhrouhou@gmail.com",
    color: "from-primary-500 to-blue-600",
    action: "mailto:ramii.cheikhrouhou@gmail.com",
  },
  {
    icon: MapPin,
    value: "Tunisia",
    color: "from-accent-500 to-pink-600",
    action: "#",
  },
  {
    icon: Clock,
    value: "24/7",
    color: "from-emerald-500 to-teal-600",
    action: "#",
  },
];

export const CONTACT_INFO_KEYS = ["email", "location", "availability"] as const;

export const SOCIAL_LINKS: SocialLinkData[] = [
  {
    icon: Github,
    href: "https://github.com/ramiichr",
    label: "GitHub",
    color: "from-gray-700 to-gray-900",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/rami-cheikh-rouhou/",
    label: "LinkedIn",
    color: "from-blue-600 to-blue-800",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/ramicheikhrouhou670/",
    label: "Facebook",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/rami.cheikhrouhou/",
    label: "Instagram",
    color: "from-pink-500 to-purple-600",
  },
];

export const CONTACT_BACKGROUND_ORBS = [
  {
    position: "top-20 right-20",
    size: "w-[400px] h-[400px]",
    gradient: "from-primary-400/20 to-cyan-400/20",
    animation: { x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] },
    duration: 20,
  },
  {
    position: "bottom-20 left-20",
    size: "w-[350px] h-[350px]",
    gradient: "from-accent-400/20 to-pink-400/20",
    animation: { x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.15, 1] },
    duration: 18,
  },
  {
    position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    size: "w-[600px] h-[600px]",
    gradient: "from-purple-400/10 to-blue-400/10",
    animation: { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] },
    duration: 15,
  },
];
