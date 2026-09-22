# §G
Ship faithful, accessible, static Nuxt portfolio at `/` + `/resume` from approved comps.

# §C
- fresh repo; old repo read-only source
- Nuxt 4; Vue 3; TS; `<script setup>`
- light-only v1; modern CSS; no Tailwind/SCSS/CMS/server
- approved desktop comps immutable; responsive adaptation intentional
- factual content/links only; no invented metrics/client claims
- hero uses honest placeholder until original portrait arrives
- resume print = 2 US Letter pages; no web preview

# §I
- `GET /`: homepage
- `GET /resume`: web + print resume
- `content/site.ts`: typed source of profile/nav/contact/work/skills/experience/education
- static output: `.output/public`

# §V
- V1: `pnpm generate` prerenders `/` + `/resume` with metadata, sitemap, robots.
- V2: routes consume one typed factual content source; route SFCs remain composition-only.
- V3: homepage follows approved section order, palette, type, editorial grid, destinations.
- V4: resume follows approved web hierarchy; print emits exactly 2 Letter pages with controls/decor removed.
- V5: keyboard + focus + semantic landmarks + reduced-motion work; decorative graphics hidden from AT.
- V6: 320/390/768/1024/desktop have no horizontal overflow; touch controls >=44px.
- V7: no fake metrics/client claims; work images derive from real public work or abstract labeled specimens.
- V8: shared UI extracted only after >=3 same-intent uses; typed props/events.
- V9: lint + typecheck + generate + Storybook build exit 0; ⊥ project-owned or dependency-compat warnings.

# §T
id|status|goal|cites
T1|x|foundation, content, tests, OpenSpec records|V1,V2,V9,I.content
T2|x|homepage static composition + destinations|V2,V3,V7,I./
T3|x|resume web + two-page print|V2,V4,I./resume
T4|x|responsive nav, editorial motion, shared extraction, Storybook|V5,V6,V8
T4a|.|correct reviewed content, grid, and swatches; portrait restored to honest placeholder and deferred|V2,V3,V4,V5,V6,V7
T5|.|audit, visual QA, static generation, release checks|V1,V3,V4,V5,V6,V7

# §B
id|date|cause|fix
B1|2026-09-21|declared pnpm 10 ≠ runtime pnpm 11 → noninteractive module purge abort|align `packageManager`; no §V (external tool state)
B2|2026-09-21|Playwright reused old portfolio server on shared port 3200|dedicated port 4310 + `reuseExistingServer: false`; no §V (test isolation)
B3|2026-09-21|Nuxt generated Vue Router 5 Volar plugin path while direct dep pinned Vue Router 4|V9
B4|2026-09-21|Nuxt 4.5.2 Nitro bundle reports unused imports inside `@nuxt/nitro-server`|V9 scoped to project-owned/compat warnings; upstream warning documented
B5|2026-09-21|rotation on fixed-width header signature cell expanded its bounds past viewport|V6; rotate handwritten child only + browser overflow assertion
B6|2026-09-21|Nuxt test server exceeded Playwright's 60s startup window after cold generation; clean isolated rerun passed|raise isolated server timeout to 120s; no §V (tooling latency)
B7|2026-09-21|print test clicked SSR button before Vue hydration attached listener|V4; wait for browser network idle before interaction
B8|2026-09-21|login shell selected a stale Homebrew Node binary missing its ICU library|use the bundled pnpm launcher directly; no §V (host tool state)
B9|2026-09-21|standalone Storybook had no direct Vite or Vue SFC compiler dependency under pnpm isolation|V9
B10|2026-09-21|résumé experience grid used intrinsic `1fr`, allowing role dates to force 37px overflow at 320px|V6; use `minmax(0, 1fr)` and stack the role heading on phones
B11|2026-09-22|manual visual-QA server occupied Playwright's isolated port during verification|no new §V; B2 already specifies isolated-port behavior, stop preview before release suite
B12|2026-09-22|focused mobile verification could not launch after Playwright's expected WebKit revision was absent from the host cache|no new §V; host dependency state, use an installed browser for focused proof or install the matching revision before the release suite
