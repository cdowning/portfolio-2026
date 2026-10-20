# Storybook documentation and development deployment plan

**Status:** Planned. Exploration confirmed that the current Storybook build supports nested-path hosting; implementation and public documentation remain open.

## Task 1: Record the public documentation contract

- [ ] Inventory every current Storybook story family and identify the reusable component or implemented design-system concept it represents.
- [ ] Record the production Storybook baseline: 15 documentation pages, 22 stories, standalone color and typography guidance, and component Autodocs.
- [ ] Define documentation parity by coverage and usefulness rather than by copying legacy components or matching the old page count.
- [ ] Identify test-oriented story names or presentation states that need a clearer public-facing counterpart.

## Task 2: Add Storybook documentation infrastructure

- [ ] Configure Storybook to discover documentation pages alongside component stories.
- [ ] Enable Autodocs for public component and section story families.
- [ ] Add an overview page describing the portfolio design system, navigation, and documentation scope.
- [ ] Add a color-foundation page based on implemented semantic tokens and their light and dark mappings.
- [ ] Extend the typography foundation with purpose, hierarchy, typeface roles, and usage guidance.
- [ ] Keep documentation configuration compatible with the existing Vue 3, Vite, and Storybook versions.

## Task 3: Document the current component library

- [ ] Document Toolkit and Footer as composed public sections, including responsive and theme behavior.
- [ ] Document Button, Section Marker, Timeline, Tag, Fabric Swatches, and Theme Toggle with purpose, usage, variants, meaningful controls, and accessibility notes.
- [ ] Complete change 15 first and include its shared `CTimeline` API, slot contract, current-state semantics, and geometry controls.
- [ ] Add Site Header stories and documentation covering navigation behavior, active context, theme control, keyboard use, and narrow layouts.
- [ ] Document props, slots, and source examples only where they accurately reflect the public component API.
- [ ] Separate or rename test-specific states so the public story hierarchy remains understandable while regression coverage is preserved.
- [ ] Confirm the documentation reveals only implemented public design decisions and no unreleased explorations.

## Task 4: Deploy Storybook beneath the development site

- [ ] Add a development build step after `pnpm generate` that writes Storybook to `.output/public/storybook/`.
- [ ] Preserve the existing SFTP upload of `.output/public` so the Nuxt site and nested Storybook deploy together.
- [ ] Make the component-library destination resolve to `/storybook/` in development and `https://storybook.caitlinhawley.com/` in production.
- [ ] Preserve the trailing slash for the nested development URL.
- [ ] Confirm Storybook initializes no production analytics.

## Task 5: Verify nested routing and documentation quality

- [ ] Build the combined development artifact from a clean output directory.
- [ ] Serve the combined artifact locally and load `/storybook/` in a browser.
- [ ] Verify the manager, preview iframe, story index, representative story module, styles, fonts, and images resolve beneath `/storybook/`.
- [ ] Verify direct navigation and refresh for a representative story and documentation page.
- [ ] Verify overview, color, typography, every current story family including `CTimeline`, and Site Header documentation appear in the sidebar.
- [ ] Exercise representative controls and inspect light, dark, narrow, desktop, keyboard, and reduced-motion behavior where applicable.
- [ ] Confirm the portfolio-to-Storybook link uses the correct destination in development and production builds.

## Task 6: Verify and stop

- [ ] Run focused unit and browser tests for environment-aware links and nested Storybook routing.
- [ ] Run typecheck, lint, Nuxt generation, and the Storybook static build.
- [ ] Deploy the development branch and verify `https://dev.caitlinhawley.com/storybook/` publicly.
- [ ] Confirm `https://storybook.caitlinhawley.com/` remains unchanged by this development deployment.
- [ ] Record completion only after the public development URL and documentation coverage pass review.
