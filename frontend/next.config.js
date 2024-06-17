/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  images: {
    domains: [
      "localhost",
      "https://salumitracker.com",
      "https://salumitracker-rirv.onrender.com/",
    ],
  },
};

module.exports = nextConfig;
