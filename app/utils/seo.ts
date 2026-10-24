export const SOCIAL_PREVIEW = {
  path: '/images/social-preview.png',
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'Caitlin Hawley — frontend developer creating thoughtful interfaces from system to screen.',
} as const

export const SITE_NAME = 'Caitlin Hawley'
export const PRODUCTION_ORIGIN = 'https://www.caitlinhawley.com'
export const DEFAULT_LOCAL_ORIGIN = 'http://localhost:3000'

export const CANONICAL_PATH_POLICY = {
  trailingSlash: true,
} as const

export type CanonicalPath = '/' | '/resume/'
export type PublicRoutePath = CanonicalPath | '/resume'
export type SearchEnvironment = 'local' | 'preview' | 'production'

export interface SearchRouteRecord {
  key: 'home' | 'resume'
  path: CanonicalPath
  title: string
  description: string
  ogTitle: string
  ogType: 'profile' | 'website'
}

export interface SearchSite {
  environment: SearchEnvironment
  indexable: boolean
  origin: string
  siteName: typeof SITE_NAME
  trailingSlash: typeof CANONICAL_PATH_POLICY.trailingSlash
}

export const SEARCH_ROUTES = {
  home: {
    key: 'home',
    path: '/',
    title: 'Caitlin Hawley — Frontend Developer & Design System Builder',
    description: 'Frontend developer in Franklin, Tennessee with 15+ years building accessible Vue, Nuxt, TypeScript, and design-system interfaces.',
    ogTitle: 'Caitlin Hawley — Frontend Developer',
    ogType: 'website',
  },
  resume: {
    key: 'resume',
    path: '/resume/',
    title: 'Caitlin Hawley — Résumé',
    description: 'Explore Caitlin Hawley’s 15+ years of frontend experience across Vue, Nuxt, TypeScript, accessibility, and design systems.',
    ogTitle: 'Caitlin Hawley — Résumé',
    ogType: 'profile',
  },
} as const satisfies Record<SearchRouteRecord['key'], SearchRouteRecord>

interface PageSeoOptions {
  requestUrl?: string
  siteUrl: string
  route: SearchRouteRecord
}

function normalizeOrigin(siteUrl: string): URL {
  const origin = new URL(siteUrl)

  if (origin.protocol !== 'http:' && origin.protocol !== 'https:') {
    throw new TypeError(`Unsupported site URL protocol: ${origin.protocol}`)
  }

  return new URL(origin.origin)
}

function isLocalHostname(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]'
}

export function toCanonicalPath(path: PublicRoutePath): CanonicalPath {
  return path === '/' ? '/' : '/resume/'
}

export function resolveSearchSite(siteUrl: string): SearchSite {
  const origin = normalizeOrigin(siteUrl)
  const environment: SearchEnvironment = origin.origin === PRODUCTION_ORIGIN
    ? 'production'
    : isLocalHostname(origin.hostname)
      ? 'local'
      : 'preview'

  return {
    environment,
    indexable: environment === 'production',
    origin: origin.origin,
    siteName: SITE_NAME,
    trailingSlash: CANONICAL_PATH_POLICY.trailingSlash,
  }
}

export function resolveEnvironmentOrigin(siteUrl: string, requestUrl?: string): string {
  const configuredOrigin = normalizeOrigin(siteUrl).origin

  if (configuredOrigin !== DEFAULT_LOCAL_ORIGIN || !requestUrl) {
    return configuredOrigin
  }

  return normalizeOrigin(requestUrl).origin
}

export function createCanonicalUrl(siteUrl: string, path: PublicRoutePath): string {
  const { origin } = resolveSearchSite(siteUrl)
  return new URL(toCanonicalPath(path), `${origin}/`).toString()
}

export function createPageSeo(options: PageSeoOptions) {
  const site = resolveSearchSite(resolveEnvironmentOrigin(options.siteUrl, options.requestUrl))
  const canonical = createCanonicalUrl(site.origin, options.route.path)
  const image = new URL(SOCIAL_PREVIEW.path, `${site.origin}/`).toString()

  return {
    canonical,
    meta: {
      title: options.route.title,
      description: options.route.description,
      ogSiteName: site.siteName,
      ogTitle: options.route.ogTitle,
      ogDescription: options.route.description,
      ogType: options.route.ogType,
      ogUrl: canonical,
      ogImage: image,
      ogImageWidth: SOCIAL_PREVIEW.width,
      ogImageHeight: SOCIAL_PREVIEW.height,
      ogImageType: SOCIAL_PREVIEW.type,
      ogImageAlt: SOCIAL_PREVIEW.alt,
      twitterCard: 'summary_large_image' as const,
      twitterTitle: options.route.ogTitle,
      twitterDescription: options.route.description,
      twitterImage: image,
      twitterImageAlt: SOCIAL_PREVIEW.alt,
    },
  }
}
