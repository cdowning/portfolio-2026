## Context

- `app/pages/index.vue` and `app/pages/resume.vue` are concise route composition roots and already preserve required page hierarchy.
- `app/components/home` and `app/components/resume` are effective page slices, but page-specific behavior remains in `app/composables`.
- `app/components/ui` mixes context-independent component-library primitives with application-specific header and theme behavior.
- `app/components/shared` contains only `SiteContactFooter`; `shared` describes reuse but not ownership.
- Nuxt scans both `app/components/ui` and all of `app/components`; `pathPrefix: false` gives UI primitives clean names, but page and site components also remain globally discoverable.
- Large SFC line counts mostly come from cohesive scoped styling, not multiple runtime responsibilities.
- The completed `CTimeline` component, consumers, stories, and tests must remain intact throughout this refactor.

## Goals / Non-Goals

**Goals:**

- Make component ownership evident from paths.
- Preserve shallow homepage and résumé slices.
- Separate public UI primitives from app-specific site chrome.
- Keep component-specific DOM lifecycle behavior with its owner.
- Remove the unused global registration surface for project-owned components.
- Preserve current runtime and rendered behavior.

**Non-Goals:**

- No top-level `features` architecture.
- No components or composables beneath `app/pages`.
- No `HomeView` or `ResumeView` wrappers.
- No component split based only on line count.
- No redesign, content change, new dependency, analytics change, or deferred footer animation.
- No Storybook documentation or deployment implementation from change 14.

## Decisions

### Keep route entries as composition roots

`app/pages` remains the URL map. `index.vue` and `resume.vue` continue to own route metadata and compose their sections directly.

Alternative rejected: `app/pages/home/view` with nested components and composables. Nuxt file-based routing gives `.vue` files beneath `app/pages` route meaning, coupling code organization to URLs and risking unintended routes.

Alternative rejected: thin route adapters rendering `HomeView` and `ResumeView`. Current route SFCs are already concise; another wrapper adds navigation cost without isolating a new responsibility.

### Use shallow component ownership

```text
app/
├── components/
│   ├── ui/
│   │   ├── CButton/
│   │   ├── CSectionMarker/
│   │   ├── CTag/
│   │   ├── CTimeline/
│   │   └── FabricSwatches/
│   ├── site/
│   │   ├── SiteHeader/
│   │   ├── SiteContactFooter/
│   │   └── ThemeToggle/
│   ├── home/
│   ├── resume/
│   └── foundations/
├── composables/
│   ├── useEditorialMotion.ts
│   └── useTheme.ts
├── content/
├── pages/
├── types/
└── utils/
```

- `components/ui`: context-independent public primitives with typed props, events, or slots. Contains `CButton`, `CSectionMarker`, `CTag`, `CTimeline`, and `FabricSwatches`.
- `components/site`: application-specific UI shared across routes. Owns `SiteHeader`, `SiteContactFooter`, and `ThemeToggle` plus stories and component-owned behavior.
- `components/home` and `components/resume`: sections owned by one route experience. Single-use sections remain valid when they encapsulate coherent content, layout, or behavior.
- `components/foundations`: documentation or specimen components describing implemented foundations.

Alternative rejected: full `features/home`, `features/resume`, `features/site-shell`, and `features/theme` hierarchy. Two static routes do not justify the added directory depth and configuration.

Alternative rejected: retain `shared`. The name does not distinguish public primitives, application chrome, cross-cutting state, or generic utilities.

### Colocate component-owned composables

- Move `useHeroScrollMotion.ts` beside `HomeHero.vue`; it owns that component's refs, measurements, listeners, media queries, observers, and cleanup.
- Move `useActiveSection.ts` and `useMobileNavigation.ts` beside `SiteHeader.vue`; both exclusively implement header behavior.
- Keep `useEditorialMotion.ts` in `app/composables`; `app.vue` applies it across route content through `data-reveal`.
- Keep `useTheme.ts` in `app/composables`; it owns one application-wide theme state, persistence, document attributes, and browser metadata.
- Leave `usePrintResume.ts` in place because change `10-downloadable-resume-pdf` removes that visitor-facing print workflow.
- Explicitly import colocated composables; do not configure custom auto-import scanning for them.

Alternative rejected: move every composable into a slice. Ownership, consumer scope, and lifecycle determine location; technical type alone does not.

### Disable project component auto-discovery

Set Nuxt `components: false`. Explicit imports are already the contract for every project-owned UI, site, home, résumé, and foundation component, so retaining an auto-discovered subset adds a second loading convention without serving a current consumer.

Nuxt framework components and components registered by modules remain available through their own integrations. Typecheck and generated-output verification must prove that `NuxtLink`, `NuxtPage`, and the Nuxt Icon `Icon` component still resolve while no project-owned component appears as an unintended global registration.

### Enforce one-way dependency direction

```text
pages → home | resume | site → ui
                    ↘ content | types | utils | global composables

ui ⊥ import home | resume | site
home ⊥ import resume
resume ⊥ import home
```

- Route files own metadata and section composition.
- Page and site components own presentation and local DOM lifecycle.
- UI primitives expose typed, context-independent contracts.
- Shared content remains the factual source for both route compositions.

### Keep large cohesive SFCs intact

`HomeHero`, `HomeWork`, `ResumeIntro`, and `ResumePrint` remain intact. Scoped CSS volume is not evidence of multiple responsibilities. Future extraction requires a separately approved behavior, public contract, or independently understandable visual responsibility.

### Amend durable records

- Update `DESIGN.md` with route composition, ownership categories, dependency direction, discovery policy, and composable colocation.
- Amend `SPEC.md` V8: shared UI requires either at least three same-intent production uses or an explicitly approved context-independent public primitive with distinct consumers and a documented typed contract.
- Add a dedicated implementation task while keeping V1-V18 behavior guarantees intact.

## Risks / Trade-offs

- [Path-only refactor can hide accidental behavior drift] → Move one ownership slice at a time; run focused tests after each move and full verification at completion.
- [Disabling project component discovery can expose implicit usage or module-integration assumptions] → Verify every project component has an explicit import, inspect generated component types, and run typecheck, static generation, and focused browser coverage for Nuxt and module-provided components.
- [Storybook imports can become stale] → Move stories with owners and build Storybook after each story-bearing slice.
- [Tests and OpenSpec documents can retain obsolete paths] → Search repository-wide for each old path before completing its migration.
- [Completed `CTimeline` paths or documentation can regress] → Keep the primitive and both consumers unchanged, update only affected path references, and retain its focused tests and stories.
- [More component directories can add ceremony] → Create directories only when a component has supporting stories, composables, tests, or assets.

## Migration Plan

1. Record durable ownership contracts and add structural verification for discovery and dependency boundaries.
2. Move `SiteHeader`, `ThemeToggle`, `SiteContactFooter`, their stories, and header-owned composables into `components/site`; update explicit imports and focused tests.
3. Colocate `useHeroScrollMotion` with `HomeHero`; preserve its public signature and lifecycle behavior.
4. Disable project component auto-discovery; verify explicit imports, generated types, framework/module components, and absence of project-owned global registrations.
5. Update remaining test, Storybook, OpenSpec, and documentation paths.
6. Run focused and full unit/browser verification, typecheck, lint, static generation, and Storybook build.

Rollback is path-reversible: restore each moved file and its imports together, then restore the prior Nuxt discovery configuration. No data or external system migration exists.

## Open Questions

None. Structure and ownership direction approved during exploration.
