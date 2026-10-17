import { expect, test } from '@playwright/test'

type Rgb = [number, number, number]

function parseRgb(value: string): Rgb {
  const channels = value.match(/\d+(?:\.\d+)?/g)?.slice(0, 3).map(Number)
  if (!channels || channels.length !== 3) throw new Error(`Unable to parse color: ${value}`)
  return channels as Rgb
}

function luminance([red, green, blue]: Rgb) {
  const [r, g, b] = [red, green, blue].map((channel) => {
    const value = channel / 255
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(foreground: string, background: string) {
  const lighter = Math.max(luminance(parseRgb(foreground)), luminance(parseRgb(background)))
  const darker = Math.min(luminance(parseRgb(foreground)), luminance(parseRgb(background)))
  return (lighter + 0.05) / (darker + 0.05)
}

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

  test('Experience navigation returns from the résumé to the homepage timeline', async ({ page }) => {
    await page.goto('/resume')
    await page.waitForFunction(() => document.documentElement.dataset.motion === 'enhanced')

    if ((page.viewportSize()?.width ?? 0) <= 640) {
      await page.getByRole('button', { name: 'Open navigation' }).click()
      await expect(page.getByRole('button', { name: 'Close navigation' })).toBeVisible()
    }

    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Experience' }).click()

    await expect(page).toHaveURL(/\/#experience$/)
    await expect(page.locator('#experience').getByRole('heading', { name: 'Experience' })).toBeVisible()
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
  for (const route of ['/', '/resume']) {
    test(`${route} renders labeled social links locally with mobile touch targets`, async ({ page }) => {
      const iconifyRequests: string[] = []
      page.on('request', (request) => {
        if (request.url().includes('api.iconify.design')) iconifyRequests.push(request.url())
      })

      await page.setViewportSize({ width: 390, height: 844 })
      await page.goto(route)

      const footer = page.getByRole('contentinfo')
      for (const label of ['LinkedIn', 'GitHub', 'CodePen']) {
        const link = footer.getByRole('link', { name: label, exact: true })
        await expect(link).toBeVisible()
        await expect(link.locator('svg')).toHaveAttribute('aria-hidden', 'true')

        const bounds = await link.boundingBox()
        expect(bounds, `${label} on ${route}`).not.toBeNull()
        expect(bounds!.width, `${label} width on ${route}`).toBeGreaterThanOrEqual(44)
        expect(bounds!.height, `${label} height on ${route}`).toBeGreaterThanOrEqual(44)
      }

      expect(iconifyRequests).toEqual([])
    })
  }

  test('keeps the About photo note below the adjacent body copy', async ({ page }) => {
    for (const width of [1024, 1152, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')

      const positions = await page.locator('#about').evaluate((element) => {
        const copy = element.querySelector<HTMLElement>('.about-copy')
        const note = element.querySelector<HTMLElement>('.about-note')
        if (!copy || !note) throw new Error('About composition is missing')

        return {
          copyBottom: copy.getBoundingClientRect().bottom,
          noteTop: note.getBoundingClientRect().top,
        }
      })

      expect(positions.noteTop, `viewport ${width}px`).toBeGreaterThanOrEqual(positions.copyBottom)
    }
  })

  test('/resume keeps the footer annotation below the curve', async ({ page }) => {
    const footer = { footer: '.resume-contact', drawing: '.resume-contact-drawing', note: '.resume-contact-drawing p' }
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/resume')

    const noteOffsetRatio = await page.locator(footer.footer).evaluate((element, selectors) => {
      const drawing = element.querySelector<HTMLElement>(selectors.drawing)
      const note = element.querySelector<HTMLElement>(selectors.note)
      if (!drawing || !note) throw new Error('Footer composition is missing')

      const drawingRect = drawing.getBoundingClientRect()
      const noteRect = note.getBoundingClientRect()
      return (noteRect.top - drawingRect.top) / drawingRect.height
    }, footer)

    expect(noteOffsetRatio).toBeGreaterThanOrEqual(.56)
  })

  for (const footer of [
    { route: '/', footer: '.contact' },
    { route: '/resume', footer: '.resume-contact' },
  ]) {
    for (const selection of [
      {
        theme: 'light',
        background: 'rgb(15, 14, 14)',
        color: 'rgb(246, 189, 96)',
        contrast: 11.35,
      },
      {
        theme: 'dark',
        background: 'rgb(21, 20, 18)',
        color: 'rgb(199, 149, 145)',
        contrast: 7.13,
      },
    ] as const) {
      test(`${footer.route} keeps selected footer text visible in ${selection.theme} mode`, async ({ page }) => {
        await page.addInitScript((theme) => localStorage.setItem('caitlin-theme', theme), selection.theme)
        await page.setViewportSize({ width: 1440, height: 900 })
        await page.goto(footer.route)

        const presentation = await page.locator(footer.footer).evaluate((element) => {
          const copy = element.querySelector<HTMLElement>('p')
          if (!copy) throw new Error('Footer copy is missing')

          const footerStyles = getComputedStyle(element)
          const selectionStyles = getComputedStyle(copy, '::selection')

          return {
            footerBackground: footerStyles.backgroundColor,
            footerColor: footerStyles.color,
            selectionBackground: selectionStyles.backgroundColor,
            selectionColor: selectionStyles.color,
          }
        })

        expect(presentation.selectionBackground).toBe(presentation.footerColor)
        expect(presentation.selectionColor).toBe(presentation.footerBackground)
        expect(presentation.selectionBackground).toBe(selection.background)
        expect(presentation.selectionColor).toBe(selection.color)
        expect(contrast(presentation.selectionColor, presentation.selectionBackground))
          .toBeCloseTo(selection.contrast, 2)
      })
    }
  }

  for (const route of ['/', '/resume']) {
    test(`${route} header rule spans the viewport without widening the header content`, async ({ page }) => {
      await page.setViewportSize({ width: 2048, height: 900 })
      await page.goto(route)

      const header = page.getByRole('banner')
      const bounds = await header.boundingBox()
      const rule = await header.evaluate((element) => {
        const style = getComputedStyle(element, '::after')
        return { width: Number.parseFloat(style.width), height: Number.parseFloat(style.height), color: style.backgroundColor }
      })

      expect(bounds).not.toBeNull()
      expect(bounds!.x).toBeGreaterThan(0)
      expect(bounds!.width).toBeLessThan(2048)
      expect(rule).toEqual({ width: 2048, height: 1, color: 'rgb(222, 213, 203)' })
    })
  }

  for (const route of ['/', '/resume']) {
    test(`${route} gold footer reaches both viewport edges on wide screens`, async ({ page }) => {
      await page.setViewportSize({ width: 2048, height: 900 })
      await page.goto(route)

      const footer = page.locator('footer#contact')
      const bounds = await footer.boundingBox()

      expect(bounds).not.toBeNull()
      expect(bounds!.x).toBeCloseTo(0, 0)
      expect(bounds!.width).toBeCloseTo(2048, 0)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(2048)
    })
  }

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
