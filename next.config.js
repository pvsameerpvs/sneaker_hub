/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/sneaker_hub",
  assetPrefix: "/sneaker_hub/",
  images: { unoptimized: true }, // <- important for static export
};
module.exports = nextConfig;
