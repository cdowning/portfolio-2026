import type { Meta, StoryObj } from '@storybook/vue3-vite'

import CButton from './CButton.vue'

const meta = {
  title: 'Editorial/Button',
  component: CButton,
  args: {
    href: '#work',
    size: 'regular',
    tone: 'gold',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['regular', 'large'] },
    tone: { control: 'inline-radio', options: ['gold', 'ink'] },
  },
  render: args => ({
    components: { CButton },
    setup: () => ({ args }),
    template: '<CButton v-bind="args">View my work</CButton>',
  }),
} satisfies Meta<typeof CButton>

export default meta
type Story = StoryObj<typeof meta>

export const Gold: Story = {}
export const Ink: Story = { args: { tone: 'ink' } }
export const Large: Story = { args: { size: 'large' } }
export const Variants: Story = {
  render: () => ({
    components: { CButton },
    template: `
      <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 1rem;">
        <CButton href="#work">Regular gold</CButton>
        <CButton href="#work" tone="ink">Regular ink</CButton>
        <CButton href="#work" size="large">Large gold</CButton>
        <CButton size="large" tone="ink">Large ink button</CButton>
      </div>
    `,
  }),
}
