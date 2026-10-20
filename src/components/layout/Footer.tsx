import Image from "next/image";
import Link from "next/link";
import { siteData } from "@/data/siteData";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Pricing", href: "/#pricing" },
      { label: "Download", href: "/download" },
      { label: "Start free trial", href: siteData.signupHref },
      { label: "Log in", href: siteData.loginHref },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const social = [
  { label: "X", href: "https://x.com/Planformer" },
  { label: "Instagram", href: "https://www.instagram.com/planformer/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61584807632276" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UC0dFj16ro_cHa2pd9y4Q29A" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-dark pt-16 pb-10 text-[#C9CED6] md:pt-[72px]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))] lg:gap-16">
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 text-white">
              <Image
                src="/assets/images/home/logo.svg"
                alt=""
                width={21}
                height={28}
                className="h-7 w-auto"
              />
              <span className="text-xl font-extrabold">{siteData.name}</span>
            </Link>
            <p className="max-w-[320px] text-[15px] leading-relaxed">
              Measure, estimate and plan faster with an accurate workflow,
              wherever you work.
            </p>
            <a
              href={`mailto:${siteData.email}`}
              className="w-fit text-[15px] font-semibold text-white hover:underline"
            >
              {siteData.email}
            </a>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
              <p className="text-[13px] font-bold tracking-[0.1em] text-white uppercase">
                {col.title}
              </p>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="w-fit text-[15px] text-[#C9CED6] transition hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-[#333B48] pt-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Planformer LLC · 1342 Boxwood Drive, W Hewlett, NY 11557</p>
          <ul className="flex flex-wrap gap-4">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9CED6] underline-offset-4 hover:text-white hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
