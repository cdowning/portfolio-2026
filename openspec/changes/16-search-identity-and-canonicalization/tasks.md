# Search identity and canonicalization plan

**Status:** In progress. Tasks 1–2 are complete; Task 3 has not started.

## Task 1: Centralize search identity and route facts

- [x] Define the production origin, environment origin, canonical path policy, site name, and indexability rules in one typed SEO source.
- [x] Define typed canonical route records for `/` and `/resume/` and reuse them across head metadata, structured data, sitemap generation, and tests.
- [x] Update the approved homepage and résumé descriptions without duplicating their values across components.
- [x] Keep canonical URL construction server-safe and deterministic during static generation.
- [x] Add focused unit coverage for production, development, local, and trailing-slash URL resolution.

## Task 2: Complete route metadata

- [x] Preserve the approved homepage and résumé titles and apply the approved route-specific descriptions.
- [x] Add `og:site_name` and explicit route-specific Open Graph title, description, URL, and image metadata.
- [x] Add matching Twitter title, description, card, and image metadata.
- [x] Confirm all absolute metadata URLs use the active environment origin and the canonical path policy.
- [x] Verify metadata is present in generated HTML before client hydration.

## Task 3: Add structured search identity

- [ ] Define a shared factual `Person` entity with a stable canonical `@id`.
- [ ] Source `sameAs` only from the typed LinkedIn, GitHub, and CodePen profile links.
- [ ] Add homepage `WebSite` JSON-LD and associate it with the shared person identity.
- [ ] Add résumé `ProfilePage` JSON-LD whose `mainEntity` references the same person identity.
- [ ] Ensure portraits, page URLs, entity IDs, and other structured-data URLs are absolute and environment-aware.
- [ ] Add unit and generated-HTML tests for valid JSON serialization, required entity shapes, stable IDs, and absence of invented claims.
- [ ] Validate production-shaped output with a structured-data validator before deployment.

## Task 4: Protect preview environments from indexing

- [ ] Server-render a `robots` meta directive containing `noindex` on every development HTML route.
- [ ] Keep development pages fetchable and preserve their complete Open Graph and Twitter preview metadata.
- [ ] Ensure production routes do not inherit preview-only `noindex` behavior.
- [ ] Keep Storybook and other preview surfaces out of the production sitemap and search surface.
- [ ] Extend deployment tests to prove the development and production indexing policies differ as intended.

## Task 5: Align canonical URLs and redirects

- [ ] Change canonical résumé metadata, internal navigation, social URLs, and tests to the trailing-slash URL `/resume/`.
- [ ] Configure permanent HTTP-to-HTTPS and apex-to-`www` redirects.
- [ ] Configure `/resume` and every noncanonical résumé variant to redirect permanently to `https://www.caitlinhawley.com/resume/`.
- [ ] Prefer a single redirect hop for every noncanonical URL; document any hosting limitation that prevents it.
- [ ] Record repository-owned redirect configuration or the exact external host configuration needed to reproduce it.
- [ ] Add a redirect-matrix smoke test covering HTTP, HTTPS, apex, `www`, and résumé slash variants.

## Task 6: Correct favicon and sitemap output

- [ ] Export a square PNG or ICO favicon of at least 48 by 48 pixels from the approved mark.
- [ ] Add an Apple touch icon if the same approved source supports it without redesign.
- [ ] Link raster and SVG favicon formats from the server-rendered document head.
- [ ] Build or update the sitemap from the canonical route records so it contains only production HTTPS `www` URLs.
- [ ] Remove legacy HTTP URLs, `priority`, and `changefreq` values.
- [ ] Include `lastmod` only if a trustworthy source can maintain it accurately.
- [ ] Test that every sitemap URL is canonical, indexable, returns `200`, and does not redirect.

## Task 7: Deploy the current Nuxt portfolio

- [ ] Run typecheck, lint, focused unit and browser tests, and Nuxt static generation.
- [ ] Confirm the generated homepage and résumé contain their route-specific metadata, structured data, favicon links, and correct indexing directives.
- [ ] Deploy the current generated Nuxt output to `https://www.caitlinhawley.com`.
- [ ] Apply or verify the production redirect rules at the hosting layer.
- [ ] Confirm the legacy 2024 site and stale résumé metadata are no longer served from production.

## Task 8: Verify live search behavior and stop

- [ ] Run a production smoke check that verifies the canonical redirect matrix and both canonical pages.
- [ ] Verify live titles, descriptions, canonical links, Open Graph and Twitter metadata, structured data, favicon assets, and production indexability.
- [ ] Verify the live sitemap contains only canonical URLs that return `200` directly.
- [ ] Verify the development deployment still returns complete preview metadata while emitting `noindex`.
- [ ] Submit the production sitemap in Google Search Console.
- [ ] Inspect and request recrawling for `/` and `/resume/`, recording any indexing or selected-canonical warnings for follow-up.
- [ ] Confirm no page layout, visible hierarchy, accessibility behavior, analytics behavior, or unrelated route changed.
