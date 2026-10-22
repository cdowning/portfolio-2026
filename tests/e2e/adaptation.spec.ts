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

  test('mobile Contact navigation leaves the footer heading clear of the sticky header', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await expect(page.getByRole('button', { name: 'Close navigation' })).toBeVisible()
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL(/\/#contact$/)

    await expect.poll(async () => page.evaluate(() => {
      const header = document.querySelector<HTMLElement>('.site-header')
      const footer = document.querySelector<HTMLElement>('footer#contact')
      if (!header || !footer) throw new Error('Header or footer is missing')
      return footer.getBoundingClientRect().top - header.getBoundingClientRect().bottom
    })).toBeGreaterThanOrEqual(0)
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
  test('uses the shared mobile-first breakpoints for chrome and major grids', async ({ page }) => {
    for (const width of [320, 640, 768, 1024, 1280, 1536]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')

      const layout = await page.evaluate(() => {
        const columns = (selector: string) => {
          const element = document.querySelector<HTMLElement>(selector)
          if (!element) throw new Error(`${selector} is missing`)
          return getComputedStyle(element).gridTemplateColumns.split(' ').length
        }
        const marker = document.querySelector<HTMLElement>('.section-marker')
        const trigger = document.querySelector<HTMLElement>('.nav-trigger')
        if (!marker || !trigger) throw new Error('Shared chrome is missing')

        return {
          heroColumns: columns('.hero-stage'),
          markerBorder: Number.parseFloat(getComputedStyle(marker).borderRightWidth),
          triggerDisplay: getComputedStyle(trigger).display,
          workColumns: columns('.work-grid'),
        }
      })

      expect(layout.triggerDisplay, `navigation at ${width}px`).toBe(width >= 768 ? 'none' : 'flex')
      expect(layout.markerBorder, `marker at ${width}px`).toBe(width >= 640 ? 1 : 0)
      expect(layout.heroColumns, `hero at ${width}px`).toBe(width >= 1024 ? 2 : 1)
      expect(layout.workColumns, `work at ${width}px`).toBe(width >= 1024 ? 3 : 1)
    }
  })

  test('mobile header keeps the complete wordmark compact', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto('/')

    const wordmark = await page.locator('.brand > span').evaluate((element) => {
      const styles = getComputedStyle(element)
      return {
        height: element.getBoundingClientRect().height,
        lineHeight: Number.parseFloat(styles.lineHeight),
        text: element.textContent?.trim(),
      }
    })

    expect(wordmark.text).toBe('Frontend developer')
    expect(wordmark.height).toBeLessThanOrEqual(wordmark.lineHeight * 1.1)
  })

  test('mobile résumé removes repeated copy and compacts capability tags', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 })
    await page.goto('/resume')

    await expect(page.locator('.resume-intro-summary')).not.toBeVisible()

    const columns = await page.locator('.resume-intro-profile ul').evaluate((element) => (
      getComputedStyle(element).gridTemplateColumns.split(' ').length
    ))
    expect(columns).toBe(2)
  })

  test('mobile numbered sections share one compact rail-free marker gutter', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 })

    for (const route of ['/', '/resume']) {
      await page.goto(route)
      const markers = await page.locator('.section-marker').evaluateAll((elements) => (
        elements.map((element) => ({
          border: Number.parseFloat(getComputedStyle(element).borderRightWidth),
          width: element.getBoundingClientRect().width,
        }))
      ))

      expect(markers.length, route).toBeGreaterThan(0)
      expect(markers.every(({ border }) => border === 0), route).toBe(true)
      expect(markers.every(({ width }) => width <= 24), `${route}: ${JSON.stringify(markers)}`).toBe(true)
    }

    await page.goto('/')
    const experience = await page.locator('#experience').evaluate((element) => {
      const marker = element.querySelector<HTMLElement>('.experience-marker')
      const heading = element.querySelector<HTMLElement>('.experience-heading')
      const timeline = element.querySelector<HTMLElement>('.experience-list')
      if (!marker || !heading || !timeline) throw new Error('Experience composition is missing')

      return {
        columns: getComputedStyle(element).gridTemplateColumns.split(' ').length,
        headingLeft: heading.getBoundingClientRect().left,
        markerBorder: Number.parseFloat(getComputedStyle(marker).borderRightWidth),
        markerLeft: marker.getBoundingClientRect().left,
        timelineRule: getComputedStyle(timeline, '::before').width,
      }
    })

    expect(experience.columns).toBe(2)
    expect(experience.markerBorder).toBe(0)
    expect(experience.headingLeft).toBeGreaterThan(experience.markerLeft)
    expect(experience.timelineRule).toBe('1px')
  })

  test('tablet retains the full résumé and Experience compositions', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 })

    await page.goto('/resume')
    await expect(page.locator('.resume-intro-summary')).toBeVisible()

    await page.goto('/')
    const experience = await page.locator('#experience').evaluate((element) => {
      const marker = element.querySelector<HTMLElement>('.experience-marker')
      if (!marker) throw new Error('Experience marker is missing')
      return {
        columns: getComputedStyle(element).gridTemplateColumns.split(' ').length,
        markerBorder: Number.parseFloat(getComputedStyle(marker).borderRightWidth),
      }
    })

    expect(experience.columns).toBeGreaterThan(1)
    expect(experience.markerBorder).toBe(1)
  })

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

  for (const footer of [
    { route: '/', footer: '.contact' },
    { route: '/resume', footer: '.contact' },
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

  for (const route of ['/', '/resume']) {
    test(`${route} preserves the shared footer contract across responsive contexts`, async ({ page }) => {
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(route)

        const footer = page.locator('footer#contact')
        const presentation = await footer.evaluate((element) => {
          const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('a'))
          const flight = element.querySelector<SVGElement>('.contact-flight')
          if (!flight) throw new Error('Footer flight artwork is missing')

          return {
            focusOrder: links.map((link) => link.textContent?.trim()),
            flightDisplay: getComputedStyle(flight).display,
            footerRight: element.getBoundingClientRect().right,
            footerWidth: element.getBoundingClientRect().width,
          }
        })

        expect(presentation.focusOrder, `${route} at ${width}px`).toEqual([
          'Say hello',
          'LinkedIn',
          'GitHub',
          'CodePen',
        ])
        expect(presentation.footerWidth, `${route} at ${width}px`).toBeCloseTo(width, 0)
        expect(presentation.footerRight, `${route} at ${width}px`).toBeLessThanOrEqual(width)
        expect(presentation.flightDisplay, `${route} at ${width}px`)
          .toBe(width >= 1024 ? 'block' : 'none')

        for (const label of ['Say hello', 'LinkedIn', 'GitHub', 'CodePen']) {
          const bounds = await footer.getByRole('link', { name: label, exact: true }).boundingBox()
          expect(bounds, `${label} on ${route} at ${width}px`).not.toBeNull()
          expect(bounds!.width, `${label} width on ${route} at ${width}px`).toBeGreaterThanOrEqual(44)
          expect(bounds!.height, `${label} height on ${route} at ${width}px`).toBeGreaterThanOrEqual(44)
        }
      }
    })

    test(`${route} stacks the footer brand before 2xl without shrinking the airplane`, async ({ page }) => {
      for (const width of [1024, 1440, 1536]) {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(route)

        const presentation = await page.locator('footer#contact').evaluate((element) => {
          const brand = element.querySelector<HTMLElement>('.contact-brand')
          const airplane = element.querySelector<SVGImageElement>('.contact-airplane')
          if (!brand || !airplane) throw new Error('Footer composition is incomplete')

          return {
            airplaneWidth: airplane.getBoundingClientRect().width,
            brandColumn: getComputedStyle(brand).gridColumnStart,
            columns: getComputedStyle(element).gridTemplateColumns.split(' ').length,
          }
        })

        expect(presentation.columns, `${route} at ${width}px`).toBe(width >= 1536 ? 3 : 2)
        expect(presentation.brandColumn, `${route} at ${width}px`).toBe(width >= 1536 ? '3' : '2')
        expect(presentation.airplaneWidth, `${route} at ${width}px`).toBeGreaterThanOrEqual(96)
      }
    })

    test(`${route} keeps the primary footer action visibly focused`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 })
      await page.goto(route)

      const action = page.getByRole('contentinfo').getByRole('link', { name: 'Say hello' })
      await action.focus()

      const focus = await action.evaluate((element) => {
        const style = getComputedStyle(element)
        return { outlineStyle: style.outlineStyle, outlineWidth: Number.parseFloat(style.outlineWidth) }
      })

      expect(focus.outlineStyle).toBe('solid')
      expect(focus.outlineWidth).toBeGreaterThanOrEqual(2)
    })
  }

  for (const viewport of [
    { width: 667, height: 375 },
    { width: 844, height: 390 },
  ]) {
    for (const route of ['/', '/resume']) {
      test(`${route} keeps the footer contained at ${viewport.width}×${viewport.height}`, async ({ page }) => {
        await page.setViewportSize(viewport)
        await page.goto(route)

        const dimensions = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
        }))

        expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
      })
    }
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
