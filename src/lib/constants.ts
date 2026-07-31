export const SITE_NAME = "Ghevans Travel Peru";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ghevanstravelperu.com";
export const WHATSAPP_NUMBER = "51983344198";
export const WHATSAPP_DISPLAY = "+51 983 344 198";
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Ghevans+Travel+Peru/data=!4m2!3m1!1s0x0:0x69c5adc12e942ede";
export const LOCATION = "Cusco, Peru";
export const RUC = "20610982175";

/** Bump when replacing favicon assets so browsers fetch the new file. */
export const FAVICON_VERSION = "20260731";

export const LOCALES = ["es", "en", "pt", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";
