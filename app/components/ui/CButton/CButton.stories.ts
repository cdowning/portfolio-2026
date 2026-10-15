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
