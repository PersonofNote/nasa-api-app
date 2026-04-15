import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [new URL('https://apod.nasa.gov/**')],
  },
};

export default nextConfig;
