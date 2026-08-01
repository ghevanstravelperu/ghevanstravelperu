import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buildAlternateLanguages, buildTourJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/constants";
import {
  formatTourPrice,
  getAllTours,
  getTourBySlug,
  getTourDuration,
} from "@/lib/tours";
import { buildTourWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { TourItinerary } from "@/components/TourItinerary";
import { ScrollCarousel } from "@/components/ScrollCarousel";

export const revalidate = 0;

export async function generateStaticParams() {
  const locales: Locale[] = ["es", "en", "pt", "fr"];
  const tours = await getAllTours();
  return locales.flatMap((locale) =>
    tours.map((tour) => ({ locale, slug: tour.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return {};

  const content = tour.content[locale];
  return {
    title: `${content.name} | Ghevans Travel Peru`,
    description: content.shortDescription,
    alternates: {
      languages: buildAlternateLanguages(`/tours/${slug}`),
    },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const t = await getTranslations("tours");
  const content = tour.content[locale];
  const price = formatTourPrice(tour, locale, {
    from: t("from"),
    customQuote: t("customQuote"),
  });
  const whatsappUrl = buildWhatsAppUrl(
    buildTourWhatsAppMessage(content.name, locale),
  );
  const jsonLd = buildTourJsonLd(tour, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <Link href="/tours" className="text-sm font-medium text-teal hover:underline">
            ← {t("viewDetails")}
          </Link>
          <h1 className="mt-4 font-serif text-[2rem] leading-tight text-navy sm:text-5xl">
            {content.name}
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span className="rounded-full bg-teal/10 px-3 py-1 font-medium text-teal">
              {t("duration")}: {getTourDuration(tour, locale)}
            </span>
            <span className="rounded-full bg-navy/10 px-3 py-1 font-medium text-navy">
              {t("price")}: {price}
            </span>
          </div>

          <div
            className={`mt-8 overflow-hidden rounded-3xl ${
              tour.imageHeight &&
              tour.imageWidth &&
              tour.imageHeight > tour.imageWidth
                ? "mx-auto max-w-md sm:max-w-lg"
                : "w-full"
            }`}
          >
            <Image
              src={tour.image}
              alt={content.name}
              width={tour.imageWidth ?? 1600}
              height={tour.imageHeight ?? 1200}
              className="h-auto w-full"
              priority
              sizes={
                tour.imageHeight &&
                tour.imageWidth &&
                tour.imageHeight > tour.imageWidth
                  ? "(max-width: 640px) 100vw, 512px"
                  : "(max-width: 896px) 100vw, 896px"
              }
            />
          </div>

          <p className="mt-8 text-lg leading-relaxed text-stone-700">
            {content.fullDescription}
          </p>

          <TourItinerary
            title={t("itinerary")}
            stops={content.itinerary ?? []}
          />

          <div className="mt-8">
            <h2 className="font-serif text-2xl text-navy">{t("highlights")}</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {content.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-stone-700"
                >
                  <span className="mt-1 text-teal">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {tour.gallery.length > 0 && (
            <div className="mt-10">
              <h2 className="font-serif text-2xl text-navy">{t("gallery")}</h2>
              <ScrollCarousel
                className="mt-4"
                gapClassName="gap-4"
                previousLabel="Previous photos"
                nextLabel="Next photos"
              >
                {tour.gallery.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-[4/5] w-[calc((100%-1rem)/2)] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[calc((100%-2rem)/3)]"
                  >
                    <Image
                      src={src}
                      alt={content.name}
                      fill
                      className="object-cover transition duration-700 ease-out hover:scale-[1.03]"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </ScrollCarousel>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
            >
              {t("bookTour")}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-teal px-6 py-3 text-sm font-semibold text-teal transition hover:bg-teal hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
