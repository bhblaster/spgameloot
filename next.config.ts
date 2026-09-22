import type { NextConfig } from "next";

const isNetlify = process.env.NETLIFY === "true";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

// Only use basePath if we are building for GitHub Pages specifically
// Assuming the GitHub repo is "spgameloot" and owner is "bhblaster"
const basePath = (isGithubActions && !isNetlify) ? "/spgameloot" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
