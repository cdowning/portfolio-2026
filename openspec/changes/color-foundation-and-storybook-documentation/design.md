## Context

The portfolio already has accessible light and dark semantic roles, but `app/assets/css/main.css` currently owns font loading, primitive aliases, theme maps, all global custom properties, reset, base, and utilities. Primitive names describe individual uses (`paper-deep`, `blush-light`) rather than positions in an extensible family, several semantic values remain raw hex declarations, and the current `DESIGN.md` palette includes six values that are not rendered by the site.

The approved first pass must preserve every rendered color exactly. It establishes the implemented palette from current production use rather than copying the previous portfolio's scale or automatically adopting generated ramps from `.impeccable/design.json`. Storybook 10.6 currently discovers only `*.stories.ts`; it does not discover MDX and does not declare `@storybook/addon-docs` directly.

## Goals / Non-Goals

**Goals:**

- Give all 31 rendered colors stable, ordered primitive names.
- Keep semantic roles as the normal component interface.
- Preserve exact computed colors and all light, dark, system, and print behavior.
- Separate fonts, global variables, and global rules by responsibility using plain CSS.
- Make the implemented palette and semantic mappings legible in Storybook.
- Record a disciplined path for future color additions in `DESIGN.md`.

**Non-Goals:**

- No visual redesign, hue adjustment, neutral consolidation, or generated interpolation.
- No Sass, Tailwind, color-mode library, or runtime dependency.
- No manual change to `.impeccable/design.json`.
- No adoption of unused colors solely because they appear in `DESIGN.md` or generated metadata.
- No broad Storybook documentation or deployment work owned by change 14.
- No change to route structure, component ownership, theme interaction, or print design.

## Decisions

### Use five sparse ordinal primitive families

Custom properties use `--color-<family>-<step>`. `00` is the lightest approved member and `100` is the darkest. Numbers express ordinal positions with intentional gaps; they are not literal OKLCH lightness values. Future approved colors can occupy open positions without renaming current tokens.

| Family | Token | Hex | Measured OKLCH L | Current role or use |
|---|---|---:|---:|---|
| Paper | `--color-paper-00` | `#fffdfa` | 99.5 | Light raised surface |
| Paper | `--color-paper-10` | `#fdfbf9` | 98.9 | Light canvas |
| Paper | `--color-paper-20` | `#fffaf5` | 98.8 | Dark strong text |
| Paper | `--color-paper-30` | `#fbf6f1` | 97.6 | Light surface |
| Paper | `--color-paper-40` | `#f5f0ea` | 95.7 | Dark primary text |
| Paper | `--color-paper-50` | `#f5efea` | 95.5 | Light muted surface |
| Paper | `--color-paper-70` | `#ded5cb` | 87.7 | Light fine rule |
| Paper | `--color-paper-90` | `#b9aea2` | 75.7 | Light strong rule |
| Paper | `--color-paper-100` | `#b6ada4` | 75.3 | Dark secondary text |
| Ink | `--color-ink-00` | `#938b83` | 64.1 | Dark muted text |
| Ink | `--color-ink-10` | `#827970` | 58.1 | Light muted text |
| Ink | `--color-ink-20` | `#6f6861` | 52.2 | Light secondary text |
| Ink | `--color-ink-30` | `#6b6259` | 50.2 | Dark strong rule |
| Ink | `--color-ink-40` | `#3f3934` | 34.9 | Dark fine rule |
| Ink | `--color-ink-50` | `#2d2925` | 28.4 | Dark muted surface |
| Ink | `--color-ink-60` | `#252422` | 26.1 | Light primary text |
| Ink | `--color-ink-70` | `#24211e` | 25.0 | Dark raised surface |
| Ink | `--color-ink-80` | `#1c1a18` | 21.9 | Dark surface |
| Ink | `--color-ink-90` | `#151412` | 19.2 | Dark canvas |
| Ink | `--color-ink-100` | `#0f0e0e` | 16.5 | Light strong text |
| Teal | `--color-teal-00` | `#e7efed` | 94.6 | Light support wash |
| Teal | `--color-teal-30` | `#b1d0c8` | 83.3 | Dark support highlight |
| Teal | `--color-teal-40` | `#94b8ae` | 75.3 | Dark support |
| Teal | `--color-teal-50` | `#84a59d` | 69.5 | Light support highlight |
| Teal | `--color-teal-70` | `#5c736e` | 53.5 | Light support |
| Teal | `--color-teal-100` | `#26312e` | 30.2 | Dark support wash |
| Blush | `--color-blush-30` | `#f5cac3` | 87.4 | Authored fabric swatch |
| Blush | `--color-blush-50` | `#dca7a2` | 77.6 | Dark action hover |
| Blush | `--color-blush-60` | `#c79591` | 71.6 | Dark action and footer |
| Gold | `--color-gold-30` | `#ffd17d` | 88.3 | Light action hover |
| Gold | `--color-gold-40` | `#f6bd60` | 83.2 | Light action and footer |

Alternative rejected: transplant the previous portfolio's `00–90` scale. Its values and density describe a different design and would make unused colors appear approved.

Alternative rejected: regenerate complete ramps. The current site does not need them, and interpolation would introduce speculative colors before use and contrast review.

### Keep hex canonical and use OKLCH as the design instrument

Hex remains the CSS and documentation source value in this pass, guaranteeing exact parity with the current rendering and keeping values familiar in browser tooling. Measured OKLCH lightness determines family order. Future candidates are shaped in OKLCH because lightness and chroma adjustments are more perceptually predictable, then reviewed and stored in the approved canonical form.

Alternative rejected: convert every current declaration to serialized OKLCH. Conversion and browser serialization can introduce rounding differences without improving the first-pass outcome.

