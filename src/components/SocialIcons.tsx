import { SOCIAL_LINKS } from "@/lib/constants";

export type SocialName = (typeof SOCIAL_LINKS)[number]["name"];

export function SocialIcon({
  name,
  className = "h-4 w-4",
}: {
  name: SocialName;
  className?: string;
}) {
  if (name === "Instagram") return <InstagramIcon className={className} />;
  if (name === "Facebook") return <FacebookIcon className={className} />;
  return <TikTokIcon className={className} />;
}

export function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.262 2.242 1.324 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.324 3.608-.975.975-2.242 1.262-3.608 1.324-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.324-.975-.975-1.262-2.242-1.324-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.324-3.608C4.532 2.583 5.8 2.295 7.165 2.233 8.431 2.175 8.811 2.163 12 2.163zm0 1.622c-3.15 0-3.522.012-4.764.069-1.04.048-1.77.24-2.309.78-.54.54-.732 1.269-.78 2.309-.057 1.242-.069 1.614-.069 4.764s.012 3.522.069 4.764c.048 1.04.24 1.77.78 2.309.54.54 1.269.732 2.309.78 1.242.057 1.614.069 4.764.069s3.522-.012 4.764-.069c1.04-.048 1.77-.24 2.309-.78.54-.54.732-1.269.78-2.309.057-1.242.069-1.614.069-4.764s-.012-3.522-.069-4.764c-.048-1.04-.24-1.77-.78-2.309-.54-.54-1.269-.732-2.309-.78-1.242-.057-1.614-.069-4.764-.069zm0 2.838a5.378 5.378 0 1 1 0 10.755A5.378 5.378 0 0 1 12 6.623zm0 1.622a3.755 3.755 0 1 0 0 7.51 3.755 3.755 0 0 0 0-7.51zm5.494-2.03a1.256 1.256 0 1 1 0 2.512 1.256 1.256 0 0 1 0-2.512z" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden>
      <path d="M13.5 22v-8.1h2.72l.41-3.16H13.5V8.72c0-.91.25-1.54 1.56-1.54h1.67V4.35c-.29-.04-1.28-.12-2.43-.12-2.4 0-4.05 1.47-4.05 4.16v2.32H7.7v3.16h2.55V22h3.25z" />
    </svg>
  );
}

export function TikTokIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2 6.34 6.34 0 0 0 9.49 21.5a6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52V6.8a4.85 4.85 0 0 1-.99-.11z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function MapsIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
    </svg>
  );
}

/** Icon-only socials for the empty space to the right of Contáctanos. */
export function HeaderSocialLinks() {
  return (
    <div className="flex items-center gap-0.5">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.name}: ${link.handle}`}
          title={link.handle}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-navy/70 transition hover:bg-white hover:text-teal"
        >
          <SocialIcon name={link.name} className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}
