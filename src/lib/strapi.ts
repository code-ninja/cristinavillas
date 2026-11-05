import { apiUrl } from './env'

export class StrapiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message)
    this.name = 'StrapiError'
  }
}

export async function graphql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const url = `${apiUrl()}/graphql`
  let res: Response
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    })
  } catch {
    throw new StrapiError('Unable to reach content API.', 502)
  }

  if (!res.ok) {
    throw new StrapiError('Content API returned an error.', 502)
  }

  const json = (await res.json()) as { data?: T; errors?: unknown[] }
  if (json.errors?.length) {
    throw new StrapiError('Content API query failed.', 502)
  }
  if (!json.data) {
    throw new StrapiError('Content API returned no data.', 502)
  }
  return json.data
}

export type NavLink = {
  id: string
  label: string
  slug: string
  header: boolean
  footer: boolean
}

export type SiteChrome = {
  navlinks: NavLink[]
  settings: { name: string; text: string }[]
  packages: {
    id: string
    name: string
    slug: string
    img: { url: string }
  }[]
}

const SITE_CHROME_QUERY = `
  query SiteChrome {
    navlinks(sort: "sort:asc", where: { published: true }) {
      id
      label
      slug
      header
      footer
    }
    settings(where: { published: true }) {
      name
      text
    }
    packages(where: { published: true }) {
      id
      name
      slug
      img {
        url
      }
    }
  }
`

export async function getSiteChrome(): Promise<SiteChrome> {
  return graphql<SiteChrome>(SITE_CHROME_QUERY)
}

export type MainPage = {
  slug: string
  pagetitle: string
  metadesc: string
  hero: { url: string }
  herotitle: string
  summary?: string
  extras?: Record<string, unknown>
  images?: { url: string }[]
}

export async function getMainPage(slug: string): Promise<MainPage | null> {
  const escaped = slug.replace(/"/g, '\\"')
  const data = await graphql<{ mainpages: MainPage[] }>(
    `query {
      mainpages(where: { slug: "${escaped}", published: true }) {
        slug pagetitle metadesc hero { url } herotitle summary extras images { url }
      }
    }`,
  )
  return data.mainpages[0] ?? null
}

export async function getHomePage(): Promise<{ page: MainPage; facilities: Facility[] } | null> {
  const data = await graphql<{ mainpages: MainPage[]; facilities: Facility[] }>(
    `query {
      mainpages(where: { slug: "/", published: true }) {
        slug pagetitle metadesc hero { url } herotitle summary extras images { url }
      }
      facilities(limit: 3, where: { published: true }) {
        url name img { url }
      }
    }`,
  )
  if (!data.mainpages.length) return null
  return { page: data.mainpages[0], facilities: data.facilities }
}

export type Room = {
  url: string
  name: string
  desc: string
  img: { url: string }
  price: string
  capacity: string
  images: { url: string }[]
  notes?: string
  size?: string
}

export async function getRoomsList(): Promise<Room[]> {
  const data = await graphql<{ rooms: Room[] }>(
    `query Rooms {
      rooms(sort: "price:asc", where: { published: true }) {
        url name desc img { url } price capacity images { url }
      }
    }`,
  )
  return data.rooms
}

export async function getRoomByUrl(url: string): Promise<Room | null> {
  const escaped = url.replace(/"/g, '\\"')
  const data = await graphql<{ rooms: Room[] }>(
    `query {
      rooms(where: { url: "${escaped}", published: true }) {
        url name desc img { url } price capacity images { url } notes size
      }
    }`,
  )
  return data.rooms[0] ?? null
}

export type Facility = {
  id: string
  name: string
  url: string
  desc?: string
  bigdesc?: string
  img: { url: string }
  gallery?: { url: string }[]
}

export async function getFacilities(): Promise<Facility[]> {
  const data = await graphql<{ facilities: Facility[] }>(
    `query Facilities {
      facilities(where: { published: true }) { id name url desc img { url } }
    }`,
  )
  return data.facilities
}

export async function getFacilityById(id: string): Promise<Facility | null> {
  const escaped = id.replace(/"/g, '\\"')
  const data = await graphql<{ facilities: Facility[] }>(
    `query {
      facilities(where: { id: "${escaped}", published: true }) {
        name url bigdesc desc img { url } gallery { url }
      }
    }`,
  )
  return data.facilities[0] ?? null
}

export type Package = {
  id: string
  name: string
  slug: string
  description?: string
  img: { url: string }
}

export async function getPackages(): Promise<Package[]> {
  const data = await graphql<{ packages: Package[] }>(
    `query Packages {
      packages(where: { published: true }) { id name slug img { url } }
    }`,
  )
  return data.packages
}

export async function getPackageBySlug(slug: string): Promise<Package | null> {
  const escaped = slug.replace(/"/g, '\\"')
  const data = await graphql<{ packages: Package[] }>(
    `query {
      packages(where: { slug: "${escaped}", published: true }) {
        id name slug description img { url }
      }
    }`,
  )
  return data.packages[0] ?? null
}

export type Faq = { id: string; Question: string; Answer: string }

export async function getFaqs(): Promise<Faq[]> {
  const data = await graphql<{ faqs: Faq[] }>(`query { faqs { id Question Answer } }`)
  return data.faqs
}

export type Rate = {
  id: string
  name: string
  count: string
  capacity: string
  day: string
  night: string
  daynight: string
  excess: string
  ratetype: string
}

export async function getRates(): Promise<Rate[]> {
  const data = await graphql<{ rates: Rate[] }>(
    `query { rates(sort: "sort:asc", where: { publish: true }) {
      id name count capacity day night daynight excess ratetype
    }}`,
  )
  return data.rates
}

export async function getSitemapPaths(): Promise<string[]> {
  const [rooms, facilities, packages] = await Promise.all([
    getRoomsList(),
    getFacilities(),
    getPackages(),
  ])
  const staticPaths = [
    '/',
    '/accommodations',
    '/facilities',
    '/packages',
    '/contact',
    '/rates',
    '/faqs',
    '/advisory',
    '/privacy',
    '/terms',
  ]
  return [
    ...staticPaths,
    ...rooms.map((r) => `/accommodations/${r.url}`),
    ...facilities.map((f) => `/facilities/${f.id}`),
    ...packages.map((p) => `/packages/${p.slug}`),
  ]
}
