/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["example.com"], // Add your image domains here
    formats: ["image/webp", "image/avif"],
  },
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
