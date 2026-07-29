"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SITE_NAME } from "@/lib/constants";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("home") },
    { href: "/tours", label: t("tours") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
    { href: "/faq", label: t("faq") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 overflow-visible border-b border-stone-200/80 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-6">
        <Link href="/" className="flex shrink-0 items-center gap-3 sm:gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand/logo-mark-transparent.png?v=7"
            alt=""
            className="block h-[6rem] w-auto shrink-0 sm:h-[7rem]"
            aria-hidden
          />
          <div className="leading-none">
            <span className="block font-serif text-xl font-bold tracking-tight text-navy sm:text-2xl md:text-[1.75rem]">
              Ghevans Travel
            </span>
            <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.25em] text-teal sm:text-sm">
              Perú
            </span>
          </div>
          <span className="sr-only">{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-teal ${
                pathname === link.href ? "text-teal" : "text-navy/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="hidden rounded-full bg-teal px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-dark sm:inline-flex"
          >
            {t("contact")}
          </Link>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-stone-200/60 px-4 py-2 xl:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${
              pathname === link.href
                ? "bg-teal text-white"
                : "bg-white text-navy/80"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
