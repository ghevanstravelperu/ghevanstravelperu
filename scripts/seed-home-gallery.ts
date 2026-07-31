/**
 * Seed the homepage carousel document with the current static photos.
 *
 * Usage:
 *   npx tsx scripts/seed-home-gallery.ts
 */
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { EXPERIENCE_IMAGES } from "../src/lib/tours";

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
  console.log(`Seeding home gallery into ${projectId}/${dataset}...`);

  const images = [];
  for (const relativePath of EXPERIENCE_IMAGES) {
    const asset = await uploadImage(relativePath);
    if (!asset) continue;
    images.push({
      _type: "image",
      _key: asset._id.replace(/[^a-zA-Z0-9]/g, "").slice(-12),
      asset: { _type: "reference", _ref: asset._id },
    });
    console.log(`  ✓ ${relativePath}`);
  }

  await client.createOrReplace({
    _id: "homeGallery",
    _type: "homeGallery",
    images,
  });

  console.log(`Done. ${images.length} photos ready in Fotos del carrusel.`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
