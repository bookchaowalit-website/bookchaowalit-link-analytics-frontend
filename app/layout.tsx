import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Link Analytics | Bookchaowalit",
  description: "Click stats for short links (sample).",
  keywords: ["link-analytics", "metrics"],
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "Bookchaowalit",
  metadataBase: new URL("https://bookchaowalit.com"),
  openGraph: {
    type: "website",
    title: "Link Analytics | Bookchaowalit",
    description: "Click stats for short links (sample).",
    siteName: "Bookchaowalit",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* THESIS: make sample attention data readable without pretending it is a production dashboard.
OWN-WORLD: a printed click ledger on warm paper, with rust stamps, blue bars, and marked short-link rows.
STORY: set a reporting window, read the headline totals, inspect the volume trace, then select one link record.
FIRST VIEWPORT: the report status, sample boundary, window switcher, and first metrics establish context before detail.
FORM: ledger rules, report stamps, bar traces, and short-link rows replace generic SaaS chrome.
SEED: assigned direction 4 · operate mode.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance */}
        {children}
      </body>
    </html>
  );
}
