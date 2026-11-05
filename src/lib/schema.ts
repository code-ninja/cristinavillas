export function buildLodgingBusinessSchema(input: {
  name: string
  url: string
  telephone?: string
  email?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: input.name,
    url: input.url,
    ...(input.telephone ? { telephone: input.telephone } : {}),
    ...(input.email ? { email: input.email } : {}),
  }
}
