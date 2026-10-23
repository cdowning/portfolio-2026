# Component ownership and colocation plan

**Status:** Complete. Ownership boundaries, colocated lifecycle behavior, explicit imports, documentation, and verification are finished.

## Task 1: Record and test the ownership contract

- [x] 1.1 Update `DESIGN.md` with route composition roots, component ownership categories, dependency direction, Nuxt discovery policy, and composable colocation guidance.
- [x] 1.2 Amend `SPEC.md` V8 so a shared UI component qualifies through either three same-intent production uses or explicit approval as a context-independent public primitive with distinct consumers and a documented typed contract.
- [x] 1.3 Add the component-ownership migration as a dedicated `SPEC.md` implementation task without changing V1-V18 behavior guarantees.
- [x] 1.4 Add failing structural coverage for the approved UI and site inventories, route-only `app/pages`, page-slice dependency boundaries, composable locations, explicit component imports, and absence of project-owned global registrations.

## Task 2: Establish site chrome ownership

- [x] 2.1 Move `SiteHeader`, `useActiveSection`, and `useMobileNavigation` into one `app/components/site/SiteHeader` directory while preserving their public contracts and lifecycle cleanup; no header story exists yet, so its creation remains scoped to change 14.
- [x] 2.2 Move `ThemeToggle` and its story into `app/components/site/ThemeToggle` while preserving its use of the application-wide `useTheme` composable.
- [x] 2.3 Move `SiteContactFooter` and its story from `app/components/shared` into `app/components/site/SiteContactFooter` without changing content, semantics, responsive behavior, or artwork.
- [x] 2.4 Update site-component consumers and focused tests to use explicit imports, then verify both routes, header behavior, theme control, and footer behavior.

## Task 3: Colocate homepage-owned behavior

- [x] 3.1 Create `app/components/home/HomeHero`, move `HomeHero.vue` and `useHeroScrollMotion.ts` into it, and preserve the composable signature and all listener, media-query, animation-frame, and observer cleanup.
- [x] 3.2 Update homepage imports and focused tests for the new hero paths while keeping other single-file home components shallow.
- [x] 3.3 Confirm `useEditorialMotion` and `useTheme` remain in `app/composables`, and leave the deferred `usePrintResume` workflow unchanged.

## Task 4: Disable project component auto-discovery

- [x] 4.1 Set Nuxt `components: false`, removing both the UI-specific and broad `app/components` scans.
- [x] 4.2 Verify every project-owned UI, site, home, résumé, and foundation component is explicitly imported by each consumer.
- [x] 4.3 Prepare Nuxt and verify generated component types exclude every project-owned component while `NuxtLink`, `NuxtPage`, and the Nuxt Icon `Icon` component continue to resolve without registration warnings.

## Task 5: Reconcile paths and documentation

- [x] 5.1 Update Storybook imports and story references for every moved component without expanding the deferred public documentation work from change 14.
- [x] 5.2 Update affected unit, browser, configuration, documentation, and OpenSpec path references, including stale `CTimeline` and component-map statements in `DESIGN.md` and `ARCHITECTURE.md`.
- [x] 5.3 Search repository-wide for obsolete `components/shared`, old site-component, and old component-owned composable paths; resolve every active reference while preserving unrelated working-tree changes.

## Task 6: Verify behavior and stop

- [x] 6.1 Run focused structural, component, homepage, résumé, header, theme, footer, hero-motion, and timeline tests after the migration.
- [x] 6.2 Run the full unit and browser suites, including representative narrow and desktop coverage in light and dark themes and the existing print contract.
- [x] 6.3 Run typecheck, lint, Nuxt static generation, and the Storybook static build.
- [x] 6.4 Confirm both public routes preserve content, hierarchy, semantics, responsive behavior, themes, motion, accessibility, print output, and generated output, with no unrelated redesign or component extraction.
