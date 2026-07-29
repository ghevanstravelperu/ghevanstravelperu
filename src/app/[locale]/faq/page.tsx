import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternateLanguages, buildFaqJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("faqTitle"),
    description: t("faqDescription"),
    alternates: {
      languages: buildAlternateLanguages("/faq"),
    },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");

  const keys = ["booking", "pickup", "payment", "languages", "custom"] as const;
  const items = keys.map((key) => ({
    q: t(`items.${key}.q`),
    a: t(`items.${key}.a`),
  }));
  const jsonLd = buildFaqJsonLd(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-4xl text-navy sm:text-5xl">{t("title")}</h1>
          <div className="mt-10 space-y-4">
            {items.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <summary className="cursor-pointer list-none font-semibold text-navy marker:content-none">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span className="text-teal transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-stone-700">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
