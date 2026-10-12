import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repo has lockfiles at the root *and* in client/ — pin Turbopack's
  // root to this folder so it doesn't guess (and warn).
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Lets the admin paste any image URL without configuring remotePatterns.
    // To use Next's image optimizer instead, remove this and add your image
    // hosts to `images.remotePatterns`.
    unoptimized: true,
  },
};

export default nextConfig;
