export default defineNuxtConfig({
  compatibilityDate: '2026-09-21',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/eslint', 'nuxt-gtag'],
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
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
