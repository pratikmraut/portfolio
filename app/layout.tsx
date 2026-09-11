import type { Metadata, Viewport } from "next";
import "./globals.css";

const description =
  "Java backend engineer building reliable core-banking and payment APIs with Spring Boot, Oracle FLEXCUBE, OBPM, NEFT, RTGS, and IMPS.";
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
    default: "Pratik Raut | Java Backend Engineer",
    template: "%s | Pratik Raut",
  },
  description,
  keywords: [
    "Pratik Raut",
    "Backend Engineer",
    "Core Banking",
    "Payments",
    "Java",
    "Spring",
    "Oracle FLEXCUBE",
    "Oracle Banking Payments",
    "OBPM",
    "NEFT",
    "RTGS",
    "IMPS",
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
    title: "Pratik Raut | Java Backend Engineer",
    description,
    siteName: "Pratik Raut Portfolio",
    url: siteUrl,
    images: [
      {
        url: socialImageUrl,
        width: 1735,
        height: 907,
        alt: "Pratik Raut — Java Backend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratik Raut | Java Backend Engineer",
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
      <head>
        {/* Register before the runtime: window popstate listeners run in registration order. */}
        <script id="portfolio-section-history" dangerouslySetInnerHTML={{ __html: `
          (() => {
            const documentUrl = location.pathname + location.search;
            window.addEventListener("popstate", (event) => {
              if (location.pathname + location.search !== documentUrl) return;
              let id;
              try { id = decodeURIComponent(location.hash.slice(1)) || "top"; }
              catch { return; }
              if (!document.getElementById(id)) return;
              event.stopImmediatePropagation();
              window.dispatchEvent(new CustomEvent("portfolio:history-navigation", { detail: id }));
            });
          })();
        ` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
