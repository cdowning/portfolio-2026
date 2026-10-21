## 1. Pin the approved color contract

- [x] 1.1 Create `tests/unit/color-foundation.test.ts` with the exact 31-token `--color-<family>-<step>` inventory, family lightness order, six excluded values, semantic light/dark mappings, stylesheet ownership rules, supported Storybook block imports, and absence of obsolete `--palette-*` and convenience aliases.
- [x] 1.2 Extend `tests/e2e/theme.spec.ts` to assert every semantic color custom property in explicit light and dark themes plus the existing system-preference behavior, contrast thresholds, and first-paint contract.
- [x] 1.3 Run `pnpm test tests/unit/color-foundation.test.ts` and `pnpm test:e2e tests/e2e/theme.spec.ts -g "maps semantic colors"`; confirm the new structural assertions fail against the current monolithic CSS and missing MDX page while existing computed-color assertions remain green.
- [x] 1.4 Update `DESIGN.md` with the five approved primitive scales, exact semantic mappings, hex/OKLCH policy, six exclusions, Semantic Role Rule, and Palette Extension Rule without changing `.impeccable/design.json`.
- [x] 1.5 Add a concise `SPEC.md` invariant and implementation task for the exact primitive inventory, semantic indirection, plain-CSS ownership split, Storybook proof, and no-visual-drift requirement without rewriting existing invariants or task history.

## 2. Split global CSS and migrate color tokens

- [x] 2.1 Create `app/assets/css/fonts.css` containing only the five existing `@font-face` declarations with their current sources, weights, styles, and `font-display` behavior.
- [x] 2.2 Create `app/assets/css/variables.css` with the exact 31 approved `--color-*` primitives, light/default semantic mappings, explicit light and dark mappings, system-dark mapping, and existing global typography, layout, and motion custom properties inside the token layer.
- [x] 2.3 Reduce `app/assets/css/main.css` to the shared layer-order declaration, imports of `fonts.css` and `variables.css`, and the existing reset, base, component, and utility rules while preserving cascade order.
- [x] 2.4 Replace the authored blush swatch references in `app/components/home/HomeHero.vue` and `app/components/resume/ResumeIntro.vue` with `--color-blush-30`; remove obsolete `--palette-*` and convenience color aliases after confirming no active consumer remains.
- [x] 2.5 Run `pnpm test tests/unit/color-foundation.test.ts -t "exposes|maps|keeps global|publishes only"`, `pnpm test tests/unit/theme.test.ts`, and `pnpm test:e2e tests/e2e/theme.spec.ts -g "maps semantic colors|first visit|saved choice"`; confirm the exact token inventory, semantic computed values, system behavior, contrast, and first-paint checks pass while the Task 3 MDX assertion remains RED.

## 3. Publish the Storybook color foundation

- [x] 3.1 Add a Storybook-10.6-compatible direct `@storybook/addon-docs` development dependency to `package.json` and `pnpm-lock.yaml` rather than relying on a transitive package.
- [x] 3.2 Update `.storybook/main.ts` to discover foundation MDX files and configure the docs addon alongside the existing accessibility addon without changing Vue, Vite, or component-story discovery.
- [x] 3.3 Create `app/components/foundations/Colors/Colors.mdx` using `ColorPalette` and `ColorItem` from `@storybook/addon-docs/blocks` to document all five primitive families with exact token names and hex values.
- [x] 3.4 Add separate light and dark semantic-role palettes and concise guidance for ordinal steps, canonical hex values, OKLCH extension, semantic-token consumption, exclusions, and the Palette Extension Rule.
- [x] 3.5 Run `pnpm test tests/unit/color-foundation.test.ts` and `pnpm storybook:build`; confirm the MDX source contract passes and the Colors foundation page appears in the generated story index without warnings.

## 4. Reconcile dependent documentation

- [x] 4.1 Update the color-foundation item in `openspec/changes/14-storybook-documentation-and-development-deployment/tasks.md` to consume the completed Colors page from this change while preserving change 14's broader documentation and deployment scope.
- [x] 4.2 Search active source, tests, Storybook, and design records for obsolete `--palette-*` or convenience color aliases and for the six excluded values; retain excluded values only where historical or exploratory documentation explicitly identifies them as unapproved.
- [x] 4.3 Verify `.impeccable/design.json` has no diff and that `DESIGN.md`, CSS, Storybook, `SPEC.md`, and this OpenSpec change agree on the implemented inventory and extension process.

## 5. Verify no visual drift and stop

- [x] 5.1 Inspect `/` and `/resume` at representative desktop and narrow widths in explicit light and dark themes, including authored swatches, actions, rules, footer, focus, selection, and résumé print; confirm no intentional color, typography, spacing, layout, motion, content, or print change.
- [x] 5.2 Inspect the Storybook Colors page and representative existing stories in light and dark contexts; confirm primitives, semantic roles, names, hex values, and documentation hierarchy are accurate and legible.
- [x] 5.3 Run `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm generate && pnpm storybook:build`; require zero project-owned or dependency-compatibility warnings.
- [x] 5.4 Run `openspec validate color-foundation-and-storybook-documentation --strict`, record completion only after all checks pass, and stop without regenerating `.impeccable/design.json` or performing unrelated cleanup.
