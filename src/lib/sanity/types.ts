import type { SanityImageSource } from "@sanity/image-url";

export type SanityLocalizedString = {
  es?: string;
  en?: string;
  pt?: string;
  fr?: string;
};

export type SanityLocalizedText = SanityLocalizedString;

export type PriceDisplay = "soles" | "dollars" | "both";

export type SanityItineraryStop = {
  _key?: string;
  title?: SanityLocalizedString;
  detail?: SanityLocalizedText;
};

export type SanityTourDocument = {
  _id: string;
  status: "published" | "hidden" | "draft";
  slug: string;
  name: SanityLocalizedString;
  shortDescription: SanityLocalizedText;
  fullDescription: SanityLocalizedText;
  duration?: SanityLocalizedString | string;
  itinerary?: SanityItineraryStop[];
  highlightsEs?: string;
  highlightsEn?: string;
  highlightsPt?: string;
  highlightsFr?: string;
  price?: number;
  priceUsd?: number;
  priceDisplay?: PriceDisplay;
  pricePrefix?: boolean;
  customQuote?: boolean;
  featured?: boolean;
  sortOrder?: number;
  image?: SanityImageSource;
  imageWidth?: number;
  imageHeight?: number;
  gallery?: SanityImageSource[];
};
