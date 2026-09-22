import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/vue3-vite'
import vue from '@vitejs/plugin-vue'
import { mergeConfig } from 'vite'

const appRoot = fileURLToPath(new URL('../app', import.meta.url))

const config: StorybookConfig = {
  stories: ['../app/components/**/*.stories.ts'],
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: 'vue-component-meta',
    },
  },
  viteFinal: async baseConfig => mergeConfig(baseConfig, {
    build: {
      chunkSizeWarningLimit: 1200,
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': appRoot,
        '~': appRoot,
      },
    },
  }),
}

export default config
