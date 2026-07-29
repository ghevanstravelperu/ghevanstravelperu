import { TranslateIcon } from "@sanity/icons/Translate";
import type { DocumentActionComponent } from "sanity";

export const translateTourAction: DocumentActionComponent = (props) => {
  if (props.type !== "tour") {
    return null;
  }

  return {
    label: "Traducir a EN / PT / FR",
    icon: TranslateIcon,
    tone: "primary",
    onHandle: async () => {
      props.onComplete();

      try {
        const response = await fetch("/api/sanity/translate-tour", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: props.id }),
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Translation failed");
        }

        window.alert(
          "¡Listo! Inglés, portugués y francés actualizados.\n\nRecarga la página si no ves los cambios.",
        );
        window.location.reload();
      } catch {
        window.alert(
          "No se pudo traducir. Guarda el tour en español primero e intenta otra vez.",
        );
      }
    },
  };
};
