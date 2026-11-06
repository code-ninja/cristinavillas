// @ts-check
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cloudflare from '@astrojs/cloudflare'
import vue from '@astrojs/vue'
import { defineConfig, envField } from 'astro/config'
import clientDefer from './integrations/client-after-ready.mjs'
import clientInteract from './integrations/client-interact.mjs'

// One build serves several resort domains, so every per-site value is a runtime secret: it is read
// from the Cloudflare Worker/Pages variables on each request and never inlined at build time.
const runtime = (optional = true) => envField.string({ context: 'server', access: 'secret', optional })

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cristinavillasmountainresort.com' },
      { protocol: 'https', hostname: '**.casaazulresort.com' },
      { protocol: 'https', hostname: '**.bosobosohighlands.com' },
    ],
  },
  env: {
    schema: {
      API_URL: runtime(false),
      SEO_URL: runtime(false),
      SEO_NAME: runtime(),
      SEO_SHORT_NAME: runtime(),
      SEO_BG: runtime(),
      SEO_TC: runtime(),
      SEO_LOGO: runtime(),
      GOOGLE_DOC: runtime(),
      RESEND_API_KEY: runtime(),
      RESEND_FROM_DOMAIN: runtime(),
      RESEND_FROM_NAME: runtime(),
      RESEND_FROM_ADDRESS: runtime(),
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    resolve: {
      alias: {
        '~assets': path.join(fileURLToPath(new URL('.', import.meta.url)), 'assets'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
        },
      },
    },
    ssr: {
      noExternal: ['swiper'],
    },
  },
  integrations: [vue(), clientDefer(), clientInteract()],
})
