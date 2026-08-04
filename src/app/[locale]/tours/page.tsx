import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TourCard } from "@/components/TourCard";
import { buildPageAlternates } from "@/lib/seo";
import type { Locale } from "@/lib/constants";
import { getAllTours } from "@/lib/tours";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("toursTitle"),
    description: t("toursDescription"),
    alternates: buildPageAlternates(locale, "/tours"),
  };
}

export const revalidate = 0;

export default async function ToursPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tours");
  const tours = await getAllTours();

  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <h1 className="font-serif text-[2rem] leading-tight text-navy sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-stone-600">
            {t("subtitle")}
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
