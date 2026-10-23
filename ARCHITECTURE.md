# Component map

Project-owned components use explicit imports. Nuxt auto-discovery is disabled so file location communicates ownership rather than global registration.

## Composition roots

- `app/app.vue`: application shell, skip link, site header, and cross-route editorial motion.
- `app/pages/index.vue`: homepage metadata and direct section composition.
- `app/pages/resume.vue`: résumé metadata, web composition, and print composition.

## Ownership layers

- `app/components/ui`: context-independent primitives — `CButton`, `CSectionMarker`, `CTag`, `CTimeline`, and `FabricSwatches`.
- `app/components/site`: cross-route application chrome — `SiteHeader`, `ThemeToggle`, and `SiteContactFooter`.
- `app/components/home`: homepage-only sections. `HomeHero/` also owns its scroll-motion lifecycle composable.
- `app/components/resume`: résumé-only sections and the print source.
- `app/components/foundations`: Storybook foundation documentation and specimens.

Dependencies flow from routes into page and site components, then into UI primitives. UI primitives do not import site or page layers; home and résumé slices do not import each other.

## Browser behavior

- `SiteHeader/useActiveSection`: readonly active anchor with scroll, resize, animation-frame, and cleanup ownership.
- `SiteHeader/useMobileNavigation`: menu state, Escape handling, focus restoration, body state, and cleanup.
- `HomeHero/useHeroScrollMotion`: hero measurement, media-query, observer, scroll fallback, and cleanup.
- `app/composables/useEditorialMotion`: application-wide route reveal behavior.
- `app/composables/useTheme`: application-wide theme state, persistence, and document metadata.
- `app/composables/usePrintResume`: deferred visitor print action retained until Change 10 replaces it with the final downloadable PDF.
