import { Button, Stack, Text, TextArea, TextInput } from "@sanity/ui";
import { useCallback, type ChangeEvent } from "react";
import {
  set,
  setIfMissing,
  useFormCallbacks,
  type ObjectInputProps,
} from "sanity";

type StopValue = {
  title?: { es?: string; en?: string; pt?: string; fr?: string };
  detail?: { es?: string; en?: string; pt?: string; fr?: string };
};

/** Flat Spanish fields + Continuar so Orlando never needs the modal X. */
export function ItineraryStopInput(props: ObjectInputProps) {
  const { value, onChange, readOnly, path } = props;
  const stop = (value ?? {}) as StopValue;
  const { onPathOpen } = useFormCallbacks();

  const handleContinue = useCallback(() => {
    if (path.length > 0) {
      onPathOpen(path.slice(0, -1));
    }
  }, [onPathOpen, path]);

  const handleTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange([
        setIfMissing({}, ["title"]),
        set(event.currentTarget.value, ["title", "es"]),
      ]);
    },
    [onChange],
  );

  const handleDetailChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange([
        setIfMissing({}, ["detail"]),
        set(event.currentTarget.value, ["detail", "es"]),
      ]);
    },
    [onChange],
  );

  return (
    <Stack space={4}>
      <Stack space={2}>
        <Text size={1} weight="semibold">
          Título de la parada
        </Text>
        <Text size={1} muted>
          Ej: Recogida en el hotel
        </Text>
        <TextInput
          value={stop.title?.es ?? ""}
          readOnly={readOnly}
          onChange={handleTitleChange}
        />
      </Stack>

      <Stack space={2}>
        <Text size={1} weight="semibold">
          Detalle (opcional)
        </Text>
        <Text size={1} muted>
          Una frase corta. Ej: Van privada, encuentro con el guía
        </Text>
        <TextArea
          rows={3}
          value={stop.detail?.es ?? ""}
          readOnly={readOnly}
          onChange={handleDetailChange}
        />
      </Stack>

      <Button
        text="Continuar"
        tone="primary"
        fontSize={2}
        padding={3}
        disabled={readOnly}
        onClick={handleContinue}
      />
    </Stack>
  );
}
