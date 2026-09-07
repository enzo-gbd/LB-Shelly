import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const title = "S’adapter ou devenir invisible ? — Livre blanc de Shelly Sarkar";
const description =
  "Comment faire évoluer une marque pour enfants sans perdre son ADN ? Une réflexion sur la nostalgie des parents, les nouvelles générations et l’évolution des marques jeunesse.";
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Livre blanc — Shelly Sarkar",
  authors: [{ name: "Shelly Sarkar" }],
  creator: "Shelly Sarkar",
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title,
    description,
    siteName: "Livre blanc de Shelly Sarkar",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8eddf3",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
