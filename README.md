# Ghevans Travel Peru

Private tour website for Ghevans Travel Peru — Cusco, Peru.

## Stack

- **Next.js 16** (App Router)
- **next-intl** — Spanish, English, Portuguese, French
- **Tailwind CSS**
- **Sanity CMS** (optional at first — site ships with local tour data)
- **Vercel** hosting

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — auto-redirects to `/es`.

## Deploy (Vercel + GitHub)

1. Push this repo to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variables:
   - `NEXT_PUBLIC_SITE_URL=https://ghevanstravelperu.com`
   - `NEXT_PUBLIC_SANITY_PROJECT_ID=` (when Sanity is connected)
   - `NEXT_PUBLIC_SANITY_DATASET=production`
4. Connect domain `ghevanstravelperu.com`

## Sanity CMS (for Orlando)

1. Create a free project at [sanity.io](https://www.sanity.io)
2. Copy project ID into `.env.local`
3. Run `npx sanity dev` from project root (after linking)
4. Invite Orlando as **Editor** (Google login)
5. Orlando manages tours: add, edit, hide, delete

Until Sanity is connected, tours are loaded from `src/lib/tours.ts`.

## Orlando quick guide

1. Open Sanity Studio (bookmark the URL)
2. Click **Tour** → **Add** or edit existing
3. Write in **Español** tab
4. Set **Estado**: Publicado / Oculto / Borrador
5. Save

Hidden tours disappear from the website automatically.

## Contact

- WhatsApp: +51 983 344 198
- Google Maps: link on contact page (no walk-in office)
