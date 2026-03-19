import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Planformer",
  description:
    "Planformer helps contractors and estimators take off faster with streamlined, accurate workflows.",
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
          strategy="beforeInteractive"
        />
        <Script id="google-ads-init" strategy="beforeInteractive">
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
      </head>
      <body className={`${plusJakarta.className} text-[#1A1A1A] antialiased`}>
        {children}
      </body>
    </html>
  );
}
