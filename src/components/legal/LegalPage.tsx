import React from "react";
import SiteLayout from "@/components/layout/SiteLayout";

/**
 * Shared shell for /privacy and /terms. Styles the plain h2/p/ul/a markup of
 * each page from here, so the documents themselves stay readable as text.
 */
export default function LegalPage({
  title,
  updated,
  replaces,
  children,
}: {
  title: string;
  updated: string;
  replaces: string;
  children: React.ReactNode;
}) {
  return (
    <SiteLayout>
      <section className="bg-[#F5F5F5] pt-36 pb-12 md:pt-44">
        <div className="mx-auto max-w-[820px] px-4">
          <p className="text-xs font-extrabold tracking-[0.16em] text-brand uppercase">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-[15px] text-ink/70">
            Last updated: {updated} · Replaces the version dated {replaces}
          </p>
        </div>
      </section>

      <article
        className="
          mx-auto flex max-w-[820px] flex-col gap-6 px-4 pt-12 pb-24
          text-base leading-[1.75] text-ink/85
          [&_a]:text-[#0062CC] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#004FA6]
          [&_h2]:mt-6 [&_h2]:scroll-mt-28 [&_h2]:text-2xl [&_h2]:leading-snug [&_h2]:font-extrabold [&_h2]:text-ink
          [&_strong]:font-bold [&_strong]:text-ink
          [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:pl-6
          [&_ol]:list-decimal [&_ol]:pl-6
        "
      >
        {children}
      </article>
    </SiteLayout>
  );
}
