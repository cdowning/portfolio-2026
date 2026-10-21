// @vitest-environment happy-dom

import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import CTimeline from '../../app/components/ui/CTimeline/CTimeline.vue'

interface TimelineEntry {
  id: string
  label: string
  current?: boolean
}

const entries: TimelineEntry[] = [
  { id: 'now', label: 'Current role', current: true },
  { id: 'then', label: 'Earlier role' },
]

const itemKey = (item: TimelineEntry) => item.id

describe('CTimeline', () => {
  it('renders ordered items and exposes item, index, and resolved current state', () => {
    const wrapper = mount(CTimeline<TimelineEntry>, {
      props: {
        items: entries,
        itemKey,
        isCurrent: item => Boolean(item.current),
      },
      slots: {
        default: ({ item, index, current }) => h('span', {
          class: 'entry',
          'data-current': String(current),
          'data-index': String(index),
        }, item.label),
      },
    })

    expect(wrapper.element.tagName).toBe('OL')
    expect(wrapper.findAll('.timeline-item')).toHaveLength(2)
    expect(wrapper.findAll('.entry').map(entry => entry.text())).toEqual(['Current role', 'Earlier role'])
    expect(wrapper.findAll('.entry').map(entry => entry.attributes('data-index'))).toEqual(['0', '1'])
    expect(wrapper.findAll('.entry').map(entry => entry.attributes('data-current'))).toEqual(['true', 'false'])
  })

  it('marks only callback-selected items as current and keeps markers decorative', () => {
    const wrapper = mount(CTimeline<TimelineEntry>, {
      props: {
        items: entries,
        itemKey,
        isCurrent: item => Boolean(item.current),
      },
      slots: { default: ({ item }) => item.label },
    })

    const items = wrapper.findAll('.timeline-item')
    expect(items[0]?.attributes('aria-current')).toBe('true')
    expect(items[1]?.attributes('aria-current')).toBeUndefined()
    expect(wrapper.findAll('.timeline-marker')).toHaveLength(2)
    expect(wrapper.findAll('.timeline-marker').every(marker => marker.attributes('aria-hidden') === 'true')).toBe(true)
  })

  it('does not infer a current item when no resolver is supplied', () => {
    const wrapper = mount(CTimeline<TimelineEntry>, {
      props: { items: entries, itemKey },
      slots: { default: ({ item }) => item.label },
    })

    expect(wrapper.findAll('[aria-current="true"]')).toHaveLength(0)
  })

  it('uses the supplied stable keys when items are reordered', async () => {
    const wrapper = mount(CTimeline<TimelineEntry>, {
      props: { items: entries, itemKey },
      slots: { default: ({ item }) => h('span', { class: 'entry' }, item.label) },
    })
    const originalElements = new Map(
      wrapper.findAll('.entry').map(entry => [entry.text(), entry.element]),
    )

    await wrapper.setProps({ items: [...entries].reverse() })

    expect(wrapper.findAll('.entry').map(entry => entry.text())).toEqual(['Earlier role', 'Current role'])
    expect(wrapper.findAll('.entry')[0]?.element).toBe(originalElements.get('Earlier role'))
    expect(wrapper.findAll('.entry')[1]?.element).toBe(originalElements.get('Current role'))
  })
})
