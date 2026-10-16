import type { MetadataRoute } from "next";
import { siteData } from "@/data/siteData";
import { getPublishedBlogList } from "@/lib/blog";

export const revalidate = 3600;

// lastmod must reflect real content changes, not the time of the request;
// otherwise search engines learn to ignore it. Bump this when the static
// pages' content changes.
const STATIC_PAGES_LAST_MODIFIED = new Date("2026-09-07T00:00:00Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteData.url}/`, lastModified: STATIC_PAGES_LAST_MODIFIED, changeFrequency: "weekly", priority: 1 },
    { url: `${siteData.url}/download`, lastModified: STATIC_PAGES_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteData.url}/about`, lastModified: STATIC_PAGES_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteData.url}/contact`, lastModified: STATIC_PAGES_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.6 },
  ];
  const blogIndex = { url: `${siteData.url}/blog`, changeFrequency: "daily" as const, priority: 0.8 };

  // Blog posts come from Firestore. A sitemap must never fail the build, so a
  // fetch problem degrades to the static routes rather than throwing.
  try {
    const { posts } = await getPublishedBlogList();
    const postEntries = posts.map((post) => {
      const modified = post.updatedAt ?? post.firstPublishedAt ?? post.publishAt ?? post.createdAt;
      return {
        url: `${siteData.url}/blog/${post.slug}`,
        ...(modified ? { lastModified: modified } : {}),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    });
    // The blog index changes when a post does.
    const newestPost = postEntries.reduce<Date | null>(
      (latest, entry) => (entry.lastModified && (!latest || entry.lastModified > latest) ? entry.lastModified : latest),
      null,
    );
    return [
      ...staticRoutes,
      { ...blogIndex, lastModified: newestPost ?? STATIC_PAGES_LAST_MODIFIED },
      ...postEntries,
    ];
  } catch {
    return [...staticRoutes, { ...blogIndex, lastModified: STATIC_PAGES_LAST_MODIFIED }];
  }
}
