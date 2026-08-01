import type { Locale } from "@/lib/constants";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { Tour } from "@/lib/tours";

export function buildAlternateLanguages(path: string) {
  const locales: Locale[] = ["es", "en", "pt", "fr"];
  return Object.fromEntries(
    locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
  );
}

export function buildTourJsonLd(tour: Tour, locale: Locale) {
  const content = tour.content[locale];
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: content.name,
    description: content.shortDescription,
    touristType: "Leisure",
    provider: {
      "@type": "TravelAgency",
      name: SITE_NAME,
      areaServed: "Cusco, Peru",
    },
    offers: tour.price
      ? {
          "@type": "Offer",
          price: tour.price,
          priceCurrency: "PEN",
        }
      : undefined,
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/images/og-share.jpg`,
    logo: `${SITE_URL}/images/brand/logo-mark-transparent.png`,
    areaServed: {
      "@type": "Place",
      name: "Cusco, Peru",
    },
    telephone: "+51-983-344-198",
  };
}

export function buildFaqJsonLd(
  items: Array<{ q: string; a: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
