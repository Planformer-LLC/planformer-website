"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const MEASUREMENT_ID = "G-SP5MVNQC49";
const ADS_ID = "AW-17660862804";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    planformerGoogleTagInitialized?: boolean;
  }
}

/** One Google tag and one handler for installer/store links on every page. */
export default function WebsiteAnalytics() {
  const pathname = usePathname();
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    window.dataLayer ??= [];
    window.gtag ??= function () {
      // Google documents the command queue as Arguments objects.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    if (!window.planformerGoogleTagInitialized) {
      window.gtag("js", new Date());
      window.gtag("config", ADS_ID);
      window.gtag("config", MEASUREMENT_ID, { send_page_view: false });
      window.planformerGoogleTagInitialized = true;
    }
    if (lastPage.current !== pathname) {
      window.gtag("event", "page_view", {
        send_to: MEASUREMENT_ID,
        page_location: window.location.href,
        page_title: document.title,
      });
      lastPage.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    const trackDownload = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>(
        "a[data-download-platform]",
      );
      if (!link) return;
      window.gtag?.("event", "website_download_click", {
        send_to: MEASUREMENT_ID,
        platform: link.dataset.downloadPlatform,
        button_location: link.dataset.downloadLocation,
        link_url: link.href,
        transport_type: "beacon",
      });
    };
    // Capture before the React menu handler removes the clicked link.
    document.addEventListener("click", trackDownload, true);
    return () => document.removeEventListener("click", trackDownload, true);
  }, []);

  return (
    <Script
      id="planformer-google-tag"
      src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
      strategy="afterInteractive"
    />
  );
}
