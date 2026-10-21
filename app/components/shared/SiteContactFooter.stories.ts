import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { profile } from '../../content/site'
import SiteContactFooter from './SiteContactFooter.vue'

const meta = {
  title: 'Sections/Footer Selection',
  component: SiteContactFooter,
  args: { profile, sectionNumber: '06' },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SiteContactFooter>

export default meta
type Story = StoryObj<typeof meta>

const selectFooterCopy: NonNullable<Story['play']> = async ({ canvasElement }) => {
  const copy = canvasElement.querySelector<HTMLElement>('.contact-main > p')
  if (!copy) throw new Error('Footer copy is missing')

  const range = document.createRange()
  range.selectNodeContents(copy)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}

export const Light: Story = {
  globals: { theme: 'light' },
  play: selectFooterCopy,
}

export const Dark: Story = {
  globals: { theme: 'dark' },
  play: selectFooterCopy,
}
