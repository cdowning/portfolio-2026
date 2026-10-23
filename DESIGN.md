---
name: Caitlin Hawley Portfolio
description: A precise, tactile, and quietly joyful portfolio where frontend engineering and design judgment share one pattern table.
colors:
  paper-00: "#fffdfa"
  paper-10: "#fdfbf9"
  paper-20: "#fffaf5"
  paper-30: "#fbf6f1"
  paper-40: "#f5f0ea"
  paper-50: "#f5efea"
  paper-70: "#ded5cb"
  paper-90: "#b9aea2"
  paper-100: "#b6ada4"
  ink-00: "#938b83"
  ink-10: "#827970"
  ink-20: "#6f6861"
  ink-30: "#6b6259"
  ink-40: "#3f3934"
  ink-50: "#2d2925"
  ink-60: "#252422"
  ink-70: "#24211e"
  ink-80: "#1c1a18"
  ink-90: "#151412"
  ink-100: "#0f0e0e"
  teal-00: "#e7efed"
  teal-30: "#b1d0c8"
  teal-40: "#94b8ae"
  teal-50: "#84a59d"
  teal-70: "#5c736e"
  teal-100: "#26312e"
  blush-30: "#f5cac3"
  blush-50: "#dca7a2"
  blush-60: "#c79591"
  gold-30: "#ffd17d"
  gold-40: "#f6bd60"
typography:
  page-title:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(3.583rem, 5.25vw, 6.192rem)"
    fontWeight: "700"
    lineHeight: "0.91"
    letterSpacing: "-0.045em"
  section-title:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2.074rem, 2.4vw, 2.986rem)"
    fontWeight: "700"
    lineHeight: "1"
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.35"
  body-large:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "1.2rem"
    fontWeight: "400"
    lineHeight: "1.45"
  label:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "0.75rem"
    fontWeight: "600"
    lineHeight: "1.5"
    letterSpacing: "0.3em"
  note:
    fontFamily: "Dawning of a New Day, cursive"
    fontSize: "1.2rem"
    fontWeight: "400"
    lineHeight: "1"
spacing:
  page-gutter: "clamp(1.25rem, 4vw, 4rem)"
  section-gap: "clamp(3rem, 7vw, 7rem)"
components:
  primary-button:
    backgroundColor: "{colors.gold-40}"
    textColor: "{colors.ink-100}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "0 1.4rem"
    height: "3.5rem"
  dark-primary-button:
    backgroundColor: "{colors.blush-60}"
    textColor: "{colors.ink-90}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "0 1.4rem"
    height: "3.5rem"
  soft-tag:
    backgroundColor: "{colors.teal-00}"
    textColor: "{colors.ink-60}"
    typography: "{typography.label}"
    rounded: "0"
    padding: "0.35rem 0.55rem"
---

# Design System: Caitlin Hawley Portfolio

## Overview

**Creative North Star: "The Pattern Table"**

**The Pattern Table** presents frontend development and visual design as one act of careful construction. Its North Star is precise, tactile, and quietly joyful: measured rules, drafting arcs, clipped photography, numbered annotations, restrained fabric swatches, and flat ruled sheets make the work feel considered without becoming precious.

The portfolio is an experience rather than a résumé template. The homepage leads with Caitlin’s point of view and proof; the résumé turns the same language into a denser reading and print surface. Both should communicate thoughtful frontend engineering, strong user-experience judgment, and care for the people using the interface.

The system is measured, tactile, direct, and accessible by default. Avoid generic SaaS cards, excessive rounding, glass effects, gradient-heavy styling, and decorative complexity that weakens hierarchy or readability.

**Key Characteristics:**

- Warm paper and charcoal themes with restrained gold, blush, and teal accents.
- Editorial grids, fine rules, measurements, contextual numbering, and material samples.
- Square, direct controls with visible focus treatment and generous touch targets.
- Motion that assembles, draws, or connects rather than merely decorates.

Approved visual references:

- Homepage: `references/caitlin-hawley-full-homepage-exploration.png`
- Résumé: `references/resume-final-direction.png`

## Colors

Color tokens in the frontmatter are normative. The implemented palette contains only colors rendered by the current portfolio. Each family uses sparse ordinal steps from `00` (lightest approved member) to `100` (darkest approved member); the numbers communicate order, not literal OKLCH lightness. Open positions remain undefined until a real use is approved.

