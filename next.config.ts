import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [new URL('https://apod.nasa.gov/**')],
  },
};

export default nextConfig;
