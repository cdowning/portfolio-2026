import type { Preview } from '@storybook/vue3-vite'

import '../app/assets/css/main.css'

const preview: Preview = {
  parameters: {
    a11y: {
      test: 'error',
    },
    backgrounds: {
      default: 'paper',
      values: [
        { name: 'paper', value: '#fdfbf9' },
        { name: 'gold', value: '#f6bd60' },
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
