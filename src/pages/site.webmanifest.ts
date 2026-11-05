import type { APIRoute } from 'astro'
import { seoBackground, seoLogo, seoName, seoShortName, seoThemeColor } from '../lib/env'

export const GET: APIRoute = () => {
  const logo = seoLogo()
  return Response.json(
    {
      name: seoName(),
      short_name: seoShortName(),
      start_url: '/',
      display: 'standalone',
      background_color: seoBackground(),
      theme_color: seoThemeColor(),
      ...(logo
        ? {
            icons: [
              { src: logo, type: 'image/png', sizes: 'any', purpose: 'any' },
            ],
          }
        : {}),
    },
    { headers: { 'Content-Type': 'application/manifest+json' } },
  )
}
