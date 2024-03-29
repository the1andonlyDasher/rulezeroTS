/** @type {import('next').NextConfig} */
const path = require("path");
const ThreeMinifierPlugin = require("@yushijinhun/three-minifier-webpack");
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yt.artemislena.eu",
        port: "",
        pathname: "/vi/**",
      },
    ],
  },
  reactStrictMode: true,
  compress: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.cache = false;
      const threeMinifier = new ThreeMinifierPlugin();
      config.plugins.unshift(threeMinifier);
      config.resolve.plugins.unshift(threeMinifier.resolver);
      // config.resolve.alias = {
      //   ...config.resolve.alias,
      //   three$: path.resolve(__dirname, "../vendor/three-exports"),
      // };
    }
    return config;
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  disable: false,
  register: true,
  mode: "production",
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// module.exports = nextConfig;
module.exports = withBundleAnalyzer(withPWA(nextConfig));
