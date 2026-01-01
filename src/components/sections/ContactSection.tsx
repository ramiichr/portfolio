"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles, MessageSquare } from "lucide-react";
import {
  Card3D,
  SocialLink,
  AnimatedBackground,
  SectionHeader,
  TechCard,
} from "@/components/ui";
import { ContactInfoCard, ContactForm, ContactInfoItem } from "./contact";
import { useContactForm } from "@/hooks/useContactForm";
import {
  CONTACT_INFO,
  CONTACT_INFO_KEYS,
  SOCIAL_LINKS,
  CONTACT_BACKGROUND_ORBS,
} from "@/constants/contact";

export function ContactSection() {
  const t = useTranslations("contact");
  const { formState, status, handleChange, handleSubmit } = useContactForm();

  const contactInfoWithLabels: ContactInfoItem[] = CONTACT_INFO.map(
    (item, index) => ({
      ...item,
      label: t(`info.${CONTACT_INFO_KEYS[index]}`),
    })
  );

  const formTranslations = {
    name: t("form.name"),
    email: t("form.email"),
    message: t("form.message"),
    send: t("form.send"),
    sending: t("form.sending"),
    success: t("form.success"),
    error: t("form.error"),
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-20 lg:py-32 relative overflow-hidden flex items-center"
    >
      <AnimatedBackground orbs={CONTACT_BACKGROUND_ORBS} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={MessageSquare}
          badge="Let's Connect"
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 max-w-7xl mx-auto">
          <ContactSidebar
            description={t("description")}
            contactInfo={contactInfoWithLabels}
          />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <ContactForm
              formState={formState}
              status={status}
              translations={formTranslations}
              onSubmit={handleSubmit}
              onChange={handleChange}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface ContactSidebarProps {
  description: string;
  contactInfo: ContactInfoItem[];
}

function ContactSidebar({ description, contactInfo }: ContactSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-2 space-y-8"
    >
      <DescriptionCard description={description} />

      <div className="space-y-4">
        {contactInfo.map((item, index) => (
          <ContactInfoCard key={item.label} item={item} index={index} />
        ))}
      </div>

      <SocialLinksSection />
    </motion.div>
  );
}

function DescriptionCard({ description }: { description: string }) {
  return (
    <Card3D>
      <TechCard className="p-6">
        <Sparkles className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-4" />
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-mono text-sm">
          {description}
        </p>
      </TechCard>
    </Card3D>
  );
}

function SocialLinksSection() {
  return (
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
        {SOCIAL_LINKS.map((link, index) => (
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
  );
}
