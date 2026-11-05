# SEO reference

## Canonical and Open Graph

- Canonical: `{SEO_URL}` + path, no trailing slash (except `/`).
- `og:url` must match the **page** URL (not always the site root).
- Default `og:type`: `website`.
- `twitter:card`: `summary`.
- `twitter:site`: `@FbmResorts`.
- Do **not** add `twitter:title`, `twitter:description`, or `twitter:image` (X uses OG tags).

## Sitemap

- Dynamic **`/sitemap.xml`** from `src/pages/sitemap.xml.ts` (Strapi-published routes).
- Dynamic **`/robots.txt`** (`src/pages/robots.txt.ts`) points at `{SEO_URL}/sitemap.xml`, so each domain advertises its own sitemap.
- **`/site.webmanifest`** (`src/pages/site.webmanifest.ts`) is built from `SEO_NAME`, `SEO_SHORT_NAME`, `SEO_BG`, `SEO_TC`, and `SEO_LOGO`.
- Favicon / apple-touch-icon / `browserconfig.xml` come from **`SEO_LOGO`** at request time (same role as Nuxt `@nuxtjs/pwa` `icon.iconSrc`). Do not commit a site-specific `public/favicon.ico`.
- `SEO_URL` is a runtime variable per Worker; never hard-code a domain in `public/`.

## Headings

- One **`h1`** per page (hero title).

## JSON-LD

- Add helpers in `src/lib/schema.ts` when introducing structured data; avoid inline schema in layouts.
