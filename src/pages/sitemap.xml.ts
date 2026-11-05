import type { APIRoute } from 'astro'
import { getSitemapPaths } from '../lib/strapi'
import { seoUrl } from '../lib/env'

export const GET: APIRoute = async () => {
  const base = seoUrl()
  let paths: string[]
  try {
    paths = await getSitemapPaths()
  } catch {
    paths = ['/', '/contact']
  }

  const urls = paths
    .map(
      (path) =>
        `  <url><loc>${base}${path === '/' ? '/' : path}</loc></url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
