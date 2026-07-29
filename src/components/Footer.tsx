import { useTranslations } from "next-intl";
import {
  GOOGLE_MAPS_URL,
  LOCATION,
  RUC,
  SITE_NAME,
  WHATSAPP_DISPLAY,
} from "@/lib/constants";
import { Link } from "@/i18n/navigation";
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
        </div>
        <div className="text-sm text-white/85">
          <p>{LOCATION}</p>
          <p className="mt-2">
            WhatsApp:{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              {WHATSAPP_DISPLAY}
            </a>
          </p>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block underline hover:text-white"
          >
            Google Maps
          </a>
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
