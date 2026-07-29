import { defineField, defineType } from "sanity";
import { TranslateTourButton } from "../components/TranslateTourButton";

/** Orlando only sees Spanish. EN/PT/FR are filled by the Traducir button. */
const localizedString = (
  name: string,
  title: string,
  description?: string,
) =>
  defineField({
    name,
    title,
    description,
    type: "object",
    group: "contenido",
    fields: [
      defineField({
        name: "es",
        title,
        type: "string",
        validation: (Rule) => Rule.required().error("Obligatorio"),
      }),
      defineField({ name: "en", title: "English", type: "string", hidden: true }),
      defineField({ name: "pt", title: "Português", type: "string", hidden: true }),
      defineField({ name: "fr", title: "Français", type: "string", hidden: true }),
    ],
  });

const localizedText = (name: string, title: string, description: string, rows: number) =>
  defineField({
    name,
    title,
    description,
    type: "object",
    group: "contenido",
    fields: [
      defineField({
        name: "es",
        title,
        type: "text",
        rows,
        validation: (Rule) => Rule.required().error("Obligatorio"),
      }),
      defineField({ name: "en", title: "English", type: "text", hidden: true }),
      defineField({ name: "pt", title: "Português", type: "text", hidden: true }),
      defineField({ name: "fr", title: "Français", type: "text", hidden: true }),
    ],
  });

export const tour = defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  groups: [
    { name: "contenido", title: "1. Texto (español)", default: true },
    { name: "precio", title: "2. Precio" },
    { name: "fotos", title: "3. Fotos" },
    { name: "final", title: "4. Traducir" },
  ],
  fields: [
    defineField({
      name: "status",
      title: "¿Mostrar este tour en la página web?",
      description:
        "Publicado = los clientes lo ven. Oculto = no aparece. Borrador = solo tú lo ves.",
      type: "string",
      group: "contenido",
      options: {
        list: [
          { title: "✅ Sí, publicado", value: "published" },
          { title: "🚫 Oculto", value: "hidden" },
          { title: "📝 Borrador", value: "draft" },
        ],
        layout: "radio",
      },
      initialValue: "published",
    }),
    localizedString(
      "name",
      "Nombre del tour",
      "El enlace web se crea solo a partir de este nombre. Ej: City Tour Cusco",
    ),
    localizedText(
      "shortDescription",
      "Descripción corta",
      "Aparece en la tarjeta del tour (2–3 frases).",
      3,
    ),
    localizedText(
      "fullDescription",
      "Descripción completa",
      "Texto largo en la página del tour. Cuéntale al cliente qué vivirá.",
      8,
    ),
    defineField({
      name: "highlightsEs",
      title: "Qué incluye / destacados",
      description: "Un punto por línea. Ej: Recogida en hotel · Almuerzo incluido",
      type: "text",
      group: "contenido",
      rows: 6,
    }),
    defineField({
      name: "highlightsEn",
      title: "Highlights EN",
      type: "text",
      hidden: true,
    }),
    defineField({
      name: "highlightsPt",
      title: "Highlights PT",
      type: "text",
      hidden: true,
    }),
    defineField({
      name: "highlightsFr",
      title: "Highlights FR",
      type: "text",
      hidden: true,
    }),
    localizedString(
      "duration",
      "Duración del tour",
      "Ej: 5 horas · 1 día completo · 6 horas 30 minutos. Se traduce automáticamente.",
    ),
    defineField({
      name: "priceDisplay",
      title: "¿En qué moneda mostrar el precio?",
      type: "string",
      group: "precio",
      options: {
        list: [
          { title: "Solo soles (PEN)", value: "soles" },
          { title: "Solo dólares (USD)", value: "dollars" },
          { title: "Soles y dólares", value: "both" },
        ],
        layout: "radio",
      },
      initialValue: "soles",
    }),
    defineField({
      name: "price",
      title: "Precio en soles (PEN)",
      description: "Número sin símbolo. Ej: 120",
      type: "number",
      group: "precio",
      hidden: ({ document }) => document?.priceDisplay === "dollars",
    }),
    defineField({
      name: "priceUsd",
      title: "Precio en dólares (USD)",
      description: "Número sin símbolo. Ej: 35",
      type: "number",
      group: "precio",
      hidden: ({ document }) => document?.priceDisplay === "soles",
    }),
    defineField({
      name: "pricePrefix",
      title: 'Agregar "Desde" antes del precio',
      type: "boolean",
      group: "precio",
      initialValue: false,
    }),
    defineField({
      name: "customQuote",
      title: "Sin precio fijo — cotización por WhatsApp",
      description: "Activa esto si el precio depende del grupo o fecha.",
      type: "boolean",
      group: "precio",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Destacar en la página de inicio",
      type: "boolean",
      group: "fotos",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Orden en la lista",
      description: "Número menor = aparece primero.",
      type: "number",
      group: "fotos",
    }),
    defineField({
      name: "image",
      title: "Foto principal",
      description: "La imagen grande de la tarjeta y la página del tour.",
      type: "image",
      group: "fotos",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Fotos extra (opcional)",
      type: "array",
      group: "fotos",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "slug",
      type: "slug",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "translationHelper",
      title: "Traducir a otros idiomas",
      description:
        "Cuando termines en español: Publicar → clic abajo. Inglés, portugués y francés se llenan solos.",
      type: "string",
      group: "final",
      readOnly: true,
      components: { input: TranslateTourButton },
    }),
  ],
  preview: {
    select: {
      title: "name.es",
      subtitle: "duration.es",
      media: "image",
    },
  },
});
