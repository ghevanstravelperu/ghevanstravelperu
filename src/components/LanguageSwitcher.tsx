"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALES } from "@/lib/constants";

const labels: Record<string, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
  fr: "Français",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

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
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex items-center gap-2 rounded-full border bg-white px-3.5 py-2 text-sm shadow-sm transition ${
          open
            ? "border-teal/40 text-navy"
            : "border-stone-200 text-navy hover:border-stone-300"
        }`}
      >
        <GlobeIcon />
        <span className="font-medium">{labels[locale]}</span>
        <svg
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={`h-3 w-3 text-stone-400 transition-transform duration-200 ${
            open ? "rotate-180 text-teal" : ""
          }`}
        >
          <path
            d="M2.5 4.25L6 7.75l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`absolute right-0 z-50 mt-2 w-44 origin-top-right transition duration-150 ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <ul
          id={listId}
          role="listbox"
          aria-label="Language"
          className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white py-1.5 shadow-xl shadow-stone-900/10"
        >
          {LOCALES.map((code) => {
            const active = locale === code;
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    if (!active) {
                      router.replace(pathname, { locale: code });
                    }
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm transition ${
                    active
                      ? "bg-cream font-semibold text-navy"
                      : "text-stone-600 hover:bg-cream/70 hover:text-navy"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      active ? "bg-teal" : "bg-transparent"
                    }`}
                    aria-hidden
                  />
                  {labels[code]}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4 text-teal"
    >
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M3 10h14M10 3c2.2 2.4 3.3 4.7 3.3 7s-1.1 4.6-3.3 7c-2.2-2.4-3.3-4.7-3.3-7S7.8 5.4 10 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