Hex values are canonical in CSS and documentation for exact rendering parity and familiar browser tooling. Measured OKLCH lightness orders each family, and OKLCH is the design instrument for shaping future candidates because its lightness and chroma adjustments are more perceptually predictable.

| Family | Approved steps, light → dark |
|---|---|
| Paper | `paper-00 #fffdfa`, `paper-10 #fdfbf9`, `paper-20 #fffaf5`, `paper-30 #fbf6f1`, `paper-40 #f5f0ea`, `paper-50 #f5efea`, `paper-70 #ded5cb`, `paper-90 #b9aea2`, `paper-100 #b6ada4` |
| Ink | `ink-00 #938b83`, `ink-10 #827970`, `ink-20 #6f6861`, `ink-30 #6b6259`, `ink-40 #3f3934`, `ink-50 #2d2925`, `ink-60 #252422`, `ink-70 #24211e`, `ink-80 #1c1a18`, `ink-90 #151412`, `ink-100 #0f0e0e` |
| Teal | `teal-00 #e7efed`, `teal-30 #b1d0c8`, `teal-40 #94b8ae`, `teal-50 #84a59d`, `teal-70 #5c736e`, `teal-100 #26312e` |
| Blush | `blush-30 #f5cac3`, `blush-50 #dca7a2`, `blush-60 #c79591` |
| Gold | `gold-30 #ffd17d`, `gold-40 #f6bd60` |

Components consume semantic roles—canvas, surface, text, rule, action, focus, selection, and footer contrast—rather than reaching for palette primitives. Palette primitives remain appropriate only for approved authored swatches and drafting details.

| Semantic role | Light | Dark |
|---|---|---|
| Canvas | `paper-10` | `ink-90` |
| Surface | `paper-30` | `ink-80` |
| Raised surface | `paper-00` | `ink-70` |
| Muted surface | `paper-50` | `ink-50` |
| Strong text | `ink-100` | `paper-20` |
| Primary text | `ink-60` | `paper-40` |
| Secondary text | `ink-20` | `paper-100` |
| Muted text | `ink-10` | `ink-00` |
| Rule / strong rule | `paper-70` / `paper-90` | `ink-40` / `ink-30` |
| Action / hover | `gold-40` / `gold-30` | `blush-60` / `blush-50` |
| On action | `ink-100` | `ink-90` |
| Support / highlight / wash | `teal-70` / `teal-50` / `teal-00` | `teal-40` / `teal-30` / `teal-100` |
| Footer / on footer | `gold-40` / `ink-100` | `blush-60` / `ink-90` |
| Footer action / on footer action | `ink-100` / `paper-00` | `ink-90` / `paper-20` |
| Focus ring | `teal-70` | `teal-40` |
| Selection / on selection | `gold-40` / `ink-100` | `blush-60` / `ink-90` |

**The Palette Extension Rule.** Resolve every new color need in this order:

1. Use an existing semantic role when its purpose fits.
2. Otherwise use an approved primitive step.
3. If the closest family lacks the needed lightness, shape a candidate from that family in OKLCH.
4. Test foreground/background and adjacent-color contrast, then visually review every relevant theme.
5. Promote an accepted value together into CSS, `DESIGN.md`, and Storybook.

Generated tonal ramps in `.impeccable/design.json` remain exploratory until they complete this sequence. The unused `#ddb6b0` and `#c5974d` declarations and design-only `#f8e8e5`, `#fff1d7`, `#342726`, and `#3d3020` values are not approved primitive tokens.

**The Semantic Role Rule.** Components consume semantic roles; palette primitives are reserved for authored swatches and drafting details.

**The Honest Scale Rule.** Numeric steps represent a perceptually ordered, contrast-reviewed family; they never imply unreviewed interpolation or literal OKLCH lightness.

Default text selection uses the semantic page selection roles. Footer selection reverses footer roles—`var(--on-footer)` behind `var(--footer)`—with measured contrast of `7.13:1` in dark mode and `11.35:1` in light mode.

## Typography

Poppins carries display and identity moments. Work Sans carries body copy, navigation, controls, and dense information. Dawning of a New Day, with `lindsey-signature` as an optional first choice, is reserved for brief handwritten notes.

The nominal browser base is `1rem`, normally `16px`; never force a root pixel size. Browser and visitor font-size preferences remain effective. Screen primitives follow a `1.2` minor-third ratio:

