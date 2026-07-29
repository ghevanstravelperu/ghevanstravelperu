import { TranslateIcon } from "@sanity/icons/Translate";
import { Button, Card, Flex, Stack, Text } from "@sanity/ui";
import { useCallback, useState } from "react";
import type { StringInputProps } from "sanity";
import { useDocumentPane } from "sanity/structure";

export function TranslateTourButton(_props: StringInputProps) {
  const { documentId } = useDocumentPane();
  const [loading, setLoading] = useState(false);

  const handleTranslate = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/sanity/translate-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: documentId }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Translation failed");
      }

      window.alert(
        "¡Listo! Inglés, portugués y francés actualizados.\n\nRecarga la página si no ves los cambios.",
      );
      window.location.reload();
    } catch (error) {
      const detail =
        error instanceof Error && error.message
          ? error.message
          : "Error desconocido";
      window.alert(
        `No se pudo traducir.\n\n${detail}\n\nAsegúrate de tener contenido en español y GEMINI_API_KEY configurada.`,
      );
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  return (
    <Card padding={4} radius={2} shadow={1} tone="primary">
      <Stack space={4}>
        <Stack space={2}>
          <Text size={2} weight="semibold">
            ¿Listo en español?
          </Text>
          <Text muted size={1}>
            Cuando termines todo en español: Publica el tour, luego traduce a
            inglés, portugués y francés con un clic.
          </Text>
        </Stack>
        <Flex>
          <Button
            disabled={loading}
            fontSize={2}
            icon={TranslateIcon}
            loading={loading}
            onClick={handleTranslate}
            padding={3}
            text="Traducir a EN / PT / FR"
            tone="primary"
          />
        </Flex>
      </Stack>
    </Card>
  );
}
