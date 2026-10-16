# Adaptive Color Themes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship accessible, persistent light and dark themes with a production-familiar header toggle and semantic contrast tokens.

**Architecture:** CSS resolves the system theme without JavaScript and explicit root attributes override it. A pre-paint bootstrap applies a valid stored override before rendering; a typed composable then owns live state and persistence, while a focused header component exposes the interaction.

**Tech Stack:** Nuxt 4, Vue 3 Composition API, TypeScript, CSS custom properties, Vitest, Playwright, Storybook.

**Spec:** `openspec/changes/06-adaptive-color-themes/proposal.md`

## Global Constraints

- Preserve the approved Pattern Table composition, content, typography, photography, motion, and two public routes.
- Light uses gold for primary actions/footer; dark uses blush; teal supports both.
- The interface exposes one light/dark toggle and no selectable system state.
- No new runtime dependency is required.
- Print remains exactly two US Letter pages with white paper and black ink.
- Preserve unrelated working-tree changes.

## Review Focus

- A first visit with dark OS preference must render dark before content becomes visible.
- Invalid or unavailable local storage must safely fall back to the system preference.
- A saved override must survive reloads and navigation between `/` and `/resume`.
- A system preference change must update an open page only while no override exists.
- Print and 320px layouts must remain stable regardless of the active screen theme.

---

### Task 1: Amend the durable product and design contracts ✅

**Files:**
- Modify: `PRODUCT.md`
- Modify: `DESIGN.md`
- Modify: `SPEC.md`

**Interfaces:**
- Produces: durable V11–V13 invariants and the theme task in `§T`; all later tasks implement these contracts.

- [x] **Step 1: Update the product and design records**

  Remove the light-only limitation; record the approved light/gold and dark/blush palettes, semantic contrast roles, production-familiar toggle behavior, placement, persistence, and fixed print treatment.

- [x] **Step 2: Amend the implementation invariants**

  Add V11–V13 from the proposal and add the adaptive-theme task to `§T` without rewriting unrelated history.

- [x] **Step 3: Verify the records agree**

  Confirm `PRODUCT.md`, `DESIGN.md`, `SPEC.md`, and this proposal describe the same two themes, the same binary toggle, and the same print boundary.

- [ ] **Step 4: Commit the approved contracts**

  Commit: `docs(theme): specify adaptive color themes`

### Task 2: Theme resolution and persistence domain ✅

**Files:**
- Create: `app/utils/theme.ts`
- Create: `app/composables/useTheme.ts`
- Create: `tests/unit/theme.test.ts`
- Modify: `nuxt.config.ts`

**Interfaces:**
- Produces: `Theme = 'light' | 'dark'`, `THEME_STORAGE_KEY`, `isTheme(value: unknown): value is Theme`, `THEME_BOOTSTRAP_SCRIPT`, and `useTheme(): { resolvedTheme: Readonly<Ref<Theme>>; toggleTheme(): void }`.
- Stores only `light` or `dark`; absence means system preference.

- [x] **Step 1: Write failing unit tests for validation and resolution**

  Cover valid and invalid stored values, light/dark system fallback, opposite-theme toggling, storage failure, and media-query changes before an override exists.

- [x] **Step 2: Run the focused unit test and confirm it fails**

  Run: `pnpm test -- tests/unit/theme.test.ts`

- [x] **Step 3: Implement the pure theme helpers and typed composable**

  Keep one reactive resolved theme, attach one `matchMedia('(prefers-color-scheme: dark)')` listener, ignore invalid storage, tolerate storage exceptions, update `document.documentElement.dataset.theme`, and update the active `theme-color` meta value.

- [x] **Step 4: Add the pre-paint bootstrap to Nuxt head output**

  The inline script may set `data-theme` only for a valid stored override. With no override, CSS remains responsible for the system default.

- [x] **Step 5: Run unit, type, and lint checks**

  Run: `pnpm test -- tests/unit/theme.test.ts && pnpm typecheck && pnpm lint`

- [ ] **Step 6: Commit the theme domain**

  Commit: `feat(theme): add preference resolution and persistence`

### Task 3: Semantic light and dark token system ✅

**Files:**
- Modify: `app/assets/css/main.css`
- Modify: `app/components/home/HomeHero.vue`
- Modify: `app/components/home/HomeAbout.vue`
- Modify: `app/components/home/HomeWork.vue`
- Modify: `app/components/home/HomeContact.vue`
- Modify: `app/components/home/HomeExperience.vue`
- Modify: `app/components/home/HomeToolkit.vue`
- Modify: `app/components/resume/ResumeIntro.vue`
- Modify: `app/components/resume/ResumeContact.vue`
- Modify: `app/components/resume/ResumeExperience.vue`
- Modify: `app/components/resume/ResumeEducationToolkit.vue`
- Modify: `app/components/resume/ResumeSkills.vue`
- Modify: `app/components/ui/CButton/CButton.vue`
- Modify: `app/components/ui/CTag/CTag.vue`
- Modify: `app/components/ui/FabricSwatches/FabricSwatches.vue`
- Create: `tests/e2e/theme.spec.ts`

**Interfaces:**
- Consumes: the root `data-theme` contract from Task 2.
- Produces: semantic CSS roles for canvas, surfaces, text, rules, action contrast, support/focus, selection, and footer contrast.

- [x] **Step 1: Write failing browser tests for both token maps**

  Assert the proposal's exact computed values for representative semantic elements in explicit light and dark modes. Include WCAG ratio assertions for body text, primary actions, footer text, footer action, and focus indication.

- [x] **Step 2: Run the theme browser tests and confirm they fail**

  Run: `pnpm test:e2e -- tests/e2e/theme.spec.ts`

