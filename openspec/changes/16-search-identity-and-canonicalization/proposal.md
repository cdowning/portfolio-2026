# Search identity and canonicalization

Make the current Nuxt portfolio the authoritative public search result for Caitlin Hawley, eliminate duplicate-host ambiguity, and give search engines accurate page identity without changing the site's approved visual design.

## Current state

- The current Nuxt implementation already server-renders route-specific titles, descriptions, canonical links, Open Graph metadata, Twitter metadata, `robots.txt`, and a sitemap.
- The development deployment serves the current homepage and résumé metadata, but remains indexable even though it is a preview environment.
- The production `www` host still serves the previous site, including stale homepage metadata on `/resume/` and HTTP Open Graph URLs.
- The production sitemap contains legacy HTTP URLs and obsolete dates.
- The apex HTTPS host returns content instead of redirecting to the canonical `www` host, so crawlers can encounter equivalent pages on multiple origins.
- The site has no structured data describing the website, profile page, or person represented by the portfolio.
- The only favicon is SVG; add a raster fallback that satisfies current search-result favicon requirements.
- Existing page descriptions are accurate but too generic to distinguish the portfolio's location, seniority, framework experience, accessibility work, and design-system focus.

## Confirmed direction

- Treat `https://www.caitlinhawley.com` as the sole production origin.
- Use trailing slashes for directory-backed public routes, including the canonical résumé URL `https://www.caitlinhawley.com/resume/`.
- Redirect every noncanonical production URL permanently to its final canonical URL in one hop where hosting permits.
- Keep preview pages fetchable for link previews, but prevent the development deployment from entering search results with page-level `noindex` metadata.
- Describe the site with factual, server-rendered structured data derived from the same typed profile and route data used by the visible site.
- Keep search metadata centralized and environment-aware so canonical links, social URLs, structured data, the sitemap, and deployment checks cannot silently drift apart.

## Canonical URL and redirect contract

The production URL matrix must resolve as follows:

| Requested URL | Required result |
| --- | --- |
| `http://caitlinhawley.com/` | Permanent redirect to `https://www.caitlinhawley.com/` |
| `https://caitlinhawley.com/` | Permanent redirect to `https://www.caitlinhawley.com/` |
| `http://www.caitlinhawley.com/` | Permanent redirect to `https://www.caitlinhawley.com/` |
| `https://www.caitlinhawley.com/` | `200`, self-canonical |
| Any production variant of `/resume` | Permanent redirect to `https://www.caitlinhawley.com/resume/` unless already canonical |
| `https://www.caitlinhawley.com/resume/` | `200`, self-canonical |

- Canonical URLs, Open Graph URLs, structured-data URLs, internal navigation, and sitemap entries must use the same HTTPS `www` origin and trailing-slash policy.
- Sitemap URLs must return `200` directly and must not rely on redirects.
- Redirect behavior may be implemented in repository-owned hosting configuration or documented as an explicit host configuration step when the deployment platform owns it.
- Development and local builds must use their actual runtime origin for preview metadata; they must never claim the production URL while showing unreviewed content.

## Preview indexing contract

- The development deployment remains crawlable at the transport and `robots.txt` level so social services can fetch titles, descriptions, and preview images.
- Every development HTML route emits a server-rendered `robots` directive containing `noindex`.
- Do not use `robots.txt` to block the development site because blocked crawlers may be unable to observe the `noindex` directive or render social previews.
- Production routes remain indexable and must not inherit the development `noindex` directive.
- Storybook and other non-portfolio preview surfaces are not added to the public sitemap or production search surface.

## Page metadata contract

Use the following approved descriptions unless a later content change explicitly replaces them:

- Homepage: `Frontend developer in Franklin, Tennessee with 15+ years building accessible Vue, Nuxt, TypeScript, and design-system interfaces.`
- Résumé: `Explore Caitlin Hawley’s 15+ years of frontend experience across Vue, Nuxt, TypeScript, accessibility, and design systems.`

Preserve the current route titles:

- Homepage: `Caitlin Hawley — Frontend Developer & Design System Builder`
- Résumé: `Caitlin Hawley — Résumé`

For both routes:

