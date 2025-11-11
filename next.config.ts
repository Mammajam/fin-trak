import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    /**
     * Explicitly set the root so Next.js ignores higher-level lockfiles.
     * Prevents the “multiple lockfiles” warning when running inside Cursor.
     */
    root: __dirname,
  },
};

export default nextConfig;
