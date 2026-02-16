import SiteLayout from "@/components/layout/SiteLayout";
import Image from "next/image";
import { notFound } from "next/navigation";

const POSTS = [
  { slug: "blog-post-1", title: "Blog title 1", cover: "/assets/images/blogs/blog1.png" },
  { slug: "blog-post-2", title: "Blog title 2", cover: "/assets/images/blogs/blog1.png" },
  { slug: "blog-post-3", title: "Blog title 3", cover: "/assets/images/blogs/blog1.png" },
  { slug: "blog-post-4", title: "Blog title 4", cover: "/assets/images/blogs/blog1.png" },
  { slug: "blog-post-5", title: "Blog title 5", cover: "/assets/images/blogs/blog1.png" },
  { slug: "blog-post-6", title: "Blog title 6", cover: "/assets/images/blogs/blog1.png" },
];

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

type PageProps = {
  params: { slug: string };
};

export default function BlogDetailsPage({ params }: PageProps) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <SiteLayout>
      <main className="bg-white">
        <div className="mx-auto max-w-5xl px-4 pt-28 md:pt-40">
          <div className="relative aspect-[16/6] w-full overflow-hidden">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
            />
          </div>

          <div className="mx-auto max-w-2xl pb-24 pt-10 md:pt-12">
            <h1 className="text-2xl font-extrabold text-black/90 md:text-3xl">
              {post.title}
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-black/55">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry...
            </p>

            <div className="mt-6 overflow-hidden rounded-md bg-black/15">
              <div className="relative aspect-[16/8] w-full" />
            </div>

            <p className="mt-6 text-sm leading-relaxed text-black/55">
              More dummy content here...
            </p>
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}
