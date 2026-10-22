# Footer social icons implementation plan

**Status:** Complete. Implemented and verified alongside change 12.

## Task 1: Establish local icon infrastructure

- [x] Add `@nuxt/icon` to the Nuxt module configuration.
- [x] Add local Phosphor and Devicon Iconify collections.
- [x] Configure the client bundle to scan literal icon names and explicitly include any names that cannot be scanned.
- [x] Disable runtime Iconify API fallback for production output.
- [x] Add a static-generation assertion that required footer icons render without remote icon requests.

## Task 2: Add labeled social icons

- [x] Represent footer social destinations from the typed content source rather than duplicating URLs in components.
- [x] Add CodePen to the homepage and résumé footer link sets.
- [x] Use Phosphor LinkedIn, GitHub, and CodePen logo icons with visible text labels.
- [x] Mark icons decorative while preserving link text as the accessible name.
- [x] Keep the treatment visually secondary to the email action and consistent with the existing underline language.
- [x] Preserve focused, hovered, active, and icon-failure states.

## Task 3: Add focused regression coverage

- [x] Extend content tests for the three approved social destinations and order.
- [x] Add component tests for visible labels, decorative icon semantics, external-link attributes, and icon fallback resilience.
- [x] Verify generated output contains required icon markup and does not request the public Iconify API.
- [x] Confirm the existing footer layouts do not regress at supported widths.

## Task 4: Verify and stop

- [x] Run focused unit and browser tests.
- [x] Run typecheck, lint, static generation, and Storybook build.
- [x] Confirm no footer breakpoint or unrelated layout was refactored.
- [x] Record completion only after automated proof passes.
