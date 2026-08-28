import { siteData, platforms } from "@/data/siteData";

/**
 * JSON-LD builders.
 *
 * Note on ratings: Google requires a rating COUNT alongside a rating value in
 * `aggregateRating`, and issues manual actions for review markup that isn't
 * substantiated by visible on-page reviews. We display a 4.8 in the hero but
 * have no verified count, so `aggregateRating` is deliberately omitted. Add it
 * here once a real review count is available.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteData.url}/#organization`,
    name: siteData.name,
    url: siteData.url,
    logo: `${siteData.url}/assets/images/home/logo.svg`,
    email: siteData.email,
    sameAs: [...siteData.social],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteData.url}/#website`,
    name: siteData.name,
    url: siteData.url,
    publisher: { "@id": `${siteData.url}/#organization` },
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteData.url}/#app`,
    name: siteData.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Construction Estimating Software",
    operatingSystem: platforms.map((p) => p.schemaName).join(", "),
    url: siteData.url,
    downloadUrl: `${siteData.url}/download`,
    publisher: { "@id": `${siteData.url}/#organization` },
    description:
      "Construction takeoff and estimating software. Turn a PDF plan set into quantities, assemblies and a priced estimate, then export to Excel. Works offline on desktop, tablet and phone.",
    featureList: [
      "PDF plan takeoff",
      "Area, linear and count measurements",
      "Scale calibration",
      "Material and labor assemblies",
      "Cost estimating",
      "Excel export",
      "Offline use",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free trial",
    },
  };
}

/** Serialise for a <script type="application/ld+json"> tag. */
export function jsonLd(schema: object) {
  return { __html: JSON.stringify(schema) };
}
