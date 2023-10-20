/** @type {import('next').NextConfig} */
const path = require("path");
const ThreeMinifierPlugin = require("@yushijinhun/three-minifier-webpack");
const nextConfig = {
  reactStrictMode: true,
  output: "export",
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
      //   three: path.resolve(__dirname, "../vendor/three-exports"),
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

  // disable: process.env.NODE_ENV === 'development',
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// module.exports = withBundleAnalyzer(nextConfig);

// module.exports = {
//   webpack: (config, { isServer, dev }) => {
//     if (!isServer && !dev) {
//       config.cache = false;
//       const threeMinifier = new ThreeMinifierPlugin();
//       config.plugins.unshift(threeMinifier);
//       config.resolve.plugins.unshift(threeMinifier.resolver);
//     }
//     return config;
//   },
// };

module.exports = withBundleAnalyzer(withPWA(nextConfig));
