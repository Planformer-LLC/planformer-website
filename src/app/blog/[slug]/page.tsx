// import SiteLayout from "@/components/layout/SiteLayout";
// import Image from "next/image";
// import { notFound } from "next/navigation";

// export const dynamicParams = false;

// const POSTS = [
//   { slug: "blog-post-1", title: "Blog title 1", cover: "/assets/images/blogs/blog1.png" },
//   { slug: "blog-post-2", title: "Blog title 2", cover: "/assets/images/blogs/blog1.png" },
//   { slug: "blog-post-3", title: "Blog title 3", cover: "/assets/images/blogs/blog1.png" },
//   { slug: "blog-post-4", title: "Blog title 4", cover: "/assets/images/blogs/blog1.png" },
//   { slug: "blog-post-5", title: "Blog title 5", cover: "/assets/images/blogs/blog1.png" },
//   { slug: "blog-post-6", title: "Blog title 6", cover: "/assets/images/blogs/blog1.png" },
// ];

// export function generateStaticParams() {
//   return POSTS.map((p) => ({ slug: p.slug }));
// }

// export default async function BlogDetailsPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const post = POSTS.find((p) => p.slug === slug);
//   if (!post) return notFound();

//   return (
//     <SiteLayout>
//       <main className="bg-white">
//         {/* ✅ NO padding on mobile, padding starts from sm+ */}
//        <div className="mx-auto max-w-[1240px] px-0 sm:px-4 lg:px-6 pt-32 sm:pt-28 md:pt-50">

//           {/* ✅ Mobile: full-bleed image (touches left/right) */}
//           <div className="relative w-full overflow-hidden sm:rounded-sm">
//             <div className="relative aspect-[4/3] sm:aspect-[16/7] md:aspect-[16/6] w-full">
//               <Image
//                 src={post.cover}
//                 alt={post.title}
//                 fill
//                 priority
//                 quality={100}
//                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 900px, 1240px"
//                 className="object-cover"
//               />
//             </div>
//           </div>

//           {/* ✅ Content gets padding on mobile while image stays edge-to-edge */}
//           <div className="mx-auto max-w-3xl px-4 sm:px-0 pb-20 pt-8 sm:pb-24 sm:pt-10 md:pt-12">
//             <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-black/90">
//               {post.title}
//             </h1>

//             <p className="mt-4 text-sm sm:text-base leading-relaxed text-black/55">
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry...
//               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
//             </p>

//             <p className="mt-4 text-sm sm:text-base leading-relaxed text-black/55">
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry...
//               It has survived not only five centuries, but also the leap into electronic typesetting...
//             </p>

//             {/* ✅ Bigger "video" container height like your 3rd screenshot */}
//             <div className="mt-6 overflow-hidden rounded-md bg-black/15">
//               <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/8]" />
//             </div>

//             <p className="mt-6 text-sm sm:text-base leading-relaxed text-black/55">
//               More dummy content here...
//             </p>

//             <p className="mt-4 text-sm sm:text-base leading-relaxed text-black/55">
//               More dummy content here...
//             </p>
//           </div>
//         </div>
//       </main>
//     </SiteLayout>
//   );
// }
