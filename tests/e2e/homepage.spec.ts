import { expect, test } from '@playwright/test'

test.describe('homepage composition', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('presents the approved editorial structure and primary navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
    await expect(page.getByRole('heading', {
      level: 1,
      name: 'I build thoughtful interfaces, from system to screen.',
    })).toBeVisible()

    for (const label of ['Work', 'About', 'Experience', 'Contact']) {
      await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: label })).toBeVisible()
    }
    await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Experience' }))
      .toHaveAttribute('href', '/#experience')
    await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Resume' }))
      .toHaveCount(0)

    await expect(page.getByRole('link', { name: 'View my work' })).toHaveAttribute('href', '#work')
    await expect(page.getByRole('heading', { name: 'Selected work' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'About / How I work' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible()
    await expect(page.getByText('15+ years', { exact: true })).toHaveCount(2)
    await expect(page.getByText('10+ years', { exact: true })).toHaveCount(0)
    await expect(page.getByText('Experience builds perspective')).toHaveCount(0)
    const experienceAside = page.locator('.experience__aside')
    await expect(experienceAside).toBeVisible()
    await expect(experienceAside).toBeEmpty()
    await expect.poll(() => page.locator('.experience').evaluate((element) => (
      getComputedStyle(element).gridTemplateColumns.trim().split(/\s+/).length
    ))).toBe(4)
    await expect(page.getByRole('heading', { name: 'Toolkit' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Let’s make something thoughtful.' })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      await page.evaluate(() => document.documentElement.clientWidth),
    )
  })

  test('uses verified project destinations without invented portfolio metrics', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'View Component library' })).toHaveAttribute(
      'href',
      'https://storybook.caitlinhawley.com/',
    )
    await expect(page.getByRole('link', { name: 'View Interaction studies' })).toHaveAttribute(
      'href',
      'https://codepen.io/cdowning',
    )
    await expect(page.getByRole('link', { name: 'View Frontend systems' })).toHaveAttribute(
      'href',
      '/resume#experience',
    )

    await expect(page.getByText('12 Projects')).toHaveCount(0)
    await expect(page.getByText('28 Tasks')).toHaveCount(0)
    await expect(page.getByRole('img', { name: /Sunlight spilling over clouds/i })).toBeVisible()
  })

  test('lowers the desktop résumé action without shifting tablet or mobile', async ({ page }) => {
    const resumeAction = page.getByRole('link', { name: 'View full resume' })

    for (const viewport of [
      { width: 1440, expectedBottom: 19.2 },
      { width: 1024, expectedBottom: 36 },
      { width: 390, expectedBottom: 36 },
    ]) {
      await page.setViewportSize({ width: viewport.width, height: 900 })
      await page.goto('/')

      await expect.poll(() => resumeAction.evaluate(element => (
        Number.parseFloat(getComputedStyle(element).bottom)
      ))).toBeCloseTo(viewport.expectedBottom, 1)
    }
  })

  test('renders handwritten annotations with Lindsey Signature from Adobe Fonts', async ({ page }) => {
    const note = page.locator('.hero__margin-note')

    await expect(page.locator('link[rel="stylesheet"][href="https://use.typekit.net/dsu3xor.css"]'))
      .toHaveCount(1)
    await expect.poll(() => note.evaluate(element => (
      getComputedStyle(element).fontFamily.replaceAll('"', '')
    ))).toBe('lindsey-signature, Dawning of a New Day, cursive')
    await page.evaluate(() => document.fonts.ready)

    expect(await page.evaluate(() => Array.from(document.fonts).some(font => (
      font.family === 'lindsey-signature' && font.status === 'loaded'
    )))).toBe(true)
  })

  test('places the handwritten note in the lower white copy panel', async ({ page }) => {
    const presentation = await page.locator('.hero__margin-note').evaluate((element) => {
      const copy = element.closest<HTMLElement>('.hero__copy')
      const facts = copy?.querySelector<HTMLElement>('.hero__facts')
      if (!copy || !facts) throw new Error('Hero copy panel is missing')

      const noteRect = element.getBoundingClientRect()
      const copyRect = copy.getBoundingClientRect()
      const factsRect = facts.getBoundingClientRect()
      const styles = getComputedStyle(element)

      return {
        backgroundColor: styles.backgroundColor,
        borderStyle: styles.borderTopStyle,
        color: styles.color,
        fontSize: Number.parseFloat(styles.fontSize),
        insetLeft: noteRect.left - copyRect.left,
        insetRight: copyRect.right - noteRect.right,
        noteBottom: noteRect.bottom,
        factsTop: factsRect.top,
        startsInRightHalf: noteRect.left > copyRect.left + copyRect.width / 2,
        rotate: styles.rotate,
        textShadow: styles.textShadow,
      }
    })

    expect(presentation.backgroundColor).toBe('rgba(0, 0, 0, 0)')
    expect(presentation.color).toBe('rgb(37, 36, 34)')
    expect(presentation.borderStyle).toBe('none')
    expect(presentation.fontSize).toBe(36)
    expect(presentation.rotate).not.toBe('none')
    expect(presentation.textShadow).toBe('none')
    expect(presentation.insetLeft).toBeGreaterThanOrEqual(12)
    expect(presentation.insetRight).toBeGreaterThanOrEqual(12)
    expect(presentation.noteBottom).toBeLessThanOrEqual(presentation.factsTop)
    if ((page.viewportSize()?.width ?? 0) > 1024) {
      expect(presentation.startsInRightHalf).toBe(true)
    }
  })

  test('anchors the construction line to the CTA and the handwritten note to the facts', async ({ page }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 2048, height: 1200 },
    ]) {
      await page.setViewportSize(viewport)
      await page.goto('/')

      const geometry = await page.locator('.hero__copy').evaluate((copy) => {
        const button = copy.querySelector<HTMLElement>('.hero__cta')
        const connector = copy.querySelector<SVGElement>('.hero__cta-connector')
        const note = copy.querySelector<HTMLElement>('.hero__margin-note')
        const lower = copy.querySelector<HTMLElement>('.hero__lower')
        const facts = copy.querySelector<HTMLElement>('.hero__facts')
        if (!button || !connector || !note || !lower || !facts) {
          throw new Error('Anchored hero elements are missing')
        }

        const buttonRect = button.getBoundingClientRect()
        const connectorRect = connector.getBoundingClientRect()
        const noteRect = note.getBoundingClientRect()
        const factsRect = facts.getBoundingClientRect()

        return {
          buttonCenterY: buttonRect.top + buttonRect.height / 2,
          connectorCenterY: connectorRect.top + connectorRect.height / 2,
          connectorStartX: connectorRect.left,
          buttonEndX: buttonRect.right,
          noteParentClass: note.parentElement?.className,
          notePosition: getComputedStyle(note).position,
          noteToFactsGap: factsRect.top - noteRect.bottom,
        }
      })

      expect(Math.abs(geometry.connectorCenterY - geometry.buttonCenterY)).toBeLessThanOrEqual(1)
      expect(Math.abs(geometry.connectorStartX - geometry.buttonEndX)).toBeLessThanOrEqual(1)
      expect(geometry.noteParentClass).toContain('hero__lower')
      expect(geometry.notePosition).not.toBe('absolute')
      expect(geometry.noteToFactsGap).toBeGreaterThanOrEqual(16)
    }
  })

  test('uses an open line-height for the handwritten note', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const presentation = await page.locator('.hero__margin-note').evaluate((note) => {
      return {
        noteLineHeight: Number.parseFloat(getComputedStyle(note).lineHeight),
        noteFontSize: Number.parseFloat(getComputedStyle(note).fontSize),
      }
    })

    expect(presentation.noteLineHeight / presentation.noteFontSize).toBeCloseTo(1.4, 1)
  })

  test('keeps the seam callout clear above the CTA connector', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const presentation = await page.locator('.hero__stage').evaluate((stage) => {
      const button = stage.querySelector<HTMLElement>('.hero__cta')
      const callout = stage.querySelector<HTMLElement>('.hero__callout--03')
      if (!button || !callout) throw new Error('Hero annotations are missing')

      const buttonRect = button.getBoundingClientRect()
      const calloutRect = callout.getBoundingClientRect()

      return {
        buttonCenterY: buttonRect.top + buttonRect.height / 2,
        calloutBottom: calloutRect.bottom,
      }
    })

    expect(presentation.calloutBottom).toBeLessThanOrEqual(presentation.buttonCenterY - 8)
  })

  test('shows the supplied portrait and the approved hero construction layer', async ({ page }) => {
    const portrait = page.getByRole('img', { name: 'Caitlin Hawley smiling' })
    await expect(portrait).toBeVisible()
    await expect(portrait).toHaveAttribute('src', '/images/hero-portrait-caitlin.png')
    await expect.poll(() => portrait.evaluate((image: HTMLImageElement) => ({
      width: image.naturalWidth,
      height: image.naturalHeight,
    }))).toEqual({ width: 1098, height: 1433 })
    await expect(page.getByText('Original source pending')).toHaveCount(0)

    const construction = page.locator('.hero__construction')
    await expect(construction).toHaveAttribute('aria-hidden', 'true')
    await expect(construction.locator('.hero__construction-path--solid')).toHaveCount(1)
    await expect(construction.locator('.hero__construction-path--dashed')).toHaveCount(2)
    await expect(construction.locator('.hero__crosshair')).toHaveCount(2)
    await expect(page.locator('.hero__cta-connector-path')).toHaveCount(1)
    await expect(page.locator('.hero__crosshair')).toHaveCount(3)
    await expect(page.locator('.hero__callout')).toHaveCount(3)
    await expect(page.locator('.hero__callout-index')).toHaveText(['02', '03', '04'])

    const constructionStyles = await construction.evaluate((element) => {
      const solid = element.querySelector<SVGPathElement>('.hero__construction-path--solid')
      const dashed = element.querySelector<SVGPathElement>('.hero__construction-path--dashed')
      return {
        solidDash: solid ? getComputedStyle(solid).strokeDasharray : '',
        dashedDash: dashed ? getComputedStyle(dashed).strokeDasharray : '',
      }
    })
    expect(constructionStyles.solidDash).toBe('none')
    expect(constructionStyles.dashedDash).not.toBe('none')

    const firstRole = page.locator('.experience__list > li').first()
    await expect(firstRole).toContainText('Senior Frontend Engineer')
    await expect(firstRole).toContainText('Allocate')

    const treatments = await page.evaluate(() => {
      const swatch = document.querySelector<HTMLElement>('.hero__swatches .fabric-swatch')
      return {
        bodyBackgroundImage: getComputedStyle(document.body).backgroundImage,
        swatchBackgroundImage: swatch ? getComputedStyle(swatch).backgroundImage : '',
        swatchMaskImage: swatch ? getComputedStyle(swatch).maskImage : '',
        swatchCount: document.querySelectorAll('.hero__swatches .fabric-swatch').length,
      }
    })

    expect(treatments.bodyBackgroundImage).toBe('none')
    expect(treatments.swatchCount).toBe(4)
    expect(treatments.swatchBackgroundImage).toBe('none')
    expect(treatments.swatchMaskImage).toContain('conic-gradient')
  })
})
