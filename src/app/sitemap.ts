import type { MetadataRoute } from "next";
import { siteData } from "@/data/siteData";
import { getPublishedBlogList } from "@/lib/blog";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteData.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteData.url}/download`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteData.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteData.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteData.url}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
  ];

  // Blog posts come from Firestore. A sitemap must never fail the build, so a
  // fetch problem degrades to the static routes rather than throwing.
  try {
    const { posts } = await getPublishedBlogList();
    return [
      ...staticRoutes,
      ...posts.map((post) => ({
        url: `${siteData.url}/blog/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    return staticRoutes;
  }
}
