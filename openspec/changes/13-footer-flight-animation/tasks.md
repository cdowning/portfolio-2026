# Optional footer flight animation plan

**Status:** Deferred. The approved static artwork remains in production until this change is intentionally resumed.

## Task 1: Revalidate the motion direction

- [ ] Review the static footer in context before deciding whether motion adds enough value.
- [ ] Confirm the one-pass trigger, approximate 900ms duration, and replay policy.
- [ ] Approve desktop and tablet frame studies covering departure, wave, loop, and final rest.

## Task 2: Implement synchronized progress

- [ ] Drive the route reveal and airplane position from one shared progress model.
- [ ] Preserve the approved route geometry, compact loop, and supplied airplane asset.
- [ ] Keep the route endpoint aligned with the airplane tail throughout the sequence.
- [ ] Add restrained banking that follows the route tangent and resolves to the static final pose.
- [ ] Avoid new runtime dependencies for this isolated effect.

## Task 3: Protect accessibility and responsive behavior

- [ ] Show the final static artwork immediately when reduced motion is requested.
- [ ] Keep the artwork decorative and outside the focus order.
- [ ] Preserve all current footer content, links, touch targets, breakpoints, and hidden-artwork rules.
- [ ] Confirm the animation causes no layout shift or horizontal overflow.

## Task 4: Verify and decide

- [ ] Add focused browser coverage for one-time triggering, synchronization, final state, and reduced motion.
- [ ] Visually review the full sequence at supported desktop and tablet widths.
- [ ] Compare the animated treatment with the static baseline in the wider page experience.
- [ ] Ship only if the motion improves the footer; otherwise retain the approved static artwork and close this change without implementation.
