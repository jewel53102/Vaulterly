import type { Metadata } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import "./globals.css";
import "./global-vaults.css";
import SiteFooter from "@/app/components/SiteFooter";
import CookieBanner from "@/app/components/CookieBanner";
import ConsentAnalytics from "@/app/components/ConsentAnalytics";

const GA_ID = "G-Z0B6DML84G";

const BASE_URL = "https://myvaulterly.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vaulterly — Free Research Organizer for Students",
    template: "%s | Vaulterly",
  },
  description:
    "Save your sources, notes, and links in one vault. Organize by class or project. Drop your research into ChatGPT or Claude to write better essays. Free.",
  openGraph: {
    title: "Vaulterly — Free Research Organizer for Students",
    description:
      "Save your sources, notes, and links in one vault. Organize by class or project. Drop your research into ChatGPT or Claude to write better essays. Free.",
    url: BASE_URL,
    siteName: "Vaulterly",
    type: "website",
    images: [
      {
        url: "/api/og?title=Vaulterly+%E2%80%94+Free+Research+Organizer+for+Students&description=Save+your+sources%2C+notes%2C+and+links+in+one+vault.+Drop+your+research+into+ChatGPT+or+Claude+to+write+better+essays.",
        width: 1200,
        height: 630,
        alt: "Vaulterly — Free Research Organizer for Students",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MyVaulterly",
    title: "Vaulterly — Free Research Organizer for Students",
    description:
      "Save your sources, notes, and links in one vault. Organize by class or project. Drop your research into ChatGPT or Claude to write better essays. Free.",
    images: [
      "/api/og?title=Vaulterly+%E2%80%94+Free+Research+Organizer+for+Students&description=Save+your+sources%2C+notes%2C+and+links+in+one+vault.+Drop+your+research+into+ChatGPT+or+Claude+to+write+better+essays.",
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = (await headers()).get("x-nonce") ?? "";

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Vaulterly",
              url: "https://myvaulterly.com",
              description:
                "Free research organizer for students. Save sources, notes, and links in one vault. Organize by class or project.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://myvaulterly.com/explore?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Vaulterly",
              url: "https://myvaulterly.com",
              applicationCategory: "EducationApplication",
              operatingSystem: "Web",
              description:
                "Save your sources, notes, and links in one vault. Organize by class or project. Drop your research into ChatGPT or Claude to write better essays.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
        {children}
        <SiteFooter />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
          nonce={nonce}
        />
        <Script id="google-analytics" strategy="afterInteractive" nonce={nonce}>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <CookieBanner />
        <ConsentAnalytics />
      </body>
    </html>
  );
}