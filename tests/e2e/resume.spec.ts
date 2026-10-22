import { execFileSync } from 'node:child_process'
import { expect, test } from '@playwright/test'

test.describe('résumé', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/resume')
    await page.waitForLoadState('networkidle')
  })

  test('V18 keeps profile copy, skill groups, and note on one wide-screen row', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })

    const layout = await page.locator('.resume-skills').evaluate((section) => {
      const items = [
        section.querySelector<HTMLElement>('.resume-skills-intro'),
        ...section.querySelectorAll<HTMLElement>('.resume-skills-group'),
        section.querySelector<HTMLElement>('aside'),
      ]
      if (items.some(item => !item)) throw new Error('Résumé skills composition is incomplete')

      return items.map((item) => {
        const bounds = item!.getBoundingClientRect()
        return { left: Math.round(bounds.left), top: Math.round(bounds.top) }
      })
    })

    expect(new Set(layout.map(item => item.top)).size).toBe(1)
    expect(layout.map(item => item.left)).toEqual([...layout.map(item => item.left)].sort((a, b) => a - b))
  })

  test('presents the approved web résumé hierarchy from factual content', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 1, name: 'Caitlin Hawley' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Professional profile' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Profile / Skills' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Toolkit' })).toBeVisible()
    const footer = page.locator('footer#contact.contact')
    await expect(footer.getByRole('heading', { name: 'Let’s make something thoughtful.' })).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Say hello' })).toBeVisible()
    await expect(footer.locator('.contact-marker strong')).toHaveText('07')
    await expect(footer.locator('.contact-flight')).toHaveCount(1)
    await expect(footer.getByText('Good people build great things.')).toHaveCount(0)
    await expect(page.locator('.resume-contact')).toHaveCount(0)

    await expect(page.getByRole('article', { name: 'Allocate, Senior Frontend Engineer' })).toBeVisible()
    await expect(page.getByRole('article', { name: 'Allocate, Frontend Engineer' })).toBeVisible()
    await expect(page.getByRole('article', { name: 'Quore, Frontend Developer' })).toBeVisible()
    await expect(page.getByRole('article', { name: 'NIC, Inc, Senior User Interface Designer' })).toBeVisible()
    await expect(page.getByRole('article', { name: 'NIC, Inc, User Interface Designer' })).toBeVisible()
    await expect(page.getByRole('article', { name: 'ARS Interactive, Frontend Developer' })).toBeVisible()
    await expect(page.getByText('verified roles')).toHaveCount(0)

    const swatches = page.locator('.resume-intro-swatches .fabric-swatch')
    await expect(swatches).toHaveCount(4)
    expect(await swatches.first().evaluate((swatch) => ({
      backgroundImage: getComputedStyle(swatch).backgroundImage,
      maskImage: getComputedStyle(swatch).maskImage,
    }))).toEqual({
      backgroundImage: 'none',
      maskImage: expect.stringContaining('conic-gradient'),
    })
  })

  test('fills only the current experience timeline marker', async ({ page }) => {
    const roles = page.locator('.resume-experience-list .timeline-item')
    const currentRole = roles.filter({ hasText: 'Senior Frontend Engineer' })

    await expect(currentRole).toHaveAttribute('aria-current', 'true')
    await expect(page.locator('.resume-experience-list .timeline-item[aria-current="true"]')).toHaveCount(1)

    const markerStyles = await roles.evaluateAll((items) => items.map((item) => {
      const role = getComputedStyle(item)
      const markerElement = item.querySelector<HTMLElement>('.timeline-marker')
      if (!markerElement) throw new Error('Timeline marker is missing')
      const marker = getComputedStyle(markerElement)

      return {
        current: item.getAttribute('aria-current') === 'true',
        fill: marker.backgroundColor,
        text: role.color,
      }
    }))

    expect(markerStyles[0]).toMatchObject({ current: true })
    expect(markerStyles[0]?.fill).toBe(markerStyles[0]?.text)

    for (const previousRole of markerStyles.slice(1)) {
      expect(previousRole.current).toBe(false)
      expect(previousRole.fill).not.toBe(previousRole.text)
    }
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

  test('keeps print white and black when the screen theme is dark', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('caitlin-theme', 'dark')
      document.documentElement.dataset.theme = 'dark'
    })
    await page.emulateMedia({ media: 'print' })

    const printPresentation = await page.locator('.resume-print').evaluate((element) => ({
      background: getComputedStyle(document.documentElement).backgroundColor,
      bodyBackground: getComputedStyle(document.body).backgroundColor,
      color: getComputedStyle(element).color,
      themeControlDisplay: getComputedStyle(document.querySelector<HTMLElement>('.theme-toggle')!).display,
    }))

    expect(printPresentation).toEqual({
      background: 'rgb(255, 255, 255)',
      bodyBackground: 'rgb(255, 255, 255)',
      color: 'rgb(17, 17, 17)',
      themeControlDisplay: 'none',
    })
  })

  test('prints as exactly two US Letter pages', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'PDF output is only available in desktop Chromium')
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
