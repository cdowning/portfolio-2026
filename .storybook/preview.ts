import type { Preview } from '@storybook/vue3-vite'

import '../app/assets/css/main.css'

const preview: Preview = {
  parameters: {
    a11y: {
      test: 'error',
    },
    backgrounds: {
      default: 'light canvas',
      values: [
        { name: 'light canvas', value: '#fdfbf9' },
        { name: 'dark canvas', value: '#151412' },
        { name: 'gold', value: '#f6bd60' },
        { name: 'blush', value: '#c79591' },
      ],
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
