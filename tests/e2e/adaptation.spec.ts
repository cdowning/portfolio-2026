import { expect, test } from '@playwright/test'

test.describe('responsive navigation and editorial motion', () => {
  test('mobile navigation opens, closes with Escape, and follows an in-page destination', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const trigger = page.getByRole('button', { name: 'Open navigation' })
    const navigation = page.getByRole('navigation', { name: 'Primary' })

    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await trigger.click()
    await expect(page.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true')
    await expect(navigation).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(trigger).toBeFocused()
    await expect(navigation).not.toBeVisible()

    await trigger.click()
    await navigation.getByRole('link', { name: 'About' }).click()
    await expect(page).toHaveURL(/\/#about$/)
    await expect(navigation).not.toBeVisible()
  })

  test('desktop navigation reports the section currently in view', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/')

    await page.locator('#about').scrollIntoViewIfNeeded()
    await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'About' }))
      .toHaveAttribute('aria-current', 'location')
  })

  test('reduced motion removes spatial reveals while retaining visible content', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page.getByRole('heading', { name: 'Selected work' })).toBeVisible()
    const motionState = await page.locator('[data-reveal]').first().evaluate((element) => {
      const style = getComputedStyle(element)
      return {
        animationName: style.animationName,
        opacity: style.opacity,
        transform: style.transform,
      }
    })

    expect(motionState).toEqual({ animationName: 'none', opacity: '1', transform: 'none' })
  })
})

test.describe('responsive layout contract', () => {
  for (const width of [320, 390, 768, 1024]) {
    for (const route of ['/', '/resume']) {
      test(`${route} has no horizontal overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(route)

        const dimensions = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
        }))

        expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
      })
    }
  }

  for (const width of [320, 390]) {
    test(`visible mobile controls meet the 44px target at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      await page.getByRole('button', { name: 'Open navigation' }).click()

      const undersized = await page.locator('a:visible, button:visible').evaluateAll((elements) => (
        elements.flatMap((element) => {
          const box = element.getBoundingClientRect()
          return box.width < 44 || box.height < 44
            ? [{ label: element.getAttribute('aria-label') || element.textContent?.trim(), width: box.width, height: box.height }]
            : []
        })
      ))

      expect(undersized).toEqual([])
    })
  }
})
