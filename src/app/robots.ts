import type { MetadataRoute } from "next";
import { siteData } from "@/data/siteData";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Draft previews are JWT-gated and must never be indexed.
      disallow: ["/blog/preview/", "/api/"],
    },
    sitemap: `${siteData.url}/sitemap.xml`,
    host: siteData.url,
  };
}
