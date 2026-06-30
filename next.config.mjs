/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // We can add other Next.js specific static optimizations if needed
};

export default nextConfig;
