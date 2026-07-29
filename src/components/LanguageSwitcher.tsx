"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALES } from "@/lib/constants";

const labels: Record<string, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
  fr: "FR",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="flex items-center rounded-full border border-stone-200 bg-white p-0.5 shadow-sm"
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => router.replace(pathname, { locale: code })}
          className={`min-w-9 rounded-full px-2.5 py-1 text-xs font-semibold transition ${
            locale === code
              ? "bg-navy text-white"
              : "text-navy/70 hover:text-navy"
          }`}
        >
          {labels[code]}
        </button>
      ))}
    </div>
  );
}
