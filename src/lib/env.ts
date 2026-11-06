import { getSecret } from 'astro:env/server'

function read(key: string): string {
  return (getSecret(key) ?? '').trim()
}

export function apiUrl(): string {
  return read('API_URL').replace(/\/+$/, '')
}

export function seoUrl(): string {
  return read('SEO_URL').replace(/\/+$/, '')
}

export function seoName(): string {
  return read('SEO_NAME')
}

export function seoShortName(): string {
  return read('SEO_SHORT_NAME') || seoName()
}

export function seoBackground(): string {
  return read('SEO_BG') || '#2f2d2d'
}

export function seoThemeColor(): string {
  return read('SEO_TC') || '#2f2d2d'
}

/** Public path or URL of the PWA/favicon source image. Nuxt used `SEO_LOGO` with `@nuxtjs/pwa`. */
export function seoLogo(): string {
  let v = read('SEO_LOGO')
  if (!v) return ''
  if (/^https?:\/\//i.test(v)) return v
  v = v.replace(/^(assets|public|static)\//, '')
  return v.startsWith('/') ? v : `/${v}`
}

export function googleDocUrl(): string {
  return read('GOOGLE_DOC')
}

export function resendApiKey(): string {
  return read('RESEND_API_KEY')
}

export function resendFromDomain(): string {
  return read('RESEND_FROM_DOMAIN') || 'update.fbmgroup.co'
}

export function resendFromName(): string {
  return read('RESEND_FROM_NAME') || seoName()
}

export function resendFromAddress(): string {
  return read('RESEND_FROM_ADDRESS') || 'noreply'
}

/** Unique transforms = source × width only. format/quality do not add extras (CF Free 5k/month).
 *  hero 1920 — heroes, OG, PhotoSwipe
 *  card  800 — package / room / facility cards
 *  gallery 1200 — slider thumbs
 */
export type MediaSize = 'hero' | 'card' | 'gallery'

const MEDIA_WIDTH: Record<MediaSize, number> = {
  hero: 1920,
  card: 800,
  gallery: 1200,
}

function resolveMediaOrigin(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  const p = path.startsWith('/') ? path : `/${path}`
  return `${apiUrl()}${p}`
}

function cloudflareImageUrl(origin: string, size: MediaSize): string {
  const w = MEDIA_WIDTH[size]
  const params = `onerror=redirect,width=${w},quality=80,format=auto`
  const base = seoUrl()
  return `${base}/cdn-cgi/image/${params}/${origin}`
}

export function mediaUrl(
  path: string | undefined | null,
  size: MediaSize = 'hero',
): string {
  if (!path) return ''
  const origin = resolveMediaOrigin(path)
  if (import.meta.env.DEV) return origin
  return cloudflareImageUrl(origin, size)
}
