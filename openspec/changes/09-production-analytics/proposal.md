# Production analytics continuity

Preserve the existing `caitlinhawley.com` GA4 reporting history when the rebuilt portfolio replaces the current production site.

## Current state

- The previous Nuxt site uses GA4 measurement ID `G-CRTHWFY5XP` through `nuxt-gtag`.
- The rebuilt Nuxt site already uses the same GA4 measurement ID through `nuxt-gtag`.
- Reusing the same GA4 property and web data stream is the correct path for continuous reporting across the redesign.
- The repository cannot confirm account ownership, historical report availability, stream settings, or current production traffic. Those require verification in Google Analytics.
- The current rebuilt-site configuration does not explicitly limit analytics to the production hostname or production deployment.
- The development deployment generates a production build for `dev.caitlinhawley.com`, so a simple `NODE_ENV === 'production'` check would not prevent development traffic from entering the production property.

## Proposed direction

- Keep the existing GA4 property and measurement ID rather than creating a new property.
- Treat analytics as a final launch task after content, routes, metadata, and deployment behavior are stable.
- Load the production measurement ID only for the production deployment of `www.caitlinhawley.com`.
- Do not send local, Storybook, test, preview, or `dev.caitlinhawley.com` activity to the production property.
- Keep the measurement ID in deployment configuration instead of relying on a hard-coded production fallback.
- Use GA4 Enhanced Measurement for page changes based on browser history so Nuxt route transitions are recorded.
- Begin with essential portfolio measurement only. Avoid speculative custom events.

## Initial measurement scope

- Page views for `/` and `/resume`.
- Outbound project links.
- Résumé download intent through a stable `resume_download` event contract. Change 10 will consume this contract when the final PDF link is added.
- Contact CTA use.
- Optional social-profile link use only if it answers a real portfolio question.

Event names and parameters should be stable, descriptive, and free of personal data. Visual-only interactions, theme changes, scroll depth, and incidental hover behavior should not be tracked by default.

## Continuity caveats

- Continuity is available only if `G-CRTHWFY5XP` belongs to the existing GA4 property and its historical data is still present.
- Creating a new GA4 property would start a separate dataset. Reports can be copied between GA4 properties, but the original data does not move with them.
- Historical Universal Analytics data cannot be imported into GA4. Any surviving UA history would need to exist in a prior export rather than the current Analytics interface.
- GA4 event-level retention settings affect Explorations differently from standard aggregate reports. Verify the property's retention setting before launch.

## Privacy and consent decision

Before implementation, choose and document the site's analytics consent posture. The technical implementation must support the selected approach without silently collecting from development environments. If consent is required for the intended audience or jurisdictions, use Google Consent Mode or manual tag initialization and provide a clear preference control.

This proposal records a product and technical decision, not legal advice.

## Boundaries

- No new analytics vendor during this migration.
- No Google Tag Manager unless a concrete need appears.
- No advertising, remarketing, user-ID, fingerprinting, or collection of form/contact content.
- No tracking inside Storybook.
- No analytics implementation during exploration.
