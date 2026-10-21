import { withThemeByDataAttribute } from '@storybook/addon-themes'
import type { Preview, Renderer } from '@storybook/vue3-vite'

import '../app/assets/css/main.css'

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute<Renderer>({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
      parentSelector: 'html',
    }),
  ],
  parameters: {
    a11y: {
      test: 'error',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
}

export default preview
