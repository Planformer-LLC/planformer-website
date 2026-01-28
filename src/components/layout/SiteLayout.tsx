"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useSmoothScroll from "@/hooks/useSmoothScroll";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  useSmoothScroll();

  return (
    <div className="min-h-dvh flex flex-col bg-white text-[#1A1A1A] overflow-x-hidden">
      <header>
        <Navbar />
      </header>

      {/* ✅ main grows and pushes footer down + keeps footer fully scrollable */}
      <main className="flex-1">
        {children}
      </main>

      {/* ✅ footer always visible */}
      
      <Footer />
      
    </div>
  );
}
