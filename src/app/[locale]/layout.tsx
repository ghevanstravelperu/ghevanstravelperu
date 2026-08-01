import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { routing } from "@/i18n/routing";
import { FAVICON_VERSION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { buildOrganizationJsonLd } from "@/lib/seo";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    // Version query busts aggressive browser caches of /favicon.ico
    icon: [{ url: `/favicon.ico?v=${FAVICON_VERSION}`, sizes: "any" }],
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description:
      "Private tours in Cusco, Sacred Valley, and Machu Picchu — book by WhatsApp.",
    url: SITE_URL,
    locale: "es_PE",
    alternateLocale: ["en_US", "pt_BR", "fr_FR"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Private tours in Cusco, Sacred Valley, and Machu Picchu — book by WhatsApp.",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en" | "pt" | "fr")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const orgJsonLd = buildOrganizationJsonLd();

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${sourceSans.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col overflow-x-clip antialiased"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
          <WhatsAppButton />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
