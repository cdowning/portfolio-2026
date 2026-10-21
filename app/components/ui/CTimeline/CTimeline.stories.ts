import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { Component } from 'vue'

import CTimeline from './CTimeline.vue'

interface TimelineEntry {
  id: string
  title: string
  period: string
  description: string
  current?: boolean
}

const entries: TimelineEntry[] = [
  {
    id: 'present',
    title: 'Present chapter',
    period: 'Now',
    description: 'Building accessible, thoughtful interfaces.',
    current: true,
  },
  {
    id: 'recent',
    title: 'Recent chapter',
    period: '2022–2025',
    description: 'Shaped a component library with a product team.',
  },
  {
    id: 'earlier',
    title: 'Earlier chapter',
    period: '2019–2022',
    description: 'Turned visual systems into resilient frontend foundations.',
  },
]

const historicalEntries = entries.map(entry => ({ ...entry, current: false }))
const itemKey = (item: TimelineEntry) => item.id
const isCurrent = (item: TimelineEntry) => Boolean(item.current)
// Storybook's Vue renderer does not yet model generic SFC constructors.
const StoryTimeline = CTimeline as unknown as Component

const meta = {
  title: 'Editorial/Timeline',
  decorators: [() => ({
    template: `
      <div class="timeline-story"><story /></div>
      <style>
        .timeline-story .story-timeline { max-width: 46rem; }
        .timeline-story .story-row { align-items: center; border-bottom: 1px solid var(--rule); display: flex; gap: 1rem; justify-content: space-between; min-height: inherit; }
        .timeline-story .story-row div { display: flex; gap: .6rem; }
        .timeline-story .story-row small { color: var(--text-secondary); }
        .timeline-story .story-row time { color: var(--text-secondary); font-size: var(--text-sm); }
        .timeline-story .story-compact { --timeline-content-inset: 1.5rem; --timeline-item-min-size: 3.5rem; }
        .timeline-story .story-detailed { --timeline-content-inset: 2.5rem; --timeline-item-min-size: 8.5rem; --timeline-marker-block-offset: 1.15rem; }
        .timeline-story .story-detail { border-bottom: 1px dotted var(--rule-strong); min-height: inherit; padding-bottom: 1.5rem; }
        .timeline-story .story-detail h3 { margin: .2rem 0; }
        .timeline-story .story-detail p { color: var(--text-secondary); max-width: 34rem; }
      </style>
    `,
  })],
  parameters: {
    docs: {
      description: {
        component: `A page-agnostic ordered timeline for chronological content. Pass \`items\`, a stable \`itemKey(item, index)\` callback, and optionally \`isCurrent(item, index)\`. The default scoped slot receives \`item\`, \`index\`, and the resolved \`current\` state. The timeline owns its connecting line, decorative markers, and \`aria-current\` semantics; consumers own row content. Geometry can be tuned with \`--timeline-content-inset\`, \`--timeline-axis-position\`, \`--timeline-marker-block-offset\`, and \`--timeline-item-min-size\`. Use a current resolver only when an item is genuinely ongoing; the component never assumes the first item is current.`,
      },
    },
  },
} satisfies Meta<typeof CTimeline>

export default meta
type Story = StoryObj<typeof meta>

export const WithCurrentItem: Story = {
  render: () => ({
    components: { CTimeline: StoryTimeline },
    setup: () => ({ entries, itemKey, isCurrent }),
    template: `
      <CTimeline
        v-slot="{ item, current }"
        class="story-timeline"
        :items="entries"
        :item-key="itemKey"
        :is-current="isCurrent"
      >
        <div class="story-row">
          <div>
            <strong>{{ item.title }}</strong>
            <small v-if="current">Current</small>
          </div>
          <time>{{ item.period }}</time>
        </div>
      </CTimeline>
    `,
  }),
}

export const HistoricalOnly: Story = {
  render: () => ({
    components: { CTimeline: StoryTimeline },
    setup: () => ({ historicalEntries, itemKey }),
    template: `
      <CTimeline v-slot="{ item }" class="story-timeline" :items="historicalEntries" :item-key="itemKey">
        <div class="story-row">
          <strong>{{ item.title }}</strong>
          <time>{{ item.period }}</time>
        </div>
      </CTimeline>
    `,
  }),
}

export const CompactGeometry: Story = {
  render: () => ({
    components: { CTimeline: StoryTimeline },
    setup: () => ({ entries, itemKey, isCurrent }),
    template: `
      <CTimeline
        v-slot="{ item }"
        class="story-timeline story-compact"
        :items="entries"
        :item-key="itemKey"
        :is-current="isCurrent"
      >
        <div class="story-row">
          <strong>{{ item.title }}</strong>
          <time>{{ item.period }}</time>
        </div>
      </CTimeline>
    `,
  }),
}

export const DetailedGeometry: Story = {
  render: () => ({
    components: { CTimeline: StoryTimeline },
    setup: () => ({ entries, itemKey, isCurrent }),
    template: `
      <CTimeline
        v-slot="{ item, index }"
        class="story-timeline story-detailed"
        :items="entries"
        :item-key="itemKey"
        :is-current="isCurrent"
      >
        <article class="story-detail">
          <small>Chapter {{ index + 1 }}</small>
          <h3>{{ item.title }}</h3>
          <time>{{ item.period }}</time>
          <p>{{ item.description }}</p>
        </article>
      </CTimeline>
    `,
  }),
}

