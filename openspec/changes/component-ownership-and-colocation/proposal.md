## Why

Component ownership is obscured by `app/components/ui` mixing public primitives with application shell code, `app/components/shared` naming reuse without responsibility, and component-owned composables living in a global directory. A shallow ownership model will make routes, site chrome, page sections, and reusable primitives easier to find and change without adding a heavyweight feature architecture.

## What Changes

- Keep `app/pages` limited to Nuxt route entry points and retain both route SFCs as composition roots.
- Keep shallow `home` and `resume` component slices; do not introduce a top-level `features` directory or pass-through view wrappers.
- Restrict `app/components/ui` to context-independent public primitives.
- Add `app/components/site` for cross-route application chrome: `SiteHeader`, `SiteContactFooter`, and `ThemeToggle`.
- Colocate `useHeroScrollMotion`, `useActiveSection`, and `useMobileNavigation` with their owning components.
- Keep genuinely application-wide `useEditorialMotion` and `useTheme` composables global.
- Disable Nuxt auto-discovery for project-owned components and require explicit imports across UI, site, page, and foundation layers.
- Amend durable ownership guidance without changing rendered behavior.

## Capabilities

### New Capabilities

- `component-ownership`: Defines route, UI primitive, site chrome, page slice, composable colocation, dependency direction, and component discovery boundaries.

### Modified Capabilities

None.

## Impact

- Moves Vue SFCs, stories, and three component-owned composables; updates explicit imports and path-based tests.
- Updates `nuxt.config.ts`, `DESIGN.md`, `SPEC.md`, and affected OpenSpec path references.
- Preserves V1-V18, public routes, content, visual output, accessibility, themes, motion, print output, generated static output, and runtime dependencies.
