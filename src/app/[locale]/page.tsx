import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExperienceGallery } from "@/components/ExperienceGallery";
import { Hero } from "@/components/Hero";
import { TourCard } from "@/components/TourCard";
import { ScrollCarousel } from "@/components/ScrollCarousel";
import { Link } from "@/i18n/navigation";
import { buildAlternateLanguages } from "@/lib/seo";
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
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      languages: buildAlternateLanguages(""),
    },
  };
}

export const revalidate = 60;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tours = await getAllTours();

  return (
    <>
      <Hero />
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl text-navy sm:text-4xl">
              {t("toursTitle")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              {t("toursSubtitle")}
            </p>
          </div>
          <ScrollCarousel previousLabel="Previous tours" nextLabel="Next tours">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="w-[calc(100%-1.5rem)] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] xl:w-[calc((100%-4.5rem)/4)]"
              >
                <TourCard tour={tour} locale={locale} />
              </div>
            ))}
          </ScrollCarousel>
          <div className="mt-10 text-center">
            <Link
              href="/tours"
              className="inline-flex rounded-full border border-teal px-6 py-3 text-sm font-semibold text-teal transition hover:bg-teal hover:text-white"
            >
              {t("viewAllTours")}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-[#f3ece2] py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl text-navy">{t("whyTitle")}</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {[t("why1"), t("why2"), t("why3")].map((item) => (
              <li
                key={item}
                className="rounded-2xl bg-white p-5 text-sm leading-relaxed text-stone-700 shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ExperienceGallery />
    </>
  );
}
