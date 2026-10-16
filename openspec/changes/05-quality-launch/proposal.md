# Quality and launch readiness

Audit accessibility, responsive behavior, print, integrity, performance, and static generation.

## Scope

- Add a dedicated 1200×630 social-preview image that represents the approved portfolio visual system.
- Emit absolute Open Graph and Twitter image URLs, plus image dimensions, MIME type, and descriptive alt text.
- Make canonical and Open Graph page URLs environment-aware so development output identifies `https://dev.caitlinhawley.com` and production output identifies `https://www.caitlinhawley.com`.
- Keep homepage and résumé metadata aligned with their page titles, descriptions, canonical destinations, and share-image treatment.
- Add generated-output or browser acceptance coverage that fails when required social metadata is absent, relative, or bound to the wrong deployment origin.
- Verify the deployed development response as a social crawler after release; account for external preview caches by requesting a fresh scrape where supported.
- Place the dark Lindsey Signature annotation at 2.25rem in the lower-right open space of the white hero copy panel, above the facts rule and away from the portrait, with responsive-safe placement when the hero stacks.
- Distinguish the current experience entry by filling its timeline marker while keeping past-position markers outlined.
- Move the “Good people build great things.” footer annotation slightly lower so it clears the dashed curve with comfortable separation.

## Non-goals

- Do not use the full hero portrait or an arbitrary screenshot as the share image without an intentional 1200×630 composition.
- Do not make development pages claim the production canonical URL while they are being reviewed and shared.
- Do not depend on client-side hydration to create metadata required by crawlers.
- Do not change page copy, visual hierarchy, public routes, or deployment providers as part of this correction.

## Acceptance

- Generated `/` and `/resume` HTML includes title, description, canonical, `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:image:width`, `og:image:height`, `og:image:type`, `og:image:alt`, `twitter:card`, and `twitter:image` metadata before hydration.
- `twitter:card` remains `summary_large_image`; its referenced image is a publicly reachable 1200×630 asset with an image content type and successful response.
- Every canonical, `og:url`, `og:image`, and `twitter:image` value is absolute and uses the build's configured site origin.
- Development output uses `https://dev.caitlinhawley.com`; production output uses `https://www.caitlinhawley.com`.
- Social metadata tests cover both deployment origins and fail for missing image tags, relative image paths, wrong dimensions, or cross-environment canonical URLs.
- A crawler-like request to the deployed development homepage returns `200`, permits crawling, and exposes the complete metadata set in server-rendered HTML.
- The handwritten annotation uses a 2.25rem rotated treatment with no backing surface or text shadow, stays fully inside the white copy panel above the facts rule, and remains in that panel when the hero stacks.
- The current position uses a filled timeline circle; every previous position retains an outlined circle.
- “Good people build great things.” sits below the dashed footer curve without touching it and remains inside the drawing area at supported desktop sizes.
- Existing accessibility, responsive, print, integrity, performance, and static-generation checks remain green.

Acceptance: all SPEC invariants plus criteria above.
