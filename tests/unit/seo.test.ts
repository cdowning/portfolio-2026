import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import {
  createCanonicalUrl,
  createPageSeo,
  DEFAULT_LOCAL_ORIGIN,
  PRODUCTION_ORIGIN,
  resolveEnvironmentOrigin,
  resolveSearchSite,
  SEARCH_ROUTES,
  SITE_NAME,
  SOCIAL_PREVIEW,
  toCanonicalPath,
} from '../../app/utils/seo'

const socialPreviewPath = fileURLToPath(new URL('../../public/images/social-preview.png', import.meta.url))

function readPngDimensions(path: string) {
  const image = readFileSync(path)

  return {
    width: image.readUInt32BE(16),
    height: image.readUInt32BE(20),
  }
}

describe('social metadata contract', () => {
  it.each([
    ['https://dev.caitlinhawley.com', 'https://dev.caitlinhawley.com/resume/'],
    [PRODUCTION_ORIGIN, `${PRODUCTION_ORIGIN}/resume/`],
    [DEFAULT_LOCAL_ORIGIN, `${DEFAULT_LOCAL_ORIGIN}/resume/`],
  ])('keeps canonical and image URLs on the configured %s origin', (siteUrl, expectedCanonical) => {
    const { canonical, meta } = createPageSeo({
      siteUrl,
      route: SEARCH_ROUTES.resume,
    })

    expect(canonical).toBe(expectedCanonical)
    expect(meta).toMatchObject({
      title: 'Caitlin Hawley — Résumé',
      description: 'Explore Caitlin Hawley’s 15+ years of frontend experience across Vue, Nuxt, TypeScript, accessibility, and design systems.',
      ogSiteName: SITE_NAME,
      ogTitle: 'Caitlin Hawley — Résumé',
      ogDescription: 'Explore Caitlin Hawley’s 15+ years of frontend experience across Vue, Nuxt, TypeScript, accessibility, and design systems.',
      ogUrl: expectedCanonical,
      ogImage: `${siteUrl}${SOCIAL_PREVIEW.path}`,
      ogImageWidth: 1200,
      ogImageHeight: 630,
      ogImageType: 'image/png',
      ogImageAlt: SOCIAL_PREVIEW.alt,
      twitterCard: 'summary_large_image',
      twitterTitle: 'Caitlin Hawley — Résumé',
      twitterDescription: 'Explore Caitlin Hawley’s 15+ years of frontend experience across Vue, Nuxt, TypeScript, accessibility, and design systems.',
      twitterImage: `${siteUrl}${SOCIAL_PREVIEW.path}`,
      twitterImageAlt: SOCIAL_PREVIEW.alt,
    })
  })

  it('publishes a real 1200×630 PNG', () => {
    const image = readFileSync(socialPreviewPath)

    expect(image.subarray(1, 4).toString()).toBe('PNG')
    expect(readPngDimensions(socialPreviewPath)).toEqual({ width: 1200, height: 630 })
  })
})

describe('search identity and canonical routes', () => {
  it('owns approved route titles, descriptions, and canonical paths in one source', () => {
    expect(SITE_NAME).toBe('Caitlin Hawley')
    expect(SEARCH_ROUTES).toEqual({
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
    })
  })

  it.each([
    ['/', '/'],
    ['/resume', '/resume/'],
    ['/resume/', '/resume/'],
  ] as const)('normalizes %s to the canonical path %s', (path, expected) => {
    expect(toCanonicalPath(path)).toBe(expected)
  })

  it.each([
    [PRODUCTION_ORIGIN, 'production', true],
    [`${PRODUCTION_ORIGIN}/`, 'production', true],
    ['https://dev.caitlinhawley.com', 'preview', false],
    ['http://localhost:3000', 'local', false],
    ['http://127.0.0.1:4173', 'local', false],
  ] as const)('resolves %s as %s with indexable=%s', (siteUrl, environment, indexable) => {
    expect(resolveSearchSite(siteUrl)).toEqual({
      environment,
      indexable,
      origin: new URL(siteUrl).origin,
      siteName: SITE_NAME,
      trailingSlash: true,
    })
  })

  it('builds deterministic absolute URLs from normalized origins and paths', () => {
    expect(createCanonicalUrl('https://dev.caitlinhawley.com/', '/resume')).toBe('https://dev.caitlinhawley.com/resume/')
    expect(createCanonicalUrl('http://localhost:3000/', '/')).toBe('http://localhost:3000/')
    expect(() => createCanonicalUrl('not a URL', '/')).toThrow()
  })

  it('uses the active request origin only when the local fallback is configured', () => {
    expect(resolveEnvironmentOrigin(DEFAULT_LOCAL_ORIGIN, 'http://127.0.0.1:4310/resume')).toBe('http://127.0.0.1:4310')
    expect(resolveEnvironmentOrigin('https://dev.caitlinhawley.com', 'http://127.0.0.1:4310')).toBe('https://dev.caitlinhawley.com')
    expect(resolveEnvironmentOrigin(PRODUCTION_ORIGIN, 'http://127.0.0.1:4310')).toBe(PRODUCTION_ORIGIN)
  })
})
