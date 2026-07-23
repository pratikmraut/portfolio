import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const description =
  "Backend engineer building reliable banking APIs, developer tools, and automation with Java, Spring Boot, Oracle DB, and modern cloud platforms.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim();
  const requestedHost = forwardedHost ?? requestHeaders.get("host");
  const host =
    requestedHost && /^[a-z0-9.-]+(?::\d{1,5})?$/i.test(requestedHost)
      ? requestedHost
      : undefined;
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") || host?.startsWith("127.0.0.1") ? "http" : "https");
  const siteUrl = host ? `${protocol === "http" ? "http" : "https"}://${host}` : undefined;
  const socialImage = siteUrl ? `${siteUrl}/og.png` : undefined;

  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: {
      default: "Pratik Raut | Backend Engineer",
      template: "%s | Pratik Raut",
    },
    description,
    keywords: [
      "Pratik Raut",
      "Backend Engineer",
      "Java",
      "Spring Boot",
      "Oracle FLEXCUBE",
      "REST APIs",
      "Fintech",
    ],
    authors: [{ name: "Pratik Raut" }],
    creator: "Pratik Raut",
    icons: {
      icon: [
        {
          url: "/pr-favicon.svg?v=20260723",
          type: "image/svg+xml",
          sizes: "any",
        },
      ],
      shortcut: "/pr-favicon.svg?v=20260723",
    },
    robots: { index: true, follow: true },
    alternates: siteUrl ? { canonical: siteUrl } : undefined,
    openGraph: {
      type: "website",
      title: "Pratik Raut | Backend Engineer",
      description,
      siteName: "Pratik Raut Portfolio",
      url: siteUrl,
      images: socialImage
        ? [{ url: socialImage, width: 1731, height: 909, alt: "Pratik Raut — Backend Engineer" }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: "Pratik Raut | Backend Engineer",
      description,
      images: socialImage ? [socialImage] : undefined,
    },
  };
}

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
