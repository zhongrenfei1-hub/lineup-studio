import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const BASE_PATH = isProd ? "/lineup-studio" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
};

export default nextConfig;
