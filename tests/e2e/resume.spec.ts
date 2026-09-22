import { execFileSync } from 'node:child_process'
import { expect, test } from '@playwright/test'

test.describe('résumé', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/resume')
    await page.waitForLoadState('networkidle')
  })

  test('presents the approved web résumé hierarchy from factual content', async ({ page }) => {
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 1, name: 'Caitlin Hawley' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Professional profile' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Profile / Skills' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Toolkit' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Let’s build something thoughtful.' })).toBeVisible()

    await expect(page.getByRole('article', { name: 'Allocate, Senior Frontend Engineer' })).toBeVisible()
    await expect(page.getByRole('article', { name: 'Allocate, Frontend Engineer' })).toBeVisible()
    await expect(page.getByRole('article', { name: 'Quore, Frontend Developer' })).toBeVisible()
    await expect(page.getByRole('article', { name: 'NIC, Inc, Senior User Interface Designer' })).toBeVisible()
    await expect(page.getByRole('article', { name: 'NIC, Inc, User Interface Designer' })).toBeVisible()
    await expect(page.getByRole('article', { name: 'ARS Interactive, Frontend Developer' })).toBeVisible()
    await expect(page.getByText('verified roles')).toHaveCount(0)

    const swatches = page.locator('.resume-intro__swatches .fabric-swatch')
    await expect(swatches).toHaveCount(4)
    expect(await swatches.first().evaluate((swatch) => ({
      backgroundImage: getComputedStyle(swatch).backgroundImage,
      maskImage: getComputedStyle(swatch).maskImage,
    }))).toEqual({
      backgroundImage: 'none',
      maskImage: expect.stringContaining('conic-gradient'),
    })
  })

  test('the print control invokes the browser print action', async ({ page }) => {
    await page.evaluate(() => {
      window.print = () => {
        document.documentElement.dataset.printInvoked = 'true'
      }
    })

    await page.getByRole('button', { name: 'Print résumé' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-print-invoked', 'true')
  })

  test('prints as exactly two US Letter pages', async ({ page }, testInfo) => {
    const pdfPath = testInfo.outputPath('resume.pdf')

    await page.emulateMedia({ media: 'print' })
    await expect(page.getByRole('heading', { name: 'How I work' })).toBeVisible()

    await page.pdf({
      format: 'Letter',
      path: pdfPath,
      preferCSSPageSize: true,
      printBackground: false,
    })

    const info = execFileSync('pdfinfo', [pdfPath], { encoding: 'utf8' })

    expect(info).toMatch(/^Pages:\s+2$/m)
    expect(info).toMatch(/^Page size:\s+612 x 792 pts \(letter\)$/m)
  })
})
