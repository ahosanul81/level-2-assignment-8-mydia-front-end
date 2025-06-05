import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // WARNING: Not officially supported. For multiple known domains, use an array.
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
