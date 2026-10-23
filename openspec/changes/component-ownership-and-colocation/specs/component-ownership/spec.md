## ADDED Requirements

### Requirement: Route directory remains the URL map
The application MUST keep `app/pages` limited to Nuxt route entry points, and each route SFC MUST own route metadata and compose its page sections without a pass-through view wrapper.

#### Scenario: Homepage route composition
- **WHEN** Nuxt generates the route for `/`
- **THEN** `app/pages/index.vue` directly composes the approved homepage sections
- **AND** no nested homepage component is registered as an unintended route

#### Scenario: Résumé route composition
- **WHEN** Nuxt generates the route for `/resume`
- **THEN** `app/pages/resume.vue` directly composes the approved résumé sections
- **AND** no nested résumé component is registered as an unintended route

### Requirement: UI directory exposes context-independent primitives
`app/components/ui` MUST contain only approved context-independent public primitives with typed contracts and MUST NOT depend on home, résumé, or site component layers.

#### Scenario: Primitive dependency boundary
- **WHEN** project-owned imports under `app/components/ui` are inspected
- **THEN** no UI primitive imports from `app/components/home`, `app/components/resume`, or `app/components/site`

#### Scenario: Approved primitive inventory
- **WHEN** the UI component inventory is generated
- **THEN** it contains `CButton`, `CSectionMarker`, `CTag`, `CTimeline`, and `FabricSwatches`
- **AND** it does not contain `SiteHeader`, `SiteContactFooter`, or `ThemeToggle`

### Requirement: Site directory owns cross-route application chrome
`app/components/site` MUST own application-specific components shared across routes and their component-specific supporting files.

#### Scenario: Site chrome inventory
- **WHEN** the site component inventory is inspected
- **THEN** `SiteHeader`, `SiteContactFooter`, and `ThemeToggle` are present under `app/components/site`
- **AND** consumers import them explicitly

### Requirement: Page slices preserve feature ownership
Homepage-only components MUST remain under `app/components/home`, résumé-only components MUST remain under `app/components/resume`, and neither page slice MUST import the other.

#### Scenario: Independent page slices
- **WHEN** project-owned imports under both page slices are inspected
- **THEN** home components contain no résumé component imports
- **AND** résumé components contain no home component imports

### Requirement: Component-owned lifecycle behavior is colocated
Composables that exclusively implement one component's DOM lifecycle MUST live with that component, while application-wide state and behavior MUST remain in `app/composables`.

#### Scenario: Header behavior ownership
- **WHEN** `SiteHeader` source is inspected
- **THEN** `useActiveSection` and `useMobileNavigation` live beside the header and preserve listener cleanup

#### Scenario: Hero behavior ownership
- **WHEN** `HomeHero` source is inspected
- **THEN** `useHeroScrollMotion` lives beside the hero and preserves listener, media-query, animation-frame, and observer cleanup

#### Scenario: Application-wide composables
- **WHEN** global composable ownership is inspected
- **THEN** `useEditorialMotion` and `useTheme` remain in `app/composables` with unchanged public contracts

### Requirement: Project components use explicit imports
Nuxt MUST disable auto-discovery for project-owned components, and every UI, site, home, résumé, and foundation component MUST be explicitly imported by its consumers.

#### Scenario: Generated component types
- **WHEN** Nuxt prepares generated component types
- **THEN** no project-owned UI, site, home, résumé, or foundation component appears as a generated global registration
- **AND** Nuxt framework components and the Nuxt Icon `Icon` component continue to resolve through their owning framework or module integration
- **AND** no component collision warning is emitted

### Requirement: Structural migration preserves behavior
The ownership migration MUST preserve both public routes' content, hierarchy, semantics, responsive behavior, themes, motion, accessibility, print output, and static-generation contract.

#### Scenario: Release verification
- **WHEN** the ownership migration is complete
- **THEN** focused and full unit and browser tests pass
- **AND** typecheck, lint, Nuxt static generation, and Storybook build exit successfully
