// @vitest-environment happy-dom

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import CButton from '../../app/components/ui/CButton/CButton.vue'

describe('CButton', () => {
  it('renders the default link with flat base and variant classes', () => {
    const wrapper = mount(CButton, {
      props: { href: '#work' },
      slots: { default: 'View my work' },
    })

    const control = wrapper.get('a')

    expect(control.classes()).toEqual(expect.arrayContaining([
      'button',
      'button-gold',
      'button-regular',
    ]))
    expect(control.attributes('href')).toBe('#work')
    expect(control.get('.button-arrow').attributes('aria-hidden')).toBe('true')
    expect(control.html()).not.toMatch(/action-control(?:__|--)/)
  })

  it('maps typed props to explicit flat classes without changing button behavior', async () => {
    const wrapper = mount(CButton, {
      props: {
        ariaLabel: 'Print résumé',
        size: 'large',
        tone: 'ink',
      },
      slots: { default: 'Print résumé' },
    })

    const control = wrapper.get('button')

    expect(control.classes()).toEqual(expect.arrayContaining([
      'button',
      'button-large',
      'button-ink',
    ]))
    expect(control.attributes('type')).toBe('button')
    expect(control.attributes('aria-label')).toBe('Print résumé')

    await control.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
