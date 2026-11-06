import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware((context, next) => {
  const method = context.request.method
  if (method !== 'GET' && method !== 'HEAD') return next()

  const { pathname, search } = context.url
  if (pathname.startsWith('/cdn-cgi/') || pathname.startsWith('/_astro/')) return next()

  const lower = pathname.toLowerCase()
  if (pathname === lower) return next()

  return context.redirect(`${lower}${search}`, 301)
})
