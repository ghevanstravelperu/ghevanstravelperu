import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Machu Picchu, Peru"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 lg:py-28">
        <div className="max-w-xl">
          <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/90">
            {t("subtitle")}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-dark"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
