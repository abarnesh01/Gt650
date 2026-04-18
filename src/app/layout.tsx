import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Continental GT 650 | Royal Enfield — Configurator",
  description:
    "Experience the Royal Enfield Continental GT 650. Premium motorcycle configurator with real studio photography, cinematic animations, and interactive exploration.",
  keywords: "Royal Enfield, Continental GT 650, motorcycle, configurator, cafe racer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body
        className="min-h-full"
        style={{
          fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
