# Homepage toolkit refinement

Explore an expanded Toolkit section that reflects both established frontend skills and the current AI-assisted development workflow.

## Confirmed direction

- Remove the decorative `06 / Tools / People / Possibilities` aside from `HomeToolkit`.
- Do not replace it with another transition label or decorative phrase.
- Let the Toolkit section end cleanly before the contact section begins.
- Add `Claude Code`, `Codex`, and `Spec-driven development` to the toolkit content.
- Preserve the existing dark Pattern Table visual language, fine rules, typography, and section marker `05`.

## Candidate layouts

### Option A: single row

Retain the current horizontal one-row composition and extend or rebalance it for the additional items.

- This remains the familiar baseline.
- The layout should preserve the existing open, continuous rhythm.
- The expanded list must remain readable without forcing narrow or awkward cells.

### Option B: grouped matrix

Use the grouped Build and Workflow composition shown during exploration, with the decorative `06` aside removed.

**Build**

- Vue
- TypeScript
- JavaScript
- Sass
- Tailwind
- Accessibility

**Workflow**

- Figma
- Storybook
- Design systems
- Claude Code
- Codex
- Spec-driven development

The grouped matrix is a potential option, not the selected implementation. It should be evaluated against the single-row baseline at desktop and mobile sizes before choosing a final direction.

## Layout requirements

- The Toolkit heading remains the primary entry point.
- Content grouping must be understandable without relying on decorative text.
- The removal of the right rail should give the toolkit content more usable horizontal space.
- Mobile must collapse into a deliberate reading order rather than compressing the desktop grid.
- The DOM order must match the visual and assistive-technology reading order.
- No new cards, shadows, or container chrome.

## Boundaries

- No implementation during exploration.
- Do not change the contact section number or content as part of this decision.
- Do not rename or remove existing toolkit items until a final layout is chosen.
- Do not treat the grouped matrix as approved solely because it is documented here.
