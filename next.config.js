/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@wanderplan/shared"],
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
