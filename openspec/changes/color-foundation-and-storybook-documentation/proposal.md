## Why

The portfolio's semantic theme roles are implemented, but their source colors are inconsistently named, mixed with font declarations and global styles, and not documented as an approved system. Establishing an exact, perceptually ordered primitive scale now gives future design work a trustworthy palette without changing the current site's appearance.

## What Changes

- Add approved `paper`, `ink`, `teal`, `blush`, and `gold` primitive color families using sparse ordinal `00–100` steps, where `00` is lightest and `100` is darkest.
- Preserve all 31 colors currently rendered by the portfolio exactly; map existing light and dark semantic roles to the new primitive tokens without visual drift.
- Keep hex values canonical in CSS while recording measured OKLCH lightness as design rationale and using OKLCH for future scale extension.
- Split global CSS responsibilities into `fonts.css`, `variables.css`, and `main.css` without adding Sass or another styling dependency.
- Amend `DESIGN.md` with the approved scales, semantic mappings, and the Palette Extension Rule: semantic role → approved primitive step → OKLCH candidate → contrast and visual review → promotion into CSS, `DESIGN.md`, and Storybook.
- Add a Storybook color-foundation MDX page using `ColorPalette` and `ColorItem` to document primitive scales separately from light and dark semantic roles.
- Exclude unused or design-only values from the public implemented palette until a future approved use promotes them.
- Leave `.impeccable/design.json` unchanged; its generated ramps remain exploratory input rather than implemented tokens.

## Capabilities

### New Capabilities

- `color-foundation`: Defines approved primitive scales, semantic theme mappings, global stylesheet ownership, palette-extension governance, Storybook color documentation, and no-visual-drift verification.

### Modified Capabilities

None.

## Impact

- Affects `app/assets/css`, `DESIGN.md`, Storybook discovery/configuration, color foundation documentation, and focused color/theme tests.
- Coordinates with `component-ownership-and-colocation` for the final foundation component path.
- Supplies the completed color-foundation page consumed by `14-storybook-documentation-and-development-deployment`; that change continues to own broad documentation coverage and deployment.
- Adds no runtime dependency, route, content, component redesign, theme behavior change, or manual edit to `.impeccable/design.json`.
