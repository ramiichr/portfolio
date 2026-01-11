import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UmamiAnalytics } from "@/components/analytics";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Rami Cheikh Rouhou | Full Stack Developer",
  description:
    "Portfolio of Rami Cheikh Rouhou - Full Stack Developer specializing in modern web applications with React, Next.js, and Node.js",
  keywords: [
    "developer",
    "portfolio",
    "full stack",
    "react",
    "next.js",
    "typescript",
  ],
  authors: [{ name: "Rami Cheikh Rouhou" }],
  openGraph: {
    title: "Rami Cheikh Rouhou | Full Stack Developer",
    description:
      "Portfolio of Rami Cheikh Rouhou - Full Stack Developer specializing in modern web applications",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rami Cheikh Rouhou | Full Stack Developer",
    description:
      "Portfolio of Rami Cheikh Rouhou - Full Stack Developer specializing in modern web applications",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <UmamiAnalytics />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <div className="relative min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
