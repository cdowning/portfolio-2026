# Downloadable résumé PDF implementation plan

**Status:** Final delivery-stage work. Blocked until the approved PDF is supplied.

**Dependency:** Complete `09-production-analytics` first.

## Task 1: Receive and validate the final asset

- [ ] Receive the approved résumé PDF from the user.
- [ ] Confirm the document is current, contains selectable text, and uses working links where supported.
- [ ] Verify exactly two US Letter pages with no clipping, overlap, missing glyphs, or unintended blank pages.
- [ ] Add the asset as `public/caitlin-hawley-resume.pdf` without fabricating a placeholder.

## Task 2: Replace the visible print workflow

- [ ] Change `Print résumé` to `Download résumé` in the résumé introduction.
- [ ] Replace the emitted print action with a semantic link to `/caitlin-hawley-resume.pdf`.
- [ ] Remove the `Cmd + P` instruction and unused visitor-facing print composable wiring.
- [ ] Preserve the established button styling, keyboard behavior, focus treatment, and responsive layout.
- [ ] Keep `ResumePrint` and its print styles as the maintainable two-page source composition.

## Task 3: Connect analytics

- [ ] Emit the approved résumé download event once when the link is activated.
- [ ] Use the centralized event name and parameter contract established by change 09.
- [ ] Confirm production-only initialization and no personal event parameters.

## Task 4: Verify and stop

- [ ] Assert the generated site serves `/caitlin-hawley-resume.pdf` as a PDF.
- [ ] Verify the visible link label, URL, keyboard activation, and responsive placement.
- [ ] Verify the supplied PDF and hidden print source are both exactly two US Letter pages.
- [ ] Run unit, browser, typecheck, lint, static generation, and relevant analytics checks.
- [ ] Inspect the final web résumé and downloaded PDF before launch.
