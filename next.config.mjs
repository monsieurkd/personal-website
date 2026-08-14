/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a self-contained server at .next/standalone after `next build`:
  // a minimal Node process + only the node_modules it actually needs. This is
  // what makes a lean, production-ready Docker image (no full node_modules).
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
