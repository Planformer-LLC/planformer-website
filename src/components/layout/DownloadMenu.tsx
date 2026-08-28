"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, Download } from "lucide-react";
import { platforms } from "@/data/siteData";

/**
 * Download menu listing every platform Planformer ships on.
 *
 * Replaces the single "Download now" / "Download on App store" button, which
 * undersold four of the five platforms.
 */
export default function DownloadMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[10px] border-[2.5px] border-black/10 bg-white pr-3 pl-4 text-sm leading-none font-semibold text-ink transition hover:border-brand hover:text-brand active:scale-[0.98]"
      >
        <Download size={17} />
        Download
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Choose a platform"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-black/10 bg-white p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.14)]"
        >
          {platforms.map((p) => (
            <a
              key={p.id}
              role="menuitem"
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink transition hover:bg-[#F5F5F5] focus-visible:bg-[#F5F5F5] focus-visible:outline-none"
            >
              {/* The source icons are fill="white" for the dark download
                  cards, so invert them for this light surface. */}
              <Image
                src={p.icon}
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain invert"
              />
              {p.label}
            </a>
          ))}

          <a
            role="menuitem"
            href="/download"
            onClick={() => setOpen(false)}
            className="mt-1 block border-t border-black/5 px-3 py-2.5 text-xs font-semibold text-ink/60 transition hover:text-brand"
          >
            Compare all platforms →
          </a>
        </div>
      ) : null}
    </div>
  );
}
