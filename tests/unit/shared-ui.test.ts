// @vitest-environment happy-dom

import { readFileSync } from 'node:fs'

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import CSectionMarker from '../../app/components/ui/CSectionMarker/CSectionMarker.vue'
import CTag from '../../app/components/ui/CTag/CTag.vue'
import FabricSwatches from '../../app/components/ui/FabricSwatches/FabricSwatches.vue'

describe('shared UI class contracts', () => {
  it('keeps shared component styles flat and self-contained', () => {
    const sharedComponents = [
      '../../app/components/ui/CButton/CButton.vue',
      '../../app/components/ui/CTag/CTag.vue',
      '../../app/components/ui/CSectionMarker/CSectionMarker.vue',
      '../../app/components/ui/FabricSwatches/FabricSwatches.vue',
      '../../app/components/ui/ThemeToggle/ThemeToggle.vue',
      '../../app/components/ui/SiteHeader/SiteHeader.vue',
      '../../app/components/ui/CTimeline/CTimeline.vue',
    ]

    for (const componentPath of sharedComponents) {
      const source = readFileSync(new URL(componentPath, import.meta.url), 'utf8')

      expect(source).not.toMatch(/\.[a-z][\w-]*(?:__|--)[a-z]/)
      expect(source).not.toMatch(/['"][a-z][\w-]*(?:__|--)[a-z][\w-]*['"]/)
      expect(source).not.toContain(':deep(')
    }
  })

  it('maps tag variants to explicit flat classes', () => {
    const wrapper = mount(CTag, {
      props: { label: 'TypeScript', variant: 'ruled' },
    })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['tag', 'tag-ruled']))
    expect(wrapper.html()).not.toMatch(/skill-tag(?:__|--)/)
  })

  it('keeps section-marker content decorative and flat', () => {
    const wrapper = mount(CSectionMarker, {
      props: { label: 'Next', number: '02' },
    })

    expect(wrapper.classes()).toContain('section-marker')
    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.text()).toContain('Next')
    expect(wrapper.text()).toContain('02')
  })

  it('exposes swatch motion as an explicit component state', () => {
    const wrapper = mount(FabricSwatches, {
      props: {
        animated: true,
        colors: ['#111111', '#eeeeee'],
      },
    })

    expect(wrapper.classes()).toEqual(expect.arrayContaining([
      'fabric-swatches',
      'fabric-swatches-animated',
    ]))
    expect(wrapper.findAll('.fabric-swatch')).toHaveLength(2)
  })
})
