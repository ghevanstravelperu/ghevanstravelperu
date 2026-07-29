import { WHATSAPP_NUMBER } from "./constants";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildTourWhatsAppMessage(tourName: string, locale: string) {
  const templates: Record<string, string> = {
    es: `¡Hola Ghevans Travel Peru! Me interesa el tour: ${tourName}.`,
    en: `Hi Ghevans Travel Peru! I'm interested in the ${tourName} tour.`,
    pt: `Olá Ghevans Travel Peru! Tenho interesse no tour: ${tourName}.`,
    fr: `Bonjour Ghevans Travel Peru ! Je suis intéressé(e) par le tour : ${tourName}.`,
  };

  return templates[locale] ?? templates.en;
}

export function buildGeneralWhatsAppMessage(locale: string) {
  const templates: Record<string, string> = {
    es: "¡Hola Ghevans Travel Peru! Me gustaría información sobre sus tours.",
    en: "Hi Ghevans Travel Peru! I'd like information about your tours.",
    pt: "Olá Ghevans Travel Peru! Gostaria de informações sobre seus tours.",
    fr: "Bonjour Ghevans Travel Peru ! J'aimerais des informations sur vos tours.",
  };

  return templates[locale] ?? templates.en;
}
