# Component map

Route files remain composition-only and consume the typed exports in `app/content/site.ts`.

## Page components

- `pages/index.vue`: homepage metadata and section composition.
- `home/HomeHero.vue`: opening statement, CTA, portrait sample, and drafting annotations; no props.
- `home/HomeWork.vue`: work-grid composition; `items: WorkItem[]`.
- `home/HomeAbout.vue`: biography and process diagram; `profile: SiteProfile`.
- `home/HomeExperience.vue`: compact experience summary; `roles: ExperienceRole[]`.
- `home/HomeToolkit.vue`: compact toolkit strip; `items: string[]`.
- `pages/resume.vue`: résumé metadata and section composition.
- `resume/ResumeIntro.vue`: identity/profile/contact/print entry; `profile: SiteProfile`; emits `print`.
- `resume/ResumeSkills.vue`: profile copy and skill groups; `groups: SkillGroup[]`.
- `resume/ResumeExperience.vue`: full work timeline; `roles: ExperienceRole[]`.
- `resume/ResumeEducation.vue`: education and toolkit; `education: EducationEntry`, `tools: string[]`.

## Shared candidates

Extract only after at least three same-intent uses are visible across both pages:

- `SiteHeader`: navigation; `items: NavigationItem[]`; owns open/close state and emits no domain events.
- `SectionMarker`: numbered editorial heading; `index`, `label`, optional `titleId`.
- `DraftingPath`: decorative SVG variant; `variant`, optional `animated`; always `aria-hidden`.
- `SkillTag`: one presentational label; `label`, optional `tone`.
- `ContactFooter`: gold contact panel; `profile: SiteProfile`.

## Browser behavior

- `useActiveSection`: readonly active anchor plus observer lifecycle.
- `useReducedMotion`: readonly preference with media-query cleanup.
- `usePrintResume`: small `print()` action guarded for client runtime.
