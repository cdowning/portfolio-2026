# Footer social icons

Add recognizable social icons to both screen footers while preserving visible labels, the established Pattern Table hierarchy, and reliable static rendering.

## Confirmed direction

- Keep the primary email action visually dominant.
- Present LinkedIn, GitHub, and CodePen as secondary icon-and-text links.
- Use matching Phosphor brand icons for all three footer links.
- Do not add Twitter or X without a verified, professionally useful destination.
- Do not place social icons inside circles or give them stronger visual weight than the primary contact action.
- Use Devicon for technology and product marks, not for the mixed footer social row.
- Use one Iconify-based rendering interface through the Nuxt integration.

## Icon infrastructure

- Use `@nuxt/icon` rather than the client-only `@iconify/vue` component.
- Install Phosphor and Devicon Iconify collections locally.
- Bundle known icons with the generated site so first render does not depend on the public Iconify API.
- Disable runtime icon fetching for production output.
- Keep icon names literal or explicitly listed so static scanning includes every required glyph.
- Treat icons beside visible text as decorative and hide them from assistive technology.

## Footer presentation

- Preserve the existing contact heading, supporting copy, primary action, drawing, brand block, fine print, and responsive layout.
- Add CodePen to the existing LinkedIn and GitHub footer destinations.
- Use compact 16-18px icons aligned with visible link labels.
- Preserve the existing underline language for hover and focus instead of introducing circular icon buttons.
- Keep social links keyboard accessible, visibly focused, and understandable if icons fail to render.

## Boundaries

- Do not refactor footer breakpoints or convert footer CSS to mobile-first in this change.
- Do not redesign the footer, change contact copy, or alter verified destinations beyond surfacing the existing CodePen profile.
- Do not add technology logos to the Toolkit without separate approval.
- Do not load icon fonts, remote SVGs, or runtime icon data from a CDN.
- Do not run product-context migration as part of this change.

## Acceptance

- Homepage and résumé footers show labeled LinkedIn, GitHub, and CodePen links with matching Phosphor icons.
- Footer icons render in prerendered/static output without a runtime Iconify API request.
- Footer content remains usable without icon rendering.
- Social links preserve keyboard focus visibility and existing responsive behavior.
- Light and dark footer contrast remain WCAG AA.
- Focused component, browser, type, lint, generation, and Storybook checks pass.
