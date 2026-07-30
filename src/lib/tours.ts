import type { Locale } from "./constants";
import { fetchToursFromSanity } from "./sanity/fetch-tours";
import {
  staticTours,
  type LocalizedTourContent,
  type PriceDisplay,
  type Tour,
  type TourStatus,
} from "./tours-static";

export type { Tour, TourStatus, LocalizedTourContent, PriceDisplay };
export { staticTours };

export function getTourDuration(tour: Tour, locale: Locale): string {
  return tour.content[locale].duration || tour.duration;
}

async function loadTours(): Promise<Tour[]> {
  const sanityTours = await fetchToursFromSanity();
  return sanityTours ?? staticTours;
}

export async function getAllTours(includeHidden = false): Promise<Tour[]> {
  const tours = await loadTours();
  const list = includeHidden
    ? tours
    : tours.filter((t) => t.status === "published");

  return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getFeaturedTours(): Promise<Tour[]> {
  const tours = await getAllTours();
  return tours.filter((t) => t.featured);
}

export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
  const tours = await loadTours();
  const tour = tours.find((t) => t.slug === slug);
  if (!tour || tour.status !== "published") return undefined;
  return tour;
}

export function formatTourPrice(
  tour: Tour,
  locale: Locale,
  labels: Record<string, string>,
): string {
  if (tour.customQuote) return labels.customQuote;

  const display = tour.priceDisplay ?? "soles";
  const prefix = tour.pricePrefix ? `${labels.from} ` : "";

  const soles =
    tour.price != null && display !== "dollars" ? `PEN ${tour.price}` : null;
  const dollars =
    tour.priceUsd != null && display !== "soles" ? `USD ${tour.priceUsd}` : null;

  if (display === "dollars") {
    return dollars ?? labels.customQuote;
  }

  if (display === "both") {
    if (soles && dollars) return `${prefix}${soles} · ${dollars}`;
    if (soles) return `${prefix}${soles}`;
    if (dollars) return `${prefix}${dollars}`;
    return labels.customQuote;
  }

  if (soles) return `${prefix}${soles}`;
  if (tour.price == null) return labels.customQuote;
  return labels.customQuote;
}

export const EXPERIENCE_IMAGES = [
  "/images/experiences/machu-2.jpg",
  "/images/experiences/rainbow-1.jpg",
  "/images/experiences/humantay-1.jpg",
  "/images/experiences/atv-2.jpg",
  "/images/experiences/machu-4.jpg",
  "/images/experiences/humantay-2.jpg",
  "/images/experiences/machu-1.jpg",
];
