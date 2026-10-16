import { onMounted, readonly, shallowRef } from 'vue'

import {
  DARK_THEME_COLOR,
  isTheme,
  LIGHT_THEME_COLOR,
  resolveTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from '../utils/theme'

const resolvedTheme = shallowRef<Theme>('light')

let hasOverride = false
let initialized = false
let mediaQuery: MediaQueryList | null = null

function updateThemeColor(theme: Theme) {
  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  themeColor?.setAttribute('content', theme === 'dark' ? DARK_THEME_COLOR : LIGHT_THEME_COLOR)
}

function applyTheme(theme: Theme, explicit: boolean) {
  resolvedTheme.value = theme

  if (explicit) document.documentElement.dataset.theme = theme
  else document.documentElement.removeAttribute('data-theme')

  updateThemeColor(theme)
}

function readStoredTheme(): Theme | null {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(storedTheme) ? storedTheme : null
  }
  catch {
    return null
  }
}

function persistTheme(theme: Theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }
  catch {
    // Theme switching still works when storage is unavailable.
  }
}

function handleSystemThemeChange(event: MediaQueryListEvent) {
  if (!hasOverride) applyTheme(event.matches ? 'dark' : 'light', false)
}

function initializeTheme() {
  if (initialized || typeof window === 'undefined') return

  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const storedTheme = readStoredTheme()
  hasOverride = storedTheme !== null
  applyTheme(resolveTheme(storedTheme, mediaQuery.matches), hasOverride)
  mediaQuery.addEventListener('change', handleSystemThemeChange)
  initialized = true
}

function toggleTheme() {
  if (typeof window === 'undefined') return
  initializeTheme()

  const nextTheme: Theme = resolvedTheme.value === 'dark' ? 'light' : 'dark'
  hasOverride = true
  applyTheme(nextTheme, true)
  persistTheme(nextTheme)
}

export function useTheme() {
  onMounted(initializeTheme)

  return {
    resolvedTheme: readonly(resolvedTheme),
    toggleTheme,
  }
}
