export const siteData = {
  name: "Planformer",
  url: "https://planformer.com",
  nav: [
    { label: "Home", href: "/" },
    { label: "Try it", href: "/#try-it" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Start free", href: "/download" },
  loginHref: "https://app.planformer.com/onboarding_screen",
  email: "sales@planformer.com",
  // Displayed in the hero stat row. No ratingCount is recorded here, so the
  // SoftwareApplication JSON-LD deliberately omits aggregateRating — Google
  // requires a count, and inventing one risks a manual action.
  rating: { value: 4.8 },
  social: [
    "https://x.com/Planformer",
    "https://www.instagram.com/planformer/",
    "https://www.facebook.com/profile.php?id=61584807632276",
    "https://www.youtube.com/channel/UC0dFj16ro_cHa2pd9y4Q29A",
  ],
} as const;

/**
 * Every platform Planformer ships on. Single source of truth for the header
 * dropdown, the download page and the SoftwareApplication JSON-LD.
 */
export const platforms = [
  {
    id: "macos",
    label: "macOS",
    icon: "/assets/icons/downloadpageicon/apple.svg",
    href: "https://firebasestorage.googleapis.com/v0/b/planformer-3408e.firebasestorage.app/o/releases%2Fmacos%2Fdownload%2F0.0.12%2B19%2FPlanformer.dmg?alt=media",
    schemaName: "macOS",
  },
  {
    id: "windows",
    label: "Windows",
    icon: "/assets/icons/downloadpageicon/window.svg",
    href: "https://storage.googleapis.com/planformer-3408e.firebasestorage.app/releases/windows/planformer.appinstaller",
    schemaName: "Windows",
  },
  {
    id: "ios",
    label: "iPhone",
    icon: "/assets/icons/downloadpageicon/appstore.svg",
    href: "https://apps.apple.com/pk/app/planformer-smart-takeoffs/id6741836313",
    schemaName: "iOS",
  },
  {
    id: "ipad",
    label: "iPad",
    icon: "/assets/icons/downloadpageicon/appstore.svg",
    href: "https://apps.apple.com/pk/app/planformer-smart-takeoffs/id6741836313",
    schemaName: "iPadOS",
  },
  {
    id: "android",
    label: "Android",
    icon: "/assets/icons/downloadpageicon/playstore.svg",
    href: "https://play.google.com/store/apps/details?id=com.planformer.app&pcampaignid=web_share",
    schemaName: "Android",
  },
] as const;
