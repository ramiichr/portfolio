"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FloatingInputProps {
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
}

export function FloatingInput({
  label,
  type = "text",
  id,
  value,
  onChange,
  placeholder,
  required = false,
  isTextarea = false,
  rows = 4,
}: FloatingInputProps) {
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
