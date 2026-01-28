import Image from "next/image";
import Link from "next/link";
import { siteData } from "@/data/siteData";
import { Download } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      {/* ✅ more bottom padding on mobile, keep desktop same */}
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-20 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-2 font-extrabold text-[#1A1A1A]">
              <span className="relative h-8 w-8">
                <Image
                  src="/assets/images/home/logo.svg"
                  alt="Planformer logo"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </span>

              <span className="text-[28px] leading-none md:text-[30px]">
                {siteData.name}
              </span>
            </div>

            <p className="mt-6 max-w-[360px] text-sm leading-snug text-[#1A1A1A]">
              Measure, estimate, and plan faster with a streamlined, accurate
              workflow anywhere you work.
            </p>

            <div className="mt-6 flex items-center gap-8">
              <Link href="#" aria-label="X" className="group">
                <Image
                  src="/assets/icons/socialmedia-icons/twitterx.svg"
                  alt="X"
                  width={20}
                  height={20}
                  className="h-5 w-5 transition-opacity group-hover:opacity-60"
                  style={{ filter: "brightness(0)" }}
                />
              </Link>

              <Link href="#" aria-label="Instagram" className="group">
                <Image
                  src="/assets/icons/socialmedia-icons/insta.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="h-5 w-5 transition-opacity group-hover:opacity-60"
                  style={{ filter: "brightness(0)" }}
                />
              </Link>

              <Link href="#" aria-label="Facebook" className="group">
                <Image
                  src="/assets/icons/socialmedia-icons/facebook.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="h-5 w-5 transition-opacity group-hover:opacity-60"
                  style={{ filter: "brightness(0)" }}
                />
              </Link>

              <Link href="#" aria-label="YouTube" className="group">
                <Image
                  src="/assets/icons/socialmedia-icons/youtube.svg"
                  alt="YouTube"
                  width={20}
                  height={20}
                  className="h-5 w-5 transition-opacity group-hover:opacity-60"
                  style={{ filter: "brightness(0)" }}
                />
              </Link>
            </div>
          </div>

          {/* CENTER */}
          <div className="md:justify-self-center">
            <p className="text-sm font-extrabold text-[#1A1A1A]">Company</p>
            <div className="mt-3 grid gap-2 text-sm text-[#1A1A1A]/70">
              <Link href="/about" className="hover:text-[#1A1A1A]">
                About
              </Link>
              <Link href="/download" className="hover:text-[#1A1A1A]">
                Trades
              </Link>
              <Link href="/contact" className="hover:text-[#1A1A1A]">
                Contact
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:justify-self-end md:text-right">
            {/* ✅ Mobile full width button like screenshot */}
            <Link
              href="/download"
              className="btn-primary inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-xl px-6 md:h-[46px] md:w-auto"
            >
              <Download className="h-4 w-4" />
              <span>Download now</span>
            </Link>

            {/* Contact info */}
            <div className="mt-10 md:flex md:flex-col md:items-start">
              <div className="md:text-left">
                <p className="text-sm text-[#1A1A1A]/60">Contact Us</p>
                <p className="mt-3 text-sm font-semibold text-[#1A1A1A]">
                  {siteData.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
