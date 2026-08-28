import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";

/**
 * Server component. Keeping this off the client means the client boundary
 * starts at the interactive leaves (Navbar, SmoothScroll) rather than at the
 * top of every route.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden bg-white text-ink">
      <SmoothScroll />

      <header>
        <Navbar />
      </header>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
