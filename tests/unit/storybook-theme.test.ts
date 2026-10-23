import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

const readProjectFile = (path: string) => readFileSync(
  new URL(`../../${path}`, import.meta.url),
  'utf8',
)

describe('Storybook theme controls', () => {
  it('uses the official themes addon with the site data attribute', () => {
    const packageJson = JSON.parse(readProjectFile('package.json'))
    const main = readProjectFile('.storybook/main.ts')
    const preview = readProjectFile('.storybook/preview.ts')

    expect(packageJson.devDependencies['@storybook/addon-themes']).toMatch(/^\^10\.6\./)
    expect(main).toContain("'@storybook/addon-themes'")
    expect(preview).toContain("from '@storybook/addon-themes'")
    expect(preview).toContain('withThemeByDataAttribute<Renderer>')
    expect(preview).toMatch(/themes:\s*\{\s*light:\s*'light',\s*dark:\s*'dark',?\s*\}/)
    expect(preview).toContain("defaultTheme: 'light'")
    expect(preview).toContain("attributeName: 'data-theme'")
    expect(preview).toContain("parentSelector: 'html'")
    expect(preview).not.toContain('backgrounds:')
  })

  it.each([
    'app/components/foundations/TypographySpecimen/TypographySpecimen.stories.ts',
    'app/components/site/SiteContactFooter/SiteContactFooter.stories.ts',
  ])('uses story globals instead of manually mutating the document in %s', (path) => {
    const story = readProjectFile(path)

    expect(story).toMatch(/globals:\s*\{\s*theme:\s*'light'\s*\}/)
    expect(story).toMatch(/globals:\s*\{\s*theme:\s*'dark'\s*\}/)
    expect(story).not.toContain('document.documentElement')
    expect(story).not.toContain('withTheme(')
  })
})
