import type { APIRoute } from 'astro'
import { handleEmailPost } from '../../lib/email'

export const POST: APIRoute = async ({ request }) => {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const result = await handleEmailPost(body)
  return new Response(JSON.stringify(result.ok ? { ok: true } : { ok: false, error: result.error }), {
    status: result.status,
    headers: { 'Content-Type': 'application/json' },
  })
}
