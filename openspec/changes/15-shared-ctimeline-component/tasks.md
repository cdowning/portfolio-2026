# Shared CTimeline component plan

**Status:** Planned. The component boundary and name are approved; implementation has not started.

## Task 1: Lock the existing timeline contract

- [ ] Record homepage and résumé timeline structure, spacing, responsive behavior, and theme treatment before extraction.
- [ ] Extend focused browser coverage so both routes identify the current experience role semantically and visually.
- [ ] Assert that exactly one current marker is filled and every historical marker remains hollow.
- [ ] Preserve existing homepage content and résumé detail assertions as regression coverage.

## Task 2: Build the shared CTimeline primitive

- [ ] Add `app/components/ui/CTimeline/CTimeline.vue` using Vue 3 `<script setup lang="ts">`.
- [ ] Define typed item, stable-key, and current-state inputs without coupling the component to `ExperienceRole`.
- [ ] Define a typed scoped slot that exposes each item, index, and resolved current state.
- [ ] Render the ordered list, list items, connecting line, and explicit decorative markers inside `CTimeline`.
- [ ] Apply `aria-current="true"` to current list items and keep marker elements `aria-hidden`.
- [ ] Use semantic design tokens for hollow and filled marker treatments in both themes.
- [ ] Document CSS custom properties for content inset, axis position, marker offset, and item minimum size.

## Task 3: Migrate the homepage experience

- [ ] Replace the homepage timeline list and marker pseudo-elements with `CTimeline`.
- [ ] Pass the shared roles, stable company-and-title key, and `role.current` resolver.
- [ ] Render the existing compact title, company, period, and skill content through the scoped slot.
- [ ] Configure compact timeline geometry through CSS custom properties without `:deep()` selectors.
- [ ] Preserve the experience summary, section marker, aside rail, résumé action, and responsive layout.

## Task 4: Migrate the résumé experience

- [ ] Replace the résumé timeline list, connecting-line pseudo-element, and marker pseudo-elements with `CTimeline`.
- [ ] Pass the same shared roles, stable key, and `role.current` resolver used by the homepage.
- [ ] Render the existing résumé period, company, title, and bullet content through the scoped slot.
- [ ] Configure detailed timeline geometry through CSS custom properties without `:deep()` selectors.
- [ ] Preserve the résumé aside, responsive reflow, and print-only résumé implementation.

## Task 5: Add component documentation

- [ ] Add `app/components/ui/CTimeline/CTimeline.stories.ts`.
- [ ] Demonstrate historical-only items and a timeline with one current item.
- [ ] Demonstrate compact and detailed geometry without adding page-specific component variants.
- [ ] Document props, slot values, CSS custom properties, current-state semantics, and accessibility behavior.
- [ ] Ensure change 14 includes `CTimeline` in the rebuilt public Storybook documentation.

## Task 6: Verify and stop

- [ ] Run focused component tests for item rendering, stable keys, current-state resolution, marker states, and slot values.
- [ ] Run homepage and résumé browser tests at representative narrow and desktop widths in light and dark themes.
- [ ] Confirm exactly one current role and no visual regression in either timeline.
- [ ] Run the Storybook static build and inspect all `CTimeline` stories.
- [ ] Run typecheck, lint, the relevant unit and browser suites, and Nuxt static generation.
- [ ] Confirm no employment content, page hierarchy, unrelated component, or deferred animation changed.
