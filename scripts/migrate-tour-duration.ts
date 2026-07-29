/**
 * Converts legacy tour.duration strings to { es, en, pt, fr } objects.
 *
 * Usage: npm run sanity:migrate
 */
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

type TourRow = {
  _id: string;
  duration?: string | { es?: string; en?: string; pt?: string; fr?: string };
};

async function migrate() {
  const tours = await client.fetch<TourRow[]>(`*[_type == "tour"]{ _id, duration }`);
  let updated = 0;

  for (const tour of tours) {
    if (typeof tour.duration !== "string") continue;

    const value = tour.duration.trim();
    if (!value) continue;

    await client
      .patch(tour._id)
      .set({
        duration: {
          es: value,
          en: value,
          pt: value,
          fr: value,
        },
      })
      .commit();

    console.log(`  ✓ ${tour._id}: "${value}"`);
    updated += 1;
  }

  console.log(updated ? `Migrated ${updated} tour(s).` : "No tours needed migration.");
}

migrate().catch((error) => {
  console.error(error);
  process.exit(1);
});
