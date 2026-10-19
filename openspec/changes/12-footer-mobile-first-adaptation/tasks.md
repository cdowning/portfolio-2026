# Footer mobile-first adaptation plan

**Status:** Planning only. Blocked until `11-footer-social-icons` is complete.

## Task 1: Record the current responsive contract

- [ ] Capture current homepage and résumé footer behavior at 320, 390, 768, 1024, and wide desktop widths.
- [ ] Record source order, focus order, visibility rules, theme contrast, and decorative drawing behavior.
- [ ] Add focused regression assertions before restructuring CSS.

## Task 2: Rebuild the shared footer mobile first

- [ ] Make narrow-screen footer layout the base CSS for `SiteContactFooter`.
- [ ] Add tablet and desktop layouts with content-driven `min-width` queries.
- [ ] Remove obsolete footer-only `max-width` overrides after equivalent behavior is proven.
- [ ] Provide at least 44px touch targets and sufficient separation for every footer action.
- [ ] Preserve logical DOM and focus order while layouts reflow.
- [ ] Add safe-area-aware bottom padding and intentional phone landscape behavior.
- [ ] Keep core content visible when decorative drawing is removed at constrained widths.

## Task 3: Extend responsive coverage

- [ ] Test the shared footer on both routes at 320, 390, 768, 1024, and wide desktop widths.
- [ ] Assert no horizontal overflow, 44px targets, logical keyboard order, and visible focus.
- [ ] Verify portrait and landscape behavior with touch and fine-pointer inputs.
- [ ] Recheck light and dark footer contrast after layout changes.
- [ ] Confirm change 11 icon rendering and social-link semantics remain intact.

## Task 4: Impeccable adaptation review

- [ ] Run project-scoped `impeccable adapt` against the shared footer on the homepage and résumé routes.
- [ ] Review both footer contexts together at phone, tablet, and desktop sizes.
- [ ] Check portrait and landscape, touch and fine-pointer behavior, keyboard navigation, and both themes.
- [ ] Fix all findings in one bounded batch, then perform at most one confirmation pass.
- [ ] Keep the project skill, supporting agents, and detector hooks versioned and reproducible.

## Task 5: Verify and stop

- [ ] Run focused unit and browser tests.
- [ ] Run typecheck, lint, static generation, and Storybook build.
- [ ] Confirm no unrelated component was converted or redesigned.
- [ ] Record completion only after automated proof and responsive review pass.
