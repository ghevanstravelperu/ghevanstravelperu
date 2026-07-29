import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { translateTourAction } from "./sanity/plugins/translateTourAction";

export default defineConfig({
  name: "ghevanstravelperu",
  title: "Ghevans Travel — Tours",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
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
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, { schemaType }) =>
      schemaType === "tour" ? [...prev, translateTourAction] : prev,
  },
});