| Token | Value | Nominal size |
|---|---:|---:|
| `--text-xs` | `0.75rem` | `12px` |
| `--text-sm` | `0.833rem` | `13.33px` |
| `--text-base` | `1rem` | `16px` |
| `--text-md` | `1.2rem` | `19.2px` |
| `--text-lg` | `1.44rem` | `23.04px` |
| `--text-xl` | `1.728rem` | `27.65px` |
| `--text-2xl` | `2.074rem` | `33.18px` |
| `--text-3xl` | `2.488rem` | `39.81px` |
| `--text-4xl` | `2.986rem` | `47.78px` |
| `--text-5xl` | `3.583rem` | `57.33px` |
| `--text-6xl` | `4.3rem` | `68.8px` |
| `--text-7xl` | `5.16rem` | `82.56px` |
| `--text-8xl` | `6.192rem` | `99.07px` |
| `--text-9xl` | `7.43rem` | `118.88px` |

Semantic fluid roles use scale endpoints rather than unrelated intermediate values:

```css
--text-body: var(--text-base);
--text-body-large: var(--text-md);
--text-label: var(--text-sm);
--text-section-title: clamp(var(--text-2xl), 2.4vw, var(--text-4xl));
--text-page-title: clamp(var(--text-5xl), 5.25vw, var(--text-8xl));
```

Primary body copy uses `--text-base`; meaningful screen copy stays at or above `--text-sm`. Drafting labels stay at or above `--text-xs` unless decorative and hidden from assistive technology. Print retains an independent point-based scale so the résumé remains exactly two US Letter pages.

**The Readability Floor Rule.** Meaningful interface copy never drops below the established screen floor; smaller marks are decorative and hidden from assistive technology.

## Layout

The core composition is an asymmetrical editorial grid with fine full-width rules. Sections begin with contextual index numbers and construction labels. `--page-gutter` scales from `1.25rem` to `4rem`, content is capped at `100rem`, and the sticky header is `5.25rem` tall on wide screens.

Photography behaves like a material sample rather than a generic banner. It can be clipped, gridded, measured, and paired with construction marks, but it remains legible and respectful of the subject. Palette swatches appear as solid fabric samples with small pinked edges and unpatterned interiors.

The homepage Toolkit stays one continuous horizontal row on desktop, preserving the `05` marker, heading, construction rules, and shared ruled tags. Its order is frontend foundations, interface workflow, then AI-assisted development practices. Claude Code, Codex, and Spec-driven development are approved additions. Below `88rem` the list becomes three columns; below `42rem` it becomes two columns in DOM order. Do not restore the decorative `06 / Tools / People / Possibilities` rail. The grouped Build/Workflow matrix remains an exploration reference, not an implementation pattern.

Mobile becomes one deliberate reading column. Interactive controls retain at least a `2.75rem` target below `40rem`; decorative notes may move or disappear only when redundant. Print stays black on white and removes navigation, theme controls, paths, backgrounds, and nonessential decoration while preserving content and section rules.

## Elevation & Depth

The interface is mostly flat. Shadows appear only when a physical specimen seems lifted from the page. The work specimens use a restrained `0 1.25rem 2.5rem` shadow—12% graphite in light mode and 36% black in dark mode—while navigation, buttons, tags, sections, and footer remain unshadowed.

Depth otherwise comes from overlapping paper, clipped photography, ruled boundaries, grids, and contrast between surface roles. Do not add floating cards or ambient shadows simply to separate content.

Motion should draw rules, assemble material, or reveal relationships. The shared curve is `cubic-bezier(.16, 1, .3, 1)`, with `160ms` for immediate UI feedback, `360ms` for standard transitions, and `650ms` for drawn paths. Hover movement stays within `2–4px`. Respect `prefers-reduced-motion` by removing nonessential animation and transition.

**The Flat-by-Default Rule.** Shadows appear only when a physical specimen seems lifted from the page.

## Shapes

The default shape language is square, ruled, and architectural. Buttons, tags, content panels, and navigation cells have no radius. Circles are reserved for timeline nodes, measurement points, crosshairs, and small system indicators. Tiny radii up to `.15rem` may appear inside miniature interface specimens, where they describe the represented product rather than the portfolio shell.

Rules are generally `1px`. Dashed paths use rounded line caps and measured gaps. Fabric swatches use a pinked-edge mask with a small tooth rather than rounded corners. Decorative marks must reinforce construction, sequence, or relationship; they are not filler.

## Components

Components are measured, tactile, direct, and accessible by default.

