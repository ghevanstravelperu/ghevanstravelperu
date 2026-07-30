import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternateLanguages } from "@/lib/seo";
import type { Locale } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    alternates: {
      languages: buildAlternateLanguages("/about"),
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="font-serif text-4xl text-navy sm:text-5xl">{t("title")}</h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone-700">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="relative aspect-[3/5] overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/images/about/family-valley.jpg"
              alt="Ghevans Travel Peru family in the Sacred Valley"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
              priority
            />
          </div>
          <div className="relative aspect-[3/5] overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/images/about/family-waterfall.jpg"
              alt="Ghevans Travel Peru family at a waterfall in Peru"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/images/about/family-lagoon.jpg"
              alt="Ghevans Travel Peru family at a lagoon in Peru"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
