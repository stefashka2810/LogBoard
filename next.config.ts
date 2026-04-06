import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://155.212.165.128:8080/:path*",
      },
    ];
  },
};

export default nextConfig;
