import type {
  EducationEntry,
  ExperienceRole,
  NavigationItem,
  SiteProfile,
  SkillGroup,
  WorkItem,
} from '~/types/content'

export const navigation: NavigationItem[] = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/#contact' },
]

export const profile: SiteProfile = {
  name: 'Caitlin Hawley',
  role: 'Frontend Developer',
  email: 'caitlin.j.hawley@gmail.com',
  location: 'Franklin, Tennessee',
  website: 'https://www.caitlinhawley.com',
  shortSummary: 'Frontend developer with a passion for design.',
  summary:
    'Frontend developer with more than a decade of experience turning visual ideas into clear, reusable interfaces. I focus on accessible interfaces, Vue, Nuxt, TypeScript, and design systems — combining design sensibility with practical, human-centered solutions.',
  contacts: [
    { label: 'Email', href: 'mailto:caitlin.j.hawley@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/caitlindowning/', external: true },
    { label: 'GitHub', href: 'https://github.com/cdowning', external: true },
    { label: 'CodePen', href: 'https://codepen.io/cdowning', external: true },
  ],
}

export const workItems: WorkItem[] = [
  {
    index: '01',
    title: 'Component library',
    eyebrow: 'Scalable UI building blocks',
    description: 'A flexible, accessible component library built for consistency and real-world use.',
    href: 'https://storybook.caitlinhawley.com/',
    external: true,
    tags: ['Vue', 'TypeScript', 'Design systems', 'Accessibility'],
    specimen: 'components',
  },
  {
    index: '02',
    title: 'Interaction studies',
    eyebrow: 'People-centered experiences',
    description: 'Exploring interaction patterns that make complex tasks feel simple and intuitive.',
    href: 'https://codepen.io/cdowning',
    external: true,
    tags: ['User research', 'Prototyping', 'Interaction design'],
    specimen: 'interaction',
  },
  {
    index: '03',
    title: 'Frontend systems',
    eyebrow: 'Ideas into production',
    description: 'Building performant, maintainable frontend systems that scale with people and product.',
    href: '/resume#experience',
    tags: ['Vue', 'TypeScript', 'Nuxt', 'Tooling'],
    specimen: 'systems',
  },
]

export const experience: ExperienceRole[] = [
  {
    company: 'Quore',
    title: 'Frontend Developer',
    period: 'October 2016 — Present',
    shortPeriod: '2016 — Present',
    discipline: 'Product development',
    bullets: [
      'Create and manage global Vue.js components using Storybook.',
      'Build product experiences with Nuxt.',
      'Resolve styling and functionality issues.',
      'Implement features in an established product.',
    ],
    skills: ['Vue', 'Nuxt', 'TypeScript', 'Storybook'],
  },
  {
    company: 'NIC, Inc',
    title: 'Senior User Interface Designer',
    period: 'May 2016 — October 2016',
    shortPeriod: '2016',
    discipline: 'Web applications',
    bullets: [
      'Implemented and maintained styles and scripts.',
      'Communicated project risks.',
      'Analyzed interface problems and created practical solutions.',
    ],
    skills: ['JavaScript', 'Sass', 'Product design'],
  },
  {
    company: 'NIC, Inc',
    title: 'User Interface Designer',
    period: 'May 2011 — May 2016',
    shortPeriod: '2011 — 2016',
    discipline: 'Digital products',
    bullets: [
      'Improved TN.gov usability.',
      'Partnered across product roles.',
      'Designed interactive web/mobile prototypes.',
      'Built standards-compliant cross-browser interfaces.',
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive design'],
  },
  {
    company: 'ARS Interactive',
    title: 'Frontend Developer',
    period: 'March 2010 — May 2011',
    shortPeriod: '2010 — 2011',
    discipline: 'Web foundations',
    bullets: [
      'Managed digital advertising experiences.',
      'Translated creative direction into compliant interfaces.',
      'Implemented standards-aligned web applications.',
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'UI implementation'],
  },
]

export const education: EducationEntry = {
  school: 'The Art Institute of Tennessee—Nashville',
  degree: 'BFA Interactive Media & Web Design',
  period: '2007 — 2009',
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Core skills',
    items: ['Vue.js', 'Nuxt', 'TypeScript', 'JavaScript', 'HTML', 'CSS & Sass', 'Accessibility', 'Design systems'],
  },
  {
    title: 'Tools I use',
    items: ['Storybook', 'Figma', 'Tailwind', 'Git', 'VS Code', 'Jest'],
  },
]

export const toolkit = ['Vue', 'TypeScript', 'JavaScript', 'Sass', 'Tailwind', 'Figma', 'Storybook', 'Accessibility', 'Design systems']
