// import SiteLayout from "@/components/layout/SiteLayout";
// import Image from "next/image";
// import Link from "next/link";

// type BlogPost = {
//   id: string;
//   slug: string; // \u2705 added
//   title: string;
//   date: string;
//   readTime: string;
//   cover: string;
// };

// const POSTS: BlogPost[] = [
//   {
//     id: "1",
//     slug: "blog-post-1", // \u2705 added
//     title: "Blog post title",
//     date: "Feb 5, 2026",
//     readTime: "15 min",
//     cover: "/assets/images/blogs/blog1.png",
//   },
//   {
//     id: "2",
//     slug: "blog-post-2", // \u2705 added
//     title: "Blog post title",
//     date: "Feb 5, 2026",
//     readTime: "15 min",
//     cover: "/assets/images/blogs/blog1.png",
//   },
//   {
//     id: "3",
//     slug: "blog-post-3", // \u2705 added
//     title: "Blog post title",
//     date: "Feb 5, 2026",
//     readTime: "15 min",
//     cover: "/assets/images/blogs/blog1.png",
//   },
//   {
//     id: "4",
//     slug: "blog-post-4", // \u2705 added
//     title: "Blog post title",
//     date: "Feb 5, 2026",
//     readTime: "15 min",
//     cover: "/assets/images/blogs/blog1.png",
//   },
//   {
//     id: "5",
//     slug: "blog-post-5", // \u2705 added
//     title: "Blog post title",
//     date: "Feb 5, 2026",
//     readTime: "15 min",
//     cover: "/assets/images/blogs/blog1.png",
//   },
//   {
//     id: "6",
//     slug: "blog-post-6", // \u2705 added
//     title: "Blog post title",
//     date: "Feb 5, 2026",
//     readTime: "15 min",
//     cover: "/assets/images/blogs/blog1.png",
//   },
// ];

// function BlogCard({ post }: { post: BlogPost }) {
//   return (
//     <Link href={`/blog/${post.slug}`} className="block">
//       <article className="group">
//         {/* \u2705 White card ONLY behind image + meta + title */}
//         <div className="rounded-2xl bg-white p-2.5 shadow-sm ring-1 ring-black/5">
//           {/* Image */}
//           <div className="relative w-full overflow-hidden rounded-xl">
//             <div className="relative aspect-[4/3] w-full">
//               <Image
//                 src={post.cover}
//                 alt={post.title}
//                 fill
//                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                 className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
//                 priority={false}
//               />
//             </div>
//           </div>

//           {/* Meta + Title */}
//           <div className="pt-4">
//             <div className="flex items-center justify-between text-xs text-black/45">
//               <span>{post.date}</span>
//               <span>{post.readTime}</span>
//             </div>

//             <h3 className="mt-2 text-[15px] font-semibold text-black/80">
//               {post.title}
//             </h3>
//           </div>
//         </div>
//       </article>
//     </Link>
//   );
// }

// export default function BlogPage() {
//   return (
//     <SiteLayout>
//       <main className="min-h-screen bg-[#F5F5F5] font-plusJakarta">
//         {/* spacing so it looks clean under fixed navbar */}
//         <section className="mx-auto max-w-[1240px] px-2 sm:px-4 lg:px-6  pb-24 pt-32 md:pb-28 md:pt-44">
//           {/* Header */}
//           <div className="max-w-xl">
//             <h1 className="text-[34px] font-extrabold tracking-tight text-black/90 md:text-[40px]">
//               Blog
//             </h1>

//             <p className="mt-3 text-[14px] leading-relaxed text-black/55 md:text-[15px]">
//               Product news and best practices for teams <br />
//               building with Planformer.
//             </p>

//             {/* Search */}
//             <div className="mt-5">
//               <div className="relative w-full sm:max-w-[460px]">
//                 <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35">
//                   <svg
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     aria-hidden="true"
//                   >
//                     <path
//                       d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     />
//                     <path
//                       d="M21 21l-4.3-4.3"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                     />
//                   </svg>
//                 </span>

//                 <input
//                   type="text"
//                   placeholder="Search"
//                   className="h-11 w-full rounded-xl border border-black/10 bg-white pl-9 pr-3 text-sm text-black/80 placeholder:text-black/35 outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Grid */}
//           <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {POSTS.map((post) => (
//               <BlogCard key={post.id} post={post} />
//             ))}
//           </div>
//         </section>
//       </main>
//     </SiteLayout>
//   );
// }

export default function BlogPage() {
    return null;
}
