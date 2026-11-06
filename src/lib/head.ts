export type PageMeta = {
  title: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogImageAlt?: string
  path: string
}

export function canonicalUrl(seoBase: string, path: string): string {
  const base = seoBase.replace(/\/+$/, '')
  if (!path || path === '/') return `${base}/`
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p.replace(/\/+$/, '') || '/'}`
}

export function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')
}

/** CMS nav slugs may be mixed-case (`/Packages`); routes are lowercase. */
export function navHref(slug: string): string {
  if (!slug) return '/'
  if (isExternalHref(slug)) return slug
  const path = slug.startsWith('/') ? slug : `/${slug}`
  return path.toLowerCase()
}
