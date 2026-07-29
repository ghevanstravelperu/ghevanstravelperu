/**
 * Seed Sanity with the static tour catalog + images.
 *
 * Usage:
 *   npm run sanity:seed
 */
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { staticTours } from "../src/lib/tours-static";

const root = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(root, "..", ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const publicDir = path.join(root, "..", "public");

async function uploadImage(relativePath: string) {
  const filePath = path.join(publicDir, relativePath.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) {
    console.warn(`  skip missing image: ${relativePath}`);
    return undefined;
  }

  const buffer = fs.readFileSync(filePath);
  return client.assets.upload("image", buffer, {
    filename: path.basename(filePath),
  });
}

async function seed() {
  console.log(`Seeding ${staticTours.length} tours into ${projectId}/${dataset}...`);

  for (const tour of staticTours) {
    const imageAsset = await uploadImage(tour.image);
    const galleryAssets = await Promise.all(
      tour.gallery.map((item) => uploadImage(item)),
    );

    const doc = {
      _id: `tour-${tour.slug}`,
      _type: "tour",
      status: tour.status,
      slug: { _type: "slug", current: tour.slug },
      name: {
        es: tour.content.es.name,
        en: tour.content.en.name,
        pt: tour.content.pt.name,
        fr: tour.content.fr.name,
      },
      shortDescription: {
        es: tour.content.es.shortDescription,
        en: tour.content.en.shortDescription,
        pt: tour.content.pt.shortDescription,
        fr: tour.content.fr.shortDescription,
      },
      fullDescription: {
        es: tour.content.es.fullDescription,
        en: tour.content.en.fullDescription,
        pt: tour.content.pt.fullDescription,
        fr: tour.content.fr.fullDescription,
      },
      highlightsEs: tour.content.es.highlights.join("\n"),
      duration: {
        es: tour.duration,
        en: tour.duration,
        pt: tour.duration,
        fr: tour.duration,
      },
      priceDisplay: "soles",
      price: tour.price ?? undefined,
      pricePrefix: tour.pricePrefix ?? false,
      customQuote: tour.customQuote ?? false,
      featured: tour.featured,
      sortOrder: tour.sortOrder,
      image: imageAsset
        ? {
            _type: "image",
            asset: { _type: "reference", _ref: imageAsset._id },
          }
        : undefined,
      gallery: galleryAssets
        .filter(Boolean)
        .map((asset) => ({
          _type: "image",
          _key: asset!._id,
          asset: { _type: "reference", _ref: asset!._id },
        })),
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ ${tour.slug}`);
  }

  console.log("Done.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
