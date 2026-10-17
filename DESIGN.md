# Design

## Direction

**The Pattern Table** presents frontend development and visual design as one act of careful construction: measured rules, drafting arcs, clipped photography, numbered annotations, restrained swatches, and flat ruled sheets.

## Mode

Experience. The homepage leads with Caitlin’s point of view and proof; the résumé turns the same language into a dense reading surface.

## Tokens

- Light surfaces: canvas `#fdfbf9`, surface `#fbf6f1`, raised `#fffdfa`, muted `#f5efea`
- Light text/rules: strong `#0f0e0e`, primary `#252422`, secondary `#6f6861`, muted `#827970`, rule `#ded5cb`, strong rule `#b9aea2`
- Dark surfaces: canvas `#151412`, surface `#1c1a18`, raised `#24211e`, muted `#2d2925`
- Dark text/rules: strong `#fffaf5`, primary `#f5f0ea`, secondary `#b6ada4`, muted `#938b83`, rule `#3f3934`, strong rule `#6b6259`
- Teal: light `#84a59d` / `#5c736e` / wash `#e7efed`; dark `#94b8ae` / `#b1d0c8` / wash `#26312e`
- Blush: light `#ddb6b0`, `#f5cac3`, wash `#f8e8e5`; dark action/footer `#c79591`, highlight `#dca7a2`, wash `#342726`
- Gold: `#f6bd60`, `#c5974d`, highlight `#ffd17d`, light wash `#fff1d7`, dark wash `#3d3020`
- Display/UI: Poppins; body: Work Sans; handwritten notes: Dawning of a New Day.

## Screen typography

- Nominal browser base: `1rem`, normally `16px`.
- Do not force a root pixel size. Browser and visitor font-size preferences remain effective.
- Primitive screen sizes follow a `1.2` minor-third ratio.
- `--text-xs` is a deliberate `0.75rem` readability floor.
- Primary body copy uses `--text-base`; meaningful screen copy stays at or above `--text-sm`.
- Drafting labels stay at or above `--text-xs` unless decorative and hidden from assistive technology.
- Current screen UI keeps decorative annotations at `--text-xs`; no sub-floor exception remains.
- Print keeps an independent point-based scale so the résumé remains exactly two US Letter pages.

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

## Component CSS

- Vue single-file components keep `<style scoped>`.
- Project-owned classes use flat kebab-case; BEM `block__element` and `block--modifier` syntax is not used.
- Base classes name the component: `.button`, `.hero`, `.navigation`.
- Part classes use readable prefixes: `.button-arrow`, `.hero-title`, `.hero-stage`.
- Variant classes pair with the base: `.button-large`, `.button-gold`.
- State classes remain explicit: `.navigation-open`, `.theme-dark`.
- Typed props generate explicit dynamic classes such as `button-${size}` and `button-${tone}`.
- CSS does not use `data-*` attributes as its primary styling API. ARIA remains the source of accessibility state.
- Runtime DOM access uses Vue template refs rather than styling classes.
- Browser tests prefer roles, names, and semantic structure. Dedicated hooks remain acceptable when geometry cannot be observed semantically.
- Parents avoid `:deep()` dependencies on child internals. Prefer wrappers, props, variants, or CSS custom-property contracts.

## Text selection

- Default selection uses the semantic page selection roles.
- Footer selection inverts footer roles: background `var(--on-footer)` and text `var(--footer)`.
- Footer selection contrast: dark theme `7.13:1`; light theme `11.35:1`.
- Teal remains a supporting accent and does not compete with blush or gold inside the footer.

## Composition and behavior

- Asymmetrical 12-column editorial grid with fine full-width rules.
- Sections begin with index numbers and construction labels.
- Photography is a material sample, not a generic banner.
- Palette swatches are solid fabric samples with small pinked edges; their interiors are unpatterned.
- Navigation uses an underline marker; primary actions use gold.
- Light theme uses gold for primary actions + footer. Dark theme uses blush for primary actions + footer, black footer action, teal support, gold only for rare drafting/navigation details.
- Components consume semantic surface, text, rule, action, focus, selection, and footer contrast roles; palette primitives remain for authored swatches/details.
- First visit follows system preference; a single icon button toggles + persists `light`/`dark`. Desktop ends the header with the compact 52px utility cell directly after navigation; mobile gives the control its own 44px target between brand + navigation. The handwritten Caitlin sign-off lives in the lower hero copy panel and reveals with the assembly phase.
- Motion draws rules and reveals relationships; hover movement stays within 2–4px.
- Mobile becomes one deliberate reading column; decorative notes may move or disappear only when redundant.
- Print stays white/black and removes navigation, theme controls, paths, and backgrounds while preserving content and section rules.

## Toolkit section

- Keep the homepage Toolkit as one continuous horizontal row on desktop.
- Preserve the `05` section marker, heading, construction rules, and shared ruled tags.
- The content order is frontend foundations, interface workflow, then AI-assisted development practices.
- The approved additions are Claude Code, Codex, and Spec-driven development.
- Do not restore the decorative `06 / Tools / People / Possibilities` rail or replace it with another transition label.
- Below `88rem` the list becomes three columns before the desktop row can crowd. Below `42rem` it becomes two columns in DOM order.
- The grouped Build/Workflow matrix remains an exploration reference, not an implementation pattern.

## Approved references

- Homepage: `references/caitlin-hawley-full-homepage-exploration.png`
- Résumé: `references/resume-final-direction.png`