- **Buttons:** square gold actions in light mode and blush actions in dark mode; footer buttons use the inverse ink treatment. Regular buttons are at least `3.5rem` tall and large buttons `4.2rem`. The arrow may move `.25rem` on hover.
- **Tags:** soft tags use a support wash; ruled tags use a strong left rule. Both expose CSS custom properties for deliberate parent-level composition.
- **Section markers:** contextual number plus vertical rule, using compact uppercase labels and generous tracking.
- **Site header:** sticky, nearly opaque against the canvas, with a measured underline for the active navigation state and a dedicated theme-control cell.
- **Theme toggle:** a `2.75rem` icon button with a visible focus state, an understated rotation on interaction, and no print output.
- **Fabric swatches:** stacked color samples with pinked edges. Animation is optional and must follow the shared motion and reduced-motion rules.
- **Contact footer:** a full-bleed action surface shared by the homepage and résumé, pairing a direct invitation with social links, brand lockup, and restrained line illustration.
- **Timeline:** `CTimeline` owns chronological list semantics, the connecting line, role markers, and current-state presentation. Homepage and résumé consumers supply their distinct row content through its typed slot contract.

### Component ownership

- `app/pages` is the URL map. Route SFCs own metadata and compose page sections directly; do not add pass-through view wrappers.
- `app/components/ui` contains only context-independent public primitives with typed contracts.
- `app/components/site` owns application-specific chrome shared across routes, including the header, theme control, and contact footer.
- `app/components/home` and `app/components/resume` own their route-specific sections and must not import one another.
- Component-specific DOM lifecycle behavior lives beside its owning component. Application-wide behavior remains in `app/composables`.
- Project-owned components use explicit imports. Nuxt component auto-discovery is disabled; framework and module components remain owned by their integrations.

Dependency direction remains one-way: routes compose home, résumé, and site components; those layers may consume UI primitives, content, types, utilities, and application-wide composables; UI primitives must not import page or site layers.

Vue single-file components keep `<style scoped>`. Project-owned classes use flat kebab-case rather than BEM. Base classes name the component (`.button`, `.hero`, `.navigation`); parts use readable prefixes (`.button-arrow`, `.hero-title`); variants pair with the base (`.button-large`, `.button-gold`); states remain explicit (`.navigation-open`, `.theme-dark`). Typed props generate explicit classes such as `button-${size}` and `button-${tone}`.

CSS does not use `data-*` attributes as its primary styling API. ARIA remains the source of accessibility state. Runtime DOM access uses Vue template refs. Browser tests prefer roles, names, and semantic structure. Parents avoid `:deep()` dependencies on child internals; prefer wrappers, props, variants, or documented CSS custom-property contracts.

Every interactive component needs a visible `2px` focus ring with `4px` offset, adequate target size, semantic HTML, and keyboard behavior equivalent to pointer behavior.

**The Accessible-by-Default Rule.** A component is incomplete until its focus, target size, semantics, keyboard behavior, and reduced-motion behavior are defined.

## Responsive Scale

The site is mobile-first. Narrow-screen composition is the base CSS; wider layouts are progressive enhancements using one shared scale:

- `sm`: `40rem` / `640px`
- `md`: `48rem` / `768px`
- `lg`: `64rem` / `1024px`
- `xl`: `80rem` / `1280px`
- `2xl`: `96rem` / `1536px`

Width-based media queries use these values with `min-width`. Do not introduce component-specific width breakpoints. Media features that solve a different constraint—viewport height, print, color preference, pointer capability, or reduced motion—remain independent of this scale.

## Do's and Don'ts

### Do

- Use measured rules, contextual numbering, and construction marks to establish sequence and hierarchy.
- Let content, typography, and carefully placed material samples carry the composition.
- Use semantic color roles and verify contrast in both themes.
- Preserve the same design language across the homepage, résumé, Storybook, and print output.
- Keep responsive adaptations intentional: simplify the construction without flattening the identity.
- Use motion to explain assembly, connection, or state change.

### Don't

- Do not turn sections into generic rounded SaaS cards.
- Do not introduce glass effects, heavy gradients, pill-shaped controls, or ambient shadow stacks.
- Do not use palette primitives where a semantic role exists.
- Do not shrink meaningful copy below the established readability floor.
- Do not hide information on mobile merely to preserve a desktop composition.
- Do not fabricate project outcomes, metrics, testimonials, or client proof.
- Do not publish private design explorations without an explicit decision to share them.
