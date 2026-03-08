import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BlogContent } from "@/components/blog/BlogContent";
import SiteLayout from "@/components/layout/SiteLayout";
import { getPreviewBlogPostFromToken } from "@/lib/blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PreviewPageProps = {
  params: Promise<{ token: string }>;
};

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function BlogPreviewPage({ params }: PreviewPageProps) {
  const { token } = await params;
  const post = await getPreviewBlogPostFromToken(token).catch(() => null);
  if (!post) return notFound();

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
        <div className="mx-auto max-w-[1240px] px-0 pt-32 sm:px-4 sm:pt-40 lg:px-6">
          <div className="relative w-full overflow-hidden sm:rounded-sm">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/7] md:aspect-[16/6]">
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt || post.title}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 900px, 1240px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-0 sm:pb-24 sm:pt-10 md:pt-12">
            <div className="mb-4 inline-flex rounded-full bg-[#0F83FF]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0F83FF]">
              Draft Preview
            </div>

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
