import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { onBeforeUnmount, onMounted } from 'vue'

import TypographySpecimen from './TypographySpecimen.vue'

type Theme = 'light' | 'dark'

function withTheme(theme: Theme) {
  return () => ({
    setup() {
      const root = document.documentElement
      const previousTheme = root.dataset.theme

      onMounted(() => {
        root.dataset.theme = theme
      })

      onBeforeUnmount(() => {
        if (previousTheme) root.dataset.theme = previousTheme
        else delete root.dataset.theme
      })
    },
    template: '<div style="min-height:100%;background:var(--canvas)"><story /></div>',
  })
}

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
  decorators: [withTheme('light')],
}

export const Dark: Story = {
  decorators: [withTheme('dark')],
}
