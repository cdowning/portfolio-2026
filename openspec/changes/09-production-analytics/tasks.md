# Production analytics continuity plan

**Status:** Final launch-stage work. Exploration and account verification remain open.

## Task 1: Verify the existing GA4 property

- [ ] Sign in to Google Analytics and confirm ownership/access for measurement ID `G-CRTHWFY5XP`.
- [ ] Confirm the property contains the expected `caitlinhawley.com` history.
- [ ] Confirm the web stream URL and production domain settings.
- [ ] Confirm Enhanced Measurement includes page changes based on browser history events.
- [ ] Review event-level data retention and internal/developer traffic filters.

## Task 2: Decide privacy behavior

- [ ] Decide whether analytics loads automatically, uses Consent Mode, or waits for explicit consent.
- [ ] Document the decision and any visitor-facing privacy/preferences UI.
- [ ] Confirm no personal data or contact content is included in event parameters.

## Task 3: Isolate production tracking

- [ ] Remove the hard-coded production measurement ID fallback from application configuration.
- [ ] Supply the GA4 ID only in the production deployment environment.
- [ ] Ensure local, test, Storybook, preview, and `dev.caitlinhawley.com` builds do not initialize the production tag.
- [ ] Add a verification check that generated development output contains no production measurement ID.

## Task 4: Add the minimal event model

- [ ] Preserve automatic page views for `/` and `/resume`.
- [ ] Add only approved contact, outbound project, and résumé events.
- [ ] Centralize event names and parameters to prevent naming drift.
- [ ] Document each event's question, trigger, and parameters.

## Task 5: Launch verification

- [ ] Validate the production tag with Tag Assistant and GA4 DebugView before public launch.
- [ ] Confirm one initial page view and Nuxt route changes without duplicates.
- [ ] Confirm approved events fire once with expected parameters.
- [ ] Confirm development and Storybook traffic remain absent from the production property.
- [ ] Annotate the launch date in reporting notes or the project record so redesign-related trend changes have context.
