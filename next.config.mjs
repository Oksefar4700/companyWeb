// next.config.mjs - OPDATER din eksisterende fil
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dine eksisterende konfigurationer kan tilføjes her
  // Eksempel:
  // images: {
  //   domains: ['example.com'],
  // },
};

export default withNextIntl(nextConfig);
