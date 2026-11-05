# FBM Resorts site (Cristina Villas, Casa Azul, Boso-Boso)

Astro SSR site shared by the FBM resort properties. One repository and one build serve all three domains; each domain is a separate Cloudflare Worker with its own variables. Content comes from each resort's Strapi; form email goes out through Resend.

| Site | Domain | Suggested Worker name |
| --- | --- | --- |
| Cristina Villas | `cristinavillasmountainresort.com` | `cristinavillas` |
| Casa Azul | `casaazulresort.com` | `casaazul` |
| Boso-Boso Highlands | `bosobosohighlands.com` | `bosoboso` |

## How deploys work

**Push to `master` and Cloudflare builds and deploys automatically.** This site is server-rendered (pages are built per request from Strapi), so it runs as a Worker rather than a static Pages site, and one push redeploys all three domains at once.

Nothing per-site is baked into the build. `API_URL`, `SEO_URL`, Resend settings and so on are read from the Worker's **Variables and Secrets** on every request (via `astro:env` secrets in `astro.config.mjs`). That is what lets one build serve three domains. `.env` is only for local development and is never deployed.

## Requirements

- Node.js **22.12+**
- Yarn 1

## Variables

Set these per Worker (dashboard: **Workers & Pages → _worker_ → Settings → Variables and Secrets**). Use type **Secret** for `RESEND_API_KEY`; the rest can be plain text.

| Variable | Required | Purpose | Cristina Villas example |
| --- | --- | --- | --- |
| `API_URL` | yes | Strapi base URL for this resort | `https://api.cristinavillasmountainresort.com` |
| `SEO_URL` | yes | Public site URL: canonical, OG, sitemap, robots | `https://cristinavillasmountainresort.com` |
| `SEO_NAME` | | Web manifest name; default email From name | `Cristina Villas Mountain Resort` |
| `SEO_SHORT_NAME` | | Web manifest short name (defaults to `SEO_NAME`) | `cristinavillas` |
| `SEO_BG` | | Manifest background colour (default `#2f2d2d`) | `"#2f2d2d"` (quote hex values in `.env` / `.dev.vars`) |
| `SEO_TC` | | Manifest / browser theme colour (default `#2f2d2d`) | `"#2f2d2d"` |
| `SEO_LOGO` | | Favicon, apple-touch-icon, and manifest icon. Path under `public/` or a full URL. Source PNGs already in the repo: `/img/cv-big-logo.png`, `/img/ca-big-logo.png`, `/img/bsbs-big-logo.png` | `/img/cv-big-logo.png` |
| `GOOGLE_DOC` | | Google Apps Script URL that logs bookings to a sheet | |
| `RESEND_API_KEY` | for email | Resend API key (**Secret**) | `re_…` |
| `RESEND_FROM_DOMAIN` | | Verified Resend domain (default `update.fbmgroup.co`) | `update.fbmgroup.co` |
| `RESEND_FROM_NAME` | | From display name (defaults to `SEO_NAME`) | `Cristina Villas` |
| `RESEND_FROM_ADDRESS` | | From local part (default `noreply`) | `noreply` |

The site name, recipient email, analytics and Swaychat IDs come from each resort's Strapi settings, not from variables.

`wrangler.jsonc` sets `keep_vars: true`, so deploys never wipe variables set in the dashboard. Secrets are always kept.

## Local development

```sh
cp .env.SAMPLE .env        # astro dev reads .env
yarn install
yarn dev                   # http://localhost:4321
```

To run the real Worker runtime locally, put the same variables in `.dev.vars` (gitignored), then:

```sh
yarn build
npx wrangler dev           # http://localhost:8787, reads .dev.vars
```

Switching `SEO_URL`/`API_URL` in `.dev.vars` and restarting `wrangler dev` (no rebuild) shows that site's canonical URLs, `robots.txt` and manifest.

Pages render without `RESEND_API_KEY`; `/api/email` returns an error until it is set.

## Cloudflare Workers setup (recommended)

Repeat these steps once per domain (three Workers, all from the same repo).

1. **Create the Worker from Git.** Dashboard → **Workers & Pages → Create → Workers → Import a repository** → GitHub → `code-ninja/cristinavillas`.
2. **Name** the Worker (`cristinavillas`, `casaazul`, `bosoboso`). The `name` in `wrangler.jsonc` does not need to match: Workers Builds overrides it with the connected Worker's name.
3. **Build settings:**
   - Production branch: `master`
   - Build command: `yarn build`
   - Deploy command: `npx wrangler deploy`
   - Root directory: `/`
   - Non-production branch builds: optional. If enabled, other branches get preview URLs via `npx wrangler versions upload`.
   - If the build picks the wrong Node version, add build variable `NODE_VERSION` = `22`.
