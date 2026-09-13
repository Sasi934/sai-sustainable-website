import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
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

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Complete Environmental Restoration Solutions | SAI Services | Asbestos Abatement | SAI Sustainable Services Inc.",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "SAI Sustainable Services Inc. offers comprehensive environmental and restoration solutions across Atlantic Canada, including mold removal, asbestos abatement, trauma cleanup, waste disposal, and demolition.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  formatDetection: { telephone: true, address: true, email: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* suppressHydrationWarning: Lenis adds a class to <html> on mount. */
    <html
      lang="en-CA"
      className={`${instrument.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
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
