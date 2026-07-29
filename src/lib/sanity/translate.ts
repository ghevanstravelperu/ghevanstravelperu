import { GoogleGenAI } from "@google/genai";

export type TourTranslations = {
  name: { en: string; pt: string; fr: string };
  shortDescription: { en: string; pt: string; fr: string };
  fullDescription: { en: string; pt: string; fr: string };
  highlights: { en: string; pt: string; fr: string };
  duration: { en: string; pt: string; fr: string };
};

export async function translateTourContent(input: {
  name: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  highlights: string[];
}): Promise<TourTranslations> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const prompt = `You translate tour content for a Peru travel agency (Cusco, Machu Picchu).
Translate from Spanish to English (en), Portuguese (pt), and French (fr).
Keep proper nouns (Cusco, Machu Picchu, PEN) unchanged.
Return ONLY valid JSON with this exact shape:
{
  "name": { "en": "", "pt": "", "fr": "" },
  "shortDescription": { "en": "", "pt": "", "fr": "" },
  "fullDescription": { "en": "", "pt": "", "fr": "" },
  "highlights": { "en": "", "pt": "", "fr": "" },
  "duration": { "en": "", "pt": "", "fr": "" }
}
For highlights, join each language's bullet points with newline characters (\\n).
For duration, use natural phrasing in each language (e.g. "5 hours", "1 full day").

Spanish source:
Name: ${input.name}
Short description: ${input.shortDescription}
Full description: ${input.fullDescription}
Duration: ${input.duration}
Highlights:
${input.highlights.join("\n")}`;

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      temperature: 0.2,
      responseMimeType: "application/json",
    },
  });

  const content = response.text;
  if (!content) {
    throw new Error("Empty translation response");
  }

  return JSON.parse(content) as TourTranslations;
}
