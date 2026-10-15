import type { Meta, StoryObj } from '@storybook/vue3-vite'

import CTag from './CTag.vue'

const meta = {
  title: 'Editorial/Tag',
  component: CTag,
  args: {
    label: 'TypeScript',
    variant: 'soft',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['soft', 'ruled'] },
  },
  decorators: [() => ({ template: '<ul style="list-style: none; margin: 0; padding: 0; min-width: 9rem"><story /></ul>' })],
} satisfies Meta<typeof CTag>

export default meta
type Story = StoryObj<typeof meta>

export const Soft: Story = {}
export const Ruled: Story = { args: { variant: 'ruled' } }
