import type { Locale } from "@/lib/constants";
import {
  DEFAULT_LOCALE,
  GOOGLE_MAPS_URL,
  LOCALES,
  LOCATION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";
import type { Tour } from "@/lib/tours";

export function buildAlternateLanguages(path: string) {
  return {
    ...Object.fromEntries(
      LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
    ),
    "x-default": `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
  };
}

/** Canonical + hreflang for a localized page path (e.g. "" or "/tours"). */
export function buildPageAlternates(locale: Locale, path: string) {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: buildAlternateLanguages(path),
  };
}

export function buildTourJsonLd(tour: Tour, locale: Locale) {
  const content = tour.content[locale];
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: content.name,
    description: content.shortDescription,
    image: tour.image,
    touristType: "Leisure",
    provider: {
      "@type": "TravelAgency",
      name: SITE_NAME,
      areaServed: LOCATION,
      url: SITE_URL,
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
    telephone: "+51-983-344-198",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cusco",
      addressRegion: "Cusco",
      addressCountry: "PE",
    },
    areaServed: {
      "@type": "Place",
      name: LOCATION,
    },
    sameAs: [GOOGLE_MAPS_URL, ...SOCIAL_LINKS.map((link) => link.href)],
  };
}

export function buildFaqJsonLd(items: Array<{ q: string; a: string }>) {
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
