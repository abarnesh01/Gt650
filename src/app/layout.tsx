import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aura | Perfection Reimagined",
  description: "Experience the future of spatial audio with Aura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#050505] selection:bg-white/20">
        {children}
      </body>
    </html>
  );
}
