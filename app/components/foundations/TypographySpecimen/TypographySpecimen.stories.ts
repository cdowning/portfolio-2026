import type { Meta, StoryObj } from '@storybook/vue3-vite'

import TypographySpecimen from './TypographySpecimen.vue'

const meta = {
  title: 'Foundations/Typography',
  component: TypographySpecimen,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TypographySpecimen>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  globals: { theme: 'light' },
}

export const Dark: Story = {
  globals: { theme: 'dark' },
}
