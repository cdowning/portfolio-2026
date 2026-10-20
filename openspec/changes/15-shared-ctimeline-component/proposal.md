# Shared CTimeline component

Replace the duplicated homepage and résumé experience timelines with a shared `CTimeline` UI component while preserving each page's distinct content hierarchy and layout.

## Dependency and sequencing

- Keep the shared `experience` data and its `current` flag as the source of truth.
- Complete this component extraction before finalizing the component-library documentation in `14-storybook-documentation-and-development-deployment` so `CTimeline` is included in the rebuilt public Storybook.
- Preserve the completed footer adaptation work and the deferred footer flight animation without modification.

## Current state

- `HomeExperience` and `ResumeExperience` both consume the same `ExperienceRole[]` data.
- Each component independently draws a vertical timeline and circular role markers with scoped pseudo-element CSS.
- The homepage reads `role.current`, applies `aria-current="true"`, and fills the current role's marker.
- The résumé ignores `role.current`, so every marker remains hollow and the current-role semantics are absent.
- Existing browser coverage verifies the filled marker only on the homepage.

## Confirmed component boundary

- Add `app/components/ui/CTimeline/CTimeline.vue` as the shared timeline primitive.
- `CTimeline` owns the ordered-list structure, connecting line, role markers, current-state presentation, and `aria-current` state.
- Accept typed items, a stable item-key function, and an optional current-state function through explicit props.
- Expose each item through a typed scoped slot so consumers provide their own row content.
- Expose the resolved item index and current state to the slot when useful, without exposing internal DOM refs or styling implementation details.
- Use a real marker element inside each list item rather than styling consumer elements through duplicated pseudo-elements.
- Keep markers decorative with `aria-hidden="true"`; communicate current state on the owning list item.
- Allow consumer-specific geometry through documented CSS custom properties rather than homepage or résumé variant props.

## Consumer responsibilities

`HomeExperience` continues to own:

- Section heading and experience summary.
- Compact title, company, period, and skill presentation.
- The “View full resume” action and homepage grid placement.

`ResumeExperience` continues to own:

- Section heading and résumé-specific aside.
- Detailed company, title, period, and bullet presentation.
- Résumé grid placement and narrow-screen content reflow.

Both consumers:

- Pass the shared `experience` array to `CTimeline`.
- Provide the existing company-and-title stable key.
- Resolve current state directly from `role.current` without copying or deriving separate state.
- Configure only the spacing needed for their distinct row layouts.

## Styling contract

- `CTimeline` owns the marker size, border, hollow and filled treatments, connecting line, and base list reset.
- The default treatment uses the existing `--canvas`, `--text`, and `--rule-strong` semantic tokens and remains correct in light and dark themes.
- Consumers may set documented CSS custom properties for content inset, axis position, marker block offset, and item minimum size.
- Consumer styles must not reach into `CTimeline` internals with `:deep()` selectors.
- The component introduces no page-specific `home` or `resume` variant.

## Accessibility and semantics

- Render an ordered list because experience entries have chronological meaning.
- Apply `aria-current="true"` only when the supplied current-state function returns true.
- Do not infer that the first item is current.
- Preserve readable role content when styles are unavailable; the filled circle is supplementary rather than the only indication of current employment.
- Keep the timeline line and markers outside the focus order and hidden from assistive technology.

## Storybook contract

- Add `CTimeline` stories demonstrating historical-only items, one current item, compact geometry, and detailed geometry.
- Document the component's purpose, item/key/current callbacks, scoped-slot contract, CSS custom properties, semantics, and appropriate usage.
- Use representative generic timeline content rather than copying private or speculative design explorations.
- Include `CTimeline` in the documentation coverage required by change 14.

## Boundaries

- Do not merge `HomeExperience` and `ResumeExperience` into one page-specific component.
- Do not move headings, summaries, periods, skills, bullets, actions, or decorative asides into `CTimeline`.
- Do not couple `CTimeline` to `ExperienceRole` or portfolio content.
- Do not add a composable, provide/inject context, event API, selection behavior, or runtime state for this static presentation.
- Do not add timeline animation or revive the deferred footer animation.
- Do not change employment copy, dates, ordering, or the `current` value.
- Do not implement Storybook deployment as part of this change.

## Acceptance

- Homepage and résumé experience sections both render through `CTimeline` using the shared `experience` data.
- Exactly the role with `current: true` has `aria-current="true"` and a filled marker on both routes.
- Historical markers remain hollow on both routes.
- Homepage and résumé retain their approved content, hierarchy, responsive layouts, and light/dark presentation.
- `CTimeline` has a typed, page-agnostic API and requires no `:deep()` consumer styling.
- Storybook demonstrates and documents both current and historical states plus compact and detailed geometry.
- Focused unit, browser, Storybook, typecheck, lint, and static-generation verification pass before completion.
