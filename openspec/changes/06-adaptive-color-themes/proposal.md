# Adaptive light and dark color themes

Extend The Pattern Table into two deliberately composed color themes without changing its typography, editorial grid, photography, drafting language, or content hierarchy.

## Product outcome

- First visits follow the visitor's operating-system color preference.
- A single persistent header button toggles between light and dark, matching the interaction model on the current production portfolio.
- A visitor override is stored locally and applies on both `/` and `/resume`.
- Light remains warm paper with gold actions and footer; dark becomes warm charcoal with blush actions and footer.
- Teal remains the supporting accent in both themes. Gold is used sparingly in dark mode.
- Printed resumes remain white paper with black ink regardless of the screen theme.

## Interaction contract

- No stored value means “follow the system.” There is no separate system option in the interface.
- Activating the control writes the opposite of the currently resolved theme as an explicit `light` or `dark` override.
- Subsequent visits use that override until the visitor toggles again or clears site storage.
- The theme is resolved before first paint so a stored dark preference never flashes the light theme.
- While no override exists, a live operating-system theme change updates the page.
- The control is a native button with a minimum 44×44px target, visible focus, a clear accessible name, and decorative iconography hidden from assistive technology.

## Control placement

- Desktop: place the theme button in a compact 52px utility cell directly after the navigation without a divider between them, while keeping the handwritten signature at the far-right endpoint.
- Mobile: give the theme button its own 44px header cell between the brand and navigation trigger so changing theme never requires opening the menu.
- Print: omit the theme control with the rest of the site header.

## Color system

Components consume semantic roles rather than palette names. Primitive colors remain available only for deliberate swatches and authored decorative details.

| Semantic role | Light | Dark |
|---|---|---|
| Canvas | `#fdfbf9` | `#151412` |
| Surface | `#fbf6f1` | `#1c1a18` |
| Raised surface | `#fffdfa` | `#24211e` |
| Muted surface | `#f5efea` | `#2d2925` |
| Strong text | `#0f0e0e` | `#fffaf5` |
| Primary text | `#252422` | `#f5f0ea` |
| Secondary text | `#6f6861` | `#b6ada4` |
| Muted text | `#827970` | `#938b83` |
| Subtle rule | `#ded5cb` | `#3f3934` |
| Strong rule | `#b9aea2` | `#6b6259` |
| Primary action | `#f6bd60` | `#c79591` |
| Primary action hover | `#ffd17d` | `#dca7a2` |
| On primary action | `#0f0e0e` | `#151412` |
| Supporting accent | `#5c736e` | `#94b8ae` |
| Supporting highlight | `#84a59d` | `#b1d0c8` |
| Supporting wash | `#e7efed` | `#26312e` |
| Footer | `#f6bd60` | `#c79591` |
| On footer | `#0f0e0e` | `#151412` |
| Footer action | `#0f0e0e` | `#151412` |
| On footer action | `#fffdfa` | `#fffaf5` |

Additional blush and gold primitives support authored swatches and small drafting details, but must not replace semantic foreground/background pairs.

## Technical direction

- Use CSS for the system default: light tokens at the root, a dark `prefers-color-scheme` block when no explicit theme attribute exists, and explicit `[data-theme='light']` / `[data-theme='dark']` overrides.
- Add a small pre-paint script that validates the stored value and applies only an explicit override to the document root.
- Keep runtime state in one typed `useTheme` composable. It owns initialization, media-query synchronization, persistence, document state, and `theme-color` updates.
- Add a focused `ThemeToggle` component. The shared header owns only its placement.
- Replace hard-coded screen colors and palette-dependent foreground assumptions with semantic tokens. Keep the intentionally fixed black-and-white print rules.
- Do not add a color-mode dependency for this two-state static-site requirement.

## Accessibility and quality requirements

- Body text meets WCAG AA at 4.5:1 in both themes.
- Large text, focus indicators, controls, and meaningful graphics meet 3:1.
- Selection, hover, focus, navigation, mobile-menu, footer, tag, and specimen states remain legible in both themes.
- Theme changes do not obscure content, trigger layout shift, or create a first-paint flash.
- Theme controls remain keyboard-operable and at least 44×44px at 320px and wider.
- Both routes remain free of horizontal overflow in both themes.
- Storybook presents components on light and dark theme surfaces.

## Boundaries

- No third selectable “system” state.
- No additional visitor-selectable teal, blush, or gold themes.
- No layout, typography, content, navigation, photography, or motion redesign.
- No change to the two-page print-resume contract.

## Proposed SPEC invariants

- V11: first paint follows system color preference unless a valid persisted `light`/`dark` override exists; one accessible header control toggles and persists the resolved theme across both routes.
- V12: semantic surface, text, rule, action, focus, selection, and footer roles meet WCAG AA in light and dark; dark uses blush actions/footer, light uses gold; teal remains supporting.
- V13: print remains fixed white/black; theme switching causes no horizontal overflow, layout shift, hydration warning, or motion requirement.
