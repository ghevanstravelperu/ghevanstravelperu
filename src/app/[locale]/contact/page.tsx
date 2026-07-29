import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { buildAlternateLanguages } from "@/lib/seo";
import {
  GOOGLE_MAPS_URL,
  LOCATION,
  WHATSAPP_DISPLAY,
} from "@/lib/constants";
import type { Locale } from "@/lib/constants";
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
    alternates: {
      languages: buildAlternateLanguages("/contact"),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const whatsappUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage(locale));

  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-navy sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-lg text-stone-600">{t("subtitle")}</p>
          <p className="mt-2 text-sm text-stone-500">{t("pickupNote")}</p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
          >
            {t("whatsappCta")}
          </a>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-navy px-6 py-3 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white"
          >
            {t("googleCta")}
          </a>
        </div>

        <div className="mt-10">
          <ContactForm />
        </div>

        <div className="mt-8 text-center text-sm text-stone-600">
          <p>{LOCATION}</p>
          <p className="mt-1">WhatsApp: {WHATSAPP_DISPLAY}</p>
        </div>
      </div>
    </section>
  );
}
