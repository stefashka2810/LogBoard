import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/logs/:path*",
        destination: "http://155.212.165.128:8081/logs/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://155.212.165.128:8080/:path*",
      },
    ];
  },
};

export default nextConfig;
