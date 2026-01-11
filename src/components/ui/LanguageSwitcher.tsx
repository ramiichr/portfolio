"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";

const locales = [
  { code: "en", name: "English", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "fr", name: "Français", flag: "\u{1F1EB}\u{1F1F7}" },
  { code: "de", name: "Deutsch", flag: "\u{1F1E9}\u{1F1EA}" },
  { code: "ar", name: "العربية", flag: "\u{1F1F9}\u{1F1F3}" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, {
      locale: newLocale as "en" | "fr" | "de" | "ar",
    });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:gap-2 md:px-3 md:py-2.5 rounded-full 
        bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 
        shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 
        hover:shadow-xl hover:shadow-primary-500/20 dark:hover:shadow-primary-500/10
        transition-all duration-300 group border border-gray-200/50 dark:border-gray-700/50"
        aria-label={t("select")}
      >
        <Globe className="hidden md:block w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors" />
        <span className="text-lg md:text-sm md:font-medium text-gray-700 dark:text-gray-300">
          {currentLocale.flag}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 z-50 p-2 rounded-xl 
              bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl
              shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50
              border border-gray-200/50 dark:border-gray-700/50
              min-w-[160px]"
            >
              {locales.map((loc) => {
                const isActive = locale === loc.code;
                return (
                  <motion.button
                    key={loc.code}
                    whileHover={{ x: 4 }}
                    onClick={() => handleLocaleChange(loc.code)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-600 dark:text-primary-400"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    <span className="text-lg">{loc.flag}</span>
                    {loc.name}
                    {isActive && (
                      <Check className="ml-auto w-4 h-4 text-primary-500" />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
