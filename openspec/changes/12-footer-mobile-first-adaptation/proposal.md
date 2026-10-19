# Footer mobile-first adaptation

Rewrite the shared screen footer layout from a narrow-screen base while preserving its approved content, visual hierarchy, and the social links delivered by change 11 on both public routes.

## Dependency

- Complete `11-footer-social-icons` first.
- Preserve its icon infrastructure, destinations, semantics, and visual treatment without redesigning them.

## Confirmed direction

- Limit the refactor to `SiteContactFooter`.
- Make narrow-screen layout the base CSS instead of overriding a desktop grid through `max-width` queries.
- Layer tablet and desktop composition through content-driven `min-width` queries.
- Keep one logical source and focus order across every layout.
- Preserve the existing contact heading, supporting copy, primary action, drawing, social links, brand block, and fine print.
- Decorative footer drawing may move or disappear when redundant, but core contact and brand information remain available.

## Interaction and device requirements

- Every interactive footer target provides at least a 44px touch area without relying on hover.
- Social links wrap or stack without crowding at narrow widths.
- Phone safe-area insets receive appropriate bottom padding.
- Portrait and landscape layouts remain free of horizontal overflow.
- Keyboard focus remains visible and follows the same logical order as the document.
- Fine-pointer hover enhancements do not carry functional meaning unavailable to touch users.

## Shared design workflow

- Keep the project-scoped Impeccable skill and detector hooks versioned with the repository so contributors use the same design guidance.
- Run `impeccable adapt` after implementation at phone, tablet, desktop, touch, keyboard, light-theme, and dark-theme contexts.
- Review skill upgrades deliberately and keep the installed project version reproducible.

## Boundaries

- Do not change Iconify configuration, icon selection, social destinations, or footer copy.
- Do not convert unrelated components from desktop-first CSS.
- Do not redesign the footer or alter the approved Pattern Table composition on desktop.
- Do not run product-context migration as part of this change.

## Acceptance

- Base footer CSS represents the narrow-screen layout; larger compositions use `min-width` enhancements.
- The shared footer retains all approved content and social links on both routes at every supported width.
- Footer links meet the 44px touch-target requirement and preserve keyboard focus visibility.
- The shared footer remains free of horizontal overflow at 320, 390, 768, 1024, and wide desktop widths.
- Phone landscape and safe-area behavior remain intentional.
- Light and dark footer contrast remain WCAG AA.
- `impeccable adapt` review and focused automated checks pass before completion.
