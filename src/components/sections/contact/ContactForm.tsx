"use client";

import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Card3D, FloatingInput } from "@/components/ui";
import { GridPattern, ScanLine } from "@/components/ui/TechPatterns";
import { FormStatus } from "@/hooks/useContactForm";

interface FormTranslations {
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  error: string;
}

interface ContactFormProps {
  formState: {
    name: string;
    email: string;
    message: string;
  };
  status: FormStatus;
  translations: FormTranslations;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (
    field: "name" | "email" | "message"
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function ContactForm({
  formState,
  status,
  translations,
  onSubmit,
  onChange,
}: ContactFormProps) {
  const isDisabled = status === "loading" || status === "success";

  return (
    <Card3D>
      <form
        onSubmit={onSubmit}
        className="relative p-8 sm:p-10 rounded-sm bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm 
          border border-gray-300 dark:border-gray-700/50 shadow-sm overflow-hidden"
      >
        <GridPattern size={20} />
        <ScanLine duration={3} intensity="light" />

        <FormHeader />

        <div className="relative space-y-6">
          <FloatingInput
            label={translations.name}
            id="name"
            value={formState.name}
            onChange={onChange("name")}
            placeholder="Rami Cheikh Rouhou"
            required
          />

          <FloatingInput
            label={translations.email}
            type="email"
            id="email"
            value={formState.email}
            onChange={onChange("email")}
            placeholder="john@example.com"
            required
          />

          <FloatingInput
            label={translations.message}
            id="message"
            value={formState.message}
            onChange={onChange("message")}
            placeholder="Tell me about your project..."
            required
            isTextarea
            rows={5}
          />

          <SubmitButton
            status={status}
            translations={translations}
            disabled={isDisabled}
          />
        </div>
      </form>
    </Card3D>
  );
}

function FormHeader() {
  return (
    <div className="relative mb-8">
      <h3 className="text-2xl font-mono font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">
        Send Message
      </h3>
      <p className="text-gray-500 dark:text-gray-400 font-mono text-sm">
        Fill out the form below and I&apos;ll get back to you soon.
      </p>
    </div>
  );
}

interface SubmitButtonProps {
  status: FormStatus;
  translations: Pick<
    FormTranslations,
    "send" | "sending" | "success" | "error"
  >;
  disabled: boolean;
}

function SubmitButton({ status, translations, disabled }: SubmitButtonProps) {
  const statusStyles = {
    success: "bg-green-600 dark:bg-green-500 border-green-500",
    error: "bg-red-600 dark:bg-red-500 border-red-500",
    default:
      "bg-cyan-600 dark:bg-cyan-500 border-cyan-500 hover:bg-cyan-700 dark:hover:bg-cyan-600",
  };

  const buttonStyle =
    status === "success"
      ? statusStyles.success
      : status === "error"
      ? statusStyles.error
      : statusStyles.default;

  return (
    <motion.button
      type="submit"
      disabled={disabled}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full py-4 rounded-sm font-mono font-semibold uppercase tracking-wider text-white
        transition-all duration-300 flex items-center justify-center gap-3
        overflow-hidden group border ${buttonStyle}
        disabled:opacity-70 disabled:cursor-not-allowed
        shadow-md hover:shadow-lg`}
    >
      {status === "idle" && <ScanLine duration={1.5} intensity="strong" />}
      <ButtonContent status={status} translations={translations} />
    </motion.button>
  );
}

interface ButtonContentProps {
  status: FormStatus;
  translations: Pick<
    FormTranslations,
    "send" | "sending" | "success" | "error"
  >;
}

function ButtonContent({ status, translations }: ButtonContentProps) {
  switch (status) {
    case "loading":
      return (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
          />
          <span>{translations.sending}</span>
        </>
      );
    case "success":
      return (
        <>
          <CheckCircle className="w-5 h-5" />
          <span>{translations.success}</span>
        </>
      );
    case "error":
      return (
        <>
          <AlertCircle className="w-5 h-5" />
          <span>{translations.error}</span>
        </>
      );
    default:
      return (
        <>
          <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          <span>{translations.send}</span>
        </>
      );
  }
}
