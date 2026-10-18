# Optional footer flight animation

Preserve the approved static footer flight artwork as the current experience while documenting a possible motion treatment for later exploration.

## Status

- Deferred. Do not implement as part of the current footer work.
- The static wavy dashed route, compact loop, and supplied paper-airplane artwork are the approved baseline.
- Revisit only after the static footer has been reviewed in the wider site experience.

## Deferred direction

- Trigger one short flight sequence when the homepage contact footer first becomes visible.
- Reveal the single dashed route behind the airplane while the airplane follows the same path.
- Preserve the current wave and the compact loop immediately before the airplane's resting position.
- Keep the route endpoint visually attached to the airplane tail throughout the sequence.
- Let the airplane bank subtly with the path without changing the supplied artwork.
- Finish on the exact approved static composition so the animated and non-animated states match.
- Keep the social row, black “Say hello” button, right brand column, copy, and footer layout unchanged.

## Motion constraints

- Use one restrained pass of approximately 900 milliseconds; do not loop or autoplay repeatedly.
- Play at most once per page view unless a later review establishes a better replay policy.
- Drive route reveal and airplane travel from shared progress so neither element visibly leads the other.
- Avoid adding a motion library solely for this treatment; prefer the existing Vue and CSS capabilities.
- On reduced-motion devices, show the approved final artwork immediately with no travel, banking, or path drawing.
- Keep the decorative flight hidden wherever the responsive footer already omits it.

## Boundaries

- Do not implement the animation while this change is deferred.
- Do not redraw, replace, or further stylize the approved paper-airplane asset.
- Do not alter footer information architecture or responsive behavior.
- Do not make the decorative artwork necessary to understand or use the contact action.

## Acceptance when revived

- Route and airplane remain synchronized throughout the sequence, including the final loop.
- The route meets the airplane tail within four rendered pixels throughout the motion and at rest.
- The final frame matches the approved static footer artwork.
- The sequence runs once, remains smooth at supported desktop and tablet sizes, and introduces no layout shift.
- Reduced-motion users receive the complete static artwork immediately.
- Focus, keyboard navigation, touch targets, and contact behavior remain unchanged.
- Focused browser coverage and visual review pass before the change is marked complete.
