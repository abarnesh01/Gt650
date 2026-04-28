import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gt650-indol.vercel.app"),
  title: "Continental GT 650 — Premium 3D Experience | Royal Enfield",
  description:
    "Explore the Royal Enfield Continental GT 650 in a cinematic interactive configurator. Real studio photography, immersive 3D scroll animations, and 5 signature color finishes.",
  keywords:
    "Royal Enfield, Continental GT 650, motorcycle, configurator, cafe racer, 3D experience, premium, interactive",
  authors: [{ name: "Royal Enfield" }],
  creator: "Royal Enfield",
  publisher: "Royal Enfield",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gt650-indol.vercel.app",
    siteName: "Royal Enfield Continental GT 650",
    title: "Continental GT 650 — Premium 3D Experience",
    description:
      "Explore the Royal Enfield Continental GT 650 in a cinematic interactive configurator with real studio photography and immersive animations.",
    images: [
      {
        url: "/images/british_racing_green.webp",
        width: 1024,
        height: 1024,
        alt: "Royal Enfield Continental GT 650 — British Racing Green",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Continental GT 650 — Premium 3D Experience",
    description:
      "Explore the Royal Enfield Continental GT 650 in a cinematic interactive configurator.",
    images: ["/images/british_racing_green.webp"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import { ExperienceProvider } from "@/context/ExperienceContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/images/british_racing_green.webp" type="image/webp" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.onerror = function(msg, url, line, col, error) {
              if (msg.indexOf('ChunkLoadError') > -1 || msg.indexOf('Loading chunk') > -1) {
                window.location.reload();
              }
            };
          `
        }} />
      </head>
      <body
        className="min-h-full"
        style={{
          fontFamily:
            "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <ExperienceProvider>
          {children}
        </ExperienceProvider>
      </body>
    </html>
  );
}
