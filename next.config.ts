import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "portfolio";
const repositoryBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (isGitHubPages ? `/${repositoryName}` : "");

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  // Vinext's static prerenderer currently requests the root route directly.
  // Vite handles the GitHub project-path prefix for exported assets instead.
  basePath: isGitHubPages ? "" : repositoryBasePath,
  trailingSlash: isGitHubPages,
  images: {
    unoptimized: isGitHubPages,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: repositoryBasePath,
    NEXT_PUBLIC_STATIC_EXPORT: String(isGitHubPages),
  },
};

export default nextConfig;
