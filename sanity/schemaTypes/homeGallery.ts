import { defineField, defineType } from "sanity";

/** Singleton: homepage “Real experiences” photo carousel. */
export const homeGallery = defineType({
  name: "homeGallery",
  title: "Fotos del carrusel",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "Fotos del carrusel",
      description:
        "Fotos de la sección “Experiencias reales” en la página de inicio. Arrastra para reordenar. Añade o quita cuantas quieras.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Descripción corta (opcional)",
              description: "Ej: Machu Picchu al amanecer",
              type: "string",
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error("Agrega al menos una foto"),
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Fotos del carrusel",
      subtitle: "Página de inicio",
    }),
  },
});
