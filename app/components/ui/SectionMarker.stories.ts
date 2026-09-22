import type { Meta, StoryObj } from '@storybook/vue3-vite'

import SectionMarker from './SectionMarker.vue'

const meta = {
  title: 'Editorial/Section Marker',
  component: SectionMarker,
  args: {
    label: 'Next',
    number: '02',
  },
  decorators: [() => ({ template: '<div style="height: 8rem; width: 5rem"><story /></div>' })],
} satisfies Meta<typeof SectionMarker>

export default meta
type Story = StoryObj<typeof meta>

export const Labeled: Story = {}
export const NumberOnly: Story = { args: { label: undefined, number: '04' } }
