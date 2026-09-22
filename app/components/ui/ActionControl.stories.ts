import type { Meta, StoryObj } from '@storybook/vue3-vite'

import ActionControl from './ActionControl.vue'

const meta = {
  title: 'Editorial/Action Control',
  component: ActionControl,
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
    components: { ActionControl },
    setup: () => ({ args }),
    template: '<ActionControl v-bind="args">View my work</ActionControl>',
  }),
} satisfies Meta<typeof ActionControl>

export default meta
type Story = StoryObj<typeof meta>

export const Gold: Story = {}
export const Ink: Story = { args: { tone: 'ink' } }
export const Large: Story = { args: { size: 'large' } }
