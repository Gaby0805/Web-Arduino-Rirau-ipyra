import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false, // Desativa lightningcss
  },
};

module.exports = nextConfig;