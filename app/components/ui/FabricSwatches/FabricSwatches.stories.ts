import type { Meta, StoryObj } from '@storybook/vue3-vite'

import FabricSwatches from './FabricSwatches.vue'

const colors = ['#a8c7bf', '#f0d0cb', '#d5a93a', '#8c8177']

const meta = {
  title: 'Editorial/Fabric Swatches',
  component: FabricSwatches,
  args: {
    animated: false,
    colors,
  },
  decorators: [() => ({ template: '<div style="width: 5rem"><story /></div>' })],
} satisfies Meta<typeof FabricSwatches>

export default meta
type Story = StoryObj<typeof meta>

export const Static: Story = {}
export const AnimatedContract: Story = {
  args: { animated: true },
  decorators: [() => ({
    template: `
      <div style="--swatch-1-opacity:.35;--swatch-1-shift:-8px;--swatch-2-opacity:.55;--swatch-2-shift:-4px;--swatch-3-opacity:.75;--swatch-3-shift:0;--swatch-4-opacity:1;--swatch-4-shift:4px;width:5rem">
        <story />
      </div>
    `,
  })],
}
