# Storybook documentation and development deployment

Publish the rebuilt portfolio Storybook with presentation-ready documentation and include it in the existing development deployment at `https://dev.caitlinhawley.com/storybook/` without creating another subdomain.

## Current state

- The development workflow generates the Nuxt site and uploads `.output/public`, but it does not build or upload Storybook.
- `https://dev.caitlinhawley.com/storybook/` currently returns 404.
- The current Storybook static build works when hosted from a nested `/storybook/` directory; its manager, iframe, story index, story modules, styles, and fonts resolve beneath that path.
- The rebuilt Storybook contains 19 stories across seven story families but generates no `Docs` entries.
- The existing production Storybook contains 15 documentation pages and 22 stories, including standalone color and typography guidance and Autodocs pages for its components.
- The rebuilt portfolio links to `https://storybook.caitlinhawley.com/` as its public component-library destination.

## Confirmed direction

- Use `https://dev.caitlinhawley.com/storybook/` for the development Storybook rather than provisioning a development Storybook subdomain.
- Keep `https://storybook.caitlinhawley.com/` as the production component-library destination.
- Build Storybook after Nuxt generation and place its static output inside `.output/public/storybook/` before the existing upload step.
- Use the trailing-slash form `/storybook/` for the development URL so relative Storybook assets resolve consistently.
- Make the portfolio's component-library destination environment-aware: development points to `/storybook/`; production continues to point to the production Storybook subdomain.
- Treat Storybook as a public portfolio artifact for frontend roles, not only as an internal component test harness.

## Dependency

- Complete `15-shared-ctimeline-component` before finalizing documentation coverage so the shared `CTimeline` primitive appears in the rebuilt public Storybook.

## Documentation standard

Documentation parity means that every current public story family has a useful documentation entry. It does not require copying obsolete production components or matching the legacy page count.

- Add an overview page that explains the implemented design system, its relationship to the portfolio, and how to navigate the library.
- Add foundation guidance for the implemented color tokens and typography system, including light and dark behavior where relevant.
- Generate or author documentation for each public story family: Typography, Toolkit, Footer, Button, Section Marker, Timeline, Tag, Fabric Swatches, and Theme Toggle.
- Add a documented Site Header story because it is a reusable public navigation component that is currently absent from Storybook.
- Give each component or section a concise purpose, usage guidance, supported variants or states, relevant props and slots, and accessibility, responsive, theme, or motion notes where applicable.
- Keep interactive controls and source examples useful and accurate; hide controls that are not meaningful to consumers.
- Present intentional states rather than test-only artifacts. Preserve regression coverage, but rename or separate stories whose current presentation is confusing to a public viewer.
- Document only the design system and components already implemented in the public portfolio. Do not publish unreleased design explorations or private design ideas.

## Deployment and routing requirements

- Run Nuxt generation before the Storybook build so the Storybook output is not removed when `.output/public` is regenerated.
- Emit the Storybook build directly to `.output/public/storybook/` or copy an equivalent verified static build there before upload.
- Keep every Storybook-owned asset request under `/storybook/`, including the manager, preview iframe, story index, JavaScript, CSS, fonts, and images.
- Do not change the existing development hostname, DNS, TLS configuration, SFTP destination, or deployment credentials.
- Do not add analytics to Storybook or send development Storybook activity to the production GA4 property.

## Boundaries

- Do not migrate the legacy production Storybook's obsolete Avatar, Input, Modal, Navigation, form, or progress components into the rebuilt portfolio merely to reach documentation parity.
- Do not replace the production Storybook subdomain as part of this change.
- Do not add a separate development subdomain.
- Do not publish speculative or unimplemented design-system guidance.
- Do not redesign portfolio components while documenting them; small story-only presentation improvements are allowed when they clarify existing behavior.
- Do not implement the deferred footer flight animation.

## Acceptance

- `https://dev.caitlinhawley.com/storybook/` loads the rebuilt Storybook after the development deployment completes.
- A direct request to a representative Storybook manager asset, preview iframe, story module, and font succeeds beneath `/storybook/`.
- The development portfolio's component-library link opens its deployed `/storybook/` build, while the production link remains `https://storybook.caitlinhawley.com/`.
- The Storybook sidebar provides an overview, color and typography foundations, and documentation for every current public story family, including `CTimeline`, plus Site Header.
- Documentation covers purpose, usage, supported states, API where applicable, and relevant accessibility and responsive behavior without exposing private design explorations.
- Interactive stories remain functional in light and dark contexts where supported, at narrow and desktop widths where layout changes, and with reduced motion where animation exists.
- The static Storybook build, Nuxt generation, typecheck, lint, focused tests, and a nested-path browser check pass before completion.
