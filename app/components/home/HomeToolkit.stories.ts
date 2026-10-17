import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { toolkit } from '../../content/site'
import HomeToolkit from './HomeToolkit.vue'

const meta = {
  title: 'Sections/Toolkit',
  component: HomeToolkit,
  args: { items: toolkit },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof HomeToolkit>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}

export const Narrow: Story = {
  globals: {
    viewport: {
      value: '390px-844px',
      isRotated: false,
    },
  },
}
