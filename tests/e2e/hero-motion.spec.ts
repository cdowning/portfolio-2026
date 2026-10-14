import { expect, test } from '@playwright/test'

test.describe('hero drafting scroll choreography', () => {
  test('desktop scroll drives a reversible native timeline through an authored runway', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hero = page.locator('#top')
    const stage = page.locator('.hero__stage')

    await expect(hero).toHaveAttribute('data-hero-motion', 'scroll')
    await expect.poll(() => stage.evaluate(element => getComputedStyle(element).position)).toBe('sticky')

    const geometry = await hero.evaluate((element) => {
      const stageElement = element.querySelector<HTMLElement>('.hero__stage')!
      return {
        heroTop: element.getBoundingClientRect().top + window.scrollY,
        travel: element.scrollHeight - stageElement.clientHeight,
        viewportHeight: window.innerHeight,
      }
    })

    expect(geometry.travel).toBeGreaterThanOrEqual(geometry.viewportHeight * 0.69)
    expect(geometry.travel).toBeLessThanOrEqual(geometry.viewportHeight * 0.81)

    await page.evaluate(({ heroTop }) => window.scrollTo({ top: heroTop, behavior: 'instant' }), geometry)
    await expect.poll(() => stage.evaluate(element => Number.parseFloat(
      getComputedStyle(element).getPropertyValue('--hero-progress'),
    ))).toBeCloseTo(0, 1)

    await page.evaluate(({ heroTop, travel }) => window.scrollTo({ top: heroTop + travel * 0.5, behavior: 'instant' }), geometry)
    await expect.poll(() => stage.evaluate(element => Number.parseFloat(
      getComputedStyle(element).getPropertyValue('--hero-progress'),
    ))).toBeGreaterThan(0.35)
    await expect.poll(() => stage.evaluate(element => Number.parseFloat(
      getComputedStyle(element).getPropertyValue('--hero-progress'),
    ))).toBeLessThan(0.75)

    await page.evaluate(({ heroTop, travel }) => window.scrollTo({ top: heroTop + travel + 1, behavior: 'instant' }), geometry)
    await expect.poll(() => stage.evaluate(element => Number.parseFloat(
      getComputedStyle(element).getPropertyValue('--hero-progress'),
    ))).toBeCloseTo(1, 1)

    await page.evaluate(({ heroTop }) => window.scrollTo({ top: heroTop, behavior: 'instant' }), geometry)
    await expect.poll(() => stage.evaluate(element => Number.parseFloat(
      getComputedStyle(element).getPropertyValue('--hero-progress'),
    ))).toBeCloseTo(0, 1)
  })

  test('laptop viewport receives the full sticky choreography without losing hero facts', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hero = page.locator('#top')
    const stage = page.locator('.hero__stage')

    await expect(hero).toHaveAttribute('data-hero-motion', 'scroll')
    await expect.poll(() => stage.evaluate(element => getComputedStyle(element).position)).toBe('sticky')
    await expect(page.getByText('15+ years', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('Interfaces that carry ideas further.', { exact: true })).toBeVisible()

    const geometry = await hero.evaluate((element) => {
      const stageElement = element.querySelector<HTMLElement>('.hero__stage')!
      return {
        heroTop: element.getBoundingClientRect().top + window.scrollY,
        travel: element.scrollHeight - stageElement.clientHeight,
      }
    })

    expect(geometry.travel).toBeGreaterThanOrEqual(768 * 0.69)

    await page.evaluate(({ heroTop, travel }) => window.scrollTo({
      top: heroTop + travel * 0.66,
      behavior: 'instant',
    }), geometry)
    await expect.poll(() => stage.evaluate(element => Number.parseFloat(
      getComputedStyle(element).getPropertyValue('--hero-progress'),
    ))).toBeGreaterThan(0.5)
    await expect.poll(() => stage.evaluate(element => Number.parseFloat(
      getComputedStyle(element).getPropertyValue('--hero-progress'),
    ))).toBeLessThan(0.9)
  })

  test('direct work navigation completes the hero without hiding primary content', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const cta = page.getByRole('link', { name: 'View my work' })

    await expect(cta).toBeVisible()
    await cta.click()

    await expect(page).toHaveURL(/#work$/)
    await expect(page.getByRole('heading', { name: 'Selected work' })).toBeVisible()
    await expect.poll(() => page.locator('.hero__stage').evaluate(element => Number.parseFloat(
      getComputedStyle(element).getPropertyValue('--hero-progress'),
    ))).toBeCloseTo(1, 1)
    await expect(page.getByRole('heading', {
      level: 1,
      name: 'I build thoughtful interfaces, from system to screen.',
    })).toHaveCSS('visibility', 'visible')
  })

  test('mobile uses a non-sticky compact reveal with no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hero = page.locator('#top')
    const stage = page.locator('.hero__stage')

    await expect(hero).toHaveAttribute('data-hero-motion', 'compact')
    await expect.poll(() => stage.evaluate(element => getComputedStyle(element).position)).not.toBe('sticky')
    await expect(page.locator('.hero__construction')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
  })

  test('very short desktop viewports avoid pinning so the complete hero remains reachable', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 640 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hero = page.locator('#top')
    const stage = page.locator('.hero__stage')

    await expect(hero).toHaveAttribute('data-hero-motion', 'compact')
    await expect.poll(() => stage.evaluate(element => getComputedStyle(element).position)).not.toBe('sticky')
    await expect(page.getByText('15+ years', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('Interfaces that carry ideas further.', { exact: true })).toBeVisible()
  })

  test('reduced motion exposes the completed construction without sticky movement', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hero = page.locator('#top')
    const stage = page.locator('.hero__stage')
    const solidArc = page.locator('.hero__construction-path--solid')

    await expect(hero).toHaveAttribute('data-hero-motion', 'reduced')
    await expect.poll(() => stage.evaluate(element => getComputedStyle(element).position)).not.toBe('sticky')
    await expect.poll(() => stage.evaluate(element => Number.parseFloat(
      getComputedStyle(element).getPropertyValue('--hero-progress'),
    ))).toBeCloseTo(1, 1)
    await expect.poll(() => solidArc.evaluate(element => getComputedStyle(element).clipPath)).toBe('inset(0px)')
    await expect(page.getByRole('link', { name: 'View my work' })).toBeVisible()
  })
})
