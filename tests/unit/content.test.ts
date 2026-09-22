import { describe, expect, it } from 'vitest'

import { education, experience, navigation, profile, workItems } from '../../app/content/site'

describe('portfolio content contract', () => {
  it('keeps the two public destinations and factual work links', () => {
    expect(navigation).toEqual([
      { label: 'Work', href: '/#work' },
      { label: 'About', href: '/#about' },
      { label: 'Experience', href: '/#experience' },
      { label: 'Contact', href: '/#contact' },
    ])
    expect(workItems.map((item) => item.href)).toEqual([
      'https://storybook.caitlinhawley.com/',
      'https://codepen.io/cdowning',
      '/resume#experience',
    ])
  })

  it('keeps verified identity, experience, and education data', () => {
    expect(profile.name).toBe('Caitlin Hawley')
    expect(profile.email).toBe('caitlin.j.hawley@gmail.com')
    expect(profile.experienceLabel).toBe('15+ years')
    expect(profile.summary).toContain('15+ years of experience')
    expect(experience.map(({ company, title, shortPeriod }) => ({ company, title, shortPeriod }))).toEqual([
      { company: 'Allocate', title: 'Senior Frontend Engineer', shortPeriod: '2026 — Present' },
      { company: 'Allocate', title: 'Frontend Engineer', shortPeriod: '2024 — 2026' },
      { company: 'Quore', title: 'Frontend Developer', shortPeriod: '2016 — 2024' },
      { company: 'NIC, Inc', title: 'Senior User Interface Designer', shortPeriod: '2016' },
      { company: 'NIC, Inc', title: 'User Interface Designer', shortPeriod: '2011 — 2016' },
      { company: 'ARS Interactive', title: 'Frontend Developer', shortPeriod: '2010 — 2011' },
    ])
    expect(education.school).toBe('The Art Institute of Tennessee—Nashville')
  })

  it('contains no invented project metrics', () => {
    for (const item of workItems) {
      expect(item).not.toHaveProperty('metrics')
      expect(item.description).not.toMatch(/\b\d+%\b/)
    }
  })
})
