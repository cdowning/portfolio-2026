# Typography and component CSS conventions

Formalize The Pattern Table's screen typography and Vue component class naming without changing approved composition, content, motion, color themes, or print layout.

## Product outcome

- Screen typography uses one documented scale instead of one-off component values.
- Browser-relative sizing preserves visitor font-size preferences.
- Vue component styles use readable flat class names rather than BEM syntax.
- Dynamic component variants remain explicit classes generated from typed props.
- Footer text selection uses footer colors instead of a competing supporting accent.
- Storybook exposes representative typography, component variants, and both footer themes for visual review.

## Typography system

- Nominal browser base: `1rem`, normally `16px`.
- Do not force `html { font-size: 16px; }`; preserve browser/user preferences.
- Scale ratio: `1.2` minor third.
- `--text-xs` is a deliberate `0.75rem` readability floor rather than a calculated descending step.
- Screen components consume shared size tokens or semantic fluid roles.
- Print keeps its independent point-based scale to preserve exactly two US Letter pages.

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

Semantic fluid roles compose scale endpoints with `clamp()` rather than introducing unrelated sizes. Initial roles:

```css
--text-body: var(--text-base);
--text-body-large: var(--text-md);
--text-label: var(--text-sm);
--text-section-title: clamp(var(--text-2xl), 2.4vw, var(--text-4xl));
--text-page-title: clamp(var(--text-5xl), 5.25vw, var(--text-8xl));
```

## Component CSS naming

- Keep `<style scoped>` in Vue single-file components.
- Do not use BEM `block__element` or `block--modifier` class syntax.
- Use flat kebab-case names.
- Base classes describe the component: `.button`, `.hero`, `.navigation`.
- Part classes use a readable prefix: `.button-arrow`, `.hero-title`, `.hero-stage`.
- Variant classes pair with the base: `.button-large`, `.button-gold`.
- State classes remain explicit: `.navigation-open`, `.theme-dark`.
- Dynamic variants derive from typed Vue props, for example `button-${size}` and `button-${tone}`.
- CSS does not use `data-*` attributes as its primary styling API.
- ARIA remains source of accessibility state and must not be removed for styling convenience.
- Runtime DOM access uses Vue template refs rather than styling classes.
- Browser tests prefer roles, names, and semantic structure; dedicated test hooks remain acceptable where geometry cannot be observed semantically.
- Parent components avoid `:deep()` dependencies on child internals. Use wrapper layout, props, variants, or CSS custom-property contracts.

## Footer selection treatment

Footer selection inverts the footer's own semantic colors:

```css
footer ::selection {
  background: var(--on-footer);
  color: var(--footer);
}
```

- Dark theme: near-black selection with blush text, `7.13:1` contrast.
- Light theme: near-black selection with gold text, `11.35:1` contrast.
- Teal remains a supporting accent and no longer competes with footer blush or gold during text selection.

## Migration strategy

- Add typography tokens before migrating consumers.
- Convert one component at a time so template and scoped selectors move together.
- Update tests in the same component slice as renamed classes.
- Replace `.hero__stage` runtime lookup with a Vue template ref before removing the old class.
- Keep visual geometry and motion custom properties unchanged while selectors migrate.
- Treat the homepage hero as the highest-risk slice because motion and geometry tests currently depend on its classes.
- Keep print selectors and point sizes outside the screen typography migration.

## Accessibility and quality requirements

- Body copy remains at least `--text-sm`; primary body copy defaults to `--text-base`.
- Drafting labels do not render below `--text-xs` unless decorative and hidden from assistive technology.
- Text selection meets WCAG AA in both themes.
- Class migration causes no change to focus, keyboard behavior, reduced motion, responsive layout, or theme behavior.
- Both routes remain free of horizontal overflow at existing verification widths.
- Storybook presents the type scale, button/tag variants, and footer selection in light and dark themes.

## Boundaries

- No font-family change.
- No copy, route, navigation, photography, or information-architecture change.
- No Tailwind, CSS Modules, Sass, or new styling dependency.
- No layout or motion redesign.
- No change to the two-page print-resume contract.
- No implementation during exploration/spec documentation.

## Proposed SPEC invariants

- V14: screen type uses `1rem` nominal base + `1.2` minor-third tokens; body/labels meet readability floor; print point scale remains isolated and two pages.
- V15: Vue SFC CSS remains scoped + flat kebab-case; ⊥ BEM `__`/`--` class syntax; typed props produce explicit variant classes; runtime DOM access → template refs.
- V16: footer text selection inverts `--on-footer`/`--footer`, meets WCAG AA in both themes, and introduces no supporting-accent clash.
