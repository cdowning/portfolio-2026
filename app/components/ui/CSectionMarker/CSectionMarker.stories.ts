import type { Meta, StoryObj } from '@storybook/vue3-vite'

import CSectionMarker from './CSectionMarker.vue'

const meta = {
  title: 'Editorial/Section Marker',
  component: CSectionMarker,
  args: {
    label: 'Next',
    number: '02',
  },
  decorators: [() => ({ template: '<div style="height: 8rem; width: 5rem"><story /></div>' })],
} satisfies Meta<typeof CSectionMarker>

export default meta
type Story = StoryObj<typeof meta>

export const Labeled: Story = {}
export const NumberOnly: Story = { args: { label: undefined, number: '04' } }
