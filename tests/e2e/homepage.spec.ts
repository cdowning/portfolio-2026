import { expect, test } from '@playwright/test'

test.describe('homepage composition', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('presents the approved editorial structure and primary navigation', async ({ page }) => {
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

  test('defers the portrait while preserving employer subtitles and solid paper treatment', async ({ page }) => {
    await expect(page.getByRole('img', {
      name: "Portrait placeholder awaiting Caitlin's original photograph",
    })).toBeVisible()

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
