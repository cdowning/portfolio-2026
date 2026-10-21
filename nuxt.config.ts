import { THEME_BOOTSTRAP_SCRIPT } from './app/utils/theme'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-21',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  components: [
    {
      path: '~/components/ui',
      pathPrefix: false,
    },
    '~/components',
  ],
  modules: ['@nuxt/eslint', '@nuxt/icon', 'nuxt-gtag'],
  icon: {
    provider: 'none',
    serverBundle: {
      collections: ['devicon', 'ph'],
    },
    clientBundle: {
      icons: ['ph:codepen-logo', 'ph:github-logo', 'ph:linkedin-logo'],
      scan: false,
      sizeLimitKb: 32,
    },
  },
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
