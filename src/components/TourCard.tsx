import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/constants";
import { formatTourPrice, type Tour } from "@/lib/tours";

export async function TourCard({
  tour,
  locale,
}: {
  tour: Tour;
  locale: Locale;
}) {
  const t = await getTranslations("tours");
  const content = tour.content[locale];
  const price = formatTourPrice(tour, locale, {
    from: t("from"),
    customQuote: t("customQuote"),
  });

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/80 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={tour.image}
          alt={content.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl font-semibold text-navy">
          {content.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-teal">{tour.duration}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone-600">
          {content.shortDescription}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="text-sm font-semibold text-navy">{price}</p>
          <Link
            href={`/tours/${tour.slug}`}
            className="text-sm font-medium text-teal hover:underline"
          >
            {t("viewDetails")} →
          </Link>
        </div>
      </div>
    </article>
  );
}
