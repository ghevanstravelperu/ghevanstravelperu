"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        className="fill-current"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

export function WhatsAppButton({ tourName }: { tourName?: string }) {
  const locale = useLocale();
  const t = useTranslations("whatsapp");
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const starter = tourName
    ? {
        es: `¡Hola Ghevans Travel Peru! Me interesa el tour: ${tourName}.`,
        en: `Hi Ghevans Travel Peru! I'm interested in the ${tourName} tour.`,
        pt: `Olá Ghevans Travel Peru! Tenho interesse no tour: ${tourName}.`,
        fr: `Bonjour Ghevans Travel Peru ! Je suis intéressé(e) par le tour : ${tourName}.`,
      }[locale] ?? buildGeneralWhatsAppMessage(locale)
    : buildGeneralWhatsAppMessage(locale);

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setHintVisible(false), 8000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    setHintVisible(false);

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    const focusTimer = window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  const sendToWhatsApp = () => {
    const text = draft.trim() || starter;
    window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6"
    >
      <div
        id={panelId}
        hidden={!open}
        className={`w-[min(calc(100vw-2.5rem),21rem)] origin-bottom-right overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-[0_20px_50px_-20px_rgba(28,25,23,0.45)] transition duration-200 ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <WhatsAppIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{t("chatTitle")}</p>
            <p className="text-xs text-white/80">{t("chatStatus")}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t("close")}
            className="rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="bg-[#ECE5DD] px-3 py-4">
          <div className="max-w-[92%] rounded-2xl rounded-tl-md bg-white px-3.5 py-3 text-sm leading-relaxed text-stone-700 shadow-sm">
            <p className="mb-1 text-[11px] font-semibold tracking-wide text-[#075E54]/80">
              {t("chatTitle")}
            </p>
            {t("greeting")}
          </div>
        </div>

        <div className="border-t border-stone-200 bg-white p-3">
          <label htmlFor={`${panelId}-message`} className="sr-only">
            {t("placeholder")}
          </label>
          <textarea
            ref={textareaRef}
            id={`${panelId}-message`}
            rows={3}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendToWhatsApp();
              }
            }}
            placeholder={t("placeholder")}
            className="w-full resize-none rounded-2xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#25D366] focus:bg-white focus:ring-2 focus:ring-[#25D366]/20"
          />
          <button
            type="button"
            onClick={sendToWhatsApp}
            className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t("send")}
          </button>
        </div>
      </div>

      {!open && hintVisible && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="max-w-[14rem] rounded-2xl rounded-br-md bg-white px-3.5 py-2.5 text-left text-sm leading-snug text-stone-700 shadow-lg ring-1 ring-stone-200/80 transition hover:shadow-xl"
        >
          <span className="mb-0.5 block text-[11px] font-semibold tracking-wide text-[#075E54]">
            {t("chatTitle")}
          </span>
          {t("teaser")}
        </button>
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t("close") : t("tooltip")}
        title={t("tooltip")}
        onClick={() => setOpen((value) => !value)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#20bd5a] sm:h-16 sm:w-16"
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
        )}
        <span className="relative">
          {open ? (
            <svg viewBox="0 0 16 16" className="h-6 w-6" aria-hidden>
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <WhatsAppIcon className="h-7 w-7" />
          )}
        </span>
      </button>
    </div>
  );
}
