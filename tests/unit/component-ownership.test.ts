import { existsSync, readFileSync, readdirSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

const projectUrl = new URL('../../', import.meta.url)

function directoryNames(path: string) {
  const directory = new URL(path, projectUrl)
  if (!existsSync(directory)) return []

  return readdirSync(directory, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()
}

function fileNames(path: string) {
  const directory = new URL(path, projectUrl)
  if (!existsSync(directory)) return []

  return readdirSync(directory, { withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => entry.name)
    .sort()
}

function source(path: string) {
  return readFileSync(new URL(path, projectUrl), 'utf8')
}

describe('component ownership', () => {
  it('keeps app/pages limited to the two route composition roots', () => {
    expect(fileNames('app/pages')).toEqual(['index.vue', 'resume.vue'])
  })

  it('keeps only approved context-independent primitives in ui', () => {
    expect(directoryNames('app/components/ui')).toEqual([
      'CButton',
      'CSectionMarker',
      'CTag',
      'CTimeline',
      'FabricSwatches',
    ])
  })

  it('colocates site chrome and header-owned behavior', () => {
    expect(directoryNames('app/components/site')).toEqual([
      'SiteContactFooter',
      'SiteHeader',
      'ThemeToggle',
    ])
    expect(fileNames('app/components/site/SiteHeader')).toEqual([
      'SiteHeader.vue',
      'useActiveSection.ts',
      'useMobileNavigation.ts',
    ])
    expect(fileNames('app/components/site/ThemeToggle')).toEqual([
      'ThemeToggle.stories.ts',
      'ThemeToggle.vue',
    ])
    expect(fileNames('app/components/site/SiteContactFooter')).toEqual([
      'SiteContactFooter.stories.ts',
      'SiteContactFooter.vue',
    ])
  })

  it('colocates hero-owned lifecycle behavior without nesting other home sections', () => {
    expect(fileNames('app/components/home/HomeHero')).toEqual([
      'HomeHero.vue',
      'useHeroScrollMotion.ts',
    ])
    expect(existsSync(new URL('app/components/home/HomeAbout.vue', projectUrl))).toBe(true)
    expect(existsSync(new URL('app/components/home/HomeWork.vue', projectUrl))).toBe(true)
  })

  it('keeps global composables limited to application-wide behavior and deferred print cleanup', () => {
    expect(fileNames('app/composables')).toEqual([
      'useEditorialMotion.ts',
      'usePrintResume.ts',
      'useTheme.ts',
    ])
  })

  it('keeps home, resume, site, and ui dependencies one-way', () => {
    const uiSource = directoryNames('app/components/ui')
      .flatMap(directory => fileNames(`app/components/ui/${directory}`)
        .filter(file => file.endsWith('.vue') || file.endsWith('.ts'))
        .map(file => source(`app/components/ui/${directory}/${file}`)))
      .join('\n')
    const homeSource = readdirSync(new URL('app/components/home', projectUrl), { recursive: true })
      .filter(path => typeof path === 'string' && (path.endsWith('.vue') || path.endsWith('.ts')))
      .map(path => source(`app/components/home/${path}`))
      .join('\n')
    const resumeSource = readdirSync(new URL('app/components/resume', projectUrl), { recursive: true })
      .filter(path => typeof path === 'string' && (path.endsWith('.vue') || path.endsWith('.ts')))
      .map(path => source(`app/components/resume/${path}`))
      .join('\n')

    expect(uiSource).not.toMatch(/~\/components\/(?:home|resume|site)\//)
    expect(homeSource).not.toContain('~/components/resume/')
    expect(resumeSource).not.toContain('~/components/home/')
  })

  it('disables project component discovery in favor of explicit imports', () => {
    const config = source('nuxt.config.ts')

    expect(config).toMatch(/components:\s*false/)
    expect(config).not.toContain('pathPrefix')
  })
})
