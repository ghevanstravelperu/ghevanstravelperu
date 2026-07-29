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
} from "@/lib/tours";
import { buildTourWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  const locales: Locale[] = ["es", "en", "pt", "fr"];
  const tours = getAllTours();
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
  const tour = getTourBySlug(slug);
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
  const tour = getTourBySlug(slug);
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
        <div className="relative h-[45vh] min-h-[320px] w-full">
          <Image
            src={tour.image}
            alt={content.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <Link href="/tours" className="text-sm font-medium text-teal hover:underline">
            ← {t("viewDetails")}
          </Link>
          <h1 className="mt-4 font-serif text-4xl text-navy sm:text-5xl">
            {content.name}
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span className="rounded-full bg-teal/10 px-3 py-1 font-medium text-teal">
              {t("duration")}: {tour.duration}
            </span>
            <span className="rounded-full bg-navy/10 px-3 py-1 font-medium text-navy">
              {t("price")}: {price}
            </span>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-stone-700">
            {content.fullDescription}
          </p>

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
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {tour.gallery.map((src) => (
                  <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={src}
                      alt={content.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
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
