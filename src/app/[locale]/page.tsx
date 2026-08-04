import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExperienceGallery } from "@/components/ExperienceGallery";
import { Hero } from "@/components/Hero";
import { TourCard } from "@/components/TourCard";
import { ScrollCarousel } from "@/components/ScrollCarousel";
import { Link } from "@/i18n/navigation";
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
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: buildPageAlternates(locale, ""),
  };
}

export const revalidate = 0;

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

      <section className="relative overflow-hidden py-16 sm:py-20">
        <Image
          src="/images/about/family-valley.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-navy/88" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl text-white sm:text-4xl">
              {t("whyTitle")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              {t("whySubtitle")}
            </p>
          </div>

          <ol className="mt-12 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-3 md:gap-8">
            {(
              [
                { title: t("why1Title"), body: t("why1Body"), n: "01" },
                { title: t("why2Title"), body: t("why2Body"), n: "02" },
                { title: t("why3Title"), body: t("why3Body"), n: "03" },
              ] as const
            ).map((item, i) => (
              <li
                key={item.n}
                className="why-point group"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <span className="font-serif text-4xl text-teal transition duration-500 group-hover:text-orange sm:text-5xl">
                  {item.n}
                </span>
                <h3 className="mt-4 font-serif text-xl text-white">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-sm text-base leading-relaxed text-white/70">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ExperienceGallery />
    </>
  );
}
