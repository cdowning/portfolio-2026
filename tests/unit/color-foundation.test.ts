import { existsSync, readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

const readProjectFile = (path: string) => {
  const url = new URL(`../../${path}`, import.meta.url)
  return existsSync(url) ? readFileSync(url, 'utf8') : ''
}

const expectedPrimitives = {
  '--color-paper-00': '#fffdfa',
  '--color-paper-10': '#fdfbf9',
  '--color-paper-20': '#fffaf5',
  '--color-paper-30': '#fbf6f1',
  '--color-paper-40': '#f5f0ea',
  '--color-paper-50': '#f5efea',
  '--color-paper-70': '#ded5cb',
  '--color-paper-90': '#b9aea2',
  '--color-paper-100': '#b6ada4',
  '--color-ink-00': '#938b83',
  '--color-ink-10': '#827970',
  '--color-ink-20': '#6f6861',
  '--color-ink-30': '#6b6259',
  '--color-ink-40': '#3f3934',
  '--color-ink-50': '#2d2925',
  '--color-ink-60': '#252422',
  '--color-ink-70': '#24211e',
  '--color-ink-80': '#1c1a18',
  '--color-ink-90': '#151412',
  '--color-ink-100': '#0f0e0e',
  '--color-teal-00': '#e7efed',
  '--color-teal-30': '#b1d0c8',
  '--color-teal-40': '#94b8ae',
  '--color-teal-50': '#84a59d',
  '--color-teal-70': '#5c736e',
  '--color-teal-100': '#26312e',
  '--color-blush-30': '#f5cac3',
  '--color-blush-50': '#dca7a2',
  '--color-blush-60': '#c79591',
  '--color-gold-30': '#ffd17d',
  '--color-gold-40': '#f6bd60',
} as const

const expectedSemanticMappings = {
  light: {
    '--canvas': '--color-paper-10',
    '--surface': '--color-paper-30',
    '--surface-raised': '--color-paper-00',
    '--surface-muted': '--color-paper-50',
    '--text-strong': '--color-ink-100',
    '--text': '--color-ink-60',
    '--text-secondary': '--color-ink-20',
    '--text-muted': '--color-ink-10',
    '--rule': '--color-paper-70',
    '--rule-strong': '--color-paper-90',
    '--action': '--color-gold-40',
    '--action-hover': '--color-gold-30',
    '--on-action': '--color-ink-100',
    '--support': '--color-teal-70',
    '--support-highlight': '--color-teal-50',
    '--support-wash': '--color-teal-00',
    '--footer': '--color-gold-40',
    '--on-footer': '--color-ink-100',
    '--footer-action': '--color-ink-100',
    '--on-footer-action': '--color-paper-00',
    '--focus-ring': '--color-teal-70',
    '--selection': '--color-gold-40',
    '--on-selection': '--color-ink-100',
  },
  dark: {
    '--canvas': '--color-ink-90',
    '--surface': '--color-ink-80',
    '--surface-raised': '--color-ink-70',
    '--surface-muted': '--color-ink-50',
    '--text-strong': '--color-paper-20',
    '--text': '--color-paper-40',
    '--text-secondary': '--color-paper-100',
    '--text-muted': '--color-ink-00',
    '--rule': '--color-ink-40',
    '--rule-strong': '--color-ink-30',
    '--action': '--color-blush-60',
    '--action-hover': '--color-blush-50',
    '--on-action': '--color-ink-90',
    '--support': '--color-teal-40',
    '--support-highlight': '--color-teal-30',
    '--support-wash': '--color-teal-100',
    '--footer': '--color-blush-60',
    '--on-footer': '--color-ink-90',
    '--footer-action': '--color-ink-90',
    '--on-footer-action': '--color-paper-20',
    '--focus-ring': '--color-teal-40',
    '--selection': '--color-blush-60',
    '--on-selection': '--color-ink-90',
  },
} as const

function declarations(source: string, prefix: string) {
  return Object.fromEntries(
    [...source.matchAll(new RegExp(`(${prefix}[\\w-]+)\\s*:\\s*([^;]+);`, 'g'))]
      .map(([, name, value]) => [name, value.trim()]),
  )
}

function selectorBlock(source: string, selector: string) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return source.match(new RegExp(`${escaped}\\s*\\{([^}]+)\\}`))?.[1] ?? ''
}

describe('color foundation', () => {
  it('exposes the exact approved primitive inventory', () => {
    const variables = readProjectFile('app/assets/css/variables.css')

    expect(declarations(variables, '--color-')).toEqual(expectedPrimitives)
  })

  it('maps semantic roles through approved primitives in both explicit themes', () => {
    const variables = readProjectFile('app/assets/css/variables.css')
    const light = declarations(selectorBlock(variables, ":root[data-theme='light']"), '--')
    const dark = declarations(selectorBlock(variables, ":root[data-theme='dark']"), '--')

    for (const [role, primitive] of Object.entries(expectedSemanticMappings.light)) {
      expect(light[role]).toBe(`var(${primitive})`)
    }
    for (const [role, primitive] of Object.entries(expectedSemanticMappings.dark)) {
      expect(dark[role]).toBe(`var(${primitive})`)
    }
  })

  it('keeps global stylesheet responsibilities separated', () => {
    const fonts = readProjectFile('app/assets/css/fonts.css')
    const variables = readProjectFile('app/assets/css/variables.css')
    const main = readProjectFile('app/assets/css/main.css')

    expect(fonts.match(/@font-face/g)).toHaveLength(5)
    expect(fonts).not.toContain(':root')
    expect(variables).not.toContain('@font-face')
    expect(main).toContain("@import './fonts.css';")
    expect(main).toContain("@import './variables.css';")
    expect(main).not.toContain('@font-face')
    expect(main).not.toMatch(/--color-[\w-]+\s*:/)
  })

  it('publishes only approved colors without obsolete aliases', () => {
    const activeSources = [
      readProjectFile('app/assets/css/variables.css'),
      readProjectFile('app/components/home/HomeHero.vue'),
      readProjectFile('app/components/resume/ResumeIntro.vue'),
      readProjectFile('app/components/foundations/Colors/Colors.mdx'),
    ].join('\n')

    expect(activeSources).not.toMatch(/--palette-|--(?:paper|paper-deep|ink|ink-strong|teal|teal-deep|blush|blush-light|gold|gold-deep)\s*:/)
    for (const excluded of ['#ddb6b0', '#c5974d', '#f8e8e5', '#fff1d7', '#342726', '#3d3020']) {
      expect(activeSources).not.toContain(excluded)
    }
  })

  it('documents primitives and semantic roles with supported Storybook blocks', () => {
    const colorsPage = readProjectFile('app/components/foundations/Colors/Colors.mdx')
    const lightRoles = colorsPage.split('## Light semantic roles')[1]?.split('## Dark semantic roles')[0] ?? ''
    const darkRoles = colorsPage.split('## Dark semantic roles')[1]?.split('## Extending the palette')[0] ?? ''

    expect(colorsPage).toContain("from '@storybook/addon-docs/blocks'")
    expect(colorsPage).toContain('<ColorPalette>')
    expect(colorsPage).toContain('<ColorItem')
    expect(colorsPage).toContain('Light semantic roles')
    expect(colorsPage).toContain('Dark semantic roles')
    for (const token of Object.keys(expectedPrimitives)) expect(colorsPage).toContain(token)
    for (const role of Object.keys(expectedSemanticMappings.light)) expect(lightRoles).toContain(role)
    for (const role of Object.keys(expectedSemanticMappings.dark)) expect(darkRoles).toContain(role)
  })
})
