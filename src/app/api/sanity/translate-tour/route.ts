import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createSanityWriteClient } from "@/lib/sanity/client";
import { translateTourContent } from "@/lib/sanity/translate";
import { slugify } from "@/lib/slugify";
import { LOCALES } from "@/lib/constants";

type TourDoc = {
  _id?: string;
  name?: { es?: string };
  shortDescription?: { es?: string };
  fullDescription?: { es?: string };
  duration?: { es?: string } | string;
  highlightsEs?: string;
  itinerary?: {
    _key: string;
    title?: { es?: string; en?: string; pt?: string; fr?: string };
    detail?: { es?: string; en?: string; pt?: string; fr?: string };
  }[];
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

    const publishedId = id.replace(/^drafts\./, "");
    const draftId = `drafts.${publishedId}`;

    const client = createSanityWriteClient(token);
    // Prefer the draft so unpublished itinerary edits are not wiped by an older published doc.
    const doc = await client.fetch<TourDoc | null>(
      `coalesce(
        *[_id == $draftId][0],
        *[_id == $publishedId][0]
      ){
        _id, name, shortDescription, fullDescription, duration, highlightsEs, itinerary
      }`,
      { draftId, publishedId },
    );

    if (!doc?.name?.es) {
      return new NextResponse("Escribe el nombre en español primero", {
        status: 400,
      });
    }

    const hasItineraryField = Array.isArray(doc.itinerary);
    const sourceItinerary = (doc.itinerary ?? []).filter((stop) =>
      Boolean(stop.title?.es?.trim()),
    );

    const translations = await translateTourContent({
      name: doc.name.es,
      shortDescription: doc.shortDescription?.es || "",
      fullDescription: doc.fullDescription?.es || "",
      duration: durationEs(doc),
      highlights: splitLines(doc.highlightsEs),
      itinerary: sourceItinerary.map((stop) => ({
        title: stop.title?.es || "",
        detail: stop.detail?.es || "",
      })),
    });

    const translatedItinerary = sourceItinerary.map((stop, index) => {
      const translated = translations.itinerary[index];
      return {
        _key: stop._key,
        _type: "stop",
        title: {
          es: stop.title?.es || "",
          en: translated?.title.en || stop.title?.en || "",
          pt: translated?.title.pt || stop.title?.pt || "",
          fr: translated?.title.fr || stop.title?.fr || "",
        },
        detail: {
          es: stop.detail?.es || "",
          en: translated?.detail.en || stop.detail?.en || "",
          pt: translated?.detail.pt || stop.detail?.pt || "",
          fr: translated?.detail.fr || stop.detail?.fr || "",
        },
      };
    });

    const patch: Record<string, unknown> = {
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

    // Only write itinerary when the source doc already has that field,
    // so we never wipe stops that lived only on the other version.
    if (hasItineraryField) {
      patch.itinerary = translatedItinerary;
    }

    const targets = [draftId, publishedId];

    for (const targetId of targets) {
      const exists = await client.fetch<boolean>(
        `defined(*[_id == $id][0]._id)`,
        { id: targetId },
      );
      if (exists) {
        await client.patch(targetId).set(patch).commit();
      }
    }

    const slug = slugify(doc.name.es);
    revalidatePath("/");
    revalidatePath("/tours");
    for (const locale of LOCALES) {
      revalidatePath(`/${locale}`);
      revalidatePath(`/${locale}/tours`);
      revalidatePath(`/${locale}/tours/${slug}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[translate-tour]", error);
    const message =
      error instanceof Error ? error.message : "Translation failed";
    return new NextResponse(message, { status: 500 });
  }
}
