import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 * CI (`actions/configure-pages` + static_site_generator: next) injects
 * basePath=/clepyousif and images.unoptimized during the Actions build.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
