"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Menu, X } from "lucide-react";
import { siteData, platforms } from "@/data/siteData";
import DownloadMenu from "@/components/layout/DownloadMenu";
import { scrollToElement } from "@/hooks/useSmoothScroll";

const HIDDEN_CLASSES = ["-translate-y-16", "opacity-0", "pointer-events-none"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // Hide-on-scroll writes a class directly to the node rather than going
  // through state, so scrolling never re-renders the header (and its
  // children) on every frame.
  useEffect(() => {
    let ticking = false;

    const apply = () => {
      ticking = false;
      const el = headerRef.current;
      if (!el) return;

      const current = window.scrollY;
      const delta = current - lastScrollY.current;
      if (Math.abs(delta) < 8) return;

      const hide = delta > 0 && current > 80;
      for (const c of HIDDEN_CLASSES) el.classList.toggle(c, hide);

      lastScrollY.current = current;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The classes above are set imperatively and the Navbar lives in the layout,
  // so it never unmounts on navigation. Without this reset, following a link
  // while the header is hidden leaves it invisible AND pointer-events-none on
  // the next page — the nav appears dead.
  // (The drawer itself is closed by each link's own onClick.)
  useEffect(() => {
    headerRef.current?.classList.remove(...HIDDEN_CLASSES);
    lastScrollY.current = window.scrollY;
  }, [pathname]);

  /**
   * In-page links. Lenis owns the scroll position, so a native hash jump is
   * reverted on its next frame; these have to go through scrollToElement.
   */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const hashIndex = href.indexOf("#");
    const base = hashIndex === -1 ? href : href.slice(0, hashIndex) || "/";
    const hash = hashIndex === -1 ? "" : href.slice(hashIndex);

    // Only intercept when the target is on the page we are already viewing.
    if (base !== pathname) return;

    if (hash) {
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      scrollToElement(el, -90);
      window.history.replaceState(null, "", hash);
    } else {
      // "Home" or the logo while already home: go back to the top.
      e.preventDefault();
      scrollToElement(0);
      window.history.replaceState(null, "", base);
    }
    setMobileOpen(false);
  };

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
        ref={headerRef}
        className="fixed top-0 left-0 z-50 w-full translate-y-0 border-b border-black/10 bg-white/95 opacity-100 backdrop-blur transition-all duration-300"
      >
        <div className="mx-auto max-w-[1280px] px-3 md:px-6 lg:px-20">
         <div className="flex items-center justify-between py-5 md:py-6">


            {/* Logo + Name */}
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold tracking-tight text-[#1A1A1A]"
              onClick={(e) => handleNavClick(e, "/")}
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
                  onClick={(e) => handleNavClick(e, n.href)}
                  className="font-semibold text-[#1A1A1A] transition hover:text-[#6B7280]"
                >
                  {n.label}
                </Link>
              ))}
            </nav>


            {/* CTA Button (desktop only) */}
            <div className="hidden items-center gap-3 md:flex">
              <DownloadMenu />

              <Link
                href={siteData.cta.href}
                className="
                  inline-flex rounded-[10px] border-[2.5px] border-[#0F83FF] bg-[#0F83FF] text-white transition active:scale-[0.98] hover:bg-transparent hover:text-[#0F83FF]
                  items-center justify-center gap-2
                  h-[46px] min-w-[130px]
                  px-5
                  text-sm font-semibold leading-none
                "
              >
                {siteData.cta.label}
              </Link>

              <Link
                href={siteData.loginHref}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex rounded-[10px] border-[2.5px] border-[#0F83FF] bg-transparent text-[#0F83FF] transition active:scale-[0.98] hover:bg-[#0F83FF] hover:text-white
                  items-center justify-center gap-2
                  h-[46px] min-w-[100px]
                  pl-3 pr-4
                  text-sm font-semibold leading-none
                "
              >
                <LogIn size={17} />
                Login
              </Link>
            </div>

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
                      onClick={(e) => {
                        closeMobile();
                        handleNavClick(e, n.href);
                      }}
                      className="text-base font-semibold text-[#1A1A1A]"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA + Contact + Socials */}
            <div className="mt-auto px-6 pt-16 pb-10">
              {/* Every platform, not just the App Store */}
              <p className="text-xs font-bold tracking-[0.14em] text-ink/50 uppercase">
                Download for
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {platforms.map((p) => (
                  <li key={p.id}>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobile}
                      className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2.5 text-sm font-semibold text-ink transition active:scale-[0.98]"
                    >
                      <Image
                        src={p.icon}
                        alt=""
                        width={16}
                        height={16}
                        className="h-4 w-4 shrink-0 object-contain invert"
                      />
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-3">
                <Link
                  href={siteData.cta.href}
                  onClick={closeMobile}
                  className="inline-flex h-[46px] flex-1 items-center justify-center rounded-[10px] border-[2.5px] border-[#0F83FF] bg-[#0F83FF] px-3 text-sm font-semibold text-white transition hover:bg-transparent hover:text-[#0F83FF] active:scale-[0.98]"
                >
                  {siteData.cta.label}
                </Link>

                <Link
                  href={siteData.loginHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="inline-flex h-[46px] min-w-[108px] items-center justify-center gap-2 rounded-[10px] border-[2.5px] border-[#0F83FF] bg-transparent px-2.5 text-sm font-semibold text-[#0F83FF] transition hover:bg-[#0F83FF] hover:text-white active:scale-[0.98]"
                >
                  <LogIn size={16} className="shrink-0" />
                  <span>Login</span>
                </Link>
              </div>

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
