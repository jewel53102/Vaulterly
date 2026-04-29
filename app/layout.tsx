import type { Metadata } from "next";
import "./globals.css";
import "./global-vaults.css";

export const metadata: Metadata = {
  title: "Vaulterly - Save Smarter",
  description: "Save smarter. Find faster. Your links, organized for life",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}