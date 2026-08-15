import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The ported index.html scripts are imperative (canvas/WebGL/GSAP) and attach
  // rAF loops + listeners once. Strict Mode's double-invoke would run them twice in dev.
  reactStrictMode: false,
};

export default nextConfig;
