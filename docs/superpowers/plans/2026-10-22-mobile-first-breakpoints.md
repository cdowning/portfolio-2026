# Site-Wide Mobile-First Breakpoints Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the complete portfolio to one mobile-first responsive scale without adding Tailwind or changing content, interaction order, accessibility, or print behavior.

**Architecture:** Keep component-scoped plain CSS. Make the narrow layout each component's base, then layer enhancements with `min-width` queries at `40rem`, `48rem`, `64rem`, `80rem`, and `96rem`. Retain height-, motion-, theme-, and print-specific media queries because they are not width breakpoints.

**Tech Stack:** Nuxt 4, Vue 3 SFCs, scoped CSS, Vitest, Playwright

**Spec:** `DESIGN.md`

## Global Constraints

- Shared scale: `sm 40rem`, `md 48rem`, `lg 64rem`, `xl 80rem`, `2xl 96rem`.
- Use mobile-first `min-width` width queries only.
- Do not add Tailwind, Sass, PostCSS plugins, or new runtime dependencies.
- Preserve DOM order, keyboard order, touch targets, semantic HTML, reduced motion, themes, and two-page résumé printing.
- Preserve the mobile marker gutter and the footer airplane's minimum 96px rendered width whenever visible.
- Height-, motion-, theme-, and print-specific media queries remain independent of the width scale.

## Review Focus

- 640px and 768px boundaries must not produce overlapping header navigation or undersized controls.
- 1024px landscape must not overflow when the footer flight first appears.
- 1280px must keep homepage and résumé grids readable before wide decorative columns return.
- 1536px must restore wide layouts without shifting focus or content order.
- 320px must retain every primary action and avoid horizontal overflow.

---

### Task 1: Lock the shared responsive contract

**Files:**
- Modify: `tests/e2e/adaptation.spec.ts`
- Modify: `tests/e2e/homepage.spec.ts`
- Modify: `tests/e2e/resume.spec.ts`

**Interfaces:**
- Consumes: existing semantic selectors and component DOM order.
- Produces: runtime layout assertions for 320, 640, 768, 1024, 1280, and 1536px.

- [ ] Add failing tests for header mode, marker gutter, major grid column counts, footer flight visibility, footer brand placement, touch targets, and overflow at the shared boundaries.
- [ ] Run the focused Playwright tests and confirm failures occur at the legacy width transitions.

### Task 2: Convert global chrome to mobile-first

**Files:**
- Modify: `app/assets/css/main.css`
- Modify: `app/components/ui/SiteHeader/SiteHeader.vue`
- Modify: `app/components/ui/ThemeToggle/ThemeToggle.vue`
- Modify: `app/components/ui/CSectionMarker/CSectionMarker.vue`

**Interfaces:**
- Consumes: the shared scale from this plan.
- Produces: mobile base touch behavior and `md` desktop navigation without changing component APIs.

- [ ] Move phone touch, menu, theme-border, and marker styles into base rules.
- [ ] Restore tablet and desktop chrome with `min-width: 40rem` and `min-width: 48rem` rules.
- [ ] Run the focused navigation, focus, target-size, and marker tests.

### Task 3: Convert homepage sections to mobile-first

**Files:**
- Modify: `app/components/home/HomeHero.vue`
- Modify: `app/components/home/HomeWork.vue`
- Modify: `app/components/home/HomeAbout.vue`
- Modify: `app/components/home/HomeExperience.vue`
- Modify: `app/components/home/HomeToolkit.vue`

**Interfaces:**
- Consumes: shared responsive contract and existing component markup.
- Produces: mobile base layouts enhanced at `md`, `lg`, `xl`, and `2xl`.

- [ ] Make single-column phone layouts the base in each component.
- [ ] Restore tablet layouts at `md`, desktop layouts at `lg`, wide side content at `xl`, and the Toolkit's full row at `2xl`.
- [ ] Keep the hero's short-height query because it addresses viewport height, not width classification.
- [ ] Run homepage, hero-motion, overflow, and navigation tests.

### Task 4: Convert résumé and foundation surfaces to mobile-first

**Files:**
- Modify: `app/components/resume/ResumeIntro.vue`
- Modify: `app/components/resume/ResumeSkills.vue`
- Modify: `app/components/resume/ResumeExperience.vue`
- Modify: `app/components/resume/ResumeEducationToolkit.vue`
- Modify: `app/components/foundations/TypographySpecimen/TypographySpecimen.vue`

**Interfaces:**
- Consumes: shared responsive contract and existing print rules.
- Produces: mobile base résumé layouts, progressive screen enhancements, unchanged print output.

- [ ] Make phone layouts the base and remove legacy `32rem`, `42rem`, `52rem`, `62rem`, and `72rem` width queries.
- [ ] Restore tablet composition at `md`, desktop composition at `lg`, and decorative wide columns at `xl`.
- [ ] Run résumé, print, foundation, and overflow tests.

### Task 5: Complete the shared footer migration

**Files:**
- Modify: `app/components/shared/SiteContactFooter.vue`
- Modify: `tests/e2e/adaptation.spec.ts`

**Interfaces:**
- Consumes: shared scale and footer flight artwork.
- Produces: mobile base footer, `lg` flight, and `2xl` side brand.

- [ ] Retain the current in-progress footer conversion.
- [ ] Verify the flight is hidden below `lg`, is at least 96px wide when visible, and the brand moves to column three only at `2xl`.

### Task 6: Verify the migration and remove breakpoint drift

**Files:**
- Modify: `DESIGN.md`

**Interfaces:**
- Consumes: completed component migration.
- Produces: documented shared breakpoint policy and release evidence.

- [ ] Document the five-value mobile-first scale and the exception policy for non-width media features.
- [ ] Confirm repository width queries use only `40rem`, `48rem`, `64rem`, `80rem`, and `96rem` with `min-width`.
- [ ] Run `git diff --check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e`, and `pnpm build`.
- [ ] Inspect homepage and résumé at 320, 640, 768, 1024, 1280, and 1536px in one batched browser pass.

