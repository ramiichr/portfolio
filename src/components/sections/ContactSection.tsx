"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  MessageSquare,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
} from "lucide-react";

// 3D Tilt Card Component
function Card3D({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX: springRotateX, rotateY: springRotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Floating input with glow effect
function FloatingInput({
  label,
  type = "text",
  id,
  value,
  onChange,
  placeholder,
  required = false,
  isTextarea = false,
  rows = 4,
}: {
  label: string;
  type?: string;
  id: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  required?: boolean;
  isTextarea?: boolean;
  rows?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  const InputComponent = isTextarea ? "textarea" : "input";

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Glow effect on focus */}
      <motion.div
        animate={{
          opacity: isFocused ? 0.3 : 0,
          scale: isFocused ? 1 : 0.95,
        }}
        className="absolute -inset-1 bg-cyan-500 rounded-sm blur-md transition-all duration-300"
      />

      <div className="relative">
        <InputComponent
          type={type}
          id={id}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={isTextarea ? rows : undefined}
          className={`peer w-full px-5 py-4 pt-6 rounded-sm border 
            ${
              isFocused
                ? "border-cyan-500 dark:border-cyan-400"
                : "border-gray-300 dark:border-gray-700/50 hover:border-gray-400 dark:hover:border-gray-600"
            }
            bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm
            text-gray-900 dark:text-white font-mono
            transition-all duration-300 outline-none
            ${isTextarea ? "resize-none min-h-[140px]" : ""}
          `}
          placeholder=" "
        />

        {/* Floating label */}
        <label
          htmlFor={id}
          className={`absolute left-5 transition-all duration-300 pointer-events-none font-mono
            ${
              isFocused || hasValue
                ? "top-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400"
                : "top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            }
            ${
              isTextarea && !isFocused && !hasValue ? "top-6 translate-y-0" : ""
            }
          `}
        >
          {label}
        </label>

        {/* Placeholder that shows when focused */}
        {isFocused && !hasValue && (
          <span className="absolute left-5 top-7 text-gray-400 text-sm pointer-events-none font-mono">
            {placeholder}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// Social link button
function SocialLink({
  icon: Icon,
  href,
  label,
  color,
}: {
  icon: React.ElementType;
  href: string;
  label: string;
  color: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative w-12 h-12 rounded-sm bg-gradient-to-br ${color} border border-white/50 dark:border-gray-700/50 flex items-center justify-center shadow-md cursor-pointer`}
    >
      <Icon className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-mono font-medium rounded-sm whitespace-nowrap"
      >
        {label}
      </motion.div>
    </motion.a>
  );
}

export function ContactSection() {
  const t = useTranslations("contact");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
    setFormState({ name: "", email: "", message: "" });

    // Reset status after 3 seconds
    setTimeout(() => setStatus("idle"), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t("info.email"),
      value: "hello@example.com",
      color: "from-primary-500 to-blue-600",
      action: "mailto:hello@example.com",
    },
    {
      icon: MapPin,
      label: t("info.location"),
      value: "San Francisco, CA",
      color: "from-accent-500 to-pink-600",
      action: "#",
    },
    {
      icon: Clock,
      label: t("info.availability"),
      value: "Mon - Fri, 9am - 6pm",
      color: "from-emerald-500 to-teal-600",
      action: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com",
      label: "GitHub",
      color: "from-gray-700 to-gray-900",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: Twitter,
      href: "https://twitter.com",
      label: "Twitter",
      color: "from-sky-400 to-sky-600",
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen py-20 lg:py-32 relative overflow-hidden flex items-center"
    >
      {/* Animated mesh background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

        {/* Animated orbs */}
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-[400px] h-[400px] bg-gradient-to-br from-primary-400/20 to-cyan-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 60, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-20 w-[350px] h-[350px] bg-gradient-to-br from-accent-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          {/* Decorative rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 border-2 border-dashed border-primary-300/50 dark:border-primary-700/50 rounded-full"
          />

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white/80 dark:bg-gray-950/50 border border-cyan-500/50 dark:border-cyan-500/50 mb-6 backdrop-blur-sm"
          >
            <MessageSquare className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Let&apos;s Connect
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
              {t("title")}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 max-w-7xl mx-auto">
          {/* Contact info side - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Description card */}
            <Card3D>
              <div className="relative p-6 rounded-sm bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700/50 shadow-sm overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
                    backgroundSize: "10px 10px",
                  }}
                />
                <Sparkles className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-mono text-sm">
                  {t("description")}
                </p>
              </div>
            </Card3D>

            {/* Contact info cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.action}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="group relative flex items-center gap-4 p-5 rounded-sm
                      bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm
                      border border-gray-300 dark:border-gray-700/50
                      shadow-sm hover:shadow-md hover:border-cyan-500/50 transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    {/* Grid pattern */}
                    <div
                      className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
                      style={{
                        backgroundImage:
                          "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
                        backgroundSize: "8px 8px",
                      }}
                    />

                    {/* Scan line on hover */}
                    <motion.div
                      animate={{ y: ["-100%", "200%"] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100"
                    />

                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`relative p-3 rounded-sm bg-gradient-to-br ${item.color} border border-white/50 shadow-md`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>

                    <div className="flex-1">
                      <p className="text-xs font-mono font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="font-mono font-semibold text-gray-900 dark:text-white">
                        {item.value}
                      </p>
                    </div>

                    <ArrowUpRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                );
              })}
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-6"
            >
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                Find me on
              </p>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                  >
                    <SocialLink {...link} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form - 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card3D>
              <form
                onSubmit={handleSubmit}
                className="relative p-8 sm:p-10 rounded-sm bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm 
                  border border-gray-300 dark:border-gray-700/50 shadow-sm overflow-hidden"
              >
                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Scan line */}
                <motion.div
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"
                />

                {/* Form header */}
                <div className="relative mb-8">
                  <h3 className="text-2xl font-mono font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">
                    {/* Send Message */}Send Message
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 font-mono text-sm">
                    Fill out the form below and I&apos;ll get back to you soon.
                  </p>
                </div>

                <div className="relative space-y-6">
                  {/* Name field */}
                  <FloatingInput
                    label={t("form.name")}
                    id="name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    placeholder="Rami Cheikh Rouhou"
                    required
                  />

                  {/* Email field */}
                  <FloatingInput
                    label={t("form.email")}
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    required
                  />

                  {/* Message field */}
                  <FloatingInput
                    label={t("form.message")}
                    id="message"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    placeholder="Tell me about your project..."
                    required
                    isTextarea
                    rows={5}
                  />

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative w-full py-4 rounded-sm font-mono font-semibold uppercase tracking-wider text-white
                      transition-all duration-300 flex items-center justify-center gap-3
                      overflow-hidden group border
                      ${
                        status === "success"
                          ? "bg-green-600 dark:bg-green-500 border-green-500"
                          : status === "error"
                          ? "bg-red-600 dark:bg-red-500 border-red-500"
                          : "bg-cyan-600 dark:bg-cyan-500 border-cyan-500 hover:bg-cyan-700 dark:hover:bg-cyan-600"
                      }
                      disabled:opacity-70 disabled:cursor-not-allowed
                      shadow-md hover:shadow-lg`}
                  >
                    {/* Scan line effect */}
                    {status === "idle" && (
                      <motion.div
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent"
                      />
                    )}

                    {status === "loading" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        <span>{t("form.sending")}</span>
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>{t("form.success")}</span>
                      </>
                    ) : status === "error" ? (
                      <>
                        <AlertCircle className="w-5 h-5" />
                        <span>{t("form.error")}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        <span>{t("form.send")}</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </Card3D>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
