import { useTranslations } from "next-intl";
import {
  GOOGLE_MAPS_URL,
  LOCATION,
  RUC,
  SITE_NAME,
  SOCIAL_LINKS,
  WHATSAPP_DISPLAY,
} from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import {
  MapsIcon,
  SocialIcon,
  WhatsAppIcon,
} from "@/components/SocialIcons";
import { buildWhatsAppUrl, buildGeneralWhatsAppMessage } from "@/lib/whatsapp";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const whatsappUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage(locale));

  return (
    <footer className="mt-auto border-t border-stone-200 bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl">{SITE_NAME}</p>
          <p className="mt-2 text-sm text-white/75">{t("tagline")}</p>
          <ul className="mt-5 space-y-2.5">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.name}: ${link.handle}`}
                  className="group inline-flex items-center gap-2.5 text-sm text-white/80 transition hover:text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition group-hover:bg-white/15">
                    <SocialIcon name={link.name} />
                  </span>
                  <span className="underline decoration-white/25 underline-offset-4 group-hover:decoration-white">
                    {link.handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-white/85">
          <p>{LOCATION}</p>
          <p className="mt-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp: ${WHATSAPP_DISPLAY}`}
              className="group inline-flex items-center gap-2.5 text-white/80 transition hover:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition group-hover:bg-white/15">
                <WhatsAppIcon />
              </span>
              <span className="underline decoration-white/25 underline-offset-4 group-hover:decoration-white">
                {WHATSAPP_DISPLAY}
              </span>
            </a>
          </p>
          <p className="mt-2.5">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Google Maps: ${SITE_NAME}`}
              className="group inline-flex items-center gap-2.5 text-white/80 transition hover:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition group-hover:bg-white/15">
                <MapsIcon />
              </span>
              <span className="underline decoration-white/25 underline-offset-4 group-hover:decoration-white">
                {SITE_NAME}
              </span>
            </a>
          </p>
        </div>
        <div className="text-sm text-white/75">
          <Link href="/tours" className="block hover:text-white">
            Tours
          </Link>
          <Link href="/about" className="mt-2 block hover:text-white">
            About
          </Link>
          <Link href="/contact" className="mt-2 block hover:text-white">
            Contact
          </Link>
          <Link href="/faq" className="mt-2 block hover:text-white">
            FAQ
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {SITE_NAME}. {t("rights")} RUC {RUC}
      </div>
    </footer>
  );
}
