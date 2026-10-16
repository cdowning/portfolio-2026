import type { Meta, StoryObj } from '@storybook/vue3-vite'

import ThemeToggle from './ThemeToggle.vue'

const meta = {
  title: 'Editorial/Theme Toggle',
  component: ThemeToggle,
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  render: () => ({
    components: { ThemeToggle },
    template: `
      <div style="--canvas:#fdfbf9;--text:#252422;--rule:#ded5cb;background:var(--canvas);display:grid;height:5.25rem;width:5.25rem">
        <ThemeToggle />
      </div>
    `,
  }),
}

export const Dark: Story = {
  render: () => ({
    components: { ThemeToggle },
    template: `
      <div style="--canvas:#151412;--text:#f5f0ea;--rule:#3f3934;background:var(--canvas);display:grid;height:5.25rem;width:5.25rem">
        <ThemeToggle />
      </div>
    `,
  }),
}
