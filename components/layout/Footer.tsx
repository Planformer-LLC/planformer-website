import { siteData } from "@/data/siteData";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 py-10">
      <div className="mx-auto max-w-6xl px-4 text-sm text-black/70">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {siteData.name}. All rights reserved.</p>
          <p>sales@planformer.com</p>
        </div>
      </div>
    </footer>
  );
}
