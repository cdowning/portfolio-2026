export const SOCIAL_PREVIEW = {
  path: '/images/social-preview.png',
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'Caitlin Hawley — frontend developer creating thoughtful interfaces from system to screen.',
} as const

interface PageSeoOptions {
  siteUrl: string
  path: '/' | '/resume'
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogType?: 'profile' | 'website'
}

export function createPageSeo(options: PageSeoOptions) {
  const origin = new URL(options.siteUrl)
  const canonical = new URL(options.path, origin).toString()
  const image = new URL(SOCIAL_PREVIEW.path, origin).toString()

  return {
    canonical,
    meta: {
      title: options.title,
      description: options.description,
      ogTitle: options.ogTitle ?? options.title,
      ogDescription: options.ogDescription ?? options.description,
      ogType: options.ogType ?? 'website',
      ogUrl: canonical,
      ogImage: image,
      ogImageWidth: SOCIAL_PREVIEW.width,
      ogImageHeight: SOCIAL_PREVIEW.height,
      ogImageType: SOCIAL_PREVIEW.type,
      ogImageAlt: SOCIAL_PREVIEW.alt,
      twitterCard: 'summary_large_image' as const,
      twitterImage: image,
      twitterImageAlt: SOCIAL_PREVIEW.alt,
    },
  }
}
