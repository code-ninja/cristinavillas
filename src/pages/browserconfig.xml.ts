import type { APIRoute } from 'astro'
import { seoLogo, seoThemeColor } from '../lib/env'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export const GET: APIRoute = () => {
  const logo = seoLogo()
  const tile = escapeXml(seoThemeColor())
  const logoTag = logo
    ? `\n            <square150x150logo src="${escapeXml(logo)}"/>`
    : ''

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>${logoTag}
            <TileColor>${tile}</TileColor>
        </tile>
    </msapplication>
</browserconfig>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
