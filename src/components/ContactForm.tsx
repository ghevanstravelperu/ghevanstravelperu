"use client";

import { useLocale, useTranslations } from "next-intl";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const firstName = String(form.get("firstName") || "");
    const lastName = String(form.get("lastName") || "");
    const email = String(form.get("email") || "");
    const whatsapp = String(form.get("whatsapp") || "");
    const message = String(form.get("message") || "");

    const intro: Record<string, string> = {
      es: "¡Hola Ghevans Travel Peru!",
      en: "Hi Ghevans Travel Peru!",
      pt: "Olá Ghevans Travel Peru!",
      fr: "Bonjour Ghevans Travel Peru !",
    };

    const body = [
      intro[locale] ?? intro.en,
      "",
      `${firstName} ${lastName}`.trim(),
      email && `Email: ${email}`,
      whatsapp && `WhatsApp: ${whatsapp}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppUrl(body), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-stone-200 bg-[#f3ece2] p-6 shadow-sm sm:p-8"
    >
      <h2 className="font-serif text-2xl text-navy">{t("formTitle")}</h2>
      <p className="mt-2 text-sm text-stone-600">{t("formSubtitle")}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-navy">{t("firstName")} *</span>
          <input
            name="firstName"
            required
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 outline-none ring-teal focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-navy">{t("lastName")} *</span>
          <input
            name="lastName"
            required
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 outline-none ring-teal focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-navy">{t("email")} *</span>
          <input
            name="email"
            type="email"
            required
            placeholder="email@example.com"
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 outline-none ring-teal focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-navy">{t("whatsapp")}</span>
          <input
            name="whatsapp"
            type="tel"
            placeholder="+51 ..."
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 outline-none ring-teal focus:ring-2"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-navy">{t("message")} *</span>
          <textarea
            name="message"
            required
            rows={4}
            placeholder={t("messagePlaceholder")}
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 outline-none ring-teal focus:ring-2"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-teal px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-dark"
      >
        {t("send")}
      </button>
    </form>
  );
}
