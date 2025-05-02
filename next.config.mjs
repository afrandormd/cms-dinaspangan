import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
        protocol: "https",
      },
      {
        hostname: "via.placeholder.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
