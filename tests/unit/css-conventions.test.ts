import { readFileSync, readdirSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

function vueFiles(directory: URL) {
  return readdirSync(directory, { recursive: true })
    .filter(path => typeof path === 'string' && path.endsWith('.vue'))
    .map(path => new URL(path, directory))
}

describe('screen CSS conventions', () => {
  it('uses shared tokens for every screen font size', () => {
    const files = [
      ...vueFiles(new URL('../../app/components/home/', import.meta.url)),
      ...vueFiles(new URL('../../app/components/resume/', import.meta.url)),
      ...vueFiles(new URL('../../app/components/ui/', import.meta.url)),
    ].filter(file => !file.pathname.endsWith('/ResumePrint.vue'))

    for (const file of files) {
      const source = readFileSync(file, 'utf8')

      expect(source).not.toMatch(/font-size:\s*(?:\d|\.\d)/)
      expect(source).not.toMatch(/font-size:\s*clamp\([^;]*\d(?:\.\d+)?rem/)
      expect(source).not.toMatch(/--tag-font-size:\s*(?:\d|\.\d)/)
    }
  })

  it('uses flat class names across project-owned Vue files', () => {
    const files = [
      new URL('../../app/app.vue', import.meta.url),
      ...vueFiles(new URL('../../app/components/', import.meta.url)),
      ...vueFiles(new URL('../../app/pages/', import.meta.url)),
    ]

    for (const file of files) {
      const source = readFileSync(file, 'utf8')

      expect(source).not.toMatch(/\.[a-z][\w-]*(?:__|--)[a-z]/)
      expect(source).not.toMatch(/['"][a-z][\w-]*(?:__|--)[a-z][\w-]*['"]/)
    }
  })

  it('uses a template ref for hero stage access', () => {
    const source = readFileSync(
      new URL('../../app/composables/useHeroScrollMotion.ts', import.meta.url),
      'utf8',
    )

    expect(source).not.toMatch(/querySelector<HTMLElement>\(['"]\.hero/)
  })
})
