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

    for (const label of ['Work', 'About', 'Resume', 'Contact']) {
      await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: label })).toBeVisible()
    }

    await expect(page.getByRole('link', { name: 'View my work' })).toHaveAttribute('href', '#work')
    await expect(page.getByRole('heading', { name: 'Selected work' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'About / How I work' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible()
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
})
