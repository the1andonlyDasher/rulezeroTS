/** @type {import('next').NextConfig} */
const path = require("path");
const ThreeMinifierPlugin = require("@yushijinhun/three-minifier-webpack");
const nextConfig = {
  reactStrictMode: true,
  compress: true,

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
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

/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  disable: false,
  register: true,
  mode: "production",
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = nextConfig;
// module.exports = withBundleAnalyzer(nextConfig);
