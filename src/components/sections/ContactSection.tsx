"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  Wifi,
  Copy,
  Check,
  Volume2,
  Power,
  Activity,
  Signal,
  Cpu,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { SocialLink, SectionHeader } from "@/components/ui";
import { ContactInfoItem } from "./contact";
import {
  CONTACT_INFO,
  CONTACT_INFO_KEYS,
  SOCIAL_LINKS,
} from "@/constants/contact";

export function ContactSection() {
  const t = useTranslations("contact");
  const [isTerminalOn, setIsTerminalOn] = useState(true);

  const contactInfoWithLabels: ContactInfoItem[] = CONTACT_INFO.map(
    (item, index) => ({
      ...item,
      label: t(`info.${CONTACT_INFO_KEYS[index]}`),
    })
  );

  return (
    <section
      id="contact"
      className="min-h-screen py-20 lg:py-32 relative overflow-hidden flex items-center bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-950 dark:via-[#0a0a0f] dark:to-gray-950"
    >
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Circuit Board Pattern */}
      <CircuitPattern />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          icon={Radio}
          badge="📡 Signal Detected"
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="max-w-5xl mx-auto">
          {/* Retro Terminal */}
          <RetroTerminal
            isOn={isTerminalOn}
            onToggle={() => setIsTerminalOn(!isTerminalOn)}
            contactInfo={contactInfoWithLabels}
            description={t("description")}
          />

          {/* Frequency Social Links */}
          <FrequencySocials />
        </div>
      </div>
    </section>
  );
}

