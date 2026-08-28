import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { siteData } from "@/data/siteData";
import {
  jsonLd,
  organizationSchema,
  websiteSchema,
} from "@/lib/structuredData";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  // Plus Jakarta Sans tops out at 800, so the 900 weight can never actually
  // load. Headings use font-extrabold rather than relying on synthesis.
  weight: ["400", "600", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteData.url),
  title: {
    default:
      "Planformer — Construction Takeoff & Estimating Software for Mac, Windows, iOS & Android",
    template: "%s | Planformer",
  },
  description:
    "Turn a PDF plan set into quantities, assemblies and a priced estimate the same afternoon. Measure, estimate and export to Excel on desktop, tablet or phone — even offline.",
  applicationName: siteData.name,
  keywords: [
    "construction takeoff software",
    "estimating software",
    "PDF takeoff",
    "quantity takeoff",
    "construction estimating app",
    "digital takeoff",
    "contractor estimating",
  ],
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: siteData.name,
    url: siteData.url,
    title:
      "Planformer — Construction Takeoff & Estimating on Every Platform",
    description:
      "Turn a PDF plan set into quantities, assemblies and a priced estimate the same afternoon.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Planformer — Construction Takeoff & Estimating on Every Platform",
    description:
      "Turn a PDF plan set into quantities, assemblies and a priced estimate the same afternoon.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="google-ads-tag"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17660862804"
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'AW-17660862804');`}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "vr7wf3i6pp");`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organizationSchema())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(websiteSchema())}
        />
      </head>
      <body className={`${plusJakarta.className} text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
