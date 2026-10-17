# Footer social icons implementation plan

**Status:** Planning only. No implementation started.

## Task 1: Establish local icon infrastructure

- [ ] Add `@nuxt/icon` to the Nuxt module configuration.
- [ ] Add local Phosphor and Devicon Iconify collections.
- [ ] Configure the client bundle to scan literal icon names and explicitly include any names that cannot be scanned.
- [ ] Disable runtime Iconify API fallback for production output.
- [ ] Add a static-generation assertion that required footer icons render without remote icon requests.

## Task 2: Add labeled social icons

- [ ] Represent footer social destinations from the typed content source rather than duplicating URLs in components.
- [ ] Add CodePen to the homepage and résumé footer link sets.
- [ ] Use Phosphor LinkedIn, GitHub, and CodePen logo icons with visible text labels.
- [ ] Mark icons decorative while preserving link text as the accessible name.
- [ ] Keep the treatment visually secondary to the email action and consistent with the existing underline language.
- [ ] Preserve focused, hovered, active, and icon-failure states.

## Task 3: Add focused regression coverage

- [ ] Extend content tests for the three approved social destinations and order.
- [ ] Add component tests for visible labels, decorative icon semantics, external-link attributes, and icon fallback resilience.
- [ ] Verify generated output contains required icon markup and does not request the public Iconify API.
- [ ] Confirm the existing footer layouts do not regress at supported widths.

## Task 4: Verify and stop

- [ ] Run focused unit and browser tests.
- [ ] Run typecheck, lint, static generation, and Storybook build.
- [ ] Confirm no footer breakpoint or unrelated layout was refactored.
- [ ] Record completion only after automated proof passes.
