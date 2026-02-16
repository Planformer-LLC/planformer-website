"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { siteData } from "@/data/siteData";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScrollY.current;

      if (Math.abs(delta) < 8) return;

      if (current > lastScrollY.current && current > 80) setHidden(true);
      else setHidden(false);

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const ICONS = {
    appStore: "/assets/icons/downloadpageicon/appstore.svg",
    twitterX: "/assets/icons/socialmedia-icons/twitterx.svg",
    instagram: "/assets/icons/socialmedia-icons/insta.svg",
    facebook: "/assets/icons/socialmedia-icons/facebook.svg",
    youtube: "/assets/icons/socialmedia-icons/youtube.svg",
  };

  // ✅ Add Blog link
  const navWithBlog = [...(siteData.nav || []), { label: "Blog", href: "/blog" }];

  return (
    <>
      {/* ✅ White background stays with navbar on scroll */}
      <header
        className={`
          fixed top-0 left-0 z-50 w-full
          transition-all duration-300
          ${hidden ? "pointer-events-none -translate-y-16 opacity-0" : "translate-y-0 opacity-100"}
          bg-white/95 backdrop-blur
          border-b border-black/10
        `}
      >
        <div className="mx-auto max-w-[1100px] px-4 md:px-12 lg:px-14">
         <div className="flex items-center justify-between py-5 md:py-6">


            {/* Logo + Name */}
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold tracking-tight text-[#1A1A1A]"
              onClick={closeMobile}
            >
              <span className="relative h-8 w-8">
                <Image
                  src="/assets/images/home/logo.svg"
                  alt="Planformer logo"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </span>

              <span className="text-[22px] leading-none md:text-[26px]">
                {siteData.name}
              </span>
            </Link>

            {/* Nav links (desktop) */}
           <nav className="hidden items-center gap-6 text-sm md:flex">
  {navWithBlog.map((n) => (
    <Link
      key={n.href}
      href={n.href}
      className="text-[#1A1A1A] font-semibold transition hover:text-[#6B7280]"
    >
      {n.label}
    </Link>
  ))}
</nav>


            {/* CTA Button (desktop only) */}
            <Link
              href={siteData.cta.href}
              className="
                btn-primary !hidden md:!inline-flex
                items-center justify-center gap-2
                !h-[46px] w-[170px]
                !py-0 px-6
                text-sm leading-none
              "
            >
              <Download size={18} />
              {siteData.cta.label}
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex items-center justify-center rounded-lg p-2 text-[#1A1A1A] md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`
          fixed inset-0 z-[60] bg-white md:hidden
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-hidden={!mobileOpen}
      >
        <div className="h-full overflow-y-auto">
          <div className="flex min-h-full flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 pt-6">
              <Link
                href="/"
                className="flex items-center gap-2 font-extrabold tracking-tight text-[#1A1A1A]"
                onClick={closeMobile}
              >
                <span className="relative h-8 w-8">
                  <Image
                    src="/assets/images/home/logo.svg"
                    alt="Planformer logo"
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                </span>
                {siteData.name}
              </Link>

              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex items-center justify-center rounded-lg p-2 text-[#1A1A1A]"
                onClick={closeMobile}
              >
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <nav className="px-6 pt-10">
              <ul className="flex flex-col space-y-10">
                {navWithBlog.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      onClick={closeMobile}
                      className="text-base font-semibold text-[#1A1A1A]"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA + Contact + Socials */}
            <div className="mt-auto px-6 pb-10 pt-48">
              <Link
                href={siteData.cta.href}
                onClick={closeMobile}
                className="btn-primary inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm"
              >
                <span className="relative h-4 w-4">
                  <Image
                    src={ICONS.appStore}
                    alt="App Store"
                    fill
                    sizes="16px"
                    className="object-contain"
                  />
                </span>
                Download on App store
              </Link>

              <div className="pt-8">
                <div className="text-sm font-medium text-[#1A1A1A]">
                  Contact Us
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <a
                    href="mailto:sales@planformer.com"
                    className="text-sm font-semibold text-[#1A1A1A]"
                  >
                    sales@planformer.com
                  </a>
                </div>

                <div className="mt-6 flex items-center gap-6">
                  <a href="#" aria-label="X" className="inline-flex">
                    <span className="relative h-5 w-5">
                      <Image
                        src={ICONS.twitterX}
                        alt="X"
                        fill
                        sizes="20px"
                        className="object-contain"
                      />
                    </span>
                  </a>

                  <a href="#" aria-label="Instagram" className="inline-flex">
                    <span className="relative h-5 w-5">
                      <Image
                        src={ICONS.instagram}
                        alt="Instagram"
                        fill
                        sizes="20px"
                        className="object-contain"
                      />
                    </span>
                  </a>

                  <a href="#" aria-label="Facebook" className="inline-flex">
                    <span className="relative h-5 w-5">
                      <Image
                        src={ICONS.facebook}
                        alt="Facebook"
                        fill
                        sizes="20px"
                        className="object-contain"
                      />
                    </span>
                  </a>

                  <a href="#" aria-label="YouTube" className="inline-flex">
                    <span className="relative h-5 w-5">
                      <Image
                        src={ICONS.youtube}
                        alt="YouTube"
                        fill
                        sizes="20px"
                        className="object-contain"
                      />
                    </span>
                  </a>
                </div>
              </div>

              <div className="h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Removed spacer to eliminate that extra white “3rd background” strip */}
    </>
  );
}
