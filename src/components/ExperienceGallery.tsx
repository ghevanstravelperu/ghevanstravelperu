import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ScrollCarousel } from "@/components/ScrollCarousel";
import { EXPERIENCE_IMAGES } from "@/lib/tours";

export async function ExperienceGallery() {
  const t = await getTranslations("home");

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl text-navy sm:text-4xl">
            {t("experiencesTitle")}
          </h2>
          <p className="mt-3 text-stone-600">{t("experiencesSubtitle")}</p>
        </div>
        <ScrollCarousel
          className="mt-8"
          gapClassName="gap-4"
          previousLabel="Previous photos"
          nextLabel="Next photos"
        >
          {EXPERIENCE_IMAGES.map((src) => (
            <div
              key={src}
              className="relative aspect-[4/5] w-[calc((100%-1rem)/2)] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)]"
            >
              <Image
                src={src}
                alt="Travel experience in Peru"
                fill
                className="object-cover transition duration-700 ease-out hover:scale-[1.03]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ))}
        </ScrollCarousel>
      </div>
    </section>
  );
}
