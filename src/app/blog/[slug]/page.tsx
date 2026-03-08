import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/layout/SiteLayout";
import { BlogContent } from "@/components/blog/BlogContent";
import { getPublishedBlogPostBySlug } from "@/lib/blog";

export const runtime = "nodejs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) {
    return {};
  }

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    openGraph: {
      title: post.seo.ogTitle,
      description: post.seo.ogDescription,
      images: post.seo.ogImage ? [{ url: post.seo.ogImage }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.ogTitle,
      description: post.seo.ogDescription,
      images: post.seo.ogImage ? [post.seo.ogImage] : [],
    },
  };
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    image: post.coverImage.url || undefined,
    author: post.author?.name
      ? {
          "@type": "Person",
          name: post.author.name,
        }
      : undefined,
  };

  return (
    <SiteLayout>
      <main
        className="bg-white"
        style={{
          backgroundImage: "url('/assets/bg/bg3.svg')",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          backgroundSize: "auto",
        }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="mx-auto max-w-[1240px] px-0 pt-32 sm:px-4 sm:pt-40 lg:px-6">
          <div className="relative w-full overflow-hidden sm:rounded-sm">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/7] md:aspect-[16/6]">
              <img
                src={post.coverImage.url}
                alt={post.coverImage.alt || post.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-0 sm:pb-24 sm:pt-10 md:pt-12">
            <h1 className="text-xl font-extrabold text-black/90 sm:text-2xl md:text-3xl">
              {post.title}
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-black/55 sm:text-base">
              {post.excerpt}
            </p>

            <div className="mt-8">
              <BlogContent html={post.contentHtml} />
            </div>
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}
