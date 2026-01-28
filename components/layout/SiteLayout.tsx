"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useSmoothScroll from "@/hooks/useSmoothScroll";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  useSmoothScroll();

  return (
    <div className="min-h-dvh bg-white text-black">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
