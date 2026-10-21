## ADDED Requirements

### Requirement: Approved primitive colors use ordered family scales
The system SHALL expose the 31 currently rendered portfolio colors as `--color-<family>-<step>` custom properties in the `paper`, `ink`, `teal`, `blush`, and `gold` families. Steps SHALL use the ordinal `00–100` convention with `00` as the lightest approved color and `100` as the darkest; sparse steps SHALL remain valid and SHALL NOT imply literal OKLCH lightness percentages.

#### Scenario: Primitive inventory is exact
- **WHEN** the implemented primitive custom properties are inspected
- **THEN** they contain exactly the approved paper, ink, teal, blush, and gold values recorded by this change
- **AND** each family's step order proceeds from lighter to darker by measured OKLCH lightness

#### Scenario: Sparse scale remains extensible
- **WHEN** a family has no approved color at an ordinal step
- **THEN** that step remains undefined rather than receiving an interpolated or speculative token

### Requirement: Semantic roles resolve through approved primitives
Light and dark theme semantic custom properties MUST resolve through approved primitive tokens while preserving their current computed color values, system-preference behavior, explicit theme overrides, accessibility contrast, and print isolation. Components MUST continue to consume semantic roles except for approved authored swatches and decorative drafting details.

#### Scenario: Light theme mapping is preserved
- **WHEN** the portfolio renders with the explicit light theme
- **THEN** every semantic surface, text, rule, action, support, focus, selection, and footer role computes to its pre-change hex value

#### Scenario: Dark theme mapping is preserved
- **WHEN** the portfolio renders with the explicit dark theme
- **THEN** every semantic surface, text, rule, action, support, focus, selection, and footer role computes to its pre-change hex value

#### Scenario: System theme mapping is preserved
- **WHEN** no explicit theme override exists
- **THEN** the same approved light or dark semantic mapping follows the operating-system preference before first paint

#### Scenario: Primitive use remains bounded
- **WHEN** production component styles are inspected
- **THEN** general interface styling consumes semantic tokens
- **AND** direct primitive references occur only in approved swatches or authored decorative details

### Requirement: Global CSS has explicit ownership boundaries
Global styles MUST remain plain CSS and MUST be separated into `fonts.css` for `@font-face` declarations, `variables.css` for primitive and semantic color tokens plus global typography, layout, and motion custom properties, and `main.css` for ordered imports, layer declaration, reset, base, component, and utility rules.

#### Scenario: Stylesheet responsibilities are separated
- **WHEN** files under `app/assets/css` are inspected
- **THEN** font sources occur only in `fonts.css`
- **AND** global custom-property definitions occur in `variables.css`
- **AND** reset, base, component, and utility selectors occur in `main.css`

#### Scenario: Existing entry point remains stable
- **WHEN** Nuxt and Storybook load `app/assets/css/main.css`
- **THEN** fonts, variables, and global rules are available in the intended cascade-layer order without a second application entry point

#### Scenario: No Sass dependency is introduced
- **WHEN** project dependencies and stylesheet extensions are inspected
- **THEN** no Sass implementation or SCSS source file has been added for this separation

### Requirement: Palette extension follows the approved review sequence
`DESIGN.md` MUST define the Palette Extension Rule in this order: use an existing semantic role, otherwise use an approved primitive step, otherwise derive a candidate from the closest family using OKLCH, then contrast-test and visually review it before promoting it into CSS, `DESIGN.md`, and Storybook. Generated Impeccable ramps MUST remain exploratory until that promotion is approved.

#### Scenario: Existing token satisfies a new design need
- **WHEN** a future design need matches an existing semantic role or approved primitive step
- **THEN** the existing token is reused instead of adding another color

#### Scenario: New step is proposed
- **WHEN** no approved token provides the required role and lightness
- **THEN** the candidate begins from the closest approved family in OKLCH
- **AND** promotion occurs only after adjacent-color, foreground/background contrast, and visual review pass

#### Scenario: Generated ramp is not automatically public
- **WHEN** `.impeccable/design.json` or another design tool contains a generated tonal ramp
- **THEN** those values are not implemented or documented as approved tokens without the full promotion sequence

### Requirement: Storybook documents implemented color foundations
Storybook MUST discover an MDX color-foundation page that uses the official `ColorPalette` and `ColorItem` doc blocks to present every approved primitive family and separate light and dark semantic-role mappings. Documentation MUST identify primitive steps as ordinal names and MUST explain that hex is canonical while OKLCH guides ordering and extension.

#### Scenario: Primitive palettes are complete
- **WHEN** the color-foundation documentation renders
- **THEN** Paper, Ink, Teal, Blush, and Gold palettes show every implemented token name and exact hex value

#### Scenario: Semantic roles are distinct from primitives
- **WHEN** a reader inspects the color-foundation documentation
- **THEN** light and dark semantic mappings appear separately from primitive families
- **AND** the page states that components normally consume semantic roles

#### Scenario: Documentation uses supported Storybook blocks
- **WHEN** Storybook builds the color-foundation page
- **THEN** `ColorPalette` contains only supported `ColorItem` children imported from `@storybook/addon-docs/blocks`
- **AND** the static Storybook build exits successfully

### Requirement: First-pass migration excludes unimplemented colors and visual drift
The first-pass migration MUST NOT add `#ddb6b0`, `#c5974d`, `#f8e8e5`, `#fff1d7`, `#342726`, or `#3d3020` to the public implemented scale, MUST NOT manually modify `.impeccable/design.json`, and MUST preserve the current rendered appearance of both routes and Storybook stories.

#### Scenario: Excluded colors remain design candidates
- **WHEN** the implemented primitive inventory and Storybook palette are inspected
- **THEN** none of the six excluded values appears as an approved primitive token

#### Scenario: Generated design metadata remains untouched
- **WHEN** the change diff is reviewed
- **THEN** `.impeccable/design.json` has no manual modification

#### Scenario: Visual output remains stable
- **WHEN** representative light and dark views of `/`, `/resume`, and existing Storybook stories are compared before and after migration
- **THEN** color, typography, spacing, layout, motion, content, and print behavior show no intentional design change
