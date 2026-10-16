import { expect, test } from '@playwright/test'

type Rgb = [number, number, number]

const themes = {
  light: {
    canvas: 'rgb(253, 251, 249)',
    text: 'rgb(37, 36, 34)',
    action: 'rgb(246, 189, 96)',
    onAction: 'rgb(15, 14, 14)',
    footer: 'rgb(246, 189, 96)',
    footerAction: 'rgb(15, 14, 14)',
    onFooterAction: 'rgb(255, 253, 250)',
    focus: 'rgb(92, 115, 110)',
  },
  dark: {
    canvas: 'rgb(21, 20, 18)',
    text: 'rgb(245, 240, 234)',
    action: 'rgb(199, 149, 145)',
    onAction: 'rgb(21, 20, 18)',
    footer: 'rgb(199, 149, 145)',
    footerAction: 'rgb(21, 20, 18)',
    onFooterAction: 'rgb(255, 250, 245)',
    focus: 'rgb(148, 184, 174)',
  },
} as const

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

for (const [theme, expected] of Object.entries(themes)) {
  test(`${theme} maps semantic colors and contrast to the approved palette`, async ({ page }) => {
    await page.addInitScript((savedTheme) => {
      localStorage.setItem('caitlin-theme', savedTheme)
    }, theme)
    await page.goto('/')

    const colors = await page.evaluate(() => {
      const html = getComputedStyle(document.documentElement)
      const action = getComputedStyle(document.querySelector<HTMLElement>('.hero__cta')!)
      const footer = getComputedStyle(document.querySelector<HTMLElement>('#contact')!)
      const footerAction = getComputedStyle(document.querySelector<HTMLElement>('.contact__primary')!)

      return {
        canvas: html.backgroundColor,
        text: html.color,
        action: action.backgroundColor,
        onAction: action.color,
        footer: footer.backgroundColor,
        onFooter: footer.color,
        footerAction: footerAction.backgroundColor,
        onFooterAction: footerAction.color,
        focus: html.getPropertyValue('--focus-ring').trim(),
      }
    })

    expect(colors).toEqual({
      canvas: expected.canvas,
      text: expected.text,
      action: expected.action,
      onAction: expected.onAction,
      footer: expected.footer,
      onFooter: expected.onAction,
      footerAction: expected.footerAction,
      onFooterAction: expected.onFooterAction,
      focus: theme === 'light' ? '#5c736e' : '#94b8ae',
    })
    expect(contrast(colors.text, colors.canvas)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(colors.onAction, colors.action)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(colors.onFooter, colors.footer)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(colors.onFooterAction, colors.footerAction)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(expected.focus, expected.canvas)).toBeGreaterThanOrEqual(3)
  })
}

test('the header control toggles, persists, and keeps keyboard focus visible', async ({ page }) => {
  await page.addInitScript(() => {
    if (localStorage.getItem('caitlin-theme') === null) localStorage.setItem('caitlin-theme', 'light')
  })
  await page.goto('/')
  await page.waitForFunction(() => document.documentElement.dataset.motion === 'enhanced')

  const toggle = page.getByRole('button', { name: 'Toggle color theme' })
  await toggle.focus()
  await expect(toggle).toBeFocused()
  await page.keyboard.press('Enter')

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect.poll(() => page.evaluate(() => localStorage.getItem('caitlin-theme'))).toBe('dark')
  await expect.poll(() => toggle.evaluate(element => ({
    color: getComputedStyle(element).outlineColor,
    style: getComputedStyle(element).outlineStyle,
  }))).toEqual({ color: 'rgb(148, 184, 174)', style: 'solid' })

  await page.goto('/resume')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByRole('button', { name: 'Toggle color theme' })).toBeVisible()

  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('the theme control occupies the approved desktop and mobile header cells', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')

  const desktop = await page.getByRole('banner').evaluate((header) => {
    const navigation = header.querySelector<HTMLElement>('.primary-nav')!
    const signature = header.querySelector<HTMLElement>('.signature')!
    const toggle = header.querySelector<HTMLElement>('.theme-toggle')!
    const navigationBox = navigation.getBoundingClientRect()
    const signatureBox = signature.getBoundingClientRect()
    const toggleBox = toggle.getBoundingClientRect()
    const headerBox = header.getBoundingClientRect()
    return {
      navigationRight: navigationBox.right,
      signatureLeft: signatureBox.left,
      signatureRight: signatureBox.right,
      toggleLeft: toggleBox.left,
      toggleRight: toggleBox.right,
      toggleWidth: toggleBox.width,
      toggleHeight: toggleBox.height,
      toggleBorderLeftWidth: getComputedStyle(toggle).borderLeftWidth,
      headerRight: headerBox.right,
    }
  })

  expect(desktop.toggleLeft).toBeCloseTo(desktop.navigationRight, 0)
  expect(desktop.signatureLeft).toBeCloseTo(desktop.toggleRight, 0)
  expect(desktop.signatureRight).toBeCloseTo(desktop.headerRight, 0)
  expect(desktop.toggleWidth).toBeCloseTo(52, 0)
  expect(desktop.toggleWidth).toBeGreaterThanOrEqual(44)
  expect(desktop.toggleHeight).toBeGreaterThanOrEqual(44)
  expect(desktop.toggleBorderLeftWidth).toBe('0px')

  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/')

    const mobile = await page.getByRole('banner').evaluate((header) => {
      const brand = header.querySelector<HTMLElement>('.brand')!.getBoundingClientRect()
      const toggle = header.querySelector<HTMLElement>('.theme-toggle')!.getBoundingClientRect()
      const navigation = header.querySelector<HTMLElement>('.nav-trigger')!.getBoundingClientRect()
      return {
        brandRight: brand.right,
        toggleLeft: toggle.left,
        toggleRight: toggle.right,
        navigationLeft: navigation.left,
        toggleWidth: toggle.width,
        toggleHeight: toggle.height,
        toggleBorderLeftWidth: getComputedStyle(header.querySelector<HTMLElement>('.theme-toggle')!).borderLeftWidth,
      }
    })

    expect(mobile.toggleLeft).toBeCloseTo(mobile.brandRight, 0)
    expect(mobile.navigationLeft).toBeCloseTo(mobile.toggleRight, 0)
    expect(mobile.toggleWidth).toBeGreaterThanOrEqual(44)
    expect(mobile.toggleHeight).toBeGreaterThanOrEqual(44)
    expect(mobile.toggleBorderLeftWidth).toBe('1px')
  }
})

test('a first visit follows the system preference and ignores invalid storage', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.addInitScript(() => localStorage.setItem('caitlin-theme', 'sepia'))
  await page.goto('/')

  await expect(page.locator('html')).not.toHaveAttribute('data-theme', /.+/)
  await expect.poll(() => page.locator('html').evaluate(element => ({
    background: getComputedStyle(element).backgroundColor,
    color: getComputedStyle(element).color,
  }))).toEqual({ background: themes.dark.canvas, color: themes.dark.text })

  await page.emulateMedia({ colorScheme: 'light' })
  await expect.poll(() => page.locator('html').evaluate(element => ({
    background: getComputedStyle(element).backgroundColor,
    color: getComputedStyle(element).color,
  }))).toEqual({ background: themes.light.canvas, color: themes.light.text })
})

test('a saved choice is applied during first paint and updates browser chrome', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('caitlin-theme', 'dark'))
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#151412')

  await page.getByRole('button', { name: 'Toggle color theme' }).click()
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#fdfbf9')
})
