import type { Metadata, Viewport } from "next";
import "./globals.css";

const description =
  "Backend and payments engineer building reliable payment and core-banking APIs with Java, Spring, Oracle FLEXCUBE, OBPM, NEFT, and ACH.";
const defaultSiteUrl = "https://pratikmraut.github.io/portfolio/";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl;
const siteUrl = new URL(
  configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`,
);
const publicUrl = (asset: string) => new URL(asset, siteUrl).toString();
const socialImageUrl = `${publicUrl("og.png")}?v=20260801`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Pratik Raut | Backend & Payments Engineer",
    template: "%s | Pratik Raut",
  },
  description,
  keywords: [
    "Pratik Raut",
    "Backend Engineer",
    "Payments Engineer",
    "Java",
    "Spring",
    "Oracle FLEXCUBE",
    "Oracle Banking Payments",
    "OBPM",
    "NEFT",
    "ACH",
    "REST APIs",
    "Fintech",
  ],
  authors: [{ name: "Pratik Raut" }],
  creator: "Pratik Raut",
  icons: {
    icon: [
      {
        url: `${publicUrl("pr-favicon.svg")}?v=20260723`,
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
    shortcut: `${publicUrl("pr-favicon.svg")}?v=20260723`,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    title: "Pratik Raut | Backend & Payments Engineer",
    description,
    siteName: "Pratik Raut Portfolio",
    url: siteUrl,
    images: [
      {
        url: socialImageUrl,
        width: 1735,
        height: 907,
        alt: "Pratik Raut — Backend and Payments Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratik Raut | Backend & Payments Engineer",
    description,
    images: [socialImageUrl],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020604",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
