export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'caitlin-theme'
export const LIGHT_THEME_COLOR = '#fdfbf9'
export const DARK_THEME_COLOR = '#151412'

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

export function resolveTheme(storedTheme: unknown, prefersDark: boolean): Theme {
  if (isTheme(storedTheme)) return storedTheme
  return prefersDark ? 'dark' : 'light'
}

export const THEME_BOOTSTRAP_SCRIPT = `(()=>{try{const t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;const c=t==='dark'?'${DARK_THEME_COLOR}':'${LIGHT_THEME_COLOR}';const u=()=>{const m=document.querySelector('meta[name="theme-color"]');if(m)m.content=c};u();document.addEventListener('DOMContentLoaded',u,{once:true})}}catch{}})()`
