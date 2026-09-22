export interface NavigationItem {
  label: string
  href: string
}

export interface ContactLink {
  label: string
  href: string
  external?: boolean
}

export interface SiteProfile {
  name: string
  role: string
  email: string
  location: string
  experienceLabel: string
  summary: string
  shortSummary: string
  approach: string
  website: string
  contacts: ContactLink[]
}

export interface WorkItem {
  index: string
  title: string
  eyebrow: string
  description: string
  href: string
  external?: boolean
  tags: string[]
  specimen: 'components' | 'interaction' | 'systems'
}

export interface ExperienceRole {
  company: string
  title: string
  period: string
  shortPeriod: string
  discipline: string
  bullets: string[]
  skills: string[]
}

export interface EducationEntry {
  school: string
  degree: string
  period: string
}

export interface SkillGroup {
  title: string
  items: string[]
}
