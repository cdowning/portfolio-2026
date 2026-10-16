import { THEME_BOOTSTRAP_SCRIPT } from './app/utils/theme'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-21',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/eslint', 'nuxt-gtag'],
  runtimeConfig: {
    public: {
      siteUrl: 'https://www.caitlinhawley.com',
    },
  },
  gtag: {
    id: 'G-CRTHWFY5XP',
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/resume', '/robots.txt', '/sitemap.xml'],
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#fdfbf9' },
      ],
      script: [{ innerHTML: THEME_BOOTSTRAP_SCRIPT }],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'stylesheet', href: 'https://use.typekit.net/dsu3xor.css' },
      ],
    },
  },
})
