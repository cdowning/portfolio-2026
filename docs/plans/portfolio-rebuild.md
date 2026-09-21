# Portfolio rebuild implementation plan

## Goal

Build approved homepage and résumé compositions as a fresh Nuxt 4 static site, preserving factual content and the Pattern Table visual system.

## Task 1: Foundation and content

Tooling, static config, typed content, tokens, assets, tests, and OpenSpec records.

## Task 2: Homepage

Approved desktop composition and factual destinations.

## Task 3: Résumé

Approved web composition and hidden two-page Letter print treatment.

## Task 4: Adaptation and extraction

Responsive navigation/layout, restrained motion, proven shared components, and Storybook.

## Task 5: Quality and launch readiness

Accessibility, visual QA, print inspection, performance, and static output.

## Global constraints

- Existing `portfolio-nuxt3` repository is read-only source material.
- Approved comps are immutable desktop references.
- Light-only v1; no CMS, Tailwind, SCSS, contact form, dark mode, or hosting migration.
- Use Vue 3 Composition API, `<script setup lang="ts">`, typed one-way component contracts, and thin route components.
- Original portrait remains an explicit external dependency; use an honest placeholder until supplied.
- Stop for user review after each phase.

## Verification contract

- Phase 1: content unit tests, lint, type-check, static route generation.
- Phase 2: homepage browser behavior and desktop visual comparison.
- Phase 3: résumé browser behavior and exactly two-page Letter PDF.
- Phase 4: keyboard/mobile/reduced-motion tests and Storybook build.
- Phase 5: full suite, accessibility scan, screenshots, link check, Lighthouse, static generation.
