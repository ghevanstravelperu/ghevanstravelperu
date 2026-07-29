import type { Locale } from "@/lib/constants";
import {
  staticTours,
  type LocalizedTourContent,
  type PriceDisplay,
  type Tour,
} from "@/lib/tours-static";
import { imageUrl } from "./image";
import { isSanityConfigured, sanityClient } from "./client";
import type { SanityTourDocument } from "./types";

const TOURS_QUERY = `*[_type == "tour"] | order(sortOrder asc) {
  _id,
  status,
  "slug": slug.current,
  name,
  shortDescription,
  fullDescription,
  duration,
  highlightsEs,
  highlightsEn,
  highlightsPt,
  highlightsFr,
  price,
  priceUsd,
  priceDisplay,
  pricePrefix,
  customQuote,
  featured,
  sortOrder,
  image,
  gallery
}`;

function splitHighlights(text?: string): string[] {
  if (!text?.trim()) return [];
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function resolveDuration(
  doc: SanityTourDocument,
  locale: Locale,
  fallback?: string,
): string {
  const duration = doc.duration;
  if (typeof duration === "string") return duration;
  return (
    duration?.[locale] ||
    duration?.es ||
    fallback ||
    ""
  );
}

function localizedContent(
  doc: SanityTourDocument,
  locale: Locale,
  fallback: LocalizedTourContent | undefined,
): LocalizedTourContent {
  const highlightsByLocale: Record<Locale, string | undefined> = {
    es: doc.highlightsEs,
    en: doc.highlightsEn,
    pt: doc.highlightsPt,
    fr: doc.highlightsFr,
  };
  const highlightsFromSanity = splitHighlights(highlightsByLocale[locale]);
  const highlights =
    highlightsFromSanity.length > 0
      ? highlightsFromSanity
      : (fallback?.highlights ?? splitHighlights(doc.highlightsEs));

  return {
    name: doc.name?.[locale] || fallback?.name || doc.name?.es || "",
    shortDescription:
      doc.shortDescription?.[locale] ||
      fallback?.shortDescription ||
      doc.shortDescription?.es ||
      "",
    fullDescription:
      doc.fullDescription?.[locale] ||
      fallback?.fullDescription ||
      doc.fullDescription?.es ||
      "",
    highlights,
    duration: resolveDuration(doc, locale, fallback?.duration),
  };
}

function mapSanityTour(doc: SanityTourDocument): Tour {
  const fallback = staticTours.find((tour) => tour.slug === doc.slug);
  const mainImage = imageUrl(doc.image) || fallback?.image || "";
  const gallery =
    doc.gallery
      ?.map((item) => imageUrl(item))
      .filter((url): url is string => Boolean(url)) ?? fallback?.gallery ?? [];

  const content = Object.fromEntries(
    (["es", "en", "pt", "fr"] as Locale[]).map((locale) => [
      locale,
      localizedContent(doc, locale, fallback?.content[locale]),
    ]),
  ) as Record<Locale, LocalizedTourContent>;

  return {
    id: doc._id,
    slug: doc.slug,
    status: doc.status,
    duration: resolveDuration(doc, "es", fallback?.duration),
    price: doc.customQuote ? null : (doc.price ?? fallback?.price ?? null),
    priceUsd: doc.customQuote ? null : (doc.priceUsd ?? fallback?.priceUsd ?? null),
    priceDisplay: (doc.priceDisplay ?? fallback?.priceDisplay ?? "soles") as PriceDisplay,
    pricePrefix: doc.pricePrefix ?? fallback?.pricePrefix,
    customQuote: doc.customQuote ?? fallback?.customQuote,
    featured: doc.featured ?? fallback?.featured ?? false,
    sortOrder: doc.sortOrder ?? fallback?.sortOrder ?? 999,
    image: mainImage,
    gallery,
    content,
  };
}

export async function fetchToursFromSanity(): Promise<Tour[] | null> {
  if (!isSanityConfigured) return null;

  try {
    const docs = await sanityClient.fetch<SanityTourDocument[]>(TOURS_QUERY);
    if (!docs.length) return null;
    return docs.map(mapSanityTour);
  } catch (error) {
    console.error("[sanity] Failed to fetch tours:", error);
    return null;
  }
}
