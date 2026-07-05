import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next ignores the stray lockfile in the user home directory
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
