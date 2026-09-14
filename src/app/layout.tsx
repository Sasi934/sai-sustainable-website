import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Cursor from "@/components/motion/Cursor";
import PageTransition from "@/components/motion/PageTransition";
import { JsonLd, localBusinessSchema } from "@/lib/schema";
import { SITE_URL, SITE_NAME, GA_ID } from "@/lib/site";

/*
  ONE typeface for the whole site — navigation, headings, body, buttons, forms,
  footer. Hierarchy comes from size, weight, tracking and leading only.
  Variable font, so every weight ships in a single file.
*/
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "SAI Group — Environmental Restoration, Global Trade (EXIM) & IT/AI Solutions | SAI Sustainable Services Inc.",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "SAI Group brings together three divisions: Environmental, Restoration & Manpower; EXIM global sourcing and trade; and IT Solutions for web, software, AI and AI road defect detection.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  formatDetection: { telephone: true, address: true, email: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* suppressHydrationWarning: Lenis adds a class to <html> on mount. */
    <html lang="en-CA" className={geist.variable} suppressHydrationWarning>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>

        <SmoothScroll>
          <ScrollProgress />
          <Cursor />
          <PageTransition />

          {/*
            TopBar and Header are siblings in normal flow, deliberately. Wrapping a
            position:sticky element in a short container confines it to that
            container's box, so the header scrolls away instead of sticking.
          */}
          <TopBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>

        <JsonLd data={localBusinessSchema()} />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
