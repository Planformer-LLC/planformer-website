import Link from "next/link";
import { BlogPost, formatBlogDate } from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="group">
        <div className="rounded-2xl bg-white p-2.5 shadow-sm ring-1 ring-black/5">
          <div className="relative w-full overflow-hidden rounded-xl">
            <div className="relative aspect-[4/3] w-full">
              <img
                src={post.coverImage.url}
                alt={post.coverImage.alt || post.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between text-xs text-black/45">
              <span>{formatBlogDate(post.publishAt || post.firstPublishedAt)}</span>
              <span>{post.readTimeMinutes} min</span>
            </div>

            <h3 className="mt-2 text-[15px] font-semibold text-black/80">
              {post.title}
            </h3>
          </div>
        </div>
      </article>
    </Link>
  );
}
