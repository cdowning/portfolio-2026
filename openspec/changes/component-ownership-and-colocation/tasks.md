# Component ownership and colocation plan

**Status:** Planned. The ownership model is approved; application-file migration has not started.

## Task 1: Record and test the ownership contract

- [ ] 1.1 Update `DESIGN.md` with route composition roots, component ownership categories, dependency direction, Nuxt discovery policy, and composable colocation guidance.
- [ ] 1.2 Amend `SPEC.md` V8 so a shared UI component qualifies through either three same-intent production uses or explicit approval as a context-independent public primitive with distinct consumers and a documented typed contract.
- [ ] 1.3 Add the component-ownership migration as a dedicated `SPEC.md` implementation task without changing V1-V16 behavior guarantees.
- [ ] 1.4 Add failing structural coverage for the approved UI and site inventories, route-only `app/pages`, page-slice dependency boundaries, composable locations, and generated Nuxt component registrations.

## Task 2: Establish site chrome ownership

- [ ] 2.1 Move `SiteHeader`, its story, `useActiveSection`, and `useMobileNavigation` into one `app/components/site/SiteHeader` directory while preserving their public contracts and lifecycle cleanup.
- [ ] 2.2 Move `ThemeToggle` and its story into `app/components/site/ThemeToggle` while preserving its use of the application-wide `useTheme` composable.
- [ ] 2.3 Move `SiteContactFooter` and its story from `app/components/shared` into `app/components/site/SiteContactFooter` without changing content, semantics, responsive behavior, or artwork.
- [ ] 2.4 Update site-component consumers and focused tests to use explicit imports, then verify both routes, header behavior, theme control, and footer behavior.

## Task 3: Colocate homepage-owned behavior

- [ ] 3.1 Create `app/components/home/HomeHero`, move `HomeHero.vue` and `useHeroScrollMotion.ts` into it, and preserve the composable signature and all listener, media-query, animation-frame, and observer cleanup.
- [ ] 3.2 Update homepage imports and focused tests for the new hero paths while keeping other single-file home components shallow.
- [ ] 3.3 Confirm `useEditorialMotion` and `useTheme` remain in `app/composables`, and leave the deferred `usePrintResume` workflow unchanged.

## Task 4: Restrict Nuxt component discovery

- [ ] 4.1 Configure Nuxt to auto-discover only `app/components/ui` with `pathPrefix: false`, removing the broad `app/components` scan.
- [ ] 4.2 Add or update explicit imports for every site, home, résumé, and foundation component that previously relied on discovery.
- [ ] 4.3 Prepare Nuxt and verify generated component types expose the approved UI primitives with unprefixed names, exclude non-UI project components, and emit no component-name collision warnings.

## Task 5: Reconcile paths and documentation

- [ ] 5.1 Update Storybook imports and story references for every moved component without expanding the deferred public documentation work from change 14.
- [ ] 5.2 Update affected unit, browser, configuration, documentation, and OpenSpec path references.
- [ ] 5.3 Search repository-wide for obsolete `components/shared`, old site-component, and old component-owned composable paths; resolve every active reference while preserving unrelated working-tree changes.

## Task 6: Verify behavior and stop

- [ ] 6.1 Run focused structural, component, homepage, résumé, header, theme, footer, hero-motion, and timeline tests after the migration.
- [ ] 6.2 Run the full unit and browser suites, including representative narrow and desktop coverage in light and dark themes and the existing print contract.
- [ ] 6.3 Run typecheck, lint, Nuxt static generation, and the Storybook static build.
- [ ] 6.4 Confirm both public routes preserve content, hierarchy, semantics, responsive behavior, themes, motion, accessibility, print output, and generated output, with no unrelated redesign or component extraction.
