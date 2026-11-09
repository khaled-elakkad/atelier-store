import type { NextConfig } from "next";
import { UNSPLASH_PARAMS } from "./src/lib/unsplash";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Only Unsplash photo URLs built by `unsplash()` (exact query string).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
        search: `?${UNSPLASH_PARAMS}`,
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
