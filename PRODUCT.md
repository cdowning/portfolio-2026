# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Primary: hiring managers and teams evaluating Caitlin Hawley for a full-time frontend development role.
- Secondary: companies or clients considering Caitlin for a website project.
- Additional: frontend peers and collaborators exploring her work.

## Product Purpose

The portfolio helps prospective employers quickly understand Caitlin's frontend experience, user-experience judgment, and fit for a role, then contact her about an interview or opportunity. It may also help a company or client decide whether to discuss a website project with her.

Success means the work feels credible, demonstrates how Caitlin combines frontend engineering with care for the people using what she builds, and gives an interested visitor a clear path to learn more or get in touch.

## Positioning

Caitlin is an experienced frontend developer who treats user experience as part of engineering rather than a separate concern. Her work combines implementation depth, design sensibility, accessibility, and the ability to turn complex interface problems into thoughtful, understandable experiences.

## Operating Context

- Visitors evaluate the portfolio through two public routes: the homepage at `/` and the web résumé at `/resume`.
- Hiring teams may review the site quickly before deciding whether to interview Caitlin, then inspect deeper evidence through public projects, Storybook components, CodePen experiments, and her employment history.
- Visitors may arrive on desktop or mobile and may use keyboard navigation, assistive technology, reduced-motion preferences, or a preferred light or dark color scheme.
- The site is a statically generated Nuxt portfolio. It does not require an account or application workflow.

## Capabilities and Constraints

- Preserve verified employment history, contact details, and outbound destinations in one typed content source.
- Keep `/` and `/resume` as the public routes.
- Present real public evidence and accurate professional experience; never fabricate testimonials, clients, outcomes, or performance metrics.
- Support keyboard use, visible focus, reduced motion, readable contrast, responsive layouts, and visitor-selected light and dark themes.
- Keep the résumé printable as exactly two US Letter pages while maintaining a readable screen version.
- CMS functionality, contact forms, and hosting migration are out of scope.
- Design explorations are not approved for public release by default. Caitlin will decide case by case whether an exploration reveals ideas she wants to keep private.

## Brand Commitments

- Use the professional name Caitlin Hawley and the role Frontend Developer.
- Communicate with a thoughtful, capable, human voice rather than inflated marketing language.
- Lead with the relationship between frontend engineering, design judgment, accessibility, and user experience.
- Preserve the established portfolio identity and approved assets unless Caitlin explicitly approves a redesign or replacement.

## Evidence on Hand

- Public project destinations and descriptions in `app/content/site.ts`.
- A public component library at `https://storybook.caitlinhawley.com/`.
- Public interaction experiments at `https://codepen.io/cdowning`.
- Verified employment, skills, and education history in `app/content/site.ts` and the `/resume` experience.
- Approved portfolio imagery and generated social-preview assets under `public/images/`.
- Design explorations are possible future evidence, but none should be published without explicit approval.
- The project has no approved testimonials, client roster, or outcome metrics; future work must not invent them.

## Product Principles

1. Make care for the user visible in both the interface and the engineering decisions behind it.
2. Prefer specific, verifiable proof over broad claims about skill or impact.
3. Help a busy hiring manager understand Caitlin's experience and point of view quickly, with deeper evidence available when wanted.
4. Treat accessibility, performance, responsive behavior, and clarity as core frontend quality.
5. Keep unpublished design ideas private unless Caitlin deliberately chooses to share them.

## Accessibility & Inclusion

The portfolio must support keyboard navigation, visible focus, semantic structure, reduced-motion preferences, readable contrast, responsive layouts, and text scaling. Decorative graphics must remain hidden from assistive technology, and essential content or actions must never depend on animation, color alone, hover, or a particular viewport size.
