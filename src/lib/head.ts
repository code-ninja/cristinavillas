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
