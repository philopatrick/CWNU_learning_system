/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@cwnu/shared"]
};

export default nextConfig;
