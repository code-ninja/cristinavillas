# Agent guidelines — Cristina Villas (Astro)

Resort marketing site: **Astro** (SSR on Cloudflare Workers), **Vue 3 islands**, **Bootstrap 4 SCSS**, **Strapi** GraphQL, **Resend** email.

## File types

- **Pages and layouts:** `.astro` under `src/pages/` and `src/layouts/`.
- **Interactive UI:** `.vue` only under `src/components/`, mounted with `client:*` directives.

## Styling

- Styling is the original Nuxt stack: Bootstrap 4 SCSS + `assets/css/*.scss`, loaded through **`src/styles/site.scss`**. Use Bootstrap classes (`container`, `row`, `col-*`, utilities) in markup.
- Keep markup identical to the old Nuxt templates (`git show master:components/…`) so the SCSS selectors still match.
- `postcss.config.cjs` must keep `postcss-short` (and the rest of the Nuxt PostCSS chain). The SCSS uses its shorthand (`position: fixed 0 0 auto`, `size: …`); without it those declarations are dropped.

## Data

- Fetch Strapi on the **server** in `.astro` frontmatter via `src/lib/strapi.ts`.
- Missing content → **404**. API failure → **502** (`/502`).
- Never call Strapi `/email` (Postmark). Forms use **`POST /api/email`** → Resend only.

## Multi-domain config

- One build serves three domains (one Worker each). Per-site values are runtime secrets read through `src/lib/env.ts` (`getSecret` from `astro:env/server`); declare new ones in the `env.schema` in `astro.config.mjs`.
- Never use `import.meta.env` for site config, never set Astro `site`, and never hard-code a domain or favicon in `public/`. Build-time values get inlined and break the other domains. Per-site icons use `SEO_LOGO` (see `src/lib/env.ts`).

## Hydration

- Prefer `client:interact` and `client:defer` over `client:load`.
- Booking and contact forms: `client:interact="self"`.
- GA / Swaychat: `client:defer`.

## Docs

- SEO changes → update `SEO.md`.
- Vendor changes → update `VENDORS.md`.

## Quality

- Run `yarn build` before merging.
- Lighthouse: server HTML first, minimal island JS.
