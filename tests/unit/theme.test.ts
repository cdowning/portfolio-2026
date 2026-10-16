// @vitest-environment happy-dom

import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

interface MatchMediaController {
  media: MediaQueryList
  setDark: (matches: boolean) => void
}

function installMatchMedia(initialDark: boolean): MatchMediaController {
  let matches = initialDark
  const listeners = new Set<(event: MediaQueryListEvent) => void>()
  const media = {
    get matches() { return matches },
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
    removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => true,
  } as MediaQueryList

  vi.stubGlobal('matchMedia', vi.fn(() => media))

  return {
    media,
    setDark(value) {
      matches = value
      const event = { matches: value, media: media.media } as MediaQueryListEvent
      listeners.forEach(listener => listener(event))
    },
  }
}

async function loadThemeUtilities() {
  const path = '../../app/utils/theme'
  return import(/* @vite-ignore */ path).catch(() => null)
}

async function loadThemeComposable() {
  const path = '../../app/composables/useTheme'
  return import(/* @vite-ignore */ path).catch(() => null)
}

beforeEach(() => {
  vi.resetModules()
  window.localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  document.head.innerHTML = '<meta name="theme-color" content="#fdfbf9">'
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('theme utilities', () => {
  it('accepts only supported persisted theme values', async () => {
    const theme = await loadThemeUtilities()

    expect(theme).not.toBeNull()
    if (!theme) return

    expect(theme.isTheme('light')).toBe(true)
    expect(theme.isTheme('dark')).toBe(true)
    expect(theme.isTheme('system')).toBe(false)
    expect(theme.isTheme(null)).toBe(false)
  })

  it('resolves a valid override before the operating-system preference', async () => {
    const theme = await loadThemeUtilities()

    expect(theme).not.toBeNull()
    if (!theme) return

    expect(theme.resolveTheme('light', true)).toBe('light')
    expect(theme.resolveTheme('dark', false)).toBe('dark')
    expect(theme.resolveTheme(null, true)).toBe('dark')
    expect(theme.resolveTheme('invalid', false)).toBe('light')
  })

  it('applies only a valid saved override before paint', async () => {
    const theme = await loadThemeUtilities()

    expect(theme).not.toBeNull()
    if (!theme) return

    window.localStorage.setItem(theme.THEME_STORAGE_KEY, 'dark')
    Function(theme.THEME_BOOTSTRAP_SCRIPT)()
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.content).toBe('#151412')

    document.documentElement.removeAttribute('data-theme')
    window.localStorage.setItem(theme.THEME_STORAGE_KEY, 'system')
    Function(theme.THEME_BOOTSTRAP_SCRIPT)()
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
  })
})

describe('useTheme', () => {
  it('follows live system changes until the visitor creates an override', async () => {
    const media = installMatchMedia(false)
    const module = await loadThemeComposable()

    expect(module).not.toBeNull()
    if (!module) return

    const Harness = defineComponent({
      setup() {
        const { resolvedTheme, toggleTheme } = module.useTheme()
        return () => h('button', { onClick: toggleTheme }, resolvedTheme.value)
      },
    })
    const wrapper = mount(Harness)
    await nextTick()
    expect(wrapper.text()).toBe('light')

    media.setDark(true)
    await nextTick()
    expect(wrapper.text()).toBe('dark')
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false)

    await wrapper.trigger('click')
    expect(wrapper.text()).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(window.localStorage.getItem('caitlin-theme')).toBe('light')

    media.setDark(true)
    await nextTick()
    expect(wrapper.text()).toBe('light')
  })

  it('uses a saved override and survives unavailable storage', async () => {
    const media = installMatchMedia(false)
    window.localStorage.setItem('caitlin-theme', 'dark')
    const module = await loadThemeComposable()

    expect(module).not.toBeNull()
    if (!module) return

    const Harness = defineComponent({
      setup() {
        const { resolvedTheme, toggleTheme } = module.useTheme()
        return () => h('button', { onClick: toggleTheme }, resolvedTheme.value)
      },
    })
    const wrapper = mount(Harness)
    await nextTick()
    expect(wrapper.text()).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')

    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage unavailable')
    })
    await expect(wrapper.trigger('click')).resolves.toBeUndefined()
    expect(wrapper.text()).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    setItem.mockRestore()

    media.setDark(true)
  })
})
