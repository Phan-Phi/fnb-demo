// module.exports = nextConfig;
const withBundleAnalyzer = require("@next/bundle-analyzer");

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  return withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  })({
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
      locales: ["vi", "en"],
      defaultLocale: "vi",
      localeDetection: false,
    },
    images: {
      domains: [process.env.BASE_URL],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "demo-fnb.t-solution.vn",
          pathname: "**",
        },
        {
          protocol: "http",
          hostname: "demo-fnb.t-solution.vn",
          pathname: "**",
        },

        {
          protocol: "https",
          hostname: "img.youtube.com",
          pathname: "**",
        },
        {
          protocol: "http",
          hostname: "img.youtube.com",
          pathname: "**",
        },
      ],
    },

    modularizeImports: {
      lodash: {
        transform: "lodash/{{member}}",
      },
    },

    experimental: {
      outputFileTracingIgnores: ["**canvas**"],
      outputFileTracingExcludes: ["**canvas**"],
    },
    // typescript: {
    //   ignoreBuildErrors: true,
    // },
    output: "standalone",
  });
};

module.exports = nextConfig;
