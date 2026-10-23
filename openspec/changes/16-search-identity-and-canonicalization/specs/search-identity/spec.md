## ADDED Requirements

### Requirement: Production exposes one canonical origin and path form
The portfolio MUST use `https://www.caitlinhawley.com` as its sole production origin, MUST use `/resume/` as the canonical résumé path, and MUST resolve noncanonical production variants through permanent redirects that avoid unnecessary hops.

#### Scenario: Canonical production pages
- **WHEN** a client requests `https://www.caitlinhawley.com/` or `https://www.caitlinhawley.com/resume/`
- **THEN** the requested page returns `200`
- **AND** its canonical link references that same URL

#### Scenario: Noncanonical host or protocol
- **WHEN** a client requests a portfolio page over HTTP or on the apex host
- **THEN** the response permanently redirects to the equivalent HTTPS `www` URL
- **AND** the final URL follows the canonical trailing-slash policy

#### Scenario: Noncanonical résumé path
- **WHEN** a client requests `/resume` without a trailing slash on any production host variant
- **THEN** the response permanently redirects to `https://www.caitlinhawley.com/resume/`

### Requirement: Search metadata is route-specific and internally consistent
Each public route MUST server-render its approved unique title and description plus complete canonical, Open Graph, and Twitter metadata, and every absolute page URL within that metadata MUST resolve from the same typed environment and route definitions.

#### Scenario: Homepage metadata
- **WHEN** the generated homepage HTML is inspected before hydration
- **THEN** its title is `Caitlin Hawley — Frontend Developer & Design System Builder`
- **AND** its description is `Frontend developer in Franklin, Tennessee with 15+ years building accessible Vue, Nuxt, TypeScript, and design-system interfaces.`
- **AND** its canonical and social URLs identify the homepage on the active origin

#### Scenario: Résumé metadata
- **WHEN** the generated résumé HTML is inspected before hydration
- **THEN** its title is `Caitlin Hawley — Résumé`
- **AND** its description is `Explore Caitlin Hawley’s 15+ years of frontend experience across Vue, Nuxt, TypeScript, accessibility, and design systems.`
- **AND** its canonical and social URLs identify `/resume/` on the active origin

#### Scenario: Social metadata completeness
- **WHEN** either public route's generated head is inspected
- **THEN** it contains route-specific Open Graph title, description, URL, image, and `Caitlin Hawley` site name values
- **AND** it contains matching Twitter title, description, card, and image values

### Requirement: Preview deployments remain fetchable but non-indexable
Development HTML routes MUST server-render a `robots` meta directive containing `noindex` while remaining fetchable for social previews, and production routes MUST remain indexable.

#### Scenario: Development crawler request
- **WHEN** a crawler fetches a development deployment route
- **THEN** it can retrieve the route's HTML and complete social metadata
- **AND** the HTML contains a server-rendered `noindex` directive

#### Scenario: Production crawler request
- **WHEN** a crawler fetches a canonical production route
- **THEN** the HTML does not contain the development-only `noindex` directive
- **AND** the route is not disallowed by `robots.txt`

### Requirement: Public pages expose one factual structured identity
The generated site MUST expose valid server-rendered JSON-LD using a stable shared `Person` identity sourced only from approved portfolio data, a homepage `WebSite` entity, and a résumé `ProfilePage` entity that references the shared person.

#### Scenario: Homepage structured data
- **WHEN** the generated homepage HTML is inspected
- **THEN** it contains valid `WebSite` and `Person` JSON-LD entities
- **AND** their identifiers and URLs use the active origin

#### Scenario: Résumé structured data
- **WHEN** the generated résumé HTML is inspected
- **THEN** it contains a valid `ProfilePage` entity for the résumé canonical URL
- **AND** its `mainEntity` references the same stable `Person` identifier used by the homepage

#### Scenario: Public profile references
- **WHEN** the shared `Person` entity is inspected
- **THEN** its `sameAs` values are sourced from the typed LinkedIn, GitHub, and CodePen links
- **AND** it contains no inferred profile, credential, award, rating, testimonial, employer, or performance claim

### Requirement: Search discovery assets use canonical production data
The production sitemap MUST list only canonical indexable HTTPS `www` URLs that return `200` without redirects, and the document head MUST expose a crawlable raster favicon of at least 48 by 48 pixels in addition to any supported SVG favicon.

#### Scenario: Production sitemap
- **WHEN** the deployed sitemap is inspected
- **THEN** it lists only `https://www.caitlinhawley.com/` and `https://www.caitlinhawley.com/resume/`
- **AND** both URLs return `200` directly and are self-canonical
- **AND** no entry contains `priority`, `changefreq`, a legacy HTTP URL, or an untrustworthy `lastmod` value

#### Scenario: Search favicon
- **WHEN** a crawler inspects either public route's generated head
- **THEN** it finds a linked square raster favicon at a stable public URL
- **AND** the favicon is at least 48 by 48 pixels and returns successfully

### Requirement: Live deployment proves current search behavior
The production deployment MUST serve the current generated Nuxt portfolio rather than the legacy site, and automated smoke verification MUST distinguish those builds while checking canonicalization and search metadata on both public routes.

#### Scenario: Current build is deployed
- **WHEN** live smoke verification runs against production
- **THEN** `/` and `/resume/` contain their current route-specific titles, descriptions, canonical URLs, structured data, and favicon links
- **AND** `/resume/` does not reuse homepage metadata

#### Scenario: Canonical redirect matrix is verified
- **WHEN** live smoke verification requests HTTP, HTTPS, apex, `www`, and résumé slash variants
- **THEN** canonical URLs return `200`
- **AND** every noncanonical URL permanently redirects to the expected canonical URL

#### Scenario: Search-engine follow-up
- **WHEN** the production deployment and live smoke verification succeed
- **THEN** sitemap submission and URL inspection for `/` and `/resume/` are documented as manual Google Search Console steps
- **AND** no ranking or recrawl-timing outcome is asserted
