import { GoogleGenAI } from "@google/genai";

export type TranslatedItineraryStop = {
  title: { en: string; pt: string; fr: string };
  detail: { en: string; pt: string; fr: string };
};

export type TourTranslations = {
  name: { en: string; pt: string; fr: string };
  shortDescription: { en: string; pt: string; fr: string };
  fullDescription: { en: string; pt: string; fr: string };
  highlights: { en: string; pt: string; fr: string };
  duration: { en: string; pt: string; fr: string };
  itinerary: TranslatedItineraryStop[];
};

type GeminiTourPayload = {
  name: { en: string; pt: string; fr: string };
  shortDescription: { en: string; pt: string; fr: string };
  fullDescription: { en: string; pt: string; fr: string };
  highlights: { en: string[]; pt: string[]; fr: string[] };
  duration: { en: string; pt: string; fr: string };
  itinerary: TranslatedItineraryStop[];
};

const localeObjectSchema = {
  type: "object",
  properties: {
    en: { type: "string" },
    pt: { type: "string" },
    fr: { type: "string" },
  },
  required: ["en", "pt", "fr"],
  additionalProperties: false,
} as const;

const localeStringArraySchema = {
  type: "object",
  properties: {
    en: { type: "array", items: { type: "string" } },
    pt: { type: "array", items: { type: "string" } },
    fr: { type: "array", items: { type: "string" } },
  },
  required: ["en", "pt", "fr"],
  additionalProperties: false,
} as const;

const translationResponseSchema = {
  type: "object",
  properties: {
    name: localeObjectSchema,
    shortDescription: localeObjectSchema,
    fullDescription: localeObjectSchema,
    highlights: localeStringArraySchema,
    duration: localeObjectSchema,
    itinerary: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: localeObjectSchema,
          detail: localeObjectSchema,
        },
        required: ["title", "detail"],
        additionalProperties: false,
      },
    },
  },
  required: [
    "name",
    "shortDescription",
    "fullDescription",
    "highlights",
    "duration",
    "itinerary",
  ],
  additionalProperties: false,
} as const;

function joinLines(value: unknown): string {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean)
      .join("\n");
  }
  if (typeof value === "string") return value;
  return "";
}

function normalizeLocaleTriple(value: unknown): {
  en: string;
  pt: string;
  fr: string;
} {
  const obj = (value && typeof value === "object" ? value : {}) as Record<
    string,
    unknown
  >;
  return {
    en: String(obj.en ?? ""),
    pt: String(obj.pt ?? ""),
    fr: String(obj.fr ?? ""),
  };
}

function extractJsonText(raw: string): string {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return fenced[1].trim();

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) {
    return trimmed.slice(start, end + 1);
  }
  return trimmed;
}

function parseTranslationPayload(raw: string): GeminiTourPayload {
  const jsonText = extractJsonText(raw);
  try {
    return JSON.parse(jsonText) as GeminiTourPayload;
  } catch (error) {
    // Gemini sometimes emits raw newlines inside strings; escape control chars
    // outside of already-escaped sequences as a last-resort repair.
    const repaired = jsonText.replace(
      /"(?:\\.|[^"\\])*"/g,
      (match) =>
        match
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r")
          .replace(/\t/g, "\\t"),
    );
    try {
      return JSON.parse(repaired) as GeminiTourPayload;
    } catch {
      throw error instanceof Error
        ? error
        : new Error("Invalid translation JSON");
    }
  }
}

function normalizePayload(parsed: GeminiTourPayload): TourTranslations {
  const itinerary = Array.isArray(parsed.itinerary)
    ? parsed.itinerary.map((stop) => ({
        title: normalizeLocaleTriple(stop?.title),
        detail: normalizeLocaleTriple(stop?.detail),
      }))
    : [];

  return {
    name: normalizeLocaleTriple(parsed.name),
    shortDescription: normalizeLocaleTriple(parsed.shortDescription),
    fullDescription: normalizeLocaleTriple(parsed.fullDescription),
    duration: normalizeLocaleTriple(parsed.duration),
    highlights: {
      en: joinLines(parsed.highlights?.en),
      pt: joinLines(parsed.highlights?.pt),
      fr: joinLines(parsed.highlights?.fr),
    },
    itinerary,
  };
}

export async function translateTourContent(input: {
  name: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  highlights: string[];
  itinerary: { title: string; detail: string }[];
}): Promise<TourTranslations> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const prompt = `Translate tour content for a Peru travel agency (Cusco, Machu Picchu) from Spanish to English (en), Portuguese (pt), and French (fr).
Keep proper nouns such as Cusco, Machu Picchu, and PEN unchanged.
Use natural phrasing for duration (e.g. "5 hours", "1 full day").
Return one itinerary item per source stop, in the same order. Use empty strings for missing details. If there are no itinerary stops, return an empty itinerary array.
For highlights, return an array of bullet strings per language (same order as the Spanish source).

Spanish source JSON:
${JSON.stringify(
  {
    name: input.name,
    shortDescription: input.shortDescription,
    fullDescription: input.fullDescription,
    duration: input.duration,
    highlights: input.highlights,
    itinerary: input.itinerary,
  },
  null,
  2,
)}`;

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      temperature: 0.1,
      responseMimeType: "application/json",
      responseJsonSchema: translationResponseSchema,
    },
  });

  const content = response.text;
  if (!content) {
    throw new Error("Empty translation response");
  }

  return normalizePayload(parseTranslationPayload(content));
}
