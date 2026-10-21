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
    const experienceAside = page.locator('.experience-aside')
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

  test('fills only the current experience timeline marker', async ({ page }) => {
    const roles = page.locator('.experience-list .timeline-item')
    const currentRole = roles.filter({ hasText: 'Senior Frontend Engineer' })

    await expect(currentRole).toHaveAttribute('aria-current', 'true')
    await expect(page.locator('.experience-list .timeline-item[aria-current="true"]')).toHaveCount(1)

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

  test('connects the contact button to a paper airplane above a separate social row', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })

    const contact = page.locator('.contact')
    const button = contact.getByRole('link', { name: 'Say hello' })
    const flight = contact.locator('.contact-flight')
    const socials = contact.locator('.contact-socials')

    await expect(button).toBeVisible()
    await expect(flight).toBeVisible()
    await expect(flight.locator('.contact-airplane')).toHaveCount(1)
    await expect(socials.getByRole('link')).toHaveText(['LinkedIn', 'GitHub', 'CodePen'])
    const brand = contact.locator('.contact-brand')
    await expect(brand.locator('strong')).toHaveText('Caitlin Hawley')
    await expect(brand.locator('span')).toHaveText('Frontend Developer')
    await expect(brand.locator('p')).toContainText('Thoughtful code')
    await expect(brand.locator('p')).toContainText('for a brighter web.')
    await expect(contact).not.toContainText('Good people build great things.')

    const geometry = await contact.evaluate((element) => {
      const action = element.querySelector<HTMLElement>('.contact-primary')
      const flight = element.querySelector<SVGElement>('.contact-flight')
      const flightPath = element.querySelector<SVGPathElement>('.contact-flight-path')
      const socialRow = element.querySelector<HTMLElement>('.contact-socials')
      if (!action || !flight || !flightPath || !socialRow) throw new Error('Contact composition is incomplete')

      const actionRect = action.getBoundingClientRect()
      const flightRect = flight.getBoundingClientRect()
      const socialRect = socialRow.getBoundingClientRect()
      const flightMatrix = flightPath.getScreenCTM()
      if (!flightMatrix) throw new Error('Contact flight geometry is unavailable')

      const flightStart = flightPath.getPointAtLength(0).matrixTransform(flightMatrix)

      return {
        actionCenterY: actionRect.top + actionRect.height / 2,
        flightStartY: flightStart.y,
        flightStartX: flightRect.left,
        actionEndX: actionRect.right,
        socialTop: socialRect.top,
        actionBottom: actionRect.bottom,
      }
    })

    expect(Math.abs(geometry.flightStartY - geometry.actionCenterY)).toBeLessThanOrEqual(2)
    expect(geometry.flightStartX - geometry.actionEndX).toBeGreaterThanOrEqual(8)
    expect(geometry.flightStartX - geometry.actionEndX).toBeLessThanOrEqual(24)
    expect(geometry.socialTop - geometry.actionBottom).toBeGreaterThanOrEqual(24)
  })

  test('shows the approved wavy route and paper airplane as static footer artwork', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.waitForFunction(() => document.documentElement.dataset.motion === 'enhanced')

    const contact = page.locator('.contact')
    await contact.evaluate(element => element.scrollIntoView({ block: 'center' }))
    await expect(contact).toHaveAttribute('data-revealed', 'true')

    const artwork = await contact.evaluate((element) => {
      const route = element.querySelector<SVGPathElement>('.contact-flight-path')
      const airplane = element.querySelector<SVGImageElement>('.contact-airplane')
      if (!route || !airplane) throw new Error('Contact flight artwork is incomplete')

      return {
        airplaneAnimation: getComputedStyle(airplane).animationName,
        airplaneAsset: airplane.getAttribute('href'),
        airplaneOpacity: getComputedStyle(airplane).opacity,
        airplaneTransform: getComputedStyle(airplane).transform,
        routeAnimation: getComputedStyle(route).animationName,
      }
    })

    expect(artwork.routeAnimation).toBe('none')
    expect(artwork.airplaneAnimation).toBe('none')
    expect(artwork.airplaneAsset).toBe('/images/contact-paper-airplane.png')
    expect(artwork.airplaneOpacity).toBe('1')
    expect(artwork.airplaneTransform).toBe('none')

    const alignment = await contact.evaluate((element) => {
      const route = element.querySelector<SVGPathElement>('.contact-flight-path')
      const airplane = element.querySelector<SVGImageElement>('.contact-airplane')
      if (!route || !airplane) throw new Error('Contact flight artwork is incomplete')

      const routeMatrix = route.getScreenCTM()
      const airplaneMatrix = airplane.getScreenCTM()
      if (!routeMatrix || !airplaneMatrix) throw new Error('Contact flight geometry is unavailable')

      const routePoint = route.getPointAtLength(route.getTotalLength())
      const routeScreenPoint = new DOMPoint(routePoint.x, routePoint.y).matrixTransform(routeMatrix)
      const airplaneTail = new DOMPoint(
        airplane.x.baseVal.value + 31,
        airplane.y.baseVal.value + 94,
      ).matrixTransform(airplaneMatrix)

      return Math.hypot(
        airplaneTail.x - routeScreenPoint.x,
        airplaneTail.y - routeScreenPoint.y,
      )
    })

    expect(alignment).toBeLessThanOrEqual(4)
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

  test('presents the expanded toolkit as one desktop row without a trailing rail', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const toolkit = page.locator('section[aria-labelledby="toolkit-title"]')
    const items = toolkit.getByRole('listitem')

    await expect(items).toHaveText([
      'Vue',
      'TypeScript',
      'JavaScript',
      'Sass',
      'Tailwind',
      'Figma',
      'Storybook',
      'Accessibility',
      'Design systems',
      'Claude Code',
      'Codex',
      'Spec-driven development',
    ])
    await expect(toolkit.locator('aside')).toHaveCount(0)

    const rowPositions = await items.evaluateAll(elements => (
      [...new Set(elements.map(element => Math.round(element.getBoundingClientRect().top)))]
    ))
    expect(rowPositions).toHaveLength(1)
    const toolkitList = toolkit.locator('.toolkit-list')
    expect(await toolkitList.evaluate(element => element.scrollWidth)).toBeLessThanOrEqual(
      await toolkitList.evaluate(element => element.clientWidth),
    )
  })

  test('reflows the toolkit before the single row can overflow', async ({ page }) => {
    for (const width of [1153, 1280, 1377, 1408]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')

      const toolkit = page.locator('section[aria-labelledby="toolkit-title"]')
      const items = toolkit.getByRole('listitem')
      const rowPositions = await items.evaluateAll(elements => (
        [...new Set(elements.map(element => Math.round(element.getBoundingClientRect().top)))]
      ))

      expect(rowPositions.length).toBeGreaterThan(1)
      const toolkitList = toolkit.locator('.toolkit-list')
      expect(await toolkitList.evaluate(element => element.scrollWidth)).toBeLessThanOrEqual(
        await toolkitList.evaluate(element => element.clientWidth),
      )
    }
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

  test('renders the handwritten sign-off with Lindsey Signature from Adobe Fonts', async ({ page }) => {
    const note = page.locator('.hero-margin-note')

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

  test('places the larger Caitlin sign-off in the lower white copy panel', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const presentation = await page.locator('.hero-margin-note').evaluate((element) => {
      const copy = element.closest<HTMLElement>('.hero-copy')
      const facts = copy?.querySelector<HTMLElement>('.hero-facts')
      if (!copy || !facts) throw new Error('Hero copy panel is missing')

      const noteRect = element.getBoundingClientRect()
      const copyRect = copy.getBoundingClientRect()
      const factsRect = facts.getBoundingClientRect()
      const styles = getComputedStyle(element)

      return {
        backgroundColor: styles.backgroundColor,
        borderStyle: styles.borderTopStyle,
        clipPath: styles.clipPath,
        color: styles.color,
        fontSize: Number.parseFloat(styles.fontSize),
        insetLeft: noteRect.left - copyRect.left,
        insetRight: copyRect.right - noteRect.right,
        noteBottom: noteRect.bottom,
        factsTop: factsRect.top,
        startsInRightHalf: noteRect.left > copyRect.left + copyRect.width / 2,
        text: element.textContent?.trim(),
        rotate: styles.rotate,
        textShadow: styles.textShadow,
      }
    })

    expect(presentation.backgroundColor).toBe('rgba(0, 0, 0, 0)')
    expect(presentation.color).toBe('rgb(37, 36, 34)')
    expect(presentation.borderStyle).toBe('none')
    expect(presentation.clipPath).toContain('inset')
    expect(presentation.fontSize).toBeGreaterThanOrEqual(72)
    expect(presentation.text).toBe('Caitlin')
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

      const geometry = await page.locator('.hero-copy').evaluate((copy) => {
        const button = copy.querySelector<HTMLElement>('.hero-cta')
        const connector = copy.querySelector<SVGElement>('.hero-cta-connector')
        const note = copy.querySelector<HTMLElement>('.hero-margin-note')
        const lower = copy.querySelector<HTMLElement>('.hero-lower')
        const facts = copy.querySelector<HTMLElement>('.hero-facts')
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
      expect(geometry.noteParentClass).toContain('hero-lower')
      expect(geometry.notePosition).not.toBe('absolute')
      expect(geometry.noteToFactsGap).toBeGreaterThanOrEqual(16)
    }
  })

  test('uses an open line-height for the handwritten note', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const presentation = await page.locator('.hero-margin-note').evaluate((note) => {
      return {
        noteLineHeight: Number.parseFloat(getComputedStyle(note).lineHeight),
        noteFontSize: Number.parseFloat(getComputedStyle(note).fontSize),
      }
    })

    expect(presentation.noteLineHeight / presentation.noteFontSize).toBeCloseTo(2, 1)
  })

  test('keeps the seam callout clear above the CTA connector', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const presentation = await page.locator('.hero-stage').evaluate((stage) => {
      const button = stage.querySelector<HTMLElement>('.hero-cta')
      const callout = stage.querySelector<HTMLElement>('.hero-callout-03')
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

    const construction = page.locator('.hero-construction')
    await expect(construction).toHaveAttribute('aria-hidden', 'true')
    await expect(construction.locator('.hero-construction-path-solid')).toHaveCount(1)
    await expect(construction.locator('.hero-construction-path-dashed')).toHaveCount(2)
    await expect(construction.locator('.hero-crosshair')).toHaveCount(2)
    await expect(page.locator('.hero-cta-connector-path')).toHaveCount(1)
    await expect(page.locator('.hero-crosshair')).toHaveCount(3)
    await expect(page.locator('.hero-callout')).toHaveCount(3)
    await expect(page.locator('.hero-callout-index')).toHaveText(['02', '03', '04'])

    const measurementRuler = page.locator('.hero-measurement-ruler')
    const measurementTicks = page.locator('.hero-measurement-ticks')
    if ((page.viewportSize()?.width ?? 0) > 1024) {
      await expect(measurementRuler).toBeVisible()
      await expect(measurementTicks).toBeVisible()

      const rulerGeometry = await page.locator('.hero-construction').evaluate((element) => {
        const ruler = element.querySelector<SVGPathElement>('.hero-measurement-ruler')
        const ticks = element.querySelector<SVGPathElement>('.hero-measurement-ticks')
        const callout = element.querySelector<HTMLElement>('.hero-callout-04')
        if (!ruler || !ticks || !callout) throw new Error('Hero ruler treatment is missing')

        const rulerRect = ruler.getBoundingClientRect()
        const ticksRect = ticks.getBoundingClientRect()
        const calloutRect = callout.getBoundingClientRect()

        return {
          gapToCallout: calloutRect.left - rulerRect.right,
          ticksHeight: ticksRect.height,
          ticksWidth: ticksRect.width,
        }
      })

      expect(rulerGeometry.gapToCallout).toBeGreaterThanOrEqual(24)
      expect(rulerGeometry.ticksHeight).toBeGreaterThanOrEqual(8)
      expect(rulerGeometry.ticksWidth).toBeGreaterThan(200)
    }

    const constructionStyles = await construction.evaluate((element) => {
      const solid = element.querySelector<SVGPathElement>('.hero-construction-path-solid')
      const dashed = element.querySelector<SVGPathElement>('.hero-construction-path-dashed')
      return {
        solidDash: solid ? getComputedStyle(solid).strokeDasharray : '',
        dashedDash: dashed ? getComputedStyle(dashed).strokeDasharray : '',
      }
    })
    expect(constructionStyles.solidDash).toBe('none')
    expect(constructionStyles.dashedDash).not.toBe('none')

    const firstRole = page.locator('.experience-list > .timeline-item').first()
    await expect(firstRole).toContainText('Senior Frontend Engineer')
    await expect(firstRole).toContainText('Allocate')

    const treatments = await page.evaluate(() => {
      const swatch = document.querySelector<HTMLElement>('.hero-swatches .fabric-swatch')
      return {
        bodyBackgroundImage: getComputedStyle(document.body).backgroundImage,
        swatchBackgroundImage: swatch ? getComputedStyle(swatch).backgroundImage : '',
        swatchMaskImage: swatch ? getComputedStyle(swatch).maskImage : '',
        swatchCount: document.querySelectorAll('.hero-swatches .fabric-swatch').length,
      }
    })

    expect(treatments.bodyBackgroundImage).toBe('none')
    expect(treatments.swatchCount).toBe(4)
    expect(treatments.swatchBackgroundImage).toBe('none')
    expect(treatments.swatchMaskImage).toContain('conic-gradient')
  })

  test('reveals a solid page-colored rectangle over the portrait during scroll release', async ({ page }) => {
    await page.setViewportSize({ width: 1984, height: 1275 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hero = page.locator('#top')
    const portrait = page.locator('.hero-portrait')

    await expect(hero).toHaveAttribute('data-hero-motion', 'scroll')
    await expect(portrait.locator('.hero-portrait-ground')).toHaveCount(0)

    const treatment = await portrait.evaluate((element) => {
      const image = element.querySelector<HTMLElement>('.hero-image')
      const grid = element.querySelector<HTMLElement>('.hero-portrait-grid')
      const cover = element.querySelector<HTMLElement>('.hero-portrait-cover')
      if (!image || !grid || !cover) throw new Error('Portrait treatment layers are missing')

      const portraitRect = element.getBoundingClientRect()
      const imageRect = image.getBoundingClientRect()
      const gridStyles = getComputedStyle(grid)
      const coverStyles = getComputedStyle(cover)
      const canvasColor = getComputedStyle(element.closest<HTMLElement>('.hero-stage')!).backgroundColor

      return {
        imageWidthRatio: imageRect.width / portraitRect.width,
        gridBackground: gridStyles.backgroundImage,
        gridOpacity: Number.parseFloat(gridStyles.opacity),
        coverBackgroundColor: coverStyles.backgroundColor,
        coverBackgroundImage: coverStyles.backgroundImage,
        coverClipPath: coverStyles.clipPath,
        coverHeight: cover.getBoundingClientRect().height,
        coverHeightRatio: cover.getBoundingClientRect().height / portraitRect.height,
        canvasColor,
      }
    })

    expect(treatment.imageWidthRatio).toBeGreaterThan(.78)
    expect(treatment.imageWidthRatio).toBeLessThan(.92)
    expect(treatment.gridBackground).toContain('linear-gradient')
    expect(treatment.gridOpacity).toBeGreaterThan(0)
    expect(treatment.gridOpacity).toBeLessThanOrEqual(.24)
    expect(treatment.coverBackgroundColor).toBe(treatment.canvasColor)
    expect(treatment.coverBackgroundImage).toBe('none')
    expect(treatment.coverClipPath).toContain('100%')
    expect(treatment.coverHeight).toBeGreaterThan(0)
    expect(treatment.coverHeight).toBeLessThanOrEqual(130)
    expect(treatment.coverHeightRatio).toBeLessThanOrEqual(.28)

    const geometry = await hero.evaluate((element) => {
      const stage = element.querySelector<HTMLElement>('.hero-stage')!
      return {
        heroTop: element.getBoundingClientRect().top + window.scrollY,
        travel: element.scrollHeight - stage.clientHeight,
      }
    })

    await page.evaluate(({ heroTop, travel }) => window.scrollTo({
      top: heroTop + travel + 1,
      behavior: 'instant',
    }), geometry)

    await expect.poll(() => portrait.locator('.hero-portrait-cover').evaluate(
      element => getComputedStyle(element).clipPath,
    )).not.toContain('100%')
  })

  test('keeps the portrait treatment proportional on large desktop monitors', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 1440, height: 960 })
    await page.goto('/')

    const treatment = await page.locator('.hero-portrait').evaluate((portrait) => {
      const stage = portrait.closest<HTMLElement>('.hero-stage')
      const image = portrait.querySelector<HTMLElement>('.hero-image')
      const cover = portrait.querySelector<HTMLElement>('.hero-portrait-cover')
      if (!stage || !image || !cover) throw new Error('Portrait treatment layers are missing')

      const stageRect = stage.getBoundingClientRect()
      const portraitRect = portrait.getBoundingClientRect()
      const imageRect = image.getBoundingClientRect()
      const coverRect = cover.getBoundingClientRect()

      return {
        coverBackgroundColor: getComputedStyle(cover).backgroundColor,
        coverClipPath: getComputedStyle(cover).clipPath,
        coverHeightRatio: coverRect.height / portraitRect.height,
        imageHeightRatio: imageRect.height / portraitRect.height,
        portraitOverflow: portraitRect.bottom - stageRect.bottom,
        stageBackgroundColor: getComputedStyle(stage).backgroundColor,
      }
    })

    expect(treatment.portraitOverflow).toBeLessThanOrEqual(1)
    expect(treatment.imageHeightRatio).toBeGreaterThanOrEqual(.78)
    expect(treatment.coverHeightRatio).toBeGreaterThanOrEqual(.14)
    expect(treatment.coverBackgroundColor).toBe(treatment.stageBackgroundColor)
    expect(treatment.coverClipPath).not.toContain('100%')
  })
})
