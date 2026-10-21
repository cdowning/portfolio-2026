# Shared CTimeline component plan

**Status:** Complete. The shared component, both consumers, Storybook documentation, and verification are finished.

## Task 1: Lock the existing timeline contract

- [x] Record homepage and résumé timeline structure, spacing, responsive behavior, and theme treatment before extraction.
- [x] Extend focused browser coverage so both routes identify the current experience role semantically and visually.
- [x] Assert that exactly one current marker is filled and every historical marker remains hollow.
- [x] Preserve existing homepage content and résumé detail assertions as regression coverage.

## Task 2: Build the shared CTimeline primitive

- [x] Add `app/components/ui/CTimeline/CTimeline.vue` using Vue 3 `<script setup lang="ts">`.
- [x] Define typed item, stable-key, and current-state inputs without coupling the component to `ExperienceRole`.
- [x] Define a typed scoped slot that exposes each item, index, and resolved current state.
- [x] Render the ordered list, list items, connecting line, and explicit decorative markers inside `CTimeline`.
- [x] Apply `aria-current="true"` to current list items and keep marker elements `aria-hidden`.
- [x] Use semantic design tokens for hollow and filled marker treatments in both themes.
- [x] Document CSS custom properties for content inset, axis position, marker offset, and item minimum size.

## Task 3: Migrate the homepage experience

- [x] Replace the homepage timeline list and marker pseudo-elements with `CTimeline`.
- [x] Pass the shared roles, stable company-and-title key, and `role.current` resolver.
- [x] Render the existing compact title, company, period, and skill content through the scoped slot.
- [x] Configure compact timeline geometry through CSS custom properties without `:deep()` selectors.
- [x] Preserve the experience summary, section marker, aside rail, résumé action, and responsive layout.

## Task 4: Migrate the résumé experience

- [x] Replace the résumé timeline list, connecting-line pseudo-element, and marker pseudo-elements with `CTimeline`.
- [x] Pass the same shared roles, stable key, and `role.current` resolver used by the homepage.
- [x] Render the existing résumé period, company, title, and bullet content through the scoped slot.
- [x] Configure detailed timeline geometry through CSS custom properties without `:deep()` selectors.
- [x] Preserve the résumé aside, responsive reflow, and print-only résumé implementation.

## Task 5: Add component documentation

- [x] Add `app/components/ui/CTimeline/CTimeline.stories.ts`.
- [x] Demonstrate historical-only items and a timeline with one current item.
- [x] Demonstrate compact and detailed geometry without adding page-specific component variants.
- [x] Document props, slot values, CSS custom properties, current-state semantics, and accessibility behavior.
- [x] Ensure change 14 includes `CTimeline` in the rebuilt public Storybook documentation.

## Task 6: Verify and stop

- [x] Run focused component tests for item rendering, stable keys, current-state resolution, marker states, and slot values.
- [x] Run homepage and résumé browser tests at representative narrow and desktop widths in light and dark themes.
- [x] Confirm exactly one current role and no visual regression in either timeline.
- [x] Run the Storybook static build and inspect all `CTimeline` stories.
- [x] Run typecheck, lint, the relevant unit and browser suites, and Nuxt static generation.
- [x] Confirm no employment content, page hierarchy, unrelated component, or deferred animation changed.
