import { expect, test } from '@playwright/test'

function expectSocialMetadata(html: string, path: '/' | '/resume/', origin: string) {
  const canonical = new URL(path, origin).toString()
  const socialImage = new URL('/images/social-preview.png', origin).toString()

  expect(html).toContain(`<link rel="canonical" href="${canonical}">`)
  expect(html).toContain(`<meta property="og:url" content="${canonical}">`)
  expect(html).toContain(`<meta property="og:image" content="${socialImage}">`)
  expect(html).toContain('<meta property="og:image:width" content="1200">')
  expect(html).toContain('<meta property="og:image:height" content="630">')
  expect(html).toContain('<meta property="og:image:type" content="image/png">')
  expect(html).toContain('<meta property="og:image:alt"')
  expect(html).toContain('<meta name="twitter:card" content="summary_large_image">')
  expect(html).toContain(`<meta name="twitter:image" content="${socialImage}">`)
}

test('publishes both portfolio routes with complete server-rendered social metadata', async ({ request }) => {
  const home = await request.get('/')
  const resume = await request.get('/resume')
  const homeHtml = await home.text()
  const resumeHtml = await resume.text()

  expect(home.status()).toBe(200)
  const localOrigin = new URL(home.url()).origin
  expect(homeHtml).toContain('<title>Caitlin Hawley — Frontend Developer &amp; Design System Builder</title>')
  expect(homeHtml).toContain('<meta name="description" content="Frontend developer in Franklin, Tennessee with 15+ years building accessible Vue, Nuxt, TypeScript, and design-system interfaces.">')
  expect(homeHtml).toContain('<meta property="og:title" content="Caitlin Hawley — Frontend Developer">')
  expect(homeHtml).toContain("localStorage.getItem('caitlin-theme')")
  expectSocialMetadata(homeHtml, '/', localOrigin)

  expect(resume.status()).toBe(200)
  expect(resumeHtml).toContain('<title>Caitlin Hawley — Résumé</title>')
  expect(resumeHtml).toContain('<meta name="description" content="Explore Caitlin Hawley’s 15+ years of frontend experience across Vue, Nuxt, TypeScript, accessibility, and design systems.">')
  expect(resumeHtml).toContain('<meta property="og:title" content="Caitlin Hawley — Résumé">')
  expectSocialMetadata(resumeHtml, '/resume/', localOrigin)
})

test('serves the social preview as an image', async ({ request }) => {
  const preview = await request.get('/images/social-preview.png')

  expect(preview.status()).toBe(200)
  expect(preview.headers()['content-type']).toContain('image/png')
})

test('publishes crawler files for the canonical domain', async ({ request }) => {
  const robots = await request.get('/robots.txt')
  const sitemap = await request.get('/sitemap.xml')

  expect(await robots.text()).toContain('Sitemap: https://www.caitlinhawley.com/sitemap.xml')
  expect(await sitemap.text()).toContain('https://www.caitlinhawley.com/resume')
})

test('publishes the documented screen typography tokens', async ({ page }) => {
  await page.goto('/')

  const tokens = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement)
    const names = [
      '--text-xs',
      '--text-sm',
      '--text-base',
      '--text-md',
      '--text-lg',
      '--text-xl',
      '--text-2xl',
      '--text-3xl',
      '--text-4xl',
      '--text-5xl',
      '--text-6xl',
      '--text-7xl',
      '--text-8xl',
      '--text-9xl',
      '--text-body',
      '--text-body-large',
      '--text-label',
      '--text-section-title',
      '--text-page-title',
    ]

    return Object.fromEntries(names.map(name => [name, styles.getPropertyValue(name).trim()]))
  })

  expect(tokens).toEqual({
    '--text-xs': '0.75rem',
    '--text-sm': '0.833rem',
    '--text-base': '1rem',
    '--text-md': '1.2rem',
    '--text-lg': '1.44rem',
    '--text-xl': '1.728rem',
    '--text-2xl': '2.074rem',
    '--text-3xl': '2.488rem',
    '--text-4xl': '2.986rem',
    '--text-5xl': '3.583rem',
    '--text-6xl': '4.3rem',
    '--text-7xl': '5.16rem',
    '--text-8xl': '6.192rem',
    '--text-9xl': '7.43rem',
    '--text-body': '1rem',
    '--text-body-large': '1.2rem',
    '--text-label': '0.833rem',
    '--text-section-title': 'clamp(2.074rem, 2.4vw, 2.986rem)',
    '--text-page-title': 'clamp(3.583rem, 5.25vw, 6.192rem)',
  })
})
