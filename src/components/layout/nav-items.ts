/**
 * Primary navigation — exact top-level structure from the 2026-09-14 brief:
 * Home · About SAI · Divisions ▾ · Projects · Careers · Blog · Contact · [Get a Quote]
 * "Divisions" has no page of its own; it opens the division menu.
 */
export type NavItem = { label: string; href: string; menu?: "divisions" };

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About SAI", href: "/about-us" },
  { label: "Divisions", href: "/#divisions", menu: "divisions" },
  { label: "Projects", href: "/projects" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog-list" },
  { label: "Contact", href: "/contact-us" },
];

export const quoteCta = { label: "Get a Quote", href: "/contact-us" };

/** Footer utility menu — brief 2026-09-14. */
export const footerMenu = [
  { label: "Services", href: "/services" },
  { label: "Sectors", href: "/sectors" },
  { label: "Certifications", href: "/certifications" },
  { label: "Partners", href: "/partners" },
  { label: "Vendor Registration", href: "/vendor-registration" },
  { label: "Downloads", href: "/downloads" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];
