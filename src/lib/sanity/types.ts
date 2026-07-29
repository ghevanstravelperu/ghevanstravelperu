import type { SanityImageSource } from "@sanity/image-url";

export type SanityLocalizedString = {
  es?: string;
  en?: string;
  pt?: string;
  fr?: string;
};

export type SanityLocalizedText = SanityLocalizedString;

export type PriceDisplay = "soles" | "dollars" | "both";

export type SanityTourDocument = {
  _id: string;
  status: "published" | "hidden" | "draft";
  slug: string;
  name: SanityLocalizedString;
  shortDescription: SanityLocalizedText;
  fullDescription: SanityLocalizedText;
  duration?: SanityLocalizedString | string;
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
  gallery?: SanityImageSource[];
};
