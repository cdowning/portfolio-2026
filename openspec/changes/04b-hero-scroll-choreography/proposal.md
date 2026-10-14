# Hero scroll choreography

Turn hero drafting marks into one authored, scroll-linked “Drafting Table Assembly” sequence without changing approved copy or composition.

## Motion thesis

- Focal moment: hero assembles like pattern drafting → registration marks, cutting arcs, connecting thread, annotations, completed ruler.
- Continuity: final drafting line + `04` hand off toward Selected Work.
- Feedback: scroll position directly controls drawing progress; reverse scroll reverses sequence.
- Budget: one bounded desktop sequence; native CSS scroll timeline where supported + lightweight JS fallback; transform, opacity, SVG stroke, and clip only; no persistent loop.

## Scope

- Use sticky desktop stage spanning ~1.7–1.8 viewport heights; ⊥ scroll snap, playback lock, or input hijack.
- Frame 1 / Register: vertical division, measurements, and `02 A more human web` settle into position.
- Frame 2 / Cut: solid portrait arc draws; dashed seam-allowance arc follows; subtle paper overlay clears from portrait along cutting edge.
- Frame 3 / Connect: CTA-originating dashed path advances toward portrait; reached crosshair activates.
- Frame 4 / Assemble: `03 Good things take shape`, handwritten note, swatches, and side words resolve; portrait settles upward ≤20px.
- Frame 5 / Release: lower curve, remaining crosshairs, ruler, and `04 Scale ideas not ego` complete; hero releases into Selected Work.
- Keep headline, summary, CTA, facts, and portrait readable throughout; decoration supports hierarchy.
- Laptop/desktop >64rem with ≥42rem viewport height gets full sticky choreography with height-compressed spacing. Narrow/tablet layouts get completed line drawing without pinning. Mobile gets compact one-pass arc/crosshair reveal with portrait-safe geometry.
- Reduced motion shows completed construction immediately; meaningful state emphasis may use non-spatial opacity/color ≤150ms.
- Default HTML/CSS state remains fully visible if client motion code fails.

## Non-goals

- ⊥ generic layer parallax, repeated fade-and-rise reveals, looping dash motion, elastic/bounce easing, or decorative cursor effects.
- ⊥ change hero copy, portrait source, information hierarchy, section order, or CTA destination.
- ⊥ add animation dependency when CSS/WAAPI + existing Vue stack suffice.
- ⊥ delay navigation, keyboard access, anchor behavior, or first meaningful content.

## Acceptance

- Scroll sequence follows five named frames in order and reverses smoothly with scroll direction.
- Sequence progress remains deterministic during fast scroll, resize, route restoration, and direct `#work` navigation.
- Sticky treatment adds 0.7–0.8 viewport of travel beyond hero and never traps wheel, touch, keyboard, or assistive navigation.
- Solid/dashed arcs, CTA path, crosshairs, measurements, swatches, notes, ruler, and 02/03/04 callouts each enter at specified frame.
- Portrait displacement ≤20px; no text, CTA, or factual content becomes hidden, blurred, clipped, or non-interactive.
- 320, 390, 768, 1024, and desktop layouts have no horizontal overflow or construction/content collisions.
- `prefers-reduced-motion: reduce` removes sticky/spatial choreography and exposes final meaningful state without delay.
- Supporting browsers use CSS `view-timeline`; fallback uses one passive, requestAnimationFrame-batched scroll reader. Both use compositor-friendly transforms/opacity plus bounded SVG clip work; no layout-thrashing scroll handler.
- Browser acceptance covers desktop completion, reverse progression, direct anchor jump, mobile fallback, and reduced-motion state.
- Existing accessibility, static generation, print, metadata, and release checks remain green.

Acceptance: SPEC V3, V5, V6, V10.
