import { expect, test } from '@playwright/test'

test('publishes both portfolio routes with their canonical metadata', async ({ request }) => {
  const home = await request.get('/')
  const resume = await request.get('/resume')

  expect(home.status()).toBe(200)
  expect(await home.text()).toContain('<title>Caitlin Hawley — Frontend Developer &amp; Design System Builder</title>')
  expect(resume.status()).toBe(200)
  expect(await resume.text()).toContain('<title>Caitlin Hawley — Résumé</title>')
})

test('publishes crawler files for the canonical domain', async ({ request }) => {
  const robots = await request.get('/robots.txt')
  const sitemap = await request.get('/sitemap.xml')

  expect(await robots.text()).toContain('Sitemap: https://www.caitlinhawley.com/sitemap.xml')
  expect(await sitemap.text()).toContain('https://www.caitlinhawley.com/resume')
})
