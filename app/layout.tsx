import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./global-vaults.css";

const BASE_URL = "https://myvaulterly.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vaulterly — Save Smarter",
    template: "%s — Vaulterly",
  },
  description: "Save smarter. Find faster. Your links, organized for life.",
  openGraph: {
    title: "Vaulterly — Save Smarter",
    description: "Save smarter. Find faster. Your links, organized for life.",
    url: BASE_URL,
    siteName: "Vaulterly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaulterly — Save Smarter",
    description: "Save smarter. Find faster. Your links, organized for life.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}