- [x] **Step 3: Define primitive palettes and semantic mappings**

  Implement light root tokens, system-dark tokens under `:root:not([data-theme])`, and explicit light/dark attribute mappings. Set `color-scheme` consistently.

- [x] **Step 4: Migrate component colors to semantic roles**

  Replace light-only whites and grays in work specimens, hard-coded swatches, action assumptions, selection colors, rules, shadows, tags, mobile navigation, and footer contrast. Preserve authored primitive swatches where they communicate the palette itself.

- [x] **Step 5: Verify focused theme tests and component tests**

  Run: `pnpm test:e2e -- tests/e2e/theme.spec.ts && pnpm test`

- [ ] **Step 6: Commit the semantic color system**

  Commit: `feat(theme): add semantic light and dark color roles`

### Task 4: Accessible shared-header theme toggle ✅

**Files:**
- Create: `app/components/ui/ThemeToggle/ThemeToggle.vue`
- Create: `app/components/ui/ThemeToggle/ThemeToggle.stories.ts`
- Modify: `app/components/ui/SiteHeader/SiteHeader.vue`
- Modify: `tests/e2e/theme.spec.ts`
- Modify: `tests/e2e/adaptation.spec.ts`

**Interfaces:**
- Consumes: `useTheme()` from Task 2.
- Produces: a native 44×44px toggle with a stable accessible name and decorative theme icon.

- [x] **Step 1: Write failing interaction and placement tests**

  Assert keyboard activation, opposite-theme application, persisted override, reload and route continuity, desktop placement in a compact 52px cell between navigation and the far-right signature, mobile placement between brand and navigation, visible focus, and 44px targets at 320px and 390px.

- [x] **Step 2: Run the focused tests and confirm they fail**

  Run: `pnpm test:e2e -- tests/e2e/theme.spec.ts tests/e2e/adaptation.spec.ts`

- [x] **Step 3: Build `ThemeToggle.vue`**

  Use `<script setup lang="ts">`, consume the composable directly, render a native `button`, keep its icon `aria-hidden`, and expose the action with `aria-label="Toggle color theme"`.

- [x] **Step 4: Integrate the control into the shared header**

  Preserve the signature on desktop. Add a ruled utility cell for the toggle and adapt the mobile grid to `brand / theme / navigation` without overflow.

- [x] **Step 5: Document both states in Storybook**

  Show the control against light and dark header surfaces and enable the existing accessibility checks.

- [x] **Step 6: Run focused tests, Storybook build, typecheck, and lint**

  Run: `pnpm test:e2e -- tests/e2e/theme.spec.ts tests/e2e/adaptation.spec.ts && pnpm storybook:build && pnpm typecheck && pnpm lint`

- [ ] **Step 7: Commit the header control**

  Commit: `feat(theme): add accessible header theme toggle`

### Task 5: Theme edge cases, metadata, and print isolation ✅

**Files:**
- Modify: `nuxt.config.ts`
- Modify: `app/components/resume/ResumePrint.vue`
- Modify: `.storybook/preview.ts`
- Modify: `tests/e2e/theme.spec.ts`
- Modify: `tests/e2e/resume.spec.ts`
- Modify: `tests/e2e/foundation.spec.ts`

**Interfaces:**
- Consumes: semantic tokens and theme state from Tasks 2–4.
- Produces: theme-aware browser chrome, fixed print rendering, and reusable Storybook light/dark backgrounds.

- [x] **Step 1: Write failing tests for first paint, metadata, and print**

  Assert no theme flash signal, correct root state under emulated system preferences, correct `theme-color` after toggling, invalid-storage fallback, fixed white/black print styles, and unchanged two-page output.

- [x] **Step 2: Run the focused tests and confirm they fail**

  Run: `pnpm test:e2e -- tests/e2e/theme.spec.ts tests/e2e/resume.spec.ts tests/e2e/foundation.spec.ts`

- [x] **Step 3: Complete metadata and print isolation**

  Update browser theme color when the resolved theme changes, ensure print overrides do not inherit screen tokens, and hide the theme control in print.

- [x] **Step 4: Add Storybook light and dark theme surfaces**

  Replace palette-name-only backgrounds with semantic light and dark canvases while retaining gold and blush surfaces needed to inspect contrast components.

- [x] **Step 5: Run the focused verification**

  Run: `pnpm test:e2e -- tests/e2e/theme.spec.ts tests/e2e/resume.spec.ts tests/e2e/foundation.spec.ts && pnpm storybook:build`

- [ ] **Step 6: Commit the edge-case coverage**

  Commit: `test(theme): cover metadata print and first paint`

### Task 6: Bounded visual verification and release proof ✅

**Files:**
- Modify: `openspec/changes/06-adaptive-color-themes/tasks.md`

**Interfaces:**
- Consumes: the completed implementation and evidence from Tasks 1–5.
- Produces: completed task status and final visual evidence against V11–V13.

- [x] **Step 1: Capture the verification matrix in one inspection pass**

  Inspect `/` and `/resume` at desktop and 390px in explicit light and dark modes. Include the mobile navigation, focus state, footer, work specimens, and résumé print preview.

- [x] **Step 2: Fix all verified visual defects in one batch**

  Correct only issues exposed by the inspection. Preserve the approved compositions and unrelated working-tree changes.

- [x] **Step 3: Run one confirmation pass and the mechanical detector**

  Recheck the same view matrix once, then run the Impeccable detector over the changed UI targets.

- [x] **Step 4: Run the release suite**

  Run: `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm generate && pnpm storybook:build`

- [ ] **Step 5: Record completion and commit**

  Mark the OpenSpec tasks complete only after the release suite passes.

  Commit: `feat(theme): ship adaptive portfolio color themes`
