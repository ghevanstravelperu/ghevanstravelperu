import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { EXPERIENCE_IMAGES } from "@/lib/tours";

export async function ExperienceGallery() {
  const t = await getTranslations("home");

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl text-navy sm:text-4xl">
            {t("experiencesTitle")}
          </h2>
          <p className="mt-3 text-stone-600">{t("experiencesSubtitle")}</p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
          {EXPERIENCE_IMAGES.map((src, index) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-2xl ${
                index === 0 ? "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[320px]" : "aspect-square"
              }`}
            >
              <Image
                src={src}
                alt="Travel experience in Peru"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
