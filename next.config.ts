import type { NextConfig } from "next";

// Canonical host is the apex, https://planformer.com (siteData.url, canonicals,
// sitemap, robots and JSON-LD all use it).
//
// Today Firebase App Hosting's domain settings send apex -> www with a 302, so a
// www -> apex redirect here would loop. It is therefore opt-in: first make the
// apex serve the backend directly in Firebase (App Hosting -> backend -> Settings
// -> Domains), then set REDIRECT_WWW_TO_APEX=true (BUILD availability) in
// apphosting.yaml and roll out. www requests then get a permanent 301 to the apex.
const redirectWwwToApex = process.env.REDIRECT_WWW_TO_APEX === "true";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
  async redirects() {
    if (!redirectWwwToApex) return [];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.planformer.com" }],
        destination: "https://planformer.com/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
