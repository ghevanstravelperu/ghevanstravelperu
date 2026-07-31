# Ghevans Travel Peru

Private tour website for Ghevans Travel Peru — Cusco, Peru.

## Stack

- **Next.js 16** (App Router)
- **next-intl** — Spanish, English, Portuguese, French
- **Tailwind CSS**
- **Sanity CMS** — Orlando manages tours
- **Vercel** hosting

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — auto-redirects to `/es`.

## Sanity CMS setup

### 1. Create the Sanity project

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and sign in (Google is fine).
2. **Create project** → name it `Ghevans Travel Peru`.
3. Copy the **Project ID** (looks like `abc123xy`).

### 2. Local env vars

In `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your-write-token
```

**Write token:** Sanity → Project → **API** → **Tokens** → Add token with **Editor** rights.

### 3. CORS (required for Studio + website)

Sanity → Project → **API** → **CORS origins** → Add:

- `http://localhost:3000`
- `https://ghevanstravelperu.com`
- `https://ghevanstravelperu.vercel.app`

Allow credentials: **Yes**.

### 4. Seed the 9 tours

```bash
npm run sanity:seed
```

This uploads tour images and creates all 9 tours in Sanity.

### 5. Open Studio

**Local:** [http://localhost:3000/editar](http://localhost:3000/editar)

**Production:** `https://ghevanstravelperu.com/editar`

### 6. Vercel env vars

Add to Vercel → Settings → Environment Variables:

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | your project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SITE_URL` | `https://ghevanstravelperu.com` |
| `SANITY_API_WRITE_TOKEN` | write token (for translate button) |
| `GEMINI_API_KEY` | Google AI Studio key (free translate button) |

Redeploy after adding vars.

### 7. Invite Orlando

Sanity → Project → **Members** → Invite by email → role **Editor**.

Orlando only writes in **Español**. Use the **Traducir a EN / PT / FR** button to fill the other languages automatically.

## Orlando quick guide

1. Open **Editar** (`/editar`)
2. Click **Tours** → open a tour or create one
3. Fill in Spanish: nombre, descripciones, destacados
4. Tab **Precio y fotos**: precio, fotos, slug (Generate)
5. Set **¿Visible en la web?** → Publicado
6. Click **Publish**
7. Click **Traducir a EN / PT / FR** (bottom action bar) — wait for “¡Listo!”
8. Done — site updates within ~1 minute

## Deploy

Push to `main` on GitHub → Vercel auto-deploys.

## Contact

- WhatsApp: +51 983 344 198
- Google Maps: link on contact page (no walk-in office)
