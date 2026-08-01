"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SITE_NAME } from "@/lib/constants";
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function Header() {
  const t = useTranslations("nav");
  const tWhatsapp = useTranslations("whatsapp");
  const locale = useLocale();
  const pathname = usePathname();
  const whatsappUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage(locale));

  const links = [
    { href: "/", label: t("home") },
    { href: "/tours", label: t("tours") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
    { href: "/faq", label: t("faq") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 overflow-visible border-b border-stone-200/80 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6 sm:py-5">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand/logo-mark-transparent.png?v=7"
            alt=""
            className="block h-12 w-auto shrink-0 sm:h-16 xl:h-[6.5rem]"
            aria-hidden
          />
          <div className="min-w-0 leading-none">
            <span className="block truncate font-serif text-base font-bold tracking-tight text-navy sm:text-2xl md:text-[1.75rem]">
              Ghevans Travel
            </span>
            <span className="mt-0.5 block text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-teal sm:mt-1 sm:text-sm sm:tracking-[0.25em]">
              Perú
            </span>
          </div>
          <span className="sr-only">{SITE_NAME}</span>
        </Link>

        <nav
          className="hidden items-center gap-x-1 rounded-full border border-stone-200/70 bg-white/55 px-2 py-1.5 shadow-sm backdrop-blur-sm xl:flex"
          aria-label="Primary"
        >
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.12em] transition ${
                  active
                    ? "bg-navy text-white"
                    : "text-stone-500 hover:bg-cream hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <LanguageSwitcher />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tWhatsapp("tooltip")}
            title={tWhatsapp("tooltip")}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#25D366] p-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(37,211,102,0.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-[0_14px_28px_-8px_rgba(37,211,102,0.85)] active:translate-y-0 sm:px-3.5 sm:py-2"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition duration-700 ease-out group-hover:translate-x-full" />
            <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 fill-current"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </span>
            <span className="relative hidden sm:inline">
              {tWhatsapp("headerCta")}
            </span>
          </a>
        </div>
      </div>

      <nav
        className="border-t border-stone-200/60 xl:hidden"
        aria-label="Primary"
      >
        <div className="flex gap-2 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition ${
                  active
                    ? "bg-navy text-white"
                    : "bg-white/80 text-stone-500 ring-1 ring-stone-200/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
