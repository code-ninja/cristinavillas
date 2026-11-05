# Vendors

| Vendor | Role | Notes |
| --- | --- | --- |
| **Resend** | Transactional email (contact + booking) | Replaces **Postmark** / Strapi `POST /email`. API key in Worker secrets only. |
| **Strapi** | CMS (GraphQL) | Content only; not used for outbound email in this app. |
| **Google Analytics** | Analytics | Legacy `analytics.js`; ID from Strapi `settings.google_analytics`. Loaded via `client:defer`. |
| **Swaychat** | Chat widget | Widget ID from Strapi `settings.swaychat`. Loaded via `client:defer`. |
| **Google Sheets** | Booking log | Optional `GOOGLE_DOC` script URL; booking form GET before email. |
| **Cloudflare Workers** | Hosting + `/api/email` | Primary deploy target. |

**Deprecated:** Postmark and browser → Strapi `/email` (do not restore).

Update this file when adding, removing, or reconfiguring any vendor.
