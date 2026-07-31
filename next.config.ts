import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: ["next-sanity"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/studio",
        destination: "/editar",
        permanent: true,
      },
      {
        source: "/studio/:path*",
        destination: "/editar/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
