import { esESLocale } from "@sanity/locale-es-es";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { translateTourAction } from "./sanity/plugins/translateTourAction";

export default defineConfig({
  name: "ghevanstravelperu",
  title: "Ghevans Travel — Tours",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/editar",
  plugins: [
    esESLocale({ title: "Español" }),
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            S.listItem()
              .title("Tours")
              .child(S.documentTypeList("tour").title("Tours")),
          ]),
    }),
  ],
  // Studio UI only in Spanish — easier for Orlando.
  i18n: {
    locales: (prev) => {
      const spanish = prev.filter((locale) => locale.id === "es-ES");
      return spanish.length > 0 ? spanish : prev;
    },
  },
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, { schemaType }) =>
      schemaType === "tour" ? [...prev, translateTourAction] : prev,
  },
});
