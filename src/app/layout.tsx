import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Sans, Inter } from "next/font/google";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const title = "Mireva Window Studio | Fictional Website Concept by Pegasus Digital";
const description =
  "A fictional made-to-measure blinds website concept for Mireva Window Studio, created by Pegasus Digital as a portfolio demonstration.";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title,
    description,
    siteName: "Mireva Window Studio",
    type: "website",
    images: [
      {
        url: "/images/warm-modern-lounge-with-linen-blinds.webp",
        width: 1672,
        height: 941,
        alt: "Contemporary living room with made-to-measure linen-look roller blinds",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${inter.variable} motion h-full antialiased`}>
      <body className="min-h-full bg-paper font-sans text-body">
        <a
          href="#main"
          className="absolute top-[-60px] left-4 z-[100] bg-black px-4 py-3 font-heading text-sm font-semibold text-white transition-[top] duration-200 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <SiteAnalytics />
        <noscript>
          <style>
            {`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}[data-reveal] img{scale:1!important}`}
          </style>
        </noscript>
      </body>
    </html>
  );
}
