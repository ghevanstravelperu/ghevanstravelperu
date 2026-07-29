import { defineField, defineType } from "sanity";

const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      { name: "es", title: "Español", type: "string" },
      { name: "en", title: "English", type: "string" },
      { name: "pt", title: "Português", type: "string" },
      { name: "fr", title: "Français", type: "string" },
    ],
  });

const localizedText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      { name: "es", title: "Español", type: "text" },
      { name: "en", title: "English", type: "text" },
      { name: "pt", title: "Português", type: "text" },
      { name: "fr", title: "Français", type: "text" },
    ],
  });

export const tour = defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  fields: [
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      options: {
        list: [
          { title: "Publicado", value: "published" },
          { title: "Oculto", value: "hidden" },
          { title: "Borrador", value: "draft" },
        ],
        layout: "radio",
      },
      initialValue: "published",
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "name.es", maxLength: 96 },
    }),
    localizedString("name", "Nombre del tour"),
    localizedText("shortDescription", "Descripción corta"),
    localizedText("fullDescription", "Descripción completa"),
    defineField({
      name: "highlightsEs",
      title: "Destacados (ES) — uno por línea",
      type: "text",
    }),
    defineField({
      name: "duration",
      title: "Duración",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Precio (PEN)",
      type: "number",
    }),
    defineField({
      name: "pricePrefix",
      title: 'Mostrar "Desde"',
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "customQuote",
      title: "Cotización personalizada",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Destacado en inicio",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Orden",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Imagen principal",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Galería",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: "name.es",
      subtitle: "duration",
      media: "image",
    },
  },
});
