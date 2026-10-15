import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import { createPageSeo, SOCIAL_PREVIEW } from '../../app/utils/seo'

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
    'https://dev.caitlinhawley.com',
    'https://www.caitlinhawley.com',
  ])('keeps canonical and image URLs on the configured %s origin', (siteUrl) => {
    const { canonical, meta } = createPageSeo({
      siteUrl,
      path: '/resume',
      title: 'Caitlin Hawley — Résumé',
      description: 'Frontend developer experience, skills, tools, and education.',
      ogType: 'profile',
    })

    expect(canonical).toBe(`${siteUrl}/resume`)
    expect(meta).toMatchObject({
      ogUrl: `${siteUrl}/resume`,
      ogImage: `${siteUrl}${SOCIAL_PREVIEW.path}`,
      ogImageWidth: 1200,
      ogImageHeight: 630,
      ogImageType: 'image/png',
      ogImageAlt: SOCIAL_PREVIEW.alt,
      twitterCard: 'summary_large_image',
      twitterImage: `${siteUrl}${SOCIAL_PREVIEW.path}`,
    })
  })

  it('publishes a real 1200×630 PNG', () => {
    const image = readFileSync(socialPreviewPath)

    expect(image.subarray(1, 4).toString()).toBe('PNG')
    expect(readPngDimensions(socialPreviewPath)).toEqual({ width: 1200, height: 630 })
  })
})