- Server-render a unique title, description, canonical URL, Open Graph title, description, URL, image, and site name.
- Server-render matching Twitter title, description, card type, and image values.
- Use `Caitlin Hawley` as `og:site_name`.
- Keep the existing social-preview image unless a separately approved visual change replaces it.
- Do not add keyword meta tags, hidden search text, location claims beyond the approved profile data, or copy written primarily for crawlers.

## Structured-data contract

- Add one stable `Person` identity with an `@id` anchored to the canonical homepage.
- Populate the `Person` only from approved profile content: name, professional title, canonical URL, portrait, location, and typed public profile links.
- Use the existing LinkedIn, GitHub, and CodePen links as `sameAs` values; do not infer or scrape additional profiles.
- The homepage emits a `WebSite` entity with its canonical URL, site name, and a stable `@id`, plus the shared `Person` identity.
- The résumé emits a `ProfilePage` entity with its canonical URL, page name, and `mainEntity` referencing the shared `Person` identity.
- Structured data must be valid JSON-LD, appear in server-rendered HTML before hydration, and use environment-appropriate absolute URLs.
- Do not invent credentials, awards, employers, ratings, testimonials, or performance claims for structured data.

## Favicon and sitemap contract

- Keep the SVG favicon for supporting browsers and add a square raster favicon at a stable crawlable URL with dimensions of at least 48 by 48 pixels.
- Add an Apple touch icon when the same source artwork can produce it without changing the approved mark.
- Reference favicon assets from the server-rendered document head.
- Generate or maintain the production sitemap from the same canonical route definitions used by page metadata.
- Include only indexable canonical production pages.
- Omit `priority` and `changefreq` values.
- Include `lastmod` only when it is derived from a trustworthy content or deployment date; never publish a decorative or automatically changing date.

## Deployment and verification contract

- Deploy the generated Nuxt site to production so the public host no longer serves the legacy 2024 implementation.
- Add a live smoke check that distinguishes the current Nuxt build from the stale production site and verifies both public routes.
- The smoke check must verify status and redirect behavior, route-specific titles and descriptions, canonical and social URLs, production indexability, structured data, favicon availability, and sitemap URLs.
- Verify separately that the development deployment emits `noindex` while retaining complete link-preview metadata.
- After deployment, submit the production sitemap and inspect `/` and `/resume/` in Google Search Console as a documented manual follow-up.
- Search Console submission and recrawl requests are verification steps, not guarantees of indexing position or ranking.

## Boundaries

- Do not redesign page layouts, typography, colors, motion, navigation, or visible content hierarchy.
- Do not add new case-study, article, service, location, or landing-page routes in this change.
- Do not add analytics, tracking pixels, consent tooling, advertising metadata, or third-party SEO services.
- Do not index the development deployment, Storybook, build artifacts, or internal preview routes.
- Do not duplicate identity or route facts across untyped ad hoc constants when existing content data can own them.
- Do not weaken accessibility, performance, or social-preview behavior in pursuit of search metadata.
- Do not promise traffic, rankings, rich results, or a specific recrawl timeline.

## Acceptance

- Production serves the current Nuxt portfolio on `/` and `/resume/`, with distinct approved metadata for each route.
- HTTPS `www` is the sole production origin; HTTP, apex, and non-trailing-slash résumé variants permanently redirect to the correct canonical URL.
- Every production canonical URL, internal route link, Open Graph URL, structured-data URL, and sitemap entry follows the same origin and path policy.
- The development deployment remains fetchable but server-renders `noindex` on every HTML route; production remains indexable.
- The homepage contains valid `WebSite` and `Person` JSON-LD, and the résumé contains valid `ProfilePage` JSON-LD referencing the same person identity.
- Both routes use the approved descriptions, preserve their approved titles, and expose complete Open Graph and Twitter metadata.
- A raster favicon of at least 48 by 48 pixels is linked and publicly crawlable; the existing SVG may remain as an additional format.
- The production sitemap lists only canonical indexable URLs that return `200` without redirects and does not contain legacy HTTP URLs or misleading freshness values.
- Focused unit and browser coverage, typecheck, lint, static generation, development smoke checks, and production smoke checks pass before completion.
- Search Console sitemap submission and URL inspection are documented as post-deployment manual steps.
