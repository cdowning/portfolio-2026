import { describe, expect, it } from 'vitest'

import { education, experience, navigation, profile, workItems } from '../../app/content/site'

describe('portfolio content contract', () => {
  it('keeps the two public destinations and factual work links', () => {
    expect(navigation.map((item) => item.href)).toEqual(['/#work', '/#about', '/resume', '/#contact'])
    expect(workItems.map((item) => item.href)).toEqual([
      'https://storybook.caitlinhawley.com/',
      'https://codepen.io/cdowning',
      '/resume#experience',
    ])
  })

  it('keeps verified identity, experience, and education data', () => {
    expect(profile.name).toBe('Caitlin Hawley')
    expect(profile.email).toBe('caitlin.j.hawley@gmail.com')
    expect(experience.map((role) => role.company)).toEqual(['Quore', 'NIC, Inc', 'NIC, Inc', 'ARS Interactive'])
    expect(education.school).toBe('The Art Institute of Tennessee—Nashville')
  })

  it('contains no invented project metrics', () => {
    for (const item of workItems) {
      expect(item).not.toHaveProperty('metrics')
      expect(item.description).not.toMatch(/\b\d+%\b/)
    }
  })
})
