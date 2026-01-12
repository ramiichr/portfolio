/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 86400,
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    serverActions: true,
    turboMode: true,
    legacyBrowsers: false,
  },
  async rewrites() {
    return [
      {
        source: "/stats/script.js",
        destination: "https://cloud.umami.is/script.js",
      },
      {
        source: "/api/send",
        destination: "https://cloud.umami.is/api/send",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
