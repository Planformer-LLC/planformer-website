import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import { BlogCard } from "@/components/blog/BlogCard";
import { getPublishedBlogList } from "@/lib/blog";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Planformer Blog",
  description:
    "Product news and best practices for teams building with Planformer.",
};

type BlogPageProps = {
  searchParams?: Promise<{
    q?: string;
    page?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const searchQuery = (resolvedSearchParams.q ?? "").trim();
  const page = Number.parseInt(resolvedSearchParams.page ?? "1", 10) || 1;
  const result = await getPublishedBlogList(searchQuery, page);

  return (
    <SiteLayout>
      <main
        className="min-h-screen bg-[#F5F5F5] font-plusJakarta"
        style={{
          backgroundImage: "url('/assets/bg/bg3.svg')",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          backgroundSize: "auto",
        }}
      >
        <section className="mx-auto max-w-[1240px] px-2 pb-24 pt-32 sm:px-4 md:pb-28 md:pt-44 lg:px-6">
          <div className="max-w-xl">
            <h1 className="text-[34px] font-extrabold tracking-tight text-black/90 md:text-[40px]">
              Blog
            </h1>

            <p className="mt-3 text-[14px] leading-relaxed text-black/55 md:text-[15px]">
              Product news and best practices for teams <br />
              building with Planformer.
            </p>

            <form className="mt-5" action="/blog" method="get">
              <div className="relative w-full sm:max-w-[460px]">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M21 21l-4.3-4.3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <input
                  name="q"
                  type="text"
                  placeholder="Search"
                  defaultValue={result.query}
                  className="h-11 w-full rounded-xl border border-black/10 bg-white pl-9 pr-3 text-sm text-black/80 placeholder:text-black/35 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5"
                />
              </div>
            </form>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {result.posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {result.posts.length === 0 && (
            <div className="mt-12 rounded-2xl bg-white/80 p-8 text-sm text-black/55 ring-1 ring-black/5">
              No published blog posts matched your search.
            </div>
          )}

          {(page > 1 || result.hasNextPage) && (
            <div className="mt-10 flex items-center justify-between">
              {page > 1 ? (
                <a
                  href={`/blog?${new URLSearchParams({
                    ...(result.query ? { q: result.query } : {}),
                    page: String(page - 1),
                  }).toString()}`}
                  className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/70"
                >
                  Previous
                </a>
              ) : (
                <span />
              )}

              {result.hasNextPage ? (
                <a
                  href={`/blog?${new URLSearchParams({
                    ...(result.query ? { q: result.query } : {}),
                    page: String(page + 1),
                  }).toString()}`}
                  className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/70"
                >
                  Next
                </a>
              ) : (
                <span />
              )}
            </div>
          )}
        </section>
      </main>
    </SiteLayout>
  );
}
