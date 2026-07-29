import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllTours } from "@/lib/tours";

const locales = ["es", "en", "pt", "fr"] as const;
const staticPaths = ["", "/tours", "/about", "/contact", "/faq"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tours = await getAllTours();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }

    for (const tour of tours) {
      entries.push({
        url: `${SITE_URL}/${locale}/tours/${tour.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  return entries;
}