### Map every semantic role through a primitive

Theme blocks retain their existing selectors and cascade behavior but replace raw colors and old palette aliases with the approved tokens.

| Semantic role | Light primitive | Dark primitive |
|---|---|---|
| Canvas | `paper-10` | `ink-90` |
| Surface | `paper-30` | `ink-80` |
| Raised surface | `paper-00` | `ink-70` |
| Muted surface | `paper-50` | `ink-50` |
| Strong text | `ink-100` | `paper-20` |
| Primary text | `ink-60` | `paper-40` |
| Secondary text | `ink-20` | `paper-100` |
| Muted text | `ink-10` | `ink-00` |
| Rule | `paper-70` | `ink-40` |
| Strong rule | `paper-90` | `ink-30` |
| Action | `gold-40` | `blush-60` |
| Action hover | `gold-30` | `blush-50` |
| On action | `ink-100` | `ink-90` |
| Support | `teal-70` | `teal-40` |
| Support highlight | `teal-50` | `teal-30` |
| Support wash | `teal-00` | `teal-100` |
| Footer | `gold-40` | `blush-60` |
| On footer | `ink-100` | `ink-90` |
| Footer action | `ink-100` | `ink-90` |
| On footer action | `paper-00` | `paper-20` |
| Focus ring | `teal-70` | `teal-40` |
| Selection | `gold-40` | `blush-60` |
| On selection | `ink-100` | `ink-90` |

The existing theme shadow recipes remain derived effects rather than opaque primitive colors. Black alpha channels used as CSS masks are implementation data, not visible palette entries. Old `--palette-*` and convenience color aliases are removed after all active references are migrated; semantic names remain stable.

### Split the CSS entry point without changing consumers

```text
app/assets/css/
├── fonts.css       # @font-face only
├── variables.css   # @layer tokens: primitives, semantic themes, type/layout/motion tokens
└── main.css        # layer order, imports, reset, base, components, utilities
```

`main.css` remains the only file imported by Nuxt and Storybook. It declares the global layer order before importing the supporting files so the token layer retains its intended position. Plain CSS keeps the current toolchain and avoids an unnecessary Sass dependency.

Alternative rejected: `_variables.scss` and `_fonts.scss`. The underscore convention and Sass compilation add tooling without a feature the current styles need.

### Make `DESIGN.md` the approval record

Update the normative color record and Colors section to contain only the implemented primitive scale and semantic theme map. Add the Palette Extension Rule:

1. Use an existing semantic role when its purpose fits.
2. Otherwise use an approved primitive step.
3. If the family lacks the needed lightness, derive a candidate from the closest family in OKLCH.
4. Test foreground/background and adjacent-color contrast, then visually review in both relevant themes.
5. Promote the accepted value together into CSS, `DESIGN.md`, and Storybook.

`.impeccable/design.json` remains unchanged in this change. Its ramps and the six excluded values—`#ddb6b0`, `#c5974d`, `#f8e8e5`, `#fff1d7`, `#342726`, and `#3d3020`—remain candidate material, not public tokens.

### Publish a focused Storybook foundation page

Add `app/components/foundations/Colors/Colors.mdx` and extend `.storybook/main.ts` discovery to include MDX. Add `@storybook/addon-docs` as a direct development dependency and configure it alongside the accessibility addon. The page imports `ColorPalette`, `ColorItem`, and metadata blocks from `@storybook/addon-docs/blocks`.

One `ColorPalette` documents the five primitive families through `ColorItem` entries. Separate palettes document light semantic roles and dark semantic roles so readers do not confuse a primitive name with a usage contract. Descriptive copy records the ordinal meaning, hex/OKLCH policy, Semantic Role Rule, and Palette Extension Rule.

Change 14 consumes this page when it assembles and deploys the broader public Storybook. It does not recreate or broaden the color foundation.

## Risks / Trade-offs

- [Renaming tokens can alter a computed value or leave an old alias active] → Assert the exact primitive inventory and semantic computed values; search for old aliases before completion.
- [Splitting CSS can change cascade-layer order] → Keep `main.css` as the entry point, declare layer order before imports, and compare computed styles in both themes.
- [Near-identical paper and ink steps appear redundant] → Preserve them in first pass because each is rendered and has an existing semantic role; consolidation requires a separately reviewed visual change.
- [MDX docs can drift from CSS] → Keep exact token/value assertions and build Storybook in verification; avoid documenting generated or unused values.
- [Direct Storybook docs import relies on an undeclared transitive package] → Add a version-compatible direct dev dependency rather than relying on pnpm hoisting.
- [Updating `DESIGN.md` while leaving generated metadata unchanged creates temporary divergence] → State the boundary explicitly; do not treat `.impeccable/design.json` as normative or regenerate it without a later explicit decision.
- [Concurrent component ownership work can move supporting paths] → Keep the foundation under the retained `components/foundations` category and reconcile paths after that change lands.

## Migration Plan

1. Record the approved scales, theme mappings, exclusions, and Palette Extension Rule in `DESIGN.md` and the durable implementation contract.
2. Add focused structural and computed-color tests that fail against the old primitive names and unsplit files.
3. Create `fonts.css` and `variables.css`; keep `main.css` as the shared entry point and migrate active references.
4. Add Storybook MDX discovery, the direct docs dependency, and the Colors foundation page.
5. Search for obsolete aliases and excluded values, then run focused theme, Storybook, unit, browser, type, lint, generate, and no-visual-drift checks.

Rollback is file-local: restore the former single `main.css`, previous token references, Storybook discovery, dependency metadata, and documentation together. No persisted user data or external service changes exist.

## Open Questions

None. Family names, step direction, exact first-pass values, CSS format, documentation placement, exclusion boundary, and future extension process were approved during exploration.
