import type { APIRoute } from 'astro'
import { seoLogo } from '../lib/env'

export const GET: APIRoute = ({ url }) => {
  const logo = seoLogo()
  if (!logo) return new Response(null, { status: 404 })
  return Response.redirect(new URL(logo, url.origin), 302)
}
