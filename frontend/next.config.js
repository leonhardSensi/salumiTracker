/** @type {import('next').NextConfig} */

// is still the correct way of adding environment variables?
const nextConfig = {
  // output: "export",
  images: {
    domains: ["localhost"],
  },
  env: {
    BACKEND: "http://localhost:8000",
  },
};

module.exports = nextConfig;