4. **Variables and Secrets.** Under **Settings → Variables and Secrets**, add the variables from the table above with that domain's values. Add them before the first deploy, or redeploy afterwards. These are runtime variables, not "Build variables".
5. **Custom domain.** Under **Settings → Domains & Routes → Add → Custom domain**, add the apex (for example `casaazulresort.com`) and `www.` if used. The zone must be on Cloudflare; Cloudflare creates the DNS records and certificate. Remove any old A/CNAME records pointing to the previous Nuxt server first.
6. **Deploy.** Push to `master` (or select **Retry build** on the first build). Check `https://<domain>/robots.txt`: the sitemap line should show that domain.

### Manual deploy from your machine (optional)

```sh
npx wrangler login
yarn build
npx wrangler deploy --name casaazul
npx wrangler secret put RESEND_API_KEY --name casaazul
```

Without `--name`, Wrangler deploys to `cristinavillas`.

## Cloudflare Pages setup (alternative)

Workers are preferred, but the same build also runs on Pages (Astro writes `dist/_worker.js`, which Pages runs as an advanced-mode Function). Per domain:

1. **Workers & Pages → Create → Pages → Connect to Git** → `code-ninja/cristinavillas`.
2. Framework preset: **Astro**. Build command `yarn build`. Output directory `dist`. Production branch `master`.
3. **Settings → Runtime:** compatibility date `2026-11-05`, compatibility flag `nodejs_compat`. These are required, and Pages does not read `wrangler.jsonc` for them.
4. **Settings → Variables and secrets:** add the same variables as the Workers table, for **Production** (and Preview if you use it).
5. **Custom domains:** add the domain, then retry the deployment so it picks up the variables.

Do not run both a Worker and a Pages project on the same domain.

## Resend setup

All three sites send from one shared, verified subdomain: **`update.fbmgroup.co`**. From addresses look like `Cristina Villas <noreply@update.fbmgroup.co>`. Replies go to the guest (the form sets `reply_to`), and the recipient is the email in each resort's Strapi settings.

1. **Add the domain.** [resend.com/domains](https://resend.com/domains) → **Add domain** → enter `update.fbmgroup.co` (the subdomain, not `fbmgroup.co`). Region: Tokyo (`ap-northeast-1`) is closest to the Philippines.
2. **Add the DNS records** Resend shows to the `fbmgroup.co` zone. If that zone is on Cloudflare, use Resend's **Sign in to Cloudflare** option to add them automatically. Otherwise add them by hand (DNS only, not proxied):
   - **TXT** `resend._domainkey.update`: DKIM public key
   - **MX** `send.update` → `feedback-smtp.<region>.amazonses.com`, priority 10 (bounce handling)
   - **TXT** `send.update`: `v=spf1 include:amazonses.com ~all`

   These do not conflict with existing records (for example old Postmark DKIM records under `update`). Leave those in place until cutover is done.
3. **Verify.** Select **Verify DNS records** and wait for **Verified** (minutes to a few hours).
4. **Optional DMARC:** TXT `_dmarc.fbmgroup.co` = `v=DMARC1; p=none; rua=mailto:<you>@fbmgroup.co` if `fbmgroup.co` has none yet.
5. **API key.** [resend.com/api-keys](https://resend.com/api-keys) → **Create API key** → permission **Sending access**, domain `update.fbmgroup.co`. Create one key per Worker (for example `cristinavillas-prod`) so each can be revoked independently.
6. **Set variables** on each Worker: `RESEND_API_KEY` (Secret). `RESEND_FROM_DOMAIN=update.fbmgroup.co` is the default and can be omitted. Set `RESEND_FROM_NAME` per resort if it should differ from `SEO_NAME`.
7. **Test.** Submit the contact form on each domain and check **Resend → Emails** for the delivery log.

`RESEND_FROM_DOMAIN` must exactly match a domain verified in Resend, or Resend rejects the send with a 403. To send from each resort's own domain instead (for example `noreply@send.casaazulresort.com`), verify that domain in Resend as well and set `RESEND_FROM_DOMAIN` on that Worker.

## Email flow

Forms POST **`/api/email`** with structured JSON (`type`: `contact` | `booking`). The Worker builds the message and sends it through Resend. Strapi's `/email` (Postmark) is no longer used.
