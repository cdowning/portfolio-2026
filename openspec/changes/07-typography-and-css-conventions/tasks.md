# Typography and component CSS conventions implementation plan

**Goal:** Establish shared screen typography, remove BEM naming, and harmonize footer selection without visual or behavioral drift.

**Architecture:** Root CSS owns primitive and semantic type tokens. Scoped Vue SFCs use flat kebab-case classes. Typed props produce variant classes. Template refs and semantic test locators replace class-based behavioral coupling.

**Spec:** `openspec/changes/07-typography-and-css-conventions/proposal.md`

## Global constraints

- Preserve approved Pattern Table composition, content, responsive layout, themes, motion, and two public routes.
- Preserve two-page US Letter print output and point-based print typography.
- Preserve unrelated working-tree changes.
- Migrate one component slice at a time with focused verification.

## Task 1: Amend durable design and implementation contracts

- [x] Add type scale, flat class convention, and footer selection roles to `DESIGN.md`.
- [x] Add V14-V16 and implementation task to `SPEC.md`.
- [x] Verify `DESIGN.md`, `SPEC.md`, and proposal agree.

## Task 2: Add typography tokens and Storybook specimen

- [x] Add minor-third primitive tokens and initial semantic roles to `app/assets/css/main.css`.
- [x] Add Storybook typography specimen covering every token and semantic role.
- [x] Verify nominal values, browser-relative scaling, light/dark contrast, and `12px` label floor.

## Task 3: Migrate shared UI classes and variants

- [x] Convert `CButton`, `CTag`, `CSectionMarker`, `FabricSwatches`, `ThemeToggle`, and `SiteHeader` from BEM to flat scoped classes.
- [x] Keep dynamic variants as explicit typed-prop classes such as `.button-large` and `.button-gold`.
- [x] Replace avoidable parent `:deep()` dependencies with props, wrappers, or CSS custom properties.
- [x] Update component stories and focused tests with each slice.

## Task 4: Migrate homepage and résumé classes

- [x] Convert homepage components one at a time; update templates, scoped selectors, and tests together.
- [x] Convert résumé screen components one at a time; keep print selectors isolated.
- [x] Replace styling-class runtime queries with Vue template refs.
- [x] Preserve hero scroll geometry, reverse scroll, compact mode, reduced motion, and theme behavior.

## Task 5: Apply shared type roles

- [x] Map one-off screen font sizes to nearest intentional primitive or semantic role.
- [x] Preserve authored hierarchy while removing unjustified intermediate values.
- [x] Raise meaningful screen labels below `--text-xs` to readability floor.
- [x] Keep decorative exceptions hidden from assistive technology and documented.

## Task 6: Harmonize footer selection

- [x] Change footer selection to `background: var(--on-footer)` + `color: var(--footer)`.
- [x] Cover light `11.35:1` and dark `7.13:1` selection contrast.
- [x] Add light/dark footer selection states to Storybook.

## Task 7: Verify and stop

- [x] Assert no project-owned class contains BEM `__` or modifier `--` syntax.
- [x] Run unit, focused browser, full browser, typecheck, lint, static generation, and Storybook build checks.
- [x] Inspect homepage, résumé, component stories, both themes, responsive widths, and two-page print output.
- [x] Confirm no layout, motion, content, theme, or accessibility drift.
