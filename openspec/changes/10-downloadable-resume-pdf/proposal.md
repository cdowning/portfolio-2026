# Downloadable résumé PDF

Replace the visitor-facing browser print workflow with a direct résumé PDF download after all other launch work is complete.

## Confirmed direction

- This is the final implementation change, after production analytics.
- The user will provide the approved final PDF asset at implementation time.
- Publish the asset at the stable public path `/caitlin-hawley-resume.pdf`.
- Rename the visible `Print résumé` action to `Download résumé`.
- Remove the adjacent `Cmd + P` instruction.
- Link directly to the supplied PDF; do not invoke `window.print()` from the visible interface.
- Keep the hidden two-page `ResumePrint` composition and print styles as the maintainable source for future PDF revisions.
- Keep the web résumé route at `/resume` and the homepage `View full resume` action unchanged.

## Download behavior

- The résumé action is a semantic link rather than a JavaScript button.
- The link targets the same-origin PDF asset and requests download behavior where the browser supports it.
- The PDF remains available through its stable URL if a browser chooses to display it instead.
- The action remains keyboard accessible and uses the established button component styling.

## Asset requirements

- Valid PDF with exactly two US Letter pages.
- Matches the approved résumé content and visual hierarchy at the time of launch.
- Contains selectable text and working links where supported by the supplied asset.
- Uses a descriptive filename and document title.
- Ships with the statically generated site and returns the correct PDF content type in production.

## Analytics dependency

- Production analytics must be complete before this change.
- Emit the approved résumé download event once per activation without including personal data.
- Local, preview, test, and Storybook environments must not send the production event.

## Boundaries

- Do not remove the hidden `ResumePrint` source composition or its two-page regression coverage.
- Do not redesign the web résumé.
- Do not change the `/resume` route, homepage résumé destination, or résumé content outside corrections required to match the supplied PDF.
- Do not implement or fabricate a placeholder PDF before the final asset is supplied.

## Acceptance

- The visible résumé action reads `Download résumé`, links to `/caitlin-hawley-resume.pdf`, and no longer presents `Cmd + P`.
- The link works with keyboard and pointer input at supported responsive widths.
- The supplied asset is present in generated output, returns as a PDF, and remains exactly two US Letter pages.
- The hidden print source continues to render as two Letter pages.
- The approved analytics event fires once in production and nowhere else.
