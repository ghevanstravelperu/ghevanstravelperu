import { NextResponse } from "next/server";
import { createSanityWriteClient } from "@/lib/sanity/client";
import { translateTourContent } from "@/lib/sanity/translate";
import { slugify } from "@/lib/slugify";

type TourDoc = {
  name?: { es?: string };
  shortDescription?: { es?: string };
  fullDescription?: { es?: string };
  duration?: { es?: string } | string;
  highlightsEs?: string;
};

function splitLines(text?: string) {
  if (!text?.trim()) return [];
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function durationEs(doc: TourDoc): string {
  if (!doc.duration) return "";
  if (typeof doc.duration === "string") return doc.duration;
  return doc.duration.es || "";
}

export async function POST(request: Request) {
  try {
    const { id } = (await request.json()) as { id?: string };
    if (!id) {
      return new NextResponse("Missing tour id", { status: 400 });
    }

    const token = process.env.SANITY_API_WRITE_TOKEN;
    if (!token) {
      return new NextResponse("SANITY_API_WRITE_TOKEN not configured", {
        status: 500,
      });
    }

    const client = createSanityWriteClient(token);
    const doc = await client.fetch<TourDoc>(
      `*[_id == $id || _id == "drafts." + $id][0]{
        name, shortDescription, fullDescription, duration, highlightsEs
      }`,
      { id: id.replace(/^drafts\./, "") },
    );

    if (!doc?.name?.es) {
      return new NextResponse("Escribe el nombre en español primero", {
        status: 400,
      });
    }

    const translations = await translateTourContent({
      name: doc.name.es,
      shortDescription: doc.shortDescription?.es || "",
      fullDescription: doc.fullDescription?.es || "",
      duration: durationEs(doc),
      highlights: splitLines(doc.highlightsEs),
    });

    const docId = id.replace(/^drafts\./, "");
    const patch = {
      slug: { _type: "slug", current: slugify(doc.name.es) },
      "name.en": translations.name.en,
      "name.pt": translations.name.pt,
      "name.fr": translations.name.fr,
      "shortDescription.en": translations.shortDescription.en,
      "shortDescription.pt": translations.shortDescription.pt,
      "shortDescription.fr": translations.shortDescription.fr,
      "fullDescription.en": translations.fullDescription.en,
      "fullDescription.pt": translations.fullDescription.pt,
      "fullDescription.fr": translations.fullDescription.fr,
      "duration.en": translations.duration.en,
      "duration.pt": translations.duration.pt,
      "duration.fr": translations.duration.fr,
      highlightsEn: translations.highlights.en,
      highlightsPt: translations.highlights.pt,
      highlightsFr: translations.highlights.fr,
    };

    const targets = id.startsWith("drafts.")
      ? [`drafts.${docId}`]
      : [docId, `drafts.${docId}`];

    for (const targetId of targets) {
      const exists = await client.fetch<boolean>(
        `defined(*[_id == $id][0]._id)`,
        { id: targetId },
      );
      if (exists) {
        await client.patch(targetId).set(patch).commit();
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[translate-tour]", error);
    const message =
      error instanceof Error ? error.message : "Translation failed";
    return new NextResponse(message, { status: 500 });
  }
}
