import Link from "next/link";
import { siteData } from "@/data/siteData";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="inline-block h-7 w-7 rounded-md bg-blue-600" />
          {siteData.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {siteData.nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-black/70 hover:text-black">
              {n.label}
            </Link>
          ))}
        </nav>

        <a href={siteData.cta.href} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          {siteData.cta.label}
        </a>
      </div>
    </header>
  );
}
