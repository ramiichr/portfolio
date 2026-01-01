"use client";

import { useState, useCallback } from "react";

export type FormStatus = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface UseContactFormReturn {
  formState: FormState;
  status: FormStatus;
  handleChange: (
    field: keyof FormState
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const initialFormState: FormState = {
  name: "",
  email: "",
  message: "",
};

export function useContactForm(): UseContactFormReturn {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = useCallback(
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState((prev) => ({ ...prev, [field]: e.target.value }));
      },
    []
  );

  const resetForm = useCallback(() => {
    setFormState(initialFormState);
    setStatus("idle");
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // TODO: Replace with actual form submission logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormState(initialFormState);

      // Reset status after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }, []);

  return {
    formState,
    status,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