function MatrixRain() {
  const [columns, setColumns] = useState<
    Array<{
      id: number;
      x: number;
      chars: string[];
      speed: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    setColumns(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: (i / 30) * 100,
        chars: Array.from({ length: 20 }, () =>
          String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))
        ),
        speed: Math.random() * 2 + 1,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  if (columns.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.03] dark:opacity-[0.08] pointer-events-none">
      {columns.map((col) => (
        <motion.div
          key={col.id}
          className="absolute top-0 font-mono text-xs text-emerald-500 whitespace-pre leading-4"
          style={{ left: `${col.x}%` }}
          initial={{ y: "-100%" }}
          animate={{ y: "100vh" }}
          transition={{
            duration: col.speed * 10,
            repeat: Infinity,
            delay: col.delay,
            ease: "linear",
          }}
        >
          {col.chars.map((char, i) => (
            <div key={i} style={{ opacity: 1 - i * 0.05 }}>
              {char}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

function CircuitPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] dark:opacity-[0.05]">
        <defs>
          <pattern
            id="circuit"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M10 10h80M10 10v30M90 10v50M10 40h40M50 40v20M50 60h40M10 90h30M40 60v30M70 60v30M70 90h20"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              className="text-cyan-500"
            />
            <circle cx="10" cy="10" r="2" className="fill-cyan-500" />
            <circle cx="90" cy="10" r="2" className="fill-cyan-500" />
            <circle cx="50" cy="40" r="2" className="fill-cyan-500" />
            <circle cx="10" cy="40" r="2" className="fill-cyan-500" />
            <circle cx="90" cy="60" r="2" className="fill-cyan-500" />
            <circle cx="40" cy="90" r="2" className="fill-cyan-500" />
            <circle cx="90" cy="90" r="2" className="fill-cyan-500" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Animated data pulses along circuits */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full blur-sm"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + i * 15}%`,
          }}
          animate={{
            x: [0, 100, 100, 0, 0],
            y: [0, 0, 50, 50, 0],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

interface RetroTerminalProps {
  isOn: boolean;
  onToggle: () => void;
  contactInfo: ContactInfoItem[];
  description: string;
}

function RetroTerminal({
  isOn,
  onToggle,
  contactInfo,
  description,
}: RetroTerminalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [signalStrength, setSignalStrength] = useState(95);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const signalTimer = setInterval(() => {
      setSignalStrength(90 + Math.random() * 10);
    }, 2000);
    return () => {
      clearInterval(timer);
      clearInterval(signalTimer);
    };
  }, []);

  const handleCopy = (value: string, index: number) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-16 perspective-1000"
    >
      {/* Terminal Frame */}
      <div className="relative max-w-3xl mx-auto">
        {/* Outer bezel with screws */}
        <div className="absolute -inset-3 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 rounded-2xl">
          {/* Screws */}
          {[
            "top-2 left-2",
            "top-2 right-2",
            "bottom-2 left-2",
            "bottom-2 right-2",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-4 h-4 rounded-full bg-gray-500 dark:bg-gray-600 border-2 border-gray-400 dark:border-gray-700`}
            >
              <div className="absolute inset-1 bg-gray-600 dark:bg-gray-500 rounded-full" />
            </div>
          ))}
        </div>

        {/* Terminal body */}
        <div className="relative bg-gray-200 dark:bg-gray-900 rounded-xl overflow-hidden border-4 border-gray-400 dark:border-gray-700">
          {/* Top control panel */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 border-b-2 border-gray-400 dark:border-gray-700">
            {/* Left controls */}
            <div className="flex items-center gap-3">
              {/* Power button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggle}
                className={`relative w-8 h-8 rounded-full border-2 ${
                  isOn
                    ? "bg-emerald-500 border-emerald-600 shadow-lg shadow-emerald-500/50"
                    : "bg-gray-500 border-gray-600"
                } transition-all duration-300`}
              >
                <Power className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </motion.button>

              {/* Status LEDs */}
              <div className="flex gap-2">
                {[
                  { color: "emerald", label: "PWR" },
                  { color: "amber", label: "SIG" },
                  { color: "cyan", label: "TX" },
                ].map((led, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <motion.div
                      className={`w-3 h-3 rounded-full ${
                        isOn ? `bg-${led.color}-500` : "bg-gray-600"
                      }`}
                      animate={
                        isOn
                          ? {
                              opacity: [0.5, 1, 0.5],
                              boxShadow: [
                                `0 0 5px var(--${led.color}-500)`,
                                `0 0 15px var(--${led.color}-500)`,
                                `0 0 5px var(--${led.color}-500)`,
                              ],
                            }
                          : {}
                      }
                      transition={{ duration: 1 + i * 0.3, repeat: Infinity }}
                      style={
                        isOn
                          ? {
                              backgroundColor:
                                led.color === "emerald"
                                  ? "#10b981"
                                  : led.color === "amber"
                                  ? "#f59e0b"
                                  : "#06b6d4",
                              boxShadow:
                                led.color === "emerald"
                                  ? "0 0 10px #10b981"
                                  : led.color === "amber"
                                  ? "0 0 10px #f59e0b"
                                  : "0 0 10px #06b6d4",
                            }
                          : {}
                      }
                    />
                    <span className="text-[8px] font-mono text-gray-500 dark:text-gray-400">
                      {led.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Center - Model name */}
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-mono font-bold text-gray-600 dark:text-gray-400 tracking-widest">
                COMM-LINK 3000
              </span>
            </div>

            {/* Right - Signal meter */}
            <div className="flex items-center gap-2">
              <Signal className="w-4 h-4 text-gray-500" />
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((bar) => (
                  <motion.div
                    key={bar}
                    className={`w-1.5 rounded-sm ${
                      isOn && signalStrength > bar * 20
                        ? "bg-emerald-500"
                        : "bg-gray-400 dark:bg-gray-600"
                    }`}
                    style={{ height: 4 + bar * 2 }}
                    animate={
                      isOn && signalStrength > bar * 20
                        ? { opacity: [0.7, 1, 0.7] }
                        : {}
                    }
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: bar * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CRT Screen */}
          <div className="relative">
            {/* Screen bezel */}
            <div className="absolute inset-0 pointer-events-none border-8 border-gray-800 dark:border-black rounded-sm z-20" />

            {/* CRT effects overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Scanlines */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                }}
              />
              {/* Screen curvature shadow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 rounded-sm" />
              {/* Glare */}
              <div
                className="absolute top-0 left-0 w-1/2 h-1/2 opacity-[0.02]"
                style={{
                  background:
                    "linear-gradient(135deg, white 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Screen content */}
            <AnimatePresence>
              {isOn ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-gray-900 dark:bg-black p-6 min-h-[400px]"
                >
                  {/* Screen glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-transparent to-emerald-900/20" />

                  {/* Header bar */}
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-cyan-500/30">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Wifi className="w-5 h-5 text-cyan-400" />
                      </motion.div>
                      <span className="font-mono text-cyan-400 text-sm">
                        INCOMING TRANSMISSION
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <AudioWaveform />
                      <span className="font-mono text-emerald-400 text-xs">
                        {currentTime
                          ? currentTime.toLocaleTimeString()
                          : "--:--:--"}
                      </span>
                    </div>
                  </div>

                  {/* Contact data display */}
                  <div className="space-y-4 mb-6">
                    {contactInfo.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.15 }}
                          onClick={() => handleCopy(item.value, index)}
                          className="group relative flex items-center gap-4 p-4 rounded-lg
                            bg-cyan-500/5 border border-cyan-500/20
                            hover:bg-cyan-500/10 hover:border-cyan-500/40
                            cursor-pointer transition-all duration-300"
                        >
                          {/* Pulse effect on hover */}
                          <motion.div
                            className="absolute inset-0 rounded-lg bg-cyan-500/10 opacity-0 group-hover:opacity-100"
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />

                          {/* Icon with glow */}
                          <div className="relative">
                            <div
                              className={`p-3 rounded-lg bg-gradient-to-br ${item.color}`}
                            >
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <motion.div
                              className={`absolute inset-0 rounded-lg bg-gradient-to-br ${item.color} blur-md opacity-50`}
                              animate={{ opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </div>

                          {/* Data */}
                          <div className="flex-1 relative z-10">
                            <p className="text-xs font-mono text-cyan-400/70 uppercase tracking-wider">
                              {item.label}
                            </p>
                            <div className="flex items-center gap-2">
                              <TypewriterText
                                text={item.value}
                                delay={0.5 + index * 0.2}
                              />
                            </div>
                          </div>

                          {/* Copy feedback */}
                          <div className="relative">
                            <AnimatePresence>
                              {copiedIndex === index ? (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  className="flex items-center gap-1 px-2 py-1 bg-emerald-500 rounded text-xs font-mono text-white"
                                >
                                  <Check className="w-3 h-3" />
                                  COPIED
                                </motion.div>
                              ) : (
                                <Copy className="w-4 h-4 text-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Description with typing effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20"
                  >
                    <div className="flex items-start gap-3">
                      <Zap className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-mono text-emerald-400/70 mb-1">
                          {"//"} SYSTEM MESSAGE
                        </p>
                        <p className="text-sm font-mono text-emerald-300 leading-relaxed">
                          {description}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Command prompt */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-6 pt-4 border-t border-cyan-500/20"
                  >
                    <motion.a
                      href={`mailto:${contactInfo[0]?.value}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center justify-center gap-3 w-full py-4 rounded-lg
                        bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-cyan-500/20
                        border border-cyan-500/30 hover:border-cyan-500/60
                        font-mono text-cyan-400 hover:text-cyan-300
                        transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      <Volume2 className="w-5 h-5 relative z-10" />
                      <span className="relative z-10 font-bold tracking-wider">
                        ESTABLISH CONNECTION
                      </span>
                      <Activity className="w-5 h-5 relative z-10" />
                    </motion.a>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-950 p-6 min-h-[400px] flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-gray-600 font-mono text-sm"
                    >
                      [ STANDBY MODE ]
                    </motion.div>
                    <p className="text-gray-700 font-mono text-xs mt-2">
                      Press power to activate
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom vent */}
          <div className="flex justify-center gap-1 py-3 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 border-t-2 border-gray-400 dark:border-gray-700">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-1 bg-gray-400 dark:bg-gray-700 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AudioWaveform() {
  return (
    <div className="flex items-center gap-0.5 h-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-emerald-400 rounded-full"
          animate={{
            height: [4, 16, 8, 12, 4],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setShowCursor(false);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className="font-mono text-cyan-300">
      {displayedText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-cyan-400 ml-0.5"
        />
      )}
    </span>
  );
}

function FrequencySocials() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="relative"
    >
      {/* Frequency display header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center gap-4 px-6 py-3 rounded-full
            bg-gray-100 dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700"
        >
          <FrequencyBars />
          <span className="font-mono text-sm text-gray-600 dark:text-gray-300">
            BROADCAST CHANNELS
          </span>
          <FrequencyBars />
        </motion.div>
      </div>

      {/* Social links as radio stations */}
      <div className="flex justify-center gap-6 flex-wrap">
        {SOCIAL_LINKS.map((link, index) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.5 + index * 0.15,
              type: "spring",
              stiffness: 200,
            }}
            className="relative group"
          >
            {/* Radio wave rings */}
            <div className="absolute -inset-4 flex items-center justify-center">
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute rounded-full border border-cyan-500/30"
                  style={{
                    width: 48 + ring * 16,
                    height: 48 + ring * 16,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: ring * 0.4,
                  }}
                />
              ))}
            </div>

            <SocialLink {...link} />

            {/* Frequency label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                {index === 0 ? "CH.01" : index === 1 ? "CH.02" : "CH.03"}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Bottom frequency line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-16 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
      />
    </motion.div>
  );
}

function FrequencyBars() {
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[3, 5, 7, 4, 6, 3, 5].map((height, i) => (
        <motion.div
          key={i}
          className="w-1 bg-cyan-500 rounded-sm"
          animate={{
            height: [height, height + 4, height],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          style={{ height }}
        />
      ))}
    </div>
  );
}
