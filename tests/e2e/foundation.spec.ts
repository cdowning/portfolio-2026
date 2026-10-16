import { expect, test } from '@playwright/test'

const productionOrigin = 'https://www.caitlinhawley.com'
const socialImage = `${productionOrigin}/images/social-preview.png`

function expectSocialMetadata(html: string, path: '/' | '/resume') {
  const canonical = path === '/' ? `${productionOrigin}/` : `${productionOrigin}${path}`

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
  expect(homeHtml).toContain('<title>Caitlin Hawley — Frontend Developer &amp; Design System Builder</title>')
  expect(homeHtml).toContain('<meta property="og:title" content="Caitlin Hawley — Frontend Developer">')
  expect(homeHtml).toContain("localStorage.getItem('caitlin-theme')")
  expectSocialMetadata(homeHtml, '/')

  expect(resume.status()).toBe(200)
  expect(resumeHtml).toContain('<title>Caitlin Hawley — Résumé</title>')
  expect(resumeHtml).toContain('<meta property="og:title" content="Caitlin Hawley — Résumé">')
  expectSocialMetadata(resumeHtml, '/resume')
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
